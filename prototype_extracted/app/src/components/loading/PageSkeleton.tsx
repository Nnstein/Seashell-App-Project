import { motion } from 'framer-motion';

export function PageSkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Header placeholder */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="w-28 h-8 rounded-lg skeleton-shimmer" />
        <div className="flex gap-2">
          <div className="w-9 h-9 rounded-full skeleton-shimmer" />
          <div className="w-24 h-9 rounded-full skeleton-shimmer" />
        </div>
      </div>
      {/* Content area */}
      <div className="px-5 pt-4 space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="w-3/4 h-7 rounded-lg skeleton-shimmer" />
          <div className="w-1/2 h-4 rounded-lg skeleton-shimmer" />
          <div className="h-52 rounded-2xl skeleton-shimmer" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 rounded-xl skeleton-shimmer" />
            <div className="h-20 rounded-xl skeleton-shimmer" />
            <div className="h-20 rounded-xl skeleton-shimmer" />
          </div>
          <div className="h-40 rounded-2xl skeleton-shimmer" />
          <div className="h-36 rounded-2xl skeleton-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}
