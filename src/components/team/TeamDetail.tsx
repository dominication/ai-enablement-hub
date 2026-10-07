import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { JourneyHero, JourneyResponsibility, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import './team.css';
import '../journey-entry.css';

export function TeamDetail() {
  return <div className="journey-entry tl-detail hub-journey-page hub-team-detail">
    <JourneyHero category="Team Lab" title="AI Team Experiment" description="Eine Aufgabe aus eurem Arbeitsalltag gemeinsam untersuchen und bewusst entscheiden, wo AI sinnvoll unterstützen kann."
      art={<Image className="hub-journey-art" src="/images/home/team.svg" alt="" width={520} height={560} priority sizes="(max-width: 760px) 100vw, 42vw" />}
      metadata={null} />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation hub-team-orientation"><JourneySummary items={[{ title: 'Was ihr hier macht', description: 'Eine konkrete Aufgabe aus eurem Arbeitsalltag auswählen und gemeinsam prüfen, wo AI sinnvoll unterstützen könnte.', icon: <span className="hub-icon-badge"><Icon name="team" /></span> }, { title: 'Was ihr am Ende habt', description: 'Ein kleines Experiment mit klaren Verantwortlichkeiten und gemeinsamen Beobachtungskriterien.', icon: <span className="hub-icon-badge"><Icon name="project" /></span> }]} />
      <div className="hub-team-action"><div className="tl-meta hub-meta hub-team-meta"><span><Icon name="clock" />ca. 45 min</span><span><Icon name="team" />Team</span><span><Icon name="project" />gemeinsames Experiment</span></div><div className="hub-journey-start"><Link className="tl-button tl-primary hub-button hub-button-primary" href="/team-lab/experiment">Team Lab starten<Icon name="arrow" /></Link><p className="tl-small">Geführte Demo mit einem fiktiven Team. Es werden keine Eingaben gespeichert oder veröffentlicht.</p></div></div></div>
      <JourneyResponsibility><div><span className="hub-icon-badge"><Icon name="project" /></span><div><h3>AI kann unterstützen bei</h3><ul><li>Informationen zur Aufgabe vorbereiten</li><li>Material und Beobachtungen strukturieren</li></ul></div></div><div><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Ihr entscheidet gemeinsam</h3><ul><li>welche Aufgabe untersucht wird</li><li>welche Verantwortung beim Menschen bleibt</li><li>welche Nebenwirkungen beobachtet werden</li><li>weiterführen, anpassen oder stoppen</li></ul></div></div></JourneyResponsibility>
      <section className="tl-principle hub-team-principle"><span className="hub-icon-badge"><Icon name="team" /></span><div><h2>Nicht das Tool steht am Anfang</h2><p>Das Team Lab startet bei eurer Arbeit. Erst danach prüft ihr, ob AI überhaupt sinnvoll helfen kann.</p><p className="tl-small">Ziel: Geeignete AI-Anwendungen gemeinsam identifizieren, kontrolliert erproben und aus den Auswirkungen auf die tatsächliche Arbeit lernen.</p></div></section>
    </div>
  </div>;
}
