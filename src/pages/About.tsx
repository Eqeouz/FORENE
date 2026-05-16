import { motion } from 'motion/react';
import { Target, Eye, Rocket, Calendar, CheckCircle2 } from 'lucide-react';

const roadmap = [
  {
    date: 'March 2024',
    title: 'Accept IT Students',
    desc: 'Open doors and start positioning FORENE as a student training destination.'
  },
  {
    date: 'April 2024',
    title: 'Commence Research Hub',
    desc: 'Open research tracks and accept proposals from food science students.'
  },
  {
    date: 'June 2024',
    title: 'Global Outreach',
    desc: 'Establish partnerships with international research bodies and NGOs.'
  },
  {
    date: 'September 2024',
    title: 'Annual Symposium',
    desc: 'Host the first student-led food research symposium.'
  }
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white text-brand-black pt-32 pb-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
          >
            Nurturing <span className="text-brand-red">Excellence</span> <br />
            in Food Research.
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            FORENE is more than a network; it's a movement dedicated to placing students at the forefront of global food innovation.
          </p>
        </div>
        {/* Background image fade */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=2070&auto=format&fit=crop"
            alt="Research lab"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="-mt-24 pb-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the world's leading student-first food research network, recognized for driving innovation, ethical research practices, and scalable impact on global food systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-black text-white p-12 rounded-[2.5rem] shadow-xl"
            >
              <div className="w-16 h-16 bg-white/10 text-brand-red rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-white/60 leading-relaxed">
                To provide a collaborative platform where students and professionals co-create knowledge, receive world-class training, and publish research that shapes a sustainable future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="relative mb-16 lg:mb-0">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-red p-8 rounded-3xl text-white shadow-xl max-w-xs">
                <CheckCircle2 className="w-10 h-10 mb-4" />
                <p className="font-bold text-lg leading-tight italic">Since 2024, leading the change in food research education.</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] font-black text-brand-red mb-4">Our Story</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Founded on the belief that student curiosity drives innovation.</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  FORENE was born from a simple observation: students are often the primary laborers in research but rarely the leaders. We set out to change that power dynamic.
                </p>
                <p>
                  By creating a network that prioritizes student leadership, we're not just producing papers—we're producing resilient, ethical, and highly skilled research professionals ready to tackle global food insecurity and systems challenges.
                </p>
                <p>
                  What started as a small local hub has quickly expanded into a global network of partners, stretching across government, NGOs, and academia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-32 bg-brand-grey border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-sm uppercase tracking-[0.2em] font-black text-brand-red mb-4">The Roadmap</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">Our Journey of Impact</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roadmap.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative z-10 bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="hidden lg:flex absolute top-[-30px] left-1/2 -translate-x-1/2 w-6 h-6 border-4 border-white bg-brand-red rounded-full shadow-lg"></div>
                  <div className="text-brand-red font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Re-iterated */}
      <section className="py-32 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm uppercase tracking-[0.2em] font-black text-brand-red mb-4">Partner Network</h2>
            <h3 className="text-4xl font-bold">Trusted by World Leaders</h3>
          </div>

          <div className="space-y-24">
            <div>
              <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-[.5em] text-center mb-10 border-b pb-4 border-gray-50 max-w-xs mx-auto">Government Institutions</h4>
              <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40">
                {['Linode', 'Google Cloud', 'AWS'].map(n => <span key={n} className="text-3xl font-black tracking-tighter">{n}</span>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-[.5em] text-center mb-10 border-b pb-4 border-gray-50 max-w-xs mx-auto">NGOs / International Bodies</h4>
              <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40">
                {['VULTR', 'DigitalOcean'].map(n => <span key={n} className="text-3xl font-black tracking-tighter">{n}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
