import { motion } from 'framer-motion';

export function DiningTileSkeleton() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {/* Title area */}
        <div className="w-32 h-7 rounded-lg skeleton-shimmer" />
        <div className="w-48 h-4 rounded-lg skeleton-shimmer" />

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
            >
              <div className="h-36 skeleton-shimmer" />
              <div className="p-3 space-y-2">
                <div className="w-3/4 h-4 rounded-md skeleton-shimmer" />
                <div className="w-full h-3 rounded-md skeleton-shimmer" />
                <div className="w-2/3 h-3 rounded-md skeleton-shimmer" />
                <div className="flex gap-1.5 pt-1">
                  <div className="w-14 h-5 rounded-full skeleton-shimmer" />
                  <div className="w-16 h-5 rounded-full skeleton-shimmer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
