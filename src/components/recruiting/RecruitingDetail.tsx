import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JourneyContextNotice, JourneyHero, JourneyResponsibility, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import { JourneyWorkflow } from '@/components/JourneyWorkflow';
import './recruiting.css';
import '../journey-entry.css';

export function RecruitingDetail() {
  return <div className="journey-entry recruiting-detail hf-recruiting hub-journey-page">
    <JourneyHero backHref="/use-cases" backLabel="Zurück zu den Use Cases" category="Recruiting" title="Interview mit AI vorbereiten" description="Bessere Fragen, strukturierte Vorbereitung und gezieltere Gespräche."
      art={<Image className="hub-journey-art" src="/images/home/recruiting.svg" alt="" width={520} height={560} priority sizes="(max-width: 760px) 100vw, 42vw" />}
      metadata={<div className="recruiting-meta hub-journey-meta hub-meta"><span><Icon name="clock" /><span><strong>ca. 15 min</strong><small>für das geführte Experiment</small></span></span><span><Icon name="shield" /><span><strong>Personendaten</strong><small>nur fiktive Unterlagen</small></span></span><span><Icon name="team" /><span><strong>Human Review erforderlich</strong><small>Einordnung bleibt bei dir</small></span></span></div>} />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation"><JourneySummary items={[{
        title: 'Was du hier machst', description: 'Stellenprofil und fiktive Bewerbungsunterlagen strukturieren und daraus relevante Interviewfragen vorbereiten.', details: ['Relevante Themen sichtbar machen', 'Mögliche Fragen ableiten', 'Fragen prüfen und ordnen'], icon: <span className="hub-icon-badge"><Icon name="search" /></span>,
      }, {
        title: 'Was du am Ende hast', description: 'Ein geprüftes Set relevanter Interviewfragen für das Gespräch.', details: ['Fragen mit Bezug zu Rolle und Unterlagen', 'Eine Grundlage für deine Gesprächsführung'], icon: <span className="hub-icon-badge"><Icon name="interview" /></span>,
      }]} />
      <div className="recruiting-start hub-journey-start"><Link className="r-button r-primary hub-button hub-button-primary" href="/use-cases/interview-vorbereiten/experiment">Experiment starten<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit fiktiven Unterlagen.</p></div></div>
      <JourneyResponsibility id="support-title">
        <div><span className="hub-icon-badge"><Icon name="project" /></span><div><h3>AI unterstützt</h3><ul><li>die Vorbereitung strukturieren</li><li>mögliche Interviewfragen ableiten</li><li>relevante Themen sichtbar machen</li><li>Fragen formulieren und ordnen</li></ul></div></div>
        <div><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Du entscheidest</h3><ul><li>Kontext, Fairness und Gleichbehandlung einordnen</li><li>Kandidat:innen bewerten</li><li>Personalentscheidungen treffen</li><li>finale Fragen auswählen und das Gespräch führen</li></ul></div></div>
      </JourneyResponsibility>
      <JourneyWorkflow title="So verändert sich deine Interviewvorbereitung" intro="AI hilft beim Strukturieren und Formulieren. Einordnung und Gesprächsführung bleiben bei dir." steps={[
        { title: 'Unterlagen auswählen', detail: 'Du wählst relevante fiktive Unterlagen.', icon: 'book', role: 'human' },
        { title: 'AI strukturiert', detail: 'AI macht Themen und Anforderungen sichtbar.', icon: 'project', role: 'ai' },
        { title: 'Fragen ableiten', detail: 'AI schlägt mögliche Fragen vor.', icon: 'interview', role: 'ai' },
        { title: 'Prüfen und einordnen', detail: 'Du prüfst Relevanz, Fairness und Kontext.', icon: 'shield', role: 'human' },
        { title: 'Gespräch führen', detail: 'Du entscheidest und führst das Interview.', icon: 'team', role: 'human' },
      ]} />
      <JourneyContextNotice className="responsible-notice" variant="personal-data" icon={<span className="hub-icon-badge"><Icon name="shield" /></span>} title="Dieser Use Case verarbeitet Personendaten" description="Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. AI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung." href="/guidelines#4" linkLabel="Mehr zu Personendaten" />
    </div>
  </div>;
}
