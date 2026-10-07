'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ExperimentResponsibility, JourneyContextNotice } from '@/components/hub-ui/JourneyPatterns';
import { benefitOptions, defaultFocus, focusAreas, helpfulnessOptions, jobProfile, questionsForFocus, type DocumentId, type FocusId } from '@/data/recruiting';
import { DocumentPicker } from './DocumentPicker';
import { Preparation } from './Preparation';
import { QuestionCard, type QuestionState } from './QuestionCard';
import { ReportDialog } from './ReportDialog';
import './recruiting.css';
import '../hub-ui/hub-experiment.css';

type Screen = 'focus' | 'documents' | 'preparation' | 'questions' | 'review' | 'reflection' | 'complete';
const screenInfo: Record<Screen, { step: number; title: string; description: string }> = {
  focus: { step: 1, title: 'Was möchtest du im Interview besser verstehen?', description: 'Wähle die Themen, die du vertiefen möchtest. Daraus entsteht der Schwerpunkt deiner Fragen.' },
  documents: { step: 2, title: 'Welche Unterlagen möchtest du einbeziehen?', description: 'Sieh dir die Unterlagen an und entscheide, welche Quellen du für die Vorbereitung nutzen möchtest.' },
  preparation: { step: 3, title: 'Vorbereitung', description: 'Eine strukturierte Sicht auf deine Quellen. Prüfe die Textstellen und ordne offene Punkte selbst ein.' },
  questions: { step: 4, title: 'Vorgeschlagene Interviewfragen', description: 'Wähle passende Fragen aus. Passe die Formulierungen an deinen Gesprächskontext an oder prüfe eine Alternative.' },
  review: { step: 4, title: 'Deine Auswahl', description: 'Dein Interview, deine Fragen. Nimm dir einen Moment, um deine Auswahl bewusst zu prüfen.' },
  reflection: { step: 4, title: 'Wie hilfreich war die Unterstützung?', description: 'Auch wenn wenig hilfreich war: Deine Einordnung gehört zum Experiment.' },
  complete: { step: 4, title: 'Erfahrung gespeichert', description: 'Dein Feedback hilft dabei zu verstehen, wo AI im Recruiting sinnvoll unterstützt – und wo menschliche Einschätzung entscheidend bleibt.' },
};
function buildQuestions(focus: FocusId[]): QuestionState[] {
  return questionsForFocus(focus).map((question) => ({ ...question, text: question.variants[0], variant: 0 }));
}

