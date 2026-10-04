import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import Img from '../components/Img';
import { gallery } from '../data/content';
import { useMedia } from '../lib/hooks';

// Photos arranged on a 3D cylinder that turns as the page scrolls.
export default function GalleryRing3D() {
  const ref = useRef(null);
  const small = useMedia('(max-width: 700px)');
  const reduce = useReducedMotion();
  const items = gallery.slice(0, 10);
  const n = items.length;
  const W = small ? 150 : 230;
  const H = Math.round(W * 1.3);
  const R = Math.round(W / 2 / Math.tan(Math.PI / n)) + (small ? 16 : 34);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const spin = useTransform(scrollYProgress, [0, 1], [60, -250]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [18, 6, -8]);

  return (
    <section ref={ref} className="section ring-section">
      <div className="container ring-head">
        <FlipHeading>Snapshots from campus</FlipHeading>
        <Reveal as="p" className="lead">
          Classrooms, labs, playgrounds and the moments in between. Keep scrolling to turn the carousel.
        </Reveal>
      </div>

      {reduce ? (
        <div className="container ring-fallback">
          {items.slice(0, 6).map((it) => (
            <figure key={it.k}>
              <Img k={it.k} alt={it.alt} sizes="(max-width: 700px) 45vw, 30vw" widths={[400, 700]} />
            </figure>
          ))}
        </div>
      ) : (
        <div className="ring-stage" style={{ height: H + (small ? 140 : 220) }}>
          <motion.div className="ring" style={{ width: W, height: H, rotateY: spin, rotateX: tilt }}>
            {items.map((it, i) => (
              <figure key={it.k} className="ring-item" style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(${R}px)` }}>
                <Img k={it.k} alt={it.alt} sizes={`${W}px`} widths={[300, 500]} />
              </figure>
            ))}
          </motion.div>
          <div className="ring-floor" aria-hidden="true" />
        </div>
      )}

      <div className="container ring-cta">
        <Link to="/gallery" className="btn btn--ink" data-cursor="Open">
          Open the full gallery
        </Link>
      </div>
    </section>
  );
}
