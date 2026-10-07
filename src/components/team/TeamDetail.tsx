import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { JourneyHero, JourneyMeta, JourneyResponsibility, JourneyStartCard, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import { JourneyWorkflow } from '@/components/JourneyWorkflow';
import './team.css';
import '../journey-entry.css';

export function TeamDetail() {
  return <div className="journey-entry tl-detail hub-journey-page hub-team-detail">
    <JourneyHero backHref="/use-cases" backLabel="Zurück zu den Use Cases" category="Team Lab" title="AI Team Experiment" description="Eine Aufgabe aus eurem Arbeitsalltag gemeinsam untersuchen und bewusst entscheiden, wo AI sinnvoll unterstützen kann."
      art={<Image className="hub-journey-art hub-journey-photo" src="/images/home/team-hero.webp" alt="" width={1400} height={933} priority sizes="(max-width: 760px) 100vw, 42vw" />}
      metadata={<JourneyMeta className="tl-meta" items={[
        { icon: <Icon name="clock" />, title: 'ca. 45 min', detail: 'für das Teamgespräch' },
        { icon: <Icon name="team" />, title: 'Teamformat', detail: 'gemeinsam reflektieren' },
        { icon: <Icon name="project" />, title: 'Gemeinsames Experiment', detail: 'klein und bewusst starten' },
      ]} />} />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation"><JourneySummary items={[{ title: 'Was ihr hier macht', description: 'Eine konkrete Aufgabe aus eurem Arbeitsalltag auswählen und gemeinsam prüfen, wo AI sinnvoll unterstützen könnte.', details: ['Aufgabe aus dem Arbeitsalltag auswählen', 'AI-Unterstützung klar eingrenzen', 'Wirkungen und Nebenwirkungen beobachten'], icon: <span className="hub-icon-badge"><Icon name="team" /></span> }, { title: 'Was ihr am Ende habt', description: 'Ein kleines Experiment mit klaren Verantwortlichkeiten und gemeinsamen Beobachtungskriterien.', details: ['Einen überschaubaren Versuch', 'Klare Verantwortung für Mensch und AI', 'Gemeinsame Kriterien zum Lernen'], icon: <span className="hub-icon-badge"><Icon name="project" /></span> }]} />
      <JourneyStartCard href="/team-lab/experiment" label="Team Lab starten" note="Geführte Demo mit einem fiktiven Team. Es werden keine Eingaben gespeichert oder veröffentlicht." /></div>
      <JourneyResponsibility><div><span className="hub-icon-badge"><Icon name="project" /></span><div><h3>AI kann unterstützen bei</h3><ul><li>Informationen zur Aufgabe vorbereiten</li><li>Material und Beobachtungen strukturieren</li></ul></div></div><div><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Ihr entscheidet gemeinsam</h3><ul><li>welche Aufgabe untersucht wird</li><li>welche Verantwortung beim Menschen bleibt</li><li>welche Nebenwirkungen beobachtet werden</li><li>weiterführen, anpassen oder stoppen</li></ul></div></div></JourneyResponsibility>
      <JourneyWorkflow title="So gestaltet ihr euer Team-Experiment" intro="Ihr startet bei der Arbeit, grenzt Unterstützung bewusst ein und lernt gemeinsam aus dem Versuch." steps={[
        { title: 'Arbeit', detail: 'Ihr wählt eine konkrete Aufgabe aus.', icon: 'book', role: 'human' },
        { title: 'Fokus', detail: 'Ihr grenzt das Experiment gemeinsam ein.', icon: 'search', role: 'human' },
        { title: 'Mensch & AI', detail: 'Ihr klärt Unterstützung und Verantwortung.', icon: 'team', role: 'ai' },
        { title: 'Experiment', detail: 'Ihr beobachtet Wirkung und Nebenwirkungen.', icon: 'project', role: 'human' },
        { title: 'Lernen', detail: 'Ihr entscheidet: weiterführen, anpassen oder stoppen.', icon: 'interview', role: 'human' },
      ]} />
      <section className="tl-principle hub-team-principle"><span className="hub-icon-badge"><Icon name="team" /></span><div><h2>Nicht das Tool steht am Anfang</h2><p>Das Team Lab startet bei eurer Arbeit. Erst danach prüft ihr, ob AI überhaupt sinnvoll helfen kann.</p><p className="tl-small">Ziel: Geeignete AI-Anwendungen gemeinsam identifizieren, kontrolliert erproben und aus den Auswirkungen auf die tatsächliche Arbeit lernen.</p></div></section>
    </div>
  </div>;
}
