import { featuredUseCases } from './content';
import { communityLearnings } from './community';

const journeyPresentation: Record<string, { benefit: string; image: string; tone: string; action: string }> = {
  'interview-vorbereiten': { benefit: 'Bessere Fragen, strukturierte Vorbereitung und gezieltere Gespräche.', image: 'recruiting.svg', tone: 'mint', action: 'Use Case entdecken' },
  'projektstatus-vorbereiten': { benefit: 'Projektinformationen strukturieren und einen klaren Statusentwurf vorbereiten.', image: 'project.svg', tone: 'sky', action: 'Use Case entdecken' },
  'team-experiment': { benefit: 'Gemeinsam Ideen testen und herausfinden, was für eure Arbeit funktioniert.', image: 'team.svg', tone: 'apricot', action: 'Jetzt starten' },
};
export const homepageJourneys = featuredUseCases.map((item) => ({ item, ...journeyPresentation[item.slug] }));

export const homepageSignals = [
  { title: 'Schon nutzbar', description: 'Erste konkrete Use Cases zeigen, wo AI heute unterstützen kann.', icon: 'shield', tone: 'mint' },
  { title: 'In Erprobung', description: 'Team Lab und fiktive Beispiele zeigen, wie Teams neue Arbeitsweisen erproben können.', icon: 'project', tone: 'sky' },
  { title: 'Nächster Fokus', description: 'Learnings verbinden, geeignete Anwendungen erproben und Leitplanken konkretisieren.', icon: 'search', tone: 'apricot' },
] as const;

const previewSelection = [
  { id: 'meeting-entscheidungen-bestaetigen', title: 'Aus Meetingnotizen klare nächste Schritte machen', image: 'notes.svg', label: 'Praxisbeispiel' },
  { id: 'projektstatus-kontext', title: 'Ein guter Status braucht menschlichen Kontext', image: 'project.svg', label: 'Aus der Projektarbeit' },
  { id: 'team-einsatz-eingrenzen', title: 'Was im Team funktioniert – und was wir anpassen', image: 'team.svg', label: 'Aus der Community' },
];
export const homepageLearnings = previewSelection.map((preview) => {
  const learning = communityLearnings.find((item) => item.id === preview.id);
  if (!learning) throw new Error(`Unknown homepage learning: ${preview.id}`);
  return { ...preview, learning, href: `/community#learning-${learning.id}` };
});
