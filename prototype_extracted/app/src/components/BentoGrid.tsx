import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, ConciergeBell, BedDouble, X, Plus, Minus, Phone } from 'lucide-react';
import { kitchenData, servicesData, roomsData } from '@/data/resortData';
import { LoadingButton } from '@/components/loading';
import type { RoomType } from '@/types';

interface BentoGridProps {
  onTileClick: (tile: string) => void;
}

export default function BentoGrid({ onTileClick }: BentoGridProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hkRequest, setHkRequest] = useState<string>('');

  const handleTileClick = (tile: string) => {
    setActiveModal(tile);
    onTileClick(tile);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="px-5 pt-2 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Kitchen Tile */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTileClick('kitchen')}
            className="bento-tile h-36 p-4 flex flex-col justify-between text-left"
            style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: 'var(--tile-kitchen)' }}>Kitchen</span>
              <UtensilsCrossed size={18} style={{ color: 'var(--tile-kitchen)' }} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {kitchenData.restaurants.length} Venues
              </span>
              <div className="w-14 h-14 rounded-2xl overflow-hidden opacity-80">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80"
                  alt="Food"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.button>

          {/* Services Tile */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTileClick('services')}
            className="bento-tile h-36 p-4 flex flex-col justify-between text-left"
            style={{ backgroundColor: 'var(--tile-services-bg)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: '#D97706' }}>Services</span>
              <ConciergeBell size={18} style={{ color: '#D97706' }} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {servicesData.services.length} Services
              </span>
              <div className="w-14 h-14 rounded-2xl overflow-hidden opacity-80">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80"
                  alt="Service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.button>

          {/* Rooms Tile */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTileClick('rooms')}
            className="bento-tile col-span-2 h-32 p-4 flex items-center justify-between text-left"
            style={{ backgroundColor: 'var(--tile-rooms-bg)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color: '#0284C7' }}>Rooms</span>
                <BedDouble size={18} style={{ color: '#0284C7' }} />
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {roomsData.roomTypes.length} Types
              </span>
            </div>
            <div className="w-24 h-20 rounded-2xl overflow-hidden opacity-80">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80"
                alt="Room"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl p-6 no-scrollbar"
              style={{ backgroundColor: 'var(--surface)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: 'var(--nav-border)' }} />
              <button onClick={closeModal} className="absolute top-4 right-4 p-2 rounded-full" style={{ backgroundColor: 'var(--nav-border)' }}>
                <X size={16} />
              </button>

              {activeModal === 'kitchen' && <KitchenModal />}
              {activeModal === 'services' && <ServicesModal hkRequest={hkRequest} setHkRequest={setHkRequest} />}
              {activeModal === 'rooms' && <RoomsModal />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function KitchenModal() {
  const [orderQty, setOrderQty] = useState<Record<string, number>>({});
  const [placingOrder, setPlacingOrder] = useState(false);

  const adjustQty = (name: string, delta: number) => {
    setOrderQty(prev => ({ ...prev, [name]: Math.max(0, (prev[name] || 0) + delta) }));
  };

  const totalItems = Object.values(orderQty).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>In-Room Dining</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>24/7 Room Service — Delivered to your door</p>

      <div className="space-y-4 mb-6">
        {kitchenData.restaurants.map(r => (
          <div key={r.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ backgroundColor: 'var(--app-bg)' }}>
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{r.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{r.cuisines.join(' · ')}</p>
            </div>
            <button className="p-2 rounded-full" style={{ backgroundColor: 'var(--tile-kitchen)' }}>
              <Phone size={14} className="text-white" />
            </button>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Quick Order</h3>
      <div className="space-y-3 mb-6">
        {kitchenData.categories.flatMap(c => c.items).map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: 'var(--brand-salmon)' }}>{item.price_kd} KD</span>
              <div className="flex items-center gap-2">
                <button onClick={() => adjustQty(item.name, -1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--nav-border)' }}>
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{orderQty[item.name] || 0}</span>
                <button onClick={() => adjustQty(item.name, 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--tile-kitchen)' }}>
                  <Plus size={12} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <LoadingButton
          loading={placingOrder}
          loadingText="Placing order..."
          onClick={() => { setPlacingOrder(true); setTimeout(() => setPlacingOrder(false), 1500); }}
          className="w-full py-4 rounded-2xl font-semibold text-white"
          style={{ backgroundColor: 'var(--tile-kitchen)' }}
        >
          Place Order ({totalItems} items)
        </LoadingButton>
      )}
    </div>
  );
}

function ServicesModal({ hkRequest, setHkRequest }: { hkRequest: string; setHkRequest: (s: string) => void }) {
  const hkOptions = ['Extra Towels', 'Make Up Room', 'Extra Toiletries', 'Turn-Down Service', 'Laundry Pickup'];
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!hkRequest) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Guest Services</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Housekeeping & concierge at your fingertips</p>

      {submitted ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
            <ConciergeBell size={28} style={{ color: 'var(--tile-kitchen)' }} />
          </div>
          <p className="text-lg font-bold mb-1">Request Submitted!</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Ref: #{Math.floor(Math.random() * 9000 + 1000)}</p>
        </motion.div>
      ) : (
        <>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Housekeeping</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {hkOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setHkRequest(opt)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${hkRequest === opt ? 'text-white' : ''}`}
                style={hkRequest === opt ? { backgroundColor: '#D97706' } : { backgroundColor: 'var(--app-bg)', color: 'var(--text-secondary)' }}
              >
                {opt}
              </button>
            ))}
          </div>
          <LoadingButton
            loading={submitting}
            loadingText="Sending..."
            onClick={handleSubmit}
            disabled={!hkRequest}
            className="w-full py-3.5 rounded-2xl font-semibold text-white mb-6 disabled:opacity-40"
            style={{ backgroundColor: '#D97706' }}
          >
            Submit Request
          </LoadingButton>

          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>All Services</h3>
          <div className="space-y-2">
            {servicesData.services.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--tile-services-bg)' }}>
                  <ConciergeBell size={18} style={{ color: '#D97706' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RoomsModal() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Accommodations</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{roomsData.roomTypes.length} room types available</p>

      <div className="space-y-3">
        {roomsData.roomTypes.map((room: RoomType) => (
          <div key={room.id} className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--app-bg)' }}>
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{room.name}</p>
                <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{room.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase" style={{ backgroundColor: 'var(--tile-rooms-bg)', color: '#0284C7' }}>
                    {room.category}
                  </span>
                  {room.specifications.bedrooms && (
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {room.specifications.bedrooms} BR
                    </span>
                  )}
                  {room.specifications.size_sqm && (
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {room.specifications.size_sqm}m²
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
