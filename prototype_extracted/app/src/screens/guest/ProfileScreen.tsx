import { motion } from 'framer-motion';
import {
  User, Calendar, Moon, Globe, LogOut, ChevronRight,
  HelpCircle, FileText, Star, Shield
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { LoadingButton } from '@/components/loading';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const { guest, logout } = useAuth();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [signingOut, setSigningOut] = useState(false);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const menuItems = [
    {
      id: 'checkin',
      icon: Calendar,
      label: 'Stay Details',
      value: guest ? `${formatDate(guest.checkInDate)} - ${formatDate(guest.checkOutDate)}` : 'Jun 22 - Jun 28, 2026',
      color: '#89C1D8',
    },
    {
      id: 'theme',
      icon: Moon,
      label: 'Appearance',
      value: theme === 'light' ? 'Light Mode' : 'Dark Mode',
      color: '#A78BFA',
      action: toggleTheme,
    },
    {
      id: 'language',
      icon: Globe,
      label: 'Language',
      value: language === 'en' ? 'English' : 'العربية',
      color: '#4ADE80',
      action: () => setLanguage(l => l === 'en' ? 'ar' : 'en'),
    },
    {
      id: 'privacy',
      icon: Shield,
      label: 'Privacy Policy',
      value: '',
      color: '#FB923C',
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help & Support',
      value: '',
      color: '#60A5FA',
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Terms of Service',
      value: '',
      color: '#A78BFA',
    },
  ];

  return (
    <div className="min-h-full pb-28">
      <div className="px-5 pt-6 pb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Profile</h1>
      </div>

      {/* Guest Profile Card */}
      <div className="px-5 mb-6">
        <div className="p-5 rounded-3xl flex items-center gap-4" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--tile-rooms-bg)' }}>
            <User size={28} style={{ color: '#0284C7' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold truncate">{guest?.guestName || 'Welcome, Guest'}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Room {guest?.roomNumber || '304'} · SeaShell Resort</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} style={{ color: '#FDE68A', fill: '#FDE68A' }} />
              ))}
              <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>5-Star Resort</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={item.action}
              className="w-full p-4 rounded-2xl flex items-center gap-3 text-left"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}18` }}>
                <Icon size={18} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                {item.value && (
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.value}</p>
                )}
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </motion.button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-5 mt-6">
        <LoadingButton
          loading={signingOut}
          loadingText="Signing out..."
          spinnerColor="brand"
          onClick={() => { setSigningOut(true); setTimeout(() => logout(), 800); }}
          className="w-full p-4 rounded-2xl"
          style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}
        >
          <LogOut size={16} style={{ color: 'var(--brand-salmon)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--brand-salmon)' }}>Sign Out</span>
        </LoadingButton>
        <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          SeaShell Guest App v1.0.0
        </p>
      </div>
    </div>
  );
}
