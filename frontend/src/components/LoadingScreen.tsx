import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress 0→100 over ~1.8s
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        // Brief pause before handing off
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  // SVG stroke animation for "EU" path
  const STROKE_LENGTH = 320;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* EU initials SVG stroke draw */}
      <svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mb-8"
      >
        {/* E */}
        <motion.path
          d="M10 10 H50 M10 10 V70 M10 70 H50 M10 40 H40"
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={STROKE_LENGTH}
          initial={{ strokeDashoffset: STROKE_LENGTH }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {/* U */}
        <motion.path
          d="M70 10 V55 Q70 70 85 70 Q100 70 100 55 V10"
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={STROKE_LENGTH}
          initial={{ strokeDashoffset: STROKE_LENGTH }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>

      {/* Name */}
      <motion.p
        className="font-display text-sm tracking-[0.4em] text-muted-foreground uppercase mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Enock Uwumukiza
      </motion.p>

      {/* Progress bar */}
      <div className="w-48 h-px bg-border overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs text-muted-foreground/50 mt-3 font-mono tabular-nums">
        {String(progress).padStart(3, '0')}%
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
