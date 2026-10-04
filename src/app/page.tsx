import Link from 'next/link';
import { HeroSearch } from '@/components/HeroSearch';
import { UseCaseCard } from '@/components/UseCaseCard';
import { LearningCard } from '@/components/LearningCard';
import { GuidelinesTeaser } from '@/components/GuidelinesTeaser';
import { Icon } from '@/components/Icon';
import { useCases } from '@/data/content';

export default function Home() {
  return <>
    <section className="hero"><div className="hero-content"><p className="eyebrow hero-eyebrow"><span />AI IM ARBEITSALLTAG</p><h1>Finde heraus, wie AI deine<br className="desktop-break" /> Arbeit <em>unterstützen</em> kann.</h1><p className="hero-description">Entdecke praktische Anwendungsfälle, probiere neue Arbeitsweisen aus<br className="desktop-break" /> und lerne von den Erfahrungen anderer.</p><HeroSearch /></div><div className="hero-art" aria-hidden="true"><div className="art-frame"><div className="art-tile tile-one" /><div className="art-tile tile-two" /><div className="art-tile tile-three" /><div className="art-tile tile-four" /></div><span className="art-caption">Neue Perspektiven.<br />Gemeinsam weiterdenken.</span></div></section>
    <div className="page-container home-sections"><section aria-labelledby="featured-title"><div className="section-header"><div><p className="eyebrow section-eyebrow">VON DER AUFGABE ZUM ERSTEN SCHRITT</p><h2 id="featured-title">Was möchtest du ausprobieren?</h2></div><Link href="/use-cases" className="text-link">Alle Use Cases<Icon name="arrow" /></Link></div><div className="use-case-grid">{useCases.map((item) => <UseCaseCard key={item.slug} item={item} />)}</div></section>
    <section className="learning-section" aria-labelledby="learning-title"><div className="section-header"><div><p className="eyebrow section-eyebrow">ERFAHRUNGEN TEILEN. GEMEINSAM LERNEN.</p><h2 id="learning-title">Was andere gerade lernen</h2></div><Link className="text-link" href="/community">Weitere Erfahrungen<Icon name="arrow" /></Link></div><LearningCard /></section>
    <GuidelinesTeaser /></div>
  </>;
}
