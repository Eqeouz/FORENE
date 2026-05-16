import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, ChevronRight, CheckCircle2, ShieldCheck, Zap, Users, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

const membershipSchema = z.object({
  membershipType: z.enum(['Student', 'Researcher', 'Professional', 'Institution']),
  fullName: z.string().min(3, 'Full name is too short'),
  courseOfStudy: z.string().min(2, 'Please enter your course of study'),
  phone: z.string().min(10, 'Invalid phone number'),
  country: z.string().min(2, 'Please enter your country'),
  school: z.string().min(2, 'Please enter your school'),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

const benefits = [
  { icon: Zap, title: 'Access training & resources', desc: 'Unlock exclusive learning materials and specialized courses.' },
  { icon: Users, title: 'Collaborate with experts', desc: 'Network with industry leaders and seasoned researchers.' },
  { icon: Globe, title: 'Propose & participate', desc: 'Lead research projects and join global studies.' },
  { icon: ShieldCheck, title: 'Stay informed', desc: 'Get updates on latest trends and emerging food technologies.' },
];

const steps = [
  'Submit your application form online.',
  'Applications are reviewed by the FORENE team.',
  'Successful applicants receive an acceptance email.',
  'Membership access is activated after confirmation.',
];

export default function Membership() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema)
  });

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'memberships'), {
        ...data,
        certificateUrl: fileName || '', // Ideally should be uploaded to Storage
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      reset();
      setFileName(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'memberships');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="bg-white text-brand-black pt-32 pb-24 relative overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tighter"
          >
            Become a <span className="text-brand-red">Member</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Join the elite network of student researchers shaping the future of global food systems.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="-mt-12 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 group hover:bg-brand-forest hover:border-brand-forest transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-lime group-hover:text-brand-onyx transition-colors">
                  <b.icon className="w-6 h-6 text-brand-forest group-hover:text-brand-onyx" />
                </div>
                <h4 className="font-bold text-lg mb-3 group-hover:text-white">{b.title}</h4>
                <p className="text-sm text-gray-500 group-hover:text-white/70 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-brand-grey border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center italic font-serif">How it works</h2>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-6 p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg font-medium text-brand-black pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32" id="apply">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-50">
            <h2 className="text-3xl font-extrabold mb-4">Membership Application</h2>
            <p className="text-gray-500 mb-10">Fill out the details below to start your journey with FORENE.</p>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Application Submitted!</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  Thank you for applying. Our team will review your application and get back to you within 3-5 business days.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-brand-forest text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-lime hover:text-brand-onyx transition-all"
                >
                  New Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Membership Type</label>
                    <select
                      {...register('membershipType')}
                      className="w-full bg-brand-grey border-2 border-transparent rounded-xl py-4 px-4 focus:outline-none focus:border-brand-red transition-all font-medium appearance-none"
                    >
                      <option value="Student">Student</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Professional">Professional</option>
                      <option value="Institution">Institution</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Full Name</label>
                    <input
                      {...register('fullName')}
                      placeholder="Jane Doe"
                      className="w-full bg-brand-grey border-2 border-transparent rounded-xl py-4 px-4 focus:outline-none focus:border-brand-red transition-all font-medium"
                    />
                    {errors.fullName && <p className="text-brand-red text-[10px] font-bold uppercase">{errors.fullName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Course of Study</label>
                    <input
                      {...register('courseOfStudy')}
                      placeholder="e.g. Food Science"
                      className="w-full bg-brand-grey border-2 border-transparent rounded-xl py-4 px-4 focus:outline-none focus:border-brand-red transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Phone Number</label>
                    <input
                      {...register('phone')}
                      placeholder="+234 ..."
                      className="w-full bg-brand-grey border-2 border-transparent rounded-xl py-4 px-4 focus:outline-none focus:border-brand-red transition-all font-medium"
                    />
                  </div>
                </div>

                {/* File Upload Placeholder */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Certificate Upload</label>
                  <div className="relative group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".pdf,.doc,.docx,.png,.xlsx"
                    />
                    <div className={cn(
                      "border-2 border-dashed rounded-3xl p-12 text-center transition-all",
                      fileName ? "border-brand-red bg-brand-red/5" : "border-gray-200 bg-brand-grey group-hover:border-black/20"
                    )}>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Upload className={cn("w-8 h-8", fileName ? "text-brand-red" : "text-gray-400")} />
                      </div>
                      <p className="text-lg font-bold mb-1">{fileName ? 'File Selected' : 'Choose a file or drag and drop it here'}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                        {fileName ? fileName : 'Accepted formats: .doc, .pdf, .png, .xlsx - Up to 50MB'}
                      </p>
                      {!fileName && (
                         <button type="button" className="mt-8 bg-brand-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-brand-red transition-all">
                           Browse Files
                         </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-400 tracking-widest">Country</label>
                    <input
                      {...register('country')}
                      className="w-full bg-brand-grey border-2 border-transparent rounded-xl py-4 px-4 focus:outline-none focus:border-brand-red transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-gray-400 tracking-widest">School</label>
                    <input
                      {...register('school')}
                      className="w-full bg-brand-grey border-2 border-transparent rounded-xl py-4 px-4 focus:outline-none focus:border-brand-red transition-all font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-forest text-white py-5 rounded-2xl text-lg font-bold hover:bg-brand-lime hover:text-brand-onyx transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-forest/10 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? 'Processing...' : (
                    <>Submit Application <ChevronRight className="w-6 h-6" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
