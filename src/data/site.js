// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE FIRST.
//  School name, phone, WhatsApp number, address and timings all
//  live here, and every page reads from it.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Aarambh Public School',
  shortName: 'Aarambh',
  tagline: 'Nursery to Class 12',
  board: 'CBSE',
  affiliationNo: '0000000', // your CBSE affiliation number
  schoolCode: '00000',
  established: 1998,
  session: '2027–28',
  motto: { hi: 'विद्या ददाति विनयम्', en: 'Knowledge gives humility' },

  phone: '+91 99999 99999',
  phoneHref: 'tel:+919999999999',
  // WhatsApp: country code + number, digits only (no +, spaces or dashes)
  whatsapp: '919999999999',
  waReplyNote: 'We reply during office hours, Monday to Saturday.',
  email: 'office@aarambhschool.in',

  address: {
    line1: 'Plot 12, Sector 4',
    city: 'Your City',
    state: 'Your State',
    pin: '000000',
  },
  // What Google Maps should search for in the embedded map
  mapQuery: 'Plot 12, Sector 4, Your City',

  hours: [
    { days: 'School, Monday to Saturday', time: '8:00 am – 2:15 pm' },
    { days: 'Office and admissions', time: '9:00 am – 4:00 pm' },
  ],

  socials: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
  googleReviewUrl: '#', // paste your Google Business "write a review" link
};

export const fullAddress = `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.pin}`;
