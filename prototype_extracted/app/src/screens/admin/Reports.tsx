import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CreditCard, BedDouble } from 'lucide-react';

const revenueData = [
  { month: 'Jan', rooms: 42000, dining: 18500, spa: 8200, daypass: 12400 },
  { month: 'Feb', rooms: 38500, dining: 16200, spa: 7600, daypass: 9800 },
  { month: 'Mar', rooms: 51000, dining: 22400, spa: 11300, daypass: 15600 },
  { month: 'Apr', rooms: 48000, dining: 20100, spa: 9800, daypass: 14200 },
  { month: 'May', rooms: 62000, dining: 28500, spa: 15600, daypass: 21300 },
  { month: 'Jun', rooms: 68000, dining: 31200, spa: 18400, daypass: 24800 },
];

const guestSourceData = [
  { source: 'Kuwait', percent: 65, color: '#89C1D8' },
  { source: 'Saudi Arabia', percent: 18, color: '#4ADE80' },
  { source: 'UAE', percent: 8, color: '#A78BFA' },
  { source: 'Qatar', percent: 5, color: '#F97316' },
  { source: 'Other', percent: 4, color: '#6B7280' },
];

export default function Reports() {
  const [period, setPeriod] = useState('month');

  const totalRevenue = revenueData.reduce((s, r) => s + r.rooms + r.dining + r.spa + r.daypass, 0);
  const avgMonthly = Math.round(totalRevenue / revenueData.length);
  const peakMonth = revenueData.reduce((p, c) => {
    const cTotal = c.rooms + c.dining + c.spa + c.daypass;
    const pTotal = p.rooms + p.dining + p.spa + p.daypass;
    return cTotal > pTotal ? c : p;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl font-bold text-white">Reports & Analytics</h1>
        <div className="flex gap-1.5">
          {(['week', 'month', 'year'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${period === p ? 'text-white' : 'text-white/40'}`}
              style={{ backgroundColor: period === p ? 'rgba(137,193,216,0.15)' : '#161b22', border: '1px solid #21262d' }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue (YTD)', value: `${(totalRevenue / 1000).toFixed(0)}K KD`, icon: TrendingUp, color: '#89C1D8', bg: 'rgba(137,193,216,0.1)' },
          { label: 'Avg. Monthly', value: `${(avgMonthly / 1000).toFixed(1)}K KD`, icon: CreditCard, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
          { label: 'Total Guests', value: '1,842', icon: Users, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
          { label: 'Peak Month', value: peakMonth.month, icon: BedDouble, color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: k.bg }}>
              <k.icon size={15} style={{ color: k.color }} />
            </div>
            <p className="text-lg font-bold text-white">{k.value}</p>
            <p className="text-[11px] text-white/30">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Breakdown Chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-5 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
        <h3 className="text-sm font-bold text-white mb-4">Revenue by Category</h3>
        <div className="space-y-4">
          {revenueData.map((d, i) => {
            const total = d.rooms + d.dining + d.spa + d.daypass;
            const maxTotal = 140000;
            return (
              <div key={d.month}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/50 w-10">{d.month}</span>
                  <span className="text-xs font-bold text-white">{(total / 1000).toFixed(1)}K KD</span>
                </div>
                <div className="h-5 rounded-lg overflow-hidden flex" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(d.rooms / maxTotal) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="h-full" style={{ backgroundColor: '#89C1D8' }} />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(d.dining / maxTotal) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 + 0.1 }}
                    className="h-full" style={{ backgroundColor: '#4ADE80' }} />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(d.spa / maxTotal) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 + 0.2 }}
                    className="h-full" style={{ backgroundColor: '#A78BFA' }} />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(d.daypass / maxTotal) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 + 0.3 }}
                    className="h-full" style={{ backgroundColor: '#F97316' }} />
                </div>
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: '1px solid #21262d' }}>
          {[
            { label: 'Rooms', color: '#89C1D8' },
            { label: 'Dining', color: '#4ADE80' },
            { label: 'Spa & Activities', color: '#A78BFA' },
            { label: 'Day Pass', color: '#F97316' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
              <span className="text-[11px] text-white/40">{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Guest Sources */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-5 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
        <h3 className="text-sm font-bold text-white mb-4">Guest Demographics</h3>
        <div className="space-y-3">
          {guestSourceData.map(g => (
            <div key={g.source}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">{g.source}</span>
                <span className="text-white font-bold">{g.percent}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${g.percent}%` }} transition={{ duration: 0.8 }}
                  className="h-full rounded-full" style={{ backgroundColor: g.color }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
