import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { LuMenu, LuX, LuPhone } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa6';
import Crest from './Crest';
import { site } from '../data/site';
import { navLinks, colorCycle } from '../data/content';
import { waLink, waMessages } from '../lib/whatsapp';

const pill = ['var(--vayu)', 'var(--prithvi)', 'var(--rani)', 'var(--agni)', 'var(--sky)'];

function MobileMenu({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  return (
    <motion.div
      id="mobile-menu"
      className="mmenu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ clipPath: 'circle(0% at 92% 5%)' }}
      animate={{ clipPath: 'circle(150% at 92% 5%)' }}
      exit={{ clipPath: 'circle(0% at 92% 5%)' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="mmenu-top container">
        <Link to="/" className="brand brand--light" onClick={onClose}>
          <Crest size={40} />
          <span className="brand-text">
            <strong>{site.shortName}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>
        <button ref={closeRef} type="button" className="icon-btn icon-btn--light" aria-label="Close menu" onClick={onClose}>
          <LuX size={26} />
        </button>
      </div>
      <ul className="mmenu-links container">
        {navLinks.map((l, i) => (
          <motion.li
            key={l.to}
            style={{ '--c': colorCycle[i % colorCycle.length] }}
            initial={{ opacity: 0, rotateX: -90, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, transition: { delay: 0.18 + i * 0.05, type: 'spring', stiffness: 220, damping: 20 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <NavLink to={l.to} end={l.to === '/'} onClick={onClose}>
              {l.label}
            </NavLink>
          </motion.li>
        ))}
      </ul>
      <motion.div className="mmenu-actions container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}>
        <a className="btn btn--wa" href={waLink(waMessages.admission)} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={20} aria-hidden="true" />
          Ask on WhatsApp
        </a>
        <a className="btn" href={site.phoneHref}>
          <LuPhone size={18} aria-hidden="true" />
          Call {site.phone}
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const active = navLinks.findIndex((l) => (l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)));
  const pillAt = hovered ?? active;

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label={`${site.name}, home`}>
          <motion.span className="brand-crest" whileHover={{ rotateY: 180 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
            <Crest size={46} />
          </motion.span>
          <span className="brand-text">
            <strong>{site.shortName}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <nav aria-label="Main" className="nav-links" onMouseLeave={() => setHovered(null)}>
          <ul>
            {navLinks.map((l, i) => (
              <li key={l.to} onMouseEnter={() => setHovered(i)}>
                <NavLink to={l.to} end={l.to === '/'} className="nav-link">
                  {pillAt === i && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      style={{ background: pill[i % pill.length] }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="nav-label">{l.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a className="btn btn--wa btn--sm nav-enquire" href={waLink(waMessages.admission)} target="_blank" rel="noopener noreferrer" data-cursor="Chat">
            <FaWhatsapp size={18} aria-hidden="true" />
            <span>Enquire</span>
          </a>
          <button type="button" className="icon-btn nav-burger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <LuMenu size={26} />
          </button>
        </div>
      </div>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}
