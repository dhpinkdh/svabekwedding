import { Link } from 'react-router-dom';
import { couple, wedding, credits } from '../data/site';
import Ornament from './Ornament';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Ornament className="foot__orn" />

        <p className="foot__names">
          {couple.herFull} <em>&amp;</em> {couple.himFull}
        </p>
        <p className="foot__date">{wedding.dateShort}</p>

        <nav className="foot__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/location">Location</Link>
          <Link to="/travel">Accommodation &amp; Travel</Link>
          <Link to="/rsvp">RSVP</Link>
          <Link to="/registry">Registry</Link>
        </nav>

        <div className="foot__base">
          <p>{wedding.venue} · {wedding.cityState}</p>
          {credits.photographer && <p>Photography by {credits.photographer}</p>}
        </div>
      </div>
    </footer>
  );
}
