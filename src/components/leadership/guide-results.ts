import {
  capacityFactors,
  capacityLevers,
  concernTopics,
  conversationFormats,
  discoverySteps,
  frictionFields,
  governanceChecks,
  governanceTopics,
  ideaReviewQuestions,
  orientationTopics,
  responsibilityLabels,
  uncertaintyOffers,
  type GuidePathId,
} from '@/data/leadership';
import type { GuideDocument, GuideStates, WorkIdea } from './guide-state';

function bullets(values: string[], empty: string) {
  return values.length ? values.map((value) => `– ${value}`).join('\n') : empty;
}

function enteredIdeas(ideas: WorkIdea[]) {
  return ideas.filter((idea) => idea.task.trim());
}

export function buildUncertaintyDocument(state: GuideStates['uncertainty']): GuideDocument {
  const offer = uncertaintyOffers.find((item) => item.id === state.offerId);
  const questions = offer?.questions.filter((question) => state.questionIds.includes(question)) ?? [];
  return {
    title: offer?.outputTitle ?? 'Meine persönliche Orientierung',
    intro: 'Eine persönliche Arbeitsnotiz für den nächsten Schritt – keine Diagnose und keine Zusage zu möglichen Rollenveränderungen.',
    sections: [
      { id: 'impulse', title: 'Gewählter Impuls', value: offer?.impulse ?? 'Noch kein Unterstützungsangebot ausgewählt.' },
      { id: 'questions', title: 'Fragen, die ich mitnehmen möchte', value: bullets(questions, 'Noch keine Fragen ausgewählt.') },
      { id: 'next', title: 'Mein nächster Schritt', value: state.nextStep.trim() || 'Noch offen.' },
      { id: 'note', title: 'Freiwillige persönliche Notiz', value: state.note.trim() || 'Keine Notiz ergänzt.' },
    ],
  };
}

export function buildUseCasesDocument(state: GuideStates['use-cases']): GuideDocument {
  if (state.mode === 'ideas') {
    const selected = enteredIdeas(state.ideas).filter((idea) => idea.decision === 'review');
    const deferred = enteredIdeas(state.ideas).filter((idea) => idea.decision && idea.decision !== 'review');
    return {
      title: 'Use-Case-Shortlist für das Team',
      intro: selected.length ? 'Die Shortlist enthält ausschliesslich Aufgaben, die du selbst als «Weiter untersuchen» markiert hast.' : 'Noch kein Use Case ausgewählt. Das ist ein gültiges Zwischenergebnis.',
      sections: [
        { id: 'shortlist', title: 'Weiter untersuchen', value: bullets(selected.map((idea) => `${idea.task.trim()}${idea.questions.trim() ? `\n  Offene Fragen: ${idea.questions.trim()}` : ''}`), 'Noch kein Use Case ausgewählt.') },
        { id: 'deferred', title: 'Später oder nicht passend', value: bullets(deferred.map((idea) => `${idea.task.trim()} – ${idea.decision === 'later' ? 'Später betrachten' : 'Nicht passend'}`), 'Keine weiteren Aufgaben markiert.') },
        { id: 'review', title: 'Prüffragen für das nächste Gespräch', value: bullets(ideaReviewQuestions, '') },
        { id: 'next', title: 'Vorgeschlagener nächster Gesprächsschritt', value: state.nextStep.trim() || 'Die ausgewählten Aufgaben gemeinsam auf Arbeitsbedarf, menschliche Verantwortung, Daten und Prüfaufwand untersuchen.' },
      ],
      disclaimer: 'Diese Auswahl ist keine Sicherheitsfreigabe und keine Eignungszertifizierung. Vor dem Team Lab bitte kopieren; es erfolgt keine automatische Übertragung.',
    };
  }

  const fields = frictionFields.filter((item) => state.frictionIds.includes(item.id)).map((item) => item.label);
  const ideas = enteredIdeas(state.ideas);
  return {
    title: 'Moderationsvorlage – Use Cases gemeinsam entdecken',
    intro: ideas.length ? 'Vorlage für die gemeinsame Sammlung mit den von dir manuell eingetragenen Aufgaben.' : 'Vorlage für die gemeinsame Sammlung. Es wurde keine Shortlist erfunden oder vorausgewählt.',
    sections: [
      { id: 'focus', title: 'Mögliche Friktionsfelder', value: bullets(fields, 'Noch keine Friktionsfelder ausgewählt – startet offen bei eurer Arbeit.') },
      { id: 'moderation', title: 'Gemeinsame Bestandsaufnahme', value: discoverySteps.map((step, index) => `${index + 1}. ${step}`).join('\n') },
      { id: 'collection', title: 'Manuell eingetragene Sammelaufgaben', value: bullets(ideas.map((idea) => `${idea.task.trim()}${idea.friction.trim() ? `\n  Aufwendig, weil: ${idea.friction.trim()}` : ''}${idea.learning.trim() ? `\n  Herausfinden: ${idea.learning.trim()}` : ''}`), 'Noch keine Aufgaben eingetragen. Nutzt die Vorlage für die gemeinsame Sammlung.') },
      { id: 'next', title: 'Nächster Schritt', value: state.nextStep.trim() || 'Tätigkeiten und Aufwand mit dem Team sammeln, bevor ihr über KI-Lösungen entscheidet.' },
    ],
  };
}

