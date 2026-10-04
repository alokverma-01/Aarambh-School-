import { colorCycle } from '../data/content';

// Festive pennant string (bandhanwar) in the house colours.
export default function Bunting({ count = 16, className = '' }) {
  return (
    <div className={`bunting ${className}`} aria-hidden="true">
      <svg className="bunting-string" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 2 Q50 9 100 2" />
      </svg>
      <div className="bunting-flags">
        {Array.from({ length: count }, (_, i) => {
          const t = (i + 0.5) / count;
          return (
            <span
              key={i}
              style={{
                '--c': colorCycle[i % colorCycle.length],
                '--sag': `${6 + 42 * t * (1 - t)}px`,
                '--d': `${(i % 5) * 0.18}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
