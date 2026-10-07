import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JourneyResponsibility, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import './team.css';
import '../journey-entry.css';

export function TeamDetail() {
  return <div className="page-container detail-page journey-entry tl-detail">
    <p className="eyebrow">TEAM LAB</p><h1>AI Team Experiment</h1>
    <JourneySummary items={[{ title: 'Was ihr hier macht', description: 'Eine konkrete Aufgabe aus eurem Arbeitsalltag auswählen und gemeinsam prüfen, wo AI sinnvoll unterstützen könnte.' }, { title: 'Was ihr am Ende habt', description: 'Ein kleines Experiment mit klaren Verantwortlichkeiten und gemeinsamen Beobachtungskriterien.' }]} />
    <div className="tl-meta hub-meta"><span><Icon name="clock" />ca. 45 min</span><span><Icon name="team" />Team</span><span>gemeinsames Experiment</span></div>
    <Link className="tl-button tl-primary hub-button hub-button-primary" href="/team-lab/experiment">Team Lab starten<Icon name="arrow" /></Link><p className="tl-small">Geführte Demo mit einem fiktiven Team. Es werden keine Eingaben gespeichert oder veröffentlicht.</p>
    <JourneyResponsibility><div><h3>AI kann unterstützen bei</h3><ul><li>Informationen zur Aufgabe vorbereiten</li><li>Material und Beobachtungen strukturieren</li></ul></div><div><h3>Ihr entscheidet gemeinsam</h3><ul><li>welche Aufgabe untersucht wird</li><li>welche Verantwortung beim Menschen bleibt</li><li>welche Nebenwirkungen beobachtet werden</li><li>weiterführen, anpassen oder stoppen</li></ul></div></JourneyResponsibility>

    <section className="tl-principle"><Icon name="team" /><div><h2>Nicht das Tool steht am Anfang</h2><p>Das Team Lab startet bei eurer Arbeit. Erst danach prüft ihr, ob AI überhaupt sinnvoll helfen kann.</p><p className="tl-small">Ziel: Geeignete AI-Anwendungen gemeinsam identifizieren, kontrolliert erproben und aus den Auswirkungen auf die tatsächliche Arbeit lernen.</p></div></section>
  </div>;
}
