import { site } from '../data/site';

export function waLink(message = '') {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const waMessages = {
  admission: `Namaste! I would like to know about admissions at ${site.name} for ${site.session}.`,
  fees: `Namaste! Could you please share the fee structure at ${site.name} for ${site.session}?`,
  visit: `Namaste! I would like to book a campus visit at ${site.name}. Which Saturday slots are available?`,
  transport: `Namaste! Is school bus transport available to my area? My area is: `,
  notices: `Namaste! Please add my number to the ${site.name} notices broadcast list.`,
  review: `Namaste! I would like to share feedback about ${site.name}: `,
  general: `Namaste! I have a question for ${site.name}.`,
};

export const waTopics = [
  { label: 'Admission enquiry', message: waMessages.admission, color: 'var(--rani)' },
  { label: 'Fee structure', message: waMessages.fees, color: 'var(--vayu)' },
  { label: 'Book a campus visit', message: waMessages.visit, color: 'var(--prithvi)' },
  { label: 'School transport', message: waMessages.transport, color: 'var(--jal)' },
  { label: 'Something else', message: waMessages.general, color: 'var(--agni)' },
];
