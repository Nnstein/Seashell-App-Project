import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi, KeyRound, Thermometer, Lightbulb, Shield,
  CheckCircle2, ChevronRight, Info, Lock, Unlock
} from 'lucide-react';
import { resortData } from '@/data/resortData';
import { useAuth } from '@/hooks/useAuth';

export default function RoomScreen() {
  const { guest } = useAuth();
  const [showDigitalKey, setShowDigitalKey] = useState(false);
  const [acOn, setAcOn] = useState(true);
  const [lightsOn, setLightsOn] = useState(true);
  const [temp, setTemp] = useState(22);
  const [dnd, setDnd] = useState(false);

  // Get the guest's actual room type from auth, fallback to first room
  const roomType = guest
    ? resortData.stay.room_types.find(r => r.id === guest.roomTypeId) || resortData.stay.room_types[0]
    : resortData.stay.room_types[0];

  return (
    <div className="min-h-full pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>My Room</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{roomType.name}</p>
      </div>

      {/* Digital Key Card */}
      <div className="px-5 mb-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowDigitalKey(!showDigitalKey)}
          className="w-full p-4 rounded-2xl flex items-center justify-between text-left"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
              <KeyRound size={22} style={{ color: 'var(--tile-kitchen)' }} />
            </div>
            <div>
              <p className="text-sm font-bold">Digital Key</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tap to unlock your room</p>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
        </motion.button>

        <AnimatePresence>
          {showDigitalKey && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-6 rounded-2xl text-center" style={{ backgroundColor: 'var(--surface)' }}>
                <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
                  {dnd ? <Lock size={32} style={{ color: 'var(--tile-kitchen)' }} /> : <Unlock size={32} style={{ color: 'var(--tile-kitchen)' }} />}
                </div>
                <p className="text-lg font-bold mb-1">Room 304</p>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{dnd ? 'Door is locked' : 'Tap below to unlock'}</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDnd(!dnd)}
                  className="w-full py-3.5 rounded-2xl font-semibold text-white"
                  style={{ backgroundColor: dnd ? 'var(--brand-salmon)' : 'var(--tile-kitchen)' }}
                >
                  {dnd ? 'Lock Door' : 'Unlock Door'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Environmental Controls */}
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Room Controls</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* AC Control */}
          <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="flex items-center justify-between mb-3">
              <Thermometer size={18} style={{ color: 'var(--brand-cyan)' }} />
              <button
                onClick={() => setAcOn(!acOn)}
                className={`w-10 h-6 rounded-full transition-colors relative ${acOn ? '' : ''}`}
                style={{ backgroundColor: acOn ? 'var(--tile-kitchen)' : 'var(--nav-border)' }}
              >
                <motion.div
                  animate={{ x: acOn ? 16 : 2 }}
                  className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5"
                />
              </button>
            </div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Air Conditioning</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setTemp(t => Math.max(16, t - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: 'var(--app-bg)' }}>-</button>
              <span className="text-xl font-bold w-10 text-center">{temp}°</span>
              <button onClick={() => setTemp(t => Math.min(30, t + 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: 'var(--app-bg)' }}>+</button>
            </div>
          </div>

          {/* Lights Control */}
          <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="flex items-center justify-between mb-3">
              <Lightbulb size={18} style={{ color: lightsOn ? '#FDE68A' : 'var(--text-muted)' }} />
              <button
                onClick={() => setLightsOn(!lightsOn)}
                className="w-10 h-6 rounded-full transition-colors relative"
                style={{ backgroundColor: lightsOn ? '#FDE68A' : 'var(--nav-border)' }}
              >
                <motion.div
                  animate={{ x: lightsOn ? 16 : 2 }}
                  className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5"
                />
              </button>
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Room Lights</p>
            <p className="text-lg font-bold mt-1">{lightsOn ? 'On' : 'Off'}</p>
          </div>
        </div>

        {/* Do Not Disturb */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setDnd(!dnd)}
          className="w-full mt-3 p-4 rounded-2xl flex items-center justify-between"
          style={{ backgroundColor: dnd ? 'var(--brand-pink)' : 'var(--surface)' }}
        >
          <div className="flex items-center gap-3">
            <Shield size={20} style={{ color: dnd ? 'var(--brand-salmon)' : 'var(--text-muted)' }} />
            <span className="text-sm font-medium">Do Not Disturb</span>
          </div>
          {dnd && <CheckCircle2 size={18} style={{ color: 'var(--brand-salmon)' }} />}
        </motion.button>
      </div>

      {/* Wi-Fi Info */}
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Connectivity</h3>
        <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-rooms-bg)' }}>
              <Wifi size={18} style={{ color: '#0284C7' }} />
            </div>
            <div>
              <p className="text-sm font-bold">{resortData.explore.wifi.network_name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Complimentary resort-wide Wi-Fi</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
            <Info size={14} style={{ color: 'var(--text-muted)' }} />
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Password available at reception</p>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="px-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Room Details</h3>
        <div className="p-4 rounded-2xl space-y-2" style={{ backgroundColor: 'var(--surface)' }}>
          {Object.entries(roomType.specifications).slice(0, 6).map(([key, val]) => (
            <div key={key} className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              <span className="font-medium">{String(val)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
