import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Navigation, Award, Star } from 'lucide-react';
import { resortData } from '@/data/resortData';

export default function PublicContact() {
  const { explore, plan } = resortData;

  return (
    <div className="px-5 pt-4 pb-6">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Contact Us</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>We&apos;re here to make your stay perfect</p>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl mb-5"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-rooms-bg)' }}>
            <Phone size={20} style={{ color: '#0284C7' }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Reservations</p>
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{explore.contact.phone}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone size={16} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Direct Reservations</p>
              <p className="text-sm">{explore.contact.phone_reservations_1}</p>
              <p className="text-sm">{explore.contact.phone_reservations_2}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm">{explore.contact.email}</p>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
            <div>
              <p className="text-sm">{explore.contact.address}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{explore.contact.po_box}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Awards */}
      <div className="p-4 rounded-2xl mb-5 flex items-center gap-3" style={{ backgroundColor: 'var(--surface)' }}>
        <Award size={24} className="text-yellow-500" />
        <div>
          <p className="text-sm font-bold">World Luxury Hotel Award Winner</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>2014</p>
        </div>
        <div className="ml-auto flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="text-yellow-400" fill="#FACC15" />
          ))}
        </div>
      </div>

      {/* Nearby Attractions Quick View */}
      <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Nearby Attractions</h3>
      <div className="space-y-2">
        {plan.nearby_attractions.slice(0, 5).map((attr, i) => (
          <motion.div
            key={attr.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-3 rounded-xl flex items-center justify-between"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <div className="flex items-center gap-2">
              <Navigation size={14} style={{ color: 'var(--text-muted)' }} />
              <p className="text-sm">{attr.name}</p>
            </div>
            <span className="text-xs font-bold" style={{ color: 'var(--brand-cyan)' }}>
              {attr.distance_km ? `${attr.distance_km} km` : attr.distance_note}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
