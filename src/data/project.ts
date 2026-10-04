// All project names, organisations, dates and contents are fictional demonstration data.
export type SourceId = 'previous' | 'meeting' | 'milestones' | 'decisions';
export type RiskLevel = 'niedrig' | 'mittel' | 'hoch';
export type ChangeId = 'integration' | 'pilot' | 'interface' | 'communication';
export type SourceEntry = { id: string; title: string; text: string };
export type ProjectSource = { id: SourceId; title: string; date: string; summary: string; entries: SourceEntry[] };
export const project = {
  name: 'Projekt Nordstern',
  description: 'Einführung eines neuen digitalen Serviceportals für interne Mitarbeitende.',
  period: '15. Oktober 2026', previousPeriod: '8. Oktober 2026',
  pilot: '29. Oktober 2026', goLive: '19. November 2026',
  workstreams: ['Portal & Inhalte', 'Integration & Test', 'Pilot & Kommunikation'],
  stakeholders: ['Projektleitung', 'Lenkungskreis', 'Pilotorganisation Musterbereich (fiktiv)', 'Team Serviceprozesse', 'Team Betriebsübergabe'],
};
export const previousStatus: SourceEntry[] = [
  { id: 'baseline-test', title: 'Test und Einführung', text: 'Integrationstest am 20. Oktober vorgesehen. Der Pilot mit der fiktiven Partnerorganisation Musterbereich startet am 29. Oktober. Geplanter Go-live: 19. November.' },
  { id: 'baseline-pilot', title: 'Pilotumfang', text: 'Der Pilot ist mit 30 Personen geplant. Eine Erweiterung steht zur Entscheidung im nächsten Lenkungskreis.' },
  { id: 'baseline-interface', title: 'Schnittstelle', text: 'Die Bestätigung der Schnittstelle zum fiktiven System Brückendienst wird bis 13. Oktober erwartet.' },
  { id: 'baseline-comms', title: 'Kommunikation', text: 'Die Verantwortung für die Kommunikation vor dem Pilot soll bis 12. Oktober festgelegt werden.' },
];
export const meetingNotes: SourceEntry[] = [
  { id: 'test-delay', title: 'Integrationstest neu am 27. Oktober', text: 'Der Integrationstest verschiebt sich vom 20. auf den 27. Oktober. Die Testumgebung steht später als geplant zur Verfügung. Die Freigabe ist Voraussetzung für den vereinbarten Pilot am 29. Oktober.' },
  { id: 'comms-owner', title: 'Kommunikationsverantwortung offen', text: 'Die für den 12. Oktober vorgesehene Benennung ist noch ausstehend. Für die Information der Pilotgruppe wurde weiterhin keine verantwortliche Rolle festgelegt.' },
  { id: 'pilot-dependencies', title: 'Abhängige Teams', text: 'Team Serviceprozesse benötigt das Testergebnis für den Pilotablauf. Team Betriebsübergabe benötigt es zur Vorbereitung des Supports. Der Pilottermin ist mit der fiktiven externen Pilotorganisation Musterbereich vereinbart.' },
];
export const milestones: SourceEntry[] = [
  { id: 'integration-date', title: 'Integrationstest · 27. Oktober', text: 'Bisher: 20. Oktober. Neu: 27. Oktober (+7 Tage). Arbeitspaket Integration & Test. Verantwortliche Rolle: Testkoordination. Ergebnisfreigabe steht aus.' },
  { id: 'pilot-date', title: 'Pilotstart · 29. Oktober', text: 'Starttermin bleibt geplant. Voraussetzungen: freigegebener Integrationstest, abgestimmter Pilotablauf, informierte Pilotgruppe.' },
  { id: 'launch-date', title: 'Go-live · 19. November', text: 'Geplanter Termin unverändert. Voraussetzung: Pilot abgeschlossen, kritische Befunde geklärt, Betriebsübergabe freigegeben.' },
];
export const decisions: SourceEntry[] = [
  { id: 'pilot-size', title: 'Beschlossen: 50 statt 30 Personen', text: 'Lenkungskreis vom 14. Oktober: Der Pilot wird von 30 auf 50 Personen erweitert, damit zusätzliche Arbeitsabläufe erprobt werden können. Pilotkoordination prüft den zusätzlichen Betreuungsbedarf.' },
];
export const dependencies: SourceEntry[] = [
  { id: 'interface-open', title: 'Bestätigung der Schnittstelle ausstehend', text: 'Stand 15. Oktober: Die bis 13. Oktober erwartete Bestätigung der Schnittstelle zum fiktiven System Brückendienst liegt noch nicht vor. Zuständige Rolle: Integrationskoordination. Verbindlicher Liefertermin weiterhin offen.' },
];
export const projectSources: ProjectSource[] = [
  { id: 'previous', title: 'Letzter Projektstatus', date: '8. Oktober 2026', summary: 'Vergleichsbasis: bisherige Termine, Pilotumfang und erwartete Klärungen.', entries: previousStatus },
  { id: 'meeting', title: 'Meetingnotizen', date: '14. Oktober 2026', summary: 'Neuer Testtermin, Pilotabhängigkeiten und ungeklärte Kommunikationsverantwortung.', entries: meetingNotes },
  { id: 'milestones', title: 'Aufgaben & Meilensteine', date: '15. Oktober 2026', summary: 'Aktuelle Termine, Voraussetzungen und zuständige Rollen für Test, Pilot und Go-live.', entries: milestones },
  { id: 'decisions', title: 'Entscheidungen & offene Punkte', date: '15. Oktober 2026', summary: 'Erweiterung der Pilotgruppe und ausstehende Bestätigung der Schnittstelle.', entries: [...decisions, ...dependencies] },
];
export type SourceReference = { sourceId: SourceId; entryId: string };
export type ProjectChange = {
  id: ChangeId; category: string; title: string; description: string;
  baseline: SourceReference; evidence: SourceReference[]; nextAction: string;
};
export const detectedChanges: ProjectChange[] = [
  { id: 'integration', category: 'Termin', title: 'Integrationstest verschiebt sich um 7 Tage', description: 'Bisher 20. Oktober, neu 27. Oktober. Der geplante Go-live bleibt am 19. November.', baseline: { sourceId: 'previous', entryId: 'baseline-test' }, evidence: [{ sourceId: 'meeting', entryId: 'test-delay' }, { sourceId: 'milestones', entryId: 'integration-date' }], nextAction: 'Testkoordination: Auswirkungen des neuen Testtermins auf Pilot und abhängige Teams klären; Handlungsoptionen mit der Projektleitung abstimmen.' },
  { id: 'pilot', category: 'Entscheidung', title: 'Pilotgruppe wird von 30 auf 50 Personen erweitert', description: 'Der Lenkungskreis hat die Erweiterung beschlossen. Der zusätzliche Betreuungsbedarf ist zu prüfen.', baseline: { sourceId: 'previous', entryId: 'baseline-pilot' }, evidence: [{ sourceId: 'decisions', entryId: 'pilot-size' }], nextAction: 'Pilotkoordination: Kapazität und Betreuung für die erweiterte Pilotgruppe prüfen.' },
  { id: 'interface', category: 'Abhängigkeit', title: 'Schnittstelle zu einem abhängigen System ist noch nicht bestätigt', description: 'Die erwartete Bestätigung liegt nach dem vorgesehenen Klärungstermin weiterhin nicht vor.', baseline: { sourceId: 'previous', entryId: 'baseline-interface' }, evidence: [{ sourceId: 'decisions', entryId: 'interface-open' }], nextAction: 'Integrationskoordination: Verbindlichen Termin für die Schnittstellenbestätigung einholen und Folgen mit der Projektleitung beurteilen.' },
  { id: 'communication', category: 'Offener Punkt', title: 'Verantwortung für die Kommunikation vor dem Pilot ist noch ungeklärt', description: 'Die vorgesehene Klärung bis 12. Oktober ist ausstehend. Eine verantwortliche Rolle wurde noch nicht benannt.', baseline: { sourceId: 'previous', entryId: 'baseline-comms' }, evidence: [{ sourceId: 'meeting', entryId: 'comms-owner' }], nextAction: 'Projektleitung: Verantwortliche Rolle für die Pilotkommunikation benennen und Kommunikationsplan abstimmen.' },
];
export const preliminaryAssessment = { risk: 'niedrig' as RiskLevel, reasoning: 'Der neue Termin liegt weiterhin vor dem geplanten Go-live.' };
export const exampleContext = 'Der Integrationstest ist Voraussetzung für den extern vereinbarten Pilot. Zwei weitere Teams sind vom Ergebnis abhängig. Eine weitere Verschiebung gefährdet den geplanten Go-live.';
export const reliefOptions = ['Informationen zusammentragen', 'Veränderungen erkennen', 'Status strukturieren', 'offene Punkte sichtbar machen', 'Keine erkennbare Entlastung'];
export const judgementOptions = ['Risiken bewerten', 'Stakeholder-Kontext', 'Prioritäten', 'Entscheidungen', 'Kommunikation'];
export const workflowShift = {
  today: ['Informationen suchen', 'zusammentragen', 'strukturieren', 'interpretieren', 'Status schreiben'],
  supported: ['Informationen zusammenführen lassen', 'Veränderungen prüfen', 'interpretieren', 'entscheiden', 'Status finalisieren'],
  automated: ['Informationen zusammengeführt', 'Veränderungen sichtbar gemacht', 'Entwurf strukturiert'],
  human: ['Auswirkungen verstanden', 'Risiken eingeordnet', 'Prioritäten gesetzt', 'Kontext ergänzt', 'Entscheidungen verantwortet'],
};
export function availableChanges(selected: SourceId[]) {
  return detectedChanges.filter((change) => selected.includes(change.baseline.sourceId) && change.evidence.some((reference) => selected.includes(reference.sourceId)));
}
export function referencesFor(change: ProjectChange, selected: SourceId[]) {
  return [change.baseline, ...change.evidence.filter((reference) => selected.includes(reference.sourceId))];
}
export function resolveReference(reference: SourceReference) {
  const source = projectSources.find((item) => item.id === reference.sourceId)!;
  return { source, entry: source.entries.find((item) => item.id === reference.entryId)! };
}
