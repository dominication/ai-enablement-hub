export type GuidePathId = 'uncertainty' | 'use-cases' | 'perspectives' | 'capacity' | 'governance' | 'orientation' | 'other';
export type GuideStage = 'orientation' | 'support' | 'takeaway';
export type ResponsibilityId = 'self' | 'alignment';

export type GuidePathSummary = {
  id: GuidePathId;
  title: string;
  promise: string;
  takeaway: string;
};

export const leadershipFrame = 'Du begleitest die Einführung von KI in einem achtköpfigen Service-Team. Im Alltag gibt es unterschiedliche Erfahrungen, fachliche Anforderungen und begrenzte Ressourcen. Die Organisation möchte erste Erfahrungen sammeln.';

export const guidePaths: GuidePathSummary[] = [
  {
    id: 'uncertainty',
    title: 'Ich bin selbst unsicher wegen KI und meiner Rolle',
    promise: 'Du musst nicht von KI überzeugt sein, um dein Team verantwortungsvoll zu begleiten.',
    takeaway: 'Persönliche Orientierung, Teamgespräch oder Fragen an die Bereichsleitung',
  },
  {
    id: 'use-cases',
    title: 'Ich möchte mit meinem Team Use Cases finden',
    promise: 'Nicht mit Tools starten, sondern bei der Arbeit, die das Team leichter, verlässlicher oder klarer gestalten möchte.',
    takeaway: 'Moderationsvorlage oder selbst kuratierte Use-Case-Shortlist',
  },
  {
    id: 'perspectives',
    title: 'In meinem Team gibt es unterschiedliche Perspektiven oder Bedenken',
    promise: 'Ein Gespräch vorbereiten, in dem Unterschiedlichkeit Platz hat und trotzdem ein nächster Schritt möglich wird.',
    takeaway: 'Konkrete Vorlage für dein Teamgespräch',
  },
  {
    id: 'capacity',
    title: 'Uns fehlen Zeit und Ressourcen',
    promise: 'KI ausprobieren soll kein zusätzliches Projekt werden, das ohne Raum neben dem Tagesgeschäft laufen muss.',
    takeaway: 'Gesprächs- und Abstimmungsnotiz zur Kapazität',
  },
  {
    id: 'governance',
    title: 'Wir haben Fragen zu Qualität, Daten und Verantwortung',
    promise: 'Fragen früh sichtbar machen, bevor ein reales KI-Experiment beginnt.',
    takeaway: 'Prüfblatt ohne automatische Freigabe oder Bewertung',
  },
  {
    id: 'orientation',
    title: 'Ziele, Erwartungen oder Spielräume sind noch nicht ganz klar',
    promise: 'An bestehende Vereinbarungen anknüpfen und nur jene Punkte klären, die noch offen sind.',
    takeaway: 'Orientierungsnotiz für den nächsten Schritt',
  },
  {
    id: 'other',
    title: 'Etwas anderes',
    promise: 'Halte dein Anliegen als persönliche Notiz fest oder öffne gezielt einen der sechs Guides.',
    takeaway: 'Kopierbare Notiz – ohne KI-Auswertung oder versteckte Empfehlung',
  },
];

