import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Ornament from '../components/Ornament';
import Countdown from '../components/Countdown';
import { couple, wedding, hero, timeline, faqs } from '../data/site';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero__media">
          <img src="/photos/p179.jpg" alt="Sara and Michael in a sunlit Pacific Northwest forest" fetchPriority="high" />
          <div className="hero__scrim" />
        </div>

        <div className="hero__content wrap">
          <Reveal as="p" className="hero__eyebrow" delay={200}>{hero.eyebrow}</Reveal>
          <Reveal as="h1" className="display hero__names" delay={340}>
            {couple.her}
            <em> &amp; </em>
            {couple.him}
          </Reveal>
          <Reveal className="hero__meta" delay={520}>
            <span>{wedding.dateLong}</span>
            <i aria-hidden="true" />
            <span>{wedding.venueShort}</span>
          </Reveal>
        </div>

        <div className="hero__cue" aria-hidden="true"><span /></div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="section wrap">
        <div className="intro">
          <Reveal className="intro__date">
            <span className="intro__day">{wedding.dateStacked.day}</span>
            <span className="intro__big">{wedding.dateStacked.date}</span>
            <span className="intro__year">{wedding.dateStacked.year}</span>
          </Reveal>

          <div className="intro__text">
            <Reveal as="p" className="lede lede--wide">{hero.intro}</Reveal>
            <Reveal delay={140}>
              <Link to="/our-story" className="btn btn--ghost intro__btn">Read our story</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- KEY FACTS ---------- */}
      <section className="section section--tight section--paper2">
        <div className="wrap">
          <div className="facts">
            {[
              { k: 'When', v: wedding.dateLong, s: `Arrive by ${wedding.arrival} · Ceremony ${wedding.ceremony}` },
              { k: 'Where', v: wedding.venue, s: `${wedding.address}, ${wedding.cityState}` },
              { k: 'Attire', v: wedding.attire, s: 'Dress like the castle deserves it' },
            ].map((f, i) => (
              <Reveal className="fact" key={f.k} delay={i * 110}>
                <p className="eyebrow eyebrow--wine">{f.k}</p>
                <p className="fact__v">{f.v}</p>
                <p className="fact__s">{f.s}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="facts__cta" delay={260}>
            <a className="btn btn--ghost" href={wedding.mapsUrl} target="_blank" rel="noreferrer">Open in maps</a>
            <a className="btn btn--ghost" href={calendarHref()} download="sara-and-michael.ics">Add to calendar</a>
          </Reveal>
        </div>
      </section>

      {/* ---------- COUNTDOWN ---------- */}
      <section className="section section--tight countdown-band">
        <div className="wrap center">
          <Reveal as="p" className="eyebrow" style={{ color: 'rgba(246,244,236,0.55)' }}>Counting down</Reveal>
          <Reveal delay={120}><Countdown /></Reveal>
        </div>
      </section>

      {/* ---------- GALLERY STRIP ---------- */}
      <section className="strip">
        {['p119.jpg', 'p133.jpg', 'p159.jpg', 'p187.jpg'].map((p, i) => (
          <Reveal className="frame strip__i" variant="img" key={p} delay={i * 90}>
            <img src={`/photos/${p}`} alt="" loading="lazy" />
          </Reveal>
        ))}
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="section wrap" id="timeline">
        <Reveal className="center">
          <p className="eyebrow eyebrow--wine">The evening</p>
          <h2 className="h2 sec__title">How the day unfolds</h2>
          <Ornament className="sec__orn" />
        </Reveal>

        <ol className="tl">
          {timeline.map((t, i) => (
            <Reveal as="li" className="tl__row" key={t.time} delay={i * 80}>
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

      {/* ---------- RSVP BANNER ---------- */}
      <section className="banner">
        <div className="banner__media">
          <img src="/photos/p101.jpg" alt="Sara and Michael embracing in an open field" loading="lazy" />
        </div>
        <div className="banner__body">
          <Reveal>
            <p className="eyebrow" style={{ color: 'rgba(246,244,236,0.55)' }}>Will you be there?</p>
            <h2 className="h2 banner__title">We’d love to know<br />if you can join us</h2>
            <p className="body banner__note">Kindly reply by {'March 21, 2027'}.</p>
            <Link to="/rsvp" className="btn btn--light banner__btn">RSVP now</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Faq />
    </>
  );
}

/* --- FAQ accordion --- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section wrap wrap--narrow" id="faq">
      <Reveal className="center">
        <p className="eyebrow eyebrow--wine">Good to know</p>
        <h2 className="h2 sec__title">Questions &amp; answers</h2>
        <Ornament className="sec__orn" />
      </Reveal>

      <div className="acc">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 55}>
              <div className={`acc__item ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="acc__q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="acc__a" hidden={!isOpen}>
                  <p className="body">{f.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* Builds a downloadable calendar file on the fly */
function calendarHref() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sara and Michael//Wedding//EN',
    'BEGIN:VEVENT',
    `UID:sara-michael-${wedding.calStart}@wedding`,
    `DTSTAMP:${wedding.calStart}Z`,
    `DTSTART;TZID=America/Los_Angeles:${wedding.calStart}`,
    `DTEND;TZID=America/Los_Angeles:${wedding.calEnd}`,
    `SUMMARY:${couple.herFull} & ${couple.himFull} — Wedding`,
    `LOCATION:${wedding.venue}\\, ${wedding.address}\\, ${wedding.cityState}`,
    `DESCRIPTION:Arrive by ${wedding.arrival}. Ceremony begins at ${wedding.ceremony}. Attire: ${wedding.attire}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
