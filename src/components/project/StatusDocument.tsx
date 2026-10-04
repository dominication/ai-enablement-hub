import { useEffect, useRef, type ComponentProps } from 'react';
import { project } from '@/data/project';
import type { StatusDraft, StatusSectionId } from '@/data/project-status';

function DocumentTextArea(props: ComponentProps<'textarea'> & { value: string }) {
  const field = useRef<HTMLTextAreaElement>(null);
  function fit(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight + 2}px`;
  }
  useEffect(() => { if (field.current) fit(field.current); }, [props.value]);
  useEffect(() => {
    const element = field.current;
    if (!element) return;
    let width = -1;
    const observer = new ResizeObserver(() => {
      if (element.clientWidth !== width) {
        width = element.clientWidth;
        fit(element);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <textarea {...props} ref={field} />;
}

export function StatusDocument({ draft, removed, onEdit, onRemove, onRestore }: {
  draft: StatusDraft; removed: StatusSectionId[];
  onEdit: (id: StatusSectionId, text: string) => void; onRemove: (id: StatusSectionId) => void; onRestore: (id: StatusSectionId) => void;
}) {
  return <div className="pm-status-document"><header><p className="eyebrow">{project.name} · {project.period}</p><p className="pm-draft-label">Entwurf – vor Verwendung prüfen</p><p>Alle Abschnitte sind bearbeitbar. Du legst Gesamtstatus, Prioritäten und finale Formulierungen fest.</p></header>
    {draft.filter((section) => !removed.includes(section.id)).map((section) => <section className="pm-document-section" key={section.id}><div><label htmlFor={`status-${section.id}`}>{section.title}</label><button className="pm-text-button" aria-label={`${section.title} entfernen`} onClick={() => onRemove(section.id)}>Abschnitt entfernen</button></div><DocumentTextArea id={`status-${section.id}`} rows={Math.min(10, Math.max(3, section.text.split('\n').length + 1))} maxLength={6000} value={section.text} onChange={(event) => onEdit(section.id, event.target.value)} /></section>)}
    {!!removed.length && <div className="pm-removed-sections"><p>Entfernte Abschnitte</p>{draft.filter((section) => removed.includes(section.id)).map((section) => <button className="pm-text-button" key={section.id} onClick={() => onRestore(section.id)}>{section.title} wiederherstellen</button>)}</div>}
  </div>;
}
