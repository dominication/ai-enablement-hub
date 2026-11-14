import { improvementFocuses, personalOffers, tryTasks, type PersonalPathId } from '@/data/personal-guide';
import type { PersonalGuideDocument, PersonalGuideStates } from './personal-guide-state';

function bullets(values: string[], empty: string) {
  return values.length ? values.map((value) => `– ${value}`).join('\n') : empty;
}

function selectedOffers(path: PersonalPathId, offerIds: string[]) {
  return personalOffers[path].filter((offer) => offerIds.includes(offer.id)).map((offer) => offer.title);
}

function buildUnderstand(state: PersonalGuideStates['understand']): PersonalGuideDocument {
  return {
    title: 'Meine persönliche Orientierungsnotiz',
    intro: 'Eine nicht bewertende Momentaufnahme zu KI im eigenen Arbeitsalltag. Sie verpflichtet dich zu keinem Versuch.',
    sections: [
      { id: 'offers', title: 'Was ich genauer betrachten möchte', value: bullets(selectedOffers('understand', state.offerIds), 'Noch kein Angebot ausgewählt.') },
      { id: 'work', title: 'Beispiele aus meinem Arbeitsalltag', value: state.workExamples.trim() || 'Noch keine Beispiele notiert.' },
      { id: 'boundaries', title: 'Wo menschliches Urteil wichtig bleibt', value: state.boundaries.trim() || 'Noch offen.' },
      { id: 'questions', title: 'Meine offenen Fragen', value: state.questions.trim() || 'Noch keine Fragen notiert.' },
      { id: 'next', title: 'Optionaler nächster Schritt', value: state.nextStep.trim() || 'Kein nächster Schritt festgelegt.' },
    ],
  };
}

function buildTry(state: PersonalGuideStates['try']): PersonalGuideDocument {
  const task = tryTasks.find((item) => item.id === state.taskId);
  const approval = { clear: 'Werkzeug und Informationskategorie sind für diesen begrenzten Versuch geklärt.', open: 'Freigaben sind noch offen – der Versuch beginnt erst nach Klärung.', 'not-needed': 'Es werden nur öffentliche oder vollständig fiktive Inhalte ohne internes Werkzeug verwendet.', '': 'Der erlaubte Rahmen ist noch nicht eingeordnet.' }[state.approval];
  const taskLabel = state.taskId === 'custom' ? state.customTask.trim() : task?.label;
  return {
    title: 'Vorbereitung für meinen begrenzten KI-Versuch',
    intro: taskLabel ? 'Die Vorbereitung beruht auf deiner selbst gewählten Aufgabe und deinem Prüfplan.' : 'Noch keine Aufgabe gewählt. Ohne Aufgabe beginnt kein Versuch.',
    sections: [
      { id: 'offers', title: 'Gewählte Vorbereitungsschritte', value: bullets(selectedOffers('try', state.offerIds), 'Noch keine Vorbereitungsschritte ausgewählt.') },
      { id: 'task', title: 'Kleine, unkritische Aufgabe', value: taskLabel || 'Noch keine Aufgabe ausgewählt oder beschrieben.' },
      { id: 'approval', title: 'Freigaben und Informationsrahmen', value: approval },
      { id: 'review', title: 'Meine menschliche Prüfung', value: state.reviewPlan.trim() || 'Ergebnis mit Ausgangsmaterial vergleichen, Fehler markieren und fachlich selbst entscheiden.' },
      { id: 'stop', title: 'Wann ich den Versuch stoppe', value: state.stopCondition.trim() || 'Wenn Freigaben, Datenrahmen oder eine verlässliche menschliche Prüfung unklar sind.' },
    ],
    disclaimer: 'Diese Vorbereitung ist keine Werkzeug- oder Datenfreigabe. Verwende keine vertraulichen oder personenbezogenen Angaben und prüfe jedes Ergebnis selbst.',
  };
}

function buildConcerns(state: PersonalGuideStates['concerns']): PersonalGuideDocument {
  return {
    title: 'Meine persönliche Gesprächs- und Klärungsnotiz',
    intro: 'Die Notiz hält deine Angaben fest, ohne Motive, Haltung oder persönliche Auswirkungen zu interpretieren.',
    sections: [
      { id: 'offers', title: 'Was mir jetzt helfen könnte', value: bullets(selectedOffers('concerns', state.offerIds), 'Noch kein Angebot ausgewählt.') },
      { id: 'facts', title: 'Was tatsächlich bekannt oder beobachtet ist', value: state.facts.trim() || 'Noch nichts notiert.' },
      { id: 'questions', title: 'Was für mich offen ist', value: state.openQuestions.trim() || 'Noch keine offenen Fragen notiert.' },
      { id: 'conversation', title: 'Was ich in einem Gespräch ansprechen möchte', value: state.conversation.trim() || 'Noch offen.' },
      { id: 'support', title: 'Welche Rolle verbindlich unterstützen könnte', value: state.support.trim() || 'Noch nicht festgelegt.' },
    ],
    disclaimer: 'Die Vorlage macht keine Aussagen über Arbeitsplatzsicherheit oder künftige Rollen. Verbindliche Auskünfte müssen von den zuständigen Stellen kommen.',
  };
}

