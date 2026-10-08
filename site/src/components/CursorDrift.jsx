import { useEffect } from 'react';

/*
 * Photos drift a few pixels in response to the cursor, for a quiet sense of depth.
 *
 * This only publishes two numbers, --mx and --my (each -1..1, eased), on <html>.
 * styles.css decides which images move and by how much — see "CURSOR DRIFT".
 * Off on touch screens and for anyone who prefers reduced motion.
 */
export default function CursorDrift() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;

    let tx = 0, ty = 0;   // where the cursor is
    let x = 0, y = 0;     // where the images are
    let raf = null;
    let on = false;

    const tick = () => {
      // ease toward the cursor; a low factor keeps it soft and unhurried
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      root.style.setProperty('--mx', x.toFixed(4));
      root.style.setProperty('--my', y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(tick) : null;
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      wake();
    };
    const onLeave = () => { tx = 0; ty = 0; wake(); };

    const start = () => {
      if (on) return;
      on = true;
      root.classList.add('has-drift');
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    };
    const stop = () => {
      if (!on) return;
      on = false;
      root.classList.remove('has-drift');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      tx = ty = x = y = 0;
      root.style.removeProperty('--mx');
      root.style.removeProperty('--my');
    };
    const sync = () => (fine.matches && !calm.matches ? start() : stop());

    sync();
    fine.addEventListener('change', sync);
    calm.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
      stop();
    };
  }, []);

  return null;
}
