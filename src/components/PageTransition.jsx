import { motion } from 'framer-motion';

const bars = ['var(--rani)', 'var(--agni)', 'var(--vayu)', 'var(--prithvi)', 'var(--jal)'];
const ease = [0.76, 0, 0.24, 1];

// Coloured blinds drop on exit and lift on enter.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.2 } }}
      >
        {children}
      </motion.div>
      <div className="curtain" aria-hidden="true">
        {bars.map((c, i) => (
          <motion.span
            key={c}
            style={{ background: c }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.55, delay: 0.05 + i * 0.05, ease } }}
            exit={{ scaleY: 1, transition: { duration: 0.4, delay: i * 0.05, ease } }}
          />
        ))}
      </div>
    </>
  );
}
