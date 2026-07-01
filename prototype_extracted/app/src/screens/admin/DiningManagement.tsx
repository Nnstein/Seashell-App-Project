import { motion } from 'framer-motion';
import { UtensilsCrossed, Clock, MapPin, Star, Edit3, Eye } from 'lucide-react';
import { resortData } from '@/data/resortData';

const restaurants = resortData.dine.restaurants;

const occupancyData = [
  { name: 'Avenue', current: 24, capacity: 60, rating: 4.8 },
  { name: 'Cafe Presto', current: 18, capacity: 40, rating: 4.6 },
  { name: 'Gazebo', current: 12, capacity: 30, rating: 4.4 },
  { name: 'SeaShell Restaurant', current: 45, capacity: 80, rating: 4.7 },
];

export default function DiningManagement() {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white">Dining Management</h1>

      {/* Live Occupancy */}
      <div className="p-5 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
        <h3 className="text-sm font-bold text-white mb-4">Live Occupancy</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {occupancyData.map(o => {
            const pct = Math.round((o.current / o.capacity) * 100);
            return (
              <div key={o.name} className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/70">{o.name}</span>
                  <div className="flex items-center gap-0.5">
                    <Star size={10} className="text-yellow-500" fill="#EAB308" />
                    <span className="text-[10px] text-white/50">{o.rating}</span>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-1">
                  <span className="text-lg font-bold text-white">{o.current}<span className="text-xs text-white/30">/{o.capacity}</span></span>
                  <span className="text-[11px] font-bold" style={{ color: pct > 80 ? '#EF4444' : pct > 50 ? '#FBBF24' : '#4ADE80' }}>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }}
                    className="h-full rounded-full" style={{ backgroundColor: pct > 80 ? '#EF4444' : pct > 50 ? '#FBBF24' : '#4ADE80' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restaurant Cards */}
      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Restaurants</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {restaurants.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-white">{r.name}</h4>
                <p className="text-[11px] text-white/40 mt-0.5">{r.description}</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(251,191,36,0.12)' }}>
                <Star size={11} className="text-yellow-500" fill="#EAB308" />
                <span className="text-[11px] font-bold">4.{7 - i}</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-white/40 mb-3">
              <div className="flex items-center gap-2"><Clock size={12} style={{ color: '#89C1D8' }} />{r.hours.note}</div>
              <div className="flex items-center gap-2"><MapPin size={12} style={{ color: '#89C1D8' }} />{r.location_tag}</div>
              <div className="flex items-center gap-2"><UtensilsCrossed size={12} style={{ color: '#89C1D8' }} />{r.cuisines.join(', ')}</div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5" style={{ backgroundColor: 'rgba(137,193,216,0.12)', color: '#89C1D8' }}>
                <Eye size={13} /> View Menu
              </button>
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-white/60 flex items-center justify-center gap-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <Edit3 size={13} /> Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
