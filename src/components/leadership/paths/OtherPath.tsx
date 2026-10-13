import { guidePaths, type GuidePathId, type GuideStage } from '@/data/leadership';
import type { OtherState } from '../guide-state';

export function OtherPath({ stage, state, onChange, onChoosePath }: { stage: GuideStage; state: OtherState; onChange: (state: OtherState) => void; onChoosePath: (path: GuidePathId) => void }) {
  if (stage === 'orientation') return <>
    <div className="leadership-orientation"><p>Dein Anliegen ist nicht dabei? Du kannst es als persönliche Notiz festhalten oder direkt einen der sechs Guides öffnen.</p><p><strong>Wichtig:</strong> Dein Text wird nicht ausgewertet. Es gibt keinen KI-Dienst und keine automatische Zuordnung.</p></div>
    <label className="leadership-wide-input"><span>Was beschäftigt mich? <small>optional, nur lokal</small></span><textarea rows={6} maxLength={2000} value={state.note} onChange={(event) => onChange({ ...state, note: event.target.value })} placeholder="Keine vertraulichen oder personenbezogenen Angaben …" /></label>
  </>;

  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">SITUATION SELBST SORTIEREN</p><h2>Neutrale Notiz statt vorgetäuschter Textanalyse</h2><p>Die beiden Felder sind freiwillig. Deine Formulierungen werden unverändert in die Mitnahme übernommen.</p></section>
    <div className="leadership-input-grid"><label><span>Was weiss ich schon?</span><textarea rows={4} maxLength={1200} value={state.known} onChange={(event) => onChange({ ...state, known: event.target.value })} /></label><label><span>Welche Unterstützung wäre als Nächstes hilfreich?</span><textarea rows={4} maxLength={1200} value={state.support} onChange={(event) => onChange({ ...state, support: event.target.value })} /></label></div>
    <section className="leadership-guide-links" aria-labelledby="other-guides-title"><h2 id="other-guides-title">Direkt einen fachlichen Guide öffnen</h2><div>{guidePaths.filter((path) => path.id !== 'other').map((path) => <button type="button" key={path.id} onClick={() => onChoosePath(path.id)}><strong>{path.title}</strong><span>{path.takeaway}</span></button>)}</div></section>
  </>;
}
