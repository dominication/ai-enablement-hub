import { useCases, type UseCase } from './content';

// All experiences, teams and observations are fictional prototype material.
// These entries are prepared examples, not submissions or results from the journeys.
export type CommunityOutcome = 'Weiterführen' | 'Anpassen' | 'Stoppen';
export const communityCategories = [
  { value: 'Recruiting', label: 'Recruiting' },
  { value: 'Projektmanagement', label: 'Projekte' },
  { value: 'Zusammenarbeit', label: 'Zusammenarbeit' },
  { value: 'Wissensarbeit', label: 'Wissensarbeit' },
  { value: 'Teams', label: 'Teams' },
  { value: 'Kommunikation', label: 'Kommunikation' },
] as const;
export type CommunityCategory = (typeof communityCategories)[number]['value'];
export type CommunityLearning = {
  id: string;
  useCase: UseCase;
  attribution: string;
  summary: string;
  whatHelped: readonly string[];
  whereHumanJudgementMattered: readonly string[];
  whatDidNotWork: readonly string[];
  nextStep: string;
  outcome: CommunityOutcome;
  takeaway: string;
};

function findUseCase(slug: string): UseCase {
  const item = useCases.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown Community use case: ${slug}`);
  return item;
}

export const featuredCommunityLearning: CommunityLearning = {
  id: 'projektstatus-kontext',
  useCase: findUseCase('projektstatus-vorbereiten'),
  attribution: 'Ein fiktives Projektteam',
  summary: 'KI konnte Veränderungen zwischen mehreren Projektständen gut sichtbar machen. Ob eine Terminverschiebung tatsächlich kritisch war, wurde erst durch Abhängigkeiten und Stakeholder-Kontext klar.',
  whatHelped: [
    'Informationen aus mehreren Projektständen zusammenführen.',
    'Terminänderungen sichtbar machen und offene Punkte strukturieren.',
  ],
  whereHumanJudgementMattered: [
    'Auswirkungen auf den Pilot und andere Teams anhand der Abhängigkeiten beurteilen.',
    'Risiken einordnen und entscheiden, ob eine Eskalation nötig ist.',
  ],
  whatDidNotWork: [
    'Aus einer erkannten Terminänderung liess sich ohne zusätzlichen Projektkontext noch keine belastbare Risikobewertung ableiten.',
  ],
  nextStep: 'KI bleibt Teil der Vorbereitung. Das Projektteam prüft weiterhin die Quellen und verantwortet die Einordnung von Kontext, Risiken und Eskalationsbedarf.',
  outcome: 'Weiterführen',
  takeaway: 'Informationen erkennen ist nicht dasselbe wie ihre Bedeutung verstehen.',
};

export const communityLearnings: readonly CommunityLearning[] = [
  featuredCommunityLearning,
  {
    id: 'interviewfragen-pruefen',
    useCase: findUseCase('interview-vorbereiten'),
    attribution: 'Ein fiktives Recruiting-Team',
    summary: 'Die vorgeschlagenen Fragen waren ein guter Ausgangspunkt. Zwei Fragen gingen jedoch weiter, als die vorhandenen Bewerbungsunterlagen tatsächlich belegten.',
    whatHelped: [
      'Anforderungen strukturieren und mögliche Interviewfragen vorbereiten.',
      'Offene Themen für das Gespräch sichtbar machen.',
    ],
    whereHumanJudgementMattered: [
      'Jede Frage auf Fairness, Relevanz für die Rolle und Bezug zu den Unterlagen prüfen.',
      'Den Kontext einordnen und die finale Gesprächsführung selbst gestalten.',
    ],
    whatDidNotWork: [
      'Einzelne Fragen interpretierten Erfahrungen zu weit und legten nicht belegte Verantwortung nahe.',
      'Formulierungen mussten angepasst werden, um keine voreiligen Annahmen über die Person zu übernehmen.',
    ],
    nextStep: 'Das Recruiting-Team gleicht jede Frage vor der Nutzung mit den Originalunterlagen ab. Unbelegte Annahmen werden entfernt oder als offene, faire Rückfragen formuliert.',
    outcome: 'Anpassen',
    takeaway: 'Ein plausibler KI-Vorschlag ist noch keine faire oder belegte Interviewfrage.',
  },
  {
    id: 'team-einsatz-eingrenzen',
    useCase: findUseCase('team-experiment'),
    attribution: 'Ein fiktives Service-Team',
    summary: 'Das Zusammenführen von Informationen funktionierte gut. Gleichzeitig kontrollierte das Team anfangs fast jede Formulierung und erzeugte dadurch zusätzliche Arbeit.',
    whatHelped: [
      'Informationen strukturieren und wiederkehrende Themen bündeln.',
      'Veränderungen für das gemeinsame Teamgespräch sichtbar machen.',
    ],
    whereHumanJudgementMattered: [
      'Bedeutung und Priorität der Themen aus unterschiedlichen Rollen einordnen.',
      'Gemeinsam entscheiden, welche Unterstützung den Prüfaufwand rechtfertigt.',
    ],
    whatDidNotWork: [
      'Die zusätzliche Kontrollarbeit war höher als erwartet.',
      'Der Einsatzbereich war im ersten Versuch zu breit; Strukturierung und Priorisierung waren nicht klar getrennt.',
    ],
    nextStep: 'Das Team begrenzt KI auf Informationsstrukturierung und Veränderungshinweise. Priorisierung bleibt vollständig beim Team; den Prüfaufwand beobachtet es im nächsten Versuch ausdrücklich mit.',
    outcome: 'Anpassen',
    takeaway: 'Ein kleinerer Einsatzbereich kann sinnvoller sein als möglichst viel KI.',
  },
  {
    id: 'team-versuch-beenden',
    useCase: findUseCase('team-experiment'),
    attribution: 'Ein fiktives Koordinationsteam',
    summary: 'In diesem fiktiven Beispiel testete ein Team drei Wochen lang KI-Unterstützung für die Abstimmung von Übergaben. Die vorbereiteten Ergebnisse mussten so intensiv geprüft werden, dass der erwartete Nutzen im Arbeitsalltag nicht entstand.',
    whatHelped: [
      'Die erste Gliederung half, vorhandene Informationen zu überblicken.',
    ],
    whereHumanJudgementMattered: [
      'Fehlenden Kontext zu offenen Übergaben ergänzen und Zuständigkeiten mit den Beteiligten klären.',
      'Prüfaufwand und Nutzen ehrlich gegen die bisherige Arbeitsweise abwägen.',
    ],
    whatDidNotWork: [
      'Korrekturen an den Ergebnissen beanspruchten zu viel Aufmerksamkeit.',
      'Zusätzliche Abstimmungen waren nötig; gegenüber dem bisherigen Ablauf blieb der Nutzen unklar.',
    ],
    nextStep: 'Das Team kehrt zur bisherigen Arbeitsweise zurück und hält die beobachteten Grenzen schriftlich fest. Andere Teams können damit besser prüfen, ob ein ähnlicher Versuch zu ihrer Aufgabe passt.',
    outcome: 'Stoppen',
    takeaway: 'Ein bewusst beendetes Experiment ist ebenfalls ein gutes Ergebnis.',
  },
  {
    id: 'meeting-entscheidungen-bestaetigen',
    useCase: findUseCase('meeting-ergebnisse-aufbereiten'),
    attribution: 'Eine fiktive Arbeitsgruppe',
    summary: 'Aufgaben und offene Punkte liessen sich gut strukturieren. Schwieriger war die Unterscheidung zwischen einer diskutierten Idee und einer tatsächlich getroffenen Entscheidung.',
    whatHelped: [
      'Aufgaben und offene Fragen übersichtlich zusammenstellen.',
      'Die Notizen nach Themen gliedern und Rückfragen sichtbar halten.',
    ],
    whereHumanJudgementMattered: [
      'Mit den Beteiligten bestätigen, was tatsächlich entschieden wurde.',
      'Zuständigkeiten vereinbaren und ungelöste Meinungsverschiedenheiten offen festhalten.',
    ],
    whatDidNotWork: [
      'In den Notizen war nicht immer erkennbar, ob eine Idee nur diskutiert oder bereits verbindlich beschlossen worden war.',
    ],
    nextStep: 'Bestätigte Entscheidungen werden während oder unmittelbar nach dem Meeting ausdrücklich markiert. Die Beteiligten prüfen die aufbereiteten Ergebnisse, bevor daraus verbindliche Aufgaben werden.',
    outcome: 'Weiterführen',
    takeaway: 'Struktur hilft – Verbindlichkeit entsteht im Team.',
  },
  {
    id: 'recherche-quellen-erhalten',
    useCase: findUseCase('recherche-strukturieren'),
    attribution: 'Eine fiktive Fachgruppe',
    summary: 'Die Zusammenfassung erleichterte den Überblick. Bei zwei Aussagen zeigte die Prüfung der Originalquellen jedoch wichtige Einschränkungen, die in der Verdichtung kaum sichtbar waren.',
    whatHelped: [
      'Quellen ordnen und wiederkehrende Themen herausarbeiten.',
      'Offene Fragen für die weitere Recherche sammeln.',
    ],
    whereHumanJudgementMattered: [
      'Qualität und Aktualität der Quellen beurteilen.',
      'Aussagen im Originalkontext interpretieren und ihre Relevanz für die Recherchefrage prüfen.',
    ],
    whatDidNotWork: [
      'Wichtige Einschränkungen wurden in der Zusammenfassung so stark verkürzt, dass Aussagen allgemeingültiger wirkten, als sie waren.',
    ],
    nextStep: 'Jede wichtige Aussage bleibt mit ihrer Originalquelle verknüpft. Die Fachgruppe prüft Belege und Einschränkungen vor der Weiterverwendung und ergänzt fehlende Perspektiven.',
    outcome: 'Anpassen',
    takeaway: 'Eine Zusammenfassung ist Orientierung, kein Beleg.',
  },
  {
    id: 'verstaendlichkeit-bedeutung-erhalten',
    useCase: findUseCase('komplexe-inhalte-verstaendlich-machen'),
    attribution: 'Ein fiktives Kommunikationsteam',
    summary: 'Der Text wurde deutlich leichter lesbar. Gleichzeitig ging bei einer fachlichen Einschränkung zu viel Bedeutung verloren.',
    whatHelped: [
      'Den Text klarer gliedern und Erklärungen kürzen.',
      'Sprache und Detailtiefe an die Zielgruppe anpassen.',
    ],
    whereHumanJudgementMattered: [
      'Fachliche Bedeutung, Bedingungen und Unsicherheit mit dem Original abgleichen.',
      'Beurteilen, welche Vereinfachung der Zielgruppe hilft, ohne eine falsche Aussage zu erzeugen.',
    ],
    whatDidNotWork: [
      'Eine wichtige Einschränkung wurde beim Vereinfachen abgeschwächt und musste wieder aufgenommen werden.',
    ],
    nextStep: 'Kritische Einschränkungen werden vor dem Umformulieren ausdrücklich markiert. Die fachlich verantwortliche Person vergleicht die neue Fassung anschliessend mit dem Original.',
    outcome: 'Weiterführen',
    takeaway: 'Verständlicher darf nicht ungenauer bedeuten.',
  },
];

export const sharedLearningQuestions = [
  'Was wurde ausprobiert?',
  'Was hat tatsächlich geholfen?',
  'Wo blieb menschliche Arbeit entscheidend?',
  'Was machen wir als Nächstes?',
];
