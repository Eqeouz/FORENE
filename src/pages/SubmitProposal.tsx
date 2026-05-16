import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  FileText, 
  User, 
  Settings, 
  Paperclip, 
  Eye,
  Upload,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

// Multi-step schema parts
const proposalSchema = z.object({
  // Step 1: Personal
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  institution: z.string().min(2, 'Institution name is required'),
  role: z.enum(['Student', 'Researcher', 'Professional', 'Academic']),
  
  // Step 2: Research
  researchArea: z.string().min(2, 'Research area is required'),
  title: z.string().min(10, 'Title is too short'),
  objectives: z.string().min(20, 'Please be more descriptive with objectives'),
  abstract: z.string().min(50, 'Abstract should be between 200-400 words'),
  methodology: z.string().min(50, 'Methodology should be 200-300 words'),
  impact: z.string().min(50, 'Expected impact is required'),

  // Step 3: Collabs
  skillsNeeded: z.string().optional(),
  needsCollaborators: z.enum(['Yes', 'No']),
  resourcesNeeded: z.string().min(10, 'Please list resources needed'),
  fundingRequired: z.enum(['Yes', 'No', 'Not sure']),

  // Step 5: Consent
  originalWork: z.boolean().refine(v => v === true, 'You must confirm original work'),
  agreeToProcess: z.boolean().refine(v => v === true, 'You must agree to the process'),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

const STEPS = [
  { id: 1, title: 'Personal Information', icon: User },
  { id: 2, title: 'Research Details', icon: FileText },
  { id: 3, title: 'Collaborators & Resources', icon: Settings },
  { id: 4, title: 'Attachments', icon: Paperclip },
  { id: 5, title: 'Review & Submit', icon: Eye },
];

export default function SubmitProposal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isValid }, trigger } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    mode: 'onChange',
    defaultValues: {
      needsCollaborators: 'No',
      fundingRequired: 'Not sure',
      originalWork: false,
      agreeToProcess: false
    }
  });

  const nextStep = async () => {
    // Validate current step fields before moving
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ['fullName', 'email', 'phone', 'institution', 'role'];
    if (currentStep === 2) fieldsToValidate = ['researchArea', 'title', 'objectives', 'abstract', 'methodology', 'impact'];
    if (currentStep === 3) fieldsToValidate = ['resourcesNeeded', 'needsCollaborators', 'fundingRequired'];
    
    const output = await trigger(fieldsToValidate);
    if (output) setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (data: ProposalFormData) => {
    setIsSubmitting(true);
    try {
      const { originalWork, agreeToProcess, ...proposalData } = data;
      await addDoc(collection(db, 'proposals'), {
        ...proposalData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'proposals');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formData = watch();

  return (
    <div className="bg-brand-grey min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex items-center justify-between relative mt-10">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 -z-0"></div>
            {/* Active Line */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-brand-red -translate-y-1/2 transition-all duration-500 -z-0"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>

            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4",
                    isActive ? "bg-white border-brand-red text-brand-red scale-110 shadow-xl" : 
                    isCompleted ? "bg-brand-red border-brand-red text-white" : "bg-white border-gray-200 text-gray-400"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest",
                    isActive ? "text-brand-red" : "text-gray-400"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 mt-20">
          {isSuccess ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-black mb-4">Proposal Submitted!</h2>
                <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
                  Your research proposal is being reviewed by our selection committee. You'll receive an email notification regarding the next steps.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-brand-black text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-red transition-all"
                >
                  Return to Homepage
                </button>
             </motion.div>
          ) : (
            <div className="p-8 md:p-16">
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-black mb-2">Personal Information</h2>
                        <p className="text-gray-400">Tell us about yourself and your academic background.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Full Name</label>
                          <input {...register('fullName')} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium" placeholder="Jane Doe" />
                          {errors.fullName && <p className="text-brand-red text-xs font-bold pt-1">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Email Address</label>
                          <input {...register('email')} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium" placeholder="jane@example.com" />
                           {errors.email && <p className="text-brand-red text-xs font-bold pt-1">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Phone Number</label>
                          <div className="flex gap-2">
                            <div className="w-20 bg-brand-grey rounded-2xl flex items-center justify-center font-bold">🇳🇬</div>
                            <input {...register('phone')} className="flex-grow bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium" placeholder="+234 ..." />
                          </div>
                           {errors.phone && <p className="text-brand-red text-xs font-bold pt-1">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Institution / Organisation</label>
                          <input {...register('institution')} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium" placeholder="Enter institution" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Position / Role</label>
                          <select {...register('role')} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium appearance-none">
                            <option value="Student">Student</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Professional">Professional</option>
                            <option value="Academic">Academic</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Research Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-black mb-2">Research Details</h2>
                        <p className="text-gray-400">Describe your proposed research project in detail.</p>
                      </div>

                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Research Area</label>
                            <input {...register('researchArea')} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium" placeholder="e.g. Food Innovation" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Proposed Title</label>
                            <input {...register('title')} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium" placeholder="Enter research title" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Research Objectives</label>
                          <textarea {...register('objectives')} rows={4} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium resize-none" placeholder="What do you hope to achieve?" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Abstract / Summary (200-400 words)</label>
                          <textarea {...register('abstract')} rows={6} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium resize-none" placeholder="Provide a summary of your project..." />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Proposed Methodology</label>
                            <textarea {...register('methodology')} rows={5} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium resize-none" placeholder="Describe your plan of action..." />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Expected Impact</label>
                            <textarea {...register('impact')} rows={5} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium resize-none" placeholder="What will be the outcome?" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Collabs */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-black mb-2">Collaborators & Resources</h2>
                        <p className="text-gray-400">What do you need to make this research a success?</p>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Do you need collaborators?</label>
                          <div className="flex gap-4">
                            {['Yes', 'No'].map(val => (
                              <label key={val} className={cn(
                                "flex-grow flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all",
                                formData.needsCollaborators === val ? "border-brand-red bg-brand-red/5" : "border-gray-100 hover:border-gray-200"
                              )}>
                                <span className="font-bold">{val}</span>
                                <input type="radio" {...register('needsCollaborators')} value={val} className="w-5 h-5 accent-brand-red" />
                              </label>
                            ))}
                          </div>
                        </div>

                        {formData.needsCollaborators === 'Yes' && (
                          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Skills/Expertise Needed</label>
                            <textarea {...register('skillsNeeded')} rows={3} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium resize-none" placeholder="e.g. Data analysis, lab testing..." />
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Resources Needed</label>
                          <textarea {...register('resourcesNeeded')} rows={4} className="w-full bg-brand-grey border-2 border-transparent rounded-2xl py-5 px-6 focus:outline-none focus:border-brand-red transition-all font-medium resize-none" placeholder="e.g. Lab access, mentorship, equipment..." />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Funding Required?</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['Yes', 'No', 'Not sure'].map(val => (
                              <label key={val} className={cn(
                                "flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all",
                                formData.fundingRequired === val ? "border-brand-red bg-brand-red/5 text-brand-red" : "border-gray-100 hover:border-gray-200"
                              )}>
                                <span className="font-bold">{val}</span>
                                <input type="radio" {...register('fundingRequired')} value={val} className="w-4 h-4 accent-brand-red opacity-0" />
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Attachments */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div>
                        <h2 className="text-3xl font-black mb-2">Attachments</h2>
                        <p className="text-gray-400">Upload your supporting documents and full proposal.</p>
                      </div>

                      <div className="space-y-12">
                         <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Research Proposal Document (PDF Only)</label>
                           <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-16 text-center bg-brand-grey relative overflow-hidden group">
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept=".pdf" />
                              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                                <Upload className="w-10 h-10 text-brand-red" />
                              </div>
                              <h4 className="text-xl font-bold mb-2">Choose a file or drag and drop it here</h4>
                              <p className="text-gray-400 font-medium">.pdf only — Up to 50MB</p>
                              <button type="button" className="mt-8 bg-brand-black text-white px-8 py-3 rounded-full font-bold hover:bg-brand-red transition-all">Browse Files</button>
                           </div>
                         </div>

                         <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Supporting Materials (Optional)</label>
                           <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center hover:border-brand-red/30 transition-colors">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <Paperclip className="w-5 h-5 text-gray-400" />
                              </div>
                              <p className="text-sm font-bold text-gray-500">Add more documents, images, or spreadsheets</p>
                           </div>
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Review & Submit */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div>
                        <h2 className="text-3xl font-black mb-2">Final Review</h2>
                        <p className="text-gray-400">Please confirm all details before final submission.</p>
                      </div>

                      <div className="space-y-8">
                        <div className="bg-brand-grey p-10 rounded-[2rem] space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-200 pb-8 text-sm">
                             <div>
                               <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Lead Researcher</span>
                               <span className="font-bold">{formData.fullName}</span>
                             </div>
                             <div>
                               <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Institution</span>
                               <span className="font-bold">{formData.institution} ({formData.role})</span>
                             </div>
                           </div>

                           <div className="border-b border-gray-200 pb-8">
                              <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Research Title</span>
                              <h4 className="text-xl font-bold">{formData.title}</h4>
                              <span className="inline-block mt-2 px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">{formData.researchArea}</span>
                           </div>

                           <div>
                              <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Abstract Preview</span>
                              <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 italic">"{formData.abstract}"</p>
                           </div>
                        </div>

                        <div className="bg-brand-red/5 border-2 border-brand-red/20 p-8 rounded-[2rem] space-y-4">
                           <label className="flex items-start gap-4 cursor-pointer group">
                             <input type="checkbox" {...register('originalWork')} className="mt-1 w-5 h-5 accent-brand-red" />
                             <span className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors">I Confirm This Proposal Is My Original Work Or Has Proper Attribution</span>
                           </label>
                           <label className="flex items-start gap-4 cursor-pointer group">
                             <input type="checkbox" {...register('agreeToProcess')} className="mt-1 w-5 h-5 accent-brand-red" />
                             <span className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors">I Agree To FORENE's Review And Approval Process</span>
                           </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-10">
                  {currentStep > 1 ? (
                    <button type="button" onClick={prevStep} className="flex items-center gap-3 font-bold text-gray-400 hover:text-brand-black transition-colors">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                  ) : <div></div>}

                  {currentStep < 5 ? (
                    <button type="button" onClick={nextStep} className="bg-brand-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-red transition-all flex items-center gap-3">
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      type={isValid ? "submit" : "button"}
                      onClick={() => !isValid && trigger()}
                      disabled={isSubmitting}
                      className={cn(
                        "bg-brand-black text-white px-10 py-5 rounded-2xl font-bold transition-all flex items-center gap-3",
                        !isValid ? "opacity-30 cursor-not-allowed" : "hover:bg-brand-red shadow-2xl shadow-brand-red/20"
                      )}
                    >
                      {isSubmitting ? (
                        <>Submitting...<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                      ) : (
                        <>Submit Proposal <CheckCircle2 className="w-6 h-6" /></>
                      )}
                    </button>
                  )}
                </div>

                {!isValid && currentStep === 5 && (
                  <div className="mt-6 flex items-center gap-2 justify-center text-brand-red bg-brand-red/5 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Please check fields and consent boxes</span>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
