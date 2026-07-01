import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { eventsData, filterTags } from '@/data/resortData';
import type { FilterTag } from '@/data/resortData';

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = activeFilter === 'all'
    ? eventsData
    : eventsData.filter(e => e.tags.includes(activeFilter));

  return (
    <section className="pt-4 pb-28">
      {/* Header */}
      <div className="px-5 mb-3">
        <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          EVENTS
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Join our daily events</p>
      </div>

      {/* Filter Pills */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`filter-pill ${activeFilter === tag ? 'active' : ''}`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards - Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-5 snap-x snap-mandatory"
      >
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="event-card snap-start cursor-pointer"
            whileTap={{ scale: 0.97 }}
          >
            {/* Background Image */}
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Tag Pills */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {event.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: tag === 'Party' ? 'rgba(74,222,128,0.9)' :
                                     tag === 'Music' ? 'rgba(253,230,138,0.9)' :
                                     'rgba(125,211,252,0.9)',
                    color: tag === 'Party' ? '#064E3B' : tag === 'Music' ? '#78350F' : '#0C4A6E',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-base mb-1 leading-tight">{event.title}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-white/70" />
                  <span className="text-white/70 text-[11px]">{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-white/70" />
                  <span className="text-white/70 text-[11px]">{event.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
