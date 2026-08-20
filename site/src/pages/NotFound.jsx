import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

export default function NotFound() {
  return (
    <section className="section wrap center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
      <Reveal>
        <p className="eyebrow eyebrow--wine">Page not found</p>
        <h1 className="h1" style={{ marginTop: '1rem' }}>That page wandered off</h1>
        <p className="body" style={{ marginInline: 'auto', marginTop: '1.4rem' }}>
          Let’s get you back to somewhere useful.
        </p>
        <Link to="/" className="btn" style={{ marginTop: '2.4rem' }}>Back home</Link>
      </Reveal>
    </section>
  );
}
