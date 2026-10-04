import { exampleContext, preliminaryAssessment, referencesFor, type ProjectChange, type RiskLevel, type SourceId, type SourceReference } from '@/data/project';
import type { ChangeReview, ChangeReviews } from '@/data/project-status';

export function ContextReview({ changes, sources, risk, context, reviews, onRisk, onContext, onReview, onEvidence }: {
  changes: ProjectChange[]; sources: SourceId[]; risk: RiskLevel | ''; context: string; reviews: ChangeReviews;
  onRisk: (risk: RiskLevel) => void; onContext: (context: string) => void;
  onReview: (id: ProjectChange['id'], review: ChangeReview) => void;
  onEvidence: (title: string, references: SourceReference[]) => void;
}) {
  const integration = changes.find((change) => change.id === 'integration');
  return <div>
    {integration ? <section className="pm-context-review" aria-labelledby="pm-key-change">
      <p className="eyebrow">TERMIN · DEINE EINORDNUNG MACHT DEN UNTERSCHIED</p><h2 id="pm-key-change">{integration.title}</h2>
      <button className="pm-text-button" onClick={() => onEvidence(integration.title, referencesFor(integration, sources))}>Quelle ansehen</button>
      <div className="pm-assessment-grid"><div className="pm-preliminary"><p className="eyebrow">VORLÄUFIGE EINORDNUNG</p><h3>Risiko: {preliminaryAssessment.risk}</h3><p>{preliminaryAssessment.reasoning}</p><p className="pm-small">Vorbereitete Systemeinschätzung mit begrenztem Kontext. Noch keine Beurteilung der Projektleitung.</p></div><div className="pm-assessment-input">
        <fieldset><legend>Wie beurteilst du die Auswirkung?</legend><div className="pm-risk-options">{(['niedrig', 'mittel', 'hoch'] as const).map((option) => <label key={option}><input type="radio" name="project-risk" value={option} checked={risk === option} onChange={() => onRisk(option)} /><span>{option}</span></label>)}</div></fieldset>
        <p className="pm-small">Prüfe auch den Pilottermin und die abhängigen Teams. Reicht der Abstand zum Go-live als Begründung?</p>
      </div></div>
      <label className="pm-field-label" htmlFor="pm-context">Welcher Kontext fehlt?</label><textarea id="pm-context" value={context} onChange={(event) => onContext(event.target.value)} maxLength={1800} rows={4} placeholder="Welche Abhängigkeiten, Zusagen oder Auswirkungen kennst du aus deinem Projekt?" />
      <details className="pm-example-context"><summary>Projektwissen für dieses Demo-Beispiel</summary><p>{exampleContext}</p><button className="pm-text-button" onClick={() => onContext(exampleContext)}>Beispielkontext übernehmen</button></details>
      {risk && <div className="pm-your-assessment" role="status"><p className="eyebrow">DEINE EINORDNUNG</p><h3>Risiko: {risk}</h3>{context.trim() && <><h4>Zusätzlicher Kontext</h4><p className="pm-preserve-text">{context}</p><p className="pm-insight">Die Information war vorhanden. Ihre Bedeutung entstand erst durch deinen Projektkontext.</p></>}</div>}
    </section> : <p className="pm-notice">Deine Quellen belegen keine Terminverschiebung. Für das Beispiel mit Risikoeinordnung kannst du Meetingnotizen oder Aufgaben & Meilensteine ergänzen. Die anderen Hinweise lassen sich unabhängig davon prüfen.</p>}
    <section className="pm-other-changes"><h2>Weitere Veränderungen einordnen</h2><p className="pm-small">Bestätige relevante Hinweise oder ergänze Kontext. Nicht geprüfte Hinweise bleiben im Entwurf als offen gekennzeichnet.</p>{changes.filter((change) => change.id !== 'integration').map((change) => {
      const review = reviews[change.id] ?? { state: 'pending', wording: change.title, context: '' };
      return <article key={change.id} className="pm-review-row" aria-label={change.title}><div className="pm-row-heading"><p className="eyebrow">{change.category}</p><span className="pm-review-state">{review.state === 'confirmed' ? 'Bestätigt' : review.state === 'excluded' ? 'Als nicht relevant markiert' : 'Noch nicht eingeordnet'}</span></div><h3>{change.title}</h3>
        {review.state !== 'excluded' && <details><summary>Anpassen / Kontext ergänzen</summary><label className="pm-field-label" htmlFor={`wording-${change.id}`}>Formulierung</label><textarea id={`wording-${change.id}`} rows={2} maxLength={1000} value={review.wording} onChange={(event) => onReview(change.id, { ...review, state: 'pending', wording: event.target.value })} /><label className="pm-field-label" htmlFor={`context-${change.id}`}>Zusätzlicher Kontext</label><textarea id={`context-${change.id}`} rows={2} maxLength={1000} value={review.context} onChange={(event) => onReview(change.id, { ...review, state: 'pending', context: event.target.value })} /></details>}
        <div className="pm-inline-actions">{review.state === 'excluded' ? <button className="pm-text-button" onClick={() => onReview(change.id, { ...review, state: 'pending' })}>Wieder einbeziehen</button> : <><button className="pm-button pm-secondary" disabled={!review.wording.trim() || review.state === 'confirmed'} onClick={() => onReview(change.id, { ...review, state: 'confirmed' })}>Bestätigen</button><button className="pm-text-button" onClick={() => onReview(change.id, { ...review, state: 'excluded' })}>Als nicht relevant markieren</button></>}<button className="pm-text-button" onClick={() => onEvidence(change.title, referencesFor(change, sources))}>Quelle ansehen</button></div>
      </article>;
    })}{changes.length === 1 && integration && <p className="pm-small">Keine weiteren belegten Veränderungen in deiner Quellenauswahl.</p>}</section>
  </div>;
}
