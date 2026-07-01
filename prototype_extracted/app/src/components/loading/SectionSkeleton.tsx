import { motion } from 'framer-motion';

interface SectionSkeletonProps {
  title?: boolean;
  cardCount?: number;
  cardHeight?: string;
}

export function SectionSkeleton({ title = true, cardCount = 4, cardHeight = 'h-44' }: SectionSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {title && <div className="w-24 h-3 rounded-md skeleton-shimmer mb-1" />}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className={`flex-shrink-0 w-48 ${cardHeight} rounded-2xl skeleton-shimmer`}
          />
        ))}
      </div>
    </motion.div>
  );
}
