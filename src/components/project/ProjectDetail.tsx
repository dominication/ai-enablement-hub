import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { WorkShift } from './WorkShift';
import './project.css';

export function ProjectDetail() {
  return <div className="page-container detail-page pm-detail">
    <Link href="/use-cases" className="back-link">← Zurück zu den Use Cases</Link>
    <div className="pm-category"><span className="card-icon"><Icon name="project" /></span><p className="eyebrow">Projektmanagement</p></div>
    <h1>Projektstatus mit AI vorbereiten</h1>
    <p className="page-lead">Führe aktuelle Projektinformationen zusammen, erkenne relevante Veränderungen und bereite daraus einen klaren Statusentwurf vor.</p>
    <div className="pm-metadata"><span><Icon name="clock" />ca. 15–20 min</span><span><Icon name="project" />Workflow</span><span><Icon name="team" />Menschliche Einordnung</span></div>
    <div className="pm-start"><Link className="pm-button pm-primary" href="/use-cases/projektstatus-vorbereiten/experiment">Workflow ausprobieren<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit vollständig fiktiven Projektdaten.</p></div>
    <section className="pm-responsibility"><h2>Was verändert sich?</h2><div className="pm-two-columns"><div><h3>AI unterstützt bei</h3><ul><li>Informationen aus mehreren Projektquellen zusammenführen</li><li>Veränderungen seit dem letzten Status erkennen</li><li>offene Punkte und Abhängigkeiten sichtbar machen</li><li>einen strukturierten Statusentwurf vorbereiten</li></ul></div><div><h3>Die Projektleitung bleibt verantwortlich für</h3><ul><li>Relevanz und Auswirkungen beurteilen</li><li>Risiken einschätzen</li><li>Prioritäten setzen</li><li>Stakeholder-Kontext berücksichtigen</li><li>Eskalationen und Entscheidungen verantworten</li></ul></div></div></section>
    <WorkShift />
    <aside className="pm-governance"><Icon name="shield" /><div><h2>Projektinformationen bewusst verwenden</h2><p>Verwende nur Projektinformationen, die im dafür freigegebenen AI-System verarbeitet werden dürfen. Prüfe sensible oder vertrauliche Inhalte vor der Nutzung.</p><Link href="/guidelines" className="text-link">Guidelines ansehen<Icon name="arrow" /></Link></div></aside>
  </div>;
}
