import { useEffect, useRef } from 'react';

/* Gently drifts an image as the page scrolls. Strength is in pixels. */
export default function Parallax({ src, alt = '', strength = 40, className = '' }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = null;
    let active = false;

    const update = () => {
      raf = null;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      // -1 (below the fold) .. 1 (above the fold)
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      img.style.transform = `translate3d(0, ${(p * strength).toFixed(2)}px, 0) scale(1.14)`;
    };

    const onScroll = () => { if (!raf && active) raf = requestAnimationFrame(update); };

    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (active) onScroll();
    }, { rootMargin: '200px 0px' });

    io.observe(wrap);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div className={`plx ${className}`} ref={wrapRef}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" />
    </div>
  );
}
