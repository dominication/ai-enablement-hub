'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import type { GuidePathId } from '@/data/leadership';
import type { GuideDocument } from './guide-state';

export function GuideOutput({ path, document, onChange, onBack, onTopics, onReset }: {
  path: GuidePathId;
  document: GuideDocument;
  onChange: (document: GuideDocument) => void;
  onBack: () => void;
  onTopics: () => void;
  onReset: () => void;
}) {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyDocument() {
    const text = [document.title, '', document.intro, ...document.sections.flatMap((section) => ['', section.title, section.value]), ...(document.disclaimer ? ['', document.disclaimer] : [])].join('\n');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      setCopyStatus('Mitnahme kopiert.');
    } catch {
      setCopyStatus('Kopieren war nicht möglich. Bitte markiere die Vorlage und kopiere sie manuell.');
    }
  }

  return <>
    <section className="hub-experiment-stage-panel leadership-output" aria-label={`Editierbare Mitnahme: ${document.title}`}>
      <div className="leadership-output-intro"><p>{document.intro}</p><span>Lokaler Entwurf · nicht gespeichert</span></div>
      {document.sections.map((section) => <label className="leadership-output-section" key={section.id} htmlFor={`leadership-output-${section.id}`}><span>{section.title}</span><textarea id={`leadership-output-${section.id}`} rows={section.value.length > 350 ? 9 : 5} maxLength={6000} value={section.value} onChange={(event) => onChange({ ...document, sections: document.sections.map((item) => item.id === section.id ? { ...item, value: event.target.value } : item) })} /></label>)}
      {document.disclaimer && <p className="leadership-output-disclaimer"><strong>Wichtig:</strong> {document.disclaimer}</p>}
      <div className="leadership-output-actions"><button type="button" className="hub-button hub-button-primary" onClick={copyDocument}><Icon name="book" />Mitnahme kopieren</button><button type="button" className="hub-button hub-button-secondary" onClick={onBack}>Unterstützung bearbeiten</button><button type="button" className="leadership-text-button" onClick={onTopics}>Anderes Anliegen wählen</button><button type="button" className="leadership-text-button" onClick={onReset}>Diesen Guide neu starten</button></div>
      <p className="leadership-copy-status" role="status" aria-live="polite">{copyStatus}</p>
    </section>
    {path === 'use-cases' && <aside className="leadership-handoff"><div><h2>Eine Aufgabe im Team Lab genauer untersuchen?</h2><p>Kopiere deine Liste, bevor du das Team Lab öffnest. Zwischen den beiden Sessions werden keine Daten übertragen.</p></div><Link className="hub-button hub-button-secondary" href="/team-lab">Zum Team Lab<Icon name="arrow" /></Link></aside>}
    {path === 'governance' && <aside className="leadership-handoff"><div><h2>Allgemeine Leitplanken nachlesen</h2><p>Guidelines und Hilfe bieten Orientierung, aber keine organisationsinterne Freigabe.</p></div><div><Link className="hub-button hub-button-secondary" href="/guidelines">Guidelines</Link><Link className="hub-button hub-button-secondary" href="/help">Hilfe</Link></div></aside>}
    {path === 'orientation' && <aside className="leadership-handoff"><div><h2>Rahmen geklärt?</h2><p>Wenn die relevanten Punkte klar sind, kannst du Use Cases suchen oder im Team Lab eine konkrete Aufgabe untersuchen.</p></div><div><Link className="hub-button hub-button-secondary" href="/use-cases">Use Cases</Link><Link className="hub-button hub-button-secondary" href="/team-lab">Team Lab</Link></div></aside>}
  </>;
}
