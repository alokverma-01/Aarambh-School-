import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';
import Img from './Img';

export default function Lightbox({ items, index, onClose, onNav }) {
  const item = index == null ? null : items[index];
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (index == null) return undefined;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index == null]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button ref={closeRef} type="button" className="lb-btn lb-close" onClick={onClose} aria-label="Close photo viewer">
            <LuX size={26} />
          </button>
          <button type="button" className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Previous photo">
            <LuChevronLeft size={30} />
          </button>
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.k}
              className="lb-figure"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, rotateY: 30, scale: 0.88 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -30, scale: 0.88 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Img k={item.k} alt={item.alt} sizes="90vw" widths={[800, 1200, 1600, 2000]} priority />
              <figcaption>
                <span>{item.alt}</span>
                <span className="lb-count">
                  {index + 1} of {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <button type="button" className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Next photo">
            <LuChevronRight size={30} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
