export type UseCase = {
  slug: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  context: string;
  icon: 'interview' | 'project' | 'team';
  href: string;
  action: string;
  keywords: string[];
};

export const useCases: UseCase[] = [
  {
    slug: 'interview-vorbereiten', category: 'Recruiting', title: 'Interview mit AI vorbereiten',
    description: 'Anforderungen ordnen, fiktive Bewerbungsunterlagen durchdenken und passende Interviewfragen entwickeln.',
    duration: 'ca. 15 min', context: 'Personendaten', icon: 'interview',
    href: '/use-cases/interview-vorbereiten', action: 'Use Case ansehen',
    keywords: ['interview', 'interviews', 'recruiting', 'hr', 'bewerbung', 'personal', 'fragen'],
  },
  {
    slug: 'projektstatus-vorbereiten', category: 'Projektmanagement', title: 'Projektstatus mit AI vorbereiten',
    description: 'Projektinformationen zusammenführen, Veränderungen erkennen und einen klaren Statusbericht vorbereiten.',
    duration: 'ca. 15–20 min', context: 'Workflow', icon: 'project',
    href: '/use-cases/projektstatus-vorbereiten', action: 'Use Case ansehen',
    keywords: ['projekt', 'projektstatus', 'status', 'statusbericht', 'bericht', 'projektmanagement'],
  },
  {
    slug: 'team-experiment', category: 'Teams', title: 'AI Team Experiment',
    description: 'Eine Aufgabe aus eurem Arbeitsalltag auswählen und gemeinsam erproben, wo AI euch unterstützen kann.',
    duration: 'ca. 45 min', context: 'Team', icon: 'team',
    href: '/team-lab', action: 'Experiment starten',
    keywords: ['team', 'teams', 'experiment', 'meetings', 'meeting', 'recherche', 'zusammenarbeit'],
  },
];

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

export function searchUseCases(query: string) {
  const words = query.toLocaleLowerCase('de-CH').match(/[\p{L}\p{N}]+/gu) ?? [];
  if (!words.length) return useCases;
  return useCases.filter((item) => item.keywords.some((keyword) => words.some((word) => word.length >= 3 && (word.includes(keyword) || keyword.includes(word)))));
}
