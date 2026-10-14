import { uncertaintyOffers, type GuideStage } from '@/data/leadership';
import type { UncertaintyState } from '../guide-state';
import { toggle } from './path-helpers';

export function UncertaintyPath({ stage, state, onChange }: { stage: GuideStage; state: UncertaintyState; onChange: (state: UncertaintyState) => void }) {
  const offer = uncertaintyOffers.find((item) => item.id === state.offerId);
  if (stage === 'orientation') return <>
    <div className="leadership-orientation"><p>Du bist nicht nur Führungskraft, sondern auch selbst von Veränderungen betroffen. Es kann hilfreich sein, zwischen bereits bekannten Veränderungen und offenen Fragen zu unterscheiden.</p><p>Du musst deinem Team keine Sicherheit vermitteln, die dir selbst niemand zusichern kann.</p></div>
    <fieldset className="leadership-fieldset"><legend>Was könnte dir im Moment helfen?</legend><p className="leadership-fieldset-help">Die Auswahl verändert die Fragen, die Hilfen und deine Mitnahme.</p><div className="leadership-choice-grid">{uncertaintyOffers.map((item) => <label className="leadership-choice" key={item.id}><span className="leadership-choice-title"><input type="radio" name="uncertainty-offer" checked={state.offerId === item.id} onChange={() => onChange({ ...state, offerId: item.id, questionIds: [] })} /><strong>{item.title}</strong></span><span>{item.impulse}</span></label>)}</div></fieldset>
  </>;

  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">DEIN GEWÄHLTES ANGEBOT</p><h2>{offer?.title ?? 'Wähle ein Unterstützungsangebot'}</h2><p>{offer?.impulse ?? 'Du kannst zur Orientierung zurückkehren oder direkt eine knappe persönliche Notiz mitnehmen.'}</p></section>
    {offer && <fieldset className="leadership-fieldset"><legend>Welche Fragen möchtest du mitnehmen?</legend><p className="leadership-fieldset-help">Die Fragen sind Vorschläge. Wähle nur, was für dein nächstes Gespräch hilfreich ist.</p><div className="leadership-check-list">{offer.questions.map((question) => <label key={question}><input type="checkbox" checked={state.questionIds.includes(question)} onChange={() => onChange({ ...state, questionIds: toggle(state.questionIds, question) })} /><span>{question}</span></label>)}</div></fieldset>}
    <div className="leadership-input-grid"><label><span>Mein nächster Schritt <small>optional</small></span><textarea rows={3} maxLength={1000} value={state.nextStep} onChange={(event) => onChange({ ...state, nextStep: event.target.value })} placeholder="Zum Beispiel: Fragen sammeln und ein Gespräch vereinbaren …" /></label><label><span>Persönliche Notiz <small>optional, nur lokal</small></span><textarea rows={3} maxLength={1000} value={state.note} onChange={(event) => onChange({ ...state, note: event.target.value })} placeholder="Keine vertraulichen oder personenbezogenen Angaben …" /></label></div>
  </>;
}
