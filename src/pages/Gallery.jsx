import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import Img from '../components/Img';
import Lightbox from '../components/Lightbox';
import { useTitle } from '../lib/hooks';
import { gallery, galleryCategories, colorCycle } from '../data/content';

export default function Gallery() {
  useTitle('Gallery');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const items = useMemo(() => (cat === 'All' ? gallery : gallery.filter((g) => g.cat === cat)), [cat]);

  return (
    <>
      <PageHero
        title="Gallery"
        intro="Everyday moments from classrooms, labs and the playground. Tap any photo to open it larger."
        bg="var(--rani)"
        fg="var(--ink)"
        image="groupPicture"
        imageAlt="A group of school children posing together"
        doodles={['flower', 'star']}
      />

      <section className="section">
        <div className="container">
          <LayoutGroup>
            <div className="filter-chips" role="group" aria-label="Filter photos">
              {galleryCategories.map((c, i) => (
                <button key={c} type="button" className={`chip-btn ${cat === c ? 'is-active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                  {cat === c && <motion.span layoutId="gallery-chip" className="chip-pill" style={{ background: colorCycle[i % colorCycle.length] }} />}
                  <span>{c}</span>
                </button>
              ))}
            </div>
            <p className="results-count" aria-live="polite">
              {items.length} photos
            </p>
            <motion.ul layout className="masonry">
              <AnimatePresence mode="popLayout">
                {items.map((g, i) => (
                  <motion.li
                    layout
                    key={g.k}
                    className={`m-item m-item--${g.shape}`}
                    initial={{ opacity: 0, scale: 0.6, rotateY: 40 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, transition: { delay: Math.min(i, 10) * 0.04, type: 'spring', stiffness: 160, damping: 18 } }}
                    exit={{ opacity: 0, scale: 0.6, rotateY: -40, transition: { duration: 0.2 } }}
                  >
                    <motion.button
                      type="button"
                      className="m-btn"
                      onClick={() => setOpen(i)}
                      whileHover={{ rotateX: 6, rotateY: -8, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      style={{ transformPerspective: 800 }}
                      data-cursor="View"
                    >
                      <Img k={g.k} alt={g.alt} sizes="(max-width: 700px) 50vw, 25vw" widths={[400, 700, 1000]} />
                      <span className="m-cat">{g.cat}</span>
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </div>
      </section>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNav={(d) => setOpen((o) => (o + d + items.length) % items.length)} />
    </>
  );
}
