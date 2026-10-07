export type UseCaseOverviewContent = {
  support: string[];
  humanResponsibility: string[];
  steps: { title: string; description: string }[];
  considerations: string[];
  guidelinesLabel: string;
};

export const useCaseOverviews: Record<string, UseCaseOverviewContent> = {
  'interviewnotizen-strukturieren': {
    support: [
      'Notizen nach Themen wie Erfahrung, Zusammenarbeit und Motivation ordnen.',
      'Beobachtungen und wörtliche Aussagen getrennt darstellen, sofern sie in den Notizen erkennbar sind.',
      'Unklare Stellen und offene Rückfragen für das weitere Gespräch sammeln.',
    ],
    humanResponsibility: [
      'Prüfen, ob Aussagen korrekt wiedergegeben werden und im Gesprächskontext bleiben.',
      'Beobachtung, Interpretation und persönliche Annahmen auseinanderhalten.',
      'Eignung anhand vereinbarter Kriterien selbst beurteilen; KI bewertet oder rankt keine Kandidat:innen.',
    ],
    steps: [
      { title: 'Notizen und Zweck klären', description: 'Nutze zum Ausprobieren fiktive Notizen. Lege Themen fest und kennzeichne Zitate, Beobachtungen und eigene Fragen.' },
      { title: 'Nach Themen ordnen lassen', description: 'Bitte um eine Struktur mit Verweisen auf die Ausgangsnotizen. Fehlende Angaben sollen als offen erscheinen, ohne Vermutungen zur Person.' },
      { title: 'Mit den Notizen abgleichen', description: 'Prüfe jede Zuordnung und jede Aussage. Halte offene Punkte für die gemeinsame menschliche Beurteilung fest.' },
    ],
    considerations: [
      'Interviewnotizen enthalten Personendaten. Verwende reale Daten nur im dafür freigegebenen System und im abgestimmten Datenschutzrahmen.',
      'Übernimm keine erfundenen Eigenschaften oder Schlussfolgerungen über Persönlichkeit und Eignung.',
      'Auch geordnete Notizen können Vorurteile aus dem Gespräch enthalten. Prüfe Relevanz und faire Behandlung anhand der Rolle.',
    ],
    guidelinesLabel: 'Umgang mit Personendaten klären',
  },
  'projektrisiken-strukturieren': {
    support: [
      'Genannte Risiken und offene Punkte aus freigegebenen Projektunterlagen bündeln.',
      'Mögliche Abhängigkeiten zwischen Terminen, Lieferungen und Voraussetzungen sichtbar machen.',
      'Zu jedem Punkt die Quelle und fehlende Informationen für die Besprechung festhalten.',
    ],
    humanResponsibility: [
      'Prüfen, ob ein Hinweis tatsächlich ein Risiko oder bereits ein eingetretenes Problem beschreibt.',
      'Schweregrad, Auswirkungen und Priorität im Projektkontext beurteilen.',
      'Massnahmen, Verantwortlichkeiten und eine mögliche Eskalation im Projektteam entscheiden.',
    ],
    steps: [
      { title: 'Projektstand abgrenzen', description: 'Lege Stichtag, betrachteten Bereich und verwendete Unterlagen fest. Trenne bestätigte Informationen von Annahmen.' },
      { title: 'Risiken und Abhängigkeiten sammeln', description: 'Lass Hinweise nach Thema ordnen, jeweils mit Quelle und offenen Fragen. Fordere keine automatische Risikoeinstufung an.' },
      { title: 'Gemeinsam einordnen', description: 'Prüft die Hinweise im Team. Entscheidet über Bedeutung, Priorität und nächste Schritte und dokumentiert die Begründung.' },
    ],
    considerations: [
      'Veraltete Projektstände können scheinbare Widersprüche erzeugen. Quellen und Stichtage gehören zu jedem Hinweis.',
      'Eine sprachlich auffällige Passage ist nicht automatisch das wichtigste Risiko.',
      'Kläre die Freigabe für interne oder vertrauliche Projektinformationen vor der Nutzung.',
    ],
    guidelinesLabel: 'Freigabe von Projektinformationen prüfen',
  },
  'meeting-ergebnisse-aufbereiten': {
    support: [
      'Besprochene Themen aus den Notizen zu einer übersichtlichen Zusammenfassung ordnen.',
      'Explizit festgehaltene Entscheidungen von Vorschlägen und offenen Fragen trennen.',
      'Genannte Aufgaben, Zuständigkeiten und Termine zusammenstellen und Lücken markieren.',
    ],
    humanResponsibility: [
      'Mit den Beteiligten bestätigen, was tatsächlich entschieden wurde.',
      'Zuständigkeiten und Termine vereinbaren, statt sie aus unklaren Aussagen ableiten zu lassen.',
      'Prüfen, ob unterschiedliche Sichtweisen und wichtige Einwände erhalten bleiben.',
    ],
    steps: [
      { title: 'Notizen mit Kontext bereitstellen', description: 'Ergänze Anlass und Datum des Meetings. Kennzeichne bereits bestätigte Entscheidungen, soweit sie dokumentiert sind.' },
      { title: 'Ergebnisse und offene Punkte trennen', description: 'Bitte um getrennte Abschnitte für bestätigte Entscheidungen, Vorschläge und Aufgaben. Unklare Aussagen sollen Rückfragen bleiben.' },
      { title: 'Mit Beteiligten abstimmen', description: 'Prüfe die Zusammenfassung anhand der Notizen und lasse strittige Punkte klären, bevor du das Ergebnis weitergibst.' },
    ],
    considerations: [
      'KI weiss nicht automatisch, ob ein Diskussionspunkt eine endgültige Entscheidung ist.',
      'Fehlende Namen oder Termine bleiben offen; sie dürfen nicht ergänzt werden, nur damit die Liste vollständig wirkt.',
      'Teile nur Notizen, deren Vertraulichkeit und Freigabe zum verwendeten System passen.',
    ],
    guidelinesLabel: 'Interne Meetinginformationen sicher verwenden',
  },
  'workshop-vorbereiten': {
    support: [
      'Arbeitsauftrag, Ziel und offene Fragen in eine nachvollziehbare Struktur bringen.',
      'Leitfragen und mögliche Arbeitsphasen für den Workshop vorschlagen.',
      'Alternative Abläufe mit Pausen und Zeit für unterschiedliche Perspektiven entwerfen.',
    ],
    humanResponsibility: [
      'Mit den Auftraggebenden klären, welche Ergebnisse realistisch und welche Fragen noch offen sind.',
      'Methoden an die Teilnehmenden, ihre Zusammenarbeit und mögliche Spannungen anpassen.',
      'Moderation, Gruppendynamik und Entscheidungen im Workshop verantworten.',
    ],
    steps: [
      { title: 'Auftrag und Rahmen klären', description: 'Beschreibe Ziel, verfügbare Zeit, Gruppengrösse und benötigte Ergebnisse. Personenbezogene Details sind dafür meist nicht nötig.' },
      { title: 'Ablaufvarianten entwerfen', description: 'Lass zwei mögliche Abläufe mit Leitfragen und Zeitaufteilung vorschlagen. Plane Raum für Rückfragen und abweichende Sichtweisen ein.' },
      { title: 'Ablauf an die Gruppe anpassen', description: 'Prüfe Machbarkeit und Beteiligungsmöglichkeiten. Entscheide selbst über Methoden und halte Anpassungen während der Moderation offen.' },
    ],
    considerations: [
      'Eine stimmige Agenda ersetzt keine Kenntnis der Gruppe. Konflikte oder ungleiche Beteiligung brauchen menschliche Aufmerksamkeit.',
      'Kennzeichne, ob eine Phase Ideen sammelt, Optionen prüft oder eine Entscheidung vorbereitet.',
      'Beschreibe sensible Situationen möglichst ohne identifizierbare Personen und beachte die Freigabe des Arbeitsauftrags.',
    ],
    guidelinesLabel: 'Arbeitsaufträge und interne Informationen einordnen',
  },
  'komplexe-inhalte-verstaendlich-machen': {
    support: [
      'Fachinformationen nach den Fragen einer bestimmten Zielgruppe gliedern.',
      'Lange Sätze verständlicher formulieren und Fachbegriffe erläutern.',
      'Alternative Erklärungen oder Beispiele auf Grundlage des Ausgangstexts vorschlagen.',
    ],
    humanResponsibility: [
      'Fachliche Aussagen, Einschränkungen und Unsicherheit im vereinfachten Text erhalten.',
      'Prüfen, ob ein Beispiel die Aussage korrekt erklärt oder unbeabsichtigt verändert.',
      'Sprache, Detailtiefe und Zweck mit den Bedürfnissen der Zielgruppe abgleichen.',
    ],
    steps: [
      { title: 'Zielgruppe und Kernaussage festlegen', description: 'Stelle den Ausgangstext bereit und beschreibe Vorwissen und Informationsbedarf. Markiere Aussagen und Einschränkungen, die erhalten bleiben müssen.' },
      { title: 'Verständliche Fassung entwerfen', description: 'Bitte um eine klarere Gliederung und kurze Erläuterungen. Lass unklare Fachstellen als Fragen markieren, statt sie erraten zu lassen.' },
      { title: 'Bedeutung mit dem Original vergleichen', description: 'Prüfe Zahlen, Bedingungen und Unsicherheiten Satz für Satz. Hole bei Bedarf fachliche Rückmeldung oder Feedback aus der Zielgruppe ein.' },
    ],
    considerations: [
      'Vereinfachung darf wichtige Bedeutung, Bedingungen oder Unsicherheit nicht stillschweigend entfernen.',
      'Erfundene Beispiele können falsche Erwartungen wecken. Nutze nur fachlich passende und geprüfte Beispiele.',
      'Auch verständlich umformulierte interne Inhalte bleiben intern, solange keine andere Freigabe vorliegt.',
    ],
    guidelinesLabel: 'Informationskontext vor dem Weitergeben prüfen',
  },
  'praesentation-strukturieren': {
    support: [
      'Vorhandene Inhalte entlang einer nachvollziehbaren Storyline ordnen.',
      'Eine Gliederung mit Kernbotschaft und benötigten Belegen je Abschnitt vorschlagen.',
      'Alternative Reihenfolgen oder Übergänge für unterschiedliche Zielgruppen entwerfen.',
    ],
    humanResponsibility: [
      'Botschaft, Zweck und angemessene Schlussfolgerungen selbst festlegen.',
      'Belege und Zahlen prüfen und erkennbare Lücken vor der Präsentation klären.',
      'Entscheiden, welche Perspektiven und Einwände das Publikum verstehen muss.',
    ],
    steps: [
      { title: 'Material und Publikum eingrenzen', description: 'Sammle freigegebene Informationen und benenne Zielgruppe, Anlass und verfügbare Präsentationszeit.' },
      { title: 'Storyline mit Belegen entwerfen', description: 'Bitte um eine Gliederung mit Aussage, vorhandener Quelle und offenen Fragen pro Abschnitt. Neue Fakten sollen nicht ergänzt werden.' },
      { title: 'Argumentation überprüfen', description: 'Prüfe, ob die Reihenfolge verständlich ist und die Belege die Aussagen tragen. Passe Gewichtung und Schlussfolgerungen selbst an.' },
    ],
    considerations: [
      'Eine überzeugende Reihenfolge macht aus einer Annahme noch keinen belegten Sachverhalt.',
      'Erhalte Gegenargumente und Unsicherheiten, wenn sie für die Botschaft relevant sind.',
      'Prüfe vor der Weitergabe, ob alle Inhalte für dieses Publikum freigegeben sind.',
    ],
    guidelinesLabel: 'Freigaben für Präsentationsinhalte klären',
  },
  'dokumente-vergleichen': {
    support: [
      'Gemeinsamkeiten und Unterschiede entlang vorgegebener Themen gegenüberstellen.',
      'Veränderte Formulierungen und mögliche Widersprüche mit Fundstellen sammeln.',
      'Offene Fragen zu fehlenden Passagen, unterschiedlichen Versionen oder Begriffen festhalten.',
    ],
    humanResponsibility: [
      'Fundstellen in den Originalen nachlesen und prüfen, ob der Vergleich vollständig genug ist.',
      'Beurteilen, ob eine sprachliche Änderung auch eine inhaltliche Bedeutung hat.',
      'Klären, welche Version massgeblich ist und welche Unterschiede weitere Prüfung benötigen.',
    ],
    steps: [
      { title: 'Vergleichsrahmen festlegen', description: 'Benenne Dokumente, Versionen und die Fragen, die der Vergleich beantworten soll. Gib eindeutige Quellenbezeichnungen vor.' },
      { title: 'Gegenüberstellung erstellen lassen', description: 'Bitte um Unterschiede und Gemeinsamkeiten mit Abschnitts- oder Seitenverweisen. Nicht auffindbare Angaben sollen als offen markiert werden.' },
      { title: 'Fundstellen im Original prüfen', description: 'Lies relevante Passagen selbst nach. Ergänze fehlenden Kontext und halte fest, welche Unterschiede fachlich bedeutsam sind.' },
    ],
    considerations: [
      'KI kann Tabellen, Fussnoten oder Ausnahmen übersehen. Eine Gegenüberstellung garantiert kein vollständiges Dokumentverständnis.',
      'Quellenverweise müssen stimmen; prüfe sie direkt in den Originaldokumenten.',
      'Vergleiche nur Dokumente, die im gewählten System verwendet werden dürfen. Unterschiedliche Vertraulichkeit bleibt auch im Vergleich relevant.',
    ],
    guidelinesLabel: 'Dokumente nach Informationskategorie einordnen',
  },
  'recherche-strukturieren': {
    support: [
      'Bereits ausgewählte Quellen nach Themen und Recherchefragen ordnen.',
      'Kernaussagen mit zugehöriger Quelle, Datum und offenem Prüfbedarf zusammenfassen.',
      'Widersprüche und Wissenslücken für die weitere Recherche sichtbar machen.',
    ],
    humanResponsibility: [
      'Quellen selbst auswählen und ihre Herkunft, Aktualität und Qualität beurteilen.',
      'Zentrale Aussagen in den Originalquellen überprüfen und Widersprüche einordnen.',
      'Entscheiden, welche zusätzlichen Perspektiven oder Belege noch fehlen.',
    ],
    steps: [
      { title: 'Recherchefrage und Quellen sammeln', description: 'Formuliere die Frage und stelle nachvollziehbare Quellen mit Titel, Datum und Fundstelle zusammen. Die Auswahl bestimmt, welche Perspektiven sichtbar werden.' },
      { title: 'Aussagen nach Themen verdichten', description: 'Lass Aussagen mit ihren Quellen zuordnen. Bitte darum, Unklarheiten und widersprüchliche Angaben sichtbar zu lassen und fehlende Belege nicht zu erfinden.' },
      { title: 'Belege prüfen und weiterrecherchieren', description: 'Öffne die Originalquellen und prüfe wichtige Aussagen. Ergänze fehlende Perspektiven und dokumentiere, welche Fragen offen bleiben.' },
    ],
    considerations: [
      'KI-Zusammenfassungen sind keine Belege. Quellen müssen sichtbar, auffindbar und überprüfbar bleiben.',
      'Eine übereinstimmende Aussage in mehreren Texten kann auf derselben ursprünglichen Quelle beruhen.',
      'Prüfe Aktualität, Interessen der Herausgebenden und Nutzungsrechte; öffentlich zugänglich bedeutet nicht uneingeschränkt nutzbar.',
    ],
    guidelinesLabel: 'Quellen und öffentlich zugängliche Informationen prüfen',
  },
  'entscheidungsoptionen-strukturieren': {
    support: [
      'Vorliegende Handlungsoptionen anhand gemeinsam festgelegter Fragen gegenüberstellen.',
      'Argumente, mögliche Auswirkungen und Annahmen je Option ordnen.',
      'Fehlende Informationen und unterschiedliche Perspektiven für die Diskussion sichtbar machen.',
    ],
    humanResponsibility: [
      'Relevante Kriterien und betroffene Perspektiven gemeinsam festlegen.',
      'Zielkonflikte, Unsicherheiten und Auswirkungen auf Beteiligte beurteilen.',
      'Die Entscheidung selbst treffen, begründen und die Verantwortung dafür übernehmen.',
    ],
    steps: [
      { title: 'Optionen und Entscheidungsrahmen klären', description: 'Beschreibe die verfügbaren Optionen, Grenzen und offenen Fragen. Vereinbare, wer entscheidet und welche Perspektiven einbezogen werden.' },
      { title: 'Argumente vergleichbar ordnen', description: 'Bitte um dieselbe Struktur für jede Option: Argumente, Auswirkungen, Annahmen und offene Fragen. Verzichte auf Punktwerte und Rangfolgen.' },
      { title: 'Abwägen und selbst entscheiden', description: 'Prüft Belege und Zielkonflikte gemeinsam. Klärt Informationslücken und dokumentiert die menschliche Entscheidung samt Begründung.' },
    ],
    considerations: [
      'KI organisiert Perspektiven, trifft aber keine Entscheidung und bestimmt keine beste Option.',
      'Eine längere Argumenteliste bedeutet nicht, dass eine Option besser ist. Anzahl und Formulierung ersetzen keine Abwägung.',
      'Haltet Annahmen sichtbar und prüft, ob wichtige Betroffene oder Auswirkungen in der Gegenüberstellung fehlen.',
    ],
    guidelinesLabel: 'Verantwortung und Informationskontext klären',
  },
};
