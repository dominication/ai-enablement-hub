export type UseCase = {
  slug: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  context: string;
  icon: 'interview' | 'project' | 'team' | 'book';
  featured?: boolean;
  href: string;
  action: string;
  keywords: string[];
};

export const useCases: UseCase[] = [
  {
    featured: true, slug: 'interview-vorbereiten', category: 'Recruiting', title: 'Interview mit AI vorbereiten',
    description: 'Anforderungen ordnen, fiktive Bewerbungsunterlagen durchdenken und passende Interviewfragen entwickeln.',
    duration: 'ca. 15 min', context: 'Personendaten', icon: 'interview',
    href: '/use-cases/interview-vorbereiten', action: 'Use Case ansehen',
    keywords: ['interview', 'interviews', 'recruiting', 'hr', 'bewerbung', 'personal', 'fragen'],
  },
  {
    slug: "interviewnotizen-strukturieren", category: "Recruiting", title: "Interviewnotizen strukturieren",
    description: "Notizen aus einem Interview ordnen, Beobachtungen nach Themen strukturieren und offene Punkte für die weitere Beurteilung sichtbar machen.",
    duration: "ca. 10 min", context: "Personendaten", icon: "interview",
    href: "/use-cases/interviewnotizen-strukturieren", action: "Use Case verstehen",
    keywords: ["interview", "interviews", "interviewnotizen", "recruiting", "interview notizen", "interviewnotizen strukturieren"],
  },
  {
    featured: true, slug: 'projektstatus-vorbereiten', category: 'Projektmanagement', title: 'Projektstatus mit AI vorbereiten',
    description: 'Projektinformationen zusammenführen, Veränderungen erkennen und einen klaren Statusbericht vorbereiten.',
    duration: 'ca. 15–20 min', context: 'Workflow', icon: 'project',
    href: '/use-cases/projektstatus-vorbereiten', action: 'Use Case ansehen',
    keywords: ['projekt', 'projektstatus', 'status', 'statusbericht', 'bericht', 'projektmanagement'],
  },
  {
    slug: "projektrisiken-strukturieren", category: "Projektmanagement", title: "Projektrisiken strukturieren",
    description: "Risiken, Abhängigkeiten und offene Punkte aus Projektinformationen zusammenführen und für eine gemeinsame Beurteilung vorbereiten.",
    duration: "ca. 10–15 min", context: "Workflow", icon: "project",
    href: "/use-cases/projektrisiken-strukturieren", action: "Use Case verstehen",
    keywords: ["projektrisiken", "risiken", "risiko", "abhängigkeiten", "projektmanagement", "projektrisiken strukturieren"],
  },
  {
    slug: "meeting-ergebnisse-aufbereiten", category: "Zusammenarbeit", title: "Meeting-Ergebnisse aufbereiten",
    description: "Entscheidungen, offene Punkte und nächste Schritte aus Meetingnotizen strukturiert zusammenführen.",
    duration: "ca. 10 min", context: "Intern", icon: "interview",
    href: "/use-cases/meeting-ergebnisse-aufbereiten", action: "Use Case verstehen",
    keywords: ["meeting", "meetings", "meetingnotizen", "protokoll", "sitzung", "sitzungsnotizen", "entscheidungen aus meeting", "meeting ergebnisse"],
  },
  {
    slug: "workshop-vorbereiten", category: "Zusammenarbeit", title: "Workshop vorbereiten",
    description: "Ziele, Leitfragen und einen möglichen Ablauf aus einem vorhandenen Arbeitsauftrag strukturieren.",
    duration: "ca. 15 min", context: "Intern", icon: "team",
    href: "/use-cases/workshop-vorbereiten", action: "Use Case verstehen",
    keywords: ["workshop", "workshops", "moderation", "agenda", "workshop vorbereiten"],
  },
  {
    slug: "komplexe-inhalte-verstaendlich-machen", category: "Kommunikation", title: "Komplexe Inhalte verständlich machen",
    description: "Komplexe Fachinformationen für eine bestimmte Zielgruppe klarer strukturieren und verständlicher formulieren.",
    duration: "ca. 10 min", context: "Intern", icon: "book",
    href: "/use-cases/komplexe-inhalte-verstaendlich-machen", action: "Use Case verstehen",
    keywords: ["verständlich machen", "vereinfachen", "fachinformationen", "komplexe inhalte", "verständlicher formulieren", "kommunikation"],
  },
  {
    slug: "praesentation-strukturieren", category: "Kommunikation", title: "Präsentation strukturieren",
    description: "Aus vorhandenen Informationen eine klare Storyline und sinnvolle Präsentationsstruktur entwickeln.",
    duration: "ca. 15 min", context: "Intern", icon: "project",
    href: "/use-cases/praesentation-strukturieren", action: "Use Case verstehen",
    keywords: ["präsentation", "präsentationen", "storyline", "folien", "vortrag", "präsentation strukturieren"],
  },
  {
    slug: "dokumente-vergleichen", category: "Wissensarbeit", title: "Dokumente vergleichen",
    description: "Unterschiede, Gemeinsamkeiten und offene Fragen zwischen mehreren Dokumenten strukturiert sichtbar machen.",
    duration: "ca. 10–15 min", context: "Intern", icon: "book",
    href: "/use-cases/dokumente-vergleichen", action: "Use Case verstehen",
    keywords: ["dokumente vergleichen", "dokumentenvergleich", "vergleich", "unterschiede", "versionen vergleichen", "dokumente"],
  },
  {
    slug: "recherche-strukturieren", category: "Wissensarbeit", title: "Recherche strukturieren und verdichten",
    description: "Informationen aus mehreren Quellen ordnen, Kernaussagen herausarbeiten und offene Fragen für die weitere Recherche sichtbar machen.",
    duration: "ca. 15–20 min", context: "Quellen prüfen", icon: "book",
    href: "/use-cases/recherche-strukturieren", action: "Use Case verstehen",
    keywords: ["recherche", "recherchieren", "informationen recherchieren", "quellen", "quellen prüfen", "recherche strukturieren und verdichten"],
  },
  {
    slug: "entscheidungsoptionen-strukturieren", category: "Entscheidungen", title: "Entscheidungsoptionen strukturieren",
    description: "Argumente, Auswirkungen und offene Fragen verschiedener Handlungsoptionen vergleichbar machen.",
    duration: "ca. 15 min", context: "Entscheidungsunterstützung", icon: "project",
    href: "/use-cases/entscheidungsoptionen-strukturieren", action: "Use Case verstehen",
    keywords: ["entscheidung", "entscheidungen", "entscheidungsoptionen", "optionen vergleichen", "handlungsoptionen", "entscheidungsoptionen strukturieren"],
  },
  {
    featured: true, slug: 'team-experiment', category: 'Teams', title: 'AI Team Experiment',
    description: 'Eine Aufgabe aus eurem Arbeitsalltag auswählen und gemeinsam erproben, wo AI euch unterstützen kann.',
    duration: 'ca. 45 min', context: 'Team', icon: 'team',
    href: '/team-lab', action: 'Experiment starten',
    keywords: ['team', 'teams', 'zusammenarbeit', 'experiment', 'arbeitsweise'],
  },
];

