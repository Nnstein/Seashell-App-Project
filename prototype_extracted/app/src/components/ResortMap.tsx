import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Navigation, UtensilsCrossed, Droplets, Sailboat, Baby, Building2, BedDouble, Palmtree, X, MapPin } from 'lucide-react';

/* ==========================================
   RESORT MAP LOCATIONS (simulated coordinates)
   ========================================== */
interface MapLocation {
  id: string;
  name: string;
  category: 'dining' | 'pool' | 'activity' | 'kids' | 'business' | 'room' | 'beach' | 'entrance';
  x: number; // 0-100 percentage
  y: number;
  icon: typeof UtensilsCrossed;
}

const locations: MapLocation[] = [
  // Entrance / Reception
  { id: 'entrance', name: 'Main Entrance', category: 'entrance', x: 50, y: 92, icon: Navigation },
  // Dining
  { id: 'dine-avenue', name: 'Avenue', category: 'dining', x: 35, y: 55, icon: UtensilsCrossed },
  { id: 'dine-presto', name: 'Cafe Presto', category: 'dining', x: 55, y: 85, icon: UtensilsCrossed },
  { id: 'dine-gazebo', name: 'Gazebo', category: 'dining', x: 42, y: 38, icon: UtensilsCrossed },
  { id: 'dine-seashell', name: 'SeaShell Restaurant', category: 'dining', x: 60, y: 65, icon: UtensilsCrossed },
  // Pools
  { id: 'pool-main', name: 'Main Pool', category: 'pool', x: 38, y: 42, icon: Droplets },
  { id: 'pool-avenue', name: 'Avenue Pool', category: 'pool', x: 32, y: 62, icon: Droplets },
  { id: 'pool-ladies', name: 'Ladies Pool', category: 'pool', x: 65, y: 48, icon: Droplets },
  { id: 'pool-private', name: 'Private Pool', category: 'pool', x: 72, y: 28, icon: Droplets },
  // Activities
  { id: 'act-beach', name: 'Beach', category: 'beach', x: 50, y: 12, icon: Palmtree },
  { id: 'act-watersports', name: 'Water Sports', category: 'activity', x: 60, y: 18, icon: Sailboat },
  { id: 'act-fitness', name: 'Fitness Club', category: 'activity', x: 75, y: 58, icon: Sailboat },
  // Kids
  { id: 'kids-playground', name: 'Playground', category: 'kids', x: 22, y: 50, icon: Baby },
  { id: 'kids-club', name: 'Kids Club', category: 'kids', x: 25, y: 38, icon: Baby },
  { id: 'kids-cinema', name: 'Kids Cinema', category: 'kids', x: 20, y: 62, icon: Baby },
  { id: 'kids-entertainment', name: 'Entertainment', category: 'kids', x: 28, y: 70, icon: Baby },
  // Business
  { id: 'biz-conference', name: 'Conference', category: 'business', x: 68, y: 72, icon: Building2 },
  { id: 'biz-center', name: 'Business Center', category: 'business', x: 72, y: 78, icon: Building2 },
  // Rooms / Chalets
  { id: 'rooms-chalets', name: 'Chalets', category: 'room', x: 45, y: 25, icon: BedDouble },
  { id: 'rooms-hotel', name: 'Hotel Rooms', category: 'room', x: 58, y: 52, icon: BedDouble },
];

const categoryColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  dining:   { bg: 'rgba(74, 222, 128, 0.15)', border: '#4ADE80', text: '#166534', dot: '#4ADE80' },
  pool:     { bg: 'rgba(125, 211, 252, 0.2)', border: '#7DD3FC', text: '#075985', dot: '#0284C7' },
  activity: { bg: 'rgba(253, 230, 138, 0.2)', border: '#FDE68A', text: '#92400E', dot: '#D97706' },
  kids:     { bg: 'rgba(253, 186, 116, 0.15)', border: '#FDBA74', text: '#9A3412', dot: '#FB923C' },
  business: { bg: 'rgba(192, 192, 192, 0.15)', border: '#A1A1AA', text: '#52525B', dot: '#A1A1AA' },
  room:     { bg: 'rgba(137, 193, 216, 0.15)', border: '#89C1D8', text: '#155E75', dot: '#89C1D8' },
  beach:    { bg: 'rgba(251, 146, 60, 0.15)', border: '#FB923C', text: '#9A3412', dot: '#F59E0B' },
  entrance: { bg: 'rgba(255, 255, 255, 0.2)', border: '#FFFFFF', text: '#FFFFFF', dot: '#FFFFFF' },
};

