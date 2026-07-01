import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Phone, UtensilsCrossed, Star, Check } from 'lucide-react';
import { resortData } from '@/data/resortData';
import { getImageUrl } from '@/data/imageMap';
import { LoadingButton } from '@/components/loading';

interface DiningDetailPageProps {
  restaurantId: string;
  onBack: () => void;
}

const diningGalleryImages: Record<string, string[]> = {
  'dine-avenue': [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=85',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85',
  ],
  'dine-presto': [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=85',
  ],
  'dine-gazebo': [
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=85',
    'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=85',
  ],
  'dine-seashell': [
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=85',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85',
  ],
};

export default function DiningDetailPage({ restaurantId, onBack }: DiningDetailPageProps) {
  const restaurant = resortData.dine.restaurants.find(r => r.id === restaurantId);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reserving, setReserving] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!restaurant) return null;

  const photos = diningGalleryImages[restaurantId] || [getImageUrl(restaurant.image)];

  const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
    restaurant: { label: 'Restaurant', color: '#0284C7', bg: 'var(--tile-rooms-bg)' },
    cafe: { label: 'Cafe', color: '#D97706', bg: 'var(--tile-services-bg)' },
    pool_bar: { label: 'Pool Bar', color: 'var(--tile-kitchen)', bg: 'var(--tile-kitchen-bg)' },
  };
  const typeInfo = typeLabels[restaurant.type] || typeLabels.restaurant;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* ====== PHOTO GALLERY ====== */}
      <div className="relative h-[50vh] min-h-[340px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentPhoto}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={photos[currentPhoto]}
            alt={`${restaurant.name} - Photo ${currentPhoto + 1}`}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
        >
          <ArrowLeft size={18} className="text-white" />
        </motion.button>

        {/* Photo Counter */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <span className="text-white text-xs font-semibold">{currentPhoto + 1} / {photos.length}</span>
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2 overflow-x-auto no-scrollbar">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all"
              style={{ borderColor: i === currentPhoto ? 'white' : 'transparent' }}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ====== RESTAURANT INFO ====== */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="p-5 rounded-3xl" style={{ backgroundColor: 'var(--surface)' }}>
          {/* Type Badge + Name */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: typeInfo.bg, color: typeInfo.color }}>
              {typeInfo.label}
            </span>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{restaurant.name}</h1>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{restaurant.description}</p>

          {/* Quick Info Row */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
              <UtensilsCrossed size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="text-xs font-medium">{restaurant.meal_type}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
              <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="text-xs font-medium line-clamp-1">{restaurant.location_tag}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
              <Clock size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="text-xs font-medium">Contact for hours</span>
            </div>
          </div>

          {/* CTA */}
          <LoadingButton
            loading={reserving}
            loadingText="Connecting..."
            onClick={() => { setReserving(true); setTimeout(() => setReserving(false), 1500); }}
            className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm mb-6"
            style={{ backgroundColor: 'var(--brand-cyan)' }}
          >
            <Phone size={15} />
            Reserve a Table
          </LoadingButton>

          {/* Cuisines */}
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Cuisines</h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {restaurant.cuisines.map(c => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: typeInfo.bg, color: typeInfo.color }}>
                {c}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="pt-4" style={{ borderTop: '1px solid var(--nav-border)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Features</h3>
            <div className="space-y-2">
              {restaurant.features.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
                    <Check size={11} style={{ color: 'var(--tile-kitchen)' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating placeholder */}
          <div className="mt-5 pt-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--nav-border)' }}>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} className="text-yellow-400" fill="#FACC15" />
              ))}
            </div>
            <span className="text-sm font-bold">5.0</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Guest favorite</span>
          </div>
        </div>
      </div>

      {/* ====== OTHER VENUES ====== */}
      <div className="px-5 pt-6 pb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Other Venues</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {resortData.dine.restaurants
            .filter(r => r.id !== restaurantId)
            .map(r => {
              const otherType = typeLabels[r.type] || typeLabels.restaurant;
              return (
                <button
                  key={r.id}
                  onClick={() => onBack()}
                  className="snap-start flex-shrink-0 w-36 rounded-2xl overflow-hidden relative text-left"
                  style={{ height: '150px' }}
                >
                  <img src={getImageUrl(r.image)} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ backgroundColor: otherType.color, color: 'white' }}>
                      {otherType.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <p className="text-white text-[11px] font-bold leading-tight">{r.name}</p>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* ====== LIGHTBOX ====== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black flex flex-col"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="flex items-center justify-between p-4">
              <button onClick={() => setLightboxOpen(false)} className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <ArrowLeft size={20} className="text-white" />
              </button>
              <span className="text-white text-sm font-medium">{currentPhoto + 1} / {photos.length}</span>
              <div className="w-10" />
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <motion.img
                key={currentPhoto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={photos[currentPhoto]}
                alt=""
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={e => e.stopPropagation()}
              />
            </div>
            <div className="flex justify-center gap-2 p-4">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentPhoto(i); }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ backgroundColor: i === currentPhoto ? 'white' : 'rgba(255,255,255,0.35)' }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
