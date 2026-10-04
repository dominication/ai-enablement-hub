import Link from 'next/link';
import { Icon } from '@/components/Icon';
import './team.css';

export function TeamDetail() {
  return <div className="page-container detail-page tl-detail">
    <p className="eyebrow">TEAM LAB</p><h1>AI Team Experiment</h1>
    <p className="page-lead">Findet gemeinsam eine konkrete Aufgabe aus eurem Arbeitsalltag, bei der AI sinnvoll unterstützen könnte – und gestaltet daraus ein kleines, kontrolliertes Experiment.</p>
    <div className="tl-meta"><span><Icon name="clock" />ca. 45 min</span><span><Icon name="team" />Team</span><span>gemeinsames Experiment</span></div>
    <Link className="tl-button tl-primary" href="/team-lab/experiment">Team Lab starten<Icon name="arrow" /></Link><p className="tl-small">Geführte Demo mit einem fiktiven Team. Es werden keine Eingaben gespeichert oder veröffentlicht.</p>
    <section className="tl-outcomes"><h2>Was ihr am Ende habt</h2><div>{['eine konkrete Aufgabe, die ihr untersuchen möchtet', 'eine klare Aufteilung zwischen AI-Unterstützung und menschlicher Verantwortung', 'ein kleines Experiment mit Beobachtungskriterien', 'eine gemeinsame Entscheidung: weiterführen, anpassen oder stoppen'].map((text, index) => <article key={text}><span className="eyebrow">0{index + 1}</span><p>{text}</p></article>)}</div></section>
    <section className="tl-principle"><Icon name="team" /><div><h2>Nicht das Tool steht am Anfang</h2><p>Das Team Lab startet bei eurer Arbeit. Erst danach prüft ihr, ob AI überhaupt sinnvoll helfen kann.</p><p className="tl-small">Ziel: Geeignete AI-Anwendungen gemeinsam identifizieren, kontrolliert erproben und aus den Auswirkungen auf die tatsächliche Arbeit lernen.</p></div></section>
  </div>;
}
