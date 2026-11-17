import { CSSProperties, useEffect, useRef, useState } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import { BrandIllustration, FallbackIllustrationKind } from './BrandIllustration';

export interface ImageSlotProps {
  src?: string;
  fallbackSrc?: string;
  fallback: FallbackIllustrationKind;
  alt: string;
  width: number;
  height: number;
  focal?: string;
  className?: string;
  imgClassName?: string;
  motionStyle?: MotionStyle;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  ratio?: string;
  disableTreatment?: boolean;
  onLoad?: () => void;
}

/**
 * Reusable ImageSlot:
 * - Shows a blurred warm cream/grey placeholder while the image is loading
 * - Falls back cleanly from `src` -> `fallbackSrc` -> on-brand SVG illustration (`BrandIllustration`)
 *   so missing or non-existent paths never show a broken-image icon
 * - Applies unified editorial treatment (slight desaturation + cream/orange duotone tint)
 *   that fades smoothly to full color on hover (disabled cleanly under prefers-reduced-motion)
 * - Supports explicit width, height, and focal point (object-position)
 */
export function ImageSlot({
  src,
  fallbackSrc,
  fallback,
  alt,
  width,
  height,
  focal = '50% 50%',
  className = '',
  imgClassName = '',
  motionStyle,
  loading = 'lazy',
  fetchPriority,
  ratio,
  disableTreatment = false,
  onLoad,
}: ImageSlotProps) {
  const [activeSrc, setActiveSrc] = useState<string | undefined>(src || fallbackSrc);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'svg'>(() =>
    src || fallbackSrc ? 'loading' : 'svg'
  );
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const initial = src || fallbackSrc;
    setActiveSrc(initial);
    setStatus(initial ? 'loading' : 'svg');
  }, [src, fallbackSrc]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0 && status === 'loading') {
      setStatus('loaded');
    }
  }, [activeSrc, status]);

  const handleLoad = () => {
    setStatus('loaded');
    onLoad?.();
  };

  const handleError = () => {
    if (fallbackSrc && activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc);
      setStatus('loading');
      return;
    }
    setStatus('svg');
    onLoad?.();
  };

  const slotStyle: CSSProperties | undefined = ratio ? { aspectRatio: ratio } : undefined;
  const imgElementStyle: CSSProperties = { objectPosition: focal };

  return (
    <div
      className={`image-slot ${
        status === 'loading' ? 'is-loading' : status === 'loaded' ? 'is-loaded' : 'is-fallback'
      } ${disableTreatment ? 'no-treatment' : ''} ${className}`.trim()}
      style={slotStyle}
    >
      {status === 'loading' && (
        <div className="image-slot-placeholder" aria-hidden="true" />
      )}

      {status === 'svg' || !activeSrc ? (
        <BrandIllustration kind={fallback} alt={alt} />
      ) : (
        <>
          {motionStyle ? (
            <motion.div className="image-slot-motion" style={motionStyle}>
              <img
                ref={imgRef}
                src={activeSrc}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                fetchPriority={fetchPriority}
                decoding="async"
                className={`image-slot-img ${imgClassName}`.trim()}
                style={imgElementStyle}
                onLoad={handleLoad}
                onError={handleError}
              />
            </motion.div>
          ) : (
            <img
              ref={imgRef}
              src={activeSrc}
              alt={alt}
              width={width}
              height={height}
              loading={loading}
              fetchPriority={fetchPriority}
              decoding="async"
              className={`image-slot-img ${imgClassName}`.trim()}
              style={imgElementStyle}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}

          {!disableTreatment && (
            <div className="image-slot-tint" aria-hidden="true" />
          )}
        </>
      )}
    </div>
  );
}