export function RecruitingExperiment() {
  const [screen, setScreen] = useState<Screen>('focus');
  const [focus, setFocus] = useState<FocusId[]>([...defaultFocus]);
  const [documents, setDocuments] = useState<DocumentId[]>(['role', 'cv', 'letter']);
  const [questions, setQuestions] = useState<QuestionState[]>(() => buildQuestions([...defaultFocus]));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [reports, setReports] = useState<{ id: string; text: string; reason: string }[]>([]);
  const [reportId, setReportId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [helpfulness, setHelpfulness] = useState('');
  const [benefits, setBenefits] = useState<string[]>([]);
  const [reflection, setReflection] = useState('');
  const [shared, setShared] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const info = screenInfo[screen];
  const selectedQuestions = selectedIds.map((id) => questions.find((question) => question.id === id)!);
  const reportedQuestion = questions.find((question) => question.id === reportId);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [screen]);

  function go(next: Screen) { setAnnouncement(''); setScreen(next); }
  function toggleFocus(id: FocusId) {
    const next = focus.includes(id) ? focus.filter((item) => item !== id) : [...focus, id];
    setFocus(next); setQuestions(buildQuestions(next)); setSelectedIds([]);
  }
  function toggleDocument(id: DocumentId) {
    setDocuments((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setQuestions(buildQuestions(focus)); setSelectedIds([]);
  }
  function toggleSelection(id: string) {
    const exists = selectedIds.includes(id);
    setSelectedIds((current) => exists ? current.filter((item) => item !== id) : [...current, id]);
    setAnnouncement(exists ? 'Frage aus deiner Auswahl entfernt.' : 'Frage in deine Auswahl übernommen.');
  }
  function editQuestion(id: string, text: string) {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, text } : question));
    setAnnouncement('Formulierung angepasst.');
  }
  function alternative(id: string) {
    setQuestions((current) => current.map((question) => {
      if (question.id !== id) return question;
      const variant = (question.variant + 1) % question.variants.length;
      return { ...question, variant, text: question.variants[variant] };
    }));
    setSelectedIds((current) => current.filter((item) => item !== id));
    setAnnouncement('Alternative angezeigt. Bitte prüfe sie und übernimm sie bei Bedarf erneut.');
  }
  function moveQuestion(id: string, direction: -1 | 1) {
    const order = [...selectedIds];
    const index = order.indexOf(id);
    if (index + direction < 0 || index + direction >= order.length) return;
    [order[index], order[index + direction]] = [order[index + direction], order[index]];
    setSelectedIds(order);
    setAnnouncement(`Frage an Position ${index + direction + 1} verschoben.`);
  }

  const stageLabel = ['reflection', 'complete'].includes(screen) ? 'Nach der Vorbereitung' : `Schritt ${info.step} · ${['Interviewfokus', 'Demo-Unterlagen', 'Vorbereitung', 'Interviewfragen'][info.step - 1]}`;

  return <div className="page-container detail-page recruiting-experiment hub-experiment">
    <Link className="back-link" href="/use-cases/interview-vorbereiten">← Zum Use Case</Link>
    <div className="experiment-topline"><p className="eyebrow">RECRUITING · INTERVIEWVORBEREITUNG</p><span className="experiment-demo">Geführte Demo</span></div>
    {!['reflection', 'complete'].includes(screen) && <nav className="experiment-progress" aria-label="Fortschritt"><p>{info.step} von 4{screen === 'review' ? ' · Human Review' : ''}</p><ol>{['Interviewfokus', 'Demo-Unterlagen', 'Vorbereitung', 'Interviewfragen'].map((label, index) => <li key={label} aria-current={info.step === index + 1 ? 'step' : undefined} className={info.step > index + 1 ? 'step-complete' : ''}><span aria-hidden="true">{index + 1}</span>{label}</li>)}</ol></nav>}
    <header className="experiment-heading"><p className="hub-experiment-stage-label">{stageLabel}</p><h1 ref={heading} tabIndex={-1}>{info.title}</h1><p>{info.description}</p></header>
    <div className="r-announcement" role="status" aria-live="polite">{announcement}</div>

    <div className="hub-experiment-context-grid">
      <ExperimentResponsibility
        aiDescription="Strukturiert Demo-Unterlagen und bereitet mögliche Interviewfragen vor."
        humanDescription="Prüfst Relevanz und Fairness und verantwortest Beurteilung und Gesprächsführung."
      />
      <JourneyContextNotice
        title="Dieser Use Case verarbeitet Personendaten"
        description="Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. AI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung."
        href="/guidelines#4"
        linkLabel="Mehr zu Personendaten"
        icon={<span className="hub-icon-badge"><Icon name="shield" /></span>}
        variant="personal-data"
      />
    </div>

    <section className="hub-experiment-stage-panel" aria-label={info.title}>

    {screen === 'focus' && <>
      <div className="role-context"><span className="card-icon"><Icon name="interview" /></span><div><p className="eyebrow">DEINE DEMO-ROLLE</p><p>{jobProfile.title}</p></div></div>
      <fieldset className="r-fieldset"><legend>Interviewfokus wählen <span>· Mehrfachauswahl möglich</span></legend><div className="focus-grid">{focusAreas.map((item) => <label className="r-choice focus-choice" key={item.id}><input type="checkbox" checked={focus.includes(item.id)} onChange={() => toggleFocus(item.id)} /><span>{item.label}</span></label>)}</div></fieldset>
      <p className="local-note">Wenn du den Fokus später änderst, werden die Fragen neu zusammengestellt und deine bisherige Fragenauswahl zurückgesetzt.</p>
      <div className="step-actions"><span className="r-muted">{focus.length ? `${focus.length} Themen ausgewählt` : 'Wähle mindestens ein Thema aus.'}</span><button className="r-button r-primary" disabled={!focus.length} onClick={() => go('documents')}>Weiter<Icon name="arrow" /></button></div>
    </>}

    {screen === 'documents' && <>
      <p className="demo-material-note">Demo-Unterlagen – alle Personen und Inhalte in diesem Prototyp sind fiktiv.</p>
      <DocumentPicker selected={documents} onToggle={toggleDocument} />
      <p className="local-note">Vorgefertigte Demo-Auswertung, keine echte AI-Analyse. Eine geänderte Dokumentauswahl setzt die Fragen und deine bisherige Fragenauswahl zurück.</p>
      {!documents.length && <p className="r-validation" role="status">Wähle mindestens eine Demo-Unterlage aus.</p>}
      <div className="step-actions"><button className="r-button r-secondary" onClick={() => go('focus')}>Zurück</button><button className="r-button r-primary" disabled={!documents.length} onClick={() => go('preparation')}>Unterlagen analysieren<Icon name="arrow" /></button></div>
    </>}

    {screen === 'preparation' && <>
      <p className="demo-material-note">Fiktive Demo-Auswertung · Aussagen beziehen sich nur auf deine ausgewählten Quellen.</p>
      <Preparation documents={documents} />
      <div className="step-actions"><button className="r-button r-secondary" onClick={() => go('documents')}>Zurück</button><button className="r-button r-primary" onClick={() => go('questions')}>Interviewfragen entwickeln<Icon name="arrow" /></button></div>
    </>}

    {screen === 'questions' && <>
      <p className="focus-summary"><strong>Dein Fokus:</strong> {focusAreas.filter((item) => focus.includes(item.id)).map((item) => item.label).join(' · ')}</p>
      <p className="local-note">Vorgefertigte, offene Demo-Fragen – nach deinem Fokus geordnet und um ergänzende Perspektiven erweitert. Sie unterstellen keine Erfahrung, die aus den Unterlagen nicht hervorgeht.</p>
      <div className="question-list">{questions.map((question) => <QuestionCard key={question.id} question={question} selected={selectedIds.includes(question.id)} onSelect={() => toggleSelection(question.id)} onEdit={(text) => editQuestion(question.id, text)} onAlternative={() => alternative(question.id)} onReport={() => setReportId(question.id)} reported={reports.some((report) => report.id === question.id && report.text === question.text)} />)}</div>
      <div className="selection-summary"><strong>{selectedIds.length} {selectedIds.length === 1 ? 'Frage' : 'Fragen'} ausgewählt</strong><span>Übernimm nur Fragen, die du im Gespräch verwenden möchtest.</span></div>
      <div className="step-actions"><button className="r-button r-secondary" onClick={() => go('preparation')}>Zurück</button><button className="r-button r-primary" disabled={!selectedIds.length} onClick={() => go('review')}>Auswahl prüfen<Icon name="arrow" /></button></div>
    </>}

    {screen === 'review' && <>
      <aside className="review-reminder"><Icon name="shield" /><p>Prüfe Fragen immer auf Relevanz, Fairness und Kontext. AI-Vorschläge ersetzen keine professionelle Beurteilung.</p></aside>
      <div className="question-list">{selectedQuestions.map((question, index) => <QuestionCard key={question.id} question={question} selected review position={index} total={selectedIds.length} onSelect={() => toggleSelection(question.id)} onEdit={(text) => editQuestion(question.id, text)} onMove={(direction) => moveQuestion(question.id, direction)} />)}</div>
      {!selectedIds.length && <p className="r-validation" role="status">Deine Auswahl ist leer. Gehe zurück zu den Vorschlägen und übernimm mindestens eine Frage.</p>}
      <div className="step-actions"><button className="r-button r-secondary" onClick={() => go('questions')}>Zurück zu den Vorschlägen</button><button className="r-button r-primary" disabled={!selectedIds.length} onClick={() => go('reflection')}>Vorbereitung abschliessen<Icon name="arrow" /></button></div>
    </>}

    {screen === 'reflection' && <form className="reflection-form" onSubmit={(event) => {
      event.preventDefault();
      if (!helpfulness || !benefits.length) return;
      const submitter = (event.nativeEvent as SubmitEvent).submitter;
      setShared(submitter?.getAttribute('value') === 'share');
      go('complete');
    }}>
      <fieldset className="r-fieldset"><legend>Deine Einschätzung</legend><div className="reflection-options">{helpfulnessOptions.map((option) => <label className="r-choice" key={option}><input type="radio" name="helpfulness" checked={helpfulness === option} onChange={() => setHelpfulness(option)} required /><span>{option}</span></label>)}</div></fieldset>
      <fieldset className="r-fieldset"><legend>Wo lag der grösste Nutzen? <span>· Mehrfachauswahl möglich</span></legend><div className="focus-grid">{[...benefitOptions, 'Kein erkennbarer Nutzen'].map((option) => <label className="r-choice" key={option}><input type="checkbox" checked={benefits.includes(option)} onChange={() => setBenefits((current) => current.includes(option) ? current.filter((value) => value !== option) : option === 'Kein erkennbarer Nutzen' ? [option] : [...current.filter((value) => value !== 'Kein erkennbarer Nutzen'), option])} /><span>{option}</span></label>)}</div></fieldset>
      <div className="reflection-text"><label htmlFor="reflection">Wo war deine eigene Einschätzung besonders wichtig? <span>· Optional</span></label><textarea id="reflection" rows={4} maxLength={1000} placeholder="Zum Beispiel bei der Einordnung von Verantwortung …" value={reflection} onChange={(event) => setReflection(event.target.value)} /><p className="local-note">Bitte keine realen Personen- oder Unternehmensdaten eingeben.</p></div>
      <p className="local-note">Speichern und Teilen werden nur in dieser Ansicht demonstriert. Es wird nichts versendet oder dauerhaft gespeichert. Beim Neuladen gehen deine Eingaben verloren.</p>
      {(!helpfulness || !benefits.length) && <p className="r-muted">Wähle deine Einschätzung und mindestens einen Nutzen – oder «Kein erkennbarer Nutzen».</p>}
      <div className="reflection-actions"><button type="submit" name="action" value="save" className="r-button r-primary" disabled={!helpfulness || !benefits.length}>Erfahrung speichern</button><button type="submit" name="action" value="share" className="r-button r-secondary" disabled={!helpfulness || !benefits.length}>Mit anderen teilen</button><button type="button" className="r-text-button" onClick={() => go('review')}>Zurück zur Auswahl</button></div>
    </form>}

    {screen === 'complete' && <>
      <section className="completion-card"><span className="card-icon"><Icon name="book" /></span><div><h2>{shared ? 'Teilen in der Demo vorgemerkt' : 'Deine Reflexion im Überblick'}</h2><p className="local-note">Nur in dieser Sitzung sichtbar. {shared ? 'Es wurde kein Beitrag veröffentlicht und niemand benachrichtigt.' : 'Es wurde nichts dauerhaft gespeichert.'}</p><dl><dt>Deine Einschätzung</dt><dd>{helpfulness}</dd><dt>Grösster Nutzen</dt><dd>{benefits.join(' · ')}</dd>{reflection.trim() && <><dt>Deine eigene Einschätzung war wichtig bei</dt><dd>{reflection}</dd></>}</dl></div></section>
      <details className="completed-questions"><summary>Deine {selectedIds.length} Interviewfragen ansehen</summary><ol>{selectedQuestions.map((question) => <li key={question.id}>{question.text}</li>)}</ol></details>
      <div className="r-actions"><Link className="r-button r-primary" href="/use-cases">Zurück zu den Use Cases<Icon name="arrow" /></Link><button className="r-text-button" onClick={() => go('reflection')}>Reflexion bearbeiten</button></div>
    </>}
    </section>

    {reportedQuestion && <ReportDialog title={reportedQuestion.title} onClose={() => setReportId(null)} onSubmit={(reason) => { setReports((current) => [...current, { id: reportedQuestion.id, text: reportedQuestion.text, reason }]); setReportId(null); setAnnouncement('Danke. Kritisches Feedback hilft, AI-Unterstützung besser einzuordnen.'); }} />}
    <p className="experiment-footnote">Fiktive Demo · Keine echte AI-Verarbeitung · Deine Änderungen bleiben nur bis zum Neuladen oder Verlassen dieses Ablaufs erhalten.</p>
  </div>;
}
