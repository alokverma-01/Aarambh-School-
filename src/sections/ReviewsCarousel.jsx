import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LuChevronLeft, LuChevronRight, LuQuote } from 'react-icons/lu';
import FlipHeading from '../components/FlipHeading';
import Stars from '../components/Stars';
import { reviews, ratingSummary, colorCycle } from '../data/content';
import { initials } from '../lib/format';

const cardColors = ['var(--vayu)', 'var(--rani)', 'var(--prithvi)', 'var(--agni)'];

export default function ReviewsCarousel() {
  const [[i, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const { average, count, dist } = ratingSummary();
  const r = reviews[i];

  const go = (d) => setState(([cur]) => [(cur + d + reviews.length) % reviews.length, d]);

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => go(1), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section className="section reviews-section">
      <div className="container reviews-grid">
        <div className="reviews-summary">
          <FlipHeading>What families say</FlipHeading>
          <div className="rating-big">
            <strong>{average.toFixed(1)}</strong>
            <div>
              <Stars value={average} size={22} />
              <span>
                from {count} reviews on this site
              </span>
            </div>
          </div>
          <ul className="rating-bars" aria-label="Rating breakdown">
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
          <Link to="/reviews" className="btn btn--ink">
            Read all reviews
          </Link>
        </div>

        <div
          className="review-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Reviews"
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              className="review-card"
              style={{ '--c': cardColors[i % cardColors.length] }}
              custom={dir}
              variants={{
                enter: (d) => ({ rotateY: d * 75, opacity: 0, x: d * 80, scale: 0.9 }),
                center: { rotateY: 0, opacity: 1, x: 0, scale: 1 },
                exit: (d) => ({ rotateY: -d * 75, opacity: 0, x: -d * 80, scale: 0.9 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <LuQuote className="review-quote" aria-hidden="true" />
              <Stars value={r.rating} size={20} />
              <blockquote>
                <p>{r.text}</p>
              </blockquote>
              <figcaption>
                <span className="review-avatar" aria-hidden="true">
                  {initials(r.name)}
                </span>
                <span>
                  <strong>{r.name}</strong>
                  <small>{r.role}</small>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="review-controls">
            <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous review">
              <LuChevronLeft size={24} />
            </button>
            <div className="review-dots">
              {reviews.map((rv, k) => (
                <button
                  key={rv.name}
                  type="button"
                  className={k === i ? 'is-active' : ''}
                  style={{ '--c': colorCycle[k % colorCycle.length] }}
                  aria-label={`Show review ${k + 1} of ${reviews.length}`}
                  aria-current={k === i ? 'true' : undefined}
                  onClick={() => setState([k, k > i ? 1 : -1])}
                />
              ))}
            </div>
            <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next review">
              <LuChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
