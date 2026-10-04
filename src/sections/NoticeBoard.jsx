import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import { sortedNotices } from '../data/content';
import { formatDate, truncate } from '../lib/format';
import { waLink, waMessages } from '../lib/whatsapp';

const paper = ['#FFF1B0', '#FFD3E6', '#D5E1FF', '#C9F4DD'];
const pins = ['var(--rani)', 'var(--jal)', 'var(--agni)', 'var(--prithvi)'];
const tilt = [-3, 2.5, -1.5, 3.5];

export default function NoticeBoard() {
  const list = sortedNotices().slice(0, 4);
  return (
    <section className="section nb-section">
      <div className="container nb-grid">
        <div className="nb-intro">
          <FlipHeading>Fresh on the notice board</FlipHeading>
          <Reveal as="p" className="lead">
            Exam dates, holidays and events, posted by the school office. The same notices go out on WhatsApp, so you never miss one.
          </Reveal>
          <Reveal className="nb-actions" delay={0.1}>
            <Link className="btn btn--ink" to="/notices">
              See all notices
            </Link>
            <a className="btn btn--wa" href={waLink(waMessages.notices)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={18} aria-hidden="true" />
              Get them on WhatsApp
            </a>
          </Reveal>
        </div>
        <div className="corkboard">
          {list.map((n, i) => (
            <motion.article
              key={n.id}
              className="pin-note"
              style={{ '--note': paper[i], '--pin': pins[i] }}
              initial={{ opacity: 0, y: -140, rotate: tilt[i] - 28, rotateX: 50 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt[i], rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.13, type: 'spring', stiffness: 130, damping: 11 }}
              whileHover={{ rotate: [tilt[i], tilt[i] + 5, tilt[i] - 4, tilt[i]], scale: 1.04, transition: { duration: 0.6 } }}
            >
              <span className="pin" aria-hidden="true" />
              <p className="pin-meta">
                <time dateTime={n.date}>{formatDate(n.date)}</time>
                <span className="pin-cat">{n.category}</span>
              </p>
              <h3>{n.title}</h3>
              <p className="pin-body">{truncate(n.body, 105)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
