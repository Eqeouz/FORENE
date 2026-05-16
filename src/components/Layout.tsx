import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { motion } from 'motion/react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-grey selection:bg-brand-red/10 selection:text-brand-red">
      <Navbar />
      <main className="flex-grow pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
