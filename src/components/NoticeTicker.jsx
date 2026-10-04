import { Link } from 'react-router-dom';
import { LuMegaphone } from 'react-icons/lu';
import { sortedNotices } from '../data/content';

export default function NoticeTicker() {
  const items = sortedNotices().slice(0, 6);
  return (
    <div className="ticker" role="region" aria-label="Latest notices">
      <Link to="/notices" className="ticker-label">
        <LuMegaphone size={16} aria-hidden="true" />
        Notices
      </Link>
      <div className="ticker-track">
        <div className="ticker-move">
          {[...items, ...items].map((n, i) => (
            <span key={`${n.id}-${i}`} aria-hidden={i >= items.length ? 'true' : undefined}>
              <i aria-hidden="true">✦</i>
              {n.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
