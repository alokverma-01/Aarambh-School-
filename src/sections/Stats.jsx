import { motion } from 'framer-motion';
import Counter from '../components/Counter';
import { stats } from '../data/content';

export default function Stats() {
  return (
    <section className="stats" aria-label="The school at a glance">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`stat stat--${s.tone}`}
            initial={{ opacity: 0, rotateY: -95, y: 40 }}
            whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 110, damping: 14 }}
            whileHover={{ rotate: i % 2 ? 2 : -2, y: -6 }}
            style={{ transformPerspective: 800 }}
          >
            <span className="stat-num">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="stat-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
