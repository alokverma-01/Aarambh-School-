// Page content. Everything marked SAMPLE is placeholder copy written for this
// template: replace it with your school's real numbers, notices and reviews
// before going live.

import { site } from './site';

export const colors = {
  agni: 'var(--agni)',
  vayu: 'var(--vayu)',
  prithvi: 'var(--prithvi)',
  jal: 'var(--jal)',
  rani: 'var(--rani)',
};
export const colorCycle = ['var(--agni)', 'var(--vayu)', 'var(--prithvi)', 'var(--sky)', 'var(--rani)'];

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/notices', label: 'Notices' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

// SAMPLE numbers
export const stats = [
  { value: 2400, suffix: '+', label: 'students from Nursery to Class 12', tone: 'vayu' },
  { value: 130, suffix: '+', label: 'teachers and support staff', tone: 'rani' },
  { value: new Date().getFullYear() - site.established, suffix: '', label: 'years of teaching in the city', tone: 'prithvi' },
  { value: 98, suffix: '%', label: 'pass rate in the 2026 board exams', tone: 'jal' },
];

export const stages = [
  {
    id: 'pre',
    title: 'Pre-primary',
    classes: 'Nursery, LKG, UKG',
    ages: 'Ages 3 to 6',
    color: 'var(--vayu)',
    fg: 'var(--ink)',
    img: 'youngKidsTable',
    alt: 'Young children working together at a low classroom table',
    points: [
      'Play-way learning with stories, songs and colour',
      'Phonics, early numbers and fine-motor activities',
      'Small groups, so every child gets attention',
    ],
    subjects: ['English and phonics', 'Hindi rhymes and stories', 'Number work', 'Art and craft', 'Music and movement', 'Outdoor play'],
  },
  {
    id: 'primary',
    title: 'Primary',
    classes: 'Classes 1 to 5',
    ages: 'Ages 6 to 11',
    color: 'var(--prithvi)',
    fg: 'var(--ink)',
    img: 'youngKidsClass',
    alt: 'A primary class of young students sitting at their desks',
    points: [
      'Strong reading, writing and maths foundations',
      'Environmental studies taught through projects',
      'Weekly library, art, music and games periods',
    ],
    subjects: ['English', 'Hindi', 'Mathematics', 'Environmental Studies', 'Computer basics', 'Art, music and PE'],
  },
  {
    id: 'middle',
    title: 'Middle school',
    classes: 'Classes 6 to 8',
    ages: 'Ages 11 to 14',
    color: 'var(--jal)',
    fg: '#fff',
    img: 'stemPolka',
    alt: 'A student working on a hands-on STEM activity',
    points: [
      'Lab-based science and hands-on maths',
      'Coding and robotics from Class 6',
      'Third language: Sanskrit or French',
    ],
    subjects: ['English', 'Hindi', 'Sanskrit or French', 'Mathematics', 'Science', 'Social Science', 'Computer Science and coding'],
  },
  {
    id: 'senior',
    title: 'Senior school',
    classes: 'Classes 9 to 12',
    ages: 'Ages 14 to 18',
    color: 'var(--agni)',
    fg: 'var(--ink)',
    img: 'classroomFull',
    alt: 'Senior students in a full classroom during a lesson',
    points: [
      'CBSE Class 10 and Class 12 board preparation',
      'Science, Commerce and Humanities streams',
      'Career counselling and entrance-exam guidance',
    ],
    subjects: ['Classes 9–10: English, Hindi, Maths, Science, Social Science, AI or IT', 'Classes 11–12: choose a stream below'],
  },
];

