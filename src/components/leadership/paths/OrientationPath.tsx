import { orientationTopics, type GuideStage } from '@/data/leadership';
import type { ClarityStatus, OrientationState } from '../guide-state';

const statuses: [ClarityStatus, string][] = [['clear', 'Bereits klar'], ['open', 'Noch offen']];

export function OrientationPath({ stage, state, onChange }: { stage: GuideStage; state: OrientationState; onChange: (state: OrientationState) => void }) {
  if (stage === 'orientation') return <div className="leadership-orientation"><p>Vieles kann bereits vereinbart sein. Für die nächsten Schritte lohnt sich ein gemeinsames Bild davon, was als hilfreiche Erfahrung gelten soll und wo das Team gestalten kann.</p><p>Du musst keinen Pflicht-Fragebogen ausfüllen. Markiere im nächsten Schritt nur, was für dich hilfreich ist.</p></div>;

  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">BEKANNTES UND OFFENES TRENNEN</p><h2>Was ist bereits geklärt?</h2><p>Als klar markierte Themen erscheinen in deiner Mitnahme nicht als unerfüllte Pflicht.</p></section>
    <div className="leadership-clarity-list">{orientationTopics.map((topic) => <fieldset key={topic.id}><legend>{topic.label}</legend><div>{statuses.map(([value, label]) => <label key={value}><input type="radio" name={`orientation-${topic.id}`} checked={state.statuses[topic.id] === value} onChange={() => onChange({ ...state, statuses: { ...state.statuses, [topic.id]: value } })} /><span>{label}</span></label>)}</div>{state.statuses[topic.id] === 'open' && <p>{topic.prompt}</p>}</fieldset>)}</div>
    <div className="leadership-input-grid"><label><span>Gesprächspartner oder Rolle <small>optional</small></span><textarea rows={3} maxLength={800} value={state.partner} onChange={(event) => onChange({ ...state, partner: event.target.value })} /></label><label><span>Nächster Abstimmungsschritt <small>optional</small></span><textarea rows={3} maxLength={1000} value={state.nextStep} onChange={(event) => onChange({ ...state, nextStep: event.target.value })} /></label></div>
  </>;
}
