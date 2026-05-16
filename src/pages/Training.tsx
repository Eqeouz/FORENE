import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Clock, MonitorPlay, Filter, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const sampleCourses = [
  { id: 1, title: 'Fundamentals of Designing a Food Research Study', badge: 'Free', audience: 'Students' },
  { id: 2, title: 'Introduction to: Based Food Innovation Practices', badge: 'Paid', audience: 'Students' },
  { id: 3, title: 'Research Ethics and Integrity in Food Science', badge: 'Free', audience: 'Students' },
  { id: 4, title: 'Data Collection and Analysis for Food Studies', badge: 'Paid', audience: 'Students' },
  { id: 5, title: 'Writing and Publishing Research Papers Effectively', badge: 'Free', audience: 'Students' },
  { id: 6, title: 'Food Safety Standards and Global Best Practices', badge: 'Paid', audience: 'Students' },
  { id: 7, title: 'Applying Technology in Modern Food Research Methods', badge: 'Free', audience: 'Students' },
  { id: 8, title: 'Sustainable Food Systems and Climate Change Impact', badge: 'Paid', audience: 'Students' },
  { id: 9, title: 'Practical Training in Laboratory Research Procedure', badge: 'Free', audience: 'Students' },
  { id: 10, title: 'Collaboration Models Between Academia and Food Industry', badge: 'Paid', audience: 'Students' },
  { id: 11, title: 'Grant Writing and Funding for Food Research', badge: 'Free', audience: 'Students' },
  { id: 12, title: 'Innovation Pathways in Food Processing and Preservation', badge: 'Paid', audience: 'Students' },
  { id: 13, title: 'Communicating Science to Policymakers and the Public', badge: 'Free', audience: 'Students' },
  { id: 14, title: 'Mentorship and Career Development in Food Research', badge: 'Paid', audience: 'Students' },
  { id: 15, title: 'Advanced Food Microbiology and Safety', badge: 'Free', audience: 'Students' },
];

const filters = ['All', 'Training', 'Connections', 'Series'];

export default function Training() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="flex flex-col bg-brand-grey min-h-screen">
      {/* Subheader */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-black rounded flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight">FORENE Learning</span>
          </div>
          <Link to="/profile" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition-colors">
            <User className="w-4 h-4" />
            My Profile
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="md:flex justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tighter">Master the Art of <span className="text-brand-red">Research.</span></h1>
            <p className="text-gray-500 text-lg">Build specialized skills through our expert-led programs designed for the next generation of food scientists.</p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  activeFilter === filter 
                    ? "bg-brand-black text-white shadow-xl shadow-brand-black/10" 
                    : "bg-white text-gray-500 hover:bg-gray-50"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1576085898323-218337e3e43c?q=80&w=2070&auto=format&fit=crop&sig=${course.id}`} 
                  alt={course.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg",
                    course.badge === 'Free' ? "bg-green-500 text-white" : "bg-brand-red text-white"
                  )}>
                    {course.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                    <MonitorPlay className="w-6 h-6 text-brand-black" />
                  </div>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black text-brand-red uppercase tracking-widest border border-brand-red/20 px-2 py-0.5 rounded">For: {course.audience}</span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase transition-widest">
                    <Clock className="w-3 h-3" />
                    4 Hours
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-6 leading-snug group-hover:text-brand-red transition-colors flex-grow">
                  {course.title}
                </h3>
                <Link 
                  to={`/training/${course.id}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-black text-brand-black hover:gap-3 transition-all"
                >
                  Start Learning <BookOpen className="w-4 h-4 text-brand-red" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More/CTA */}
        <div className="text-center mt-20">
          <button className="bg-white border-2 border-brand-black/5 text-brand-black px-12 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center gap-3 mx-auto">
            Load More Courses <Filter className="w-5 h-5 opacity-30" />
          </button>
        </div>
      </div>
    </div>
  );
}
