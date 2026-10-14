import { capacityFactors, capacityLevers, responsibilityLabels, type GuideStage, type ResponsibilityId } from '@/data/leadership';
import type { CapacityState } from '../guide-state';
import { toggle } from './path-helpers';

export function CapacityPath({ stage, state, onChange }: { stage: GuideStage; state: CapacityState; onChange: (state: CapacityState) => void }) {
  if (stage === 'orientation') return <>
    <div className="leadership-orientation"><p>Eine neue Arbeitsweise kann zunächst mehr Arbeit machen, etwa durch Einarbeitung und Qualitätskontrolle.</p><p>Das ist ein organisatorischer Zielkonflikt, nicht automatisch fehlende Motivation.</p></div>
    <fieldset className="leadership-fieldset"><legend>Welche Belastungsfaktoren sind gerade relevant?</legend><p className="leadership-fieldset-help">Mehrfachauswahl möglich. Deine Auswahl bestimmt, welche Hebel im nächsten Schritt zuerst erscheinen.</p><div className="leadership-check-list leadership-check-grid">{capacityFactors.map((factor) => <label key={factor.id}><input type="checkbox" checked={state.factorIds.includes(factor.id)} onChange={() => onChange({ ...state, factorIds: toggle(state.factorIds, factor.id) })} /><span>{factor.label}</span></label>)}</div></fieldset>
  </>;

  const relevant = capacityLevers.filter((lever) => !state.factorIds.length || lever.factors.some((factor) => state.factorIds.includes(factor)) || state.leverIds.includes(lever.id));
  function selectLever(id: string) {
    if (state.leverIds.includes(id)) {
      const responsibilities = { ...state.responsibilities }; delete responsibilities[id];
      onChange({ ...state, leverIds: state.leverIds.filter((item) => item !== id), responsibilities });
    } else if (state.leverIds.length < 2) onChange({ ...state, leverIds: [...state.leverIds, id] });
  }
  function responsibility(id: string, value: ResponsibilityId) {
    onChange({ ...state, responsibilities: { ...state.responsibilities, [id]: value } });
  }
  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">PASSENDE HEBEL</p><h2>Raum schaffen oder bewusst noch nicht starten</h2><p>Wähle höchstens zwei Optionen. «Vorerst keinen Versuch starten» ist ein gleichwertiges Ergebnis.</p></section>
    <div className="leadership-lever-list">{relevant.map((lever) => { const selected = state.leverIds.includes(lever.id); return <article className={selected ? 'leadership-lever is-selected' : 'leadership-lever'} key={lever.id}><label><input type="checkbox" checked={selected} disabled={!selected && state.leverIds.length >= 2} onChange={() => selectLever(lever.id)} /><strong>{lever.label}</strong></label>{selected && <fieldset><legend>Wie kann diese Option angegangen werden?</legend>{(Object.entries(responsibilityLabels) as [ResponsibilityId, string][]).map(([value, label]) => <label key={value}><input type="radio" name={`capacity-${lever.id}`} checked={state.responsibilities[lever.id] === value} onChange={() => responsibility(lever.id, value)} /><span>{label}</span></label>)}</fieldset>}</article>; })}</div>
    <label className="leadership-wide-input"><span>Welches Gespräch ist als Nächstes sinnvoll? <small>optional</small></span><textarea rows={4} maxLength={1200} value={state.nextConversation} onChange={(event) => onChange({ ...state, nextConversation: event.target.value })} /></label>
  </>;
}
