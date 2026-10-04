import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LuCheck } from 'react-icons/lu';
import PageHero from '../components/PageHero';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import AdmissionsCTA from '../sections/AdmissionsCTA';
import { useTitle } from '../lib/hooks';
import { site } from '../data/site';
import { timeline, vision, mission, principal, houses, colorCycle } from '../data/content';

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <div ref={ref} className="timeline">
      <span className="timeline-rail" aria-hidden="true">
        <motion.span style={{ scaleY }} />
      </span>
      <ol>
        {timeline.map((t, i) => (
          <motion.li
            key={t.year}
            style={{ '--c': colorCycle[i % colorCycle.length] }}
            initial={{ opacity: 0, x: i % 2 ? 70 : -70, rotateY: i % 2 ? -35 : 35 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: 'spring', stiffness: 110, damping: 16 }}
          >
            <span className="timeline-year">{t.year}</span>
            <p>{t.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function HouseCard({ house, i }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="house"
      initial={{ opacity: 0, y: 60, rotateZ: i % 2 ? 6 : -6 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 14 }}
    >
      <motion.button
        type="button"
        className="house-inner"
        style={{ '--c': house.color, '--fg': house.fg }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 15 }}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
        onClick={() => setFlipped((f) => !f)}
        data-cursor="Flip"
      >
        <span className="house-face house-front">
          <Icon name={house.icon} size={44} />
          <strong>{house.name}</strong>
          <small>{house.element}</small>
        </span>
        <span className="house-face house-back">
          <strong>{house.value}</strong>
          <span>{house.text}</span>
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function About() {
  useTitle('About us');
  return (
    <>
      <PageHero
        title="Our story"
        intro={`Since ${site.established}, ${site.name} has grown from one rented building into a full campus, without losing the warmth of a small school.`}
        bg="var(--jal)"
        fg="#fff"
        image="chalkboard"
        imageAlt="A teacher writing on the chalkboard"
        doodles={['sun', 'book']}
      />

      <section className="section">
        <div className="container story-grid">
          <div>
            <FlipHeading>How it started</FlipHeading>
            <Reveal as="p" className="lead">
              A group of teachers and parents wanted a school where children would not be numbers on a register. They started with sixty students, six teachers and a borrowed blackboard.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              {site.shortName} means “a beginning”. We still think of every school year that way: a fresh start for each child, with teachers who notice what each one needs next.
            </Reveal>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="section section--mist">
        <div className="container vm-grid">
          <TiltCard className="vm-card vm-card--vision">
            <h2>Our vision</h2>
            <p className="vm-big">{vision}</p>
          </TiltCard>
          <TiltCard className="vm-card vm-card--mission">
            <h2>Our mission</h2>
            <ul>
              {mission.map((m) => (
                <li key={m}>
                  <LuCheck aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </section>

      <section className="section">
        <div className="container letter-grid">
          <div>
            <FlipHeading>A note from the principal</FlipHeading>
            <Reveal as="p" className="lead">
              {principal.bio}
            </Reveal>
          </div>
          <motion.article
            className="letter"
            initial={{ opacity: 0, rotateX: 40, y: 80 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
            style={{ transformPerspective: 1100 }}
          >
            {principal.letter.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <p className="letter-sign">
              {principal.name}
              <small>{principal.role}</small>
            </p>
          </motion.article>
        </div>
      </section>

      <section className="section section--ink houses-section">
        <div className="container">
          <FlipHeading className="on-dark">Four houses, one school</FlipHeading>
          <Reveal as="p" className="lead on-dark">
            Every student belongs to a house named after an element. Houses compete in sports, quizzes and the annual cultural fest. Hover or tap a card to see what each house stands for.
          </Reveal>
          <div className="houses-grid">
            {houses.map((h, i) => (
              <HouseCard key={h.name} house={h} i={i} />
            ))}
          </div>
        </div>
      </section>

      <AdmissionsCTA />
    </>
  );
}
