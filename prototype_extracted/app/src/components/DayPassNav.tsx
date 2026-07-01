import { motion } from 'framer-motion';
import { Wallet, Map, Clock, User } from 'lucide-react';

type DayPassTab = 'wallet' | 'map' | 'history' | 'account';

interface DayPassNavProps {
  activeTab: DayPassTab;
  onTabChange: (tab: DayPassTab) => void;
}

const tabs: { id: DayPassTab; label: string; icon: typeof Wallet }[] = [
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'account', label: 'Account', icon: User },
];

export default function DayPassNav({ activeTab, onTabChange }: DayPassNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe px-3 pb-4 pointer-events-none">
      <nav
        className="pointer-events-auto relative flex items-center px-1.5 py-1.5 gap-0.5"
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderRadius: '28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid var(--nav-border)',
        }}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-[68px] h-[52px] rounded-2xl transition-colors"
              whileTap={{ scale: 0.92 }}
            >
              {isActive && (
                <motion.div
                  layoutId="daypassNavBg"
                  className="absolute inset-0 rounded-2xl"
                  style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ color: isActive ? 'var(--tile-kitchen)' : 'var(--text-muted)' }}
                />
                <span className="text-[9px] font-semibold mt-0.5 leading-tight" style={{ color: isActive ? 'var(--tile-kitchen)' : 'var(--text-muted)' }}>
                  {tab.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
