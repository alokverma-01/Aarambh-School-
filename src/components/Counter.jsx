import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export default function Counter({ value, suffix = '', prefix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(v) });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{prefix}{Math.round(n).toLocaleString('en-IN')}{suffix}</span>
      <span className="sr-only">{prefix}{value.toLocaleString('en-IN')}{suffix}</span>
    </span>
  );
}