/* ==========================================
   Simulated Guest Location (moves slowly)
   ========================================== */
const guestPath = [
  { x: 50, y: 88 }, { x: 48, y: 82 }, { x: 46, y: 75 }, { x: 44, y: 68 },
  { x: 42, y: 60 }, { x: 40, y: 52 }, { x: 38, y: 45 },
];

interface ResortMapProps {
  onLocationSelect?: (category: string) => void;
}

export default function ResortMap({ onLocationSelect }: ResortMapProps) {
  const [scale, setScale] = useState(1);
  const [selectedLoc, setSelectedLoc] = useState<MapLocation | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setScale(s => Math.min(s + 0.3, 2.5));
  const zoomOut = () => setScale(s => Math.max(s - 0.3, 0.6));

  const filteredLocs = activeFilter
    ? locations.filter(l => l.category === activeFilter)
    : locations;

  const handleMarkerTap = (loc: MapLocation) => {
    setSelectedLoc(loc);
    onLocationSelect?.(loc.category);
  };

  // Guest position (simulated - 4th point in path)
  const guestPos = guestPath[3];

  return (
    <div className="w-full">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Navigation size={16} style={{ color: 'var(--brand-cyan)' }} />
          <span className="text-sm font-bold">Resort Map</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#4ADE80' }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#4ADE80' }} />
          </span>
          <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>You are here</span>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          height: '380px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--nav-border)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* SVG Map */}
        <motion.div
          className="absolute inset-0"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Sand / Beach Area (top) */}
            <rect x="0" y="0" width="100" height="25" fill="#F5E6C8" opacity="0.4" />
            <text x="50" y="8" textAnchor="middle" fontSize="3" fill="#B45309" opacity="0.5" fontWeight="bold">GULF OF KUWAIT</text>

            {/* Water */}
            <rect x="0" y="0" width="100" height="8" fill="#7DD3FC" opacity="0.25" />
            <rect x="0" y="8" width="100" height="4" fill="#7DD3FC" opacity="0.15" />

            {/* Grass / Garden Areas */}
            <rect x="0" y="25" width="100" height="75" fill="#DCFCE7" opacity="0.15" />

            {/* Paths */}
            <g stroke="#E5E5E5" strokeWidth="0.8" fill="none" opacity="0.6">
              {/* Main walkway */}
              <path d="M50 92 Q48 80 45 70 Q42 55 40 45 Q38 35 45 25" />
              {/* Cross paths */}
              <path d="M35 55 L65 55" />
              <path d="M42 38 L42 70" />
              <path d="M55 85 L55 45" />
              <path d="M22 50 L78 50" />
              <path d="M32 62 L68 62" />
              <path d="M60 18 L60 85" />
              {/* Beach path */}
              <path d="M35 25 Q40 18 50 15 Q55 12 60 18" />
            </g>

            {/* Building footprints */}
            <g opacity="0.12">
              <rect x="30" y="50" width="12" height="10" rx="1" fill="#666" /> {/* Avenue */}
              <rect x="52" y="82" width="10" height="8" rx="1" fill="#666" /> {/* Presto */}
              <rect x="38" y="35" width="10" height="8" rx="1" fill="#666" /> {/* Gazebo area */}
              <rect x="56" y="62" width="12" height="8" rx="1" fill="#666" /> {/* SeaShell */}
              <rect x="65" y="70" width="14" height="10" rx="1" fill="#666" /> {/* Conference */}
              <rect x="40" y="20" width="16" height="12" rx="1" fill="#666" /> {/* Chalets */}
              <rect x="54" y="48" width="12" height="10" rx="1" fill="#666" /> {/* Hotel rooms */}
              <rect x="18" y="35" width="16" height="38" rx="2" fill="#666" /> {/* Kids area */}
            </g>

            {/* Pool shapes */}
            <ellipse cx="38" cy="42" rx="5" ry="3.5" fill="#7DD3FC" opacity="0.3" />
            <ellipse cx="32" cy="62" rx="4" ry="3" fill="#7DD3FC" opacity="0.25" />
            <ellipse cx="65" cy="48" rx="4" ry="3" fill="#7DD3FC" opacity="0.2" />
            <ellipse cx="72" cy="28" rx="3.5" ry="2.5" fill="#7DD3FC" opacity="0.25" />

            {/* Beach area shape */}
            <path d="M25 20 Q50 12 75 20 Q70 24 50 22 Q30 24 25 20" fill="#FDE68A" opacity="0.2" />

            {/* Connection lines from guest to nearby spots */}
            <line x1={guestPos.x} y1={guestPos.y} x2="42" y2="60" stroke="#4ADE80" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Location Markers */}
        {filteredLocs.map(loc => {
          const colors = categoryColors[loc.category] || categoryColors.dining;
          const isSelected = selectedLoc?.id === loc.id;
          return (
            <motion.button
              key={loc.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isSelected ? 20 : 10,
              }}
              onClick={() => handleMarkerTap(loc)}
              whileTap={{ scale: 0.85 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isSelected ? 1.15 : 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {/* Marker pin */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                style={{
                  backgroundColor: colors.bg,
                  border: `2px solid ${colors.border}`,
                  boxShadow: isSelected ? `0 0 0 4px ${colors.border}40, 0 4px 12px ${colors.border}60` : '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <loc.icon size={14} style={{ color: colors.dot }} />
              </div>
              {/* Label */}
              <div
                className="mt-0.5 px-1.5 py-0.5 rounded-md whitespace-nowrap"
                style={{
                  backgroundColor: isSelected ? colors.border : 'rgba(255,255,255,0.9)',
                  color: isSelected ? '#fff' : colors.text,
                  fontSize: '8px',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                {loc.name}
              </div>
            </motion.button>
          );
        })}

        {/* Guest Location Dot */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ left: `${guestPos.x}%`, top: `${guestPos.y}%`, transform: 'translate(-50%, -50%)', zIndex: 25 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: '#4ADE80' }}
              animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
          <span className="mt-0.5 px-1.5 py-0.5 rounded text-[7px] font-bold bg-green-500 text-white whitespace-nowrap shadow-sm">
            You
          </span>
        </motion.div>

        {/* Zoom Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-30">
          <button onClick={zoomIn} className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: 'var(--surface)' }}>
            <Plus size={14} style={{ color: 'var(--text-primary)' }} />
          </button>
          <button onClick={zoomOut} className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: 'var(--surface)' }}>
            <Minus size={14} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        {/* Scale indicator */}
        <div className="absolute bottom-2 left-3 z-30 px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: 'var(--text-secondary)' }}>
          {Math.round(scale * 100)}%
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
        {[
          { key: null, label: 'All', color: 'var(--text-secondary)' },
          { key: 'dining', label: 'Dining', color: '#4ADE80' },
          { key: 'pool', label: 'Pools', color: '#0284C7' },
          { key: 'activity', label: 'Activities', color: '#D97706' },
          { key: 'kids', label: 'Kids', color: '#FB923C' },
          { key: 'business', label: 'Business', color: '#A1A1AA' },
          { key: 'room', label: 'Rooms', color: '#89C1D8' },
        ].map(f => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all"
            style={{
              backgroundColor: activeFilter === f.key ? f.color : 'var(--surface)',
              color: activeFilter === f.key ? '#fff' : 'var(--text-secondary)',
              border: activeFilter === f.key ? 'none' : '1px solid var(--nav-border)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Selected Location Detail Card */}
      <AnimatePresence>
        {selectedLoc && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="p-4 rounded-2xl relative" style={{ backgroundColor: 'var(--surface)', border: `1px solid ${categoryColors[selectedLoc.category]?.border || '#ccc'}30` }}>
              <button onClick={() => setSelectedLoc(null)} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--app-bg)' }}>
                <X size={12} style={{ color: 'var(--text-muted)' }} />
              </button>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: categoryColors[selectedLoc.category]?.bg }}
                >
                  <selectedLoc.icon size={18} style={{ color: categoryColors[selectedLoc.category]?.dot }} />
                </div>
                <div>
                  <p className="text-sm font-bold">{selectedLoc.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} style={{ color: 'var(--text-muted)' }} />
                    <span className="text-[10px] capitalize" style={{ color: 'var(--text-muted)' }}>{selectedLoc.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
