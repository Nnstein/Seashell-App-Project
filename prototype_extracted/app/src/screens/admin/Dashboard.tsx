import { motion } from 'framer-motion';
import {
  Users, BedDouble, Ticket, TrendingUp, Calendar, Clock,
  ArrowUpRight, ArrowDownRight, Droplets, UtensilsCrossed, Waves, Baby
} from 'lucide-react';

const kpis = [
  { label: 'Checked-in Guests', value: '24', change: '+3 today', up: true, icon: Users, color: '#89C1D8', bg: 'rgba(137,193,216,0.1)' },
  { label: 'Room Occupancy', value: '68%', change: '+5% vs last week', up: true, icon: BedDouble, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
  { label: 'Active Day Passes', value: '12', change: '-2 today', up: false, icon: Ticket, color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
  { label: "Today's Revenue", value: '2,450 KD', change: '+320 KD', up: true, icon: TrendingUp, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
];

const recentActivity = [
  { time: '10:42 AM', text: 'Guest checked in — Room 512 (Presidential Suite)', type: 'checkin' },
  { time: '10:15 AM', text: 'Day Pass purchased — Ahmad Fahad (15 KD)', type: 'daypass' },
  { time: '09:48 AM', text: 'Room service order — Room 304 (Breakfast)', type: 'service' },
  { time: '09:30 AM', text: 'Spa booking — Room 215 (Massage 11:00 AM)', type: 'booking' },
  { time: '08:55 AM', text: 'Guest checked out — Room 401 (2BR Chalet)', type: 'checkout' },
  { time: '08:20 AM', text: 'Maintenance resolved — Main Pool', type: 'maintenance' },
];

const quickStatus = [
  { label: 'Pools', status: 'All Open', icon: Droplets, color: '#0284C7' },
  { label: 'Restaurants', status: '3/4 Open', icon: UtensilsCrossed, color: '#E97A74' },
  { label: 'Beach', status: 'Open', icon: Waves, color: '#06B6D4' },
  { label: 'Kids Club', status: 'Open', icon: Baby, color: '#F97316' },
];

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-white/40">{today}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Calendar size={13} />
          <span>SeaShell Hotel & Resort — Julai'a, Kuwait</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-2xl"
            style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                <k.icon size={17} style={{ color: k.color }} />
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-bold ${k.up ? 'text-green-400' : 'text-red-400'}`}>
                {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {k.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <p className="text-[11px] text-white/30 mt-0.5">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Occupancy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 p-5 rounded-2xl"
          style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
        >
          <h3 className="text-sm font-bold text-white mb-4">Weekly Occupancy Trend</h3>
          <div className="flex items-end gap-2 h-36">
            {[45, 52, 48, 61, 55, 68, 72].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-lg relative" style={{
                  height: `${v * 1.5}px`,
                  backgroundColor: i === 6 ? '#89C1D8' : 'rgba(137,193,216,0.2)',
                }}>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/60">{v}%</span>
                </div>
                <span className="text-[10px] text-white/30">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl"
          style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
        >
          <h3 className="text-sm font-bold text-white mb-4">Facility Status</h3>
          <div className="space-y-3">
            {quickStatus.map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}18` }}>
                  <s.icon size={16} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{s.label}</p>
                  <p className="text-[11px] text-white/40">{s.status}</p>
                </div>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-2xl"
          style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
        >
          <h3 className="text-sm font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex items-center gap-1.5 text-white/30 flex-shrink-0 w-16">
                  <Clock size={11} />
                  <span className="text-[10px]">{a.time}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  a.type === 'checkin' ? 'bg-green-400' :
                  a.type === 'checkout' ? 'bg-red-400' :
                  a.type === 'daypass' ? 'bg-orange-400' :
                  a.type === 'booking' ? 'bg-purple-400' :
                  'bg-cyan-400'
                }`} />
                <p className="text-xs text-white/60 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Room Type Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl"
          style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
        >
          <h3 className="text-sm font-bold text-white mb-4">Room Type Distribution</h3>
          <div className="space-y-3">
            {[
              { label: '2BR Chalets', occupied: 8, total: 12, color: '#89C1D8' },
              { label: '3BR Chalets', occupied: 5, total: 8, color: '#4ADE80' },
              { label: '4BR Chalets', occupied: 6, total: 10, color: '#A78BFA' },
              { label: 'Standard Rooms', occupied: 3, total: 6, color: '#F97316' },
              { label: 'Suites', occupied: 2, total: 4, color: '#E97A74' },
            ].map(r => {
              const pct = Math.round((r.occupied / r.total) * 100);
              return (
                <div key={r.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">{r.label}</span>
                    <span className="text-white font-medium">{r.occupied}/{r.total}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
