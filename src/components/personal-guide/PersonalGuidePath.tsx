import { improvementFocuses, personalOffers, tryTasks, type PersonalGuideStage, type PersonalPathId } from '@/data/personal-guide';
import type { ConcernsState, ImproveState, OtherState, PauseState, PersonalGuideStates, TryState, UnderstandState } from './personal-guide-state';

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function Offers({ path, selected, onChange }: { path: PersonalPathId; selected: string[]; onChange: (selected: string[]) => void }) {
  return <fieldset className="personal-fieldset"><legend>Welche Angebote möchtest du mitnehmen?</legend><p className="personal-fieldset-help">Wähle keines, eines oder mehrere. Die Angebote unterscheiden sich fachlich und werden nur in deine lokale Vorlage übernommen.</p><div className="personal-offer-grid">{personalOffers[path].map((offer) => <label className="personal-offer" key={offer.id}><span className="personal-choice-title"><input type="checkbox" checked={selected.includes(offer.id)} onChange={() => onChange(toggle(selected, offer.id))} /><strong>{offer.title}</strong></span><span>{offer.description}</span></label>)}</div></fieldset>;
}

function UnderstandPath({ stage, state, onChange }: { stage: PersonalGuideStage; state: UnderstandState; onChange: (state: UnderstandState) => void }) {
  if (stage === 'situation') return <>
    <div className="personal-orientation"><p>Du brauchst weder Vorwissen noch eine fertige Haltung zu KI. Beginne bei Tätigkeiten aus deinem Alltag und trenne mögliche Unterstützung von Entscheidungen, die weiterhin menschliches Fachurteil brauchen.</p><p>Diese Einordnung sagt nicht voraus, wie sich deine Arbeit verändern wird.</p></div>
    <div className="personal-input-grid"><label><span>Welche Tätigkeiten möchtest du besser verstehen? <small>optional, nur lokal</small></span><textarea rows={4} maxLength={1400} value={state.workExamples} onChange={(event) => onChange({ ...state, workExamples: event.target.value })} placeholder="Zum Beispiel: Informationen ordnen oder einen ersten Textentwurf strukturieren …" /></label><label><span>Wo bleibt menschliches Urteil besonders wichtig? <small>optional</small></span><textarea rows={4} maxLength={1400} value={state.boundaries} onChange={(event) => onChange({ ...state, boundaries: event.target.value })} placeholder="Zum Beispiel: Fachlichkeit prüfen, Kontext abwägen, Entscheidung verantworten …" /></label></div>
  </>;
  return <>
    <Offers path="understand" selected={state.offerIds} onChange={(offerIds) => onChange({ ...state, offerIds })} />
    <div className="personal-input-grid"><label><span>Meine offenen Fragen <small>optional</small></span><textarea rows={4} maxLength={1400} value={state.questions} onChange={(event) => onChange({ ...state, questions: event.target.value })} /></label><label><span>Optionaler nächster Schritt <small>kein Muss</small></span><textarea rows={4} maxLength={1000} value={state.nextStep} onChange={(event) => onChange({ ...state, nextStep: event.target.value })} /></label></div>
  </>;
}

function TryPath({ stage, state, onChange }: { stage: PersonalGuideStage; state: TryState; onChange: (state: TryState) => void }) {
  if (stage === 'situation') return <>
    <div className="personal-orientation"><p>Ein kleiner Versuch beginnt mit einer begrenzten, gut überprüfbaren Aufgabe – nicht mit vertraulichen oder personenbezogenen Informationen.</p><p>Wenn Werkzeug oder Datenrahmen unklar sind, bleibt das Klären der nächste Schritt. Diese Vorlage erteilt keine Freigabe.</p></div>
    <fieldset className="personal-fieldset"><legend>Welche unkritische Aufgabe möchtest du betrachten?</legend><div className="personal-choice-list">{tryTasks.map((task) => <label key={task.id}><input type="radio" name="personal-try-task" checked={state.taskId === task.id} onChange={() => onChange({ ...state, taskId: task.id })} /><span>{task.label}</span></label>)}</div></fieldset>
    {state.taskId === 'custom' && <label className="personal-wide-input"><span>Eigene Aufgabe <small>fiktiv oder allgemein, nur lokal</small></span><textarea rows={3} maxLength={1000} value={state.customTask} onChange={(event) => onChange({ ...state, customTask: event.target.value })} placeholder="Keine vertraulichen oder personenbezogenen Angaben …" /></label>}
  </>;
  return <>
    <Offers path="try" selected={state.offerIds} onChange={(offerIds) => onChange({ ...state, offerIds })} />
    <fieldset className="personal-fieldset"><legend>Wie ist der erlaubte Rahmen eingeordnet?</legend><div className="personal-choice-list">{([['clear', 'Werkzeug und Informationskategorie sind geklärt'], ['open', 'Freigaben sind noch offen – noch nicht beginnen'], ['not-needed', 'Nur öffentliche oder vollständig fiktive Inhalte']] as const).map(([value, label]) => <label key={value}><input type="radio" name="personal-try-approval" checked={state.approval === value} onChange={() => onChange({ ...state, approval: value })} /><span>{label}</span></label>)}</div></fieldset>
    <div className="personal-input-grid"><label><span>Wie prüfst du das Ergebnis? <small>optional</small></span><textarea rows={4} maxLength={1400} value={state.reviewPlan} onChange={(event) => onChange({ ...state, reviewPlan: event.target.value })} placeholder="Ausgangsmaterial vergleichen, Quellen öffnen, fachlich selbst entscheiden …" /></label><label><span>Wann stoppst du den Versuch? <small>optional</small></span><textarea rows={4} maxLength={1000} value={state.stopCondition} onChange={(event) => onChange({ ...state, stopCondition: event.target.value })} /></label></div>
  </>;
}

