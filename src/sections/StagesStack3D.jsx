import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { LuCheck } from 'react-icons/lu';
import FlipHeading from '../components/FlipHeading';
import Img from '../components/Img';
import { stages } from '../data/content';

const HOLD_END = 0.86; // last part of the scroll keeps the final card on screen

function CardBody({ stage }) {
  return (
    <div className="stack-card" style={{ '--c': stage.color, '--fg': stage.fg }}>
      <header className="stack-card-head">
        <span>{stage.classes}</span>
        <span>{stage.ages}</span>
      </header>
      <div className="stack-card-body">
        <div className="stack-card-img">
          <Img k={stage.img} alt={stage.alt} sizes="(max-width: 900px) 80vw, 26vw" widths={[400, 700, 1000]} />
        </div>
        <div className="stack-card-text">
          <h3>{stage.title}</h3>
          <ul>
            {stage.points.map((p) => (
              <li key={p}>
                <LuCheck aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StackCard({ stage, i, n, seg, progress }) {
  const enter = i === 0 ? [0, 1] : [(i - 1) * seg, i * seg];
  const y = useTransform(progress, enter, i === 0 ? ['0%', '0%'] : ['118%', '0%']);
  const rotateX = useTransform(progress, enter, i === 0 ? [0, 0] : [62, 0]);

  // Once a newer card lands on top, this one sinks back into the deck.
  const push = [i * seg];
  for (let k = i + 1; k < n; k++) push.push(k * seg);
  const has = push.length > 1;
  const range = has ? push : [0, 1];
  const scale = useTransform(progress, range, range.map((_, k) => (has ? 1 - k * 0.06 : 1)));
  const lift = useTransform(progress, range, range.map((_, k) => (has ? -k * 28 : 0)));
  const filter = useTransform(progress, range, range.map((_, k) => `brightness(${has ? 1 - k * 0.12 : 1})`));

  return (
    <motion.article className="stack-card-wrap" style={{ y, rotateX, zIndex: i + 1 }} aria-label={stage.title}>
      <motion.div className="stack-card-inner" style={{ scale, y: lift, filter }}>
        <CardBody stage={stage} />
      </motion.div>
    </motion.article>
  );
}

function Intro({ active }) {
  return (
    <div className="stack-intro">
      <FlipHeading id="stages-title">From first crayon to board exams</FlipHeading>
      <p className="lead">Four stages, one campus. Children move up with friends they have known since nursery and teachers who pass on what they have learned about each child.</p>
      <ol className="stack-steps">
        {stages.map((s, i) => (
          <li key={s.id} className={i === active ? 'is-active' : ''} style={{ '--c': s.color }}>
            <span className="stack-step-dot" aria-hidden="true" />
            <span>
              {s.title}
              <small>{s.classes}</small>
            </span>
          </li>
        ))}
      </ol>
      <Link to="/academics" className="btn btn--ink">
        Explore academics
      </Link>
    </div>
  );
}

function StagesSticky() {
  const ref = useRef(null);
  const n = stages.length;
  const seg = HOLD_END / (n - 1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.max(0, Math.min(n - 1, Math.floor(v / seg + 0.5)))));

  return (
    <section ref={ref} className="stack-section" style={{ height: `${n * 90 + 40}vh` }} aria-labelledby="stages-title">
      <div className="stack-sticky">
        <div className="container stack-grid">
          <Intro active={active} />
          <div className="stack-deck">
            {stages.map((s, i) => (
              <StackCard key={s.id} stage={s} i={i} n={n} seg={seg} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StagesSimple() {
  return (
    <section className="section" aria-labelledby="stages-title">
      <div className="container stack-simple">
        <Intro active={-1} />
        <div className="stack-simple-grid">
          {stages.map((s) => (
            <CardBody key={s.id} stage={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StagesStack3D() {
  const reduce = useReducedMotion();
  return reduce ? <StagesSimple /> : <StagesSticky />;
}
