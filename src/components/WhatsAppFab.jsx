import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuX } from 'react-icons/lu';
import Crest from './Crest';
import { site } from '../data/site';
import { waLink, waTopics } from '../lib/whatsapp';

export default function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('wa-nudge');
    } catch {
      /* ignore */
    }
    if (seen) return undefined;
    const t = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function dismissNudge() {
    setNudge(false);
    try {
      sessionStorage.setItem('wa-nudge', '1');
    } catch {
      /* ignore */
    }
  }

  function toggle() {
    setOpen((o) => !o);
    dismissNudge();
  }

  return (
    <div className="wa-fab">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id="wa-panel"
            className="wa-panel"
            role="dialog"
            aria-label="Chat with us on WhatsApp"
            initial={{ opacity: 0, y: 24, scale: 0.9, rotateX: -25 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="wa-panel-head">
              <Crest size={38} />
              <div>
                <strong>{site.shortName} admissions desk</strong>
                <small>{site.waReplyNote}</small>
              </div>
            </div>
            <p className="wa-hello">Namaste! What would you like to ask?</p>
            <ul className="wa-topics">
              {waTopics.map((t, i) => (
                <motion.li key={t.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.08 + i * 0.05 } }}>
                  <a href={waLink(t.message)} target="_blank" rel="noopener noreferrer">
                    <span className="wa-dot" style={{ background: t.color }} />
                    {t.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        {nudge && !open && (
          <motion.div
            key="nudge"
            className="wa-nudge"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <button type="button" className="wa-nudge-text" onClick={toggle}>
              Questions about admission? Chat with us on WhatsApp.
            </button>
            <button type="button" className="wa-nudge-close" aria-label="Dismiss" onClick={dismissNudge}>
              <LuX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="wa-button"
        aria-label={open ? 'Close WhatsApp options' : 'Chat with us on WhatsApp'}
        aria-expanded={open}
        aria-controls="wa-panel"
        onClick={toggle}
        whileHover={{ scale: 1.08, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="Chat"
      >
        <span className="wa-ring" />
        <span className="wa-ring wa-ring--late" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" className="wa-icon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <LuX size={28} />
            </motion.span>
          ) : (
            <motion.span key="wa" className="wa-icon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FaWhatsapp size={34} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
