import { motion } from 'framer-motion';
import { Coffee, Sparkles, Sailboat, ChevronRight } from 'lucide-react';

interface ValidZonesDirectoryProps {
  onZoneSpend?: (zone: string, amount: number) => void;
}

const zones = [
  {
    id: 'fnb',
    title: 'Food & Beverage',
    subtitle: 'Beach Bar, Lounges',
    description: 'Redeem at Avenue Restaurant, Cafe Presto, Gazebo Pool Bar, and all beachfront lounges. Valid for food, drinks, and refreshments.',
    icon: Coffee,
    color: '#4ADE80',
    bgColor: 'var(--tile-kitchen-bg)',
    spendOptions: [
      { label: 'Coffee & Snack', amount: 2.5 },
      { label: 'Lunch Meal', amount: 6.0 },
      { label: 'Beach Cocktail', amount: 3.5 },
    ],
  },
  {
    id: 'spa',
    title: 'Spa & Wellness',
    subtitle: 'Massage Cabanas',
    description: 'Available at the resort spa cabanas. Includes massage therapy, aromatherapy sessions, and wellness treatments.',
    icon: Sparkles,
    color: '#A78BFA',
    bgColor: 'rgba(167, 139, 250, 0.12)',
    spendOptions: [
      { label: '30-min Massage', amount: 5.0 },
      { label: '60-min Massage', amount: 10.0 },
      { label: 'Aromatherapy', amount: 7.0 },
    ],
  },
  {
    id: 'amenities',
    title: 'Resort Amenities',
    subtitle: 'Watersports',
    description: 'Jet-ski rentals, paddleboarding, beach equipment, and fitness center access. All non-motorized equipment included.',
    icon: Sailboat,
    color: '#7DD3FC',
    bgColor: 'var(--tile-rooms-bg)',
    spendOptions: [
      { label: 'Jet-ski (30min)', amount: 8.0 },
      { label: 'Paddleboard', amount: 4.0 },
      { label: 'Fitness Access', amount: 2.0 },
    ],
  },
];

export default function ValidZonesDirectory({ onZoneSpend }: ValidZonesDirectoryProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider px-1" style={{ color: 'var(--text-muted)' }}>
        Valid Spend Zones
      </h3>
      {zones.map((zone, i) => {
        const Icon = zone.icon;
        return (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--surface)', border: `1px solid ${zone.bgColor}` }}
          >
            {/* Zone Header */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: zone.bgColor }}>
                  <Icon size={20} style={{ color: zone.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{zone.title}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{zone.subtitle}</p>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {zone.description}
              </p>
            </div>

            {/* Quick Spend Buttons */}
            <div className="px-4 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Quick Spend</p>
              <div className="flex gap-2">
                {zone.spendOptions.map(opt => (
                  <motion.button
                    key={opt.label}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => onZoneSpend?.(opt.label, opt.amount)}
                    className="flex-1 py-2.5 px-2 rounded-xl text-center transition-colors"
                    style={{ backgroundColor: zone.bgColor }}
                  >
                    <p className="text-xs font-bold" style={{ color: zone.color }}>{opt.amount.toFixed(1)} KD</p>
                    <p className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{opt.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
