import { motion } from 'framer-motion';

export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Gallery skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[55vh] skeleton-shimmer"
      />

      {/* Info card skeleton */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="p-5 rounded-3xl space-y-4" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="w-20 h-5 rounded-full skeleton-shimmer" />
          <div className="w-2/3 h-6 rounded-lg skeleton-shimmer" />
          <TextSkeleton lines={2} />

          {/* Specs */}
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4].map(i => <div key={i} className="h-16 rounded-xl skeleton-shimmer" />)}
          </div>

          <div className="h-12 rounded-2xl skeleton-shimmer" />

          {/* Amenities */}
          <div className="space-y-3 pt-2">
            {[1,2,3].map(i => (
              <div key={i}>
                <div className="w-16 h-3 rounded-md skeleton-shimmer mb-2" />
                <div className="flex flex-wrap gap-1.5">
                  {[1,2,3].map(j => <div key={j} className="w-20 h-6 rounded-full skeleton-shimmer" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TextSkeleton({ lines = 2 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 rounded-md skeleton-shimmer w-full" style={{ opacity: 0.5 + (i % 2) * 0.3 }} />
      ))}
    </div>
  );
}
