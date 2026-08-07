import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Layer } from '../types';

export const useFlyerAnimation = (layers: Layer[]) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const playAnimation = useCallback(() => {
    if (!containerRef.current) return;

    // Reset current active GSAP tweens
    gsap.killTweensOf('.anim-layer');

    layers.forEach((layer) => {
      const el = containerRef.current?.querySelector(`#layer-${layer.id}`);
      if (!el) return;

      if (layer.effect === 'bounce') {
        gsap.fromTo(
          el,
          { y: -50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, delay: layer.delay, ease: 'bounce.out' }
        );
      } else if (layer.effect === 'glow') {
        gsap.fromTo(
          el,
          { opacity: 0, filter: 'drop-shadow(0px 0px 0px rgba(234, 179, 8, 0))' },
          {
            opacity: 1,
            filter: 'drop-shadow(0px 0px 15px rgba(234, 179, 8, 0.9))',
            duration: 0.8,
            delay: layer.delay,
            repeat: -1,
            yoyo: true,
          }
        );
      } else if (layer.effect === 'drift') {
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, delay: layer.delay, ease: 'power2.out' }
        );
      } else if (layer.effect === 'shimmer') {
        gsap.fromTo(
          el,
          { opacity: 0.3, scale: 0.95 },
          { opacity: 1, scale: 1.05, duration: 0.6, delay: layer.delay, repeat: 3, yoyo: true }
        );
      }
    });
  }, [layers]);

  return { containerRef, playAnimation };
};

