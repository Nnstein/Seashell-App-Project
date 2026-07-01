import { motion } from 'framer-motion';
import { MapPin, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { resortData } from '@/data/resortData';
import { getImageUrl } from '@/data/imageMap';

interface PublicDiningProps {
  onSelectRestaurant: (id: string) => void;
}

const typeConfig: Record<string, { label: string; color: string }> = {
  restaurant: { label: 'Restaurant', color: '#0284C7' },
  cafe: { label: 'Cafe', color: '#D97706' },
  pool_bar: { label: 'Pool Bar', color: '#4ADE80' },
};

export default function PublicDining({ onSelectRestaurant }: PublicDiningProps) {
  const { restaurants } = resortData.dine;

  return (
    <div className="px-5 pt-4 pb-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Dining</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
        Four unique venues, endless flavors
      </p>

      <div className="grid grid-cols-2 gap-3">
        {restaurants.map((r, i) => {
          const t = typeConfig[r.type] || typeConfig.restaurant;
          return (
            <motion.button
              key={r.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelectRestaurant(r.id)}
              className="relative rounded-2xl overflow-hidden text-left aspect-[3/4] group"
              whileTap={{ scale: 0.97 }}
            >
              {/* Background Image */}
              <img src={getImageUrl(r.image)} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'; }} />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Type Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ backgroundColor: t.color, color: 'white' }}>
                  {t.label}
                </span>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <ChevronRight size={14} className="text-white" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                <h3 className="text-white font-bold text-sm leading-tight mb-1.5 line-clamp-2">{r.name}</h3>

                {/* Cuisines */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {r.cuisines.slice(0, 2).map(c => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/15 text-white/80 backdrop-blur-sm">
                      {c}
                    </span>
                  ))}
                </div>

                {/* Quick info */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <UtensilsCrossed size={10} className="text-white/50" />
                    <span className="text-white/50 text-[9px]">{r.meal_type.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-white/50" />
                    <span className="text-white/50 text-[9px]">On-site</span>
                  </div>
                </div>

                <p className="text-white/30 text-[9px] mt-1.5 font-medium uppercase tracking-wider">Tap for details</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
