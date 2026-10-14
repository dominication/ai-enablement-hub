import { concernTopics, conversationFormats, type GuideStage } from '@/data/leadership';
import type { PerspectivesState } from '../guide-state';
import { toggle } from './path-helpers';

export function PerspectivesPath({ stage, state, onChange }: { stage: GuideStage; state: PerspectivesState; onChange: (state: PerspectivesState) => void }) {
  const topic = concernTopics.find((item) => item.id === state.topicId);
  if (stage === 'orientation') return <>
    <div className="leadership-orientation"><p>Unterschiedliche Sichtweisen können mit Arbeitsqualität, Belastung, Erwartungen oder Erfahrungen aus früheren Veränderungen zu tun haben.</p><p>Die Gründe lassen sich nicht aus einer Äusserung diagnostizieren.</p></div>
    <fieldset className="leadership-fieldset"><legend>Welches Unterthema möchtest du im Gespräch berücksichtigen?</legend><div className="leadership-choice-grid">{concernTopics.map((item) => <label className="leadership-choice" key={item.id}><span className="leadership-choice-title"><input type="radio" name="concern-topic" checked={state.topicId === item.id} onChange={() => onChange({ ...state, topicId: item.id, questionIds: [] })} /><strong>{item.label}</strong></span><span>{item.questions[0]}</span></label>)}</div></fieldset>
  </>;

  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">GESPRÄCHSEINSTIEG</p><h2>Unterschiedlichkeit zulassen und nächste Schritte ermöglichen</h2><blockquote>«Wir wollen herausfinden, wo KI in unserer Arbeit sinnvoll helfen könnte und welche Fragen dafür geklärt werden müssen. Unterschiedliche Sichtweisen gehören dazu.»</blockquote></section>
    <fieldset className="leadership-fieldset"><legend>Welches Gesprächsformat passt?</legend><p className="leadership-fieldset-help">Jedes Format hat eine mögliche Nebenwirkung. Es gibt keine versteckte beste Methode.</p><div className="leadership-choice-grid">{conversationFormats.map((format) => <label className="leadership-choice" key={format.id}><span className="leadership-choice-title"><input type="radio" name="conversation-format" checked={state.formatId === format.id} onChange={() => onChange({ ...state, formatId: format.id })} /><strong>{format.title}</strong></span><span>{format.note}</span></label>)}</div></fieldset>
    <fieldset className="leadership-fieldset"><legend>Passende Gesprächsfragen: {topic?.label ?? 'Unterthema noch offen'}</legend><div className="leadership-check-list">{topic ? topic.questions.map((question) => <label key={question}><input type="checkbox" checked={state.questionIds.includes(question)} onChange={() => onChange({ ...state, questionIds: toggle(state.questionIds, question) })} /><span>{question}</span></label>) : <p>Wähle in der Orientierung ein Unterthema, damit passende Fragen erscheinen.</p>}</div></fieldset>
    <label className="leadership-wide-input"><span>Was muss ich nach dem Gespräch zurückmelden? <small>optional</small></span><textarea rows={4} maxLength={1200} value={state.feedback} onChange={(event) => onChange({ ...state, feedback: event.target.value })} placeholder="Was ist entschieden, was bleibt offen und wer erhält Rückmeldung?" /></label>
  </>;
}
