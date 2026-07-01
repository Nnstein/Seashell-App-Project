import { motion } from 'framer-motion';
import { QrCode, Copy, CheckCircle2 } from 'lucide-react';
import SimulatedBarcode from './SimulatedBarcode';
import { useState } from 'react';

interface MasterWalletCardProps {
  balance: number;
  passId: string;
  issuedAt: string;
}

export default function MasterWalletCard({ balance, passId, issuedAt }: MasterWalletCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(passId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="relative rounded-3xl overflow-hidden p-5"
      style={{
        background: 'linear-gradient(145deg, #1a3a4a 0%, #0d2832 40%, #0a1f28 70%, #06181f 100%)',
        boxShadow: '0 12px 40px rgba(13, 40, 50, 0.35), 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }} />

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #89C1D8, transparent 70%)' }} />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #4ADE80, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <QrCode size={16} className="text-cyan-300/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300/60">Day Pass</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(137, 193, 216, 0.1)' }}
          >
            {copied ? <CheckCircle2 size={11} className="text-green-400" /> : <Copy size={11} className="text-cyan-300/60" />}
            <span className="text-[9px] font-medium text-cyan-300/60">{copied ? 'Copied' : passId}</span>
          </button>
        </div>

        {/* Balance */}
        <div className="mb-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/40 mb-1">Available Balance</p>
          <div className="flex items-baseline gap-1.5">
            <motion.span
              key={balance}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[42px] font-bold text-white leading-none tracking-tight"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {balance.toFixed(3)}
            </motion.span>
            <span className="text-lg font-semibold text-cyan-300/50">KD</span>
          </div>
        </div>

        {/* Barcode */}
        <div className="bg-white/95 dark:bg-white/95 rounded-xl p-3 mb-4">
          <SimulatedBarcode value={passId} height={52} />
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-cyan-300/30 uppercase tracking-wider">SeaShell Resort</p>
            <p className="text-[9px] text-cyan-300/30">Julai&apos;a, Kuwait</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-cyan-300/30 uppercase tracking-wider">Issued</p>
            <p className="text-[9px] text-cyan-300/30">{formatDate(issuedAt)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
