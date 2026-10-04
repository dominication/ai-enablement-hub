import { useEffect, useRef } from 'react';
import { resolveReference, type SourceReference } from '@/data/project';

export function SourceEvidence({ references, title, onClose }: { references: SourceReference[]; title: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element?.showModal();
    return () => { element?.close(); trigger?.focus(); };
  }, []);
  return <dialog className="pm-evidence-dialog" ref={dialog} aria-labelledby="pm-evidence-title" onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <div className="pm-dialog-heading"><div><p className="eyebrow">FIKTIVE ORIGINALQUELLEN</p><h2 id="pm-evidence-title">{title}</h2></div><button className="pm-button pm-secondary" onClick={onClose}>Schliessen</button></div>
    {references.map((reference) => { const { source, entry } = resolveReference(reference); return <section className="pm-evidence-entry" key={`${source.id}-${entry.id}`}><p className="pm-source-caption">{source.title} · {source.date}</p><h3>{entry.title}</h3><blockquote>{entry.text}</blockquote></section>; })}
    <p className="pm-small">Demo-Quellen. Die Textstellen erklären die Auswertung; sie ersetzen keine Einordnung der Auswirkungen.</p>
  </dialog>;
}
