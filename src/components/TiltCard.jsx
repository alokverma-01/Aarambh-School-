import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

// Card that tilts toward the mouse in 3D. Touch devices get a flat card.
export default function TiltCard({ as = 'div', children, className = '', max = 9, style, ...rest }) {
  const Tag = motion[as];
  const ref = useRef(null);
  const cfg = { stiffness: 220, damping: 18, mass: 0.5 };
  const rotateX = useSpring(0, cfg);
  const rotateY = useSpring(0, cfg);

  function onMove(e) {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  }
  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
