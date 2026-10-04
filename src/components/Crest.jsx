export default function Crest({ size = 44 }) {
  return (
    <svg className="crest" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 2.5 42.5 8.5V22c0 12.2-8.2 19.6-18.5 23.5C13.7 41.6 5.5 34.2 5.5 22V8.5L24 2.5Z" fill="#170F3D" />
      <g strokeWidth="3" strokeLinecap="round">
        <path d="M24 9v4" stroke="#FFC21A" />
        <path d="M14.5 13l2.6 2.8" stroke="#FF5A1F" />
        <path d="M33.5 13l-2.6 2.8" stroke="#5B82FF" />
        <path d="M11 22h3.6" stroke="#0FB86C" />
        <path d="M37 22h-3.6" stroke="#FF2D87" />
      </g>
      <path d="M17 24a7 7 0 0 1 14 0Z" fill="#FFC21A" />
      <path d="M12 28.5c4-1.6 8.3-1.2 12 1.2 3.7-2.4 8-2.8 12-1.2v8.2c-4-1.6-8.3-1.2-12 1.2-3.7-2.4-8-2.8-12-1.2v-8.2Z" fill="#fff" />
      <path d="M24 29.7v8.2" stroke="#170F3D" strokeWidth="1.6" />
    </svg>
  );
}
