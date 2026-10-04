import { motion } from 'framer-motion';

// Headline whose words flip up in 3D as it scrolls into view.
export default function FlipHeading({ as = 'h2', children, className = '', delay = 0, ...rest }) {
  const Tag = motion[as];
  const text = String(children);
  const words = text.split(' ');
  return (
    <Tag
      className={`flip-heading ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
      {...rest}
    >
      {words.map((w, i) => (
        <span className="fh-wrap" key={`${w}-${i}`} aria-hidden="true">
          <motion.span
            className="fh-word"
            style={{ transformPerspective: 600 }}
            variants={{
              hidden: { rotateX: -88, y: '45%', opacity: 0 },
              show: { rotateX: 0, y: '0%', opacity: 1, transition: { delay: delay + i * 0.07, type: 'spring', stiffness: 190, damping: 19 } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
