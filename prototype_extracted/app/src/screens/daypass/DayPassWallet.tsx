import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight, ArrowDownRight, Coffee, Sparkles, Sailboat, Receipt } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import MasterWalletCard from '@/components/daypass/MasterWalletCard';
import ValidZonesDirectory from '@/components/daypass/ValidZonesDirectory';
import { LoadingButton } from '@/components/loading';

export default function DayPassWallet() {
  const { wallet, addTransaction, topUp } = useAuth();
  const [toppingUp, setToppingUp] = useState(false);
  const [showTopUpOptions, setShowTopUpOptions] = useState(false);

  if (!wallet) return null;

  // Recent transactions (last 3)
  const recentTx = wallet.transactions.slice(0, 3);

  const zoneIcons: Record<string, typeof Coffee> = {
    'Food & Beverage': Coffee,
    'Spa & Wellness': Sparkles,
    'Resort Amenities': Sailboat,
    'System': Receipt,
    'Payment Gateway': ArrowUpRight,
  };

  const handleZoneSpend = (label: string, amount: number) => {
    addTransaction({
      type: 'debit',
      amount,
      description: label,
      zone: label.split('—')[0]?.trim() || 'Resort',
    });
  };

  const handleTopUp = (amount: number) => {
    setToppingUp(true);
    setTimeout(() => {
      topUp(amount);
      setToppingUp(false);
      setShowTopUpOptions(false);
    }, 1200);
  };

  return (
    <div className="px-5 pt-3 pb-6 space-y-6">
      {/* Wallet Card */}
      <MasterWalletCard balance={wallet.balance} passId={wallet.passId} issuedAt={wallet.issuedAt} />

      {/* Quick Actions */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTopUpOptions(!showTopUpOptions)}
          className="flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--tile-kitchen-bg)', color: 'var(--tile-kitchen)' }}
        >
          <Plus size={16} />
          Top Up
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleZoneSpend('Beach Refreshment', 2.5)}
          className="flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--tile-rooms-bg)', color: '#0284C7' }}
        >
          <ArrowDownRight size={16} />
          Quick Spend
        </motion.button>
      </div>

      {/* Top Up Options */}
      <AnimatePresence>
        {showTopUpOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-2xl space-y-2" style={{ backgroundColor: 'var(--surface)' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Select Amount</p>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20].map(amt => (
                  <LoadingButton
                    key={amt}
                    loading={toppingUp}
                    onClick={() => handleTopUp(amt)}
                    className="py-3 rounded-xl font-semibold text-sm"
                    style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-primary)' }}
                  >
                    {amt} KD
                  </LoadingButton>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Recent Activity</h3>
          {wallet.transactions.length > 3 && (
            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
              {wallet.transactions.length} total
            </span>
          )}
        </div>
        <div className="space-y-2">
          {recentTx.map((tx, i) => {
            const Icon = zoneIcons[tx.zone] || Receipt;
            const isCredit = tx.type === 'credit';
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: isCredit ? 'var(--tile-kitchen-bg)' : 'var(--brand-pink)' }}>
                  <Icon size={16} style={{ color: isCredit ? 'var(--tile-kitchen)' : 'var(--brand-salmon)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{tx.description}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{tx.zone}</p>
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ${isCredit ? 'text-green-500' : 'text-red-400'}`}>
                  {isCredit ? '+' : '-'}{tx.amount.toFixed(3)} KD
                </span>
              </motion.div>
            );
          })}
          {recentTx.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Valid Zones */}
      <ValidZonesDirectory onZoneSpend={handleZoneSpend} />
    </div>
  );
}
