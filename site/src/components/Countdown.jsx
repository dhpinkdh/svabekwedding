import { useEffect, useState } from 'react';

const TARGET = new Date('2027-05-21T17:00:00-07:00').getTime();

function diff() {
  const ms = TARGET - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown() {
  const [t, setT] = useState(diff);

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;

  const units = [
    ['Days', t.days],
    ['Hours', t.hours],
    ['Minutes', t.minutes],
    ['Seconds', t.seconds],
  ];

  return (
    <div className="count" role="timer" aria-label={`${t.days} days until the wedding`}>
      {units.map(([label, value], i) => (
        <div className="count__unit" key={label}>
          <span className="count__num">{String(value).padStart(2, '0')}</span>
          <span className="count__label">{label}</span>
          {i < units.length - 1 && <span className="count__sep" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
