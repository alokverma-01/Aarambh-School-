import { Fragment, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuCalendarDays } from 'react-icons/lu';
import { IntroContext } from '../lib/intro';
import { site } from '../data/site';
import { reviews, ratingSummary } from '../data/content';
import { waLink, waMessages } from '../lib/whatsapp';
import { initials } from '../lib/format';
import Img from '../components/Img';
import Doodle from '../components/Doodles';
import Stars from '../components/Stars';

const lines = [
  { text: 'A school where', color: 'var(--vayu)' },
  { text: 'every child', color: 'var(--rani)' },
  { text: 'shines bright.', color: 'var(--prithvi)' },
];

const shots = [
  { k: 'uniformGirl', alt: 'A student in school uniform standing in a bright blue classroom with classmates', caption: 'First day, big smile', cls: 'p0', rot: -4, z: 30 },
  { k: 'vrKids', alt: 'Children trying virtual reality headsets in a STEM class', caption: 'STEM lab', cls: 'p1', rot: 6, z: 100 },
  { k: 'groupPicture', alt: 'A group of school children posing together for a photo', caption: 'Friends for life', cls: 'p2', rot: 5, z: 140 },
  { k: 'girlsDesk', alt: 'Two girls studying together at a classroom desk', caption: 'Study buddies', cls: 'p3', rot: -7, z: 70 },
];

const avatarColors = ['var(--agni)', 'var(--sky)', 'var(--prithvi)', 'var(--rani)'];
const ease = [0.16, 1, 0.3, 1];

const charV = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -95 },
  show: (i) => ({ opacity: 1, y: '0em', rotateX: 0, transition: { delay: 0.12 + i * 0.03, type: 'spring', stiffness: 240, damping: 18 } }),
};
const markerV = {
  hidden: { scaleX: 0 },
  show: (i) => ({ scaleX: 1, transition: { delay: 0.8 + i * 0.2, duration: 0.7, ease: [0.65, 0, 0.35, 1] } }),
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.8, ease } }),
};
const polaroidV = {
  hidden: (s) => ({ opacity: 0, y: 240, rotateX: -70, rotate: s.rot * 4, scale: 0.75 }),
  show: (s) => ({ opacity: 1, y: 0, rotateX: 0, rotate: s.rot, scale: 1, transition: { delay: 0.35 + s.i * 0.15, type: 'spring', stiffness: 110, damping: 15 } }),
};

