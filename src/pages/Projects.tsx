import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Search, ArrowRight, FileText, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ProjectStatus } from '../types';

const sampleProjects = [
  { title: 'Exploring the Impact of Indigenous Grains on Addressing Malnutrition', status: 'Ongoing' },
  { title: 'Food Security Challenges in Rural Communities: A Case Study Approach', status: 'Ongoing' },
  { title: 'The Role of Fermented Foods in Gut Health Among Young Adults', status: 'Completed' },
  { title: 'Evaluating Post-Harvest Reduction Techniques for Staple Crops', status: 'Ongoing' },
  { title: 'The Effect of School Feeding Programs on Student Academic Performance', status: 'Completed' },
  { title: 'Climate-Smart Agriculture Pathways to Sustainable Farming', status: 'Ongoing' },
  { title: 'Exploring Affordable Protein Alternatives for Low-Income Households', status: 'Ongoing' },
  { title: 'Nutrition Education Interventions for Secondary School Students', status: 'Completed' },
  { title: 'Assessing the Role of Interconnected Practices in Food Supply Chains', status: 'Ongoing' },
  { title: 'Water, Sanitation, and Nutrition: Interconnected Public Health Challenges', status: 'Ongoing' },
  { title: 'Youth-Led Approaches to Reducing Food Waste in Urban Areas', status: 'Completed' },
];

export default function Projects() {
  return (
    <div className="bg-brand-grey min-h-screen">
      {/* Hero */}
      <section className="bg-brand-forest text-white py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-brand-lime rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12"
          >
            <Target className="w-10 h-10 text-brand-forest" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight font-serif">
            Research <span className="text-brand-red">Initiatives.</span>
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Driving innovation and collaboration in food research, with scalable impact on food businesses and global health.
          </p>
        </div>
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#C0392B_1px,transparent_1px),linear-gradient(to_bottom,#C0392B_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </section>

      {/* Main Content */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold">Research Portfolio</h2>
                <p className="text-gray-400 text-sm mt-1">Browse our current and past research commitments.</p>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                <button className="px-6 py-2 rounded-lg text-sm font-bold bg-brand-forest text-white">All Projects</button>
                <button className="px-6 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-brand-forest transition-colors">Ongoing</button>
                <button className="px-6 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-brand-forest transition-colors">Completed</button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {sampleProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 hover:bg-brand-red/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-6 max-w-3xl">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      project.status === 'Completed' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {project.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-brand-red transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hub: Food Innovation Hub</span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          project.status === 'Completed' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                        )}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to="#" className="w-12 h-12 border border-brand-red rounded-full flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submission CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-brand-forest rounded-[2.5rem] p-12 text-white relative overflow-hidden group"
          >
            <div className="relative z-10 md:flex items-center justify-between gap-12">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-[0.2em] mb-6">
                  <FileText className="w-4 h-4" />
                  Research Openings
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Do you have an idea to research on?</h3>
                <p className="text-white/50 text-lg">We're always looking for innovative proposals from motivated students. Submit your project for review today.</p>
              </div>
              <div className="mt-10 md:mt-0">
                <Link
                  to="/proposals/submit"
                  className="inline-flex items-center gap-3 bg-brand-lime text-brand-onyx px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-brand-forest transition-all transform hover:scale-105"
                >
                  Submit a project <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
            {/* Background flourish */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:bg-brand-red/20 transition-all duration-700"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
