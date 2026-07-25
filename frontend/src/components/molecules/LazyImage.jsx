import { useState } from 'react';
import { clsx } from 'clsx';

/**
 * LazyImage — Image with fade-in after load.
 *
 * Wraps a standard `<img>` with an opacity transition that fires
 * once the image has finished loading, preventing a harsh flash
 * of unstyled content (FOUC) on slow connections.
 *
 * @param {object} props
 * @param {string}  props.src
 * @param {string}  props.alt
 * @param {number}  [props.width]
 * @param {number}  [props.height]
 * @param {string}  [props.className]
 * @param {'lazy'|'eager'} [props.loading='lazy']
 * @param {'async'|'sync'} [props.decoding='async']
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={clsx(
        'transition-opacity duration-500 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  );
}
