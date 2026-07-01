import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Sailboat, Dumbbell, Baby, Building2, Users, Wifi, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { resortData } from '@/data/resortData';
import { getImageUrl } from '@/data/imageMap';
import { LoadingButton } from '@/components/loading';

/* ==========================================
   PHOTO GALLERIES — per facility item
   ========================================== */
const poolPhotos: Record<string, string[]> = {
  'pool-main': [
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=85',
    'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=85',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85',
  ],
  'pool-avenue': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=85',
  ],
  'pool-ladies': [
    'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  ],
  'pool-private': [
    'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=85',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85',
  ],
};

const activityPhotos: Record<string, string[]> = {
  'act-beach': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85',
    'https://images.unsplash.com/photo-1520454974749-611b7248ffc6?w=800&q=85',
  ],
  'act-watersports': [
    'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=85',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85',
  ],
  'act-fitness': [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
  ],
};

const kidsPhotos: Record<string, string[]> = {
  'kids-playground': [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=85',
    'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800&q=85',
  ],
  'kids-club': [
    'https://images.unsplash.com/photo-1596908181055-e10301e29561?w=800&q=85',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=85',
  ],
  'kids-cinema': [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=85',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=85',
  ],
  'kids-entertainment': [
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=85',
    'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&q=85',
  ],
};

const businessPhotos: Record<string, string[]> = {
  'biz-conference': [
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=85',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
  ],
  'biz-center': [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=85',
  ],
};

/* ==========================================
   Image Carousel Component
   ========================================== */
function ImageCarousel({ photos, height = '220px' }: { photos: string[]; height?: string }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(p => (p + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + photos.length) % photos.length), [photos.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ height }}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          src={photos[current]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Arrows */}
      {photos.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <ChevronLeft size={16} className="text-white" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <ChevronRight size={16} className="text-white" />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 18 : 5,
              height: 5,
              backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   Section-level combined carousel
   ========================================== */
function SectionCarousel({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent(p => (p + 1) % photos.length), [photos.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: '180px' }}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          src={photos[current]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 text-white text-[10px] font-semibold">
        {current + 1} / {photos.length}
      </div>
      <button onClick={next} className="absolute right-2 bottom-2 w-7 h-7 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
        <ChevronRight size={14} className="text-white" />
      </button>
    </div>
  );
}

/* ==========================================
   Main Component
   ========================================== */
export default function PublicFacilities() {
  const { pools, activities, kids_facilities, business_facilities } = resortData.plan;
  const [bookingId, setBookingId] = useState<string | null>(null);

  return (
    <div className="px-5 pt-4 pb-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Facilities</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Everything you need for the perfect stay</p>

      {/* ═══════════════════════════════════ POOLS ═══════════════════════════════════ */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-rooms-bg)' }}>
            <Droplets size={18} style={{ color: '#0284C7' }} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Swimming Pools</h2>
        </div>

        {/* Section carousel — all pool photos combined */}
        <SectionCarousel photos={Object.values(poolPhotos).flat()} />

        {/* Individual pool cards */}
        <div className="space-y-4">
          {pools.map((pool, i) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <ImageCarousel photos={poolPhotos[pool.id] || [getImageUrl(pool.image)]} height="180px" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold">{pool.name}</h3>
                  {pool.access !== 'All guests' && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}>
                      {pool.access}
                    </span>
                  )}
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{pool.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {pool.features.map(f => (
                    <span key={f} className="text-[10px] px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--tile-rooms-bg)', color: '#0284C7' }}>
                      <Check size={8} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════ ACTIVITIES ═══════════════════════════════════ */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-services-bg)' }}>
            <Sailboat size={18} style={{ color: '#D97706' }} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Activities</h2>
        </div>

        <SectionCarousel photos={Object.values(activityPhotos).flat()} />

        <div className="space-y-4">
          {activities.map((activity, i) => {
            const Icon = activity.category === 'sports' ? Sailboat : activity.category === 'fitness' ? Dumbbell : Users;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <ImageCarousel photos={activityPhotos[activity.id] || [getImageUrl(activity.image)]} height="180px" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold">{activity.name}</h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: activity.fee_applies ? 'var(--tile-services-bg)' : 'var(--tile-kitchen-bg)', color: activity.fee_applies ? '#92400E' : '#166534' }}>
                      {activity.fee_applies ? 'Fee Applies' : 'Complimentary'}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{activity.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activity.features.map(f => (
                      <span key={f} className="text-[10px] px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--tile-services-bg)', color: '#92400E' }}>
                        <Icon size={9} /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════ KIDS ═══════════════════════════════════ */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--brand-pink)' }}>
            <Baby size={18} style={{ color: 'var(--brand-salmon)' }} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Kids Facilities</h2>
        </div>

        <SectionCarousel photos={Object.values(kidsPhotos).flat()} />

        <div className="space-y-4">
          {kids_facilities.map((facility, i) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <ImageCarousel photos={kidsPhotos[facility.id] || [getImageUrl(facility.image)]} height="180px" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold">{facility.name}</h3>
                  {facility.age_range && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}>
                      Ages {facility.age_range}
                    </span>
                  )}
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{facility.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {facility.features.map(f => (
                    <span key={f} className="text-[10px] px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}>
                      <Check size={8} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════ BUSINESS ═══════════════════════════════════ */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--app-bg)' }}>
            <Building2 size={18} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Business Center</h2>
        </div>

        <SectionCarousel photos={Object.values(businessPhotos).flat()} />

        <div className="space-y-4">
          {business_facilities.map((biz, i) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <ImageCarousel photos={businessPhotos[biz.id] || [getImageUrl(biz.image)]} height="180px" />
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1">{biz.name}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{biz.description}</p>

                {biz.amenities && (
                  <div className="mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Amenities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {biz.amenities.map((a: string) => (
                        <span key={a} className="text-[10px] px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-secondary)' }}>
                          <Wifi size={8} /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {biz.booking_method && (
                  <LoadingButton
                    loading={bookingId === biz.id}
                    loadingText="Connecting..."
                    onClick={() => {
                      setBookingId(biz.id);
                      setTimeout(() => setBookingId(null), 1500);
                    }}
                    className="w-full py-3 rounded-2xl font-semibold text-white text-sm"
                    style={{ backgroundColor: 'var(--text-secondary)' }}
                  >
                    Inquire About Booking
                  </LoadingButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
