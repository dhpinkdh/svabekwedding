import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { couple, wedding } from '../data/site';

const pages = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/location', label: 'Location' },
  { to: '/travel', label: 'Accommodation & Travel' },
  { to: '/registry', label: 'Registry' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Pages whose hero is a dark photo need light nav colours until it turns solid
  const overDark = pathname === '/' || pathname === '/our-story';

  /* Publish the nav's real height so the hero can tuck underneath it exactly.
     Measured rather than hardcoded — fonts and wrapping change it. */
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const publish = () => {
      document.documentElement.style.setProperty(
        '--nav-h', `${Math.round(el.getBoundingClientRect().height)}px`
      );
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    document.fonts?.ready.then(publish);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <div className="announce">
        <p className="announce__info">
          <span>{wedding.dateLong}</span>
          <span className="announce__dot" aria-hidden="true">·</span>
          <span>{wedding.venueShort}</span>
          <span className="announce__dot announce__dot--wide" aria-hidden="true">·</span>
          <span className="announce__city">{wedding.cityState}</span>
        </p>
        <Link to="/rsvp" className="announce__rsvp">RSVP</Link>
      </div>

      <header
        ref={navRef}
        className={`nav ${solid ? 'is-solid' : ''} ${overDark ? 'nav--over' : ''} ${open ? 'is-menu' : ''}`}
      >
        <div className="nav__inner">
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span /><span />
          </button>

          <nav className="nav__links" aria-label="Main">
            {pages.map((p) => (
              <NavLink key={p.to} to={p.to} end={p.to === '/'} className="nav__link">
                {p.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className="nav__mark" aria-label="Home">{couple.monogram}</Link>
        </div>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="drawer__nav" aria-label="Mobile">
          {[...pages, { to: '/rsvp', label: 'RSVP' }].map((p, i) => (
            <NavLink
              key={p.to}
              to={p.to}
              end={p.to === '/'}
              className="drawer__link"
              style={{ transitionDelay: `${open ? 90 + i * 55 : 0}ms` }}
              tabIndex={open ? 0 : -1}
            >
              <em>{String(i + 1).padStart(2, '0')}</em>
              {p.label}
            </NavLink>
          ))}
        </nav>
        <div className="drawer__foot">
          <p className="eyebrow">{wedding.dateShort}</p>
          <p className="body body--tight">{wedding.venue}<br />{wedding.address}, {wedding.cityState}</p>
        </div>
      </div>
    </>
  );
}
