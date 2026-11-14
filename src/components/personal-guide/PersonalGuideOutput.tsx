'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/Icon';
import type { PersonalPathId } from '@/data/personal-guide';
import type { PersonalGuideDocument } from './personal-guide-state';

const handoffs: Partial<Record<PersonalPathId, { title: string; text: string; links: { href: string; label: string }[] }>> = {
  understand: { title: 'Weiter orientieren – nur wenn es dir hilft', text: 'Guidelines erklären den sicheren Rahmen; in der Community findest du fiktive Lernerfahrungen anderer.', links: [{ href: '/guidelines', label: 'Guidelines' }, { href: '/community', label: 'Community' }] },
  try: { title: 'Eine passende Beispielaufgabe ansehen', text: 'Die Use-Case-Bibliothek bietet kuratierte Arbeitsbeispiele. Deine Notiz wird nicht dorthin übertragen.', links: [{ href: '/use-cases/komplexe-inhalte-verstaendlich-machen', label: 'Beispiel-Use-Case' }, { href: '/use-cases', label: 'Alle Use Cases' }] },
  concerns: { title: 'Informationen und Erfahrungen getrennt betrachten', text: 'Guidelines und Community können zusätzliche Orientierung geben, ersetzen aber keine verbindliche Auskunft zu deiner Arbeitssituation.', links: [{ href: '/guidelines', label: 'Guidelines' }, { href: '/community', label: 'Community' }] },
  improve: { title: 'Weitere Arbeitsweisen vergleichen', text: 'Nutze die Use Cases als fachliche Beispiele, nicht als automatische Empfehlung für deinen Prozess.', links: [{ href: '/use-cases', label: 'Use Cases' }, { href: '/guidelines', label: 'Guidelines' }] },
  pause: { title: 'Du musst jetzt nichts weiter tun', text: 'Wenn du später wieder Orientierung suchst, bleibt die Guides-Übersicht dein neutraler Einstieg.', links: [{ href: '/guides', label: 'Zur Guides-Übersicht' }] },
};

export function PersonalGuideOutput({ path, document, onChange, onBack, onTopics, onReset }: {
  path: PersonalPathId;
  document: PersonalGuideDocument;
  onChange: (document: PersonalGuideDocument) => void;
  onBack: () => void;
  onTopics: () => void;
  onReset: () => void;
}) {
  const [copyStatus, setCopyStatus] = useState('');
  const handoff = handoffs[path];

  async function copyDocument() {
    const text = [document.title, '', document.intro, ...document.sections.flatMap((section) => ['', section.title, section.value]), ...(document.disclaimer ? ['', document.disclaimer] : [])].join('\n');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      setCopyStatus('Persönliche Arbeitshilfe kopiert.');
    } catch {
      setCopyStatus('Kopieren war nicht möglich. Bitte markiere die Vorlage und kopiere sie manuell.');
    }
  }

  return <>
    <section className="hub-experiment-stage-panel personal-output" aria-label={`Editierbare Arbeitshilfe: ${document.title}`}>
      <div className="personal-output-intro"><p>{document.intro}</p><span>Lokaler Entwurf · nicht gespeichert</span></div>
      {document.sections.map((section) => <label className="personal-output-section" key={section.id} htmlFor={`personal-output-${section.id}`}><span>{section.title}</span><textarea id={`personal-output-${section.id}`} rows={section.value.length > 350 ? 9 : 5} maxLength={6000} value={section.value} onChange={(event) => onChange({ ...document, sections: document.sections.map((item) => item.id === section.id ? { ...item, value: event.target.value } : item) })} /></label>)}
      {document.disclaimer && <p className="personal-output-disclaimer"><strong>Wichtig:</strong> {document.disclaimer}</p>}
      <div className="personal-output-actions"><button type="button" className="hub-button hub-button-primary" onClick={copyDocument}><Icon name="book" />Arbeitshilfe kopieren</button><button type="button" className="hub-button hub-button-secondary" onClick={onBack}>Angebote bearbeiten</button><button type="button" className="personal-text-button" onClick={onTopics}>Anderes Anliegen wählen</button><button type="button" className="personal-text-button" onClick={onReset}>Diesen Guide neu starten</button></div>
      <p className="personal-copy-status" role="status" aria-live="polite">{copyStatus}</p>
    </section>
    {handoff && <aside className="personal-handoff"><div><h2>{handoff.title}</h2><p>{handoff.text}</p></div><div>{handoff.links.map((link) => <Link className="hub-button hub-button-secondary" href={link.href} key={link.href}>{link.label}<Icon name="arrow" /></Link>)}</div></aside>}
  </>;
}
