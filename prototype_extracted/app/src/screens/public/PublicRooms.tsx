import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BedDouble, Ruler, Users } from 'lucide-react';
import { resortData } from '@/data/resortData';
import { getImageUrl } from '@/data/imageMap';

interface PublicRoomsProps {
  onSelectRoom: (roomId: string) => void;
}

export default function PublicRooms({ onSelectRoom }: PublicRoomsProps) {
  const [filter, setFilter] = useState<'all' | 'chalet' | 'room'>('all');

  const rooms = resortData.stay.room_types.filter(
    r => filter === 'all' || r.category === filter
  );

  return (
    <div className="px-5 pt-4 pb-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Accommodations</h1>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        From cozy studios to beachfront chalets
      </p>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5">
        {(['all', 'chalet', 'room'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? 'text-white' : ''}`}
            style={filter === f ? { backgroundColor: 'var(--brand-cyan)' } : { backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}
          >
            {f === 'all' ? 'All' : f + 's'}
          </button>
        ))}
      </div>

      {/* Tile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {rooms.map((room, i) => {
            const isChalet = room.category === 'chalet';
            const accentColor = isChalet ? '#0284C7' : 'var(--tile-kitchen)';

            return (
              <motion.button
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                onClick={() => onSelectRoom(room.id)}
                className="relative rounded-2xl overflow-hidden text-left aspect-[3/4] group"
                whileTap={{ scale: 0.97 }}
              >
                {/* Background Image */}
                <img
                  src={getImageUrl(room.image)}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80'; }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{ backgroundColor: accentColor, color: 'white' }}
                  >
                    {isChalet ? 'Chalet' : 'Room'}
                  </span>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <ChevronRight size={14} className="text-white" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1.5 line-clamp-2">{room.name}</h3>

                  {/* Quick specs row */}
                  <div className="flex items-center gap-2.5">
                    {room.specifications.bedrooms && (
                      <div className="flex items-center gap-1">
                        <BedDouble size={11} className="text-white/60" />
                        <span className="text-white/70 text-[10px]">{room.specifications.bedrooms}</span>
                      </div>
                    )}
                    {room.specifications.size_sqm && (
                      <div className="flex items-center gap-1">
                        <Ruler size={11} className="text-white/60" />
                        <span className="text-white/70 text-[10px]">{room.specifications.size_sqm}m²</span>
                      </div>
                    )}
                    {room.specifications.max_occupancy && (
                      <div className="flex items-center gap-1">
                        <Users size={11} className="text-white/60" />
                        <span className="text-white/70 text-[10px]">{room.specifications.max_occupancy.split(' ')[0]} guests</span>
                      </div>
                    )}
                  </div>

                  {/* Tap hint */}
                  <p className="text-white/40 text-[9px] mt-2 font-medium uppercase tracking-wider">Tap for details</p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Room count */}
      <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
        Showing {rooms.length} of {resortData.stay.room_types.length} accommodations
      </p>
    </div>
  );
}
