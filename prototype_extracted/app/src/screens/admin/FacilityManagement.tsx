import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sailboat, Baby, Building2, Waves, CheckCircle2, XCircle, Clock, Wrench } from 'lucide-react';

interface FacilityStatus {
  id: string;
  name: string;
  category: string;
  status: 'open' | 'closed' | 'maintenance';
  hours: string;
  occupancy?: number;
  capacity?: number;
  features: string[];
}

const facilities: FacilityStatus[] = [
  // Pools
  { id: 'pool-main', name: 'Main Swimming Pool', category: 'pool', status: 'open', hours: '7:00 AM – 10:00 PM', occupancy: 34, capacity: 60, features: ['Loungers', 'Gazebo Bar', 'Kids Area'] },
  { id: 'pool-avenue', name: 'Avenue Pool', category: 'pool', status: 'open', hours: '7:00 AM – 10:00 PM', occupancy: 8, capacity: 25, features: ['Quiet Zone', 'Suite Access'] },
  { id: 'pool-ladies', name: "Ladies' Pool", category: 'pool', status: 'open', hours: '10:00 AM – 9:00 PM', occupancy: 5, capacity: 15, features: ['Privacy Screened', 'Ladies Only'] },
  { id: 'pool-private', name: 'Private Pool', category: 'pool', status: 'open', hours: '24/7 (Chalet Guests)', features: ['Beach View', 'Outdoor Dining'] },
  // Activities
  { id: 'act-beach', name: "Julai'a Beach", category: 'beach', status: 'open', hours: 'Sunrise – Sunset', occupancy: 42, capacity: 80, features: ['Sea & Sand', 'Sun Loungers', 'Beachfront Chalets'] },
  { id: 'act-watersports', name: 'Water Sports', category: 'activity', status: 'open', hours: '9:00 AM – 6:00 PM', features: ['Jet-ski', 'Kayak', 'Fee Applies'] },
  { id: 'act-fitness', name: 'Fitness Club', category: 'activity', status: 'open', hours: '6:00 AM – 10:00 PM', occupancy: 6, capacity: 20, features: ['Cardio', 'Weights', 'Complimentary'] },
  // Kids
  { id: 'kids-playground', name: 'Playground', category: 'kids', status: 'open', hours: '8:00 AM – 8:00 PM', features: ['Slides', 'Swings', 'Safe Surfacing'] },
  { id: 'kids-club', name: "Kids' Club", category: 'kids', status: 'open', hours: '9:00 AM – 7:00 PM', features: ['Ages 4-12', 'Supervised', 'Arts & Crafts'] },
  { id: 'kids-cinema', name: "Kids' Cinema", category: 'kids', status: 'maintenance', hours: 'Temporarily Closed', features: ['Movies', 'Comfortable Seating'] },
  { id: 'kids-entertainment', name: 'Entertainment Center', category: 'kids', status: 'open', hours: '10:00 AM – 10:00 PM', features: ['Arcade', 'Family Fun'] },
  // Business
  { id: 'biz-conference', name: 'Conference Room', category: 'business', status: 'open', hours: 'By Reservation', features: ['Projector', 'Screen', 'AV Equipment'] },
  { id: 'biz-center', name: 'Business Center', category: 'business', status: 'open', hours: '24/7', features: ['Wi-Fi', 'Printing', 'Fax'] },
];

const catIcons: Record<string, typeof Droplets> = {
  pool: Droplets, beach: Waves, activity: Sailboat, kids: Baby, business: Building2,
};

const statusCfg = {
  open: { label: 'Open', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', icon: CheckCircle2 },
  closed: { label: 'Closed', color: '#6B7280', bg: 'rgba(107,114,128,0.12)', icon: XCircle },
  maintenance: { label: 'Maintenance', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', icon: Wrench },
};

export default function FacilityManagement() {
  const [catFilter, setCatFilter] = useState('all');
  const filtered = catFilter === 'all' ? facilities : facilities.filter(f => f.category === catFilter);

  const cats = ['all', 'pool', 'beach', 'activity', 'kids', 'business'];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Facility Management</h1>

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${catFilter === c ? 'text-white' : 'text-white/40'}`}
            style={{ backgroundColor: catFilter === c ? 'rgba(137,193,216,0.15)' : '#161b22', border: '1px solid #21262d' }}>
            {c === 'all' ? 'All Facilities' : c + 's'}
          </button>
        ))}
      </div>

      {/* Facility Cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((f, i) => {
          const sc = statusCfg[f.status];
          const Icon = catIcons[f.category] || Droplets;
          const occPct = f.occupancy && f.capacity ? Math.round((f.occupancy / f.capacity) * 100) : null;
          return (
            <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="p-4 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: sc.bg }}>
                    <Icon size={16} style={{ color: sc.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{f.name}</h4>
                    <p className="text-[10px] text-white/30 capitalize">{f.category}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>
                  <sc.icon size={10} />{sc.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                <Clock size={12} />{f.hours}
              </div>

              {occPct !== null && (
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-white/40">Occupancy</span>
                    <span className="text-white/60">{f.occupancy}/{f.capacity} ({occPct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${occPct}%`, backgroundColor: occPct > 70 ? '#FBBF24' : '#4ADE80' }} />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {f.features.map(ft => (
                  <span key={ft} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)' }}>{ft}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
