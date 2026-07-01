import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BedDouble, Ruler, Users, Bath, Check, Phone } from 'lucide-react';
import { resortData } from '@/data/resortData';
import { getImageUrl } from '@/data/imageMap';
import { LoadingButton } from '@/components/loading';

interface RoomDetailPageProps {
  roomId: string;
  onBack: () => void;
}

// Multiple images per room for the gallery
const roomGalleryImages: Record<string, string[]> = {
  'ch-2br-ff': [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=85',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85',
  ],
  'ch-2br-gf': [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=85',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=85',
  ],
  'ch-3br-nv': [
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=85',
  ],
  'ch-3br-gv': [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=85',
  ],
  'ch-4br-pv': [
    'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  ],
  'ch-4br-bf': [
    'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
  ],
  'ch-4br-bp': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=85',
  ],
  'ch-4br-pp': [
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=85',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85',
  ],
  'rm-std': [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=85',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=85',
  ],
  'rm-studio-ff': [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=85',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=85',
  ],
  'rm-jr-ff': [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=85',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',
  ],
  'rm-sup': [
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=85',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=85',
  ],
  'rm-pre': [
    'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=85',
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=85',
  ],
};

export default function RoomDetailPage({ roomId, onBack }: RoomDetailPageProps) {
  const room = resortData.stay.room_types.find(r => r.id === roomId);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [inquiring, setInquiring] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!room) return null;

  const photos = roomGalleryImages[roomId] || [getImageUrl(room.image)];
  const categoryLabel = room.category === 'chalet' ? 'Chalet' : 'Hotel Room';
  const categoryColor = room.category === 'chalet' ? '#0284C7' : 'var(--tile-kitchen)';
  const categoryBg = room.category === 'chalet' ? 'var(--tile-rooms-bg)' : 'var(--tile-kitchen-bg)';

  const specItems = [
    ...(room.specifications.bedrooms ? [{ icon: BedDouble, label: 'Bedrooms', value: String(room.specifications.bedrooms) }] : []),
    ...(room.specifications.bathrooms ? [{ icon: Bath, label: 'Bathrooms', value: String(room.specifications.bathrooms) }] : []),
    ...(room.specifications.size_sqm ? [{ icon: Ruler, label: 'Size', value: `${room.specifications.size_sqm}m²` }] : []),
    ...(room.specifications.max_occupancy ? [{ icon: Users, label: 'Guests', value: room.specifications.max_occupancy.split(' ')[0] }] : []),
  ];

  const perks = [
    'Free access to pools and beach',
    '24/7 Room service',
    'Daily housekeeping',
    'Complimentary Wi-Fi',
    'Complimentary parking (1 car)',
    ...(room.specifications.balcony ? ['Private balcony'] : []),
    ...(room.specifications.terrace ? ['Private terrace'] : []),
    ...(room.specifications.jacuzzi ? ['In-room jacuzzi'] : []),
    ...(room.specifications.private_pool ? ['Private swimming pool'] : []),
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* ====== PHOTO GALLERY ====== */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentPhoto}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={photos[currentPhoto]}
            alt={`${room.name} - Photo ${currentPhoto + 1}`}
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

      {/* ====== ROOM INFO ====== */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="p-5 rounded-3xl" style={{ backgroundColor: 'var(--surface)' }}>
          {/* Category Badge + Name */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: categoryBg, color: categoryColor }}>
              {categoryLabel}
            </span>
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{room.name}</h1>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{room.description}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {specItems.map(spec => {
              const Icon = spec.icon;
              return (
                <div key={spec.label} className="p-2.5 rounded-xl text-center" style={{ backgroundColor: 'var(--app-bg)' }}>
                  <Icon size={16} className="mx-auto mb-1" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{spec.value}</p>
                  <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{spec.label}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <LoadingButton
            loading={inquiring}
            loadingText="Connecting..."
            onClick={() => { setInquiring(true); setTimeout(() => setInquiring(false), 1500); }}
            className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm mb-6"
            style={{ backgroundColor: 'var(--brand-cyan)' }}
          >
            <Phone size={15} />
            Inquire About This Room
          </LoadingButton>

          {/* Amenities */}
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Amenities</h3>
          <div className="space-y-3">
            {Object.entries(room.amenities).map(([category, items]) => (
              <div key={category}>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span key={item} className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-secondary)' }}>
                      <Check size={10} style={{ color: 'var(--tile-kitchen)' }} /> {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Perks */}
          <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--nav-border)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Included Perks</h3>
            <div className="space-y-2">
              {perks.map(perk => (
                <div key={perk} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
                    <Check size={11} style={{ color: 'var(--tile-kitchen)' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====== OTHER ROOMS ====== */}
      <div className="px-5 pt-6 pb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>You May Also Like</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {resortData.stay.room_types
            .filter(r => r.id !== roomId)
            .slice(0, 4)
            .map(r => (
              <button
                key={r.id}
                onClick={() => onBack()}
                className="snap-start flex-shrink-0 w-36 rounded-2xl overflow-hidden relative text-left"
                style={{ height: '160px' }}
              >
                <img src={getImageUrl(r.image)} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[11px] font-bold leading-tight">{r.name}</p>
                  <p className="text-white/50 text-[9px] capitalize">{r.category}</p>
                </div>
              </button>
            ))}
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
