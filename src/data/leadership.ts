export type LeadershipActionId = 'clarify' | 'pilot' | 'postpone';
export type ParticipationId = 'proposal' | 'inventory' | 'exploration';
export type SupportId = 'time' | 'peer' | 'quality' | 'priorities';
export type ResponsibilityId = 'self' | 'alignment';
export type LeadershipOutcomeId = 'continue' | 'adapt' | 'stop';

export const leadershipScenario = {
  team: 'Ein achtköpfiges internes Service-Team mit hoher Auslastung und einem bestehenden Qualitätsanspruch.',
  mandate: 'Wir möchten in sechs Wochen erste Erfahrungen mit KI sehen. Mich interessiert, wo sie uns im Alltag tatsächlich unterstützt und was wir daraus lernen.',
  constraints: [
    'Das bestehende Qualitätsniveau muss erhalten bleiben.',
    'Nicht alle Informationen dürfen in KI-Systemen verarbeitet werden.',
    'Werkzeug- und Freigaberahmen müssen vor echten Experimenten geklärt werden.',
  ],
};

export const leadershipActions = [
  {
    id: 'clarify',
    title: 'Auftrag und Gestaltungsspielraum klären',
    statement: 'Ich kläre zuerst mit der Bereichsleitung, welche Ergebnisse erwartet werden und wo wir Gestaltungsspielraum haben.',
    chance: 'Erwartungen und Entscheidungsräume werden klarer.',
    limitLabel: 'Mögliche Grenze',
    limit: 'Die praktische Erprobung beginnt möglicherweise später.',
    reflection: 'Was ist verbindlich – und was darf das Team selbst entscheiden?',
  },
  {
    id: 'pilot',
    title: 'Einen kleinen Pilotversuch vorschlagen',
    statement: 'Ich schlage dem Team sofort einen kleinen Pilotversuch vor.',
    chance: 'Das Vorhaben wird konkret und erste Erfahrungen können entstehen.',
    limitLabel: 'Mögliches Risiko',
    limit: 'Zeit, Freigaben und Beteiligung sind noch nicht ausreichend geklärt.',
    reflection: 'Welche Voraussetzungen müssen vor einem echten Versuch erfüllt sein?',
  },
  {
    id: 'postpone',
    title: 'Die Einführung zunächst verschieben',
    statement: 'Ich möchte die Einführung angesichts der Belastung zunächst verschieben.',
    chance: 'Die Arbeitsbelastung wird ernst genommen.',
    limitLabel: 'Mögliche Grenze',
    limit: 'Der bestehende Auftrag wird dadurch nicht automatisch geklärt.',
    reflection: 'Wie kann ich den Kapazitätskonflikt mit der Bereichsleitung besprechen?',
  },
] as const;

export const teamPerspectives = [
  { role: 'Fachverantwortung', quote: 'Wenn falsche Angaben in unseren Statusberichten landen, müssen wir das wieder korrigieren. Wer trägt dann die Verantwortung?' },
  { role: 'Mitarbeitende Person mit KI-Erfahrung', quote: 'Ich habe KI mit fiktiven Beispielen ausprobiert. Bei manchen Aufgaben könnte uns das wirklich helfen.' },
  { role: 'Teamkoordination', quote: 'Ich sehe das Potenzial. Aber wenn ich mich zusätzlich einarbeiten muss, fehlt mir die Zeit dafür.' },
  { role: 'Mitarbeitende Person mit Erfahrung aus früheren Veränderungen', quote: 'Beim letzten neuen Tool hatten wir anfangs viel Mitgestaltung versprochen bekommen. Am Schluss war ziemlich viel schon entschieden.' },
];

export const deepDiveQuestions = [
  { id: 'quality', text: 'Welche konkreten Qualitätsprobleme werden befürchtet?' },
  { id: 'capacity', text: 'Wo fehlt dem Team Zeit oder Unterstützung?' },
  { id: 'history', text: 'Welche Erfahrungen aus früheren Veränderungen wirken noch nach?' },
  { id: 'relief', text: 'Welche bestehenden Tätigkeiten könnten tatsächlich entlastet werden?' },
];

