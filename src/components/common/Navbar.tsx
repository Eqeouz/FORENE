import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, LogIn, LogOut, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../FirebaseProvider';
import Logo from './Logo';

const navLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Membership', href: '/membership' },
  { name: 'Training Programs', href: '/training' },
  { name: 'Projects', href: '/projects' },
  { name: 'Insights', href: '/insights' },
  { name: 'Partner with Us', href: '/partner' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { user, login, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled ? 'bg-white/90 backdrop-blur-md py-3 border-gray-200 shadow-sm' : 'bg-white py-5 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo variant="brand" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-red',
                  location.pathname === link.href ? 'text-brand-red font-bold' : 'text-brand-black/70'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-onyx leading-none">{user.displayName || 'User'}</p>
                    {isAdmin && <Link to="/admin" className="text-[8px] uppercase tracking-widest text-brand-lime font-black hover:underline">Admin Panel</Link>}
                  </div>
                  <button onClick={logout} className="p-2 text-gray-400 hover:text-brand-lime transition-colors" title="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="flex items-center gap-2 text-sm font-bold text-brand-onyx hover:text-brand-lime transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}

              <Link
                to="/membership"
                className="bg-brand-forest text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-lime hover:text-brand-onyx transition-all transform hover:scale-105"
              >
                Apply
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-brand-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'flex items-center justify-between p-4 text-lg font-medium border-b border-gray-50',
                    location.pathname === link.href ? 'text-brand-red' : 'text-brand-black'
                  )}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 opacity-30" />
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link
                  to="/membership"
                  className="block w-full bg-brand-black text-white text-center py-4 rounded-xl font-bold hover:bg-brand-red transition-colors"
                >
                  Apply for Membership
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
