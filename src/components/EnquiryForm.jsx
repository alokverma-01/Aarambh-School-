import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { site } from '../data/site';
import { waLink } from '../lib/whatsapp';

const classOptions = ['Nursery', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];
const topics = ['Admission', 'Fee structure', 'Campus visit', 'Transport', 'Something else'];

// Builds a WhatsApp message from the form, so enquiries land straight in the
// school's WhatsApp. No server or database needed.
export default function EnquiryForm({ mode = 'admission' }) {
  const uid = useId();
  const [values, setValues] = useState({ parent: '', child: '', cls: '', phone: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (!values.parent.trim()) e.parent = 'Enter your name.';
    const digits = values.phone.replace(/\D/g, '').replace(/^(91|0)/, '');
    if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a 10-digit mobile number, like 98765 43210.';
    if (mode === 'admission' && !values.cls) e.cls = 'Choose the class you are applying for.';
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const lines =
      mode === 'admission'
        ? [
            `Namaste! Admission enquiry for ${site.session}.`,
            `Parent: ${values.parent}`,
            values.child && `Child: ${values.child}`,
            `Class: ${values.cls}`,
            `Phone: ${values.phone}`,
            values.message && `Message: ${values.message}`,
          ]
        : [`Namaste! ${values.topic} enquiry.`, `Name: ${values.parent}`, `Phone: ${values.phone}`, values.message && `Message: ${values.message}`];
    window.open(waLink(lines.filter(Boolean).join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  const field = (key, label, input, hint) => (
    <div className={`field ${errors[key] ? 'has-error' : ''}`}>
      <label htmlFor={`${uid}-${key}`}>{label}</label>
      {input}
      {hint && !errors[key] && <small className="field-hint">{hint}</small>}
      {errors[key] && (
        <small className="field-error" id={`${uid}-${key}-err`} role="alert">
          {errors[key]}
        </small>
      )}
    </div>
  );
  const aria = (key) => ({ id: `${uid}-${key}`, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `${uid}-${key}-err` : undefined });

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        {field('parent', mode === 'admission' ? "Parent's name" : 'Your name', <input type="text" autoComplete="name" value={values.parent} onChange={set('parent')} {...aria('parent')} />)}
        {field('phone', 'Mobile number', <input type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} {...aria('phone')} />)}
      </div>
      {mode === 'admission' ? (
        <div className="field-row">
          {field('child', "Child's name", <input type="text" value={values.child} onChange={set('child')} {...aria('child')} />, 'Optional')}
          {field(
            'cls',
            'Applying for',
            <select value={values.cls} onChange={set('cls')} {...aria('cls')}>
              <option value="">Choose a class</option>
              {classOptions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>,
          )}
        </div>
      ) : (
        field(
          'topic',
          'What is it about?',
          <select value={values.topic} onChange={set('topic')} {...aria('topic')}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>,
        )
      )}
      {field('message', 'Message', <textarea rows={4} value={values.message} onChange={set('message')} {...aria('message')} />, 'Optional')}
      <button type="submit" className="btn btn--wa btn--lg btn--block" data-cursor="Send">
        <FaWhatsapp size={22} aria-hidden="true" />
        Send on WhatsApp
      </button>
      <AnimatePresence>
        {sent && (
          <motion.p className="form-sent" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            WhatsApp opened with your message. Press send there and we will reply during office hours.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
