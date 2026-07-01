import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Ticket, BedDouble, UtensilsCrossed,
  Droplets, BarChart3, LogOut, Menu, X, Shield, ChevronRight, Bell, Image
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type AdminPage = 'dashboard' | 'guests' | 'daypass' | 'rooms' | 'dining' | 'facilities' | 'reports' | 'content';

interface AdminLayoutProps {
  currentPage: AdminPage;
  onPageChange: (page: AdminPage) => void;
  children: React.ReactNode;
}

const navItems: { id: AdminPage; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'guests', label: 'Guest Management', icon: Users },
  { id: 'daypass', label: 'Day Pass', icon: Ticket },
  { id: 'rooms', label: 'Rooms & Chalets', icon: BedDouble },
  { id: 'dining', label: 'Dining', icon: UtensilsCrossed },
  { id: 'facilities', label: 'Facilities', icon: Droplets },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'content', label: 'Content CMS', icon: Image },
];

export default function AdminLayout({ currentPage, onPageChange, children }: AdminLayoutProps) {
  const { admin, logoutAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleLabel = admin?.role === 'manager' ? 'General Manager' : admin?.role === 'receptionist' ? 'Front Desk' : 'Supervisor';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f1117' }}>
      {/* ═══════ Overlay (darkens main content when sidebar open) ═══════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ═══════ Sidebar (slides in from left) ═══════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col"
            style={{ backgroundColor: '#161b22', borderRight: '1px solid #21262d' }}
          >
            {/* Brand Header */}
            <div className="flex items-center justify-between p-5 h-16">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="SeaShell" className="w-9 h-9 object-contain rounded-xl" />
                <div>
                  <p className="text-sm font-bold text-white">SeaShell</p>
                  <p className="text-[10px] text-cyan-400/60 uppercase tracking-wider">Admin Portal</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Badge */}
            <div className="px-4 pb-4">
              <div className="p-3 rounded-xl flex items-center gap-3" style={{ backgroundColor: 'rgba(137,193,216,0.08)', border: '1px solid rgba(137,193,216,0.12)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(137,193,216,0.15)' }}>
                  <Shield size={18} style={{ color: '#89C1D8' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{admin?.name}</p>
                  <p className="text-[10px] text-cyan-300/50 capitalize">{roleLabel}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
              {navItems.map(item => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onPageChange(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${active ? '' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
                    style={active ? { backgroundColor: 'rgba(137,193,216,0.12)', color: '#89C1D8' } : {}}
                  >
                    <item.icon size={18} />
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronRight size={14} />}
                  </button>
                );
              })}
            </nav>

            {/* Footer / Sign Out */}
            <div className="p-3 border-t" style={{ borderColor: '#21262d' }}>
              <button
                onClick={() => { logoutAdmin(); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ═══════ Top Bar (with hamburger) ═══════ */}
      <header
        className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3 lg:px-6"
        style={{ backgroundColor: '#0f1117', borderBottom: '1px solid #21262d' }}
      >
        {/* Hamburger Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </motion.button>

        {/* Page Title */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-white truncate capitalize">
            {navItems.find(n => n.id === currentPage)?.label || 'Dashboard'}
          </h2>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <div className="hidden sm:flex items-center gap-2 ml-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#89C1D8' }}>
              {admin?.name.charAt(0)}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">{admin?.name.split(' ').pop()}</p>
              <p className="text-[10px] text-cyan-300/40 capitalize">{roleLabel}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════ Main Content ═══════ */}
      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
