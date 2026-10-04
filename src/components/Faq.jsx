import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuPlus } from 'react-icons/lu';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-b${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={f.q}>
            <h3>
              <button type="button" id={btnId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span>
                <motion.span className="faq-icon" animate={{ rotate: isOpen ? 135 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                  <LuPlus size={22} aria-hidden="true" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
