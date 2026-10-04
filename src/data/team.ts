// Fictional workshop material; no real people, voting, collaboration or measured outcomes.
export const demoTeam = {
  name: 'Team Kundenservice & Prozesse',
  situation: 'Das fiktive Team koordiniert interne Serviceanfragen, erstellt wöchentliche Zusammenfassungen, pflegt Prozessinformationen und arbeitet mit mehreren Fachgruppen zusammen.',
  roles: ['Teamleitung', 'Service Specialist', 'Prozessverantwortung', 'Fachvertretung', 'Operations'],
};
export type Assignment = 'ai' | 'together' | 'human';
export const assignmentColumns: { id: Assignment; title: string }[] = [
  { id: 'ai', title: 'AI kann unterstützen' }, { id: 'together', title: 'Gemeinsam prüfen' }, { id: 'human', title: 'Mensch bleibt entscheidend' },
];
export type Subtask = { id: string; title: string; defaultAssignment: Assignment; judgement?: boolean };
export type Discussion = { recurring: string; effort: string; information: string; judgement: string };
export type Activity = { id: string; title: string; description: string; role: string; discussion: Discussion; subtasks: Subtask[]; hypothesis: string };
const genericTasks: Subtask[] = [
  { id: 'collect', title: 'Informationen zur Aufgabe sammeln', defaultAssignment: 'ai' },
  { id: 'group', title: 'Ähnliche Themen strukturieren', defaultAssignment: 'ai' },
  { id: 'check', title: 'Vollständigkeit und Quellen prüfen', defaultAssignment: 'together' },
  { id: 'judge', title: 'Bedeutung und sensible Inhalte einordnen', defaultAssignment: 'human', judgement: true },
  { id: 'decide', title: 'Nächste Schritte entscheiden', defaultAssignment: 'human', judgement: true },
  { id: 'approve', title: 'Ergebnis verantworten und freigeben', defaultAssignment: 'human', judgement: true },
];
const statusTasks: Subtask[] = [
  { id: 'collect', title: 'Informationen aus Quellen sammeln', defaultAssignment: 'ai' },
  { id: 'group', title: 'Ähnliche Themen bündeln', defaultAssignment: 'ai' },
  { id: 'highlight', title: 'Veränderungen hervorheben', defaultAssignment: 'ai' },
  { id: 'impact', title: 'Auswirkungen beurteilen', defaultAssignment: 'together', judgement: true },
  { id: 'priorities', title: 'Prioritäten festlegen', defaultAssignment: 'human', judgement: true },
  { id: 'sensitive', title: 'Sensible Fälle einordnen', defaultAssignment: 'human', judgement: true },
  { id: 'approve', title: 'Finalen Status freigeben', defaultAssignment: 'human', judgement: true },
];
export const discussionQuestions: { id: keyof Discussion; question: string; options: string[] }[] = [
  { id: 'recurring', question: 'Ist die Aufgabe wiederkehrend?', options: ['ja', 'gelegentlich', 'nein', 'noch offen'] },
  { id: 'effort', question: 'Kostet sie spürbar Zeit oder Aufmerksamkeit?', options: ['wenig', 'mittel', 'hoch', 'noch offen'] },
  { id: 'information', question: 'Gibt es genügend strukturierbare Informationen?', options: ['ja', 'teilweise', 'nein', 'noch offen'] },
  { id: 'judgement', question: 'Wie viel menschliche Urteilskraft braucht sie?', options: ['wenig', 'mittel', 'hoch', 'sehr hoch', 'noch offen'] },
];
const baseDiscussion: Discussion = { recurring: 'ja', effort: 'hoch', information: 'ja', judgement: 'mittel' };
const genericHypothesis = 'Wenn AI uns beim Strukturieren freigegebener Informationen unterstützt, können wir uns stärker auf die fachliche Einordnung konzentrieren. Ob das ohne zusätzliche Nachteile gelingt, prüfen wir im Experiment.';
export const teamActivities: Activity[] = [
  { id: 'status', title: 'Wöchentlichen Service-Status erstellen', description: 'Informationen aus mehreren Quellen zusammentragen und verdichten.', role: 'Operations', discussion: { ...baseDiscussion }, subtasks: statusTasks, hypothesis: 'Wenn AI Informationen aus unseren Statusquellen strukturiert und Veränderungen hervorhebt, verbringen wir weniger Aufmerksamkeit mit dem Zusammentragen und können uns stärker auf Einordnung und Prioritäten konzentrieren.' },
  { id: 'requests', title: 'Wiederkehrende Kundenanfragen sortieren', description: 'Ähnliche Anfragen manuell erkennen und weiterleiten.', role: 'Service Specialist', discussion: { ...baseDiscussion, judgement: 'hoch' }, subtasks: genericTasks, hypothesis: genericHypothesis },
  { id: 'meetings', title: 'Meetings dokumentieren', description: 'Entscheidungen und offene Punkte nach jedem Meeting aufbereiten.', role: 'Fachvertretung', discussion: { ...baseDiscussion }, subtasks: genericTasks, hypothesis: genericHypothesis },
  { id: 'processes', title: 'Prozessinformationen aktuell halten', description: 'Änderungen aus verschiedenen Teams zusammenführen.', role: 'Prozessverantwortung', discussion: { ...baseDiscussion, information: 'teilweise' }, subtasks: genericTasks, hypothesis: genericHypothesis },
  { id: 'cases', title: 'Schwierige Kundenfälle beurteilen', description: 'Kontext verstehen und angemessen reagieren.', role: 'Service Specialist', discussion: { ...baseDiscussion, information: 'teilweise', judgement: 'sehr hoch' }, subtasks: genericTasks, hypothesis: genericHypothesis },
  { id: 'people', title: 'Mitarbeitergespräche vorbereiten', description: 'Beobachtungen und Themen strukturieren.', role: 'Teamleitung', discussion: { ...baseDiscussion, recurring: 'gelegentlich', information: 'teilweise', judgement: 'sehr hoch' }, subtasks: genericTasks, hypothesis: genericHypothesis },
];
export function customActivity(title: string, description: string): Activity {
  return { id: 'custom', title, description, role: 'Lokaler Demo-Beitrag', discussion: { recurring: 'noch offen', effort: 'noch offen', information: 'noch offen', judgement: 'noch offen' }, subtasks: genericTasks, hypothesis: genericHypothesis };
}
export function initialAssignments(activity: Activity): Record<string, Assignment> {
  return Object.fromEntries(activity.subtasks.map((task) => [task.id, task.defaultAssignment]));
}
export const teamRequirements = [
  'klare Regeln zu erlaubten Daten', 'Zeit zum Ausprobieren', 'praktische Übung mit dem Tool', 'Klarheit über menschliche Verantwortung',
  'Fehler und Unsicherheiten offen ansprechen können', 'keine automatische Erwartung, dass Arbeit sofort schneller wird', 'Unterstützung bei Problemen', 'Möglichkeit, das Experiment wieder zu stoppen',
];
export const desiredEffects = ['weniger manuelle Sammelarbeit', 'bessere Übersicht', 'weniger Informationsverlust', 'relevante Veränderungen werden schneller sichtbar', 'Qualität bleibt mindestens gleich', 'Zusammenarbeit wird klarer'];
export const possibleSideEffects = ['zusätzliche Kontrollarbeit', 'Fehler oder falsche Zusammenfassungen', 'Informationsverlust', 'unklare Verantwortlichkeiten', 'Abhängigkeit vom Tool', 'mehr statt weniger Arbeitsaufwand', 'schlechtere Diskussionen im Team', 'sensible Daten oder Governance-Probleme'];
export const agreement = ['AI-Ergebnisse werden geprüft', 'Entscheidungen bleiben beim Team', 'Probleme dürfen offen angesprochen werden', 'das Experiment kann jederzeit angepasst oder beendet werden'];
export const leadershipRole = ['Zeit und Raum für den Versuch schaffen', 'Erwartungen klären', 'unterschiedliche Perspektiven zulassen', 'nicht nur Geschwindigkeit bewerten', 'Reflexion ermöglichen'];
export const reviewQuestions = ['Was wurde besser – und für wen?', 'Welche zusätzliche Arbeit oder neuen Risiken sind entstanden?', 'Wo war menschliche Einordnung entscheidend?', 'Führen wir weiter, passen wir an oder stoppen wir?'];
export const retrospectiveFindings = [
  { title: 'Was wurde besser?', text: 'Das Zusammenführen der Statusinformationen war einfacher. Wiederkehrende Themen wurden zuverlässig gebündelt.' },
  { title: 'Was wurde schwieriger?', text: 'Das Team kontrollierte anfangs fast jede Formulierung. Dadurch entstand zusätzliche Arbeit.' },
  { title: 'Was hat überrascht?', text: 'Einige scheinbar kleine Änderungen waren fachlich relevant, wurden vom vorbereiteten Entwurf aber nicht entsprechend gewichtet.' },
  { title: 'Wo blieb menschliche Arbeit entscheidend?', text: 'Priorisierung, sensible Fälle und die Bedeutung von Veränderungen für andere Teams.' },
  { title: 'Teambeobachtung', text: 'Im vorbereiteten Beispiel wurde nach zwei Wochen klarer, welche Teile zuverlässig unterstützt werden konnten und wo weiterhin Rückfragen nötig waren.' },
];
export const outcomeOptions = [
  { id: 'continue', title: 'Weiterführen', description: 'Der Ansatz funktioniert ausreichend gut und wird Teil der Arbeitsweise.' },
  { id: 'adapt', title: 'Anpassen und erneut testen', description: 'Wir verändern den Ablauf oder die Aufgabenverteilung und testen erneut.' },
  { id: 'stop', title: 'Stoppen', description: 'Der Nutzen rechtfertigt den Aufwand oder die Risiken aktuell nicht.' },
] as const;
export type Outcome = (typeof outcomeOptions)[number]['id'];
export const reflectionPrompts = [
  { id: 'work', title: 'Was haben wir über unsere Arbeit gelernt?' },
  { id: 'ai', title: 'Was haben wir über die Zusammenarbeit mit AI gelernt?' },
  { id: 'others', title: 'Was sollten andere Teams wissen?' },
] as const;
export type TeamReflection = Record<(typeof reflectionPrompts)[number]['id'], string>;
export const defaultReflection: TeamReflection = {
  work: 'Das Zusammentragen der Statusinformationen lässt sich vom fachlichen Beurteilen trennen. Prioritäten brauchen weiterhin unseren Kontext.',
  ai: 'Strukturierung war hilfreich. Die Bedeutung kleiner Veränderungen mussten wir selbst prüfen; die zusätzliche Kontrollarbeit war anfangs höher als erwartet.',
  others: 'Plant Zeit für Prüfung und Rückfragen ein. Legt vorher fest, welche Entscheidungen beim Team bleiben.',
};
export const defaultNextSteps: Record<Outcome, string> = {
  continue: 'Datenfreigaben, Ergebnisprüfung und menschliche Verantwortung regelmässig im Team klären.',
  adapt: 'AI nur für Strukturierung und Veränderungshinweise verwenden. Priorisierung bleibt vollständig beim Team.',
  stop: 'Den AI-Versuch beenden, zur bisherigen Arbeitsweise zurückkehren und die beobachteten Grenzen im Team festhalten.',
};
