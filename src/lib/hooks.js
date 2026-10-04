import { useEffect, useState } from 'react';
import { site } from '../data/site';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.board} school, ${site.tagline}`;
  }, [title]);
}

export function useMedia(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}
