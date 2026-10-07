import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JourneyContextNotice, JourneyHero, JourneyResponsibility, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import { JourneyWorkflow } from '../JourneyWorkflow';
import './project.css';
import '../journey-entry.css';
import './project-detail.css';

export function ProjectDetail() {
  return <div className="journey-entry pm-detail hf-project">
    <JourneyHero backHref="/use-cases" backLabel="Zurück zu den Use Cases" category="Projektmanagement" title="Projektstatus mit AI vorbereiten" description="Projektinformationen zusammenführen, Veränderungen erkennen und einen klaren Statusbericht vorbereiten."
      art={<Image className="project-hero-art" src="/images/project/status-hero.webp" alt="" width={1400} height={700} priority sizes="(max-width: 760px) 100vw, 45vw" />}
      metadata={<div className="pm-metadata hub-meta"><span><Icon name="clock" /><span><strong>ca. 15–20 min</strong><small>für das geführte Experiment</small></span></span><span><Icon name="project" /><span><strong>Workflow</strong><small>mit fiktiven Projektdaten</small></span></span><span><Icon name="team" /><span><strong>Menschliche Einordnung</strong><small>bleibt erforderlich</small></span></span></div>} />
    <div className="project-detail-content">
      <div className="project-orientation"><JourneySummary items={[{
        title: 'Was du hier machst', description: 'Projektinformationen zusammenführen und Veränderungen seit dem letzten Status sichtbar machen.', details: ['Relevante Punkte verdichten', 'Einen Statusentwurf vorbereiten', 'Inhalte prüfen und anpassen'], icon: <span className="project-round-icon hub-icon-badge"><Icon name="search" /></span>,
      }, {
        title: 'Was du am Ende hast', description: 'Einen strukturierten Statusentwurf zur menschlichen Einordnung.', details: ['Offene Punkte und Abhängigkeiten im Blick', 'Eine Grundlage für deine eigene Kommunikation'], icon: <span className="project-round-icon hub-icon-badge"><Icon name="project" /></span>,
      }]} />
      <div className="pm-start"><Link className="pm-button pm-primary hub-button hub-button-primary" href="/use-cases/projektstatus-vorbereiten/experiment">Workflow ausprobieren<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit vollständig fiktiven Projektdaten.</p></div></div>
      <JourneyResponsibility id="project-responsibility"><div className="project-ai"><Image src="/images/home/project.svg" width={180} height={190} alt="" /><div><h3>AI unterstützt</h3><ul><li>Informationen aus mehreren Projektquellen zusammenführen</li><li>Veränderungen seit dem letzten Status erkennen</li><li>offene Punkte und Abhängigkeiten sichtbar machen</li><li>einen strukturierten Statusentwurf vorbereiten</li></ul></div></div><div className="project-human"><div><h3>Du entscheidest</h3><ul><li>Relevanz und Auswirkungen beurteilen</li><li>Risiken einschätzen</li><li>Prioritäten setzen</li><li>Stakeholder-Kontext berücksichtigen</li><li>Eskalationen und Entscheidungen verantworten</li></ul></div><Image src="/images/home/recruiting.svg" width={160} height={190} alt="" /></div></JourneyResponsibility>
      <JourneyWorkflow />
      <JourneyContextNotice className="pm-governance" variant="guideline" icon={<span className="project-round-icon hub-icon-badge"><Icon name="book" /></span>} title="Projektinformationen bewusst verwenden" description="Verwende nur Projektinformationen, die im dafür freigegebenen AI-System verarbeitet werden dürfen. Prüfe sensible oder vertrauliche Inhalte vor der Nutzung." href="/guidelines" linkLabel="Guidelines ansehen" />
    </div>
  </div>;
}