export const participationOptions = [
  {
    id: 'proposal',
    title: 'Klarer Auftrag mit konkretem Vorschlag',
    example: 'Wir haben den Auftrag, KI zu erproben. Ich möchte euch einen begrenzten Vorschlag zeigen und gemeinsam prüfen, was dafür nötig wäre.',
    chance: 'Schnelle Orientierung und ein konkreter Gesprächsgegenstand.',
    risk: 'Andere Anliegen können zu wenig Raum erhalten.',
    questions: ['Was müsste an diesem Vorschlag verändert werden, damit ein begrenzter Versuch für euch verantwortbar ist?', 'Welche Bedingungen und offenen Fragen sollten wir vor einer Entscheidung gemeinsam klären?'],
  },
  {
    id: 'inventory',
    title: 'Zuerst gemeinsame Bestandsaufnahme',
    example: 'Bevor wir über konkrete KI-Anwendungen sprechen: Wo erlebt ihr heute Aufwand, Unsicherheit oder Verbesserungspotenzial in unserer Arbeit?',
    chance: 'Unterschiedliche Erfahrungen werden sichtbar.',
    risk: 'Ohne klaren Rahmen bleibt offen, wie aus dem Gespräch eine Entscheidung wird.',
    questions: ['Wo erleben wir heute Aufwand, Unsicherheit oder Verbesserungspotenzial in unserer Arbeit?', 'Nach welchen Kriterien wollen wir gemeinsam entscheiden, ob sich ein begrenzter Versuch lohnt?'],
  },
  {
    id: 'exploration',
    title: 'Kleine freiwillige Erkundungsgruppe',
    example: 'Wer möchte, könnte zunächst mit fiktiven Beispielen einen kleinen Arbeitsschritt untersuchen. Die Erfahrungen würden wir anschliessend gemeinsam besprechen.',
    chance: 'Niederschwelliger Einstieg und begrenzter Aufwand.',
    risk: 'Weniger sichtbare oder skeptische Stimmen könnten unberücksichtigt bleiben.',
    questions: ['Wer möchte einen begrenzten Arbeitsschritt mit fiktiven Beispielen erkunden – und welche Unterstützung wäre dafür nötig?', 'Wie stellen wir sicher, dass auch nicht beteiligte und kritische Stimmen in die gemeinsame Auswertung einfliessen?'],
  },
] as const;

export const governanceRequirements = [
  'Verwendung eines dafür freigegebenen KI-Systems.',
  'Zulässige Informationen und geklärte Datenfreigaben.',
  'Menschliche Kontrolle und Verantwortung.',
  'Möglichkeit, Probleme anzusprechen und den Versuch anzupassen oder zu stoppen.',
];

export const supportOptions = [
  { id: 'time', label: 'Geschützte Zeit für Erprobung und Reflexion.' },
  { id: 'peer', label: 'Kollegiale Unterstützung oder gegenseitiger Erfahrungsaustausch.' },
  { id: 'quality', label: 'Gemeinsame fachliche Qualitätsprüfung.' },
  { id: 'priorities', label: 'Abstimmung mit der Bereichsleitung über Prioritäten und Entlastung.' },
] as const;

export const observationCriteria = [
  { id: 'quality', label: 'Qualität und fachliche Verlässlichkeit.', required: true },
  { id: 'effort', label: 'Zeitaufwand einschliesslich zusätzlicher Kontrolle.', required: true },
  { id: 'collaboration', label: 'Belastung und Zusammenarbeit.', required: false },
  { id: 'questions', label: 'Erfahrungen und offene Fragen.', required: false },
] as const;

export const retrospectiveObservations = [
  'Das Strukturieren wiederkehrender Informationen hat geholfen.',
  'Fachlich wichtige Zusammenhänge mussten weiterhin von Menschen eingeordnet werden.',
  'Die zusätzliche Ergebnisprüfung war aufwendiger als zunächst erwartet.',
  'Einzelne Teammitglieder sehen Nutzen, andere möchten erst Aufgaben und Erwartungen besser klären.',
  'Die Bereichsleitung interessiert sich für eine mögliche Ausweitung.',
];

export const leadershipOutcomes = [
  { id: 'continue', title: 'Weiterführen', description: 'Den begrenzten Versuch unter geklärten Voraussetzungen fortsetzen und seine Wirkung weiter beobachten.' },
  { id: 'adapt', title: 'Anpassen', description: 'Den Einsatzbereich oder die Rahmenbedingungen verändern und erneut reflektieren.' },
  { id: 'stop', title: 'Stoppen', description: 'Den Versuch vorerst beenden, die Gründe dokumentieren und mögliche organisatorische Hindernisse klären.' },
] as const;

export const leadershipStages = [
  { label: 'Auftrag', title: 'Was ist eigentlich unser Auftrag?', description: 'Ordne Erwartung, Belastung und Gestaltungsspielraum ein. Jede Handlungsrichtung hat mögliche Wirkungen und Grenzen.' },
  { label: 'Perspektiven', title: 'Was steckt hinter den unterschiedlichen Aussagen?', description: 'Höre auf konkrete Erfahrungen und Fragen, ohne Haltungen zu diagnostizieren oder persönliche Motive zu unterstellen.' },
  { label: 'Beteiligung', title: 'Wie eröffnest du das Gespräch?', description: 'Wähle einen Gesprächseinstieg, der Orientierung und Beteiligung in ein nachvollziehbares Verhältnis bringt.' },
  { label: 'Rahmen', title: 'Was braucht das Team, um sinnvoll experimentieren zu können?', description: 'Unterscheide verbindliche Voraussetzungen von Unterstützungsangeboten, die du priorisieren kannst.' },
  { label: 'Reflexion', title: 'Was lernen wir aus dem Versuch?', description: 'Betrachte eine vorbereitete fiktive Rückschau und entscheide, wie du mit den Beobachtungen umgehen würdest.' },
] as const;
