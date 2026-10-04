import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Doodle from '../components/Doodles';
import { useTitle } from '../lib/hooks';

export default function NotFound() {
  useTitle('Page not found');
  return (
    <section className="section notfound">
      <div className="container">
        <motion.div className="nf-plane" animate={{ x: [0, 40, -20, 0], y: [0, -20, 10, 0], rotate: [0, 8, -6, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <Doodle kind="plane" size={120} color="var(--jal)" float={false} />
        </motion.div>
        <h1>This page has gone on a school trip.</h1>
        <p className="lead">The link may be old or mistyped. Try one of these instead.</p>
        <div className="nf-actions">
          <Link className="btn btn--ink" to="/">
            Go to the home page
          </Link>
          <Link className="btn" to="/notices">
            See notices
          </Link>
          <Link className="btn" to="/contact">
            Contact the office
          </Link>
        </div>
      </div>
    </section>
  );
}
