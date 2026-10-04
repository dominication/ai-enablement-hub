import { useState } from 'react';
import type { InterviewQuestion } from '@/data/recruiting';

export type QuestionState = InterviewQuestion & { text: string; variant: number };
export function QuestionCard({ question, selected, onSelect, onEdit, onAlternative, onReport, reported, review, onMove, position, total }: {
  question: QuestionState; selected: boolean; onSelect: () => void; onEdit: (text: string) => void;
  onAlternative?: () => void; onReport?: () => void; reported?: boolean; review?: boolean;
  onMove?: (direction: -1 | 1) => void; position?: number; total?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(question.text);
  return <article className={`question-card ${selected ? 'question-selected' : ''}`} aria-label={question.title}>
    <div className="question-heading"><h2>{review ? `${(position ?? 0) + 1}. ` : ''}{question.title}</h2>{selected && !review && <span className="selection-label">In deiner Auswahl</span>}</div>
    {editing ? <form className="question-editor" onSubmit={(event) => { event.preventDefault(); if (!draft.trim()) return; onEdit(draft.trim()); setEditing(false); }}><label htmlFor={`edit-${question.id}`}>Interviewfrage bearbeiten</label><textarea id={`edit-${question.id}`} value={draft} onChange={(event) => setDraft(event.target.value)} rows={5} maxLength={1500} required autoFocus /><div className="r-actions"><button className="r-button r-primary" disabled={!draft.trim()}>Änderung übernehmen</button><button type="button" className="r-button r-secondary" onClick={() => setEditing(false)}>Abbrechen</button></div></form> : <p className="question-text">{question.text}</p>}
    {!review && <div className="question-reason"><h3>Warum diese Frage?</h3><p>{question.why}</p></div>}
    <div className="question-actions">
      <button type="button" className="r-button r-secondary" onClick={onSelect} aria-pressed={review ? undefined : selected}>{review ? 'Entfernen' : selected ? 'Aus Auswahl entfernen' : 'Übernehmen'}</button>
      <button type="button" className="r-text-button" disabled={editing} onClick={() => { setDraft(question.text); setEditing(true); }}>Anpassen</button>
      {!review && <><button type="button" className="r-text-button" disabled={editing} onClick={onAlternative}>Alternative</button><button type="button" className="r-text-button report-button" onClick={onReport}>Problem melden</button></>}
      {review && <div className="reorder-actions"><button type="button" className="r-text-button" disabled={position === 0} onClick={() => onMove?.(-1)} aria-label={`${question.title} nach oben`}>↑ Nach oben</button><button type="button" className="r-text-button" disabled={position === (total ?? 0) - 1} onClick={() => onMove?.(1)} aria-label={`${question.title} nach unten`}>↓ Nach unten</button></div>}
    </div>
    {reported && !review && <p className="report-confirmation" role="status">Danke. Kritisches Feedback hilft, AI-Unterstützung besser einzuordnen.</p>}
  </article>;
}
