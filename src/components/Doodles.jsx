import { motion } from 'framer-motion';

const shapes = {
  star: <path d="M24 4l5.6 12.2L43 18l-9.8 9.2L35.6 41 24 34.4 12.4 41l2.4-13.8L5 18l13.4-1.8Z" />,
  plane: (
    <>
      <path d="M4 22 44 6 34 42 24 28Z" />
      <path d="M24 28 44 6" />
    </>
  ),
  pencil: (
    <>
      <path d="M10 38l4-12L34 6l8 8-20 20Z" />
      <path d="M30 10l8 8" />
      <path d="M14 26l8 8" />
    </>
  ),
  atom: (
    <>
      <ellipse cx="24" cy="24" rx="20" ry="8" />
      <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)" />
      <circle cx="24" cy="24" r="3" />
    </>
  ),
  book: (
    <>
      <path d="M4 10c7-3 14-3 20 2 6-5 13-5 20-2v28c-7-3-14-3-20 2-6-5-13-5-20-2Z" />
      <path d="M24 12v28" />
    </>
  ),
  note: (
    <>
      <path d="M18 36V8l22-4v26" />
      <circle cx="12" cy="36" r="6" />
      <circle cx="34" cy="30" r="6" />
    </>
  ),
  squiggle: <path d="M2 30c6-12 10-12 14 0s8 12 14 0 10-12 16 0" />,
  sun: (
    <>
      <circle cx="24" cy="24" r="8" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" />
    </>
  ),
  flower: (
    <>
      <circle cx="24" cy="24" r="5" />
      <path d="M24 19c-4-9 4-15 0-15s4 6 0 15ZM29 24c9-4 15 4 15 0s-6 4-15 0ZM24 29c4 9-4 15 0 15s-4-6 0-15ZM19 24c-9 4-15-4-15 0s6-4 15 0Z" />
    </>
  ),
};

export default function Doodle({ kind = 'star', size = 48, color = 'var(--vayu)', fill = false, className = '', style, float = true, delay = 0 }) {
  return (
    <motion.svg
      className={`doodle ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      style={{ ...style, color }}
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'var(--ink)' : 'currentColor'}
      strokeWidth={fill ? 2.2 : 3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={float ? { y: [0, -14, 0], rotate: [0, 10, 0] } : undefined}
      transition={float ? { duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay } : undefined}
    >
      {shapes[kind]}
    </motion.svg>
  );
}
