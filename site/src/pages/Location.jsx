import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Ornament from '../components/Ornament';
import { wedding, location, timeline } from '../data/site';

export default function Location() {
  return (
    <>
      <PageHead
        eyebrow="Where we’ll be"
        title={<>Thornewood<br />Castle</>}
        lede={location.intro}
        image="/photos/p149.jpg"
        imageAlt="Sara and Michael beside a lake in Washington"
      />

      {/* Address card */}
      <section className="section wrap">
        <div className="addr">
          <Reveal className="addr__left">
            <p className="eyebrow eyebrow--wine">The address</p>
            <p className="addr__name">{wedding.venue}</p>
            <p className="addr__lines">
              {wedding.address}<br />{wedding.cityState}
            </p>
            <div className="addr__btns">
              <a className="btn" href={wedding.mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
              <Link className="btn btn--ghost" to="/travel">Where to stay</Link>
            </div>
          </Reveal>

          <Reveal className="addr__map frame" variant="img" delay={140}>
            <iframe
              title="Map showing Thornewood Castle"
              src="https://www.google.com/maps?q=Thornewood+Castle+Inn+%26+Gardens,+8601+N+Thorne+Lane+SW,+Lakewood,+WA+98498&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      {/* A little history */}
      <section className="section section--tight wrap">
        <Reveal className="center">
          <p className="eyebrow eyebrow--wine">A little history</p>
          <h2 className="h2 sec__title">The castle that crossed an ocean</h2>
          <Ornament className="sec__orn" />
        </Reveal>
        <div className="lore">
          {location.lore.map((l, i) => (
            <Reveal className="lore__c" key={l.t} delay={i * 110}>
              <span className="lore__n">{l.n}</span>
              <h3 className="lore__t">{l.t}</h3>
              <p className="body body--tight">{l.b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Practical notes */}
      <section className="section section--paper2">
        <div className="wrap">
          <Reveal className="center">
            <p className="eyebrow eyebrow--wine">Before you come</p>
            <h2 className="h2 sec__title">Worth knowing</h2>
            <Ornament className="sec__orn" />
          </Reveal>

          <div className="notes">
            {location.facts.map((f, i) => (
              <Reveal className="note" key={f.label} delay={i * 90}>
                <span className="note__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="note__t">{f.label}</h3>
                <p className="body body--tight">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed image */}
      <section className="bleed">
        <Parallax src="/photos/p163.jpg" strength={60} />
      </section>

      {/* Timeline repeated for convenience */}
      <section className="section wrap">
        <Reveal className="center">
          <p className="eyebrow eyebrow--wine">On the night</p>
          <h2 className="h2 sec__title">The running order</h2>
          <Ornament className="sec__orn" />
        </Reveal>
        <ol className="tl">
          {timeline.map((t, i) => (
            <Reveal as="li" className="tl__row" key={t.time} delay={i * 70}>
              <span className="tl__time">{t.time}</span>
              <span className="tl__dot" aria-hidden="true" />
              <div className="tl__body">
                <h3 className="tl__title">{t.title}</h3>
                <p className="body body--tight">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
