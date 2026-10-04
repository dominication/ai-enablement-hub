import { type ChangeId, type ProjectChange, type RiskLevel } from './project';

export type ChangeReview = { state: 'pending' | 'confirmed' | 'excluded'; wording: string; context: string };
export type ChangeReviews = Partial<Record<ChangeId, ChangeReview>>;
export type StatusSectionId = 'overall' | 'changes' | 'risks' | 'decisions' | 'open' | 'next';
export type StatusSection = { id: StatusSectionId; title: string; text: string };
export type StatusDraft = StatusSection[];
export function createStatusDraft(changes: ProjectChange[], reviews: ChangeReviews, risk: RiskLevel | '', context: string): StatusDraft {
  const included = changes.filter((change) => reviews[change.id]?.state === 'confirmed');
  const integration = included.find((change) => change.id === 'integration');
  const reviewedText = (change: ProjectChange) => {
    const review = reviews[change.id]!;
    return `${review.wording}${review.context.trim() ? `\nKontext der Projektleitung: ${review.context.trim()}` : ''}`;
  };
  const pending = changes.filter((change) => (reviews[change.id]?.state ?? 'pending') === 'pending');
  return [
    { id: 'overall', title: 'Gesamtstatus', text: integration && risk ? `${risk === 'hoch' ? 'angespannt' : risk === 'mittel' ? 'aufmerksam beobachten' : 'weiter beobachten'} – Formulierungsvorschlag auf Basis deiner Einordnung «${risk}». Gesamtstatus vor Verwendung selbst festlegen.` : 'Noch festzulegen – eine Gesamtbeurteilung durch die Projektleitung steht aus.' },
    { id: 'changes', title: 'Wichtigste Veränderungen', text: included.map(reviewedText).join('\n\n') || 'Noch keine Veränderungen bestätigt.' },
    { id: 'risks', title: 'Risiken', text: integration && risk ? `${reviews.integration!.wording}\nRisiko: ${risk} – Einordnung der Projektleitung.\nZusätzlicher Kontext: ${context.trim() || 'Kein zusätzlicher Kontext angegeben.'}` : 'Noch keine Risikoeinordnung der Projektleitung übernommen. Das bedeutet nicht, dass keine Risiken bestehen.' },
    { id: 'decisions', title: 'Entscheidungen', text: included.filter((change) => change.category === 'Entscheidung').map(reviewedText).join('\n\n') || 'Keine bestätigten Entscheidungen aus der ausgewählten Auswertung übernommen.' },
    { id: 'open', title: 'Offene Punkte', text: [...included.filter((change) => ['Abhängigkeit', 'Offener Punkt'].includes(change.category)).map(reviewedText), ...(pending.length ? [`Noch nicht eingeordnete Hinweise (${pending.length}):\n${pending.map((change) => `– ${change.title}`).join('\n')}`] : [])].join('\n\n') || 'Keine offenen Punkte aus den bestätigten Hinweisen übernommen. Vollständigkeit prüfen.' },
    { id: 'next', title: 'Nächste Schritte', text: included.map((change) => `Vorschlag – ${change.nextAction}`).join('\n\n') || 'Nächste Schritte durch die Projektleitung ergänzen.' },
  ];
}
