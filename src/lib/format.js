const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const monthFmt = new Intl.DateTimeFormat('en-IN', { month: 'short' });

export const toDate = (iso) => new Date(`${iso}T00:00:00`);
export const formatDate = (iso) => fmt.format(toDate(iso));
export const monthShort = (iso) => monthFmt.format(toDate(iso));

export function daysAgo(iso) {
  const ms = Date.now() - toDate(iso).getTime();
  return Math.floor(ms / 86400000);
}

export function initials(name) {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Mohd)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export const truncate = (s, n) => (s.length > n ? `${s.slice(0, n).replace(/\s+\S*$/, '')}…` : s);
