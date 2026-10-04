import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuPhone } from 'react-icons/lu';
import Reveal from '../components/Reveal';
import Bunting from '../components/Bunting';
import Doodle from '../components/Doodles';
import { site } from '../data/site';
import { waLink, waMessages } from '../lib/whatsapp';

const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function AdmissionsCTA() {
  return (
    <section className="cta-band">
      <Bunting count={20} className="cta-bunting" />
      <div className="cta-marquee" aria-hidden="true">
        <div className="cta-marquee-move">
          {[...classes, ...classes].map((c, i) => (
            <span key={`${c}-${i}`}>{c}</span>
          ))}
        </div>
      </div>
      <Doodle kind="sun" size={80} color="var(--vayu)" className="cta-doodle cta-doodle--a" />
      <Doodle kind="flower" size={64} color="var(--ink)" className="cta-doodle cta-doodle--b" delay={1} />
      <div className="container cta-inner">
        <Reveal as="h2" className="cta-title">
          {`Admissions for ${site.session} are open`}
        </Reveal>
        <Reveal as="p" className="cta-text" delay={0.1}>
          Seats are limited in Nursery, LKG and Class 11. Message us for the prospectus, fee details and a campus visit slot.
        </Reveal>
        <motion.div className="cta-actions" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <a className="btn btn--wa btn--lg" href={waLink(waMessages.admission)} target="_blank" rel="noopener noreferrer" data-cursor="Chat">
            <FaWhatsapp size={22} aria-hidden="true" />
            Ask on WhatsApp
          </a>
          <a className="btn btn--lg" href={site.phoneHref}>
            <LuPhone size={20} aria-hidden="true" />
            Call the office
          </a>
          <Link className="btn btn--ink btn--lg" to="/admissions">
            How admission works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
