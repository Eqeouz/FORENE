import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, GraduationCap, Users, LayoutDashboard, ArrowRight, Share2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const whatWeDo = [
  {
    title: 'Membership',
    description: 'We unlock student potential through collaborative, real-world food research.',
    icon: Users,
    href: '/membership'
  },
  {
    title: 'Training Programs',
    description: 'Specialized courses and hands-on training to build professional research skills.',
    icon: GraduationCap,
    href: '/training'
  },
  {
    title: 'Projects',
    description: 'Engagement in innovative projects driving change in the food industry.',
    icon: LayoutDashboard,
    href: '/projects'
  },
  {
    title: 'Partnerships',
    description: 'Collaborate with governments, NGOs, and industry leaders globally.',
    icon: Share2,
    href: '/partner'
  }
];

const partners = [
  { name: 'AWS', category: 'Educational' },
  { name: 'Google Cloud', category: 'NGO' },
  { name: 'Linode', category: 'Government' },
  { name: 'VULTR', category: 'Educational' },
  { name: 'DigitalOcean', category: 'NGO' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <span className="bg-red-50 text-brand-red px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest w-fit">
                Student-First Research
              </span>
              <h1 className="text-6xl md:text-7xl font-extrabold text-brand-black leading-[1.1] tracking-tight">
                Empowering Students to <span className="text-brand-red">Lead</span> Research
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Join our premier network dedicated to collaborative research, professional training, and high-impact publication in food science.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  to="/membership"
                  className="bg-brand-onyx text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-lime hover:text-brand-onyx transition-all shadow-xl shadow-brand-onyx/10"
                >
                  Join the Network
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/training"
                  className="border border-gray-300 px-8 py-4 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-all text-center"
                >
                  Explore Programs
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mt-12 lg:mt-0 relative"
            >
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-[40px] overflow-hidden relative shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                  alt="Students researching"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 max-w-[280px]">
                  <p className="text-xs font-bold text-brand-red mb-1 uppercase tracking-tighter">Active Research</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug italic">"The impact of indigenous grains on addressing global malnutrition.”</p>
                </div>
                {/* Abstract decoration */}
                <div className="absolute top-12 right-12 w-32 h-32 border-4 border-white/30 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaborative Pathways (What We Do) */}
      <section className="py-32 bg-brand-grey px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold tracking-tight">Collaborative Pathways</h3>
              <p className="text-gray-500 mt-2">Unlocking potential through expert-led mentorship and hands-on professional experiences.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-400 cursor-not-allowed">←</div>
              <div className="w-12 h-12 border border-brand-black rounded-full flex items-center justify-center text-brand-black cursor-pointer hover:bg-brand-black hover:text-white transition-all">→</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDo.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-7 rounded-2xl border border-gray-200 hover:border-brand-red transition-all cursor-pointer shadow-sm group"
              >
                <div className="w-12 h-12 bg-white/10 text-brand-lime rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-lime group-hover:text-brand-onyx transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {item.description}
                </p>
                <Link to={item.href} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-black group-hover:text-brand-red transition-colors">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Banner */}
      <section className="bg-brand-forest py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                Join a vibrant community of aspiring and experienced researchers.
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Learn from peers and mentors, share your knowledge, and build lasting connections that propel your professional journey in the food science sector.
              </p>
              <Link
                to="/membership"
                className="inline-flex items-center gap-3 bg-brand-lime text-brand-onyx px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-forest transition-all"
              >
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-16 lg:mt-0 relative">
              <div className="aspect-video lg:aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop"
                  alt="Community interaction"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C0392B_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </section>

      {/* Partners section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] font-black text-brand-red mb-4">Our Partners</h2>
            <p className="text-gray-400 font-medium">Collaborating with global leading institutions and organizations</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {partners.map(p => (
              <div key={p.name} className="flex flex-col items-center">
                <span className="text-2xl font-black text-brand-black tracking-tighter">{p.name}</span>
                <span className="text-[8px] uppercase tracking-widest font-bold text-gray-400">{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
