import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { WorkShift } from './WorkShift';
import './project.css';
import '../journey-entry.css';

export function ProjectDetail() {
  return <div className="page-container detail-page journey-entry pm-detail">
    <Link href="/use-cases" className="back-link">← Zurück zu den Use Cases</Link>
    <div className="pm-category"><span className="card-icon"><Icon name="project" /></span><p className="eyebrow">Projektmanagement</p></div>
    <h1>Projektstatus mit AI vorbereiten</h1>
    <div className="entry-summary"><section><h2>Was du hier machst</h2><p>Projektinformationen zusammenführen und Veränderungen seit dem letzten Status sichtbar machen.</p></section><section><h2>Was du am Ende hast</h2><p>Einen strukturierten Statusentwurf zur menschlichen Einordnung.</p></section></div>
    <section className="entry-responsibility"><h2>Unterstützung und Verantwortung</h2><div className="entry-pair"><div><h3>AI unterstützt</h3><ul><li>Informationen aus mehreren Projektquellen zusammenführen</li><li>Veränderungen seit dem letzten Status erkennen</li><li>offene Punkte und Abhängigkeiten sichtbar machen</li><li>einen strukturierten Statusentwurf vorbereiten</li></ul></div><div><h3>Du entscheidest</h3><ul><li>Relevanz und Auswirkungen beurteilen</li><li>Risiken einschätzen</li><li>Prioritäten setzen</li><li>Stakeholder-Kontext berücksichtigen</li><li>Eskalationen und Entscheidungen verantworten</li></ul></div></div></section>
    <div className="pm-metadata"><span><Icon name="clock" />ca. 15–20 min</span><span><Icon name="project" />Workflow</span><span><Icon name="team" />Menschliche Einordnung</span></div>
    <div className="pm-start"><Link className="pm-button pm-primary" href="/use-cases/projektstatus-vorbereiten/experiment">Workflow ausprobieren<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit vollständig fiktiven Projektdaten.</p></div>
    <WorkShift />
    <aside className="pm-governance"><Icon name="shield" /><div><h2>Projektinformationen bewusst verwenden</h2><p>Verwende nur Projektinformationen, die im dafür freigegebenen AI-System verarbeitet werden dürfen. Prüfe sensible oder vertrauliche Inhalte vor der Nutzung.</p><Link href="/guidelines" className="text-link">Guidelines ansehen<Icon name="arrow" /></Link></div></aside>
  </div>;
}
