export type PersonalPathId = 'understand' | 'try' | 'concerns' | 'improve' | 'pause' | 'other';
export type PersonalGuideStage = 'situation' | 'offers' | 'takeaway';

export type PersonalPathSummary = {
  id: PersonalPathId;
  title: string;
  promise: string;
  takeaway: string;
};

export type PersonalOffer = {
  id: string;
  title: string;
  description: string;
};

export const personalPaths: PersonalPathSummary[] = [
  {
    id: 'understand',
    title: 'Ich möchte erst verstehen, was KI für meine Arbeit bedeuten könnte',
    promise: 'Möglichkeiten und Grenzen am eigenen Arbeitsalltag betrachten – ohne dass du schon etwas ausprobieren musst.',
    takeaway: 'Persönliche Orientierungsnotiz',
  },
  {
    id: 'try',
    title: 'Ich möchte etwas Kleines und Sinnvolles ausprobieren',
    promise: 'Eine unkritische Aufgabe, den erlaubten Rahmen und deine menschliche Prüfung bewusst festlegen.',
    takeaway: 'Vorbereitung für einen begrenzten Versuch',
  },
  {
    id: 'concerns',
    title: 'Ich habe Vorbehalte oder mache mir Sorgen um meine Arbeit',
    promise: 'Gesicherte Informationen, offene Fragen und ein mögliches Gespräch respektvoll auseinanderhalten.',
    takeaway: 'Persönliche Gesprächs- und Klärungsnotiz',
  },
  {
    id: 'improve',
    title: 'Ich habe schon KI-Erfahrung und möchte besser damit arbeiten',
    promise: 'Qualität, Prüfaufwand, Arbeitsablauf und menschliche Entscheidung genauer untersuchen.',
    takeaway: 'Verbesserungs- und Reflexionsvorlage',
  },
  {
    id: 'pause',
    title: 'Ich weiss nicht, ob ich gerade Zeit oder Bedarf dafür habe',
    promise: 'Nicht zu beginnen ist eine gleichwertige Option. Du entscheidest, ob überhaupt ein kleiner nächster Schritt passt.',
    takeaway: 'Optionale Notiz für später',
  },
  {
    id: 'other',
    title: 'Etwas anderes',
    promise: 'Halte dein Anliegen in eigenen Worten fest. Der Text wird nicht ausgewertet oder einem Thema zugeordnet.',
    takeaway: 'Neutrale persönliche Notiz',
  },
];

export const personalOffers: Record<PersonalPathId, PersonalOffer[]> = {
  understand: [
    { id: 'work', title: 'Den eigenen Arbeitsalltag betrachten', description: 'Aufgaben sammeln, bei denen Ordnen, Formulieren oder Vergleichen eine Rolle spielt – ohne daraus schon einen KI-Einsatz abzuleiten.' },
    { id: 'limits', title: 'Möglichkeiten und Grenzen sortieren', description: 'Festhalten, wo KI Entwürfe unterstützen könnte und wo Fachurteil, Kontext oder Verantwortung beim Menschen bleiben.' },
    { id: 'questions', title: 'Offene Fragen mitnehmen', description: 'Fragen zu Werkzeugen, Daten, Qualität oder Unterstützung für ein Gespräch vorbereiten.' },
  ],
  try: [
    { id: 'task', title: 'Eine kleine Aufgabe eingrenzen', description: 'Nur eine fiktive, öffentliche oder ausdrücklich freigegebene Aufgabe wählen, deren Ergebnis gut überprüfbar ist.' },
    { id: 'frame', title: 'Erlaubten Rahmen prüfen', description: 'Werkzeug- und Datenfreigaben vor dem Versuch klären; offene Freigaben nicht durch die Vorlage ersetzen.' },
    { id: 'review', title: 'Menschliche Prüfung planen', description: 'Vorab festlegen, wie du Ergebnis, Quellen und mögliche Fehler prüfst und wann du den Versuch stoppst.' },
  ],
  concerns: [
    { id: 'facts', title: 'Gesichertes und Offenes trennen', description: 'Festhalten, was tatsächlich kommuniziert oder beobachtet wurde und was noch eine Frage ist.' },
    { id: 'conversation', title: 'Ein Gespräch vorbereiten', description: 'Fragen formulieren, ohne dir oder anderen Motive zuzuschreiben oder Sicherheit zu versprechen.' },
    { id: 'support', title: 'Passende Unterstützung benennen', description: 'Überlegen, welche Rolle zu Arbeitsgestaltung, Entwicklung, Datenschutz oder Freigaben verbindlich Auskunft geben kann.' },
  ],
  improve: [
    { id: 'quality', title: 'Qualität und Prüfaufwand vergleichen', description: 'Beobachten, welche Fehler auftreten, wie viel Nacharbeit nötig ist und ob der Ablauf wirklich entlastet.' },
    { id: 'process', title: 'Den Arbeitsprozess anpassen', description: 'Klären, an welcher Stelle KI sinnvoll unterstützt und wo Übergaben, Quellen oder Zwischenschritte sichtbar bleiben müssen.' },
    { id: 'decision', title: 'Menschliche Entscheidung schärfen', description: 'Festhalten, wer fachlich prüft, abwägt und das Ergebnis verantwortet.' },
  ],
  pause: [
    { id: 'not-now', title: 'Vorerst nicht beginnen', description: 'Den Einstieg bewusst vertagen, ohne eine Ersatzaufgabe oder Rechtfertigung daraus zu machen.' },
    { id: 'overview', title: 'Nur einen Überblick behalten', description: 'Bei Bedarf gelegentlich einen Use Case oder eine Guideline ansehen – ohne eigenes Experiment.' },
    { id: 'support', title: 'Unterstützung für später notieren', description: 'Festhalten, welche Zeit, Information oder Begleitung einen späteren Einstieg erleichtern könnte.' },
  ],
  other: [
    { id: 'note', title: 'Eigene Notiz weiterführen', description: 'Das Anliegen unverändert in eine kopierbare persönliche Notiz übernehmen.' },
    { id: 'known', title: 'Bekanntes und Offenes festhalten', description: 'In eigenen Worten notieren, was du schon weisst und was offenbleiben darf.' },
    { id: 'support', title: 'Nützliche Unterstützung benennen', description: 'Optional festhalten, welche Information oder welches Gespräch als Nächstes helfen könnte.' },
  ],
};

export const tryTasks = [
  { id: 'outline', label: 'Eine Gliederung aus fiktiven Stichworten entwerfen' },
  { id: 'rewrite', label: 'Einen öffentlichen Beispieltext verständlicher formulieren' },
  { id: 'questions', label: 'Fragen für ein fiktives Gespräch sammeln' },
  { id: 'custom', label: 'Eine andere unkritische Aufgabe selbst beschreiben' },
] as const;

export const improvementFocuses = [
  { id: 'accuracy', label: 'Fachliche Richtigkeit' },
  { id: 'sources', label: 'Quellen und Nachvollziehbarkeit' },
  { id: 'effort', label: 'Prüf- und Nachbearbeitungsaufwand' },
  { id: 'handoffs', label: 'Übergaben im Arbeitsprozess' },
  { id: 'decision', label: 'Menschliche Entscheidung und Verantwortung' },
] as const;