function buildImprove(state: PersonalGuideStates['improve']): PersonalGuideDocument {
  const focuses = improvementFocuses.filter((focus) => state.focusIds.includes(focus.id)).map((focus) => focus.label);
  return {
    title: 'Meine Verbesserungs- und Reflexionsvorlage',
    intro: 'Eine fachliche Betrachtung des Arbeitsprozesses – kein Kompetenztest und keine Bewertung deiner KI-Erfahrung.',
    sections: [
      { id: 'offers', title: 'Gewählte Betrachtungsweisen', value: bullets(selectedOffers('improve', state.offerIds), 'Noch kein Angebot ausgewählt.') },
      { id: 'focus', title: 'Mein Prüffokus', value: bullets(focuses, 'Noch kein Fokus ausgewählt.') },
      { id: 'process', title: 'So arbeite ich heute', value: state.currentProcess.trim() || 'Noch nicht beschrieben.' },
      { id: 'effort', title: 'Qualität und Prüfaufwand', value: state.reviewEffort.trim() || 'Noch nicht festgehalten.' },
      { id: 'decision', title: 'Menschliche Prüfung und Entscheidung', value: state.decisionOwner.trim() || 'Noch zu klären.' },
      { id: 'change', title: 'Eine kleine Verbesserung, die ich prüfen möchte', value: state.change.trim() || 'Noch keine Änderung festgelegt.' },
    ],
  };
}

function buildPause(state: PersonalGuideStates['pause']): PersonalGuideDocument {
  const choices = { 'not-now': 'Vorerst nicht beginnen.', overview: 'Nur gelegentlich einen Überblick behalten.', support: 'Unterstützung für einen möglichen späteren Einstieg notieren.', '': 'Noch keine Option ausgewählt.' } as const;
  return {
    title: 'Meine optionale Notiz für später',
    intro: state.choice === 'not-now' ? 'Vorerst nichts auszuprobieren ist das bewusst gewählte und vollständige Ergebnis.' : 'Du bestimmst selbst, ob und wann ein nächster Schritt sinnvoll ist.',
    sections: [
      { id: 'choice', title: 'Meine Entscheidung für jetzt', value: choices[state.choice] },
      { id: 'offers', title: 'Was ich allenfalls mitnehmen möchte', value: bullets(selectedOffers('pause', state.offerIds), 'Keine zusätzlichen Angebote ausgewählt.') },
      { id: 'reason', title: 'Was ich für mich festhalten möchte', value: state.reason.trim() || 'Keine Begründung ergänzt – sie ist nicht erforderlich.' },
      { id: 'support', title: 'Was einen späteren Einstieg erleichtern könnte', value: state.support.trim() || 'Keine Unterstützung notiert.' },
      { id: 'revisit', title: 'Ob oder wann ich darauf zurückkommen möchte', value: state.revisit.trim() || 'Kein Zeitpunkt festgelegt.' },
    ],
  };
}

function buildOther(state: PersonalGuideStates['other']): PersonalGuideDocument {
  return {
    title: 'Meine neutrale persönliche Notiz',
    intro: 'Deine Formulierungen werden unverändert übernommen. Es findet keine Analyse, Klassifikation oder automatische Themenwahl statt.',
    sections: [
      { id: 'note', title: 'Was beschäftigt mich?', value: state.note.trim() || 'Keine Notiz ergänzt.' },
      { id: 'offers', title: 'Was ich mitnehmen möchte', value: bullets(selectedOffers('other', state.offerIds), 'Keine zusätzlichen Angebote ausgewählt.') },
      { id: 'known', title: 'Was weiss ich schon?', value: state.known.trim() || 'Noch offen.' },
      { id: 'support', title: 'Welche Unterstützung wäre hilfreich?', value: state.support.trim() || 'Noch offen.' },
    ],
    disclaimer: 'Keine KI-Auswertung, keine Keyword-Klassifikation und keine automatische Empfehlung.',
  };
}

export function buildPersonalDocument<K extends PersonalPathId>(path: K, states: PersonalGuideStates): PersonalGuideDocument {
  switch (path) {
    case 'understand': return buildUnderstand(states.understand);
    case 'try': return buildTry(states.try);
    case 'concerns': return buildConcerns(states.concerns);
    case 'improve': return buildImprove(states.improve);
    case 'pause': return buildPause(states.pause);
    case 'other': return buildOther(states.other);
  }
}
