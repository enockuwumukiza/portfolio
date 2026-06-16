import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click' | 'text';

const SPRING_CONFIG = { damping: 28, stiffness: 400, mass: 0.5 };
const RING_SPRING = { damping: 30, stiffness: 200, mass: 0.8 };

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState('');
  const isTouch = useRef(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(0, RING_SPRING);
  const ringY = useSpring(0, RING_SPRING);
  const springDotX = useSpring(dotX, SPRING_CONFIG);
  const springDotY = useSpring(dotY, SPRING_CONFIG);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true;
      return;
    }
    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const onMouseDown = () => setState('click');
    const onMouseUp = () => setState('default');

    const handleTargets = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, button, [role="button"], [data-cursor]');
      if (link) {
        setState('hover');
        setLabel(link.getAttribute('data-cursor-label') ?? '');
      } else if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setState('text');
        setLabel('');
      } else {
        setState('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousemove', handleTargets);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', handleTargets);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (isTouch.current) return null;

  const dotSize = state === 'click' ? 4 : state === 'text' ? 2 : 6;
  const ringSize = state === 'hover' ? 56 : state === 'click' ? 28 : state === 'text' ? 4 : 36;
  const ringOpacity = state === 'text' ? 0 : 1;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[99999] rounded-full"
        style={{
          x: springDotX,
          y: springDotY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          backgroundColor: 'hsl(var(--primary))',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[99998] rounded-full border flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'hsl(var(--primary))',
          opacity: isVisible ? ringOpacity : 0,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && state === 'hover' && (
          <span className="text-[9px] font-semibold text-primary tracking-wide whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
