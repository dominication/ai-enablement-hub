import { defaultNextSteps, outcomeOptions, reflectionPrompts, retrospectiveFindings, type Outcome, type TeamReflection } from '@/data/team';

export function TeamRetrospective({ outcome, nextSteps, reflection, onOutcome, onNextStep, onReflection }: {
  outcome: Outcome | ''; nextSteps: Record<Outcome, string>; reflection: TeamReflection;
  onOutcome: (value: Outcome) => void; onNextStep: (value: string) => void; onReflection: (value: TeamReflection) => void;
}) {
  return <><p className="tl-demo-note">Vorbereitete Demo-Retrospektive · Kein Experiment wurde tatsächlich durchgeführt. Diese illustrative Situation ist keine Auswertung eurer Eingaben oder der gewählten Dauer.</p><div className="tl-retro-findings">{retrospectiveFindings.map((finding) => <article key={finding.title}><h2>{finding.title}</h2><p>{finding.text}</p></article>)}</div>
    <fieldset className="tl-outcome-options"><legend>Was machen wir jetzt?</legend><div>{outcomeOptions.map((option) => <label key={option.id}><input type="radio" name="team-outcome" value={option.id} checked={outcome === option.id} onChange={() => onOutcome(option.id)} /><span><strong>{option.title}</strong><span>{option.description}</span></span></label>)}</div></fieldset>
    {outcome === 'stop' && <p className="tl-insight">Ein bewusst beendetes Experiment ist ebenfalls ein Ergebnis. Das Team weiss jetzt mehr darüber, wo KI in dieser Arbeit nicht sinnvoll unterstützt.</p>}
    {outcome && outcome !== 'stop' && <><label className="tl-field-label" htmlFor="team-next-step">{outcome === 'adapt' ? 'Was verändern wir beim nächsten Versuch?' : 'Was muss dauerhaft geklärt bleiben?'}</label><textarea id="team-next-step" value={nextSteps[outcome]} onChange={(event) => onNextStep(event.target.value)} maxLength={1000} rows={3} placeholder={defaultNextSteps[outcome]} /></>}
    <section className="tl-team-reflection"><h2>Gemeinsam zurückblicken</h2><p className="tl-small">Vorbereitete, editierbare Demo-Antworten. Haltet auch unterschiedliche Sichtweisen fest.</p>{reflectionPrompts.map((prompt) => <div key={prompt.id}><label className="tl-field-label" htmlFor={`team-reflection-${prompt.id}`}>{prompt.title}</label><textarea id={`team-reflection-${prompt.id}`} value={reflection[prompt.id]} onChange={(event) => onReflection({ ...reflection, [prompt.id]: event.target.value })} maxLength={1200} rows={3} /></div>)}</section>
  </>;
}
