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
        { icon: <Icon name="clock" />, title: 'In deinem Tempo', detail: 'ein Anliegen vertiefen' },
        { icon: <Icon name="team" />, title: 'Sieben Einstiege', detail: 'passend zu deiner Situation' },
        { icon: <Icon name="shield" />, title: 'Lokal im Browser', detail: 'keine Analyse durch KI' },
      ]} />}
    />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation">
        <JourneySummary items={[
          { title: 'Was du hier findest', description: 'Du wählst den Einstieg, der zu deiner aktuellen Führungssituation passt, und entwickelst daraus eine konkrete Arbeitshilfe.', details: ['Unsicherheit und Anliegen klären', 'Nächste Gespräche oder Schritte vorbereiten', 'Ergebnisse editieren und kopieren'], icon: <span className="hub-icon-badge"><Icon name="team" /></span> },
          { title: 'Womit du starten kannst', description: 'Von möglichen Anwendungsfällen über Kapazität und Governance bis zu offenen Fragen: Jeder Pfad funktioniert eigenständig.', details: ['Kein vorgegebener Musterfall', 'Wechsel zwischen Themen jederzeit möglich'], icon: <span className="hub-icon-badge"><Icon name="project" /></span> },
        ]} />
        <JourneyStartCard href="/leadership/experiment" label="Guide öffnen" note="Lokale Arbeitshilfe ohne Speicherung, Anmeldung oder Verbindung zu einem KI-Dienst." />
      </div>
      <JourneyResponsibility title="Was du mitnimmst – und wo das Team Lab anschliesst">
        <div><span className="hub-icon-badge"><Icon name="book" /></span><div><h3>Eine passende Arbeitshilfe</h3><ul><li>je nach Einstieg ein Gesprächsrahmen, eine Shortlist oder ein nächster Schritt</li><li>editierbar und zum Kopieren für deine weitere Arbeit</li><li>ohne automatische Bewertung oder Handlungsempfehlung</li></ul></div></div>
        <div><span className="hub-icon-badge"><Icon name="team" /></span><div><h3>Anders als das Team Lab</h3><ul><li>Diese Journey fokussiert Führung und Veränderungsbegleitung.</li><li>Das Team Lab untersucht anschliessend mit dem Team eine konkrete Arbeitsaufgabe.</li><li>Beide Wege zielen auf gemeinsames Lernen, nicht auf maximale KI-Nutzung.</li></ul></div></div>
      </JourneyResponsibility>
      <aside className="leadership-prototype-note"><Icon name="shield" /><div><h2>Lokaler Prototyp ohne KI-Analyse</h2><p>Der Guide ersetzt weder eine Tool-Freigabe noch eine Sicherheitsprüfung oder eine organisatorische Entscheidung. Eingaben bleiben nur im aktuellen React-Zustand und gehen beim Neuladen oder Verlassen verloren.</p></div></aside>
    </div>
  </div>;
}
