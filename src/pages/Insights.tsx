import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ListFilter, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const sampleInsights = [
  {
    id: 1,
    title: 'The Future of Food Research: Student Voices Driving Change',
    category: 'Lab-work',
    date: 'May 12, 2024',
    excerpt: 'How student-led research initiatives are challenging traditional academic hierarchies and bringing fresh perspectives to food system innovation.',
    featured: true
  },
  {
    id: 2,
    title: 'Nutrition Gaps in Africa: What the Next Generation Can Solve',
    category: 'Industry Practice',
    date: 'May 10, 2024',
    excerpt: 'Exploring the critical role of young researchers in addressing the continental nutritional deficit through indigenous crop studies.'
  },
  {
    id: 3,
    title: 'Collaboration Models: How Students and Experts Build Better Research Together',
    category: 'Connections',
    date: 'May 08, 2024',
    excerpt: 'A deep dive into the mentorship frameworks used at FORENE to bridge the gap between classroom theory and laboratory results.'
  },
  {
    id: 4,
    title: 'From Classroom to Lab: Bridging Education with Real-World Food Challenges',
    category: 'Lab-work',
    date: 'May 05, 2024',
    excerpt: 'Practical insights into translating academic curricula into actionable research projects that benefit local food businesses.'
  },
  {
    id: 5,
    title: 'Determining drugs, heavy metals, and oxytocins in fish muscles',
    category: 'Lab-work',
    date: 'May 02, 2024',
    excerpt: 'A technical review of emerging contaminants in aquaculture and the methodological challenges of laboratory detection.'
  },
  {
    id: 6,
    title: 'Food Security and Climate Change: Insights from Young Researchers',
    category: 'Industry Practice',
    date: 'April 28, 2024',
    excerpt: 'Innovative approaches to climate-smart agriculture and the adaptation strategies being developed by our resident researchers.'
  }
];

const categories = ['All', 'Lab-work', 'Industry Practice', 'Connections'];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = sampleInsights.find(i => i.featured);
  const others = sampleInsights.filter(i => !i.featured);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-grey pt-32 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
              Knowledge is meant to be <span className="text-brand-red">shared.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Our Insights page highlights new ideas, emerging trends, and practical research shaping the future of food systems. Actionable knowledge for learners, researchers, and practitioners.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Insight */}
      {featured && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-brand-forest text-white shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/20 to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-brand-lime text-brand-onyx px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Featured Article</span>
                <span className="flex items-center gap-2 text-xs font-bold opacity-60">
                  <Calendar className="w-4 h-4" />
                  {featured.date}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 max-w-3xl leading-tight font-serif italic">
                {featured.title}
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-2xl leading-relaxed">
                {featured.excerpt}
              </p>
              <Link
                to={`/insights/${featured.id}`}
                className="inline-flex items-center gap-3 bg-brand-lime text-brand-onyx px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-forest transition-all w-fit"
              >
                Read Full Insight <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Filters & Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center">
               <Sparkles className="w-5 h-5" />
             </div>
             <h3 className="text-2xl font-bold">Latest Insights</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2",
                  activeCategory === cat
                    ? "bg-brand-forest text-white border-brand-forest"
                    : "bg-transparent text-gray-400 border-gray-100 hover:border-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {others.map((insight, idx) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 2) * 0.1 }}
              className="group flex flex-col gap-6"
            >
              <Link to={`/insights/${insight.id}`} className="block relative aspect-video rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-lg">
                <img
                  src={`https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop&sig=${insight.id}`}
                  alt={insight.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-black shadow-xl">
                    {insight.category}
                  </span>
                </div>
              </Link>
              
              <div className="space-y-4 px-4">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-brand-red transition-colors">
                  <Calendar className="w-4 h-4" />
                  {insight.date}
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <User className="w-4 h-4" />
                   By FORENE Team
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-red transition-colors">
                  {insight.title}
                </h3>
                <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed">
                  {insight.excerpt}
                </p>
                <Link
                  to={`/insights/${insight.id}`}
                  className="inline-flex items-center gap-2 text-sm font-black text-brand-black hover:gap-4 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4 text-brand-red" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-brand-forest text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-lime hover:text-brand-onyx transition-all shadow-xl shadow-brand-forest/10">
            Load More Insights
          </button>
        </div>
      </section>
    </div>
  );
}
