import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { JourneyHero, JourneyMeta, JourneyResponsibility, JourneyStartCard, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import './leadership.css';
import '../journey-entry.css';

export function LeadershipDetail() {
  return <div className="journey-entry hub-journey-page leadership-detail">
    <JourneyHero
      backHref="/use-cases"
      backLabel="Zurück zu den Use Cases"
      category="Führung & Change"
      title="KI im Team begleiten"
      description="Veränderung beginnt nicht beim Tool. Sondern bei der gemeinsamen Arbeit."
      art={<Image className="hub-journey-art" src="/images/home/team.svg" alt="" width={520} height={560} priority sizes="(max-width: 760px) 100vw, 42vw" />}
      metadata={<JourneyMeta items={[
        { icon: <Icon name="clock" />, title: 'ca. 15–20 min', detail: 'für die geführte Journey' },
        { icon: <Icon name="team" />, title: 'Führung & Veränderung', detail: 'für Teams in Bewegung' },
        { icon: <Icon name="shield" />, title: 'Fiktiver Fall', detail: 'keine echten Teamdaten' },
      ]} />}
    />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation">
        <JourneySummary items={[
          { title: 'Was du hier machst', description: 'Du klärst Auftrag und Spannungsfelder, hörst unterschiedliche Perspektiven und gestaltest Beteiligung sowie sichere Rahmenbedingungen.', details: ['Mögliche Wirkungen abwägen', 'Gespräch und Beteiligung planen', 'Eine bewusste Entscheidung vorbereiten'], icon: <span className="hub-icon-badge"><Icon name="team" /></span> },
          { title: 'Welche Situation dich erwartet', description: 'Ein hoch ausgelastetes internes Service-Team soll in sechs Wochen erste Erfahrungen mit KI sammeln. Qualität, Verantwortung und Freigaben sind noch zu klären.', details: ['Achtköpfiges fiktives Team', 'Gemischte Erfahrungen und Erwartungen'], icon: <span className="hub-icon-badge"><Icon name="project" /></span> },
        ]} />
        <JourneyStartCard href="/leadership/experiment" label="Journey starten" note="Lokale Demo ohne Speicherung, Anmeldung oder Verbindung zu einem KI-Dienst." />
      </div>
      <JourneyResponsibility title="Was du mitnimmst – und wo das Team Lab anschliesst">
        <div><span className="hub-icon-badge"><Icon name="book" /></span><div><h3>Dein Begleitplan</h3><ul><li>deine Klärungsfragen und gewählte Handlungsrichtung</li><li>dein Vorgehen für Beteiligung und Rahmenbedingungen</li><li>deine Reflexion: weiterführen, anpassen oder stoppen</li></ul></div></div>
        <div><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Anders als das Team Lab</h3><ul><li>Diese Journey fokussiert Führung und Veränderungsbegleitung.</li><li>Das Team Lab untersucht anschliessend mit dem Team eine konkrete Arbeitsaufgabe.</li><li>Beide Wege zielen auf gemeinsames Lernen, nicht auf maximale KI-Nutzung.</li></ul></div></div>
      </JourneyResponsibility>
      <aside className="leadership-prototype-note"><Icon name="shield" /><div><h2>Enterprise-Prototyp mit fiktiven Inhalten</h2><p>Die Journey ersetzt weder eine Tool-Freigabe noch eine Sicherheitsprüfung oder eine organisatorische Entscheidung. Demo-Eingaben bleiben nur im aktuellen React-Zustand und gehen beim Neuladen oder Verlassen verloren.</p></div></aside>
    </div>
  </div>;
}