export function buildPerspectivesDocument(state: GuideStates['perspectives']): GuideDocument {
  const topic = concernTopics.find((item) => item.id === state.topicId);
  const format = conversationFormats.find((item) => item.id === state.formatId);
  const questions = topic?.questions.filter((question) => state.questionIds.includes(question)) ?? [];
  return {
    title: 'Mein Teamgespräch über KI',
    intro: 'Eine Gesprächsvorlage, die unterschiedliche Sichtweisen zulässt, ohne Motive zu diagnostizieren oder eine gemeinsame Position vorwegzunehmen.',
    sections: [
      { id: 'opening', title: 'Gesprächseinstieg', value: 'Wir wollen herausfinden, wo KI in unserer Arbeit sinnvoll helfen könnte und welche Fragen dafür geklärt werden müssen. Unterschiedliche Sichtweisen gehören dazu.' },
      { id: 'topic', title: 'Anliegen im Gespräch', value: topic?.label ?? 'Noch kein Unterthema ausgewählt.' },
      { id: 'format', title: 'Gewähltes Format', value: format ? `${format.title}\nMögliche Nebenwirkung: ${format.note}` : 'Noch kein Format ausgewählt.' },
      { id: 'questions', title: 'Ausgewählte Gesprächsfragen', value: bullets(questions, 'Noch keine Fragen ausgewählt.') },
      { id: 'feedback', title: 'Was muss ich nach dem Gespräch zurückmelden?', value: state.feedback.trim() || 'Noch offen. Im Gespräch festhalten: Was ist entschieden, was bleibt offen und wer erhält Rückmeldung?' },
    ],
  };
}

export function buildCapacityDocument(state: GuideStates['capacity']): GuideDocument {
  const factors = capacityFactors.filter((item) => state.factorIds.includes(item.id)).map((item) => item.label);
  const levers = capacityLevers.filter((item) => state.leverIds.includes(item.id)).map((item) => `${item.label} – ${state.responsibilities[item.id] ? responsibilityLabels[state.responsibilities[item.id]!] : 'Zuständigkeit noch offen'}`);
  return {
    title: 'Gesprächs- und Abstimmungsnotiz zur Kapazität',
    intro: 'Eine neue Arbeitsweise kann zunächst mehr Arbeit machen. Die Notiz behandelt das als organisatorischen Zielkonflikt, nicht als fehlende Motivation.',
    sections: [
      { id: 'factors', title: 'Beobachtete Engpässe', value: bullets(factors, 'Noch keine Belastungsfaktoren ausgewählt.') },
      { id: 'relief', title: 'Denkbare Entlastungen', value: bullets(levers, 'Noch keine Entlastungsoption ausgewählt.') },
      { id: 'open', title: 'Offene Entscheide', value: levers.some((lever) => lever.includes('noch offen')) ? 'Für mindestens eine Option ist noch zu klären, wer handeln oder entscheiden kann.' : 'Zuständigkeiten ergeben sich aus den gewählten Optionen.' },
      { id: 'next', title: 'Nächstes Gespräch', value: state.nextConversation.trim() || 'Prioritäten, Prüfaufwand und real verfügbaren Raum gemeinsam abstimmen.' },
    ],
  };
}

