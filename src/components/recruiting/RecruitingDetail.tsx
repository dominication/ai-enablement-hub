import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { JourneyContextNotice, JourneyHero, JourneyMeta, JourneyResponsibility, JourneyStartCard, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import { JourneyWorkflow } from '@/components/JourneyWorkflow';
import './recruiting.css';
import '../journey-entry.css';

export function RecruitingDetail() {
  return <div className="journey-entry recruiting-detail hf-recruiting hub-journey-page">
    <JourneyHero backHref="/use-cases" backLabel="Zurück zu den Use Cases" category="Recruiting" title="Interview mit KI vorbereiten" description="Bessere Fragen, strukturierte Vorbereitung und gezieltere Gespräche."
      art={<Image className="hub-journey-art" src="/images/home/recruiting.svg" alt="" width={520} height={560} priority sizes="(max-width: 760px) 100vw, 42vw" />}
      metadata={<JourneyMeta className="recruiting-meta" items={[
        { icon: <Icon name="clock" />, title: 'ca. 15 min', detail: 'für das geführte Experiment' },
        { icon: <Icon name="shield" />, title: 'Personendaten', detail: 'nur fiktive Unterlagen' },
        { icon: <Icon name="team" />, title: 'Human Review erforderlich', detail: 'Einordnung bleibt bei dir' },
      ]} />} />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation"><JourneySummary items={[{
        title: 'Was du hier machst', description: 'Stellenprofil und fiktive Bewerbungsunterlagen strukturieren und daraus relevante Interviewfragen vorbereiten.', details: ['Relevante Themen sichtbar machen', 'Mögliche Fragen ableiten', 'Fragen prüfen und ordnen'], icon: <span className="hub-icon-badge"><Icon name="search" /></span>,
      }, {
        title: 'Was du am Ende hast', description: 'Ein geprüftes Set relevanter Interviewfragen für das Gespräch.', details: ['Fragen mit Bezug zu Rolle und Unterlagen', 'Eine Grundlage für deine Gesprächsführung'], icon: <span className="hub-icon-badge"><Icon name="interview" /></span>,
      }]} />
      <JourneyStartCard className="recruiting-start" href="/use-cases/interview-vorbereiten/experiment" label="Experiment starten" note="Ein geführtes Experiment mit fiktiven Unterlagen." /></div>
      <JourneyResponsibility id="support-title">
        <div><span className="hub-icon-badge"><Icon name="project" /></span><div><h3>KI unterstützt</h3><ul><li>die Vorbereitung strukturieren</li><li>mögliche Interviewfragen ableiten</li><li>relevante Themen sichtbar machen</li><li>Fragen formulieren und ordnen</li></ul></div></div>
        <div><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Du entscheidest</h3><ul><li>Kontext, Fairness und Gleichbehandlung einordnen</li><li>Kandidat:innen bewerten</li><li>Personalentscheidungen treffen</li><li>finale Fragen auswählen und das Gespräch führen</li></ul></div></div>
      </JourneyResponsibility>
      <JourneyWorkflow title="So verändert sich deine Interviewvorbereitung" intro="KI hilft beim Strukturieren und Formulieren. Einordnung und Gesprächsführung bleiben bei dir." steps={[
        { title: 'Unterlagen auswählen', detail: 'Du wählst relevante fiktive Unterlagen.', icon: 'book', role: 'human' },
        { title: 'KI strukturiert', detail: 'KI macht Themen und Anforderungen sichtbar.', icon: 'project', role: 'ai' },
        { title: 'Fragen ableiten', detail: 'KI schlägt mögliche Fragen vor.', icon: 'interview', role: 'ai' },
        { title: 'Prüfen und einordnen', detail: 'Du prüfst Relevanz, Fairness und Kontext.', icon: 'shield', role: 'human' },
        { title: 'Gespräch führen', detail: 'Du entscheidest und führst das Interview.', icon: 'team', role: 'human' },
      ]} />
      <JourneyContextNotice className="responsible-notice" variant="personal-data" icon={<span className="hub-icon-badge"><Icon name="shield" /></span>} title="Dieser Use Case verarbeitet Personendaten" description="Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. KI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung." href="/guidelines#4" linkLabel="Mehr zu Personendaten" />
    </div>
  </div>;
}
