import { motion } from 'framer-motion';

interface ButtonSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function ButtonSpinner({ size = 'md', color = 'white', className }: ButtonSpinnerProps) {
  const sizeMap = {
    sm: { spinner: 14, border: 2 },
    md: { spinner: 18, border: 2.5 },
    lg: { spinner: 22, border: 3 },
  };
  const s = sizeMap[size];

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      className={className}
    >
      <svg
        width={s.spinner}
        height={s.spinner}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'}
          strokeWidth={s.border}
        />
        <path
          d="M12 2C6.477 2 2 6.477 2 12"
          stroke={color === 'white' ? '#fff' : 'var(--brand-cyan)'}
          strokeWidth={s.border}
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

/* ======================================
   Animated Button Wrapper
   Wraps any button with loading state
   ====================================== */
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  spinnerColor?: 'white' | 'brand';
  children: React.ReactNode;
}

export function LoadingButton({
  loading = false,
  loadingText,
  spinnerColor = 'white',
  children,
  className = '',
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={`relative flex items-center justify-center gap-2 transition-all duration-200 ${className}`}
      disabled={disabled || loading}
      style={{ opacity: loading ? 0.8 : 1 }}
      {...props}
    >
      {loading && (
        <ButtonSpinner
          size="sm"
          color={spinnerColor}
        />
      )}
      <span className={loading ? 'opacity-90' : ''}>
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  );
}
