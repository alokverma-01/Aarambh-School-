// All photos are free Unsplash images (unsplash.com/license), hot-linked from
// Unsplash's CDN. To use your own school photos, put them in /public/photos
// and replace a key below with a path like '/photos/assembly.jpg'.

export const photos = {
  uniformGirl: 'photo-1572847748080-bac263fae977', // Raj Rana
  groupPicture: 'photo-1524069290683-0457abfe42c3', // Church of the King
  vrKids: 'photo-1548125119-57853b9b0f07', // stem.T4L
  girlsDesk: 'photo-1692269725911-87697c558be1', // Swastik Arora
  classroomFull: 'photo-1709290749293-c6152a187b14', // CIMT Hooghly
  chalkboard: 'photo-1522661067900-ab829854a57f', // Nikhita S
  youngKidsTable: 'photo-1692269725851-f5d3a3f02807', // Swastik Arora
  youngKidsClass: 'photo-1692269725836-fbd72e98883f', // Swastik Arora
  kidsTableRoom: 'photo-1692269725976-2bebd4622fd4', // Swastik Arora
  boysBooks: 'photo-1692269726060-9c604e06f63b', // Swastik Arora
  boysDeskBook: 'photo-1692269725827-699e04a11cdf', // Swastik Arora
  boysDesk: 'photo-1692269726203-fa0d613eec37', // Swastik Arora
  stemPolka: 'photo-1596496181871-9681eacf9764', // Jeswin Thomas
  stemBall: 'photo-1596496181935-7801d2065877', // Jeswin Thomas
  stemMixer: 'photo-1596496181848-3091d4878b24', // Jeswin Thomas
  stemPhone: 'photo-1596495717678-69df9f89c2a3', // Jeswin Thomas
  stemOrange: 'photo-1596496050860-b48b170fc584', // Jeswin Thomas
  stemPen: 'photo-1596496050827-8299e0220de1', // Jeswin Thomas
  ipadGirl: 'photo-1550706899-d71befa3b74f', // stem.T4L
  newspaperGirl: 'flagged/photo-1574097656146-0b43b7660cb6', // jaikishan patel
  blueShirtBoy: 'flagged/photo-1574098335395-18cf525e45d6', // jaikishan patel
  pinkFloral: 'photo-1610093435813-526af1b3fe11', // amol sonar
  grassBoys: 'photo-1623863568368-69e4cbe6cc0b', // Dilip Sharma
  redBook: 'photo-1623303366639-0e330d7c3d9f', // Muhammad Zaid
  girlChair: 'photo-1573894999291-f440466112cc', // Yogendra Singh
  boysHug: 'photo-1489942986787-cded4ecf962e', // Aman Shrivastava
};

export function img(key, w = 1200) {
  const p = photos[key] || key;
  if (p.startsWith('/')) return p; // local file in /public
  return `https://images.unsplash.com/${p}?auto=format&fit=crop&w=${w}&q=80`;
}
