import Link from 'next/link';
import { Icon } from '@/components/Icon';
import './recruiting.css';
import '../journey-entry.css';

export function RecruitingDetail() {
  return <div className="page-container detail-page journey-entry recruiting-detail">
    <Link className="back-link" href="/use-cases">← Zurück zu den Use Cases</Link>
    <div className="recruiting-heading"><span className="card-icon"><Icon name="interview" /></span><p className="eyebrow">Recruiting</p></div>
    <h1>Interview mit AI vorbereiten</h1>
    <div className="entry-summary"><section><h2>Was du hier machst</h2><p>Stellenprofil und fiktive Bewerbungsunterlagen strukturieren und daraus relevante Interviewfragen vorbereiten.</p></section><section><h2>Was du am Ende hast</h2><p>Ein geprüftes Set relevanter Interviewfragen für das Gespräch.</p></section></div>
    <div className="recruiting-meta"><span><Icon name="clock" />ca. 15 min</span><span><Icon name="shield" />Personendaten</span><span><Icon name="team" />Human Review erforderlich</span></div>
    <div className="recruiting-start"><Link className="r-button r-primary" href="/use-cases/interview-vorbereiten/experiment">Experiment starten<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit fiktiven Unterlagen.</p></div>
    <section className="entry-responsibility" aria-labelledby="support-title"><h2 id="support-title">Unterstützung und Verantwortung</h2><div className="entry-pair">
      <div className="responsibility-card"><h3>AI unterstützt</h3><ul><li>Anforderungen aus dem Stellenprofil strukturieren</li><li>relevante Erfahrungen aus Bewerbungsunterlagen erkennen</li><li>Informationslücken sichtbar machen</li><li>mögliche Interviewfragen entwickeln</li></ul></div>
      <div className="responsibility-card human-card"><h3>Du entscheidest</h3><ul><li>Relevanz und Bewertung der Kandidat:innen</li><li>Interpretation von Erfahrung und Kontext</li><li>Fairness und Gleichbehandlung</li><li>Auswahl und Formulierung der finalen Interviewfragen</li><li>Personalentscheidungen</li></ul></div>
    </div></section>
    <aside className="responsible-notice"><Icon name="shield" /><div><h2>Dieser Use Case verarbeitet Personendaten</h2><p>Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. AI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung.</p><Link href="/guidelines#4" className="text-link">Mehr zu Personendaten<Icon name="arrow" /></Link></div></aside>
  </div>;
}