export const uncertaintyOffers = [
  {
    id: 'self',
    title: 'Eigene Situation einordnen',
    impulse: 'Was ist zu meiner Rolle bereits entschieden, was wird nur vermutet, und welche Informationen fehlen?',
    questions: ['Welche Aufgaben meiner Rolle könnten sich ändern?', 'Was ist dazu tatsächlich kommuniziert?', 'Welche Unterstützung oder Entwicklungsmöglichkeiten gibt es?'],
    outputTitle: 'Meine persönliche Orientierung',
  },
  {
    id: 'team',
    title: 'Mit meinem Team offen sprechen',
    impulse: 'KI wird voraussichtlich Auswirkungen auf unsere Arbeit haben. Ich sehe Möglichkeiten und offene Fragen. Mir ist wichtig, dass wir beides ansprechen können.',
    questions: ['Welche Erfahrungen mit KI gibt es im Team bereits?', 'Welche Befürchtungen und offenen Fragen sollten Raum bekommen?', 'Welche Informationen sind gesichert – und was ist noch unklar?', 'Was braucht ihr, damit wir ehrlich über mögliche Veränderungen sprechen können?'],
    outputTitle: 'Mein nächstes Teamgespräch',
  },
  {
    id: 'leadership',
    title: 'Gespräch mit der Bereichsleitung vorbereiten',
    impulse: 'Bereite verbindliche Fragen vor, ohne selbst Garantien zu versprechen, die du nicht geben kannst.',
    questions: ['Welche Veränderungen von Aufgaben und Rollen sind absehbar?', 'Was steht schon fest, wo ist Mitgestaltung möglich?', 'Wer kann zu Arbeitsplatzfragen verbindlich Auskunft geben?'],
    outputTitle: 'Meine Fragen an die Bereichsleitung',
  },
] as const;

export const frictionFields = [
  { id: 'recurring', label: 'Wiederkehrende Arbeit' },
  { id: 'information', label: 'Informationen suchen oder ordnen' },
  { id: 'writing', label: 'Berichte oder Texte vorbereiten' },
  { id: 'coordination', label: 'Koordination und Zusammenarbeit' },
  { id: 'unknown', label: 'Wir wissen es noch nicht' },
] as const;

export const discoverySteps = [
  'Tätigkeiten sammeln, nicht KI-Ideen.',
  'Beispiele und Aufwand aus unterschiedlichen Perspektiven besprechen.',
  'Maximal zwei oder drei Aufgaben für eine vertiefte Betrachtung auswählen.',
  'Fragen zu Qualität, Daten, Beteiligung und Kontrollaufwand festhalten.',
];

export const exampleIdeas = [
  'Wiederkehrende Statusnotizen strukturieren',
  'Freigegebene Informationen zusammenfassen',
  'Standardantworten als Entwurf formulieren',
] as const;

export const ideaReviewQuestions = [
  'Welcher konkrete Arbeitsbedarf steht dahinter?',
  'Was bleibt fachlich beim Menschen?',
  'Welche Daten wären beteiligt und welche Freigaben sind offen?',
  'Welcher zusätzliche Prüfaufwand ist zu erwarten?',
];

export const concernTopics = [
  { id: 'quality', label: 'Qualitätsbedenken', questions: ['Was wäre bei dieser Aufgabe ein verlässliches Ergebnis?', 'Welche Fehler wären besonders folgenreich?', 'Wie müsste die fachliche Prüfung aussehen?'] },
  { id: 'experience', label: 'Unterschiedliche Erfahrung mit KI', questions: ['Welche Erfahrungen haben wir bereits gemacht?', 'Was können wir voneinander lernen, ohne Erfahrung vorauszusetzen?', 'Welche Unterstützung würde einen fairen Einstieg ermöglichen?'] },
  { id: 'roles', label: 'Sorge vor Rollenveränderung', questions: ['Welche Veränderungen wären hilfreich und was wäre problematisch?', 'Was wissen wir über mögliche Rollenveränderungen tatsächlich?', 'Welche Fragen brauchen eine verbindliche Antwort ausserhalb des Teams?'] },
  { id: 'history', label: 'Frühere Veränderungserfahrungen', questions: ['Welche Erfahrungen sollten wir diesmal berücksichtigen?', 'Was wurde damals versprochen und wie wurde es erlebt?', 'Was möchten wir diesmal transparent festhalten und zurückmelden?'] },
  { id: 'silence', label: 'Bislang wenig Rückmeldung im Team', questions: ['Welche Form erleichtert es, Beobachtungen ohne Rechtfertigungsdruck einzubringen?', 'Welche Stimmen fehlen uns bisher?', 'Wie können Rückmeldungen auch nach dem Gespräch noch einfliessen?'] },
] as const;

