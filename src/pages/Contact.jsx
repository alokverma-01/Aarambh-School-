import { FaWhatsapp } from 'react-icons/fa6';
import { LuClock, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import PageHero from '../components/PageHero';
import FlipHeading from '../components/FlipHeading';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import EnquiryForm from '../components/EnquiryForm';
import { useTitle } from '../lib/hooks';
import { site, fullAddress } from '../data/site';
import { waLink, waMessages } from '../lib/whatsapp';

export default function Contact() {
  useTitle('Contact');
  const cards = [
    { title: 'Call the office', value: site.phone, href: site.phoneHref, icon: <LuPhone />, color: 'var(--vayu)', fg: 'var(--ink)', cursor: 'Call' },
    { title: 'WhatsApp', value: 'Quickest reply', href: waLink(waMessages.general), icon: <FaWhatsapp />, color: '#25D366', fg: 'var(--ink)', external: true, cursor: 'Chat' },
    { title: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <LuMail />, color: 'var(--jal)', fg: '#fff', cursor: 'Write' },
    { title: 'Visit us', value: `${site.address.line1}, ${site.address.city}`, href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`, icon: <LuMapPin />, color: 'var(--rani)', fg: 'var(--ink)', external: true, cursor: 'Go' },
  ];

  return (
    <>
      <PageHero
        title="Contact us"
        intro="Call, message or drop by. The admissions desk is open Monday to Saturday, and WhatsApp is the fastest way to reach us."
        bg="var(--prithvi)"
        fg="var(--ink)"
        image="girlsDesk"
        imageAlt="Two girls studying together at a desk"
        doodles={['plane', 'sun']}
      />

      <section className="section">
        <div className="container contact-cards">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <TiltCard
                as="a"
                href={c.href}
                className="contact-card"
                style={{ '--c': c.color, '--fg': c.fg }}
                data-cursor={c.cursor}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-icon" aria-hidden="true">
                  {c.icon}
                </span>
                <strong>{c.title}</strong>
                <span>{c.value}</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--mist">
        <div className="container form-grid">
          <div>
            <FlipHeading>Send us a message</FlipHeading>
            <Reveal as="p" className="lead">
              Your message opens in WhatsApp, ready to send. We reply during office hours.
            </Reveal>
            <Reveal className="form-card" delay={0.1}>
              <EnquiryForm mode="contact" />
            </Reveal>
          </div>
          <Reveal className="map-card" delay={0.15}>
            <iframe
              title={`Map showing ${site.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-info">
              <p>
                <LuMapPin aria-hidden="true" /> {fullAddress}
              </p>
              {site.hours.map((h) => (
                <p key={h.days}>
                  <LuClock aria-hidden="true" /> <span>{h.days}: {h.time}</span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
