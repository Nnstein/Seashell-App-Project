import { motion } from 'framer-motion';

export function HeroSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-[440px] overflow-hidden"
    >
      <div className="absolute inset-0 skeleton-shimmer" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 space-y-3">
        <div className="w-48 h-8 rounded-lg bg-white/15 skeleton-glass" />
        <div className="w-full h-4 rounded-lg bg-white/10 skeleton-glass" />
        <div className="w-2/3 h-4 rounded-lg bg-white/10 skeleton-glass" />
        <div className="flex gap-1.5 pt-1">
          {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 rounded-full bg-yellow-400/30" />)}
          <div className="w-32 h-3 rounded-lg bg-white/10 ml-1" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="flex-1 h-12 rounded-2xl bg-white/20 skeleton-glass" />
          <div className="w-28 h-12 rounded-2xl border border-white/20 bg-white/10" />
        </div>
      </div>
      <div className="absolute bottom-[185px] left-0 right-0 z-20 flex justify-center gap-1.5">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
        ))}
      </div>
    </motion.div>
  );
}
