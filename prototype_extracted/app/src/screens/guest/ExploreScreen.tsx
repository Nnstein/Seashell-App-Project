import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Navigation, MapPin, Clock, Phone,
  UtensilsCrossed, Droplets, Baby, Building2,
  Waves, Sailboat, ChevronRight, Plus, Minus,
  Footprints, Car, Check
} from 'lucide-react';
import { resortData } from '@/data/resortData';
import { getImageUrl } from '@/data/imageMap';

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
interface MapPinData {
  id: string;
  name: string;
  category: string;
  x: number; // 0–100 viewBox units
  y: number;
  dataRef: string; // key to look up real data
  dataType: 'restaurant' | 'pool' | 'activity' | 'kids' | 'business' | 'room' | 'entrance';
}

const pins: MapPinData[] = [
  // Dining
  { id: 'dine-avenue', name: 'Avenue', category: 'dining', x: 36, y: 50, dataRef: 'dine-avenue', dataType: 'restaurant' },
  { id: 'dine-presto', name: 'Cafe Presto', category: 'dining', x: 41, y: 40, dataRef: 'dine-presto', dataType: 'restaurant' },
  { id: 'dine-gazebo', name: 'Gazebo', category: 'dining', x: 30, y: 56, dataRef: 'dine-gazebo', dataType: 'restaurant' },
  { id: 'dine-seashell', name: 'SeaShell Restaurant', category: 'dining', x: 39, y: 47, dataRef: 'dine-seashell', dataType: 'restaurant' },
  // Pools
  { id: 'pool-main', name: 'Main Pool', category: 'pool', x: 33, y: 55, dataRef: 'pool-main', dataType: 'pool' },
  { id: 'pool-avenue', name: 'Avenue Pool', category: 'pool', x: 37, y: 49, dataRef: 'pool-avenue', dataType: 'pool' },
  { id: 'pool-ladies', name: "Ladies' Pool", category: 'pool', x: 54, y: 43, dataRef: 'pool-ladies', dataType: 'pool' },
  { id: 'pool-private', name: 'Private Pool', category: 'pool', x: 76, y: 63, dataRef: 'pool-private', dataType: 'pool' },
  // Activities
  { id: 'act-beach', name: "Julai'a Beach", category: 'beach', x: 82, y: 72, dataRef: 'act-beach', dataType: 'activity' },
  { id: 'act-watersports', name: 'Water Sports', category: 'activity', x: 87, y: 76, dataRef: 'act-watersports', dataType: 'activity' },
  { id: 'act-fitness', name: 'Fitness Club', category: 'activity', x: 48, y: 36, dataRef: 'act-fitness', dataType: 'activity' },
  // Kids
  { id: 'kids-playground', name: 'Playground', category: 'kids', x: 50, y: 60, dataRef: 'kids-playground', dataType: 'kids' },
  { id: 'kids-club', name: "Kids' Club", category: 'kids', x: 52, y: 55, dataRef: 'kids-club', dataType: 'kids' },
  { id: 'kids-cinema', name: "Kids' Cinema", category: 'kids', x: 54, y: 58, dataRef: 'kids-cinema', dataType: 'kids' },
  { id: 'kids-entertainment', name: 'Entertainment Center', category: 'kids', x: 56, y: 62, dataRef: 'kids-entertainment', dataType: 'kids' },
  // Business
  { id: 'biz-conference', name: 'Conference Room', category: 'business', x: 46, y: 33, dataRef: 'biz-conference', dataType: 'business' },
  { id: 'biz-center', name: 'Business Center', category: 'business', x: 48, y: 30, dataRef: 'biz-center', dataType: 'business' },
  // Rooms / Entrance
  { id: 'room-reception', name: 'Reception', category: 'room', x: 42, y: 42, dataRef: 'room-reception', dataType: 'room' },
  { id: 'room-chalets', name: 'Chalets', category: 'room', x: 65, y: 54, dataRef: 'room-chalets', dataType: 'room' },
  { id: 'room-beachfront', name: 'Beachfront', category: 'room', x: 79, y: 65, dataRef: 'room-beachfront', dataType: 'room' },
  { id: 'entrance-main', name: 'Main Gate', category: 'entrance', x: 43, y: 36, dataRef: 'entrance-main', dataType: 'entrance' },
];

