/* ── Shimmer style ── */
const shimmerBase = 'relative overflow-hidden bg-[#1a1f2e] rounded-xl';
const shimmerAfter = 'after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent';

/* ═══════════ KPI Card Skeleton ═══════════ */
export function KpiSkeleton() {
  return (
    <div className={`${shimmerBase} ${shimmerAfter} p-4 h-28`}>
      <div className="w-9 h-9 rounded-xl bg-white/5 mb-3" />
      <div className="h-7 w-16 bg-white/5 rounded mb-1" />
      <div className="h-3 w-24 bg-white/5 rounded" />
    </div>
  );
}

export function KpiSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <KpiSkeleton key={i} />
      ))}
    </div>
  );
}

/* ═══════════ Table Row Skeleton ═══════════ */
export function TableRowSkeleton({ columns = 6 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className={`${shimmerBase} ${shimmerAfter} h-3 flex-1`} style={{ maxWidth: i === 0 ? '200px' : i === columns - 1 ? '60px' : '120px' }} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: '1px solid #21262d' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className={`${shimmerBase} ${shimmerAfter} h-3 flex-1`} style={{ maxWidth: i === 0 ? '200px' : i === columns - 1 ? '60px' : '120px' }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ borderBottom: '1px solid #1a1f27' }}>
          <TableRowSkeleton columns={columns} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════ Card Grid Skeleton ═══════════ */
export function CardSkeleton() {
  return (
    <div className={`${shimmerBase} ${shimmerAfter} p-4 h-40`}>
      <div className="flex items-start justify-between mb-3">
        <div className="h-5 w-24 bg-white/5 rounded" />
        <div className="h-5 w-16 bg-white/5 rounded" />
      </div>
      <div className="h-3 w-full bg-white/5 rounded mb-2" />
      <div className="h-3 w-3/4 bg-white/5 rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-8 flex-1 bg-white/5 rounded-xl" />
        <div className="h-8 flex-1 bg-white/5 rounded-xl" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ═══════════ Chart Skeleton ═══════════ */
export function ChartSkeleton() {
  return (
    <div className={`${shimmerBase} ${shimmerAfter} p-5 h-52`}>
      <div className="h-4 w-32 bg-white/5 rounded mb-6" />
      <div className="flex items-end gap-2 h-28">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-t-lg" style={{ height: `${20 + Math.random() * 60}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Room Card Skeleton ═══════════ */
export function RoomCardSkeleton() {
  return (
    <div className={`${shimmerBase} ${shimmerAfter} p-4 h-44`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="h-6 w-14 bg-white/5 rounded mb-1" />
          <div className="h-3 w-28 bg-white/5 rounded" />
        </div>
        <div className="h-5 w-20 bg-white/5 rounded-full" />
      </div>
      <div className="h-3 w-32 bg-white/5 rounded mb-3" />
      <div className="p-2 rounded-lg bg-white/[0.02] mb-3">
        <div className="h-3 w-36 bg-white/5 rounded mb-1" />
        <div className="h-2.5 w-24 bg-white/5 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 bg-white/5 rounded" />
        <div className="flex gap-1">
          <div className="w-7 h-7 bg-white/5 rounded-lg" />
          <div className="w-7 h-7 bg-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function RoomGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <RoomCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ═══════════ Full Page Skeleton ═══════════ */
export function AdminPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`${shimmerBase} ${shimmerAfter} h-8 w-48`} />
      <KpiSkeletonGrid count={4} />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><ChartSkeleton /></div>
        <div className={`${shimmerBase} ${shimmerAfter} p-5 h-52`}>
          <div className="h-4 w-24 bg-white/5 rounded mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/5" />
              <div className="flex-1">
                <div className="h-3 w-24 bg-white/5 rounded mb-1" />
                <div className="h-2.5 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className={`${shimmerBase} ${shimmerAfter} p-5 h-64`}>
          <div className="h-4 w-28 bg-white/5 rounded mb-4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 mb-3">
              <div className="w-16 h-3 bg-white/5 rounded flex-shrink-0" />
              <div className="w-2 h-2 rounded-full bg-white/5 mt-0.5" />
              <div className="h-3 flex-1 bg-white/5 rounded" />
            </div>
          ))}
        </div>
        <div className={`${shimmerBase} ${shimmerAfter} p-5 h-64`}>
          <div className="h-4 w-36 bg-white/5 rounded mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between mb-1">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-3 w-12 bg-white/5 rounded" />
              </div>
              <div className="h-2 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ Content CMS Skeleton ═══════════ */
export function ContentSkeleton() {
  return (
    <div className="space-y-4">
      <div className={`${shimmerBase} ${shimmerAfter} h-24`} /> {/* Upload zone */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${shimmerBase} ${shimmerAfter} h-7 w-20 rounded-full`} />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${shimmerBase} ${shimmerAfter} h-48`}>
            <div className="h-36 bg-white/[0.03]" />
            <div className="p-3">
              <div className="h-3 w-32 bg-white/5 rounded mb-1" />
              <div className="flex justify-between">
                <div className="h-2.5 w-12 bg-white/5 rounded" />
                <div className="h-2.5 w-16 bg-white/5 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
