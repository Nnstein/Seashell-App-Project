import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BedDouble, CheckCircle2, Wrench, Sparkles } from 'lucide-react';

interface RoomUnit {
  id: string;
  number: string;
  type: string;
  category: 'chalet' | 'room';
  beds: string;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  guest?: string;
  checkOut?: string;
  price: number;
}

const mockRooms: RoomUnit[] = [
  // 2BR Chalets
  { id: 'r1', number: '101', type: '2BR Chalet Ground', category: 'chalet', beds: '1 King + 2 Twins', status: 'available', price: 180 },
  { id: 'r2', number: '102', type: '2BR Chalet Ground', category: 'chalet', beds: '1 King + 2 Twins', status: 'occupied', guest: 'Sarah Johnson', checkOut: '2026-06-25', price: 180 },
  { id: 'r3', number: '103', type: '2BR Chalet Ground', category: 'chalet', beds: '1 King + 2 Twins', status: 'cleaning', price: 180 },
  { id: 'r4', number: '201', type: '2BR Chalet First', category: 'chalet', beds: '1 King + 2 Twins', status: 'occupied', guest: 'Abdullah Al-Sabah', checkOut: '2026-06-28', price: 190 },
  { id: 'r5', number: '202', type: '2BR Chalet First', category: 'chalet', beds: '1 King + 2 Twins', status: 'available', price: 190 },
  { id: 'r6', number: '203', type: '2BR Chalet First', category: 'chalet', beds: '1 King + 2 Twins', status: 'maintenance', price: 190 },
  // 3BR Chalets
  { id: 'r7', number: '301', type: '3BR Chalet', category: 'chalet', beds: '2 King + 2 Twins', status: 'available', price: 250 },
  { id: 'r8', number: '302', type: '3BR Chalet', category: 'chalet', beds: '2 King + 2 Twins', status: 'occupied', guest: 'Layla Mahmoud', checkOut: '2026-06-29', price: 250 },
  { id: 'r9', number: '303', type: '3BR Garden View', category: 'chalet', beds: '2 King + 2 Twins', status: 'available', price: 260 },
  { id: 'r10', number: '304', type: '3BR Garden View', category: 'chalet', beds: '2 King + 2 Twins', status: 'occupied', guest: 'Abdullah Al-Sabah', checkOut: '2026-06-28', price: 260 },
  // 4BR Chalets
  { id: 'r11', number: '401', type: '4BR Panoramic', category: 'chalet', beds: '2 King + 4 Twins', status: 'available', price: 350 },
  { id: 'r12', number: '402', type: '4BR Panoramic', category: 'chalet', beds: '2 King + 4 Twins', status: 'occupied', guest: 'Omar Khalil', checkOut: '2026-07-02', price: 350 },
  { id: 'r13', number: '501', type: '4BR Beachfront', category: 'chalet', beds: '2 King + 4 Twins', status: 'available', price: 400 },
  // Standard Rooms
  { id: 'r14', number: '105', type: 'Superior Room', category: 'room', beds: '1 King', status: 'occupied', guest: 'Ahmad Fahad', checkOut: '2026-06-30', price: 120 },
  { id: 'r15', number: '106', type: 'Standard King', category: 'room', beds: '1 King', status: 'available', price: 95 },
  { id: 'r16', number: '107', type: 'Studio First', category: 'room', beds: '1 King', status: 'cleaning', price: 85 },
  // Suites
  { id: 'r17', number: '120', type: 'Junior Suite', category: 'room', beds: '1 King + Living', status: 'available', price: 150 },
  { id: 'r18', number: '215', type: 'Studio First', category: 'room', beds: '1 King', status: 'occupied', guest: 'Mohammed Al-Rashid', checkOut: '2026-06-26', price: 85 },
  { id: 'r19', number: '512', type: 'Presidential Suite', category: 'room', beds: '1 King + Living', status: 'occupied', guest: 'Fatima Hassan', checkOut: '2026-06-27', price: 220 },
];

const statusCfg: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  available: { label: 'Available', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', icon: CheckCircle2 },
  occupied: { label: 'Occupied', color: '#89C1D8', bg: 'rgba(137,193,216,0.12)', icon: BedDouble },
  cleaning: { label: 'Cleaning', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', icon: Sparkles },
  maintenance: { label: 'Maintenance', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', icon: Wrench },
};

export default function RoomManagement() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockRooms.filter(r => {
    const matchSearch = !search || r.number.includes(search) || r.type.toLowerCase().includes(search.toLowerCase()) || (r.guest && r.guest.toLowerCase().includes(search.toLowerCase()));
    const matchCat = catFilter === 'all' || r.category === catFilter;
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const counts = {
    available: mockRooms.filter(r => r.status === 'available').length,
    occupied: mockRooms.filter(r => r.status === 'occupied').length,
    cleaning: mockRooms.filter(r => r.status === 'cleaning').length,
    maintenance: mockRooms.filter(r => r.status === 'maintenance').length,
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Rooms & Chalets</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {Object.entries(counts).map(([key, val]) => {
          const sc = statusCfg[key];
          return (
            <button key={key} onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
              className="p-3 rounded-xl text-left" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
              <p className="text-lg font-bold" style={{ color: sc.color }}>{val}</p>
              <p className="text-[10px] text-white/40 capitalize">{sc.label}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search room, type, or guest..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[#161b22] text-white placeholder:text-white/20 outline-none border border-[#21262d]" />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'chalet', 'room'] as const).map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${catFilter === c ? 'text-white' : 'text-white/40'}`}
              style={{ backgroundColor: catFilter === c ? 'rgba(137,193,216,0.15)' : '#161b22', border: '1px solid #21262d' }}>
              {c === 'all' ? 'All' : c + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((r, i) => {
          const sc = statusCfg[r.status];
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="p-4 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-lg font-bold text-white">{r.number}</p>
                  <p className="text-[11px] text-white/40">{r.type}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>
                  <sc.icon size={10} />{sc.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/40 mb-2">
                <BedDouble size={12} />{r.beds}
              </div>
              {r.guest && (
                <div className="p-2 rounded-lg mb-2" style={{ backgroundColor: 'rgba(137,193,216,0.06)' }}>
                  <p className="text-xs text-cyan-300/70 font-medium">{r.guest}</p>
                  <p className="text-[10px] text-white/30">Until {r.checkOut}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{r.price} <span className="text-[10px] text-white/30 font-normal">KD/night</span></span>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60"><Sparkles size={13} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60"><Wrench size={13} /></button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="p-8 text-center text-white/30 text-sm">No rooms match your filters</div>}
    </div>
  );
}
