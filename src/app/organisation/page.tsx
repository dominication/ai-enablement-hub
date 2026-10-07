import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { attentionAreas, organisationalObservations, organisationalPerspectives, resolveEvidence } from '@/data/organisation';
import { HubPageIntro } from '@/components/hub-ui/HubPage';
import './organisation.css';

export const metadata = { title: 'AI Standortbild' };

const orientationStates = [
  { title: 'Schon sichtbar', description: 'Erste Use Cases machen konkrete Unterstützung im Arbeitsalltag sichtbar.', icon: 'shield' },
  { title: 'In Erprobung', description: 'Teams können neue Arbeitsweisen erproben und Erfahrungen reflektieren.', icon: 'project' },
  { title: 'Nächste Schritte', description: 'Learnings und Leitplanken geben Orientierung für die weitere Entwicklung.', icon: 'search' },
] as const;

const observationVisuals = ['/images/home/learning-notes.svg', '/images/home/learning-team.svg', '/images/home/learning-project.svg'] as const;
const perspectiveIcons = ['search', 'project', 'team', 'book', 'shield'] as const;

export default function OrganisationPage() {
  return <div className="page-container detail-page organisation-page hub-content-page hub-organisation">
    <section className="organisation-hero" aria-label="Einführung zum AI Standortbild">
      <HubPageIntro eyebrow="ORGANISATION" title="AI Standortbild" lead="Was wir aktuell bei der Einführung von AI in der Arbeit beobachten." description="Ein gemeinsames Bild aus Use Cases, Experimenten und geteilten Erfahrungen. Es ist keine vollständige Reifegradmessung, sondern eine qualitative Orientierung." meta={<p className="organisation-context">Stand: Oktober 2026 · Fiktive Beispieldaten</p>} />
      <div className="organisation-hero-visual" aria-hidden="true">
        <Image src="/images/home/team-hero.webp" alt="" width={1400} height={933} priority sizes="(max-width: 760px) 100vw, 46vw" />
        <div className="organisation-hero-sources"><span><Icon name="project" />Use Cases</span><span><Icon name="team" />Community</span><span><Icon name="shield" />Guidelines</span></div>
      </div>
    </section>

    <section className="organisation-section organisation-orientation" aria-labelledby="orientation-title">
      <h2 id="orientation-title">Wo stehen wir gerade?</h2>
      <div className="organisation-orientation-grid">
        {orientationStates.map((state) => <article key={state.title}>
          <span className="hub-icon-badge"><Icon name={state.icon} /></span><div><h3>{state.title}</h3><p>{state.description}</p></div>
        </article>)}
      </div>
    </section>

    <section className="organisation-section" aria-labelledby="observations-title">
      <h2 id="observations-title">Was wir aktuell sehen</h2>
      <div className="organisation-observations">
        {organisationalObservations.map((item, index) => <article key={item.title}>
          <Image src={observationVisuals[index]} alt="" width={220} height={150} /><div><h3>{item.title}</h3><p>{item.description}</p></div>
        </article>)}
      </div>
    </section>

    <section className="organisation-section" aria-labelledby="perspectives-title">
      <h2 id="perspectives-title">Fünf Perspektiven auf unsere aktuelle Situation</h2>
      <p className="organisation-section-intro">Jede Perspektive zeigt, was wir beobachten und welche Frage noch offen bleibt.</p>
      <div className="organisation-perspectives">
        {organisationalPerspectives.map((perspective, index) => <article className="organisation-perspective" key={perspective.id} aria-labelledby={`perspective-${perspective.id}`}>
          <div className="organisation-perspective-heading"><span className="hub-icon-badge"><Icon name={perspectiveIcons[index]} /></span><h3 id={`perspective-${perspective.id}`}>{perspective.title}</h3></div>
          <dl className="organisation-observation"><dt>Beobachtung</dt><dd>{perspective.observation}</dd></dl>
          <details className="organisation-evidence">
            <summary>Offene Frage &amp; Evidenz<span className="sr-only">: {perspective.title}</span></summary>
            <dl className="organisation-question"><dt>Offene Frage</dt><dd>{perspective.question}</dd></dl>
            <h4>Worauf stützt sich das?</h4><ul>{perspective.evidence.map((reference) => {
              const evidence = resolveEvidence(reference);
              return <li key={evidence.href}><Link href={evidence.href}>{evidence.label}</Link><p>{evidence.signal}</p></li>;
            })}</ul>
          </details>
        </article>)}
      </div>
    </section>

    <section className="organisation-section organisation-attention" aria-labelledby="attention-title">
      <h2 id="attention-title">Was braucht jetzt Aufmerksamkeit?</h2>
      <p className="organisation-section-intro">Drei Themen, die sich aus den aktuellen Beobachtungen ergeben.</p>
      <ul>{attentionAreas.map((area, index) => <li key={area.id}>
        <span className="organisation-number" aria-hidden="true">0{index + 1}</span>
        <div><h3>{area.title}</h3><p>{area.description}</p></div>
      </li>)}</ul>
    </section>
  </div>;
}
