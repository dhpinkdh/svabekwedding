import { useEffect, useRef, useState } from 'react';

/**
 * The Thornewood illustration is a fine pen-and-ink drawing, so it reveals
 * the way ink actually lands: a soft edge sweeping across the page, with the
 * whole drawing settling upward as it arrives.
 */
export default function CastleReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`castle ${shown ? 'is-in' : ''}`} ref={ref}>
      <div className="castle__sky" aria-hidden="true" />
      <img
        className="castle__img"
        src="/castle.svg"
        alt="Illustration of Thornewood Castle, an Elizabethan manor with tall chimneys and a stone archway"
      />
      <div className="castle__ground" aria-hidden="true" />
    </div>
  );
}
