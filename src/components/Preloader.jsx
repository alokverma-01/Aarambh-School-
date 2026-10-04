import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Crest from './Crest';
import { site } from '../data/site';

const bars = ['var(--agni)', 'var(--vayu)', 'var(--prithvi)', 'var(--jal)', 'var(--rani)'];
const ease = [0.76, 0, 0.24, 1];

// Plays once per browser session, then hands over to the hero entrance.
export default function Preloader({ onDone }) {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('intro-seen');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) {
      onDone();
      return undefined;
    }
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem('intro-seen', '1');
      } catch {
        /* storage unavailable */
      }
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="preloader" aria-hidden="true" exit={{ opacity: 0, transition: { delay: 0.7, duration: 0.2 } }}>
          {bars.map((c, i) => (
            <motion.span
              key={c}
              className="preloader-bar"
              style={{ background: c }}
              exit={{ scaleY: 0, transition: { duration: 0.6, delay: i * 0.07, ease } }}
            />
          ))}
          <motion.div
            className="preloader-mark"
            initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, transition: { delay: 0.45, type: 'spring', stiffness: 160, damping: 14 } }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
          >
            <Crest size={84} />
            <span>{site.shortName}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
