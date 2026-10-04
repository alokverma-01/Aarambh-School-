import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCheck } from 'react-icons/lu';
import PageHero from '../components/PageHero';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import Img from '../components/Img';
import AdmissionsCTA from '../sections/AdmissionsCTA';
import { useTitle } from '../lib/hooks';
import { site } from '../data/site';
import { pillars, stages, streams, coCurricular, timings } from '../data/content';

const chipColors = ['var(--agni)', 'var(--vayu)', 'var(--prithvi)', 'var(--sky)', 'var(--rani)', '#fff'];

function StageTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const s = stages[active];

  function onKey(e) {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + stages.length) % stages.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="School stages" onKeyDown={onKey}>
        {stages.map((st, i) => (
          <button
            key={st.id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`tab-${st.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${st.id}`}
            tabIndex={i === active ? 0 : -1}
            className={`tab ${i === active ? 'is-active' : ''}`}
            style={{ '--fg': st.fg }}
            onClick={() => setActive(i)}
          >
            {i === active && <motion.span layoutId="tab-pill" className="tab-pill" style={{ background: st.color }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <span className="tab-label">{st.title}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          id={`panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${s.id}`}
          className="tab-panel"
          style={{ '--c': s.color, '--fg': s.fg }}
          initial={{ opacity: 0, rotateX: -25, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 20, y: -30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tab-panel-img">
            <Img k={s.img} alt={s.alt} sizes="(max-width: 900px) 90vw, 40vw" widths={[500, 800, 1200]} />
          </div>
          <div className="tab-panel-text">
            <p className="tab-meta">
              {s.classes}, {s.ages.toLowerCase()}
            </p>
            <h3>{s.title}</h3>
            <ul className="check-list">
              {s.points.map((p) => (
                <li key={p}>
                  <LuCheck aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <h4>Subjects</h4>
            <ul className="subject-chips">
              {s.subjects.map((sub) => (
                <li key={sub}>{sub}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Academics() {
  useTitle('Academics');
  return (
    <>
      <PageHero
        title="Academics"
        intro={`We follow the ${site.board} curriculum and NEP 2020, with more time for experiments, projects and reading than the syllabus alone asks for.`}
        bg="var(--prithvi)"
        fg="var(--ink)"
        image="stemPolka"
        imageAlt="A student concentrating on a STEM activity"
        doodles={['atom', 'pencil']}
      />

      <section className="section">
        <div className="container">
          <FlipHeading>How we teach</FlipHeading>
          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <TiltCard className="pillar" style={{ '--c': p.color }}>
                  <span className="pillar-icon">
                    <Icon name={p.icon} size={30} />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <FlipHeading>Stage by stage</FlipHeading>
          <Reveal as="p" className="lead">
            Choose a stage to see what children learn and how the day is shaped.
          </Reveal>
          <StageTabs />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FlipHeading>Streams in Classes 11 and 12</FlipHeading>
          <div className="streams">
            {streams.map((st, i) => (
              <motion.article
                key={st.name}
                className="stream"
                style={{ '--c': st.color, '--fg': st.fg }}
                initial={{ opacity: 0, rotateY: 80, x: 40 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 110, damping: 15 }}
              >
                <h3>{st.name}</h3>
                <ul>
                  {st.subjects.map((sub) => (
                    <li key={sub}>{sub}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container cocurr">
          <div>
            <FlipHeading className="on-dark">Beyond the classroom</FlipHeading>
            <Reveal as="p" className="lead on-dark">
              Every child picks at least one club, one sport and one art each year. Saturdays are activity days for Classes 1 to 8.
            </Reveal>
          </div>
          <ul className="chip-cloud">
            {coCurricular.map((c, i) => (
              <motion.li
                key={c}
                style={{ '--c': chipColors[i % chipColors.length] }}
                initial={{ opacity: 0, scale: 0.3, rotate: i % 2 ? 25 : -25 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 14 }}
                whileHover={{ scale: 1.12, rotate: 0 }}
              >
                {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container timing-grid">
          <div>
            <FlipHeading>School timings</FlipHeading>
            <Reveal as="p" className="lead">
              Timings shift by about 30 minutes in winter. The exact dates are announced on the notice board.
            </Reveal>
          </div>
          <Reveal className="table-card">
            <table>
              <caption className="sr-only">School timings</caption>
              <tbody>
                {timings.map((t) => (
                  <tr key={t.label}>
                    <th scope="row">{t.label}</th>
                    <td>{t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <AdmissionsCTA />
    </>
  );
}
