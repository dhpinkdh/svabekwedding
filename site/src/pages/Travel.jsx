import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import Ornament from '../components/Ornament';
import Parallax from '../components/Parallax';
import { shuttle, hotels, airports, travelNotes, wedding } from '../data/site';

export default function Travel() {
  return (
    <>
      <PageHead
        eyebrow="Getting here & staying over"
        title={<>Accommodation<br />&amp; Travel</>}
        lede="Most of you are coming a long way, and we’re grateful. Here’s everything you need to make the trip an easy one."
        image="/photos/p103.jpg"
        imageAlt="Sara and Michael in a golden autumn field"
      />

      {/* Shuttle */}
      <section className="section wrap">
        <div className="shuttle">
          <Reveal className="shuttle__head">
            <p className="eyebrow eyebrow--wine">Start here</p>
            <h2 className="h2 sec__title">The shuttle</h2>
            <p className="body" style={{ marginTop: '1.4rem' }}>{shuttle.note}</p>
          </Reveal>

          <Reveal className="shuttle__times" delay={140}>
            <div className="shuttle__row">
              <span className="shuttle__t">{shuttle.toVenue}</span>
              <span className="shuttle__l">Hotels → {wedding.venueShort}</span>
            </div>
            <div className="shuttle__rule" />
            <div className="shuttle__row">
              <span className="shuttle__t">{shuttle.toHotels}</span>
              <span className="shuttle__l">{wedding.venueShort} → Hotels</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hotels */}
      <section className="section section--paper2">
        <div className="wrap">
          <Reveal className="center">
            <p className="eyebrow eyebrow--wine">Where to stay</p>
            <h2 className="h2 sec__title">Two hotels on the shuttle route</h2>
            <Ornament className="sec__orn" />
          </Reveal>

          <div className="hotels">
            {hotels.map((h, i) => (
              <Reveal className={`hotel ${h.recommended ? 'is-rec' : ''}`} key={h.name} delay={i * 130}>
                {h.recommended && <span className="hotel__flag">Our pick</span>}
                <h3 className="hotel__n">{h.name}</h3>
                <p className="hotel__sub">{h.sub}</p>
                <dl className="hotel__dl">
                  <div><dt>Address</dt><dd>{h.address}</dd></div>
                  <div><dt>Phone</dt><dd><a className="link-u" href={h.phoneHref}>{h.phone}</a></dd></div>
                </dl>
                <p className="body body--tight hotel__note">{h.note}</p>
                <a className="btn btn--ghost hotel__btn" href={h.url} target="_blank" rel="noreferrer">Book a room</a>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="body body--tight hotels__tip" delay={260}>
            Booking early is wise — May is a busy month in the Pacific Northwest. Mention the Stewart–Svabek wedding when you call.
          </Reveal>
        </div>
      </section>

      <section className="bleed bleed--short">
        <Parallax src="/photos/p150.jpg" strength={55} />
      </section>

      {/* Flights */}
      <section className="section wrap">
        <Reveal className="center">
          <p className="eyebrow eyebrow--wine">Flying in</p>
          <h2 className="h2 sec__title">Airports</h2>
          <Ornament className="sec__orn" />
        </Reveal>

        <div className="airports">
          {airports.map((a, i) => (
            <Reveal className="airport" key={a.name} delay={i * 110}>
              <h3 className="airport__n">{a.name}</h3>
              <p className="body body--tight">{a.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="section section--tight wrap">
        <div className="notes notes--3">
          {travelNotes.map((n, i) => (
            <Reveal className="note" key={n.label} delay={i * 90}>
              <span className="note__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="note__t">{n.label}</h3>
              <p className="body body--tight">{n.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
