import Image from 'next/image';
import Link from 'next/link';
import { HeroSearch } from '@/components/HeroSearch';
import { Icon } from '@/components/Icon';
import { homepageJourneys, homepageLearnings, homepageSignals } from '@/data/homepage';
import './homepage.css';

export default function Home() {
  return <div className="hf-home">
    <section className="hero hf-hero" aria-labelledby="home-title">
      <div className="hf-hero-inner">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow hub-eyebrow">AI IM ARBEITSALLTAG</p>
          <h1 id="home-title">Finde heraus, wie AI<br className="hf-headline-break" /> deine Arbeit unterstützen kann.</h1>
          <p className="hero-description">Praxisnahe Use Cases, Erfahrungen aus der Community<br className="hf-copy-break" /> und klare Orientierung für deine Arbeit mit AI.</p>
          <HeroSearch />
        </div>
        <div className="hf-hero-image" aria-hidden="true"><Image src="/images/home/team-hero.webp" alt="" width={1400} height={933} priority sizes="(max-width: 760px) 100vw, 52vw" /></div>
      </div>
    </section>

    <div className="home-sections">
      <section aria-labelledby="featured-title">
        <div className="section-header"><h2 className="hub-section-heading" id="featured-title">Beliebte Einstiege in deinen Arbeitsalltag</h2><Link href="/use-cases" className="text-link">Alle Use Cases<Icon name="arrow" /></Link></div>
        <div className="use-case-grid">{homepageJourneys.map(({ item, benefit, image, tone, action }) => <article key={item.slug} className={`use-case-card hf-journey hf-${tone}`}>
          <div className="hf-journey-copy"><p className="eyebrow hub-eyebrow">{item.category}</p><h3><Link href={item.href}>{item.title}</Link></h3><p className="hf-benefit">{benefit}</p><Link href={item.href} className="hf-primary hub-button hub-button-primary">{action}<Icon name="arrow" /></Link></div>
          <Image className="hf-journey-art" src={`/images/home/${image}`} alt="" width={260} height={280} />
        </article>)}</div>
      </section>

      <section className="hf-status-section" aria-labelledby="status-title">
        <div className="section-header"><h2 className="hub-section-heading" id="status-title">Wo stehen wir mit AI?</h2><Link href="/organisation" className="text-link">Zum AI Standortbild<Icon name="arrow" /></Link></div>
        <div className="hf-status-grid">{homepageSignals.map((signal) => <article className={`hf-status hf-status-${signal.tone}`} key={signal.title}><span className={`hf-signal-icon hf-${signal.tone}`}><Icon name={signal.icon} /></span><div><h3>{signal.title}</h3><p>{signal.description}</p></div></article>)}</div>
      </section>

      <section className="learning-section" aria-labelledby="learning-title">
        <div className="section-header"><h2 className="hub-section-heading" id="learning-title">Was andere gerade lernen</h2><Link className="text-link" href="/community">Weitere Erfahrungen<Icon name="arrow" /></Link></div>
        <div className="hf-learning-grid">{homepageLearnings.map((preview) => <article className="hf-learning" key={preview.id}><div><p className="eyebrow hub-eyebrow">{preview.label}</p><h3><Link href={preview.href}>{preview.title}</Link></h3><p className="hf-demo-label">Fiktives Beispiel</p></div><Image src={`/images/home/${preview.image}`} width={140} height={120} alt="" /></article>)}</div>
      </section>

      <section className="guidelines-teaser hf-guidelines" aria-labelledby="guidelines-title">
        <span className="hf-guidelines-icon"><Icon name="book" /></span><div><h2 id="guidelines-title">Guidelines</h2><p>Orientierung für den sicheren und verantwortungsvollen Einsatz von AI.</p></div><Link className="text-link" href="/guidelines">Zu den Guidelines<Icon name="arrow" /></Link><span className="hf-guidelines-art" aria-hidden="true"><Icon name="shield" /></span>
      </section>
    </div>
  </div>;
}
