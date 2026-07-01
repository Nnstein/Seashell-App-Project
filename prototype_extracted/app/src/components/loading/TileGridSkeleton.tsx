import { motion } from 'framer-motion';

interface TileGridSkeletonProps {
  columns?: 2 | 3;
  count?: number;
}

export function TileGridSkeleton({ columns = 2, count = 6 }: TileGridSkeletonProps) {
  const tiles = Array.from({ length: count });

  return (
    <div className={`grid gap-3 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {tiles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06 }}
          className="aspect-[3/4] rounded-2xl skeleton-shimmer"
        />
      ))}
    </div>
  );
}
