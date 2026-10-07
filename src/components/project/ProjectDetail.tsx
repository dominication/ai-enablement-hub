import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { JourneyContextNotice, JourneyHero, JourneyMeta, JourneyResponsibility, JourneyStartCard, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import { JourneyWorkflow } from '../JourneyWorkflow';
import './project.css';
import '../journey-entry.css';
import './project-detail.css';

export function ProjectDetail() {
  return <div className="journey-entry pm-detail hf-project hub-journey-page hub-project-detail">
    <JourneyHero backHref="/use-cases" backLabel="Zurück zu den Use Cases" category="Projektmanagement" title="Projektstatus mit AI vorbereiten" description="Projektinformationen zusammenführen, Veränderungen erkennen und einen klaren Statusbericht vorbereiten."
      art={<Image className="hub-journey-art hub-journey-photo project-hero-art" src="/images/project/status-hero.webp" alt="" width={1400} height={700} priority sizes="(max-width: 760px) 100vw, 45vw" />}
      metadata={<JourneyMeta className="pm-metadata" items={[
        { icon: <Icon name="clock" />, title: 'ca. 15–20 min', detail: 'für das geführte Experiment' },
        { icon: <Icon name="project" />, title: 'Workflow', detail: 'mit fiktiven Projektdaten' },
        { icon: <Icon name="team" />, title: 'Menschliche Einordnung', detail: 'bleibt erforderlich' },
      ]} />} />
    <div className="hub-journey-content project-detail-content">
      <div className="hub-journey-orientation project-orientation"><JourneySummary items={[{
        title: 'Was du hier machst', description: 'Projektinformationen zusammenführen und Veränderungen seit dem letzten Status sichtbar machen.', details: ['Relevante Punkte verdichten', 'Einen Statusentwurf vorbereiten', 'Inhalte prüfen und anpassen'], icon: <span className="project-round-icon hub-icon-badge"><Icon name="search" /></span>,
      }, {
        title: 'Was du am Ende hast', description: 'Einen strukturierten Statusentwurf zur menschlichen Einordnung.', details: ['Offene Punkte und Abhängigkeiten im Blick', 'Eine Grundlage für deine eigene Kommunikation'], icon: <span className="project-round-icon hub-icon-badge"><Icon name="project" /></span>,
      }]} />
      <JourneyStartCard className="pm-start" href="/use-cases/projektstatus-vorbereiten/experiment" label="Workflow ausprobieren" note="Ein geführtes Experiment mit vollständig fiktiven Projektdaten." /></div>
      <JourneyResponsibility id="project-responsibility"><div className="project-ai"><span className="project-round-icon hub-icon-badge"><Icon name="project" /></span><div><h3>AI unterstützt</h3><ul><li>Informationen aus mehreren Projektquellen zusammenführen</li><li>Veränderungen seit dem letzten Status erkennen</li><li>offene Punkte und Abhängigkeiten sichtbar machen</li><li>einen strukturierten Statusentwurf vorbereiten</li></ul></div></div><div className="project-human"><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Du entscheidest</h3><ul><li>Relevanz und Auswirkungen beurteilen</li><li>Risiken einschätzen</li><li>Prioritäten setzen</li><li>Stakeholder-Kontext berücksichtigen</li><li>Eskalationen und Entscheidungen verantworten</li></ul></div></div></JourneyResponsibility>
      <JourneyWorkflow />
      <JourneyContextNotice className="pm-governance" variant="guideline" icon={<span className="project-round-icon hub-icon-badge"><Icon name="book" /></span>} title="Projektinformationen bewusst verwenden" description="Verwende nur Projektinformationen, die im dafür freigegebenen AI-System verarbeitet werden dürfen. Prüfe sensible oder vertrauliche Inhalte vor der Nutzung." href="/guidelines" linkLabel="Guidelines ansehen" />
    </div>
  </div>;
}
