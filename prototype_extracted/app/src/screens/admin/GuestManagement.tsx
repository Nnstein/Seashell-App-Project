import { useState } from 'react';
import { Search, Filter, UserCheck, UserX, BedDouble, Calendar, Phone, MoreHorizontal, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface GuestRecord {
  id: string;
  name: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'checked-in' | 'checked-out' | 'due-out';
  phone: string;
  nationality: string;
  adults: number;
  children: number;
}

const mockGuests: GuestRecord[] = [
  { id: 'g1', name: 'Abdullah Al-Sabah', room: '304', roomType: '2BR Chalet First', checkIn: '2026-06-22', checkOut: '2026-06-28', status: 'checked-in', phone: '+965 9911 2233', nationality: 'Kuwaiti', adults: 2, children: 2 },
  { id: 'g2', name: 'Fatima Hassan', room: '512', roomType: 'Presidential Suite', checkIn: '2026-06-20', checkOut: '2026-06-27', status: 'checked-in', phone: '+965 9944 5566', nationality: 'Kuwaiti', adults: 2, children: 0 },
  { id: 'g3', name: 'Mohammed Al-Rashid', room: '215', roomType: 'Studio First Floor', checkIn: '2026-06-24', checkOut: '2026-06-26', status: 'due-out', phone: '+965 9977 8899', nationality: 'Saudi', adults: 1, children: 0 },
  { id: 'g4', name: 'Sarah Johnson', room: '401', roomType: '2BR Chalet Ground', checkIn: '2026-06-18', checkOut: '2026-06-25', status: 'checked-out', phone: '+965 9922 3344', nationality: 'British', adults: 2, children: 1 },
  { id: 'g5', name: 'Ahmad Fahad', room: '105', roomType: 'Superior Room', checkIn: '2026-06-23', checkOut: '2026-06-30', status: 'checked-in', phone: '+965 9955 6677', nationality: 'Kuwaiti', adults: 2, children: 1 },
  { id: 'g6', name: 'Layla Mahmoud', room: '318', roomType: '3BR Chalet', checkIn: '2026-06-21', checkOut: '2026-06-29', status: 'checked-in', phone: '+965 9988 1100', nationality: 'Egyptian', adults: 2, children: 3 },
  { id: 'g7', name: 'Omar Khalil', room: '502', roomType: '4BR Panoramic', checkIn: '2026-06-25', checkOut: '2026-07-02', status: 'checked-in', phone: '+965 9933 4455', nationality: 'Kuwaiti', adults: 2, children: 2 },
  { id: 'g8', name: 'Nora Al-Enezi', room: '120', roomType: 'Junior Suite', checkIn: '2026-06-19', checkOut: '2026-06-24', status: 'checked-out', phone: '+965 9966 7788', nationality: 'Kuwaiti', adults: 1, children: 0 },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  'all': { label: 'All', color: '#89C1D8', bg: 'rgba(137,193,216,0.12)', icon: CheckCircle2 },
  'checked-in': { label: 'Checked In', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', icon: CheckCircle2 },
  'checked-out': { label: 'Checked Out', color: '#6B7280', bg: 'rgba(107,114,128,0.12)', icon: XCircle },
  'due-out': { label: 'Due Out', color: '#F97316', bg: 'rgba(249,115,22,0.12)', icon: Clock },
};

export default function GuestManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = mockGuests.filter(g => {
    const matchesSearch = !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.room.includes(search);
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: mockGuests.length,
    'checked-in': mockGuests.filter(g => g.status === 'checked-in').length,
    'checked-out': mockGuests.filter(g => g.status === 'checked-out').length,
    'due-out': mockGuests.filter(g => g.status === 'due-out').length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl font-bold text-white">Guest Management</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2" style={{ backgroundColor: '#89C1D8' }}>
            <UserCheck size={14} /> Check In
          </button>
          <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white/70 flex items-center gap-2" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <UserX size={14} /> Check Out
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        {(['all', 'checked-in', 'due-out', 'checked-out'] as const).map(key => (
          <button
            key={key}
            onClick={() => setStatusFilter(key === 'all' ? 'all' : key)}
            className={`p-3 rounded-xl text-left transition-all ${statusFilter === (key === 'all' ? 'all' : key) ? 'ring-1' : ''}`}
            style={{
              backgroundColor: statusFilter === (key === 'all' ? 'all' : key) ? statusConfig[key]?.bg || 'rgba(255,255,255,0.08)' : '#161b22',
              border: '1px solid #21262d',
            }}
          >
            <p className="text-lg font-bold text-white">{counts[key]}</p>
            <p className="text-[10px] text-white/40 capitalize">{key.replace('-', ' ')}</p>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or room..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[#161b22] text-white placeholder:text-white/20 outline-none border border-[#21262d] focus:border-cyan-400/40" />
        </div>
        <button className="px-3 py-2.5 rounded-xl flex items-center gap-2 text-xs text-white/60" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid #21262d' }}>
                {['Guest', 'Room', 'Dates', 'Status', 'Phone', 'Guests', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(g => {
                const sc = statusConfig[g.status];
                return (
                  <tr key={g.id} className="group hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid #1a1f27' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#89C1D8' }}>
                          {g.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{g.name}</p>
                          <p className="text-[10px] text-white/30">{g.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <BedDouble size={13} style={{ color: '#89C1D8' }} />
                        <span className="text-sm text-white/80">{g.room}</span>
                      </div>
                      <p className="text-[10px] text-white/30">{g.roomType}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-white/60 text-xs">
                        <Calendar size={12} />
                        {g.checkIn} → {g.checkOut}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>
                        <sc.icon size={10} />{sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-white/50 text-xs">
                        <Phone size={11} />{g.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-white/60">{g.adults}A {g.children > 0 && `/ ${g.children}C`}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-0">
          {filtered.map(g => {
            const sc = statusConfig[g.status];
            return (
              <div key={g.id} className="p-4 flex items-start gap-3" style={{ borderBottom: '1px solid #1a1f27' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#89C1D8' }}>
                  {g.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-white truncate">{g.name}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ml-2" style={{ backgroundColor: sc.bg, color: sc.color }}>
                      <sc.icon size={9} />{sc.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/40 mb-1">{g.room} · {g.roomType}</p>
                  <div className="flex items-center gap-3 text-[10px] text-white/30">
                    <span>{g.checkIn} → {g.checkOut}</span>
                    <span>{g.adults}A {g.children > 0 && `· ${g.children}C`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-white/30 text-sm">No guests found</div>
        )}
      </div>
    </div>
  );
}
