import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Ticket, CreditCard, ArrowUpRight, Clock, QrCode, Ban } from 'lucide-react';

interface DayPassRecord {
  id: string;
  passId: string;
  guestName: string;
  civilId: string;
  issuedAt: string;
  expiresAt: string;
  balance: number;
  spent: number;
  status: 'active' | 'expired' | 'revoked';
  transactions: number;
}

const mockPasses: DayPassRecord[] = [
  { id: 'dp1', passId: 'SSP-X7K2-M9P4', guestName: 'Ahmad Fahad', civilId: '284052301234', issuedAt: '2026-06-26 08:30', expiresAt: '2026-06-26 23:59', balance: 8.500, spent: 6.500, status: 'active', transactions: 4 },
  { id: 'dp2', passId: 'SSP-A3B9-C2D1', guestName: 'Laila Omar', civilId: '286112701567', issuedAt: '2026-06-26 09:15', expiresAt: '2026-06-26 23:59', balance: 12.000, spent: 3.000, status: 'active', transactions: 2 },
  { id: 'dp3', passId: 'SSP-R5T8-Y2W6', guestName: 'Yousef Khalid', civilId: '281030408901', issuedAt: '2026-06-26 07:45', expiresAt: '2026-06-26 23:59', balance: 2.250, spent: 12.750, status: 'active', transactions: 7 },
  { id: 'dp4', passId: 'SSP-J4H7-L1K9', guestName: 'Nadia Salem', civilId: '289070602345', issuedAt: '2026-06-25 10:00', expiresAt: '2026-06-25 23:59', balance: 0, spent: 15.000, status: 'expired', transactions: 5 },
  { id: 'dp5', passId: 'SSP-P2M6-N8Q3', guestName: 'Hassan Ibrahim', civilId: '283041107890', issuedAt: '2026-06-26 11:20', expiresAt: '2026-06-26 23:59', balance: 15.000, spent: 0, status: 'active', transactions: 0 },
  { id: 'dp6', passId: 'SSP-E5F1-G7H3', guestName: 'Mariam Tariq', civilId: '287091104567', issuedAt: '2026-06-25 14:00', expiresAt: '2026-06-25 23:59', balance: 4.500, spent: 10.500, status: 'expired', transactions: 3 },
  { id: 'dp7', passId: 'SSP-U9V2-W4X6', guestName: 'Khaled Nasser', civilId: '282121209012', issuedAt: '2026-06-26 06:30', expiresAt: '2026-06-26 23:59', balance: 0, spent: 18.000, status: 'active', transactions: 9 },
];

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
  all: { label: 'All', color: '#89C1D8', bg: 'rgba(137,193,216,0.12)' },
  active: { label: 'Active', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
  expired: { label: 'Expired', color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  revoked: { label: 'Revoked', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
};

export default function DayPassManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockPasses.filter(p => {
    const matchSearch = !search || p.guestName.toLowerCase().includes(search.toLowerCase()) || p.passId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockPasses.reduce((s, p) => s + p.spent, 0);
  const activeCount = mockPasses.filter(p => p.status === 'active').length;
  const avgSpend = (totalRevenue / mockPasses.length).toFixed(2);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Day Pass Management</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Passes', value: activeCount.toString(), icon: Ticket, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
          { label: "Today's Revenue", value: `${totalRevenue.toFixed(3)} KD`, icon: CreditCard, color: '#89C1D8', bg: 'rgba(137,193,216,0.12)' },
          { label: 'Total Passes', value: mockPasses.length.toString(), icon: QrCode, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
          { label: 'Avg. Spend', value: `${avgSpend} KD`, icon: ArrowUpRight, color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-2xl" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: k.bg }}>
              <k.icon size={15} style={{ color: k.color }} />
            </div>
            <p className="text-xl font-bold text-white">{k.value}</p>
            <p className="text-[11px] text-white/30">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or pass ID..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[#161b22] text-white placeholder:text-white/20 outline-none border border-[#21262d]" />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'active', 'expired'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${statusFilter === s ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              style={{ backgroundColor: statusFilter === s ? statusCfg[s]?.bg || 'rgba(255,255,255,0.08)' : '#161b22', border: '1px solid #21262d' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Passes Table */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid #21262d' }}>
                {['Pass ID', 'Guest', 'Balance', 'Spent', 'Txns', 'Status', 'Issued', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const sc = statusCfg[p.status];
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02]" style={{ borderBottom: '1px solid #1a1f27' }}>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-cyan-300/60">{p.passId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">{p.guestName}</p>
                      <p className="text-[10px] text-white/30">ID: {p.civilId}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-green-400">{p.balance.toFixed(3)} KD</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-white/60">{p.spent.toFixed(3)} KD</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-white/50">{p.transactions}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>{sc.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <Clock size={11} />{p.issuedAt.split(' ')[1]}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400" title="Revoke">
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-[#1a1f27]">
          {filtered.map(p => {
            const sc = statusCfg[p.status];
            return (
              <div key={p.id} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-cyan-300/60">{p.passId}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: sc.bg, color: sc.color }}>{sc.label}</span>
                </div>
                <p className="text-sm font-medium text-white mb-1">{p.guestName}</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>Bal: <span className="text-green-400 font-bold">{p.balance.toFixed(3)} KD</span></span>
                  <span>Spent: {p.spent.toFixed(3)} KD</span>
                  <span>{p.transactions} txns</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && <div className="p-8 text-center text-white/30 text-sm">No day passes found</div>}
      </div>
    </div>
  );
}
