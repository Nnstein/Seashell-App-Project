import { motion, AnimatePresence } from 'framer-motion';
import { Home, Images, BedDouble, UtensilsCrossed, MapPin, LogIn, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import type { ReactNode } from 'react';

type PublicTab = 'home' | 'rooms' | 'dining' | 'facilities' | 'gallery' | 'contact';

interface PublicLayoutProps {
  children: ReactNode;
  activeTab: PublicTab;
  onTabChange: (tab: PublicTab) => void;
  onCheckIn: () => void;
}

const navItems: { id: PublicTab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'rooms', label: 'Rooms', icon: BedDouble },
  { id: 'dining', label: 'Dine', icon: UtensilsCrossed },
  { id: 'facilities', label: 'Facilities', icon: MapPin },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'contact', label: 'Contact', icon: MapPin },
];

export default function PublicLayout({ children, activeTab, onTabChange, onCheckIn }: PublicLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Public Header */}
      <header className="sticky top-0 z-50 px-5 py-4 flex items-center justify-between" style={{ backgroundColor: 'var(--app-bg)' }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="SeaShell" className="w-9 h-9 object-contain" />
          <div>
            <span className="text-base font-bold tracking-tight block leading-none" style={{ color: 'var(--brand-cyan)' }}>SEASHELL</span>
            <span className="text-[9px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Hotel & Resort</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface-elevated)' }}>
            {theme === 'light' ? <Moon size={16} style={{ color: 'var(--text-secondary)' }} /> : <Sun size={16} style={{ color: 'var(--fab-bg)' }} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCheckIn}
            className="px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-1.5"
            style={{ backgroundColor: 'var(--brand-cyan)' }}
          >
            <LogIn size={14} />
            Check In
          </motion.button>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-md mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Public Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe" style={{ backgroundColor: 'var(--nav-bg)', borderTop: '1px solid var(--nav-border)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-md mx-auto flex items-center justify-around px-1 pt-1.5 pb-4">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center justify-center gap-0.5 py-1 flex-1"
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }} />
                <span className="text-[9px] font-semibold" style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }}>{item.label}</span>
                {isActive && <motion.div layoutId="pubTab" className="absolute bottom-3 w-4 h-0.5 rounded-full" style={{ backgroundColor: 'var(--brand-cyan)' }} />}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