export const featuredUseCases = useCases.filter((item) => item.featured);

export const learning = {
  category: 'Projektmanagement',
  quote: 'AI konnte Änderungen aus unseren Projektinformationen gut herausarbeiten. Ob daraus tatsächlich ein relevantes Projektrisiko entsteht, mussten wir selbst beurteilen.',
  attribution: 'Ein Projektteam teilt seine Erfahrung',
  takeaway: 'Informationen ordnen hilft. Die Einordnung bleibt bei uns.',
};

export const informationCategories = [
  { name: 'Öffentlich', description: 'Frei zugängliche Informationen. Prüfe auch hier Nutzungsrechte und Quellen.' },
  { name: 'Intern', description: 'Nicht öffentlich zugängliche Informationen. Kläre vorab, ob das verwendete AI-System dafür freigegeben ist.' },
  { name: 'Vertraulich', description: 'Besonders schützenswerte Geschäftsinformationen. Verwende sie nur nach ausdrücklicher Freigabe im dafür vorgesehenen System.' },
  { name: 'Personendaten', description: 'Informationen über identifizierbare Personen. Nutze für Experimente fiktive Daten und kläre reale Anwendungen mit der zuständigen Datenschutzstelle.' },
];

function searchWords(value: string): string[] {
  return value.normalize('NFC').toLocaleLowerCase('de-CH')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .match(/[\p{L}\p{N}]+/gu) ?? [];
}

export function searchUseCases(query: string): UseCase[] {
  if (!query.trim()) return useCases;
  const words = searchWords(query);
  if (!words.length) return [];
  // Whole terms avoid substring matches (e.g. “steam” → “team”).
  // A specific phrase takes precedence over broader single-word matches.
  const matches = useCases.map((item) => ({
    item,
    specificity: Math.max(0, ...item.keywords.map((keyword) => {
      const phrase = searchWords(keyword);
      return words.some((_, start) => phrase.every((word, offset) => words[start + offset] === word)) ? phrase.length : 0;
    })),
  }));
  const specificity = Math.max(0, ...matches.map((match) => match.specificity));
  return specificity ? matches.filter((match) => match.specificity === specificity).map((match) => match.item) : [];
}
