import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, MapPin, ArrowRight, Phone, Mail } from 'lucide-react';
import { resortData } from '@/data/resortData';
import { eventsData } from '@/data/resortData';

interface PublicLandingProps {
  onCheckIn: () => void;
  onGetDayPass: () => void;
  onViewRooms: () => void;
}

const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=85',
    alt: 'SeaShell Resort Aerial View',
  },
  {
    src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=900&q=85',
    alt: 'Main Swimming Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
    alt: 'Julai\'a Beach Front',
  },
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
    alt: 'Luxury Room Interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85',
    alt: 'Resort Pool at Sunset',
  },
];

export default function PublicLanding({ onCheckIn, onGetDayPass, onViewRooms: _onViewRooms }: PublicLandingProps) {
  const { meta, explore } = resortData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div>
      {/* ====== HERO CAROUSEL ====== */}
      <div className="relative h-[440px] overflow-hidden">
        {/* Sliding Images */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].src}
              alt={heroSlides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 z-10" />

        {/* Floating Award Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
        >
          <Award size={13} className="text-yellow-400" />
          <span className="text-white text-[10px] font-bold">World Luxury Hotel Award 2014</span>
        </motion.div>

        {/* Slide Counter */}
        <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <span className="text-white text-[10px] font-semibold">{currentSlide + 1} / {heroSlides.length}</span>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Logo mark */}
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              src="/logo-white.jpg"
              alt="SeaShell"
              className="w-12 h-12 rounded-2xl object-contain mb-3"
              style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
            />
            <h1 className="text-white text-[28px] font-bold leading-tight mb-2 drop-shadow-lg">
              {meta.resort_name}
            </h1>
            <p className="text-white/80 text-sm mb-3 leading-relaxed line-clamp-2">
              {explore.overview.body}
            </p>
            <div className="flex items-center gap-1.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="text-yellow-400" fill="#FACC15" />
              ))}
              <span className="text-white/60 text-xs ml-1">5-Star Resort · Julai&apos;a, Kuwait</span>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onCheckIn}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--brand-cyan)' }}
              >
                Check In <ArrowRight size={14} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onGetDayPass}
                className="px-5 py-3.5 rounded-2xl font-semibold text-sm text-white border border-white/35 flex items-center gap-1.5"
              >
                Get Day Pass
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-[185px] left-0 right-0 z-20 flex justify-center gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === currentSlide ? 24 : 7,
                height: 7,
                backgroundColor: i === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ====== RESORT OVERVIEW ====== */}
      <div className="px-5 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Welcome to SeaShell</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            {explore.overview.body_extended}
          </p>

          {/* KPI Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { value: '13', label: 'Room Types', iconColor: '#0284C7' },
              { value: '4', label: 'Restaurants', iconColor: 'var(--tile-kitchen)' },
              { value: '4', label: 'Pools', iconColor: '#D97706' },
            ].map(stat => (
              <div key={stat.label} className="p-3 rounded-2xl text-center" style={{ backgroundColor: 'var(--surface)' }}>
                <p className="text-2xl font-bold" style={{ color: stat.iconColor }}>{stat.value}</p>
                <p className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ====== UPCOMING EVENTS ====== */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Upcoming Events</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {eventsData.slice(0, 4).map(event => (
            <div key={event.id} className="snap-start flex-shrink-0 w-48 rounded-2xl overflow-hidden relative" style={{ height: '180px' }}>
              <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-bold leading-tight">{event.title}</p>
                <p className="text-white/60 text-[10px]">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== PROMOTIONAL VIDEO / MARKETING ====== */}
      <div className="px-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Experience SeaShell</h3>
          <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="relative h-52">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
                alt="SeaShell Resort Experience"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M2 2L18 12L2 22V2Z" fill="var(--brand-cyan)" stroke="var(--brand-cyan)" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.button>
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/40 text-white backdrop-blur-sm">Resort Video</span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Your Perfect Getaway Awaits</h4>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                Nestled along the pristine coastline of Julai&apos;a, SeaShell Hotel &amp; Resort offers an unparalleled blend of Mediterranean charm and Arabian hospitality. From sunrise yoga on the beach to sunset dining by the pool, every moment is crafted for your serenity.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Private Beach', value: '500m shoreline' },
                  { label: 'Spa & Wellness', value: 'Full-service' },
                  { label: 'Water Sports', value: 'Jet-ski, Kayak' },
                  { label: 'Kids Club', value: 'Ages 4-12' },
                ].map(item => (
                  <div key={item.label} className="p-2.5 rounded-xl" style={{ backgroundColor: 'var(--app-bg)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ====== RESORT HIGHLIGHTS ====== */}
      <div className="px-5 pb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Resort Highlights</h3>
        <div className="space-y-3">
          {[
            { title: 'White Sandy Beach', desc: 'Direct seafront access on the Gulf of Kuwait', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
            { title: 'Mediterranean Architecture', desc: 'Terracotta buildings with turquoise pools and lush gardens', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80' },
            { title: 'Family-Friendly', desc: 'Kids club, playground, cinema & entertainment center', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ====== LOCATION ====== */}
      <div className="px-5 pb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Location</h3>
        <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="flex items-start gap-3 mb-3">
            <MapPin size={18} style={{ color: 'var(--brand-cyan)', marginTop: '2px' }} />
            <div>
              <p className="text-sm font-medium">{explore.contact.address}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>P.O.Box 488 Sabahiya, 54575 Kuwait</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Phone size={16} style={{ color: 'var(--brand-cyan)' }} />
            <p className="text-sm">{explore.contact.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} style={{ color: 'var(--brand-cyan)' }} />
            <p className="text-sm">{explore.contact.email}</p>
          </div>
        </div>
      </div>

      {/* ====== CTA FOOTER ====== */}
      <div className="px-5 pb-8 space-y-3">
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onGetDayPass}
            className="flex-1 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--tile-kitchen-bg)', color: 'var(--tile-kitchen)' }}
          >
            Get Day Pass
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCheckIn}
            className="flex-1 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--tile-rooms-bg)', color: '#0284C7' }}
          >
            Check In
          </motion.button>
        </div>
      </div>
    </div>
  );
}