export const streams = [
  { name: 'Science (PCM)', color: 'var(--jal)', fg: '#fff', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science or Physical Education'] },
  { name: 'Science (PCB)', color: 'var(--prithvi)', fg: 'var(--ink)', subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Psychology or Physical Education'] },
  { name: 'Commerce', color: 'var(--vayu)', fg: 'var(--ink)', subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics or Informatics Practices'] },
  { name: 'Humanities', color: 'var(--rani)', fg: 'var(--ink)', subjects: ['History', 'Political Science', 'Geography or Psychology', 'English', 'Economics or Painting'] },
];

export const pillars = [
  { title: 'Understand before you memorise', text: 'Concepts are taught with models, experiments and real examples, so children can explain the why, not just the answer.', icon: 'idea', color: 'var(--vayu)' },
  { title: 'Learn by doing', text: 'Projects, lab work, field trips and class presentations every term, in line with NEP 2020.', icon: 'hands', color: 'var(--rani)' },
  { title: 'Feedback that helps', text: 'Regular class tests with written feedback and parent–teacher meetings after every exam cycle.', icon: 'chart', color: 'var(--prithvi)' },
];

export const coCurricular = [
  'Vocal music', 'Tabla and keyboard', 'Kathak', 'Folk dance', 'Art and clay', 'Yoga', 'Chess', 'Debate',
  'Model UN', 'Robotics club', 'Scouts and Guides', 'Football', 'Cricket', 'Basketball', 'Athletics', 'Quiz club',
];

export const timings = [
  { label: 'Pre-primary', value: '8:30 am – 12:30 pm' },
  { label: 'Classes 1 to 12', value: '8:00 am – 2:15 pm' },
  { label: 'Office and admissions', value: '9:00 am – 4:00 pm' },
  { label: 'Saturdays', value: 'Activity day for Classes 1–8' },
];

export const facilities = [
  { title: 'Smart classrooms', text: 'Interactive boards in every classroom, with lessons that mix videos, models and discussion.', img: 'vrKids', alt: 'Children trying virtual reality headsets in class', icon: 'monitor', color: 'var(--jal)', fg: '#fff' },
  { title: 'STEM and robotics lab', text: 'Circuits, sensors and robot kits for Classes 6 to 12, with a weekly robotics club.', img: 'stemMixer', alt: 'A student building an electronics project', icon: 'bot', color: 'var(--agni)', fg: 'var(--ink)' },
  { title: 'Science labs', text: 'Separate physics, chemistry and biology labs for hands-on practicals from Class 6.', img: 'stemBall', alt: 'A student doing a hands-on science activity', icon: 'flask', color: 'var(--prithvi)', fg: 'var(--ink)' },
  { title: 'Library and reading corner', text: 'Over 12,000 books in English and Hindi, magazines, and a quiet reading room.', img: 'boysBooks', alt: 'Two boys reading books together at a table', icon: 'library', color: 'var(--vayu)', fg: 'var(--ink)' },
  { title: 'Sports ground', text: 'Cricket pitch, football field, basketball court and a 200 m track, with trained coaches.', img: 'grassBoys', alt: 'Two students sitting on the green school ground', icon: 'trophy', color: 'var(--rani)', fg: 'var(--ink)' },
  { title: 'Art, music and dance', text: 'Dedicated rooms for painting, clay, vocal music, instruments and Kathak.', img: 'pinkFloral', alt: 'Children dressed up for a school cultural programme', icon: 'palette', color: 'var(--agni)', fg: 'var(--ink)' },
  { title: 'Computer lab', text: 'One device per student, coding from Class 3, and safe-internet lessons for every class.', img: 'ipadGirl', alt: 'A girl working on a tablet', icon: 'laptop', color: 'var(--jal)', fg: '#fff' },
  { title: 'Safe transport', text: 'GPS-tracked buses with a female attendant on every route, covering most of the city.', img: 'stemOrange', alt: 'A student with a school bag, ready to go home', icon: 'bus', color: 'var(--prithvi)', fg: 'var(--ink)' },
];

export const safety = [
  { title: 'CCTV across campus', icon: 'cctv' },
  { title: 'GPS-tracked buses', icon: 'pin' },
  { title: 'Nurse and sick room', icon: 'heart' },
  { title: 'RO drinking water', icon: 'water' },
  { title: 'Monthly fire drills', icon: 'flame' },
  { title: 'Police-verified staff', icon: 'shield' },
];

export const houses = [
  { name: 'Agni', element: 'Fire', value: 'Courage', text: 'Speak up, lead from the front and own your mistakes.', color: 'var(--agni)', fg: 'var(--ink)', icon: 'flame' },
  { name: 'Jal', element: 'Water', value: 'Compassion', text: 'Help without being asked and make room for everyone.', color: 'var(--jal)', fg: '#fff', icon: 'water' },
  { name: 'Prithvi', element: 'Earth', value: 'Responsibility', text: 'Look after your class, your campus and your city.', color: 'var(--prithvi)', fg: 'var(--ink)', icon: 'mountain' },
  { name: 'Vayu', element: 'Air', value: 'Curiosity', text: 'Ask one more question and try one more way.', color: 'var(--vayu)', fg: 'var(--ink)', icon: 'wind' },
];

// SAMPLE history
export const timeline = [
  { year: '1998', text: 'Opened with 60 children and 6 teachers in a rented building.' },
  { year: '2004', text: 'Moved to our own campus and received CBSE affiliation up to Class 10.' },
  { year: '2011', text: 'Senior secondary wing opened with Science and Commerce.' },
  { year: '2017', text: 'Humanities stream added and the new library block built.' },
  { year: '2021', text: 'Smart boards in every classroom and a new STEM lab.' },
  { year: '2026', text: '2,400 students across Nursery to Class 12, and still growing.' },
];

// SAMPLE principal
export const principal = {
  name: 'Dr. Meera Srivastava',
  role: 'Principal',
  bio: 'Our principal has led the school since 2015 and still teaches one English class every week.',
  short: 'We want every child to leave school knowing how to learn, how to be kind and how to stand on their own feet.',
  letter: [
    'Dear parents,',
    'Choosing a school is one of the biggest decisions a family makes. When you visit us, I hope you notice the small things: children who look you in the eye and say namaste, teachers who know every name, and classrooms that are a little noisy because something interesting is happening.',
    'We take board results seriously, and our students do well. But we measure ourselves by a longer test: do our children grow into adults who are curious, honest and useful to the people around them?',
    'Come and see us on any Saturday morning. I would be happy to show you around.',
  ],
};

export const vision = 'Children who think clearly, act kindly and stay curious all their lives.';
export const mission = [
  'Teach concepts deeply, with room for questions and mistakes.',
  'Give every child a stage, a sport and a skill they love.',
  'Keep parents close with honest, regular communication.',
  'Build pride in Indian languages, arts and values alongside a global outlook.',
];

export const admissionSteps = [
  { title: 'Enquire', text: 'Message us on WhatsApp or call the office. We share the prospectus and fee details the same day.' },
  { title: 'Visit the campus', text: 'Walk through classrooms, labs and the playground with our admissions team, any Saturday from 10 am to 1 pm.' },
  { title: 'Register', text: 'Fill in the registration form at the office or online and submit the documents listed below.' },
  { title: 'Meet us', text: 'A short, friendly interaction with your child and you. From Class 2 onwards, a simple age-appropriate assessment.' },
  { title: 'Confirm the seat', text: 'Receive the admission letter, pay the fee and collect the welcome kit, book list and uniform details.' },
];

export const ageCriteria = [
  { cls: 'Nursery', age: '3 years' },
  { cls: 'LKG', age: '4 years' },
  { cls: 'UKG', age: '5 years' },
  { cls: 'Class 1', age: '6 years' },
];

export const documents = [
  'Birth certificate of the child',
  "Child's Aadhaar card",
  "Parents' Aadhaar card or other photo ID",
  'Address proof (electricity bill, rent agreement or passport)',
  'Four passport-size photos of the child',
  'Transfer certificate (Class 2 onwards)',
  'Last report card (Class 2 onwards)',
  'Category certificate, if applicable',
];

export const faqs = [
  { q: 'Do you provide school transport?', a: 'Yes. Our buses cover most areas within about 15 km of the school. Every bus is GPS-tracked and has a female attendant. Message us your area on WhatsApp to check the route.' },
  { q: 'How can I get the fee structure?', a: 'Fees differ by class, so we share the latest fee structure directly on WhatsApp or at the office. There are no hidden charges; the fee sheet lists every item.' },
  { q: 'What is the class size?', a: 'Pre-primary classes have up to 25 children with a teacher and an assistant. Classes 1 to 12 have up to 35 students per section.' },
  { q: 'Are there any scholarships or concessions?', a: 'We offer a sibling concession and merit scholarships for Class 11. Ask the admissions desk for the current criteria.' },
  { q: 'Is the school co-educational?', a: 'Yes, boys and girls study together from Nursery to Class 12.' },
  { q: 'Can my child join in the middle of the year?', a: 'Mid-session admissions are possible if a seat is available, usually for families moving to the city. Call or message us to check.' },
];

// SAMPLE notices — dates use YYYY-MM-DD
export const noticeCategories = ['Admission', 'Exam', 'Holiday', 'Event', 'Circular'];
export const categoryColor = {
  Admission: 'var(--rani)',
  Exam: 'var(--sky)',
  Holiday: 'var(--prithvi)',
  Event: 'var(--vayu)',
  Circular: 'var(--agni)',
};
export const notices = [
  { id: 'n1', title: `Admissions open for session ${site.session}`, date: '2026-10-01', category: 'Admission', pinned: true, body: 'Registration forms for Nursery to Class 9 and Class 11 are available at the school office and on WhatsApp. Campus tours run every Saturday from 10 am to 1 pm.' },
  { id: 'n2', title: 'Diwali break from 7 to 11 November', date: '2026-10-03', category: 'Holiday', body: 'The school will stay closed from Saturday 7 November to Wednesday 11 November 2026 for Diwali. Classes resume on Thursday 12 November. Happy Diwali to all our families.' },
  { id: 'n3', title: 'Parent–teacher meeting for Classes 1 to 8', date: '2026-10-02', category: 'Event', body: 'The PTM is on Saturday 24 October, from 9 am to 12 noon. Half-yearly report books will be shared, and class teachers will meet each family for about 10 minutes.' },
  { id: 'n4', title: 'Half-yearly exams: date sheet released', date: '2026-09-28', category: 'Exam', body: 'Half-yearly exams for Classes 3 to 12 begin on Monday 12 October. Date sheets have been shared in class WhatsApp groups and are also available at the office.', attachment: '#' },
  { id: 'n5', title: 'Gandhi Jayanti holiday on 2 October', date: '2026-09-30', category: 'Holiday', body: 'School remains closed on Friday 2 October. A special assembly on the life of Mahatma Gandhi will be held on Thursday 1 October.' },
  { id: 'n6', title: 'Winter uniform from 1 November', date: '2026-09-25', category: 'Circular', body: 'Students should wear the winter uniform (navy blazer and sweater) from 1 November. The uniform shop on campus is open from 9 am to 1 pm on working days.' },
  { id: 'n7', title: 'Annual Sports Day on 21 November', date: '2026-09-20', category: 'Event', body: 'Sports Day will be held at the main ground on Saturday 21 November. House practice begins after the Diwali break. Parents are welcome from 9 am.' },
  { id: 'n8', title: 'Third-quarter fee due by 15 October', date: '2026-09-15', category: 'Circular', body: 'Please pay the fee for October to December by 15 October at the school office or through the online portal. A late fee applies after the due date.' },
  { id: 'n9', title: 'Science exhibition: entries open', date: '2026-09-10', category: 'Event', body: 'Students of Classes 6 to 12 can submit project ideas to their science teacher by 30 October. Selected projects will be displayed on Children’s Day.' },
];

export function sortedNotices() {
  return [...notices].sort((a, b) => (b.pinned === true) - (a.pinned === true) || b.date.localeCompare(a.date));
}

// SAMPLE reviews
export const reviews = [
  { name: 'Priya Srivastava', role: 'Parent, Class 2', type: 'Parents', rating: 5, text: 'My daughter was shy when she joined in UKG. Two years on, she volunteers for every assembly. The teachers notice small things and tell us about them.' },
  { name: 'Rahul Verma', role: 'Parent, Class 7', type: 'Parents', rating: 5, text: 'Regular updates on WhatsApp, quick replies from the class teacher and a fee process that is actually simple. The robotics club is my son’s favourite part of the week.' },
  { name: 'Ananya Mishra', role: 'Student, Class 12', type: 'Students', rating: 5, text: 'The chemistry lab stays open after school before practicals, and teachers stay back to clear doubts. I never felt I needed coaching for everything.' },
  { name: 'Mohd. Arif Khan', role: 'Parent, Class 4', type: 'Parents', rating: 4, text: 'Good academics and a very clean campus. Pick-up time at the gate can get crowded, but the staff manage it patiently.' },
  { name: 'Sneha Gupta', role: 'Alumna, batch of 2019', type: 'Alumni', rating: 5, text: 'I still message my English teacher. The debate club gave me the confidence I carried into college and my first job.' },
  { name: 'Vikram Singh', role: 'Parent, Nursery', type: 'Parents', rating: 5, text: 'We visited five schools. This was the only one where the nursery teacher sat on the floor with the children. That decided it for us.' },
  { name: 'Kavya Tiwari', role: 'Student, Class 9', type: 'Students', rating: 5, text: 'Sports Day and the annual function are the best days of the year. Our house won the cup last year and the whole class celebrated.' },
  { name: 'Arjun Mehta', role: 'Alumnus, batch of 2015', type: 'Alumni', rating: 5, text: 'Teachers knew us by name and pushed us to try things outside the syllabus. Proud to have studied here.' },
  { name: 'Farah Siddiqui', role: 'Parent, Class 10', type: 'Parents', rating: 5, text: 'Board-year support has been excellent: extra classes, mock exams and calm, honest feedback for both of us.' },
];

export function ratingSummary() {
  const count = reviews.length;
  const average = reviews.reduce((s, r) => s + r.rating, 0) / count;
  const dist = [5, 4, 3, 2, 1].map((star) => ({ star, count: reviews.filter((r) => r.rating === star).length }));
  return { count, average, dist };
}

export const gallery = [
  { k: 'uniformGirl', alt: 'A student in uniform standing in a blue classroom with classmates', cat: 'Classrooms', shape: 'tall' },
  { k: 'vrKids', alt: 'Children trying virtual reality headsets', cat: 'STEM', shape: 'wide' },
  { k: 'groupPicture', alt: 'A group of children posing together for a photo', cat: 'Campus life', shape: 'square' },
  { k: 'stemMixer', alt: 'A student working on an electronics project', cat: 'STEM', shape: 'square' },
  { k: 'girlsDesk', alt: 'Two girls studying together at a desk', cat: 'Classrooms', shape: 'square' },
  { k: 'pinkFloral', alt: 'Children dressed up for a cultural programme', cat: 'Campus life', shape: 'tall' },
  { k: 'classroomFull', alt: 'A full classroom of students during a lesson', cat: 'Classrooms', shape: 'wide' },
  { k: 'stemBall', alt: 'A student holding a model during a science activity', cat: 'STEM', shape: 'square' },
  { k: 'grassBoys', alt: 'Two students relaxing on the green school ground', cat: 'Campus life', shape: 'square' },
  { k: 'chalkboard', alt: 'A teacher writing on the chalkboard', cat: 'Classrooms', shape: 'tall' },
  { k: 'stemPolka', alt: 'A student concentrating on a STEM task', cat: 'STEM', shape: 'square' },
  { k: 'newspaperGirl', alt: 'A girl reading a newspaper', cat: 'Campus life', shape: 'tall' },
  { k: 'youngKidsClass', alt: 'Young children sitting in a classroom', cat: 'Classrooms', shape: 'wide' },
  { k: 'stemPhone', alt: 'A student testing a project with a phone', cat: 'STEM', shape: 'square' },
  { k: 'redBook', alt: 'A boy holding up a yellow book', cat: 'Campus life', shape: 'square' },
  { k: 'boysDeskBook', alt: 'Two boys reading at a classroom desk', cat: 'Classrooms', shape: 'square' },
  { k: 'ipadGirl', alt: 'A girl using a tablet in the computer lab', cat: 'STEM', shape: 'wide' },
  { k: 'boysHug', alt: 'Two friends hugging and laughing', cat: 'Campus life', shape: 'square' },
];
export const galleryCategories = ['All', 'Classrooms', 'STEM', 'Campus life'];

export const disclosure = {
  general: [
    { label: 'Name of the school', value: site.name },
    { label: 'Affiliation number', value: site.affiliationNo },
    { label: 'School code', value: site.schoolCode },
    { label: 'Address', value: `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.pin}` },
    { label: 'Principal', value: principal.name },
    { label: 'Email', value: site.email },
    { label: 'Phone', value: site.phone },
  ],
  documents: [
    'Copy of affiliation and upgradation letter',
    'Society / trust registration certificate',
    'No objection certificate (NOC) from the state government',
    'Recognition certificate under the RTE Act',
    'Building safety certificate',
    'Fire safety certificate',
    'Water, health and sanitation certificates',
    'Fee structure of the school',
    'Annual academic calendar',
    'List of School Management Committee members',
    'List of Parent–Teacher Association members',
    'Board results of the last three years',
  ],
};
