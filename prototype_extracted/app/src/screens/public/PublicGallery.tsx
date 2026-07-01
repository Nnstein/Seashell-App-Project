import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', category: 'aerial', caption: 'Aerial View of SeaShell Resort' },
  { src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80', category: 'pool', caption: 'Main Swimming Pool' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', category: 'room', caption: 'Two Bedroom Chalet Interior' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', category: 'beach', caption: 'Julai\'a Beach Front' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', category: 'dining', caption: 'Avenue Restaurant' },
  { src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', category: 'dining', caption: 'Cafe Presto' },
  { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', category: 'kids', caption: 'Kids\' Club Activities' },
  { src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', category: 'garden', caption: 'Resort Gardens' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', category: 'facilities', caption: 'Resort Facilities' },
];

const categories = ['all', 'aerial', 'pool', 'room', 'beach', 'dining', 'kids'] as const;

export default function PublicGallery() {
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter(img => img.category === filter);

  return (
    <div className="px-5 pt-4 pb-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Gallery</h1>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Discover SeaShell through our lens</p>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all ${filter === c ? 'text-white' : ''}`}
            style={filter === c ? { backgroundColor: 'var(--brand-cyan)' } : { backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-2 gap-3">
        {filtered.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative rounded-2xl overflow-hidden mb-3 break-inside-avoid cursor-pointer group"
            onClick={() => setLightbox(img.src)}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full object-cover"
              style={{ height: i % 3 === 0 ? '200px' : i % 3 === 1 ? '150px' : '180px' }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-5"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10">
              <X size={20} className="text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-[80vh] rounded-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
