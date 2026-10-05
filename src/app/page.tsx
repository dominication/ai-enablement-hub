import Link from 'next/link';
import { HeroSearch } from '@/components/HeroSearch';
import { UseCaseCard } from '@/components/UseCaseCard';
import { LearningCard } from '@/components/LearningCard';
import { GuidelinesTeaser } from '@/components/GuidelinesTeaser';
import { Icon } from '@/components/Icon';
import { featuredUseCases } from '@/data/content';

const featuredOutcomes: Record<string, string> = {
  'interview-vorbereiten': 'Ein geprüftes Set relevanter Interviewfragen.',
  'projektstatus-vorbereiten': 'Ein strukturierter Statusentwurf zur menschlichen Einordnung.',
  'team-experiment': 'Ein kleines Experiment mit gemeinsamen Beobachtungskriterien.',
};

const orientationStages = [
  { title: 'Aufgabe finden', description: 'Beschreibe, was du erreichen möchtest, und finde einen passenden Einstieg.' },
  { title: 'Ausprobieren', description: 'Nutze einen Use Case oder ein geführtes Experiment für deine konkrete Arbeit.' },
  { title: 'Einordnen', description: 'Prüfe Ergebnisse, ergänze Kontext und entscheide, was für deine Arbeit sinnvoll ist.' },
  { title: 'Erfahrung nutzen', description: 'Lerne aus eigenen und geteilten Erfahrungen – auch wenn ein Experiment angepasst oder beendet wurde.' },
];

export default function Home() {
  return <>
    <section className="hero"><div className="hero-content"><p className="eyebrow hero-eyebrow"><span />AI IM ARBEITSALLTAG</p><h1>Finde heraus, wie AI deine<br className="desktop-break" /> Arbeit <em>unterstützen</em> kann.</h1><p className="hero-description">Starte mit einer konkreten Aufgabe. Finde einen passenden Use Case und sieh, wie AI unterstützen kann – und wo deine Einordnung entscheidend bleibt.</p><HeroSearch /></div><div className="hero-art" aria-hidden="true"><div className="art-frame"><div className="art-tile tile-one" /><div className="art-tile tile-two" /><div className="art-tile tile-three" /><div className="art-tile tile-four" /></div></div></section>
    <div className="page-container home-sections">
      <section aria-labelledby="featured-title"><div className="section-header"><div><h2 id="featured-title">Empfohlene Use Cases</h2><p className="home-section-intro">Drei unterschiedliche Einstiege für Aufgaben, Projekte und Teamarbeit.</p></div><Link href="/use-cases" className="text-link">Alle Use Cases<Icon name="arrow" /></Link></div><div className="use-case-grid">{featuredUseCases.map((item) => <UseCaseCard key={item.slug} item={item} outcome={featuredOutcomes[item.slug]} />)}</div></section>
      <section className="home-orientation" aria-labelledby="orientation-title"><p className="eyebrow section-eyebrow">VON DER AUFGABE ZUM LEARNING</p><h2 id="orientation-title">So funktioniert der Hub</h2><p className="home-section-intro">Von einer konkreten Aufgabe zum gemeinsamen Learning.</p><ol role="list">{orientationStages.map((stage, index) => <li key={stage.title}><span className="orientation-number" aria-hidden="true">0{index + 1}</span><h3>{stage.title}</h3><p>{stage.description}</p></li>)}</ol></section>
    <section className="learning-section" aria-labelledby="learning-title"><div className="section-header"><div><p className="eyebrow section-eyebrow">ERFAHRUNGEN TEILEN. GEMEINSAM LERNEN.</p><h2 id="learning-title">Was andere gerade lernen</h2><p className="home-learning-intro">Was hat geholfen? Was musste angepasst oder bewusst beendet werden?</p></div><Link className="text-link" href="/community">Weitere Learnings<Icon name="arrow" /></Link></div><LearningCard /></section>
    <GuidelinesTeaser /></div>
  </>;
}
