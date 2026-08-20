import { useState } from 'react';
import Reveal from '../components/Reveal';
import Ornament from '../components/Ornament';
import { RSVP_ENDPOINT } from '../data/rsvp-config';
import { wedding, rsvpDeadline, couple } from '../data/site';

const BLANK = {
  firstName: '', lastName: '', email: '', phone: '',
  attending: '', guests: '', children: '', guestNames: '',
  dietary: '', shuttle: '', song: '', note: '',
};

export default function Rsvp() {
  const [f, setF] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | fallback

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const going = f.attending === 'yes';

  function validate() {
    const e = {};
    if (!f.firstName.trim()) e.firstName = 'Please add your first name';
    if (!f.lastName.trim()) e.lastName = 'Please add your last name';
    if (!f.email.trim()) e.email = 'We need an email to confirm';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'That email looks incomplete';
    if (!f.attending) e.attending = 'Let us know if you can make it';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      document.querySelector('.field.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!RSVP_ENDPOINT) { setState('fallback'); return; }

    setState('sending');
    try {
      const data = new FormData();
      Object.entries(f).forEach(([k, v]) => data.append(k, v));
      data.append('submittedAt', new Date().toISOString());

      await fetch(RSVP_ENDPOINT, { method: 'POST', mode: 'no-cors', body: data });
      setState('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setState('fallback');
    }
  }

  if (state === 'done') return <ThankYou attending={going} name={f.firstName} />;

  return (
    <>
      <header className="phead">
        <div className="wrap center">
          <Reveal as="p" className="eyebrow eyebrow--wine">Kindly reply by {rsvpDeadline}</Reveal>
          <Reveal as="h1" className="h1 phead__title" delay={110}>RSVP</Reveal>
          <Reveal as="p" className="body phead__lede" delay={200}>
            {wedding.dateLong} · {wedding.venue} · {wedding.cityState}.
            Please fill this in for each guest named on your invitation.
          </Reveal>
          <Reveal delay={280}><Ornament className="phead__orn" /></Reveal>
        </div>
      </header>

      <section className="section wrap" style={{ paddingTop: 'clamp(1rem, 3vw, 2rem)' }}>
        <div className="rsvp">
          <Reveal className="rsvp__aside">
            <div className="frame frame--port">
              <img src="/photos/p160.jpg" alt="" loading="lazy" />
            </div>
            <div className="rsvp__facts">
              <div><span className="eyebrow">Arrive</span><p>{wedding.arrival}</p></div>
              <div><span className="eyebrow">Ceremony</span><p>{wedding.ceremony}</p></div>
              <div><span className="eyebrow">Ends</span><p>{wedding.endTime}</p></div>
              <div><span className="eyebrow">Attire</span><p>{wedding.attire}</p></div>
            </div>
          </Reveal>

          <Reveal className="rsvp__formwrap" delay={120}>
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="form__pair">
                <Field id="firstName" label="First name" value={f.firstName} onChange={set('firstName')} error={errors.firstName} required />
                <Field id="lastName" label="Last name" value={f.lastName} onChange={set('lastName')} error={errors.lastName} required />
              </div>

              <div className="form__pair">
                <Field id="email" label="Email" type="email" value={f.email} onChange={set('email')} error={errors.email} required />
                <Field id="phone" label="Phone" type="tel" value={f.phone} onChange={set('phone')} hint="Optional" />
              </div>

              <fieldset className={`field field--choice ${errors.attending ? 'has-error' : ''}`}>
                <legend className="label">Will you be joining us? <em>*</em></legend>
                <div className="choices">
                  <Choice name="attending" value="yes" checked={f.attending === 'yes'} onChange={set('attending')}>
                    Joyfully accepts
                  </Choice>
                  <Choice name="attending" value="no" checked={f.attending === 'no'} onChange={set('attending')}>
                    Regretfully declines
                  </Choice>
                </div>
                {errors.attending && <p className="err">{errors.attending}</p>}
              </fieldset>

              {going && (
                <div className="form__reveal">
                  <div className="form__pair">
                    <Field id="guests" label="Total in your party" type="number" min="1" max="12" value={f.guests} onChange={set('guests')} hint="Including yourself and any children" />
                    <Field id="children" label="How many are children?" type="number" min="0" max="8" value={f.children} onChange={set('children')} hint="Little ones are very welcome — 0 if none" />
                  </div>

                  <Field id="guestNames" label="Names of everyone in your party" value={f.guestNames} onChange={set('guestNames')} hint="So we can get the place cards right" />

                  <Field id="dietary" label="Dietary requirements or allergies" textarea rows={3} value={f.dietary} onChange={set('dietary')} hint="Vegetarian, vegan, gluten-free, allergies — anything at all" />

                  <fieldset className="field field--choice">
                    <legend className="label">Will you use the hotel shuttle?</legend>
                    <div className="choices">
                      <Choice name="shuttle" value="yes" checked={f.shuttle === 'yes'} onChange={set('shuttle')}>Yes please</Choice>
                      <Choice name="shuttle" value="no" checked={f.shuttle === 'no'} onChange={set('shuttle')}>We’ll drive</Choice>
                      <Choice name="shuttle" value="unsure" checked={f.shuttle === 'unsure'} onChange={set('shuttle')}>Not sure yet</Choice>
                    </div>
                  </fieldset>

                  <Field id="song" label="A song that will get you dancing" value={f.song} onChange={set('song')} hint="We’re building the playlist" />
                </div>
              )}

              <Field id="note" label={going ? 'Anything else we should know?' : 'Leave us a note'} textarea rows={4} value={f.note} onChange={set('note')} hint="Optional" />

              {state === 'fallback' && <Fallback answers={f} />}

              <div className="form__submit">
                <button className="btn" type="submit" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send our reply'}
                </button>
                <p className="form__deadline">Please reply by {rsvpDeadline}</p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- pieces ---------- */

function Field({ id, label, hint, error, textarea, required, ...rest }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label className="label" htmlFor={id}>
        {label} {required && <em>*</em>}
      </label>
      <Tag id={id} name={id} className="input" aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} {...rest} />
      {error ? (
        <p className="err" id={`${id}-err`}>{error}</p>
      ) : hint ? (
        <p className="hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  );
}

function Choice({ name, value, checked, onChange, children }) {
  return (
    <label className={`choice ${checked ? 'is-on' : ''}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span className="choice__dot" aria-hidden="true" />
      <span>{children}</span>
    </label>
  );
}

function ThankYou({ attending, name }) {
  return (
    <section className="section wrap center thanks">
      <Reveal>
        <Ornament />
        <p className="eyebrow eyebrow--wine" style={{ marginTop: '2.4rem' }}>Reply received</p>
        <h1 className="h1" style={{ marginTop: '1rem' }}>
          {attending ? <>Wonderful.<br />See you there{name ? `, ${name}` : ''}.</> : <>Thank you<br />for letting us know.</>}
        </h1>
        <p className="body" style={{ marginInline: 'auto', marginTop: '1.8rem' }}>
          {attending
            ? `We’ve got you down for ${wedding.dateLong} at ${wedding.venue}. We’ll be in touch closer to the day with the final details — and don’t forget, arrive by ${wedding.arrival}.`
            : 'We’ll miss you, and we completely understand. We’ll raise a glass to you on the night.'}
        </p>
        <p className="lede" style={{ marginInline: 'auto', marginTop: '2.6rem' }}>
          <span className="script">With love,</span><br />{couple.her} &amp; {couple.him}
        </p>
      </Reveal>
    </section>
  );
}

function summarise(f) {
  return [
    `Name: ${f.firstName} ${f.lastName}`,
    `Email: ${f.email}`,
    f.phone && `Phone: ${f.phone}`,
    `Attending: ${f.attending === 'yes' ? 'Yes' : 'No'}`,
    f.guests && `Party size: ${f.guests}`,
    f.children && `Children: ${f.children}`,
    f.guestNames && `Guests: ${f.guestNames}`,
    f.dietary && `Dietary: ${f.dietary}`,
    f.shuttle && `Shuttle: ${f.shuttle}`,
    f.song && `Song request: ${f.song}`,
    f.note && `Note: ${f.note}`,
  ].filter(Boolean).join('\n');
}

/* Shown only if the reply can't be sent automatically. Rather than
   publishing an email address on a public page, we hand the guest
   their own answers to pass on however they normally reach us. */
function Fallback({ answers }) {
  const [copied, setCopied] = useState(false);
  const text = summarise(answers);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  }

  return (
    <div className="notice">
      <p className="body body--tight">
        Sorry — we couldn’t send that automatically. Nothing is lost: copy your
        answers below and send them to Sara or Michael however you normally
        would, and we’ll add you to the list ourselves.
      </p>
      <pre className="notice__pre">{text}</pre>
      <button type="button" className="btn btn--ghost notice__btn" onClick={copy}>
        {copied ? 'Copied ✓' : 'Copy my answers'}
      </button>
    </div>
  );
}
