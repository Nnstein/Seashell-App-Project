import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Receipt, Coffee, Sparkles, Sailboat, Calendar, Search, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const zoneIcons: Record<string, typeof Receipt> = {
  'Food & Beverage': Coffee,
  'Spa & Wellness': Sparkles,
  'Resort Amenities': Sailboat,
  'System': Receipt,
  'Payment Gateway': ArrowUpRight,
  'Resort': Receipt,
  'Beach Refreshment': Coffee,
};

type FilterType = 'all' | 'credit' | 'debit';

export default function DayPassHistory() {
  const { wallet } = useAuth();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!wallet) return null;

  const filtered = useMemo(() => {
    let txs = wallet.transactions;
    if (filter !== 'all') txs = txs.filter(t => t.type === filter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      txs = txs.filter(t => t.description.toLowerCase().includes(q) || t.zone.toLowerCase().includes(q));
    }
    return txs;
  }, [wallet.transactions, filter, searchQuery]);

  const totalCredit = wallet.transactions.filter(t => t.type === 'credit').reduce((a, t) => a + t.amount, 0);
  const totalDebit = wallet.transactions.filter(t => t.type === 'debit').reduce((a, t) => a + t.amount, 0);

  const formatRelative = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const groupByDate = (txs: typeof wallet.transactions) => {
    const groups: Record<string, typeof txs> = {};
    txs.forEach(tx => {
      const date = new Date(tx.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      if (!groups[date]) groups[date] = [];
      groups[date].push(tx);
    });
    return groups;
  };

  const grouped = groupByDate(filtered);

  return (
    <div className="px-5 pt-3 pb-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>History</h1>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>All your transactions</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={14} style={{ color: 'var(--tile-kitchen)' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--tile-kitchen)' }}>Total In</span>
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--tile-kitchen)' }}>{totalCredit.toFixed(3)} KD</p>
        </div>
        <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--brand-pink)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown size={14} style={{ color: 'var(--brand-salmon)' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--brand-salmon)' }}>Total Out</span>
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--brand-salmon)' }}>{totalDebit.toFixed(3)} KD</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search transactions..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        {([
          { key: 'all' as FilterType, label: 'All' },
          { key: 'credit' as FilterType, label: 'Top-ups' },
          { key: 'debit' as FilterType, label: 'Spending' },
        ]).map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === f.key ? 'text-white' : ''}`}
            style={filter === f.key ? { backgroundColor: 'var(--brand-cyan)' } : { backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([date, txs]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-2 px-1">
              <Calendar size={12} style={{ color: 'var(--text-muted)' }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{date}</span>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>({txs.length})</span>
            </div>
            <div className="space-y-2">
              {txs.map((tx, i) => {
                const Icon = zoneIcons[tx.zone] || Receipt;
                const isCredit = tx.type === 'credit';
                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl"
                    style={{ backgroundColor: 'var(--surface)' }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: isCredit ? 'var(--tile-kitchen-bg)' : 'var(--brand-pink)' }}>
                      {isCredit ? <ArrowUpRight size={18} style={{ color: 'var(--tile-kitchen)' }} /> : <Icon size={18} style={{ color: 'var(--brand-salmon)' }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{tx.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: isCredit ? 'var(--tile-kitchen-bg)' : 'var(--brand-pink)', color: isCredit ? 'var(--tile-kitchen)' : 'var(--brand-salmon)' }}>
                          {tx.zone}
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{formatRelative(tx.timestamp)}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-sm font-bold ${isCredit ? 'text-green-500' : 'text-red-400'}`}>
                        {isCredit ? '+' : '-'}{tx.amount.toFixed(3)}
                      </span>
                      <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>KD</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Wallet size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