function ConcernsPath({ stage, state, onChange }: { stage: PersonalGuideStage; state: ConcernsState; onChange: (state: ConcernsState) => void }) {
  if (stage === 'situation') return <>
    <div className="personal-orientation"><p>Vorbehalte und Sorgen müssen nicht wegargumentiert werden. Hilfreich kann sein, tatsächliche Informationen von offenen Fragen zu trennen und zu klären, wer verbindlich Auskunft geben kann.</p><p>Der Guide schreibt dir keine Motivation zu und verspricht keine Sicherheit über künftige Aufgaben oder Rollen.</p></div>
    <div className="personal-input-grid"><label><span>Was ist tatsächlich bekannt oder beobachtet? <small>optional, nur lokal</small></span><textarea rows={4} maxLength={1400} value={state.facts} onChange={(event) => onChange({ ...state, facts: event.target.value })} /></label><label><span>Was ist für dich offen? <small>optional</small></span><textarea rows={4} maxLength={1400} value={state.openQuestions} onChange={(event) => onChange({ ...state, openQuestions: event.target.value })} /></label></div>
  </>;
  return <>
    <Offers path="concerns" selected={state.offerIds} onChange={(offerIds) => onChange({ ...state, offerIds })} />
    <div className="personal-input-grid"><label><span>Was möchtest du in einem Gespräch ansprechen? <small>optional</small></span><textarea rows={4} maxLength={1400} value={state.conversation} onChange={(event) => onChange({ ...state, conversation: event.target.value })} /></label><label><span>Welche Rolle könnte verbindlich unterstützen? <small>optional</small></span><textarea rows={4} maxLength={1000} value={state.support} onChange={(event) => onChange({ ...state, support: event.target.value })} placeholder="Zum Beispiel: Führungskraft, Fachstelle, Datenschutz oder Personalentwicklung …" /></label></div>
  </>;
}

function ImprovePath({ stage, state, onChange }: { stage: PersonalGuideStage; state: ImproveState; onChange: (state: ImproveState) => void }) {
  if (stage === 'situation') return <>
    <div className="personal-orientation"><p>Mehr Erfahrung bedeutet nicht automatisch weniger Prüfaufwand. Betrachte den ganzen Arbeitsprozess: Ausgangsmaterial, KI-Unterstützung, Nacharbeit und die menschliche Entscheidung.</p><p>Es gibt keinen Kompetenz-Score und keine Einstufung deiner Erfahrung.</p></div>
    <fieldset className="personal-fieldset"><legend>Was möchtest du genauer untersuchen?</legend><div className="personal-choice-list personal-choice-columns">{improvementFocuses.map((focus) => <label key={focus.id}><input type="checkbox" checked={state.focusIds.includes(focus.id)} onChange={() => onChange({ ...state, focusIds: toggle(state.focusIds, focus.id) })} /><span>{focus.label}</span></label>)}</div></fieldset>
    <label className="personal-wide-input"><span>Wie sieht dein heutiger Ablauf aus? <small>optional, nur lokal</small></span><textarea rows={4} maxLength={1600} value={state.currentProcess} onChange={(event) => onChange({ ...state, currentProcess: event.target.value })} /></label>
  </>;
  return <>
    <Offers path="improve" selected={state.offerIds} onChange={(offerIds) => onChange({ ...state, offerIds })} />
    <div className="personal-input-grid"><label><span>Welche Qualität und welcher Prüfaufwand entstehen? <small>optional</small></span><textarea rows={4} maxLength={1400} value={state.reviewEffort} onChange={(event) => onChange({ ...state, reviewEffort: event.target.value })} /></label><label><span>Wer prüft und entscheidet fachlich? <small>optional</small></span><textarea rows={4} maxLength={1000} value={state.decisionOwner} onChange={(event) => onChange({ ...state, decisionOwner: event.target.value })} /></label></div>
    <label className="personal-wide-input"><span>Eine kleine Verbesserung, die du prüfen möchtest <small>optional</small></span><textarea rows={3} maxLength={1200} value={state.change} onChange={(event) => onChange({ ...state, change: event.target.value })} /></label>
  </>;
}

