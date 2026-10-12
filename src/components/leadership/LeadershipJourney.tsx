'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ExperimentStageHeader, ExperimentStepper, ExperimentTopline } from '@/components/hub-ui/JourneyPatterns';
import {
  deepDiveQuestions,
  governanceRequirements,
  leadershipActions,
  leadershipOutcomes,
  leadershipScenario,
  leadershipStages,
  observationCriteria,
  participationOptions,
  retrospectiveObservations,
  supportOptions,
  teamPerspectives,
  type LeadershipActionId,
  type LeadershipOutcomeId,
  type ParticipationId,
  type ResponsibilityId,
  type SupportId,
} from '@/data/leadership';
import '../hub-ui/hub-experiment.css';
import './leadership.css';

type PlanKey = 'situation' | 'perspectives' | 'participation' | 'conditions' | 'next' | 'reflection';
type PlanSection = { key: PlanKey; title: string; value: string };

const requiredCriteria = observationCriteria.filter((item) => item.required).map((item) => item.id);
const responsibilityLabels: Record<ResponsibilityId, string> = {
  self: 'Das kann ich als Führungskraft selbst angehen.',
  alignment: 'Dafür brauche ich Abstimmung mit anderen Stellen.',
};

function toggle<T extends string>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function LeadershipJourney() {
  const [stage, setStage] = useState(0);
  const [maxVisited, setMaxVisited] = useState(0);
  const [actionId, setActionId] = useState<LeadershipActionId | ''>('');
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [perspectiveRevealed, setPerspectiveRevealed] = useState(false);
  const [participationId, setParticipationId] = useState<ParticipationId | ''>('');
  const [conversationQuestions, setConversationQuestions] = useState(['', '']);
  const [supportIds, setSupportIds] = useState<SupportId[]>([]);
  const [responsibilities, setResponsibilities] = useState<Partial<Record<SupportId, ResponsibilityId>>>({});
  const [criteriaIds, setCriteriaIds] = useState<string[]>(requiredCriteria);
  const [outcomeId, setOutcomeId] = useState<LeadershipOutcomeId | ''>('');
  const [feedback, setFeedback] = useState('');
  const [plan, setPlan] = useState<PlanSection[] | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);

  const info = leadershipStages[stage];
  const selectedAction = leadershipActions.find((item) => item.id === actionId);
  const selectedParticipation = participationOptions.find((item) => item.id === participationId);
  const selectedOutcome = leadershipOutcomes.find((item) => item.id === outcomeId);
  const canContinue = [
    Boolean(actionId),
    questionIds.length >= 2 && perspectiveRevealed,
    Boolean(participationId) && conversationQuestions.every((question) => question.trim()),
    supportIds.every((id) => responsibilities[id]),
    Boolean(outcomeId) && Boolean(feedback.trim()),
  ][stage];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [stage, plan]);

  function goTo(index: number) {
    if (index < 0 || index > maxVisited || index > 4) return;
    setPlan(null);
    setCopyStatus('');
    setStage(index);
  }

  function next() {
    if (!canContinue || stage === 4) return;
    const nextStage = stage + 1;
    setMaxVisited((current) => Math.max(current, nextStage));
    setStage(nextStage);
  }

  function selectParticipation(id: ParticipationId) {
    const option = participationOptions.find((item) => item.id === id);
    if (!option) return;
    setParticipationId(id);
    setConversationQuestions([...option.questions]);
  }

  function selectSupport(id: SupportId) {
    if (supportIds.includes(id)) {
      setSupportIds((current) => current.filter((item) => item !== id));
      setResponsibilities((current) => {
        const nextValues = { ...current };
        delete nextValues[id];
        return nextValues;
      });
      return;
    }
    if (supportIds.length < 2) setSupportIds((current) => [...current, id]);
  }

  function buildPlan(): PlanSection[] {
    if (!selectedAction || !selectedParticipation || !selectedOutcome) return [];
    const selectedQuestions = deepDiveQuestions.filter((question) => questionIds.includes(question.id)).map((question) => `– ${question.text}`).join('\n');
    const selectedSupports = supportOptions.filter((support) => supportIds.includes(support.id)).map((support) => `– ${support.label} ${responsibilities[support.id] ? responsibilityLabels[responsibilities[support.id]!] : ''}`.trim()).join('\n');
    const observations = observationCriteria.filter((criterion) => criteriaIds.includes(criterion.id)).map((criterion) => `– ${criterion.label}`).join('\n');
    return [
      { key: 'situation', title: '1. Ausgangslage und Klärungsbedarf', value: `${leadershipScenario.team}\n\nGewählte Handlungsrichtung: ${selectedAction.statement}\nKlärungsfrage: ${selectedAction.reflection}` },
      { key: 'perspectives', title: '2. Perspektiven und Fragen, die ich vertiefen möchte', value: selectedQuestions },
      { key: 'participation', title: '3. Geplantes Vorgehen zur Beteiligung', value: `${selectedParticipation.title}\nGesprächseinstieg: «${selectedParticipation.example}»\n\nMeine Gesprächsfragen:\n– ${conversationQuestions[0].trim()}\n– ${conversationQuestions[1].trim()}` },
      { key: 'conditions', title: '4. Notwendige Rahmenbedingungen und Abhängigkeiten', value: `Verbindliche Voraussetzungen:\n${governanceRequirements.map((item) => `– ${item}`).join('\n')}\n\nPriorisierte Unterstützung:\n${selectedSupports || '– Keine zusätzliche Unterstützung priorisiert.'}\n\nBeobachtungsperspektiven:\n${observations}` },
      { key: 'next', title: '5. Nächster konkreter Schritt', value: selectedAction.statement },
      { key: 'reflection', title: '6. Reflexion und Entscheidung: Weiterführen, Anpassen oder Stoppen', value: `${selectedOutcome.title}: ${selectedOutcome.description}\n\nMeine Rückmeldung an Team und Bereichsleitung:\n${feedback.trim()}` },
    ];
  }

  function showPlan() {
    if (!canContinue) return;
    setPlan(buildPlan());
    setCopyStatus('');
  }

  async function copyPlan() {
    if (!plan) return;
    const text = ['Mein Begleitplan – KI im Team', ...plan.flatMap((section) => ['', section.title, section.value])].join('\n');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      setCopyStatus('Begleitplan kopiert.');
    } catch {
      setCopyStatus('Kopieren war nicht möglich. Bitte markiere den Plan und kopiere ihn manuell.');
    }
  }

  function restart() {
    setStage(0); setMaxVisited(0); setActionId(''); setQuestionIds([]); setPerspectiveRevealed(false);
    setParticipationId(''); setConversationQuestions(['', '']); setSupportIds([]); setResponsibilities({});
    setCriteriaIds(requiredCriteria); setOutcomeId(''); setFeedback(''); setPlan(null); setCopyStatus('');
  }

  if (plan) return <div className="page-container leadership-journey hub-experiment">
    <ExperimentTopline backHref="/leadership" backLabel="Zur Einstiegsseite" category="Führung & Change · KI im Team begleiten" context={<p>Fiktiver Fall · lokal und nicht dauerhaft gespeichert</p>} />
    <header className="experiment-heading leadership-plan-heading"><p className="hub-experiment-stage-label">Abschluss</p><h1 ref={heading} tabIndex={-1}>Mein Begleitplan – KI im Team</h1><p>Der Plan spiegelt deine Entscheidungen wider. Du kannst jeden Abschnitt vor dem Kopieren bearbeiten.</p></header>
    <section className="hub-experiment-stage-panel leadership-plan" aria-label="Editierbarer Begleitplan">
      <p className="leadership-demo-note"><strong>Lokaler Entwurf:</strong> Nichts wird gespeichert, versendet oder veröffentlicht. Ergänze keine realen Personen- oder Unternehmensdaten.</p>
      {plan.map((section, index) => <label className="leadership-plan-section" key={section.key} htmlFor={`plan-${section.key}`}><span>{section.title}</span><textarea id={`plan-${section.key}`} rows={index === 3 ? 12 : 6} maxLength={5000} value={section.value} onChange={(event) => setPlan((current) => current?.map((item) => item.key === section.key ? { ...item, value: event.target.value } : item) ?? null)} /></label>)}
      <div className="leadership-plan-actions"><button type="button" className="hub-button hub-button-primary" onClick={copyPlan}><Icon name="book" />Begleitplan kopieren</button><button type="button" className="hub-button hub-button-secondary" onClick={() => { setPlan(null); setStage(4); }}>Zur Journey zurückkehren</button><button type="button" className="leadership-text-button" onClick={restart}>Journey neu starten</button></div>
      <p className="leadership-copy-status" role="status" aria-live="polite">{copyStatus}</p>
    </section>
    <aside className="leadership-team-lab"><div><h2>Eine konkrete Arbeitsaufgabe gemeinsam untersuchen?</h2><p>Im Team Lab könnt ihr als nächsten praktischen Schritt eine Aufgabe auswählen und ein begrenztes Team-Experiment vorbereiten.</p></div><Link className="hub-button hub-button-secondary" href="/team-lab">Zum Team Lab<Icon name="arrow" /></Link></aside>
    <p className="experiment-footnote">Fiktive Demo · Keine automatische Auswertung · Beim Neuladen oder Verlassen gehen alle Eingaben verloren.</p>
  </div>;

  return <div className="page-container leadership-journey hub-experiment">
    <ExperimentTopline backHref="/leadership" backLabel="Zur Einstiegsseite" category="Führung & Change · KI im Team begleiten" context={<p>Fiktives achtköpfiges Service-Team</p>} />
    <ExperimentStepper currentIndex={stage} statusLabel={`Phase ${stage + 1} von 5`} ariaLabel="Phasen der Führungskräfte-Journey" steps={leadershipStages.map((item, index) => ({ label: item.label, disabled: index > maxVisited, onSelect: () => goTo(index) }))} />
    <ExperimentStageHeader stageLabel={`Phase ${stage + 1} · ${info.label}`} title={info.title} description={info.description} headingRef={heading} />
    <p className="leadership-demo-note"><strong>Vorbereiteter fiktiver Fall:</strong> Alle Personen, Aussagen und Beobachtungen sind erfunden. Die Journey verarbeitet keine echten Teamdaten.</p>

    <section className="hub-experiment-stage-panel leadership-stage" aria-label={info.title}>
      {stage === 0 && <>
        <div className="leadership-scenario-grid"><article><p className="eyebrow hub-eyebrow">ERWARTUNG DER BEREICHSLEITUNG</p><blockquote>«{leadershipScenario.mandate}»</blockquote></article><article><p className="eyebrow hub-eyebrow">SITUATION DES TEAMS</p><p>{leadershipScenario.team}</p><ul>{leadershipScenario.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></article></div>
        <fieldset className="leadership-fieldset"><legend>Welche erste Handlungsrichtung wählst du?</legend><p className="leadership-fieldset-help">Keine Option ist allgemein richtig oder falsch. Betrachte mögliche Wirkungen, nicht garantierte Folgen.</p><div className="leadership-option-grid leadership-action-grid">{leadershipActions.map((action) => <label className="leadership-option" key={action.id}><span className="leadership-option-heading"><input type="radio" name="leadership-action" checked={actionId === action.id} onChange={() => setActionId(action.id)} /><strong>{action.title}</strong></span><span className="leadership-statement">{action.statement}</span><span className="leadership-effect"><b>Mögliche Chance</b>{action.chance}</span><span className="leadership-effect"><b>{action.limitLabel}</b>{action.limit}</span>{actionId === action.id && <span className="leadership-reflection"><b>Reflexion</b>{action.reflection}</span>}</label>)}</div></fieldset>
      </>}

      {stage === 1 && <>
        <div className="leadership-perspectives" aria-label="Vier fiktive Team-Perspektiven">{teamPerspectives.map((perspective) => <article key={perspective.role}><p className="eyebrow hub-eyebrow">{perspective.role}</p><blockquote>«{perspective.quote}»</blockquote></article>)}</div>
        <fieldset className="leadership-fieldset"><legend>Welche Fragen möchtest du vertiefen?</legend><p className="leadership-fieldset-help">Wähle mindestens zwei Fragen. Sie werden in deinen Begleitplan übernommen.</p><div className="leadership-question-list">{deepDiveQuestions.map((question) => <label key={question.id}><input type="checkbox" checked={questionIds.includes(question.id)} onChange={() => setQuestionIds((current) => toggle(current, question.id))} /><span>{question.text}</span></label>)}</div></fieldset>
        {!perspectiveRevealed ? <div className="leadership-perspective-action"><p>{questionIds.length >= 2 ? 'Du hast erste Fragen ausgewählt. Beziehe nun eine weitere Fallinformation ein.' : 'Wähle mindestens zwei Fragen, bevor du die neue Fallinformation einbeziehst.'}</p><button type="button" className="hub-button hub-button-secondary" disabled={questionIds.length < 2} onClick={() => setPerspectiveRevealed(true)}>Perspektivwechsel anzeigen</button></div> : <aside className="leadership-systemic-reflection"><p className="eyebrow hub-eyebrow">NEUE FALLINFORMATION</p><p>Aus einem früheren Rollout ist zusätzliche Kontrollarbeit im Team geblieben. Die damalige Einführung wurde zwar technisch abgeschlossen, die neue Aufgabenverteilung aber nie gemeinsam überprüft.</p><h2>Was wissen wir tatsächlich – und was vermuten wir nur?</h2><p>Eine kritische Haltung gegenüber einem neuen Tool kann auch mit früheren Erfahrungen, der aktuellen Arbeitsbelastung oder ungeklärter Verantwortung zusammenhängen. Das ist eine mögliche systemische Einordnung, keine psychologische Diagnose persönlicher Motive.</p></aside>}
      </>}

      {stage === 2 && <>
        <fieldset className="leadership-fieldset"><legend>Wähle ein Vorgehen für das Gespräch</legend><div className="leadership-option-grid">{participationOptions.map((option) => <label className="leadership-option" key={option.id}><span className="leadership-option-heading"><input type="radio" name="participation" checked={participationId === option.id} onChange={() => selectParticipation(option.id)} /><strong>{option.title}</strong></span><span className="leadership-example">«{option.example}»</span><span className="leadership-effect"><b>Mögliche Chance</b>{option.chance}</span><span className="leadership-effect"><b>Mögliches Risiko</b>{option.risk}</span></label>)}</div></fieldset>
        {selectedParticipation && <fieldset className="leadership-fieldset leadership-conversation-questions"><legend>Zwei Gesprächsfragen</legend><p className="leadership-fieldset-help">Die Vorschläge passen zu deinem Vorgehen. Übernimm sie oder formuliere sie direkt um.</p>{conversationQuestions.map((question, index) => <label key={index} htmlFor={`conversation-question-${index}`}><span>Gesprächsfrage {index + 1}</span><textarea id={`conversation-question-${index}`} rows={3} maxLength={500} value={question} onChange={(event) => setConversationQuestions((current) => current.map((item, questionIndex) => questionIndex === index ? event.target.value : item))} /></label>)}</fieldset>}
      </>}

      {stage === 3 && <>
        <fieldset className="leadership-fieldset leadership-governance"><legend>Verbindliche Voraussetzungen für einen echten Versuch</legend><p className="leadership-fieldset-help">Diese Punkte sind nicht optional und können in dieser Journey nicht abgewählt werden.</p>{governanceRequirements.map((requirement) => <label key={requirement}><input type="checkbox" checked readOnly disabled /><span>{requirement}</span></label>)}</fieldset>
        <fieldset className="leadership-fieldset"><legend>Unterstützung priorisieren</legend><p className="leadership-fieldset-help">Wähle maximal zwei Angebote. Du kannst auch bewusst keines priorisieren.</p><div className="leadership-support-list">{supportOptions.map((support) => { const selected = supportIds.includes(support.id); return <div className="leadership-support" key={support.id}><label><input type="checkbox" checked={selected} disabled={!selected && supportIds.length >= 2} onChange={() => selectSupport(support.id)} /><span>{support.label}</span></label>{selected && <fieldset><legend>Wie kann die Massnahme angegangen werden?</legend><label><input type="radio" name={`responsibility-${support.id}`} checked={responsibilities[support.id] === 'self'} onChange={() => setResponsibilities((current) => ({ ...current, [support.id]: 'self' }))} /><span>Ich kann selbst handeln.</span></label><label><input type="radio" name={`responsibility-${support.id}`} checked={responsibilities[support.id] === 'alignment'} onChange={() => setResponsibilities((current) => ({ ...current, [support.id]: 'alignment' }))} /><span>Ich brauche Abstimmung mit anderen Stellen.</span></label></fieldset>}</div>; })}</div></fieldset>
        <fieldset className="leadership-fieldset leadership-observations"><legend>Woran soll der begrenzte Versuch beurteilt werden?</legend><p className="leadership-fieldset-help">Qualität und zusätzlicher Kontrollaufwand bleiben verbindlich sichtbar. Weitere Perspektiven kannst du ergänzen.</p>{observationCriteria.map((criterion) => <label key={criterion.id}><input type="checkbox" checked={criteriaIds.includes(criterion.id)} disabled={criterion.required} onChange={() => setCriteriaIds((current) => toggle(current, criterion.id))} /><span>{criterion.label}{criterion.required && <small>verbindlich</small>}</span></label>)}</fieldset>
        <p className="leadership-inline-link">Für die detaillierte Untersuchung einer Arbeitsaufgabe kannst du anschliessend das <Link href="/team-lab">Team Lab</Link> nutzen. Diese Journey bildet dessen Funktionen nicht nach.</p>
      </>}

      {stage === 4 && <>
        <aside className="leadership-illustrative"><p className="eyebrow hub-eyebrow">AUSDRÜCKLICH VORBEREITETE, FIKTIVE RÜCKSCHAU</p><p>Diese Beobachtungen sind illustrativ. Sie stammen nicht aus einem real durchgeführten Experiment und wurden nicht aus deinen vorherigen Entscheidungen berechnet.</p><ul>{retrospectiveObservations.map((observation) => <li key={observation}>{observation}</li>)}</ul></aside>
        <fieldset className="leadership-fieldset"><legend>Wie würdest du mit diesen Beobachtungen weitergehen?</legend><p className="leadership-fieldset-help">Weiterführen, anpassen und stoppen haben die gleiche Wertigkeit. Jede bewusste Entscheidung kann zum Lernen beitragen.</p><div className="leadership-outcomes">{leadershipOutcomes.map((outcome) => <label className="leadership-option" key={outcome.id}><span className="leadership-option-heading"><input type="radio" name="outcome" checked={outcomeId === outcome.id} onChange={() => setOutcomeId(outcome.id)} /><strong>{outcome.title}</strong></span><span>{outcome.description}</span></label>)}</div></fieldset>
        <label className="leadership-feedback" htmlFor="leadership-feedback"><span>Was würde ich meinem Team und der Bereichsleitung aus diesen Erfahrungen zurückmelden?</span><textarea id="leadership-feedback" rows={5} maxLength={1500} value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Formuliere deine Rückmeldung ohne reale Personen- oder Unternehmensdaten …" /><small>Deine Formulierung fliesst unverändert in den Begleitplan ein.</small></label>
      </>}

      <div className="leadership-actions"><button type="button" className="hub-button hub-button-secondary" disabled={stage === 0} onClick={() => goTo(stage - 1)}>Zurück</button><div><span>{!canContinue && (stage === 1 ? 'Wähle mindestens zwei Fragen und öffne den Perspektivwechsel.' : stage === 3 ? 'Ordne jede ausgewählte Unterstützung zu.' : 'Vervollständige deine Auswahl, um fortzufahren.')}</span>{stage < 4 ? <button type="button" className="hub-button hub-button-primary" disabled={!canContinue} onClick={next}>Weiter<Icon name="arrow" /></button> : <button type="button" className="hub-button hub-button-primary" disabled={!canContinue} onClick={showPlan}>Begleitplan erstellen<Icon name="arrow" /></button>}</div></div>
    </section>
    <p className="experiment-footnote">Fiktive Demo · Kein KI-Dienst · Keine Speicherung, Analyse oder Veröffentlichung · Eingaben verfallen beim Neuladen oder Verlassen.</p>
  </div>;
}
