import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import Ornament from '../components/Ornament';
import { registry, funds, couple } from '../data/site';

export default function Registry() {
  const liveLinks = registry.links.filter((l) => l.url && l.url.trim());
  const liveFunds = funds.items.filter((f) => f.url && f.url.trim());

  return (
    <>
      <PageHead
        eyebrow="If you insist"
        title="Registry"
        lede={registry.note}
      />

      {/* ---------- The registry proper ---------- */}
      <section className="section wrap wrap--narrow" style={{ paddingTop: 0 }}>
        {liveLinks.length > 0 ? (
          <div className="reg">
            {liveLinks.map((l, i) => (
              <Reveal key={l.name} delay={i * 110}>
                <a className="reg__row" href={l.url} target="_blank" rel="noreferrer">
                  <span className="reg__i" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="reg__mid">
                    <span className="reg__n">{l.name}</span>
                    <span className="reg__d">{l.desc}</span>
                  </span>
                  <span className="reg__arrow" aria-hidden="true">→</span>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="center">
            <p className="body" style={{ marginInline: 'auto' }}>
              Our registry is being put together and will appear here soon.
            </p>
          </Reveal>
        )}
      </section>

      {/* ---------- The fund — deliberately its own thing ---------- */}
      <section className="section fundband">
        <div className="wrap">
          <Reveal className="center">
            <p className="eyebrow fundband__eyebrow">{funds.eyebrow}</p>
            <h2 className="h2 sec__title fundband__title">{funds.title}</h2>
            <p className="body fundband__note">{funds.note}</p>
            <Ornament className="sec__orn fundband__orn" />
          </Reveal>

          {liveFunds.length > 0 ? (
            <>
              <div className="funds">
                {liveFunds.map((f, i) => (
                  <Reveal className="fund" key={f.name} delay={i * 120}>
                    <span className="fund__i" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="fund__n">{f.name}</h3>
                    <p className="body body--tight fund__d">{f.desc}</p>
                    <a className="btn btn--light fund__btn" href={f.url} target="_blank" rel="noreferrer">
                      Contribute
                    </a>
                  </Reveal>
                ))}
              </div>
              <Reveal as="p" className="fundband__foot" delay={280}>{funds.footnote}</Reveal>
            </>
          ) : (
            <Reveal className="center">
              <p className="body fundband__note">
                The fund is being set up and will appear here shortly.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Sign off ---------- */}
      <section className="section wrap wrap--narrow">
        <Reveal className="reg__photo frame frame--pano" variant="img">
          <img src="/photos/p135.jpg" alt="Sara and Michael holding each other" loading="lazy" />
        </Reveal>

        <Reveal className="reg__end center" delay={160}>
          <p className="lede" style={{ marginInline: 'auto' }}>
            <span className="script">Thank you.</span> Genuinely — your being there is the gift.
          </p>
          <p className="eyebrow" style={{ marginTop: '1.8rem' }}>{couple.monogram}</p>
        </Reveal>
      </section>
    </>
  );
}
