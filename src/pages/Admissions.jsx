import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuCheck, LuPhone } from 'react-icons/lu';
import PageHero from '../components/PageHero';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import EnquiryForm from '../components/EnquiryForm';
import Faq from '../components/Faq';
import { useTitle } from '../lib/hooks';
import { site } from '../data/site';
import { admissionSteps, ageCriteria, documents, faqs, colorCycle } from '../data/content';
import { waLink, waMessages } from '../lib/whatsapp';

function Steps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <div ref={ref} className="steps">
      <span className="steps-rail" aria-hidden="true">
        <motion.span style={{ "--p": scaleX }} />
      </span>
      <ol>
        {admissionSteps.map((s, i) => (
          <motion.li
            key={s.title}
            style={{ '--c': colorCycle[i % colorCycle.length] }}
            initial={{ opacity: 0, y: 60, rotateX: -50 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 120, damping: 15 }}
          >
            <span className="step-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Admissions() {
  useTitle('Admissions');
  return (
    <>
      <PageHero
        title="Admissions"
        intro={`Admissions for ${site.session} are open from Nursery to Class 9 and for Class 11. Here is everything you need, from age criteria to documents.`}
        bg="var(--agni)"
        fg="var(--ink)"
        image="youngKidsTable"
        imageAlt="Young children working together at a classroom table"
        doodles={['star', 'plane']}
      >
        <motion.div className="page-hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.9 } }}>
          <a className="btn btn--wa btn--lg" href={waLink(waMessages.admission)} target="_blank" rel="noopener noreferrer" data-cursor="Chat">
            <FaWhatsapp size={22} aria-hidden="true" />
            Ask on WhatsApp
          </a>
          <a className="btn btn--lg" href={site.phoneHref}>
            <LuPhone size={20} aria-hidden="true" />
            {site.phone}
          </a>
        </motion.div>
      </PageHero>

      <section className="section">
        <div className="container">
          <FlipHeading>Five simple steps</FlipHeading>
          <Steps />
        </div>
      </section>

      <section className="section section--mist">
        <div className="container req-grid">
          <Reveal className="req-card">
            <h2>Age criteria</h2>
            <p>Minimum age as on 31 March of the admission year.</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Minimum age</th>
                </tr>
              </thead>
              <tbody>
                {ageCriteria.map((a) => (
                  <tr key={a.cls}>
                    <th scope="row">{a.cls}</th>
                    <td>{a.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="small-note">Age limits follow the latest state and CBSE guidelines. Share your child’s date of birth and we will confirm the right class.</p>
          </Reveal>
          <Reveal className="req-card req-card--docs" delay={0.1}>
            <h2>Documents to bring</h2>
            <ul className="doc-list">
              {documents.map((d, i) => (
                <motion.li key={d} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <motion.span
                    className="doc-check"
                    style={{ background: colorCycle[i % colorCycle.length] }}
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 300, damping: 14 }}
                  >
                    <LuCheck aria-hidden="true" />
                  </motion.span>
                  {d}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="container form-grid">
          <div>
            <FlipHeading>Send an admission enquiry</FlipHeading>
            <Reveal as="p" className="lead">
              Fill this in and press send. It opens WhatsApp with your details already typed, so our admissions desk gets everything in one message.
            </Reveal>
            <Reveal className="info-note" delay={0.1}>
              <strong>Prefer to talk?</strong> Call {site.phone}, {site.hours[1].time.toLowerCase()}, Monday to Saturday.
            </Reveal>
          </div>
          <Reveal className="form-card" delay={0.1}>
            <EnquiryForm mode="admission" />
          </Reveal>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container faq-grid">
          <FlipHeading>Questions parents ask</FlipHeading>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
