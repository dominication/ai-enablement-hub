import { useEffect, useRef, useState } from 'react';
import { reportReasons } from '@/data/recruiting';

export function ReportDialog({ title, onClose, onSubmit }: { title: string; onClose: () => void; onSubmit: (reason: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState('');
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element?.showModal();
    return () => { element?.close(); trigger?.focus(); };
  }, []);
  return <dialog ref={dialog} className="report-dialog" aria-labelledby="report-title" aria-describedby="report-context" onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <form onSubmit={(event) => { event.preventDefault(); if (reason) onSubmit(reason); }}><p className="eyebrow">FRAGE PRÜFEN</p><h2 id="report-title">Was ist problematisch?</h2><p id="report-context">Frage: {title}</p><fieldset className="r-fieldset report-options"><legend className="sr-only">Grund der Meldung</legend>{reportReasons.map((option) => <label className="r-choice" key={option}><input type="radio" name="report-reason" value={option} checked={reason === option} onChange={() => setReason(option)} required /><span>{option}</span></label>)}</fieldset><p className="local-note">Diese Meldung bleibt nur in dieser Demo-Sitzung. Sie wird nicht versendet.</p><div className="r-actions"><button type="submit" className="r-button r-primary" disabled={!reason}>Feedback abgeben</button><button type="button" className="r-button r-secondary" onClick={onClose}>Abbrechen</button></div></form>
  </dialog>;
}
