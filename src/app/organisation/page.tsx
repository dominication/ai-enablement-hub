import Link from 'next/link';
import { attentionAreas, organisationalObservations, organisationalPerspectives, resolveEvidence } from '@/data/organisation';
import { HubPageIntro } from '@/components/hub-ui/HubPage';
import './organisation.css';

export const metadata = { title: 'AI Standortbild' };

export default function OrganisationPage() {
  return <div className="page-container detail-page organisation-page hub-content-page hub-organisation">
    <HubPageIntro eyebrow="ORGANISATION" title="AI Standortbild" lead="Was wir aktuell bei der Einführung von AI in der Arbeit beobachten." description="Ein gemeinsames Bild aus Use Cases, Experimenten und geteilten Erfahrungen. Es ist keine vollständige Reifegradmessung, sondern eine qualitative Orientierung." meta={<p className="organisation-context">Stand: Oktober 2026 · Fiktive Beispieldaten</p>} />

    <section className="organisation-section" aria-labelledby="observations-title">
      <h2 id="observations-title">Was wir aktuell sehen</h2>
      <div className="organisation-observations">
        {organisationalObservations.map((item) => <article key={item.title}>
          <h3>{item.title}</h3><p>{item.description}</p>
        </article>)}
      </div>
    </section>

    <section className="organisation-section" aria-labelledby="perspectives-title">
      <h2 id="perspectives-title">Fünf Perspektiven auf unsere aktuelle Situation</h2>
      <p className="organisation-section-intro">Jede Perspektive zeigt, was wir beobachten und welche Frage noch offen bleibt.</p>
      <div className="organisation-perspectives">
        {organisationalPerspectives.map((perspective) => <article className="organisation-perspective" key={perspective.id} aria-labelledby={`perspective-${perspective.id}`}>
          <h3 id={`perspective-${perspective.id}`}>{perspective.title}</h3>
          <dl><dt>Beobachtung</dt><dd>{perspective.observation}</dd><dt>Offene Frage</dt><dd>{perspective.question}</dd></dl>
          <details className="organisation-evidence">
            <summary>Worauf stützt sich das?<span className="sr-only"> {perspective.title}</span></summary>
            <ul>{perspective.evidence.map((reference) => {
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
