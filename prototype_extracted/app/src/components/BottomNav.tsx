import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, DoorOpen, User, X, KeyRound, Wifi } from 'lucide-react';
import type { TabId } from '@/types';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'main', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'room', label: 'Room', icon: DoorOpen },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <>
      {/* FAB Quick Actions Menu Overlay */}
      <AnimatePresence>
        {fabOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55]"
            onClick={() => setFabOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              {[
                { label: 'Digital Key', icon: KeyRound, color: '#89C1D8', delay: 0.05 },
                { label: 'Wi-Fi Info', icon: Wifi, color: '#4ADE80', delay: 0.15 },
              ].map(action => (
                <motion.button
                  key={action.label}
                  initial={{ y: 30, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 30, opacity: 0, scale: 0.8 }}
                  transition={{ delay: action.delay, type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white font-medium text-sm shadow-xl"
                  style={{ backgroundColor: action.color }}
                  onClick={e => e.stopPropagation()}
                >
                  <action.icon size={18} />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== MODERN ROUNDED BOTTOM NAV ====== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe px-4 pb-5 pointer-events-none">
        <nav
          className="pointer-events-auto relative flex items-center px-2 py-2"
          style={{
            backgroundColor: 'var(--nav-bg)',
            borderRadius: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid var(--nav-border)',
          }}
        >
          {/* Left tabs (Main, Explore) */}
          {tabs.slice(0, 2).map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center w-[60px] h-[52px] rounded-2xl transition-colors"
                whileTap={{ scale: 0.88 }}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }}
                  />
                </motion.div>
                <span
                  className="text-[9px] font-semibold mt-0.5 transition-colors"
                  style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-0.5 w-5 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--brand-cyan)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Center FAB - Digital Key */}
          <div className="relative mx-1">
            <motion.button
              onClick={() => setFabOpen(!fabOpen)}
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: fabOpen
                  ? 'linear-gradient(135deg, #1A1A1E, #2D2D35)'
                  : 'linear-gradient(135deg, #4ADE80, #22C55E)',
                boxShadow: fabOpen
                  ? '0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                  : '0 6px 20px rgba(74, 222, 128, 0.45), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                marginTop: '-28px',
                border: fabOpen ? '2px solid rgba(255,255,255,0.1)' : '3px solid var(--nav-bg)',
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: fabOpen ? 45 : 0,
                scale: fabOpen ? 1.05 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {fabOpen ? (
                <X size={22} className="text-white" />
              ) : (
                <KeyRound size={22} style={{ color: 'white' }} />
              )}
            </motion.button>
            {/* Pulse ring animation when closed */}
            {!fabOpen && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: '2px solid rgba(74, 222, 128, 0.3)',
                }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* Right tabs (Room, Profile) */}
          {tabs.slice(2, 4).map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center w-[60px] h-[52px] rounded-2xl transition-colors"
                whileTap={{ scale: 0.88 }}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }}
                  />
                </motion.div>
                <span
                  className="text-[9px] font-semibold mt-0.5 transition-colors"
                  style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-0.5 w-5 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--brand-cyan)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
