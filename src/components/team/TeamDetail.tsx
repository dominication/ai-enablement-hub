import Link from 'next/link';
import { Icon } from '@/components/Icon';
import './team.css';
import '../journey-entry.css';

export function TeamDetail() {
  return <div className="page-container detail-page journey-entry tl-detail">
    <Link className="back-link" href="/use-cases">← Zurück zu den Use Cases</Link>
    <p className="eyebrow">TEAM LAB</p><h1>AI Team Experiment</h1>
    <div className="entry-summary"><section><h2>Was ihr hier macht</h2><p>Eine konkrete Aufgabe aus eurem Arbeitsalltag auswählen und gemeinsam prüfen, wo AI sinnvoll unterstützen könnte.</p></section><section><h2>Was ihr am Ende habt</h2><p>Ein kleines Experiment mit klaren Verantwortlichkeiten und gemeinsamen Beobachtungskriterien.</p></section></div>
    <div className="tl-meta"><span><Icon name="clock" />ca. 45 min</span><span><Icon name="team" />Team</span><span>gemeinsames Experiment</span></div>
    <Link className="tl-button tl-primary" href="/team-lab/experiment">Team Lab starten<Icon name="arrow" /></Link><p className="tl-small">Geführte Demo mit einem fiktiven Team. Es werden keine Eingaben gespeichert oder veröffentlicht.</p>
    <section className="entry-responsibility"><h2>Unterstützung und Verantwortung</h2><div className="entry-pair"><div><h3>AI kann unterstützen bei</h3><ul><li>Informationen zur Aufgabe vorbereiten</li><li>Material und Beobachtungen strukturieren</li></ul></div><div><h3>Ihr entscheidet gemeinsam</h3><ul><li>welche Aufgabe untersucht wird</li><li>welche Verantwortung beim Menschen bleibt</li><li>welche Nebenwirkungen beobachtet werden</li><li>weiterführen, anpassen oder stoppen</li></ul></div></div></section>

    <section className="tl-principle"><Icon name="team" /><div><h2>Nicht das Tool steht am Anfang</h2><p>Das Team Lab startet bei eurer Arbeit. Erst danach prüft ihr, ob AI überhaupt sinnvoll helfen kann.</p><p className="tl-small">Ziel: Geeignete AI-Anwendungen gemeinsam identifizieren, kontrolliert erproben und aus den Auswirkungen auf die tatsächliche Arbeit lernen.</p></div></section>
  </div>;
}
