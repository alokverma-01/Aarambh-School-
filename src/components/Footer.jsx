import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuPhone, LuMail, LuMapPin, LuClock } from 'react-icons/lu';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa6';
import Crest from './Crest';
import { site, fullAddress } from '../data/site';
import { navLinks, colorCycle } from '../data/content';
import { waLink, waMessages } from '../lib/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();
  const letters = [...site.shortName];
  return (
    <footer className="footer">
      <div className="footer-stripe" aria-hidden="true">
        {colorCycle.map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand--light">
            <Crest size={52} />
            <span className="brand-text">
              <strong>{site.name}</strong>
              <small>
                {site.board} affiliated, {site.tagline}
              </small>
            </span>
          </Link>
          <p className="footer-motto" lang="hi">
            {site.motto.hi}
          </p>
          <p className="footer-address">
            <LuMapPin aria-hidden="true" /> {fullAddress}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-h">Explore</h2>
          <ul>
            {navLinks.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-h">For parents</h2>
          <ul>
            <li><Link to="/notices">Notices and circulars</Link></li>
            <li><Link to="/admissions">Admission process</Link></li>
            <li><a href={waLink(waMessages.fees)} target="_blank" rel="noopener noreferrer">Ask for the fee structure</a></li>
            <li><a href={waLink(waMessages.transport)} target="_blank" rel="noopener noreferrer">Check bus routes</a></li>
            <li><Link to="/disclosure">Mandatory public disclosure</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-h">Reach us</h2>
          <ul className="footer-contact">
            <li><a href={site.phoneHref}><LuPhone aria-hidden="true" /> {site.phone}</a></li>
            <li><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true" /> WhatsApp us</a></li>
            <li><a href={`mailto:${site.email}`}><LuMail aria-hidden="true" /> {site.email}</a></li>
            {site.hours.map((h) => (
              <li key={h.days} className="footer-hours"><LuClock aria-hidden="true" /> <span>{h.days}<br />{h.time}</span></li>
            ))}
          </ul>
          <div className="socials">
            <a href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
            <a href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
            <a href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        {letters.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            style={{ color: colorCycle[i % colorCycle.length] }}
            whileHover={{ y: -28, rotate: i % 2 ? 10 : -10, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {site.name}. CBSE affiliation no. {site.affiliationNo}.
        </p>
        <p>Photos courtesy of Unsplash photographers.</p>
      </div>
    </footer>
  );
}
