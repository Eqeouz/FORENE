import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  FileText, 
  BookOpen, 
  LayoutDashboard, 
  Plus, 
  Search, 
  Settings, 
  LogOut,
  Bell,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  UserCheck,
  Lock,
  Loader2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../components/FirebaseProvider';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

const sidebarLinks = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'memberships', name: 'Memberships', icon: UserCheck },
  { id: 'proposals', name: 'Research Proposals', icon: FileText },
  { id: 'insights', name: 'Insights Articles', icon: BookOpen },
  { id: 'training', name: 'Training Courses', icon: BookOpen },
  { id: 'projects', name: 'Projects', icon: LayoutDashboard },
];

export default function Admin() {
  const { user, isAdmin, loading, login, logout } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [memberships, setMemberships] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;

    const qMembers = query(collection(db, 'memberships'), orderBy('createdAt', 'desc'));
    const unsubMembers = onSnapshot(qMembers, (snapshot) => {
      setMemberships(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error('Members error:', err);
    });

    const qProposals = query(collection(db, 'proposals'), orderBy('createdAt', 'desc'));
    const unsubProposals = onSnapshot(qProposals, (snapshot) => {
      setProposals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error('Proposals error:', err);
    });

    return () => {
      unsubMembers();
      unsubProposals();
    };
  }, [isAdmin]);

  const handleUpdateStatus = async (collectionName: string, docId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, collectionName, docId), { status: newStatus });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${collectionName}/${docId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-grey flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Initialising System...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-12 rounded-[3rem] max-w-lg w-full backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-brand-forest rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-forest/40">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4 italic font-serif">Restricted Entry</h1>
          <p className="text-white/40 mb-10 leading-relaxed">
            This module is reserved for authorized FORENE administrators only. Please sign in with an administrator account to proceed.
          </p>
          <button 
            onClick={login}
            className="w-full bg-brand-lime text-brand-onyx py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
          >
            Access System
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Return to Public Site
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-grey pt-0">
      {/* Sidebar */}
      <aside className="w-80 bg-brand-forest text-white p-8 flex flex-col fixed h-screen z-50">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-brand-forest font-black text-xl italic font-serif">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter">FORENE</h1>
            <span className="text-[8px] uppercase tracking-widest text-white/40 block">Admin Control</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveView(link.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                activeView === link.id ? "bg-white text-brand-black shadow-xl" : "hover:bg-white/5 text-white/50 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <link.icon className={cn("w-5 h-5", activeView === link.id ? "text-brand-forest text-brand-forest" : "opacity-40")} />
                <span className="font-bold text-sm">{link.name}</span>
              </div>
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
          <button className="w-full flex items-center gap-4 p-4 text-white/40 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-bold">Settings</span>
          </button>
          <button onClick={logout} className="w-full flex items-center gap-4 p-4 text-brand-lime hover:bg-brand-lime hover:text-brand-onyx rounded-2xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-80 p-12">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] font-black text-brand-forest mb-2">Management Panel</h2>
            <h3 className="text-4xl font-bold capitalize">{activeView.replace('-', ' ')}</h3>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-red transition-all w-64 shadow-sm"
              />
            </div>
            <button className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-brand-black relative hover:shadow-lg transition-all">
              <Bell className="w-5 h-5" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-brand-red rounded-full border-2 border-white"></div>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
               <div className="text-right">
                 <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{user?.displayName || 'Admin'}</p>
                 <span className="text-[10px] text-gray-400 font-bold">System Administrator</span>
               </div>
               <div className="w-12 h-12 rounded-xl bg-brand-forest flex items-center justify-center text-white font-black italic">
                 {user?.displayName?.substring(0, 2).toUpperCase() || 'AD'}
               </div>
            </div>
          </div>
        </header>

        <section>
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Total Members', val: memberships.length.toString(), grow: '+100%', color: 'text-brand-forest' },
                  { label: 'New Proposals', val: proposals.filter(p => p.status === 'pending').length.toString(), grow: 'Action Needed', color: 'text-blue-600' },
                  { label: 'System Uptime', val: '99.9%', grow: 'Stable', color: 'text-green-600' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-brand-black/5">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-4 block">{stat.label}</span>
                    <div className="flex items-end justify-between">
                      <span className="text-5xl font-black">{stat.val}</span>
                      <span className={cn("text-xs font-black px-2 py-1 rounded-lg bg-gray-50", stat.color)}>{stat.grow}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10">
                <div className="flex justify-between items-center mb-10">
                  <h4 className="text-xl font-bold">Recent Activities</h4>
                  <button className="text-[10px] uppercase font-black text-gray-400 hover:text-brand-red transition-colors">View All</button>
                </div>
                <div className="space-y-6">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-forest/10 text-brand-forest flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">New Membership Approved</p>
                          <span className="text-[10px] text-gray-400">Sarah Jenkins • 2 hours ago</span>
                        </div>
                      </div>
                      <MoreVertical className="w-4 h-4 text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}          {activeView === 'memberships' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-brand-black/5">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4 px-6 py-2 bg-white rounded-xl border border-gray-200 w-fit">
                   <Users className="w-4 h-4 text-brand-forest" />
                   <span className="text-xs font-black uppercase tracking-widest">Membership Applications ({memberships.length})</span>
                </div>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Applicant</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Type</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Institution</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Date</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Status</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((member) => (
                    <tr key={member.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <div className="font-bold">{member.fullName}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[150px]">{member.phone}</div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="px-3 py-1 bg-brand-grey rounded-full text-[10px] font-black uppercase tracking-widest">{member.membershipType}</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-sm font-medium">{member.school}</div>
                      </td>
                      <td className="px-10 py-6 text-sm text-gray-400">{member.createdAt?.toDate().toLocaleDateString() || 'Recently'}</td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                          member.status === 'pending' ? "text-amber-600" : member.status === 'approved' ? "text-green-600" : "text-brand-red"
                        )}>
                          <div className={cn("w-2 h-2 rounded-full", member.status === 'pending' ? "bg-amber-600" : member.status === 'approved' ? "bg-green-600" : "bg-brand-red")}></div>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button onClick={() => handleUpdateStatus('memberships', member.id, 'approved')} className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
                           <button onClick={() => handleUpdateStatus('memberships', member.id, 'rejected')} className="p-2 hover:bg-red-50 text-brand-forest rounded-lg transition-colors"><XCircle className="w-5 h-5" /></button>
                           <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Eye className="w-5 h-5 text-gray-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeView === 'proposals' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-brand-black/5">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4 px-6 py-2 bg-white rounded-xl border border-gray-200 w-fit">
                   <FileText className="w-4 h-4 text-brand-forest" />
                   <span className="text-xs font-black uppercase tracking-widest">Research Proposals ({proposals.length})</span>
                </div>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Title</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Researcher</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">Status</th>
                    <th className="px-10 py-6 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((proposal) => (
                    <tr key={proposal.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <div className="font-bold max-w-[300px] truncate">{proposal.title}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">{proposal.researchArea}</div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-sm font-medium">{proposal.fullName}</div>
                        <div className="text-[10px] text-gray-400 font-bold">{proposal.institution}</div>
                      </td>
                      <td className="px-10 py-6 text-sm">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          proposal.status === 'pending' ? "bg-amber-100 text-amber-600" : proposal.status === 'approved' ? "bg-green-100 text-green-600" : "bg-red-100 text-brand-red"
                        )}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button onClick={() => handleUpdateStatus('proposals', proposal.id, 'approved')} className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
                           <button onClick={() => handleUpdateStatus('proposals', proposal.id, 'rejected')} className="p-2 hover:bg-brand-red/10 text-brand-red rounded-lg transition-colors"><XCircle className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Placeholders for other views */}
          {activeView !== 'dashboard' && activeView !== 'memberships' && activeView !== 'proposals' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center">
               <div className="w-24 h-24 bg-brand-grey rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
                 <LayoutDashboard className="w-10 h-10 text-gray-300" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Management under construction</h3>
               <p className="text-gray-400 max-w-sm mx-auto">This section is being updated with the latest research modules and system endpoints.</p>
               <button onClick={() => setActiveView('dashboard')} className="mt-8 bg-brand-black text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-red transition-all">Back to Dashboard</button>
            </div>
          )}
        </section>

        {/* Global Action Float */}
        <button className="fixed bottom-12 right-12 bg-brand-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl hover:bg-brand-red hover:shadow-brand-red/20 transition-all transform hover:scale-105 group active:scale-95">
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          Create New Entry
        </button>
      </main>
    </div>
  );
}
