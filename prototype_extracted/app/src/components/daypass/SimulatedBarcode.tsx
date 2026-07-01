import { memo, useMemo } from 'react';

function SimulatedBarcode({ value, height = 64 }: { value: string; height?: number }) {
  const lines = useMemo(() => {
    // Deterministic pseudo-random based on the pass ID
    const seed = value.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const pseudoRandom = (i: number) => {
      const x = Math.sin(seed + i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 72 }, (_, i) => {
      const r = pseudoRandom(i);
      return r > 0.35 ? Math.round(r * 3.5 + 0.8) : Math.round(r * 1.8 + 0.4);
    });
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex items-end justify-center gap-[2px] w-full px-4" style={{ height }}>
        {/* Left guard pattern */}
        <div className="flex gap-[2px]">
          <div className="w-[3px] h-full bg-black rounded-sm dark:bg-white" />
          <div className="w-[1px] h-full bg-transparent" />
          <div className="w-[3px] h-full bg-black rounded-sm dark:bg-white" />
        </div>
        <div className="w-[6px]" />
        {/* Data lines */}
        {lines.map((w, i) => (
          <div
            key={i}
            className="bg-black dark:bg-white rounded-[1px]"
            style={{ width: `${w}px`, height: `${60 + (i % 4) * 10}%` }}
          />
        ))}
        <div className="w-[6px]" />
        {/* Right guard pattern */}
        <div className="flex gap-[2px]">
          <div className="w-[3px] h-full bg-black rounded-sm dark:bg-white" />
          <div className="w-[1px] h-full bg-transparent" />
          <div className="w-[3px] h-full bg-black rounded-sm dark:bg-white" />
        </div>
      </div>
      {/* Pass ID text */}
      <p className="text-[10px] font-mono tracking-[0.2em] font-bold text-black/60 dark:text-white/60">
        {value}
      </p>
    </div>
  );
}

export default memo(SimulatedBarcode);