const catCfg: Record<string, { label: string; icon: typeof MapPin; color: string; bg: string }> = {
  dining: { label: 'Dining', icon: UtensilsCrossed, color: '#E97A74', bg: 'rgba(233,122,116,0.12)' },
  pool: { label: 'Pools', icon: Droplets, color: '#0284C7', bg: 'rgba(2,132,199,0.12)' },
  activity: { label: 'Activities', icon: Sailboat, color: '#D97706', bg: 'rgba(217,119,6,0.12)' },
  kids: { label: 'Kids', icon: Baby, color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
  business: { label: 'Business', icon: Building2, color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  beach: { label: 'Beach', icon: Waves, color: '#06B6D4', bg: 'rgba(6,182,212,0.12)' },
  room: { label: 'Rooms', icon: MapPin, color: '#89C1D8', bg: 'rgba(137,193,216,0.12)' },
  entrance: { label: 'Entrance', icon: MapPin, color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
};

const quickChips = ['Main Pool', 'Avenue', 'Beach', 'Fitness', 'Kids Club', 'Cafe Presto'];
const currentLoc = { x: 45, y: 45 };

function calcDist(toX: number, toY: number) {
  const d = Math.sqrt((currentLoc.x - toX) ** 2 + (currentLoc.y - toY) ** 2);
  return { walk: Math.round(d * 2.5), drive: Math.round(d * 0.8), dist: d.toFixed(1) };
}

/* ═══════════════════════════════════════════════════════════════
   SVG Map + Markers (both inside shared transform group)
   ═══════════════════════════════════════════════════════════════ */
function SVGMap({
  pins: filteredPins, selectedId, onPinTap, zoom
}: {
  pins: MapPinData[]; selectedId: string | null; onPinTap: (p: MapPinData) => void; zoom: number;
}) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Background */}
      <rect x="-50" y="-50" width="200" height="200" fill="#E6DCC8" />

      {/* Beach / Water */}
      <rect x="70" y="58" width="35" height="45" fill="#C4DEE8" opacity="0.55" rx="1" />
      <rect x="66" y="64" width="39" height="38" fill="#B8D4E3" opacity="0.4" rx="1" />
      <path d="M68 68 Q78 73 90 70 Q97 68 102 74 L102 102 L68 102 Z" fill="#A8D0E0" opacity="0.3" />

      {/* Main building */}
      <rect x="38" y="36" width="10" height="14" fill="#D4C5B0" rx="0.4" />
      <rect x="36" y="50" width="14" height="8" fill="#C9B8A0" rx="0.4" />
      {/* Dining wing */}
      <rect x="32" y="50" width="6" height="6" fill="#CDB8A0" rx="0.4" />
      <rect x="34" y="48" width="4" height="4" fill="#C4AC8E" rx="0.3" />

      {/* Pools */}
      <ellipse cx="33" cy="56" rx="5.5" ry="4.5" fill="#89C1D8" opacity="0.8" />
      <ellipse cx="33" cy="56" rx="4" ry="3" fill="#7AB8D0" opacity="0.5" />
      <ellipse cx="38" cy="50" rx="3.5" ry="3" fill="#89C1D8" opacity="0.65" />
      <ellipse cx="55" cy="44" rx="3" ry="2.5" fill="#89C1D8" opacity="0.55" />
      <ellipse cx="77" cy="65" rx="2.5" ry="2" fill="#89C1D8" opacity="0.6" />

      {/* Chalets */}
      <rect x="58" y="48" width="8" height="6" fill="#CFC0A8" rx="0.3" />
      <rect x="60" y="46" width="6" height="4" fill="#C4B398" rx="0.3" />
      <rect x="62" y="56" width="8" height="5" fill="#CFC0A8" rx="0.3" />
      <rect x="70" y="52" width="6" height="5" fill="#C9B8A0" rx="0.3" />
      <rect x="74" y="62" width="8" height="5" fill="#CFC0A8" rx="0.3" />
      <rect x="78" y="66" width="6" height="4" fill="#C4B398" rx="0.3" />

      {/* Kids area */}
      <rect x="50" y="56" width="8" height="8" fill="#C8D4A8" opacity="0.45" rx="1" />

      {/* Business */}
      <rect x="46" y="32" width="6" height="5" fill="#C0B8A8" rx="0.3" />
      <rect x="44" y="28" width="5" height="5" fill="#B8B0A0" rx="0.3" />

      {/* Walkways */}
      <line x1="42" y1="44" x2="42" y2="50" stroke="#C8BCA8" strokeWidth="0.7" />
      <line x1="42" y1="50" x2="33" y2="56" stroke="#C8BCA8" strokeWidth="0.7" />
      <line x1="42" y1="50" x2="50" y2="56" stroke="#C8BCA8" strokeWidth="0.7" />
      <line x1="42" y1="44" x2="55" y2="44" stroke="#C8BCA8" strokeWidth="0.5" />
      <line x1="50" y1="56" x2="58" y2="52" stroke="#C8BCA8" strokeWidth="0.5" />
      <line x1="58" y1="52" x2="74" y2="64" stroke="#C8BCA8" strokeWidth="0.5" />
      <line x1="42" y1="44" x2="46" y2="35" stroke="#C8BCA8" strokeWidth="0.5" />

      {/* Shoreline */}
      <path d="M71 68 Q80 73 92 70 Q98 68 102 73" stroke="#98C0D0" strokeWidth="0.5" fill="none" />
      <path d="M73 73 Q82 78 94 75 Q100 73 102 78" stroke="#98C0D0" strokeWidth="0.4" fill="none" />

      {/* Ground labels */}
      <text x="42" y="41" fontSize="1.5" fill="#8B7355" fontWeight="600" textAnchor="middle">Reception</text>
      <text x="33" y="53" fontSize="1.3" fill="#4A7A8C" fontWeight="500" textAnchor="middle">Main Pool</text>
      <text x="82" y="78" fontSize="1.3" fill="#5A8A9A" fontWeight="500" textAnchor="middle">Beach</text>

      {/* ── PINS (inside SVG so they move with transform) ── */}
      {filteredPins.map(p => {
        const cfg = catCfg[p.category];
        const isSel = selectedId === p.id;
        const scale = Math.min(1, 0.65 + 0.35 / zoom);
        return (
          <g
            key={p.id}
            transform={`translate(${p.x}, ${p.y}) scale(${scale})`}
            style={{ cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); onPinTap(p); }}
          >
            {/* Selected label */}
            {isSel && (
              <g transform="translate(0, -22)">
                <rect x="-30" y="-10" width="60" height="14" rx="3" fill={cfg.color} />
                <text x="0" y="-1" fontSize="3.5" fill="white" fontWeight="700" textAnchor="middle">{p.name}</text>
                <polygon points="-3,4 3,4 0,7" fill={cfg.color} />
              </g>
            )}
            {/* Pin circle */}
            <circle cx="0" cy="0" r="4.5" fill={cfg.color}
              stroke={isSel ? 'white' : 'none'} strokeWidth={isSel ? 0.8 : 0}
              style={{ filter: isSel ? `drop-shadow(0 1px 3px ${cfg.color}88)` : 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
            {/* Pin icon (foreignObject for Lucide icons) */}
            <foreignObject x="-2.5" y="-2.5" width="5" height="5">
              <div className="flex items-center justify-center w-full h-full">
                <cfg.icon size={10} className="text-white" />
              </div>
            </foreignObject>
            {/* Pin tail */}
            <polygon points="-2.5,3.5 2.5,3.5 0,6.5" fill={cfg.color} />
          </g>
        );
      })}

      {/* Current location */}
      <g transform={`translate(${currentLoc.x}, ${currentLoc.y})`}>
        <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.6">
          <animate attributeName="r" values="3;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="2" fill="#3B82F6" stroke="white" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Bottom Sheet — shows REAL data from resortData
   ═══════════════════════════════════════════════════════════════ */
function BottomSheet({ pin, onClose }: { pin: MapPinData; onClose: () => void }) {
  const cfg = catCfg[pin.category];
  const dir = calcDist(pin.x, pin.y);

  // ── Lookup REAL data from resortData ──
  const realData = useMemo(() => {
    const { dine, plan } = resortData;
    if (pin.dataType === 'restaurant') {
      return dine.restaurants.find(r => r.id === pin.dataRef);
    }
    if (pin.dataType === 'pool') {
      return plan.pools.find(p => p.id === pin.dataRef);
    }
    if (pin.dataType === 'activity') {
      return plan.activities.find(a => a.id === pin.dataRef);
    }
    if (pin.dataType === 'kids') {
      return plan.kids_facilities.find(k => k.id === pin.dataRef);
    }
    if (pin.dataType === 'business') {
      return plan.business_facilities.find(b => b.id === pin.dataRef);
    }
    return null;
  }, [pin]);

  // ── Image ──
  const imgUrl = useMemo(() => {
    if (!realData) {
      const fallbacks: Record<string, string> = {
        room: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        entrance: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
      };
      return fallbacks[pin.dataType] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80';
    }
    if ('image' in realData && realData.image) return getImageUrl(realData.image);
    const fallbacks: Record<string, string> = {
      restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
      pool: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
      activity: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
      kids: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
      business: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    };
    return fallbacks[pin.dataType] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80';
  }, [realData, pin]);

  // ── Extract display fields from real data ──
  const title = realData ? (realData as any).name : pin.name;
  const description = realData ? (realData as any).description : pin.name;
  const features = realData
    ? ((realData as any).features || (realData as any).cuisines || (realData as any).amenities || [])
    : (cfg ? [cfg.label] : []);
  const access = realData && 'access' in realData ? (realData as any).access : null;
  const fee = realData && 'fee_applies' in realData ? (realData as any).fee_applies : null;
  const ageRange = realData && 'age_range' in realData ? (realData as any).age_range : null;
  const hours = realData && 'hours' in realData && (realData as any).hours?.note
    ? (realData as any).hours.note
    : null;

  return (
    <motion.div
      initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      className="fixed bottom-0 left-0 right-0 z-[60]"
    >
      <div className="max-w-md mx-auto">
        <div className="rounded-t-3xl overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.25)]" style={{ backgroundColor: 'var(--surface)' }}>
          {/* Handle */}
          <div className="flex justify-center pt-2.5 pb-1" onClick={onClose}>
            <div className="w-9 h-1 rounded-full" style={{ backgroundColor: 'var(--nav-border)' }} />
          </div>

          <div className="px-5 pb-6 max-h-[52vh] overflow-y-auto">
            {/* Photo */}
            <div className="relative h-36 rounded-2xl overflow-hidden mb-3">
              <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
                <X size={12} className="text-white" />
              </button>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: cfg.color }}>
                <cfg.icon size={10} className="text-white" />
                <span className="text-[9px] font-bold text-white">{cfg.label}</span>
              </div>
            </div>

            {/* Title + Description */}
            <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{description}</p>

            {/* Access / Fee / Age badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {access && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'var(--tile-services-bg)', color: '#92400E' }}>{access}</span>
              )}
              {fee !== null && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: fee ? 'var(--tile-services-bg)' : 'var(--tile-kitchen-bg)', color: fee ? '#92400E' : '#166534' }}>
                  {fee ? 'Fee Applies' : 'Complimentary'}
                </span>
              )}
              {ageRange && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}>Ages {ageRange}</span>
              )}
              {hours && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-muted)' }}>
                  <Clock size={9} />{hours}
                </span>
              )}
            </div>

            {/* Directions */}
            <div className="flex gap-3 p-2.5 rounded-xl mb-3" style={{ backgroundColor: 'var(--app-bg)' }}>
              <div className="flex items-center gap-1.5 flex-1">
                <Footprints size={14} style={{ color: 'var(--brand-cyan)' }} />
                <div><p className="text-[11px] font-bold">{dir.walk} min</p><p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>Walk</p></div>
              </div>
              <div className="w-px" style={{ backgroundColor: 'var(--nav-border)' }} />
              <div className="flex items-center gap-1.5 flex-1">
                <Car size={14} style={{ color: 'var(--text-muted)' }} />
                <div><p className="text-[11px] font-bold">{dir.drive} min</p><p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>Drive</p></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 mb-3">
              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 py-2.5 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-1.5"
                style={{ backgroundColor: 'var(--brand-cyan)' }}><Navigation size={14} />Directions</motion.button>
              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5"
                style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-primary)' }}><Phone size={14} style={{ color: 'var(--text-muted)' }} />Call</motion.button>
            </div>

            {/* Features list */}
            {features.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  {pin.dataType === 'restaurant' ? 'Cuisines' : pin.dataType === 'business' ? 'Amenities' : 'Features'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {features.map((f: string) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                      <Check size={8} />{f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Screen
   ═══════════════════════════════════════════════════════════════ */
export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [selected, setSelected] = useState<MapPinData | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0 });

  const filtered = useMemo(() => {
    let r = pins;
    if (activeCat) r = r.filter(p => p.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q));
    }
    return r;
  }, [activeCat, search]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    drag.current = { active: true, sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pan]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.active) return;
    setPan({
      x: drag.current.px + (e.clientX - drag.current.sx),
      y: drag.current.py + (e.clientY - drag.current.sy),
    });
  }, []);

  const onPointerUp = useCallback(() => { drag.current.active = false; }, []);

  const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }); setSelected(null); setActiveCat(null); };

  return (
    <>
      {/* ═══════ Map Viewport ═══════ */}
      <div
        ref={viewportRef}
        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={() => { setSelected(null); setSearchFocus(false); }}
      >
        {/* Shared transform container: map + markers move together */}
        <div
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: drag.current.active ? 'none' : 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <SVGMap pins={filtered} selectedId={selected?.id || null}
            onPinTap={(p) => { setSelected(p); setSearchFocus(false); }} zoom={zoom} />
        </div>
      </div>

      {/* ═══════ Search Bar ═══════ */}
      <div className="absolute top-0 left-0 right-0 z-50 px-3 pt-3" onClick={e => e.stopPropagation()}>
        <div className="max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="flex items-center gap-2.5 px-3.5 py-2.5">
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              placeholder="Search resort..."
              className="flex-1 text-sm font-medium outline-none bg-transparent"
              style={{ color: 'var(--text-primary)' }} />
            {search && <button onClick={() => setSearch('')}><X size={16} style={{ color: 'var(--text-muted)' }} /></button>}
          </div>
          <AnimatePresence>
            {searchFocus && !search && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-3 pb-2.5 flex gap-2 overflow-x-auto no-scrollbar">
                  {quickChips.map(c => (
                    <button key={c} onClick={() => { setSearch(c); setSearchFocus(false); }}
                      className="flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium"
                      style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-secondary)' }}>{c}</button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {search && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-3 pb-2 space-y-1 max-h-44 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <p className="text-xs py-2 text-center" style={{ color: 'var(--text-muted)' }}>No results</p>
                  ) : filtered.map(p => {
                    const c = catCfg[p.category];
                    return (
                      <button key={p.id} onClick={() => { setSelected(p); setSearchFocus(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left" style={{ backgroundColor: 'var(--app-bg)' }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.bg }}>
                          <c.icon size={13} style={{ color: c.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{p.name}</p>
                          <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
                        </div>
                        <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════ Category Chips ═══════ */}
      {!searchFocus && !search && (
        <div className="absolute top-[64px] left-0 right-0 z-50 px-3">
          <div className="max-w-md mx-auto flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {Object.entries(catCfg).map(([key, c]) => {
              const active = activeCat === key;
              return (
                <motion.button key={key} whileTap={{ scale: 0.92 }}
                  onClick={() => setActiveCat(p => p === key ? null : key)}
                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold ${active ? 'text-white' : ''}`}
                  style={active ? { backgroundColor: c.color } : { backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                  <c.icon size={12} />{c.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════ Right-Side Controls ═══════ */}
      <div className="absolute right-3 z-50 flex flex-col gap-2" style={{ bottom: selected ? '46%' : '100px' }}>
        <AnimatePresence>
          {selected && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: 'var(--brand-cyan)' }} onClick={e => e.stopPropagation()}>
              <Navigation size={18} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.stopPropagation(); setZoom(z => Math.min(z * 1.3, 4)); }}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--surface)' }}>
          <Plus size={18} style={{ color: 'var(--text-primary)' }} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.stopPropagation(); setZoom(z => Math.max(z / 1.3, 0.6)); }}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--surface)' }}>
          <Minus size={18} style={{ color: 'var(--text-primary)' }} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.stopPropagation(); reset(); }}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--surface)' }}>
          <Navigation size={18} style={{ color: 'var(--text-primary)' }} />
        </motion.button>
      </div>

      {/* ═══════ Bottom Sheet ═══════ */}
      <AnimatePresence>
        {selected && <BottomSheet pin={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
