// Entirely fictional demo material. No candidate scoring or external AI processing.
export const focusAreas = [
  { id: 'change', label: 'Erfahrung mit Veränderungsprojekten' },
  { id: 'stakeholders', label: 'Stakeholdermanagement' },
  { id: 'workshops', label: 'Moderation und Zusammenarbeit' },
  { id: 'leadership', label: 'Führung und Verantwortung' },
  { id: 'adoption', label: 'Digitale Adoption' },
  { id: 'motivation', label: 'Motivation für die Rolle' },
] as const;
export type FocusId = (typeof focusAreas)[number]['id'];
export type DocumentId = 'role' | 'cv' | 'letter';
export const defaultFocus: FocusId[] = ['change', 'stakeholders', 'adoption'];
export const candidate = { name: 'Alex Meyer', company: 'Beispielwerk Digital (fiktiv)' };
export const requirements = [
  'Veränderungsinitiativen planen und begleiten',
  'Stakeholder aus Business und IT einbinden',
  'Workshops moderieren',
  'Adoption neuer Arbeitsweisen fördern',
  'Veränderungserfolg reflektieren',
];
export const jobProfile = {
  title: 'Change Manager Digital Workplace',
  company: 'Musterraum Zusammenarbeit (fiktiv)',
  description: 'Du begleitest die Einführung digitaler Arbeitsweisen und gestaltest den Austausch zwischen Business, IT und Mitarbeitenden. Gemeinsam mit den Teams entwickelst du passende Enablement-Angebote und reflektierst deren Wirkung.',
};
export const cvExperience = [
  { id: 'workplace', title: 'Digital Workplace Einführung', detail: 'Begleitung einer unternehmensweiten Einführung neuer Kollaborationstools.', source: 'Lebenslauf · Beispielwerk Digital · 2022–2025', excerpt: 'Als Change-Spezialist:in begleitete ich die Einführung einer neuen Kollaborationsplattform. Ich koordinierte Austauschformate zwischen Fachbereichen und IT.' },
  { id: 'community', title: 'Community & Enablement', detail: 'Aufbau von Austauschformaten und Schulungsangeboten für Mitarbeitende.', source: 'Lebenslauf · Beispielwerk Digital · 2022–2025', excerpt: 'Ich baute eine interne Community mit monatlichen Sprechstunden auf und entwickelte Schulungsangebote mit Multiplikator:innen aus den Teams.' },
  { id: 'workshops', title: 'Workshop-Moderation', detail: 'Planung und Moderation bereichsübergreifender Workshops.', source: 'Lebenslauf · Ideenatelier Arbeit (fiktiv) · 2019–2022', excerpt: 'Ich plante und moderierte Workshops zu gemeinsamen Arbeitsweisen und dokumentierte die vereinbarten nächsten Schritte.' },
];
export const motivationLetter = {
  title: 'Motivationsschreiben',
  paragraphs: [
    'Mich interessiert, wie Menschen neue digitale Arbeitsweisen in ihren Alltag integrieren. Als Change Manager Digital Workplace möchte ich Teams dabei unterstützen, passende Lösungen gemeinsam zu erproben.',
    'An der ausgeschriebenen Rolle reizt mich die Verbindung von Moderation, Enablement und Zusammenarbeit zwischen Business und IT. Meine Erfahrungen mit Community-Formaten möchte ich einbringen und weiterentwickeln.',
  ],
};
export const demoDocuments: { id: DocumentId; label: string; title: string; description: string }[] = [
  { id: 'role', label: 'Stellenprofil', title: jobProfile.title, description: jobProfile.company },
  { id: 'cv', label: 'Lebenslauf', title: candidate.name, description: 'Erfahrung in Change, Enablement und Moderation' },
  { id: 'letter', label: 'Motivationsschreiben', title: candidate.name, description: 'Interesse an der Rolle und an digitaler Zusammenarbeit' },
];
export const openQuestions = [
  { title: 'Eigenständige Leitung grösserer Change-Initiativen', detail: 'Aus den Unterlagen wird nicht eindeutig ersichtlich, welche Gesamtverantwortung übernommen wurde.', source: 'Lebenslauf · Digital Workplace Einführung', requires: 'cv' as DocumentId },
  { title: 'Umgang mit Widerstand', detail: 'Es gibt wenig Informationen darüber, wie mit kritischen Stakeholdern oder Widerstand umgegangen wurde.', source: 'Lebenslauf · keine konkrete Situation beschrieben', requires: 'cv' as DocumentId },
  { title: 'Motivation im konkreten Arbeitsalltag', detail: 'Das Interesse an digitaler Zusammenarbeit ist beschrieben. Welche Aufgaben an dieser Rolle besonders motivieren, bleibt im Gespräch zu klären.', source: 'Motivationsschreiben · Interesse an der Rolle', requires: 'letter' as DocumentId },
];
export type InterviewQuestion = {
  id: string;
  title: string;
  focus: FocusId[];
  why: string;
  variants: string[];
};
export const interviewQuestions: InterviewQuestion[] = [
  { id: 'initiative', title: 'Veränderungsinitiative', focus: ['change', 'stakeholders'], why: 'Sie verbindet Change-Erfahrung, Stakeholderarbeit und Reflexion über Wirkung.', variants: [
    'Erzähl uns von einer Veränderungsinitiative, bei der du unterschiedliche Stakeholder für eine neue Arbeitsweise gewinnen musstest. Wie bist du vorgegangen und woran hast du erkannt, ob die Veränderung funktioniert?',
    'Beschreibe eine Veränderung, die du begleitet hast. Welche Perspektiven hast du einbezogen und was würdest du heute anders machen?',
  ] },
  { id: 'resistance', title: 'Kritische Perspektiven verstehen', focus: ['stakeholders', 'change'], why: 'Sie öffnet Raum für konkrete Beispiele zum Umgang mit Bedenken, ohne Widerstand als persönliche Schwäche zu bewerten.', variants: [
    'Wie bist du in einem Projekt mit Bedenken gegenüber einer neuen Arbeitsweise umgegangen? Was hast du aus dem Austausch gelernt?',
    'Stell dir vor, ein Team sieht in einem neuen digitalen Werkzeug keinen Nutzen. Wie würdest du seine Sicht verstehen und das weitere Vorgehen gemeinsam klären?',
  ] },
  { id: 'facilitation', title: 'Moderation und Zusammenarbeit', focus: ['workshops'], why: 'Sie macht sichtbar, wie unterschiedliche Stimmen in einem Workshop einbezogen werden. Ein konkretes Beispiel hilft bei der Einordnung.', variants: [
    'Erzähl uns von einem Workshop mit unterschiedlichen Interessen. Wie hast du die Zusammenarbeit gestaltet und die nächsten Schritte festgehalten?',
    'Wie würdest du einen Workshop gestalten, in dem einige Personen viel sprechen und andere sich kaum beteiligen?',
  ] },
  { id: 'ownership', title: 'Verantwortung klären', focus: ['leadership', 'change'], why: 'Sie klärt den persönlichen Beitrag und die Entscheidungsräume, ohne aus einer Rollenbezeichnung Gesamtverantwortung abzuleiten.', variants: [
    'Welche Verantwortung hast du in einer Veränderungsinitiative selbst getragen? Welche Entscheidungen lagen bei dir und wo hast du mit anderen zusammengearbeitet?',
    'Beschreibe eine Situation, in der du Verantwortung übernehmen musstest, obwohl Zuständigkeiten noch unklar waren. Wie hast du Klarheit geschaffen?',
  ] },
  { id: 'adoption', title: 'Digitale Adoption', focus: ['adoption'], why: 'Sie unterscheidet die Einführung eines Werkzeugs von seiner sinnvollen Nutzung im Alltag und lädt zur Reflexion über Grenzen ein.', variants: [
    'Wie hast du herausgefunden, ob neue digitale Arbeitsweisen im Alltag hilfreich waren? Welche Rückmeldungen haben dich dazu gebracht, dein Vorgehen anzupassen?',
    'Ein Schulungsangebot wird gut besucht, aber die neue Arbeitsweise kaum genutzt. Wie würdest du herausfinden, woran das liegt?',
  ] },
  { id: 'motivation', title: 'Motivation für die Rolle', focus: ['motivation'], why: 'Sie bleibt bei den beruflichen Aufgaben und Erwartungen an die Rolle, ohne private Lebensumstände zu thematisieren.', variants: [
    'Welche Aufgaben der Rolle Change Manager Digital Workplace sprechen dich besonders an? Wo möchtest du dich fachlich weiterentwickeln?',
    'Was wäre dir in den ersten Monaten in dieser Rolle wichtig, um einen sinnvollen Beitrag zur Zusammenarbeit zu leisten?',
  ] },
];
// Cover each selected focus first, then supplement to five cards. Order never ranks candidates.
export function questionsForFocus(selected: FocusId[]): InterviewQuestion[] {
  const chosen = new Set<string>();
  for (const focus of selected) {
    if (interviewQuestions.some((question) => chosen.has(question.id) && question.focus.includes(focus))) continue;
    const question = interviewQuestions.find((item) => item.focus.includes(focus));
    if (question) chosen.add(question.id);
  }
  const ordered = [...interviewQuestions.filter((q) => q.focus.some((f) => selected.includes(f))), ...interviewQuestions];
  for (const question of ordered) {
    if (chosen.size >= 5) break;
    chosen.add(question.id);
  }
  return [...chosen].map((id) => interviewQuestions.find((q) => q.id === id)!);
}
export const reportReasons = ['unfair oder voreingenommen', 'fachlich falsch', 'zu persönlich', 'nicht relevant', 'missverständlich', 'anderes'] as const;
export const helpfulnessOptions = ['sehr hilfreich', 'teilweise hilfreich', 'kaum hilfreich'] as const;
export const benefitOptions = ['Informationen strukturieren', 'offene Punkte erkennen', 'Fragen entwickeln', 'Vorbereitung beschleunigen'] as const;
