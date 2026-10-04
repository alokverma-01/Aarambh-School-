import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const trail = ['var(--rani)', 'var(--agni)', 'var(--vayu)', 'var(--prithvi)', 'var(--jal)'];

function TrailDot({ x, y, color, i }) {
  const cfg = { stiffness: 260 - i * 38, damping: 22 + i * 2, mass: 0.5 + i * 0.12 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);
  return <motion.span className="cursor-trail" style={{ x: sx, y: sy, background: color, scale: 1 - i * 0.13 }} />;
}

// Dot + ring cursor with a colourful comet trail. Mouse-only; touch and
// reduced-motion users keep the normal cursor.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState(null);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.45 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;
    setEnabled(true);
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (el.closest('input, textarea, select, iframe')) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const hit = el.closest('a, button, [data-cursor], summary, label');
      setLabel(hit ? hit.getAttribute('data-cursor') || '' : null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    root.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      root.removeEventListener('mouseleave', leave);
      root.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  const hovering = label !== null;
  const size = hovering ? (label ? 86 : 58) : 36;

  return (
    <div className="cursor-layer" aria-hidden="true" style={{ opacity: visible ? 1 : 0 }}>
      {trail.map((c, i) => (
        <TrailDot key={c} x={x} y={y} color={c} i={i} />
      ))}
      <motion.div
        className={`cursor-ring ${hovering ? 'is-hover' : ''} ${label ? 'has-label' : ''}`}
        style={{ x: rx, y: ry }}
        animate={{ width: size, height: size, scale: pressed ? 0.82 : 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span key={label} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: hovering ? 0 : 1 }} />
    </div>
  );
}
