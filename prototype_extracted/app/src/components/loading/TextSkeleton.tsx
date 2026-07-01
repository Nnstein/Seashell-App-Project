import { motion } from 'framer-motion';

interface TextSkeletonProps {
  lines?: number;
  widths?: string[];
  className?: string;
}

export function TextSkeleton({ lines = 3, widths, className }: TextSkeletonProps) {
  const defaultWidths = ['w-3/4', 'w-full', 'w-2/3', 'w-5/6', 'w-1/2'];
  const lineWidths = widths || defaultWidths;

  return (
    <div className={`space-y-2 ${className || ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.06 }}
          className={`h-3.5 rounded-md skeleton-shimmer ${lineWidths[i] || 'w-full'}`}
        />
      ))}
    </div>
  );
}
