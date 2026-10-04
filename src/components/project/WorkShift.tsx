import { workflowShift } from '@/data/project';

export function WorkShift({ compact = false }: { compact?: boolean }) {
  return <section className={`pm-work-shift ${compact ? 'pm-shift-compact' : ''}`} aria-label="Veränderte Arbeitsweise">
    {!compact && <><p className="eyebrow">MEHR AUFMERKSAMKEIT FÜR DAS WESENTLICHE</p><h2>Ziel: weniger Sammelarbeit, mehr Aufmerksamkeit für Steuerung</h2><p>AI-gestützte Zusammenführung soll den manuellen Aufwand für Projektinformationen reduzieren und mehr Aufmerksamkeit für Interpretation, Risiken, Stakeholder und Entscheidungen ermöglichen.</p></>}
    <div className="pm-shift-columns">{(compact ? [{ title: 'Was AI übernommen hat', items: workflowShift.automated }, { title: 'Wo deine Arbeit entscheidend war', items: workflowShift.human }] : [{ title: 'Heute', items: workflowShift.today }, { title: 'Mit AI-Unterstützung', items: workflowShift.supported }]).map((column) => <div key={column.title}><h3>{column.title}</h3>{compact ? <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul> : <ol>{column.items.map((item, index) => <li key={item}>{index > 0 && <span aria-hidden="true">→</span>}{item}</li>)}</ol>}</div>)}</div>
  </section>;
}
