import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import PageHero from '../components/PageHero';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import Img from '../components/Img';
import AdmissionsCTA from '../sections/AdmissionsCTA';
import { useTitle } from '../lib/hooks';
import { facilities, safety, colorCycle } from '../data/content';
import { waLink, waMessages } from '../lib/whatsapp';

export default function Facilities() {
  useTitle('Facilities');
  return (
    <>
      <PageHero
        title="Facilities"
        intro="Labs to experiment in, fields to run on, rooms to paint and sing in, and buses that get children home safely."
        bg="var(--vayu)"
        fg="var(--ink)"
        image="vrKids"
        imageAlt="Children trying virtual reality headsets in class"
        doodles={['atom', 'note']}
      />

      <section className="section">
        <div className="container fac-grid">
          {facilities.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.1}>
              <TiltCard className="fac-card" style={{ '--c': f.color, '--fg': f.fg }}>
                <div className="fac-img">
                  <Img k={f.img} alt={f.alt} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 560px" widths={[500, 800, 1200]} />
                </div>
                <div className="fac-text">
                  <span className="fac-icon">
                    <Icon name={f.icon} size={26} />
                  </span>
                  <h2>{f.title}</h2>
                  <p>{f.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <FlipHeading className="on-dark">Safety comes first</FlipHeading>
          <ul className="safety-grid">
            {safety.map((s, i) => (
              <motion.li
                key={s.title}
                style={{ '--c': colorCycle[i % colorCycle.length] }}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 120, damping: 14 }}
              >
                <span className="safety-icon">
                  <Icon name={s.icon} size={28} />
                </span>
                {s.title}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container transport">
          <div>
            <FlipHeading>Does the bus come to your area?</FlipHeading>
            <Reveal as="p" className="lead">
              Send us your area or nearest landmark on WhatsApp and we will tell you the route, pick-up time and transport fee.
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a className="btn btn--wa btn--lg" href={waLink(waMessages.transport)} target="_blank" rel="noopener noreferrer" data-cursor="Chat">
              <FaWhatsapp size={22} aria-hidden="true" />
              Check my route
            </a>
          </Reveal>
        </div>
      </section>

      <AdmissionsCTA />
    </>
  );
}
