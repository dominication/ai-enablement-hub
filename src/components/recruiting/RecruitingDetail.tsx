import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JourneyContextNotice, JourneyResponsibility, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import './recruiting.css';
import '../journey-entry.css';

export function RecruitingDetail() {
  return <div className="page-container detail-page journey-entry recruiting-detail">
    <Link className="back-link" href="/use-cases">← Zurück zu den Use Cases</Link>
    <div className="recruiting-heading"><span className="card-icon"><Icon name="interview" /></span><p className="eyebrow">Recruiting</p></div>
    <h1>Interview mit AI vorbereiten</h1>
    <JourneySummary items={[{ title: 'Was du hier machst', description: 'Stellenprofil und fiktive Bewerbungsunterlagen strukturieren und daraus relevante Interviewfragen vorbereiten.' }, { title: 'Was du am Ende hast', description: 'Ein geprüftes Set relevanter Interviewfragen für das Gespräch.' }]} />
    <div className="recruiting-meta hub-meta"><span><Icon name="clock" />ca. 15 min</span><span><Icon name="shield" />Personendaten</span><span><Icon name="team" />Human Review erforderlich</span></div>
    <div className="recruiting-start"><Link className="r-button r-primary hub-button hub-button-primary" href="/use-cases/interview-vorbereiten/experiment">Experiment starten<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit fiktiven Unterlagen.</p></div>
    <JourneyResponsibility id="support-title">
      <div className="responsibility-card"><h3>AI unterstützt</h3><ul><li>Anforderungen aus dem Stellenprofil strukturieren</li><li>relevante Erfahrungen aus Bewerbungsunterlagen erkennen</li><li>Informationslücken sichtbar machen</li><li>mögliche Interviewfragen entwickeln</li></ul></div>
      <div className="responsibility-card human-card"><h3>Du entscheidest</h3><ul><li>Relevanz und Bewertung der Kandidat:innen</li><li>Interpretation von Erfahrung und Kontext</li><li>Fairness und Gleichbehandlung</li><li>Auswahl und Formulierung der finalen Interviewfragen</li><li>Personalentscheidungen</li></ul></div>
    </JourneyResponsibility>
    <JourneyContextNotice className="responsible-notice" variant="personal-data" icon={<Icon name="shield" />} title="Dieser Use Case verarbeitet Personendaten" description="Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. AI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung." href="/guidelines#4" linkLabel="Mehr zu Personendaten" />
  </div>;
}
