import { informationCategories, useCases } from './content';
import { communityLearnings } from './community';

// Editorial, fictional orientation. These observations are not usage telemetry
// or an assessment computed from activity in the demo.
export type OrganisationalObservation = { title: string; description: string };
export type EvidenceReference =
  | { kind: 'use-case'; slug: string }
  | { kind: 'community'; id: string }
  | { kind: 'guideline'; name: string };
export type OrganisationalPerspective = {
  id: string;
  title: string;
  observation: string;
  question: string;
  evidence: readonly EvidenceReference[];
};
export type AttentionArea = { id: string; title: string; description: string };

export const organisationalObservations: readonly OrganisationalObservation[] = [
  { title: 'Konkrete Anfänge', description: 'Erste Use Cases sind etabliert und helfen bei konkreten Aufgaben im Arbeitsalltag.' },
  { title: 'Lernen nimmt zu', description: 'Erfahrungen werden geteilt und erste Muster zwischen unterschiedlichen Arbeitssituationen sichtbar.' },
  { title: 'Noch offene Fragen', description: 'Der Umgang mit sensiblen Informationen ist nicht in allen Arbeitssituationen gleich eindeutig.' },
];

export const organisationalPerspectives: readonly OrganisationalPerspective[] = [
  {
    id: 'orientierung', title: 'Orientierung & Befähigung',
    observation: 'Mitarbeitende finden erste geeignete Anwendungen und informieren sich aktiv über sinnvolle Einsatzmöglichkeiten.',
    question: 'Wie erreichen Orientierung und sichere Anwendung auch weniger erfahrene Mitarbeitende?',
    evidence: [{ kind: 'use-case', slug: 'interview-vorbereiten' }, { kind: 'use-case', slug: 'recherche-strukturieren' }],
  },
  {
    id: 'anwendung', title: 'Anwendung im Arbeitsalltag',
    observation: 'Mehrere konkrete Aufgaben werden bereits mit AI unterstützt – besonders beim Strukturieren und Vorbereiten.',
    question: 'Wo verändert AI tatsächlich Arbeitsabläufe und nicht nur einzelne Arbeitsschritte?',
    evidence: [{ kind: 'use-case', slug: 'projektstatus-vorbereiten' }, { kind: 'community', id: 'projektstatus-kontext' }],
  },
  {
    id: 'teams', title: 'Teams & Zusammenarbeit',
    observation: 'Einzelne Teams testen neue Arbeitsweisen gemeinsam und reflektieren erste Erfahrungen.',
    question: 'Wie werden Erfahrungen zwischen Teams systematischer nutzbar?',
    evidence: [{ kind: 'use-case', slug: 'team-experiment' }, { kind: 'community', id: 'team-einsatz-eingrenzen' }],
  },
  {
    id: 'lernen', title: 'Lernen & Austausch',
    observation: 'Erfahrungen werden geteilt und machen sichtbar, was funktioniert, angepasst oder bewusst beendet wurde.',
    question: 'Wie werden Learnings wiederverwendet, statt nur dokumentiert?',
    evidence: [{ kind: 'community', id: 'interviewfragen-pruefen' }, { kind: 'community', id: 'team-versuch-beenden' }],
  },
  {
    id: 'governance', title: 'Governance & Leitplanken',
    observation: 'Grundlegende Regeln und menschliche Verantwortung sind in den bisherigen Beispielen sichtbar.',
    question: 'Wo brauchen konkrete Arbeitskontexte noch klarere Leitplanken?',
    evidence: [{ kind: 'guideline', name: 'Personendaten' }, { kind: 'guideline', name: 'Vertraulich' }, { kind: 'community', id: 'interviewfragen-pruefen' }],
  },
];

export const attentionAreas: readonly AttentionArea[] = [
  { id: 'austausch', title: 'Erfahrungen zwischen Teams nutzbarer machen', description: 'Ähnliche Learnings entstehen in mehreren Experimenten, werden aber noch wenig miteinander verbunden.' },
  { id: 'leitplanken', title: 'Datenleitplanken konkreter machen', description: 'Bei sensiblen Informationen entstehen wiederkehrende Unsicherheiten. Konkretere Beispiele könnten Orientierung geben.' },
  { id: 'erproben', title: 'Geeignete Use Cases gezielt weiter erproben', description: 'Strukturierungs- und Vorbereitungsaufgaben zeigen wiederholt Potenzial und eignen sich für weitere kontrollierte Experimente.' },
];

// Resolve references against the existing Hub content instead of copying objects.
export function resolveEvidence(reference: EvidenceReference): { label: string; href: string; signal: string } {
  if (reference.kind === 'use-case') {
    const item = useCases.find((entry) => entry.slug === reference.slug);
    if (!item) throw new Error(`Unknown organisational use case: ${reference.slug}`);
    return { label: `Use Case: ${item.title}`, href: item.href, signal: item.description };
  }
  if (reference.kind === 'community') {
    const item = communityLearnings.find((entry) => entry.id === reference.id);
    if (!item) throw new Error(`Unknown organisational learning: ${reference.id}`);
    return { label: `Community: ${item.useCase.title}`, href: `/community#learning-${item.id}`, signal: item.takeaway };
  }
  const index = informationCategories.findIndex((entry) => entry.name === reference.name);
  if (index < 0) throw new Error(`Unknown organisational guideline: ${reference.name}`);
  const item = informationCategories[index];
  return { label: `Guidelines: ${item.name}`, href: `/guidelines#${index + 1}`, signal: item.description };
}
