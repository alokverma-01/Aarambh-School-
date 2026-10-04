import { LuStar } from 'react-icons/lu';

export default function Stars({ value = 5, size = 18 }) {
  const rounded = Math.round(value);
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <LuStar key={n} size={size} className={n <= rounded ? 'on' : ''} aria-hidden="true" />
      ))}
    </span>
  );
}
