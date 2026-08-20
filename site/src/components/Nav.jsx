import { useEffect, useState } from 'react';
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

  useEffect(() => { setOpen(false); }, [pathname]);

  // Pages whose hero is a dark photo need light nav colours until it turns solid
  const overDark = pathname === '/' || pathname === '/our-story';

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
        <span>{wedding.dateLong}</span>
        <span className="announce__dot" aria-hidden="true">·</span>
        <span>{wedding.venueShort}</span>
        <span className="announce__dot" aria-hidden="true">·</span>
        <span>{wedding.cityState}</span>
      </div>

      <header className={`nav ${solid ? 'is-solid' : ''} ${overDark ? 'nav--over' : ''} ${open ? 'is-menu' : ''}`}>
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

          <Link to="/rsvp" className="nav__rsvp">RSVP</Link>
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
