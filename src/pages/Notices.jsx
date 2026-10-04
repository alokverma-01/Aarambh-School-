import { forwardRef, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuChevronDown, LuDownload, LuPin, LuSearch } from 'react-icons/lu';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { useTitle } from '../lib/hooks';
import { sortedNotices, noticeCategories, categoryColor } from '../data/content';
import { daysAgo, monthShort, toDate } from '../lib/format';
import { waLink, waMessages } from '../lib/whatsapp';

const downloads = [
  { label: 'Academic calendar 2026–27', href: '#' },
  { label: 'Holiday list 2026', href: '#' },
  { label: 'Uniform and book list', href: '#' },
];

const NoticeItem = forwardRef(function NoticeItem({ n, open, onToggle }, ref) {
  const d = toDate(n.date);
  const age = daysAgo(n.date);
  const isNew = age >= 0 && age <= 7;
  return (
    <motion.li
      ref={ref}
      layout
      className={`notice ${open ? 'is-open' : ''}`}
      style={{ '--c': categoryColor[n.category] }}
      initial={{ opacity: 0, y: 30, rotateX: -25 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      <h2 className="notice-h">
        <button type="button" className="notice-head" aria-expanded={open} aria-controls={`body-${n.id}`} onClick={onToggle}>
          <span className="notice-date" aria-hidden="true">
            <b>{d.getDate()}</b>
            <small>
              {monthShort(n.date)} {d.getFullYear()}
            </small>
          </span>
          <span className="notice-main">
            <span className="notice-meta">
              <span className="cat-chip">{n.category}</span>
              {n.pinned && (
                <span className="badge badge--pin">
                  <LuPin size={13} aria-hidden="true" /> Pinned
                </span>
              )}
              {isNew && <span className="badge badge--new">New</span>}
              <span className="sr-only">, posted {d.toDateString()}</span>
            </span>
            <span className="notice-title">{n.title}</span>
          </span>
          <motion.span className="notice-toggle" animate={{ rotate: open ? 180 : 0 }}>
            <LuChevronDown size={22} aria-hidden="true" />
          </motion.span>
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`body-${n.id}`}
            className="notice-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{n.body}</p>
            {n.attachment && (
              <a className="text-link" href={n.attachment}>
                <LuDownload aria-hidden="true" /> Download the circular
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
});

export default function Notices() {
  useTitle('Notices');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [openId, setOpenId] = useState(() => sortedNotices()[0]?.id ?? null);
  const cats = ['All', ...noticeCategories];

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return sortedNotices().filter(
      (n) => (cat === 'All' || n.category === cat) && (!term || `${n.title} ${n.body}`.toLowerCase().includes(term)),
    );
  }, [q, cat]);

  return (
    <>
      <PageHero
        title="Notice board"
        intro="Circulars, exam dates, holidays and events from the school office. Newest first, with important notices pinned on top."
        bg="var(--ink)"
        fg="#fff"
        doodles={['note', 'star']}
      />

      <section className="section">
        <div className="container notices-layout">
          <div>
            <LayoutGroup>
              <div className="notices-tools">
                <label className="search">
                  <LuSearch size={20} aria-hidden="true" />
                  <span className="sr-only">Search notices</span>
                  <input type="search" placeholder="Search notices" value={q} onChange={(e) => setQ(e.target.value)} />
                </label>
                <div className="filter-chips" role="group" aria-label="Filter by category">
                  {cats.map((c) => (
                    <button key={c} type="button" className={`chip-btn ${cat === c ? 'is-active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                      {cat === c && <motion.span layoutId="notice-chip" className="chip-pill" style={{ background: categoryColor[c] || 'var(--vayu)' }} />}
                      <span>{c}</span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="results-count" aria-live="polite">
                {list.length === 1 ? '1 notice' : `${list.length} notices`}
              </p>
              <motion.ul layout className="notice-list">
                <AnimatePresence mode="popLayout">
                  {list.map((n) => (
                    <NoticeItem key={n.id} n={n} open={openId === n.id} onToggle={() => setOpenId(openId === n.id ? null : n.id)} />
                  ))}
                </AnimatePresence>
              </motion.ul>
            </LayoutGroup>
            {list.length === 0 && (
              <div className="empty">
                <p>
                  No notices match “{q || cat}”. Clear the search or pick another category.
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setQ('');
                    setCat('All');
                  }}
                >
                  Show all notices
                </button>
              </div>
            )}
          </div>

          <aside className="notices-aside">
            <Reveal className="aside-card aside-card--wa">
              <h2>Get notices on WhatsApp</h2>
              <p>Join the school broadcast list. You will only get official notices, never forwards.</p>
              <a className="btn btn--wa" href={waLink(waMessages.notices)} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={18} aria-hidden="true" />
                Add my number
              </a>
            </Reveal>
            <Reveal className="aside-card" delay={0.1}>
              <h2>Downloads</h2>
              <ul className="download-list">
                {downloads.map((d) => (
                  <li key={d.label}>
                    <a href={d.href}>
                      <LuDownload aria-hidden="true" />
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
