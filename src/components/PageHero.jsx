import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import FlipHeading from './FlipHeading';
import Img from './Img';
import Doodle from './Doodles';
import Bunting from './Bunting';

// Coloured banner used at the top of every inner page.
export default function PageHero({ title, intro, bg = 'var(--jal)', fg = '#fff', image, imageAlt = '', doodles = ['star', 'pencil'], children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 28]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [4, 18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="page-hero" style={{ '--hero-bg': bg, '--hero-fg': fg }}>
      <Doodle kind={doodles[0]} size={60} color="#fff" fill className="ph-doodle ph-doodle--a" />
      <Doodle kind={doodles[1]} size={52} color="var(--ink)" className="ph-doodle ph-doodle--b" delay={1} />
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <motion.nav aria-label="Breadcrumb" className="crumbs" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.45 } }}>
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </motion.nav>
          <FlipHeading as="h1" className="page-hero-title" delay={0.4}>
            {title}
          </FlipHeading>
          {intro && (
            <motion.p className="page-hero-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.6 } }}>
              {intro}
            </motion.p>
          )}
          {children}
        </div>
        {image && (
          <div className="page-hero-stage">
            <motion.figure
              className="page-hero-photo"
              style={{ rotateY, rotateX, y }}
              initial={{ opacity: 0, scale: 0.8, rotateZ: 14 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 3, transition: { delay: 0.5, type: 'spring', stiffness: 110, damping: 15 } }}
            >
              <span className="tape" aria-hidden="true" />
              <Img k={image} alt={imageAlt} sizes="(max-width: 900px) 80vw, 36vw" widths={[500, 800, 1200]} priority />
            </motion.figure>
          </div>
        )}
      </div>
      <Bunting count={18} className="page-hero-bunting" />
    </section>
  );
}
