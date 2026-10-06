import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JourneyWorkflow } from '../JourneyWorkflow';
import './project.css';
import '../journey-entry.css';
import './project-detail.css';

export function ProjectDetail() {
  return <div className="journey-entry pm-detail hf-project">
    <header className="project-hero"><div className="project-hero-inner">
      <Link href="/use-cases" className="back-link">← Zurück zu den Use Cases</Link>
      <div className="project-hero-copy"><p className="eyebrow">Projektmanagement</p><h1>Projektstatus mit AI vorbereiten</h1><p className="project-benefit">Projektinformationen zusammenführen, Veränderungen erkennen und einen klaren Statusbericht vorbereiten.</p></div>
      <Image className="project-hero-art" src="/images/project/status-hero.webp" alt="" width={1400} height={700} priority sizes="(max-width: 760px) 100vw, 45vw" />
      <div className="pm-metadata"><span><Icon name="clock" /><span><strong>ca. 15–20 min</strong><small>für das geführte Experiment</small></span></span><span><Icon name="project" /><span><strong>Workflow</strong><small>mit fiktiven Projektdaten</small></span></span><span><Icon name="team" /><span><strong>Menschliche Einordnung</strong><small>bleibt erforderlich</small></span></span></div>
    </div></header>
    <div className="project-detail-content">
      <div className="project-orientation"><div className="entry-summary"><section><span className="project-round-icon"><Icon name="search" /></span><div><h2>Was du hier machst</h2><p>Projektinformationen zusammenführen und Veränderungen seit dem letzten Status sichtbar machen.</p><ul><li>Relevante Punkte verdichten</li><li>Einen Statusentwurf vorbereiten</li><li>Inhalte prüfen und anpassen</li></ul></div></section><section><span className="project-round-icon"><Icon name="project" /></span><div><h2>Was du am Ende hast</h2><p>Einen strukturierten Statusentwurf zur menschlichen Einordnung.</p><ul><li>Offene Punkte und Abhängigkeiten im Blick</li><li>Eine Grundlage für deine eigene Kommunikation</li></ul></div></section></div>
      <div className="pm-start"><Link className="pm-button pm-primary" href="/use-cases/projektstatus-vorbereiten/experiment">Workflow ausprobieren<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit vollständig fiktiven Projektdaten.</p></div></div>
      <section className="entry-responsibility" aria-labelledby="project-responsibility"><h2 id="project-responsibility">Unterstützung und Verantwortung</h2><div className="entry-pair"><div className="project-ai"><Image src="/images/home/project.svg" width={180} height={190} alt="" /><div><h3>AI unterstützt</h3><ul><li>Informationen aus mehreren Projektquellen zusammenführen</li><li>Veränderungen seit dem letzten Status erkennen</li><li>offene Punkte und Abhängigkeiten sichtbar machen</li><li>einen strukturierten Statusentwurf vorbereiten</li></ul></div></div><div className="project-human"><div><h3>Du entscheidest</h3><ul><li>Relevanz und Auswirkungen beurteilen</li><li>Risiken einschätzen</li><li>Prioritäten setzen</li><li>Stakeholder-Kontext berücksichtigen</li><li>Eskalationen und Entscheidungen verantworten</li></ul></div><Image src="/images/home/recruiting.svg" width={160} height={190} alt="" /></div></div></section>
      <JourneyWorkflow />
      <aside className="pm-governance"><span className="project-round-icon"><Icon name="book" /></span><div><h2>Projektinformationen bewusst verwenden</h2><p>Verwende nur Projektinformationen, die im dafür freigegebenen AI-System verarbeitet werden dürfen. Prüfe sensible oder vertrauliche Inhalte vor der Nutzung.</p></div><Link href="/guidelines" className="text-link">Guidelines ansehen<Icon name="arrow" /></Link></aside>
    </div>
  </div>;
}
