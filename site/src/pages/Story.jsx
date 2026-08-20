import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Ornament from '../components/Ornament';
import { story, couple, credits } from '../data/site';

export default function Story() {
  const progress = useScrollProgress();

  return (
    <>
      {/* thin progress bar so guests know how far through they are */}
      <div className="prog" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>

      <header className="story-hero">
        <Parallax src="/photos/p188.jpg" strength={70} className="story-hero__bg" />
        <div className="story-hero__scrim" />
        <div className="wrap story-hero__in">
          <Reveal as="p" className="eyebrow" style={{ color: 'rgba(251,249,242,0.7)' }} delay={150}>
            Two and a half years
          </Reveal>
          <Reveal as="h1" className="display story-hero__t" delay={260}>Our&nbsp;<em>Story</em></Reveal>
        </div>
      </header>

      <section className="section wrap wrap--narrow center">
        <Reveal as="p" className="lede lede--wide" style={{ marginInline: 'auto' }}>
          {story.intro}
        </Reveal>
        <Reveal delay={140}><Ornament className="sec__orn" /></Reveal>
      </section>

      <div className="chapters">
        {story.chapters.map((c, i) => (
          <Chapter key={c.title} chapter={c} index={i} />
        ))}
      </div>

      <section className="section center wrap">
        <Reveal>
          <Ornament />
          <p className="lede" style={{ marginInline: 'auto', marginTop: '2.4rem' }}>
            <span className="script">That’s us so far.</span> The next chapter has all of you in it.
          </p>
          <Link to="/rsvp" className="btn" style={{ marginTop: '2.6rem' }}>RSVP</Link>
          {credits.photographer && (
            <p className="body body--tight" style={{ marginTop: '3rem', color: 'var(--ink-3)', marginInline: 'auto' }}>
              Photographs by {credits.photographer}
            </p>
          )}
        </Reveal>
      </section>
    </>
  );
}

function Chapter({ chapter, index }) {
  const { year, kicker, title, body, photos, layout } = chapter;
  const num = String(index + 1).padStart(2, '0');

  if (layout === 'wide') {
    return (
      <section className="chap chap--wide">
        <div className="wrap">
          <Reveal className="chap__head center">
            {year && <span className="chap__year">{year}</span>}
            <p className="eyebrow eyebrow--wine">{kicker}</p>
            <h2 className="h2 chap__title">{title}</h2>
          </Reveal>
          <div className="chap__copy chap__copy--center">
            {body.map((p, i) => (
              <Reveal as="p" className="body" key={i} delay={i * 90}>{p}</Reveal>
            ))}
          </div>
          <div className="chap__wide-imgs">
            {photos.map((p, i) => (
              <Reveal className="frame frame--wide" variant="img" key={p} delay={i * 130}>
                <img src={`/photos/${p}`} alt={`${couple.her} and ${couple.him} — ${title}`} loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const flip = layout === 'left';

  return (
    <section className={`chap ${flip ? 'chap--flip' : ''}`}>
      <div className="wrap chap__grid">
        <div className="chap__text">
          <Reveal>
            <span className="chap__num" aria-hidden="true">{num}</span>
            {year && <span className="chap__year">{year}</span>}
            <p className="eyebrow eyebrow--wine chap__kicker">{kicker}</p>
            <h2 className="h2 chap__title">{title}</h2>
          </Reveal>
          <div className="chap__copy">
            {body.map((p, i) => (
              <Reveal as="p" className="body" key={i} delay={120 + i * 90}>{p}</Reveal>
            ))}
          </div>
        </div>

        <div className="chap__imgs">
          <Reveal className="chap__img chap__img--a" variant="img">
            <Parallax src={`/photos/${photos[0]}`} strength={38} alt={`${couple.her} and ${couple.him} — ${title}`} />
          </Reveal>
          {photos[1] && (
            <Reveal className="chap__img chap__img--b" variant="img" delay={180}>
              <Parallax src={`/photos/${photos[1]}`} strength={22} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* 0 → 1 as the reader moves down the page */
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}
