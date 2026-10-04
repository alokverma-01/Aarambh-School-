import { img } from '../data/images';

export default function Img({ k, alt, sizes = '100vw', widths = [480, 800, 1200, 1600], priority = false, className, ...rest }) {
  const src = img(k, widths[Math.min(2, widths.length - 1)]);
  const local = src.startsWith('/');
  return (
    <img
      src={src}
      srcSet={local ? undefined : widths.map((w) => `${img(k, w)} ${w}w`).join(', ')}
      sizes={local ? undefined : sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={priority ? 'high' : undefined}
      className={className}
      draggable="false"
      {...rest}
    />
  );
}
