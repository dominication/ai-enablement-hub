import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { JourneyHero, JourneyMeta, JourneyResponsibility, JourneyStartCard, JourneySummary } from '@/components/hub-ui/JourneyPatterns';
import '../journey-entry.css';
import './personal-guide.css';

export function PersonalGuideDetail() {
  return <div className="journey-entry hub-journey-page personal-detail">
    <JourneyHero
      backHref="/guides"
      backLabel="Zurück zu den Guides"
      category="Persönlicher Guide"
      title="Persönlicher KI-Einstieg"
      description="Orientierung für deine eigene Arbeit – ohne Bewertung und in deinem Tempo."
      art={<Image className="hub-journey-art" src="/images/home/learning-notes.svg" alt="" width={520} height={560} priority sizes="(max-width: 760px) 100vw, 42vw" />}
      metadata={<JourneyMeta items={[
        { icon: <Icon name="clock" />, title: 'In deinem Tempo', detail: 'auch ohne nächsten Schritt' },
        { icon: <Icon name="book" />, title: 'Sechs Einstiege', detail: 'passend zu deiner Situation' },
        { icon: <Icon name="shield" />, title: 'Nur lokal', detail: 'keine Analyse oder Speicherung' },
      ]} />}
    />
    <div className="hub-journey-content">
      <div className="hub-journey-orientation">
        <JourneySummary items={[
          { title: 'Was du hier findest', description: 'Du wählst eine persönliche Arbeitssituation und entwickelst daraus eine konkrete, editierbare Notiz.', details: ['Verstehen, klein ausprobieren oder verbessern', 'Vorbehalte und offene Fragen sortieren', 'Bewusst noch nicht beginnen'], icon: <span className="hub-icon-badge"><Icon name="book" /></span> },
          { title: 'Wie der Guide arbeitet', description: 'Alle Inhalte sind redaktionell kuratiert. Deine Auswahl wird nur im aktuellen Browserzustand zu einer Vorlage zusammengesetzt.', details: ['Kein Quiz und kein Kompetenz-Score', 'Keine Freitextanalyse oder versteckte Empfehlung'], icon: <span className="hub-icon-badge"><Icon name="shield" /></span> },
        ]} />
        <JourneyStartCard href="/guides/personal/experiment" label="Persönlichen Guide öffnen" note="Ohne Anmeldung, Speicherung oder Verbindung zu einem KI-Dienst." />
      </div>
      <JourneyResponsibility title="Was du mitnimmst – und was bewusst bei dir bleibt">
        <div><span className="hub-icon-badge"><Icon name="book" /></span><div><h3>Eine persönliche Arbeitshilfe</h3><ul><li>je nach Einstieg eine Orientierungs-, Versuchs- oder Gesprächsnotiz</li><li>aus deinen Auswahlen und manuellen Angaben gebildet</li><li>editierbar und kopierbar für deine weitere Arbeit</li></ul></div></div>
        <div><span className="hub-icon-badge"><Icon name="shield" /></span><div><h3>Deine Entscheidung und Verantwortung</h3><ul><li>Du entscheidest, ob du etwas ausprobieren möchtest.</li><li>Du prüfst Ergebnisse und beachtest Werkzeug- und Datenfreigaben.</li><li>Der Guide diagnostiziert, bewertet oder berät dich nicht persönlich.</li></ul></div></div>
      </JourneyResponsibility>
      <aside className="personal-prototype-note"><Icon name="shield" /><div><h2>Flüchtiger Prototyp ohne KI-Auswertung</h2><p>Nutze keine echten Unternehmens- oder Personendaten. Eingaben bleiben nur im React-Zustand dieser Sitzung und gehen beim Neuladen oder Verlassen verloren.</p></div></aside>
    </div>
  </div>;
}
