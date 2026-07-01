import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminLoginProps {
  onBack: () => void;
}

export default function AdminLogin({ onBack }: AdminLoginProps) {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = loginAdmin(email, password);
      if (!result.success) setError(result.error || 'Login failed');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg, #0f2932 0%, #1a3a4a 50%, #0d2832 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo-white.jpg" alt="SeaShell" className="w-20 h-20 rounded-2xl object-contain mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <h1 className="text-2xl font-bold text-white tracking-tight">SeaShell Admin</h1>
          <p className="text-sm text-cyan-300/60 mt-1">Resort Management Dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(137,193,216,0.15)' }}>
              <Shield size={20} style={{ color: '#89C1D8' }} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Staff Sign In</p>
              <p className="text-cyan-300/40 text-xs">Authorized personnel only</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300/50 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-300/40" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="manager@seashell.kw"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/20 outline-none border border-white/10 focus:border-cyan-400/40 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300/50 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-300/40" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-white/5 text-white placeholder:text-white/20 outline-none border border-white/10 focus:border-cyan-400/40 transition-colors" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {showPw ? <EyeOff size={15} className="text-cyan-300/40" /> : <Eye size={15} className="text-cyan-300/40" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

            <motion.button whileTap={{ scale: 0.97 }}
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-50"
              style={{ backgroundColor: '#89C1D8' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-5 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300/40 mb-2">Demo Accounts</p>
            <div className="space-y-1 text-[11px] text-white/50">
              <p><span className="text-cyan-300/60 font-mono">manager@seashell.kw</span> / admin2026</p>
              <p><span className="text-cyan-300/60 font-mono">reception@seashell.kw</span> / frontdesk2026</p>
            </div>
          </div>
        </div>

        <button onClick={onBack} className="flex items-center gap-2 mx-auto mt-6 text-xs text-cyan-300/40 hover:text-cyan-300/70 transition-colors">
          <ArrowLeft size={14} /> Back to Guest App
        </button>
      </motion.div>
    </div>
  );
}
