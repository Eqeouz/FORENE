import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-forest text-gray-400 py-6 px-12 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
      <div className="flex items-center gap-4">
        <span className="font-bold text-white tracking-tighter">FORENE © {new Date().getFullYear()}</span>
        <span className="hidden md:inline">•</span>
        <span>Empowering Students to Lead Research</span>
      </div>
      <div className="flex gap-6 uppercase tracking-widest font-bold">
        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">Instagram</a>
      </div>
    </footer>
  );
}
