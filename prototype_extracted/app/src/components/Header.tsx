import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 px-5 pt-4 pb-2" style={{ backgroundColor: 'var(--app-bg)' }}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <img src="/logo.png" alt="SeaShell" className="w-10 h-10 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--brand-cyan)' }}>
              SEASHELL
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
              Hotel & Resort
            </span>
          </div>
        </motion.div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'var(--surface-elevated)' }}
          >
            {theme === 'light' ? (
              <Moon size={18} style={{ color: 'var(--text-secondary)' }} />
            ) : (
              <Sun size={18} style={{ color: 'var(--fab-bg)' }} />
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative"
            style={{ backgroundColor: 'var(--surface-elevated)' }}
          >
            <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
