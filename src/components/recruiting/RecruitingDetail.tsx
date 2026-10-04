import Link from 'next/link';
import { Icon } from '@/components/Icon';
import './recruiting.css';

export function RecruitingDetail() {
  return <div className="page-container detail-page recruiting-detail">
    <Link className="back-link" href="/use-cases">← Zurück zu den Use Cases</Link>
    <div className="recruiting-heading"><span className="card-icon"><Icon name="interview" /></span><p className="eyebrow">Recruiting</p></div>
    <h1>Interview mit AI vorbereiten</h1>
    <p className="page-lead">Strukturiere Stellenprofil und Bewerbungsunterlagen und entwickle daraus gezielte Fragen für dein Interview.</p>
    <div className="recruiting-meta"><span><Icon name="clock" />ca. 15 min</span><span><Icon name="shield" />Personendaten</span><span><Icon name="team" />Human Review erforderlich</span></div>
    <div className="recruiting-start"><Link className="r-button r-primary" href="/use-cases/interview-vorbereiten/experiment">Experiment starten<Icon name="arrow" /></Link><p>Ein geführtes Experiment mit fiktiven Unterlagen.</p></div>
    <section className="support-section" aria-labelledby="support-title"><p className="eyebrow">GUTE VORBEREITUNG. BEWUSSTE ENTSCHEIDUNGEN.</p><h2 id="support-title">Was AI unterstützen kann</h2><div className="responsibility-grid">
      <div className="responsibility-card"><span className="eyebrow">STRUKTUR & IMPULSE</span><h3>AI unterstützt dich bei</h3><ul><li>Anforderungen aus dem Stellenprofil strukturieren</li><li>relevante Erfahrungen aus Bewerbungsunterlagen erkennen</li><li>Informationslücken sichtbar machen</li><li>mögliche Interviewfragen entwickeln</li></ul></div>
      <div className="responsibility-card human-card"><span className="eyebrow">KONTEXT & URTEIL</span><h3>Du bleibst verantwortlich für</h3><ul><li>Bewertung der Kandidat:innen</li><li>Interpretation von Erfahrung und Kontext</li><li>Fairness und Gleichbehandlung</li><li>Auswahl und Formulierung der finalen Interviewfragen</li><li>Personalentscheidungen</li></ul></div>
    </div></section>
    <aside className="responsible-notice"><Icon name="shield" /><div><h2>Dieser Use Case verarbeitet Personendaten</h2><p>Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. AI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung.</p><Link href="/guidelines#4" className="text-link">Mehr zu Personendaten<Icon name="arrow" /></Link></div></aside>
  </div>;
}
