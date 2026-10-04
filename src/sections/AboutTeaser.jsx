import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import Img from '../components/Img';
import { site } from '../data/site';
import { principal, stats } from '../data/content';

export default function AboutTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 100]);
  const r1 = useTransform(scrollYProgress, [0, 1], [-22, 10]);
  const r2 = useTransform(scrollYProgress, [0, 1], [24, -12]);
  const spin = useTransform(scrollYProgress, [0, 1], [-60, 120]);

  return (
    <section ref={ref} className="section about-teaser">
      <div className="container about-grid">
        <div className="about-photos">
          <motion.figure className="about-photo a1" style={{ y: y1, rotateY: r1, rotate: -3 }}>
            <Img k="classroomFull" alt="Students listening during a lesson in a full classroom" sizes="(max-width: 900px) 70vw, 30vw" widths={[500, 800, 1200]} />
          </motion.figure>
          <motion.figure className="about-photo a2" style={{ y: y2, rotateY: r2, rotate: 4 }}>
            <Img k="chalkboard" alt="A teacher writing on the chalkboard" sizes="(max-width: 900px) 55vw, 22vw" widths={[400, 700, 1000]} />
          </motion.figure>
          <motion.div className="since-sticker" style={{ rotate: spin }} aria-hidden="true">
            <span>since</span>
            <strong>{site.established}</strong>
          </motion.div>
        </div>
        <div className="about-copy">
          <FlipHeading>{`A second home for ${stats[0].value.toLocaleString('en-IN')} children`}</FlipHeading>
          <Reveal as="p" className="lead">
            {site.shortName} began in {site.established} with sixty children in a rented building. Today it is a full campus with labs, playing fields and a library, but the idea has not changed: every child should feel known, safe and excited to come to school.
          </Reveal>
          <Reveal className="note-card" delay={0.1}>
            <p className="hand">“{principal.short}”</p>
            <p className="hand note-sign">
              {principal.name}, {principal.role}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link className="btn btn--ink" to="/about">
              Read our story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