function PausePath({ stage, state, onChange }: { stage: PersonalGuideStage; state: PauseState; onChange: (state: PauseState) => void }) {
  if (stage === 'situation') return <>
    <div className="personal-orientation"><p>Du musst nicht jetzt mit KI beginnen. Fehlende Zeit, andere Prioritäten oder schlicht kein aktueller Bedarf sind ausreichende Gründe, den Einstieg zu vertagen.</p><p>Du kannst auch nur einen Überblick behalten oder die Journey ohne Aufgabe beenden.</p></div>
    <fieldset className="personal-fieldset"><legend>Was passt für dich im Moment?</legend><div className="personal-choice-list">{([['not-now', 'Vorerst nicht beginnen'], ['overview', 'Nur gelegentlich einen Überblick behalten'], ['support', 'Unterstützung für später notieren']] as const).map(([value, label]) => <label key={value}><input type="radio" name="personal-pause-choice" checked={state.choice === value} onChange={() => onChange({ ...state, choice: value })} /><span>{label}</span></label>)}</div></fieldset>
    <label className="personal-wide-input"><span>Was möchtest du für dich festhalten? <small>optional, keine Rechtfertigung nötig</small></span><textarea rows={3} maxLength={1200} value={state.reason} onChange={(event) => onChange({ ...state, reason: event.target.value })} /></label>
  </>;
  return <>
    <Offers path="pause" selected={state.offerIds} onChange={(offerIds) => onChange({ ...state, offerIds })} />
    <div className="personal-input-grid"><label><span>Was könnte einen späteren Einstieg erleichtern? <small>optional</small></span><textarea rows={4} maxLength={1200} value={state.support} onChange={(event) => onChange({ ...state, support: event.target.value })} /></label><label><span>Ob oder wann möchtest du darauf zurückkommen? <small>optional</small></span><textarea rows={4} maxLength={800} value={state.revisit} onChange={(event) => onChange({ ...state, revisit: event.target.value })} placeholder="Kein Zeitpunkt ist ebenfalls ein gültiges Ergebnis." /></label></div>
  </>;
}

function OtherPath({ stage, state, onChange }: { stage: PersonalGuideStage; state: OtherState; onChange: (state: OtherState) => void }) {
  if (stage === 'situation') return <>
    <div className="personal-orientation"><p>Dein Anliegen passt nicht zu den fünf Angeboten? Halte es in eigenen Worten fest.</p><p><strong>Wichtig:</strong> Der Text wird nicht ausgewertet, interpretiert oder automatisch einem Guide zugeordnet.</p></div>
    <label className="personal-wide-input"><span>Was beschäftigt mich? <small>optional, nur lokal</small></span><textarea rows={6} maxLength={2000} value={state.note} onChange={(event) => onChange({ ...state, note: event.target.value })} placeholder="Keine vertraulichen oder personenbezogenen Angaben …" /></label>
  </>;
  return <>
    <Offers path="other" selected={state.offerIds} onChange={(offerIds) => onChange({ ...state, offerIds })} />
    <div className="personal-input-grid"><label><span>Was weiss ich schon? <small>optional</small></span><textarea rows={4} maxLength={1200} value={state.known} onChange={(event) => onChange({ ...state, known: event.target.value })} /></label><label><span>Welche Unterstützung wäre hilfreich? <small>optional</small></span><textarea rows={4} maxLength={1200} value={state.support} onChange={(event) => onChange({ ...state, support: event.target.value })} /></label></div>
  </>;
}

export function PersonalGuidePath({ path, stage, states, onChange }: {
  path: PersonalPathId;
  stage: PersonalGuideStage;
  states: PersonalGuideStates;
  onChange: <K extends PersonalPathId>(path: K, state: PersonalGuideStates[K]) => void;
}) {
  switch (path) {
    case 'understand': return <UnderstandPath stage={stage} state={states.understand} onChange={(state) => onChange('understand', state)} />;
    case 'try': return <TryPath stage={stage} state={states.try} onChange={(state) => onChange('try', state)} />;
    case 'concerns': return <ConcernsPath stage={stage} state={states.concerns} onChange={(state) => onChange('concerns', state)} />;
    case 'improve': return <ImprovePath stage={stage} state={states.improve} onChange={(state) => onChange('improve', state)} />;
    case 'pause': return <PausePath stage={stage} state={states.pause} onChange={(state) => onChange('pause', state)} />;
    case 'other': return <OtherPath stage={stage} state={states.other} onChange={(state) => onChange('other', state)} />;
  }
}
