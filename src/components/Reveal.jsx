import { motion } from 'framer-motion';

export default function Reveal({ as = 'div', children, delay = 0, y = 36, className, style, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, rotateX: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 900, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
