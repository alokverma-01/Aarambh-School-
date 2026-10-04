import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FaGoogle, FaWhatsapp } from 'react-icons/fa6';
import { LuQuote } from 'react-icons/lu';
import PageHero from '../components/PageHero';
import Stars from '../components/Stars';
import Reveal from '../components/Reveal';
import { useTitle } from '../lib/hooks';
import { site } from '../data/site';
import { reviews, ratingSummary, colorCycle } from '../data/content';
import { initials } from '../lib/format';
import { waLink, waMessages } from '../lib/whatsapp';

const types = ['All', 'Parents', 'Students', 'Alumni'];
const tints = ['#FFF1B0', '#FFD3E6', '#D5E1FF', '#C9F4DD', '#FFDCCB'];

export default function Reviews() {
  useTitle('Reviews');
  const [type, setType] = useState('All');
  const { average, count, dist } = ratingSummary();
  const list = useMemo(() => (type === 'All' ? reviews : reviews.filter((r) => r.type === type)), [type]);

  return (
    <>
      <PageHero
        title="Reviews"
        intro="In their own words: parents, students and alumni on what school life at our campus is really like."
        bg="var(--vayu)"
        fg="var(--ink)"
        image="boysHug"
        imageAlt="Two friends hugging and laughing"
        doodles={['star', 'flower']}
      />

      <section className="section">
        <div className="container reviews-page">
          <aside className="rv-summary">
            <Reveal className="rv-summary-card">
              <strong className="rv-avg">{average.toFixed(1)}</strong>
              <Stars value={average} size={24} />
              <p>Average from {count} reviews</p>
              <ul className="rating-bars">
                {dist.map((d, k) => (
                  <li key={d.star}>
                    <span>{d.star} star</span>
                    <span className="bar">
                      <motion.span
                        style={{ background: colorCycle[k] }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: count ? d.count / count : 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + k * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                    <span>{d.count}</span>
                  </li>
                ))}
              </ul>
              <div className="rv-actions">
                <a className="btn" href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
                  <FaGoogle aria-hidden="true" /> Review us on Google
                </a>
                <a className="btn btn--wa" href={waLink(waMessages.review)} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp aria-hidden="true" /> Send feedback
                </a>
              </div>
            </Reveal>
          </aside>

          <div>
            <LayoutGroup>
              <div className="filter-chips" role="group" aria-label="Filter reviews">
                {types.map((t, i) => (
                  <button key={t} type="button" className={`chip-btn ${type === t ? 'is-active' : ''}`} aria-pressed={type === t} onClick={() => setType(t)}>
                    {type === t && <motion.span layoutId="review-chip" className="chip-pill" style={{ background: colorCycle[(i + 1) % colorCycle.length] }} />}
                    <span>{t}</span>
                  </button>
                ))}
              </div>
              <motion.ul layout className="rv-grid">
                <AnimatePresence mode="popLayout">
                  {list.map((r, i) => (
                    <motion.li
                      layout
                      key={r.name}
                      className="rv-card"
                      style={{ '--tint': tints[i % tints.length], '--c': colorCycle[i % colorCycle.length] }}
                      initial={{ opacity: 0, rotateX: -40, y: 50 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0, transition: { delay: i * 0.05, type: 'spring', stiffness: 150, damping: 18 } }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                      whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
                    >
                      <LuQuote className="rv-quote" aria-hidden="true" />
                      <Stars value={r.rating} size={18} />
                      <blockquote>
                        <p>{r.text}</p>
                      </blockquote>
                      <p className="rv-person">
                        <span className="review-avatar" aria-hidden="true">
                          {initials(r.name)}
                        </span>
                        <span>
                          <strong>{r.name}</strong>
                          <small>{r.role}</small>
                        </span>
                      </p>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </LayoutGroup>
          </div>
        </div>
      </section>
    </>
  );
}
