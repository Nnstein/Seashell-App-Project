import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Hotel, ShieldCheck, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingButton } from '@/components/loading';

interface LoginScreenProps {
  onBack: () => void;
  onAdminLogin: () => void;
}

export default function LoginScreen({ onBack, onAdminLogin }: LoginScreenProps) {
  const { login } = useAuth();
  const [roomNumber, setRoomNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(roomNumber, pin);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface-elevated)' }}>
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </motion.button>
        <span className="text-lg font-semibold">Guest Check-In</span>
      </div>

      {/* Hero Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 p-3"
          style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}
        >
          <img src="/logo.png" alt="SeaShell" className="w-full h-full object-contain" />
        </motion.div>

        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="text-sm text-center mb-8" style={{ color: 'var(--text-muted)' }}>
          Enter your room details to access your in-room services
        </motion.p>

        {/* Login Form */}
        <motion.form initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Room Number</label>
            <div className="relative">
              <Hotel size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="text" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} placeholder="e.g. 304"
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-base font-medium outline-none transition-colors"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>PIN Code</label>
            <div className="relative">
              <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type={showPin ? 'text' : 'password'} value={pin} onChange={e => setPin(e.target.value)} placeholder="4-digit PIN" maxLength={4}
                className="w-full pl-11 pr-12 py-4 rounded-2xl text-base font-medium outline-none transition-colors tracking-widest"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} />
              <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPin ? <EyeOff size={18} style={{ color: 'var(--text-muted)' }} /> : <Eye size={18} style={{ color: 'var(--text-muted)' }} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-center font-medium" style={{ color: 'var(--brand-salmon)' }}>
              {error}
            </motion.p>
          )}

          <LoadingButton type="submit" loading={isLoading} loadingText="Verifying..."
            className="w-full py-4 rounded-2xl font-semibold text-white text-base"
            style={{ backgroundColor: 'var(--brand-cyan)' }}>
            Access My Room
          </LoadingButton>
        </motion.form>

        {/* Demo Credentials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 p-4 rounded-2xl w-full max-w-sm" style={{ backgroundColor: 'var(--surface)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Demo Credentials</p>
          <div className="space-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <p>Room: <span className="font-mono font-bold">304</span> &nbsp; PIN: <span className="font-mono font-bold">1234</span></p>
            <p>Room: <span className="font-mono font-bold">512</span> &nbsp; PIN: <span className="font-mono font-bold">5678</span></p>
          </div>
        </motion.div>

        {/* Staff Login Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--nav-border)' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Staff Only</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--nav-border)' }} />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onAdminLogin}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2.5"
            style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}
          >
            <Shield size={18} />
            Staff Portal — Admin Login
          </motion.button>
          <p className="text-[10px] text-center mt-2" style={{ color: 'var(--text-muted)' }}>
            For resort management, reception, and supervisory staff
          </p>
        </motion.div>
      </div>
    </div>
  );
}
