import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Shield, Mail, Phone, MapPin, Flag, Calendar,
  CreditCard, FileCheck, FileWarning, Edit3, ChevronRight,
  AlertCircle, Copy, Check
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingButton } from '@/components/loading';

interface GuestProfile {
  fullName: string;
  civilId: string;
  nationality: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  emergencyContact: { name: string; phone: string; relation: string };
}

const profile: GuestProfile = {
  fullName: 'Ahmad Fahad Al-Rashid',
  civilId: '288040512345',
  nationality: 'Kuwaiti',
  dateOfBirth: '1988-04-05',
  email: 'ahmad.rashid@email.com',
  phone: '+965 9912 3456',
  emergencyContact: {
    name: 'Sara Al-Rashid',
    phone: '+965 9977 8899',
    relation: 'Spouse',
  },
};

interface Document {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'required';
  icon: typeof FileCheck;
  description: string;
}

const documents: Document[] = [
  {
    id: 'civil-id',
    name: 'Civil ID',
    status: 'verified',
    icon: CreditCard,
    description: 'National identity card verified at check-in',
  },
  {
    id: 'passport',
    name: 'Passport Copy',
    status: 'verified',
    icon: FileCheck,
    description: 'Passport bio-page on file',
  },
  {
    id: 'vaccination',
    name: 'Vaccination Certificate',
    status: 'verified',
    icon: Shield,
    description: 'COVID-19 vaccination record verified',
  },
  {
    id: 'insurance',
    name: 'Travel Insurance',
    status: 'pending',
    icon: FileWarning,
    description: 'Awaiting insurance document upload',
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DayPassAccount() {
  const { wallet, exitDayPass } = useAuth();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="px-5 pt-3 pb-6 space-y-5">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>My Account</h1>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #1a3a4a 0%, #0d2832 50%, #06181f 100%)',
          boxShadow: '0 12px 40px rgba(13, 40, 50, 0.3), 0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <div className="p-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(137, 193, 216, 0.15)' }}>
              <User size={28} style={{ color: '#89C1D8' }} />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{profile.fullName}</p>
              <p className="text-xs text-cyan-300/50">Day Pass Guest</p>
              {wallet && (
                <p className="text-[10px] font-mono text-cyan-300/30 mt-0.5 tracking-wider">{wallet.passId}</p>
              )}
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="flex gap-3">
            <div className="flex-1 p-2.5 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-lg font-bold text-white">{wallet?.balance.toFixed(1)}</p>
              <p className="text-[9px] text-cyan-300/40 uppercase tracking-wider">Balance (KD)</p>
            </div>
            <div className="flex-1 p-2.5 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-lg font-bold text-white">{wallet?.transactions.filter(t => t.type === 'debit').length || 0}</p>
              <p className="text-[9px] text-cyan-300/40 uppercase tracking-wider">Purchases</p>
            </div>
            <div className="flex-1 p-2.5 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-lg font-bold text-green-400">Active</p>
              <p className="text-[9px] text-cyan-300/40 uppercase tracking-wider">Status</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Details */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Personal Details</h3>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: 'var(--app-bg)', color: 'var(--brand-cyan)' }}
          >
            <Edit3 size={10} />
            {editing ? 'Done' : 'Edit'}
          </motion.button>
        </div>

        <div className="space-y-3">
          {/* Civil ID */}
          <DetailRow
            icon={CreditCard}
            label="Civil ID"
            value={profile.civilId}
            copyable
            copied={copiedField === 'civilId'}
            onCopy={() => handleCopy(profile.civilId, 'civilId')}
            important
          />
          {/* Full Name */}
          <DetailRow
            icon={User}
            label="Full Name"
            value={profile.fullName}
          />
          {/* Nationality */}
          <DetailRow
            icon={Flag}
            label="Nationality"
            value={profile.nationality}
          />
          {/* Date of Birth */}
          <DetailRow
            icon={Calendar}
            label="Date of Birth"
            value={formatDate(profile.dateOfBirth)}
          />
          {/* Email */}
          <DetailRow
            icon={Mail}
            label="Email"
            value={profile.email}
            copyable
            copied={copiedField === 'email'}
            onCopy={() => handleCopy(profile.email, 'email')}
          />
          {/* Phone */}
          <DetailRow
            icon={Phone}
            label="Phone"
            value={profile.phone}
            copyable
            copied={copiedField === 'phone'}
            onCopy={() => handleCopy(profile.phone, 'phone')}
          />
        </div>
      </motion.div>

      {/* Required Documents */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: 'var(--text-muted)' }}>
          Required Documents
        </h3>
        <div className="space-y-2">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-start gap-3 p-3.5 rounded-2xl"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: doc.status === 'verified' ? 'var(--tile-kitchen-bg)' : doc.status === 'pending' ? 'var(--tile-services-bg)' : 'var(--brand-pink)',
                }}
              >
                <doc.icon
                  size={18}
                  style={{
                    color: doc.status === 'verified' ? 'var(--tile-kitchen)' : doc.status === 'pending' ? '#D97706' : 'var(--brand-salmon)',
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{doc.name}</p>
                  <StatusBadge status={doc.status} />
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{doc.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <button
          onClick={() => setShowEmergency(!showEmergency)}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--brand-pink)' }}>
              <AlertCircle size={18} style={{ color: 'var(--brand-salmon)' }} />
            </div>
            <div>
              <p className="text-sm font-semibold">Emergency Contact</p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{profile.emergencyContact.name}</p>
            </div>
          </div>
          <ChevronRight
            size={16}
            style={{ color: 'var(--text-muted)' }}
            className={`transition-transform ${showEmergency ? 'rotate-90' : ''}`}
          />
        </button>

        <AnimatePresence>
          {showEmergency && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2" style={{ borderTop: '1px solid var(--nav-border)' }}>
                <div className="pt-3 flex justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Name</span>
                  <span className="text-sm font-medium">{profile.emergencyContact.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Phone</span>
                  <span className="text-sm font-medium">{profile.emergencyContact.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Relation</span>
                  <span className="text-sm font-medium">{profile.emergencyContact.relation}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Resort Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Resort Information</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs">King Fahad Highway 30, Exit 245, Julai&apos;a, Kuwait</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs">+965 1844444</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs">reservations@seashell-kuwait.com</span>
          </div>
        </div>
      </motion.div>

      {/* Logout */}
      <div className="pt-2 pb-4">
        <LoadingButton
          onClick={exitDayPass}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm"
          style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}
        >
          Exit Day Pass & Return
        </LoadingButton>
      </div>
    </div>
  );
}

/* ==========================================
   Sub-components
   ========================================== */
function DetailRow({
  icon: Icon,
  label,
  value,
  copyable,
  copied,
  onCopy,
  important,
}: {
  icon: typeof User;
  label: string;
  value: string;
  copyable?: boolean;
  copied?: boolean;
  onCopy?: () => void;
  important?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${important ? 'bg-cyan-50 dark:bg-cyan-900/20' : ''}`} style={{ backgroundColor: important ? 'rgba(137,193,216,0.1)' : 'var(--app-bg)' }}>
        <Icon size={14} style={{ color: important ? 'var(--brand-cyan)' : 'var(--text-muted)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p className={`text-sm font-medium truncate ${important ? 'font-bold' : ''}`}>{value}</p>
      </div>
      {copyable && onCopy && (
        <button onClick={onCopy} className="p-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: 'var(--app-bg)' }}>
          {copied ? <Check size={12} style={{ color: 'var(--tile-kitchen)' }} /> : <Copy size={12} style={{ color: 'var(--text-muted)' }} />}
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Document['status'] }) {
  const config = {
    verified: { bg: 'var(--tile-kitchen-bg)', color: 'var(--tile-kitchen)', label: 'Verified' },
    pending: { bg: 'var(--tile-services-bg)', color: '#D97706', label: 'Pending' },
    required: { bg: 'var(--brand-pink)', color: 'var(--brand-salmon)', label: 'Required' },
  };
  const c = config[status];
  return (
    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: c.bg, color: c.color }}>
      {c.label}
    </span>
  );
}