export function buildGovernanceDocument(state: GuideStates['governance']): GuideDocument {
  const topics = governanceTopics.filter((item) => state.topicIds.includes(item.id)).map((item) => item.label);
  const statusLabel = { clear: 'Bereits geklärt', open: 'Noch zu klären', irrelevant: 'Für das fiktive Beispiel nicht relevant', '': 'Noch nicht eingeordnet' } as const;
  return {
    title: 'Prüfblatt für einen verantwortbaren KI-Versuch',
    intro: 'Das Prüfblatt macht Klärungsbedarf sichtbar. Es erzeugt weder eine Freigabe noch ein Gesamturteil.',
    sections: [
      { id: 'focus', title: 'Gewählter Prüffokus', value: bullets(topics, 'Noch kein besonderer Prüffokus ausgewählt.') },
      { id: 'checks', title: 'Prüfpunkte', value: governanceChecks.map((check) => `– ${check.text}\n  ${statusLabel[state.checks[check.id] ?? '']}`).join('\n') },
      { id: 'reviewer', title: 'Menschliche Prüffunktion', value: state.reviewer.trim() || 'Noch zu benennen.' },
      { id: 'next', title: 'Nächste Abklärung', value: state.nextClarification.trim() || 'Offene Werkzeug-, Daten-, Verantwortungs- und Meldewege mit den zuständigen Stellen klären.' },
    ],
    disclaimer: 'Diese Vorlage ersetzt keine organisationsinterne Freigabe. Unklare Werkzeug- oder Datenfreigaben dürfen nicht durch diese Checkliste umgangen werden.',
  };
}

export function buildOrientationDocument(state: GuideStates['orientation']): GuideDocument {
  const clear = orientationTopics.filter((item) => state.statuses[item.id] === 'clear');
  const open = orientationTopics.filter((item) => state.statuses[item.id] === 'open');
  const untouched = orientationTopics.filter((item) => !state.statuses[item.id]);
  const allClear = clear.length === orientationTopics.length;
  return {
    title: 'Orientierungsnotiz für unseren nächsten Schritt',
    intro: allClear ? 'Alle betrachteten Punkte sind als bereits klar markiert. Die Notiz bestätigt den bekannten Rahmen, ohne künstlich neue Fragen zu erzeugen.' : 'Die Notiz knüpft an bestehende Vereinbarungen an und trennt geklärte von offenen Punkten.',
    sections: [
      { id: 'clear', title: 'Bereits vereinbart', value: bullets(clear.map((item) => item.label), 'Noch nichts als bereits klar markiert.') },
      { id: 'open', title: 'Noch offen', value: bullets(open.map((item) => `${item.label}\n  ${item.prompt}`), allClear ? 'Keine offenen Punkte markiert.' : 'Noch keine offenen Punkte markiert.') },
      { id: 'untouched', title: 'Nicht eingeordnet', value: bullets(untouched.map((item) => item.label), 'Alle Themen wurden eingeordnet.') },
      { id: 'partner', title: 'Gesprächspartner oder Rolle', value: state.partner.trim() || (allClear ? 'Für die Bestätigung des Rahmens nach Bedarf.' : 'Noch zu bestimmen.') },
      { id: 'next', title: 'Nächster Abstimmungsschritt', value: state.nextStep.trim() || (allClear ? 'Mit dem bekannten Rahmen zur Use-Case-Suche oder ins Team Lab übergehen.' : 'Die als offen markierten Punkte mit den zuständigen Rollen besprechen.') },
    ],
  };
}

export function buildOtherDocument(state: GuideStates['other']): GuideDocument {
  return {
    title: 'Meine persönliche Notiz',
    intro: 'Der Text wird exakt als lokale Notiz übernommen. Er wurde nicht analysiert, klassifiziert oder einem Guide zugeordnet.',
    sections: [
      { id: 'concern', title: 'Was beschäftigt mich?', value: state.note.trim() || 'Keine Notiz ergänzt.' },
      { id: 'known', title: 'Was weiss ich schon?', value: state.known.trim() || 'Noch offen.' },
      { id: 'support', title: 'Welche Unterstützung wäre als Nächstes hilfreich?', value: state.support.trim() || 'Noch offen.' },
    ],
    disclaimer: 'Keine KI-Auswertung, keine Keyword-Klassifikation und keine automatische Empfehlung.',
  };
}

export function buildGuideDocument<K extends GuidePathId>(path: K, states: GuideStates): GuideDocument {
  switch (path) {
    case 'uncertainty': return buildUncertaintyDocument(states.uncertainty);
    case 'use-cases': return buildUseCasesDocument(states['use-cases']);
    case 'perspectives': return buildPerspectivesDocument(states.perspectives);
    case 'capacity': return buildCapacityDocument(states.capacity);
    case 'governance': return buildGovernanceDocument(states.governance);
    case 'orientation': return buildOrientationDocument(states.orientation);
    case 'other': return buildOtherDocument(states.other);
  }
}
