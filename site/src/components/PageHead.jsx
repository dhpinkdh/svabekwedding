import Reveal from './Reveal';
import Ornament from './Ornament';

export default function PageHead({ eyebrow, title, lede, image, imageAlt = '' }) {
  return (
    <header className="phead">
      <div className="wrap center">
        <Reveal as="p" className="eyebrow eyebrow--wine">{eyebrow}</Reveal>
        <Reveal as="h1" className="h1 phead__title" delay={110}>{title}</Reveal>
        {lede && <Reveal as="p" className="body phead__lede" delay={200}>{lede}</Reveal>}
        <Reveal delay={280}><Ornament className="phead__orn" /></Reveal>
      </div>
      {image && (
        <Reveal className="phead__media frame frame--wide" variant="img" delay={120}>
          <img src={image} alt={imageAlt} />
        </Reveal>
      )}
    </header>
  );
}