function Polaroid({ shot, i, progress }) {
  // Each photo floats on its own depth layer and drifts further apart in 3D as you scroll.
  const z = useTransform(progress, [0, 1], [shot.z, shot.z + 160 + i * 80]);
  const y = useTransform(progress, [0, 1], [0, -70 - i * 45]);
  return (
    <motion.div className={`polaroid-wrap ${shot.cls}`} style={{ z, y }}>
      <motion.figure
        className="polaroid"
        variants={polaroidV}
        custom={{ ...shot, i }}
        whileHover={{ scale: 1.06, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 16 } }}
        data-cursor="Smile"
      >
        <span className="tape" aria-hidden="true" />
        <Img k={shot.k} alt={shot.alt} sizes="(max-width: 900px) 46vw, 24vw" widths={[400, 700, 1000]} priority={i < 2} />
        <figcaption>{shot.caption}</figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function Hero() {
  const ready = useContext(IntroContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 110, damping: 18, mass: 0.6 };
  const rxMouse = useSpring(useTransform(my, [-1, 1], [9, -9]), spring);
  const ryMouse = useSpring(useTransform(mx, [-1, 1], [-13, 13]), spring);
  const rxScroll = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rotateX = useTransform([rxMouse, rxScroll], ([a, b]) => a + b);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, -9]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  function onMove(e) {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const { average } = ratingSummary();
  let charIndex = 0;

  return (
    <motion.section ref={ref} className="hero" initial="hidden" animate={ready ? 'show' : 'hidden'} onPointerMove={onMove} onPointerLeave={onLeave}>
      <Doodle kind="star" size={54} color="var(--vayu)" fill className="hd hd-star" />
      <Doodle kind="plane" size={64} color="var(--jal)" className="hd hd-plane" delay={0.6} />
      <Doodle kind="atom" size={58} color="var(--rani)" className="hd hd-atom" delay={1.2} />
      <Doodle kind="pencil" size={50} color="var(--agni)" className="hd hd-pencil" delay={0.3} />
      <Doodle kind="squiggle" size={70} color="var(--prithvi)" className="hd hd-squiggle" delay={0.9} />

      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p className="hero-sticker" variants={fadeUp} custom={0.05}>
            <span className="live-dot" aria-hidden="true" />
            Admissions open for {site.session}
          </motion.p>

          <h1 className="hero-title" aria-label={lines.map((l) => l.text).join(' ')}>
            {lines.map((line, li) => (
              <span className="hero-line" key={line.text} aria-hidden="true">
                <motion.span className="hero-marker" style={{ background: line.color }} variants={markerV} custom={li} />
                <span className="hero-line-text">
                  {line.text.split(' ').map((word, wi) => (
                    <Fragment key={`${word}-${wi}`}>
                      {wi > 0 && ' '}
                      <span className="hero-word">
                        {[...word].map((ch) => {
                          const n = charIndex++;
                          return (
                            <motion.span className="hero-char" key={n} variants={charV} custom={n} style={{ transformPerspective: 500 }}>
                              {ch}
                            </motion.span>
                          );
                        })}
                      </span>
                    </Fragment>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-motto" variants={fadeUp} custom={1.0}>
            <span lang="hi">{site.motto.hi}</span>
            <small>{site.motto.en}</small>
          </motion.p>

          <motion.p className="hero-lead" variants={fadeUp} custom={1.1}>
            A {site.board} school for Nursery to Class 12. Small classes, teachers who know every child by name, and a campus full of colour, music and curiosity.
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp} custom={1.22}>
            <a className="btn btn--wa btn--lg" href={waLink(waMessages.admission)} target="_blank" rel="noopener noreferrer" data-cursor="Chat">
              <FaWhatsapp size={22} aria-hidden="true" />
              Ask on WhatsApp
            </a>
            <a className="btn btn--lg" href={waLink(waMessages.visit)} target="_blank" rel="noopener noreferrer">
              <LuCalendarDays size={20} aria-hidden="true" />
              Book a campus visit
            </a>
          </motion.div>

          <motion.div className="hero-trust" variants={fadeUp} custom={1.36}>
            <div className="avatars" aria-hidden="true">
              {reviews.slice(0, 4).map((r, i) => (
                <span key={r.name} style={{ background: avatarColors[i] }}>
                  {initials(r.name)}
                </span>
              ))}
            </div>
            <p>
              <Stars value={average} size={16} />
              <span>
                <strong>{average.toFixed(1)}</strong> from parents, students and alumni. <Link to="/reviews">Read reviews</Link>
              </span>
            </p>
          </motion.div>
        </motion.div>

        <div className="hero-stage">
          <motion.div className="hero-3d" style={{ rotateX, rotateY: ryMouse, rotateZ, y: stageY }}>
            {shots.map((s, i) => (
              <Polaroid key={s.k} shot={s} i={i} progress={scrollYProgress} />
            ))}
            <motion.div
              className="hero-badge-wrap"
              style={{ z: 230 }}
              variants={{ hidden: { scale: 0, rotate: -140 }, show: { scale: 1, rotate: 0, transition: { delay: 1.15, type: 'spring', stiffness: 150, damping: 11 } } }}
            >
              <motion.svg className="hero-badge" viewBox="0 0 200 200" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
                <defs>
                  <path id="badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                </defs>
                <circle cx="100" cy="100" r="96" />
                <text>
                  <textPath href="#badge-circle" textLength="458" lengthAdjust="spacing">
                    Admissions open {site.session} ✦ Nursery to Class 12 ✦
                  </textPath>
                </text>
              </motion.svg>
              <span className="hero-badge-center" aria-hidden="true">✦</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div className="scroll-cue" variants={fadeUp} custom={1.6} aria-hidden="true">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <Doodle kind="pencil" size={26} color="var(--ink)" float={false} />
        </motion.span>
        Scroll to explore
      </motion.div>
    </motion.section>
  );
}
