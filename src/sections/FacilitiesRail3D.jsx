import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import FlipHeading from '../components/FlipHeading';
import Img from '../components/Img';
import Icon from '../components/Icon';
import { facilities } from '../data/content';

function RailCard({ f, i }) {
  return (
    <motion.article
      className="rail-card"
      style={{ '--c': f.color, '--fg': f.fg, rotate: i % 2 ? 1.5 : -1.5 }}
      whileHover={{ y: -14, rotate: 0, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="rail-card-img">
        <Img k={f.img} alt={f.alt} sizes="(max-width: 700px) 78vw, 360px" widths={[400, 700]} />
        <span className="rail-card-icon">
          <Icon name={f.icon} size={26} />
        </span>
      </div>
      <div className="rail-card-text">
        <h3>{f.title}</h3>
        <p>{f.text}</p>
      </div>
    </motion.article>
  );
}

export default function FacilitiesRail3D() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const distRef = useRef(0);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      distRef.current = d;
      setDist(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(track.parentElement);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * distRef.current);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 0, 16]);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const head = (
    <div className="container rail-head">
      <FlipHeading>Spaces built for doing, not just listening</FlipHeading>
      <Link to="/facilities" className="btn">
        See all facilities
      </Link>
    </div>
  );

  if (reduce) {
    return (
      <section className="section rail-section rail-section--static">
        {head}
        <div className="rail-scroll" ref={trackRef}>
          {facilities.map((f, i) => (
            <RailCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="rail-section" style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="rail-sticky">
        {head}
        <div className="rail-viewport">
          <motion.div ref={trackRef} className="rail-track" style={{ x, rotateY }}>
            {facilities.map((f, i) => (
              <RailCard key={f.title} f={f} i={i} />
            ))}
          </motion.div>
        </div>
        <div className="container">
          <div className="rail-progress" aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