export const conversationFormats = [
  { id: 'round', title: 'Offene Runde', note: 'Alle hören dieselben Beiträge. Einzelne Stimmen können das Gespräch stärker prägen.' },
  { id: 'reflection', title: 'Kurze Einzelreflexion vor der Runde', note: 'Alle können Gedanken zunächst für sich ordnen. Stille Beiträge müssen anschliessend bewusst aufgenommen werden.' },
  { id: 'groups', title: 'Kleine Arbeitsgruppen mit gemeinsamer Sichtung', note: 'Mehr parallele Beteiligung wird möglich. Zwischen den Gruppen können Informationen verloren gehen.' },
] as const;

export const capacityFactors = [
  { id: 'time', label: 'Keine Zeit für Erprobung' },
  { id: 'priority', label: 'Laufende Aufgaben haben Vorrang' },
  { id: 'review', label: 'Zusätzlicher Kontrollaufwand' },
  { id: 'few', label: 'Wenige Engagierte tragen alles' },
  { id: 'unclear', label: 'Unklare Priorisierung' },
] as const;

export const capacityLevers = [
  { id: 'replace', label: 'Eine bestehende Aufgabe ersetzen oder verschieben', factors: ['time', 'priority'] },
  { id: 'window', label: 'Ein geschütztes Lernfenster vereinbaren', factors: ['time', 'few'] },
  { id: 'scope', label: 'Den Versuch kleiner zuschneiden', factors: ['time', 'review', 'few'] },
  { id: 'review-time', label: 'Zusätzliche Prüfzeit ausdrücklich berücksichtigen', factors: ['review'] },
  { id: 'align', label: 'Ressourcen- und Prioritätskonflikt mit der Bereichsleitung abstimmen', factors: ['priority', 'unclear', 'few'] },
  { id: 'pause', label: 'Vorerst keinen Versuch starten', factors: ['time', 'priority', 'review', 'few', 'unclear'] },
] as const;

export const governanceTopics = [
  { id: 'quality', label: 'Verlässlichkeit und Korrektheit' },
  { id: 'data', label: 'Datenklassifizierung und Personendaten' },
  { id: 'tools', label: 'Freigegebene KI-Werkzeuge' },
  { id: 'responsibility', label: 'Zuständigkeit für Prüfung und Entscheidung' },
  { id: 'errors', label: 'Umgang mit Fehlern' },
] as const;

export const governanceChecks = [
  { id: 'tool', text: 'Ist für diesen Anwendungsfall ein freigegebenes Werkzeug bekannt?' },
  { id: 'data', text: 'Ist klar, welche Informationskategorien darin verarbeitet werden dürfen?' },
  { id: 'review', text: 'Ist geregelt, wer Ergebnisse fachlich prüft und verantwortlich entscheidet?' },
  { id: 'incident', text: 'Wissen Beteiligte, wie Unsicherheiten, Fehler oder Vorfälle gemeldet werden?' },
  { id: 'effort', text: 'Ist der zusätzliche Prüfaufwand berücksichtigt?' },
] as const;

export const orientationTopics = [
  { id: 'goal', label: 'Ziel des ersten Versuchs', prompt: 'Was möchten wir nach einem begrenzten Versuch besser wissen als heute?' },
  { id: 'scope', label: 'Was das Team selbst entscheiden kann', prompt: 'Welche Entscheidungen trifft das Team selbst, welche brauchen Abstimmung?' },
  { id: 'roles', label: 'Rollen und Freigaben', prompt: 'Wer beurteilt Fachqualität, wer kann Werkzeug- und Dateneinsatz freigeben?' },
  { id: 'capacity', label: 'Verfügbare Kapazitäten', prompt: 'Welche bestehende Arbeit kann zugunsten der Erprobung zurückstehen?' },
  { id: 'feedback', label: 'Rückmeldung an die Organisation', prompt: 'An wen geben wir Erkenntnisse, Probleme und Verbesserungsvorschläge weiter?' },
] as const;

export const responsibilityLabels: Record<ResponsibilityId, string> = {
  self: 'Kann ich im eigenen Rahmen angehen',
  alignment: 'Dafür brauche ich Abstimmung',
};
