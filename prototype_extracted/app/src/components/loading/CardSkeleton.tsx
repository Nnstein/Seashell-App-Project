import { motion } from 'framer-motion';

interface CardSkeletonProps {
  count?: number;
  variant?: 'vertical' | 'horizontal' | 'tile';
}

export function CardSkeleton({ count = 3, variant = 'vertical' }: CardSkeletonProps) {
  const cards = Array.from({ length: count });

  if (variant === 'tile') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="aspect-[3/4] rounded-2xl skeleton-shimmer"
          />
        ))}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-3 overflow-hidden">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-48 h-44 rounded-2xl skeleton-shimmer"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cards.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <div className="h-44 skeleton-shimmer" />
          <div className="p-4 space-y-3">
            <div className="w-3/4 h-5 rounded-lg skeleton-shimmer" />
            <div className="w-full h-3 rounded-lg skeleton-shimmer" />
            <div className="w-2/3 h-3 rounded-lg skeleton-shimmer" />
            <div className="flex gap-2 pt-1">
              <div className="w-16 h-6 rounded-full skeleton-shimmer" />
              <div className="w-20 h-6 rounded-full skeleton-shimmer" />
              <div className="w-14 h-6 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
