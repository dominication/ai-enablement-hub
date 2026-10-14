import { discoverySteps, exampleIdeas, frictionFields, ideaReviewQuestions, type GuideStage } from '@/data/leadership';
import type { UseCasesState, WorkIdea } from '../guide-state';
import { toggle } from './path-helpers';

function updateIdea(state: UseCasesState, idea: WorkIdea, onChange: (state: UseCasesState) => void) {
  onChange({ ...state, ideas: state.ideas.map((item) => item.id === idea.id ? idea : item) });
}

function IdeaFields({ state, onChange, decisions }: { state: UseCasesState; onChange: (state: UseCasesState) => void; decisions: boolean }) {
  return <div className="leadership-idea-list">{state.ideas.map((idea, index) => <article className="leadership-idea" key={idea.id}><h3>Arbeitsaufgabe {index + 1}</h3><label><span>Arbeitsaufgabe</span><input value={idea.task} maxLength={300} onChange={(event) => updateIdea(state, { ...idea, task: event.target.value }, onChange)} placeholder="Fiktiv oder allgemein beschreiben …" /></label><label><span>Was macht sie aufwendig?</span><textarea rows={2} maxLength={600} value={idea.friction} onChange={(event) => updateIdea(state, { ...idea, friction: event.target.value }, onChange)} /></label><label><span>Was möchten wir herausfinden?</span><textarea rows={2} maxLength={600} value={idea.learning} onChange={(event) => updateIdea(state, { ...idea, learning: event.target.value }, onChange)} /></label>{decisions && idea.task.trim() && <fieldset><legend>Wie möchtest du diese Idee behandeln?</legend>{([['review', 'Weiter untersuchen'], ['later', 'Später'], ['not-fit', 'Nicht passend']] as const).map(([value, label]) => <label key={value}><input type="radio" name={`idea-${idea.id}-decision`} checked={idea.decision === value} onChange={() => updateIdea(state, { ...idea, decision: value }, onChange)} /><span>{label}</span></label>)}</fieldset>}{decisions && idea.task.trim() && <label><span>Offene Klärungsfragen <small>optional</small></span><textarea rows={2} maxLength={800} value={idea.questions} onChange={(event) => updateIdea(state, { ...idea, questions: event.target.value }, onChange)} /></label>}</article>)}</div>;
}

export function UseCasesPath({ stage, state, onChange }: { stage: GuideStage; state: UseCasesState; onChange: (state: UseCasesState) => void }) {
  if (stage === 'orientation') return <>
    <div className="leadership-orientation"><p>Startet bei der Arbeit, die ihr leichter, verlässlicher oder klarer gestalten möchtet – nicht bei einem Tool.</p><p>Wähle den Ausgangspunkt, der eure tatsächliche Situation beschreibt.</p></div>
    <fieldset className="leadership-fieldset"><legend>Wo steht ihr gerade?</legend><div className="leadership-choice-grid leadership-choice-grid-two"><label className="leadership-choice"><span className="leadership-choice-title"><input type="radio" name="use-case-mode" checked={state.mode === 'discover'} onChange={() => onChange({ ...state, mode: 'discover' })} /><strong>Wir haben noch keine konkreten Ideen</strong></span><span>Eine gemeinsame Bestandsaufnahme vorbereiten, ohne eine Shortlist vorzutäuschen.</span></label><label className="leadership-choice"><span className="leadership-choice-title"><input type="radio" name="use-case-mode" checked={state.mode === 'ideas'} onChange={() => onChange({ ...state, mode: 'ideas' })} /><strong>Wir haben bereits Ideen</strong></span><span>Bis zu drei selbst benannte Aufgaben anhand offener Prüffragen sortieren.</span></label></div></fieldset>
  </>;

  if (state.mode === 'ideas') return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">BEREITS IDEEN</p><h2>Eine ehrliche Shortlist vorbereiten</h2><p>Nur Aufgaben, die du selbst eingibst und als «Weiter untersuchen» markierst, erscheinen in der Shortlist.</p></section>
    <div className="leadership-example-row" aria-label="Fiktive Beispielaufgaben">{exampleIdeas.map((example) => <button type="button" key={example} onClick={() => { const target = state.ideas.find((idea) => !idea.task.trim()); if (target) updateIdea(state, { ...target, task: example }, onChange); }} disabled={!state.ideas.some((idea) => !idea.task.trim())}>Fiktives Beispiel übernehmen: {example}</button>)}</div>
    <aside className="leadership-check-card"><h2>Prüffragen ohne Score</h2><ul>{ideaReviewQuestions.map((question) => <li key={question}>{question}</li>)}</ul><p>Die Auswahl ist keine Sicherheitsfreigabe und keine Eignungszertifizierung.</p></aside>
    <IdeaFields state={state} onChange={onChange} decisions />
    <label className="leadership-wide-input"><span>Nächster Gesprächsschritt <small>optional</small></span><textarea rows={3} maxLength={1000} value={state.nextStep} onChange={(event) => onChange({ ...state, nextStep: event.target.value })} /></label>
  </>;

  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">NOCH KEINE IDEEN</p><h2>Gemeinsame Bestandsaufnahme vorbereiten</h2><p>Die Moderationskarte sammelt zuerst Tätigkeiten und Aufwand. Einträge sind freiwillig; ohne Einträge entsteht ausdrücklich keine Shortlist.</p></section>
    <fieldset className="leadership-fieldset"><legend>Wo erlebt ihr möglicherweise Friktion?</legend><div className="leadership-check-list leadership-check-grid">{frictionFields.map((field) => <label key={field.id}><input type="checkbox" checked={state.frictionIds.includes(field.id)} onChange={() => onChange({ ...state, frictionIds: toggle(state.frictionIds, field.id) })} /><span>{field.label}</span></label>)}</div></fieldset>
    <aside className="leadership-moderation-card"><h2>Moderationskarte für die gemeinsame Sammlung</h2><ol>{discoverySteps.map((item) => <li key={item}>{item}</li>)}</ol></aside>
    <details className="leadership-optional-details"><summary>Bis zu drei Aufgaben freiwillig vormerken</summary><p>Nutze nur fiktive oder allgemein beschriebene Aufgaben. Die Felder dürfen leer bleiben.</p><IdeaFields state={state} onChange={onChange} decisions={false} /></details>
    <label className="leadership-wide-input"><span>Nächster Schritt <small>optional</small></span><textarea rows={3} maxLength={1000} value={state.nextStep} onChange={(event) => onChange({ ...state, nextStep: event.target.value })} /></label>
  </>;
}
