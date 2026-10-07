'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ExperimentResponsibility, ExperimentStageHeader, ExperimentTopline, JourneyContextNotice } from '@/components/hub-ui/JourneyPatterns';
import { availableChanges, project, projectSources, type ProjectChange, type RiskLevel, type SourceId, type SourceReference } from '@/data/project';
import { createStatusDraft, type ChangeReview, type ChangeReviews, type StatusDraft, type StatusSectionId } from '@/data/project-status';
import { SourcePicker } from './SourcePicker';
import { SourceEvidence } from './SourceEvidence';
import { ChangeTimeline } from './ChangeTimeline';
import { ContextReview } from './ContextReview';
import { StatusDocument } from './StatusDocument';
import { WorkShift } from './WorkShift';
import { LearningPreview } from './LearningPreview';
import { ProjectReflection, type Reflection } from './ProjectReflection';
import './project.css';
import './project-workspace.css';
import '../hub-ui/hub-experiment.css';

type Stage = 'sources' | 'changes' | 'context' | 'status' | 'reflection' | 'preview' | 'complete';
const stages: { id: Stage; label: string; title: string; intro: string }[] = [
  { id: 'sources', label: 'Quellen', title: 'Welche Informationen möchtest du für den Status verwenden?', intro: 'Wähle deine Vergleichsbasis und die aktuellen Quellen. Du kannst jede Unterlage vorab einsehen.' },
  { id: 'changes', label: 'Veränderungen', title: 'Seit dem letzten Status hat sich Folgendes verändert', intro: 'Belegte Veränderungen aus deinen ausgewählten Quellen. Was bedeuten sie für dein Projekt?' },
  { id: 'context', label: 'Einordnung', title: 'Informationen werden durch deinen Kontext relevant.', intro: 'Prüfe Auswirkungen, Abhängigkeiten und Prioritäten. Du entscheidest, was in den Status gehört.' },
  { id: 'status', label: 'Status', title: 'Projektstatus – Entwurf', intro: 'Die Struktur steht. Prüfe den Inhalt, ergänze Kontext und bringe den Status in deine Sprache.' },
  { id: 'reflection', label: 'Reflexion', title: 'Was hat sich in deiner Arbeit verändert?', intro: 'Ein kurzer Blick zurück: Welche Arbeit wurde leichter und wo war dein Urteil gefragt?' },
  { id: 'preview', label: 'Learning-Vorschau', title: 'Vorschau deines Learnings', intro: 'Prüfe, wie deine Erfahrung für andere Teams formuliert sein könnte.' },
  { id: 'complete', label: 'Abschluss', title: 'Erfahrung gespeichert', intro: 'Dieses Demo-Learning wurde nur in dieser Sitzung gespeichert und nicht veröffentlicht. In einem realen AI Enablement Hub könnten solche Erfahrungen helfen, Use Cases und Guidelines gemeinsam weiterzuentwickeln.' },
];

export function ProjectWorkspace() {
  const [stage, setStage] = useState<Stage>('sources');
  const [furthest, setFurthest] = useState(0);
  const [sources, setSources] = useState<SourceId[]>(['previous', 'meeting', 'milestones', 'decisions']);
  const [risk, setRisk] = useState<RiskLevel | ''>('');
  const [context, setContext] = useState('');
  const [reviews, setReviews] = useState<ChangeReviews>({});
  const [draft, setDraft] = useState<StatusDraft | null>(null);
  const [removed, setRemoved] = useState<StatusSectionId[]>([]);
  const [dirty, setDirty] = useState(false);
  const [reflection, setReflection] = useState<Reflection>({ relief: '', judgement: [], nextTime: '' });
  const [evidence, setEvidence] = useState<{ title: string; references: SourceReference[] } | null>(null);
  const [message, setMessage] = useState('');
  const [reusePrompt, setReusePrompt] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const changes = availableChanges(sources);
  const current = stages.find((item) => item.id === stage)!;
  const hasIntegration = changes.some((change) => change.id === 'integration');
  const validSources = sources.includes('previous') && sources.some((source) => source !== 'previous');
  const canDraft = !hasIntegration || !!risk;
  const validDraft = draft?.some((section) => !removed.includes(section.id) && section.text.trim());

  useEffect(() => { heading.current?.focus({ preventScroll: true }); window.scrollTo(0, 0); }, [stage]);
  function go(next: Stage) {
    setStage(next); setMessage(''); setReusePrompt(false);
    setFurthest((value) => Math.max(value, stages.findIndex((item) => item.id === next)));
  }
  function toggleSource(id: SourceId) {
    setSources((selected) => selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
    setRisk(''); setContext(''); setReviews({}); setDraft(null); setRemoved([]); setDirty(false); setFurthest(0);
  }
  function revise(id: ProjectChange['id'], review: ChangeReview) { setReviews((value) => ({ ...value, [id]: review })); setDirty(true); }
  function makeDraft() {
    if (!canDraft) return;
    if (!draft || dirty) {
      const evaluated = { ...reviews };
      const integration = changes.find((change) => change.id === 'integration');
      if (integration && risk) evaluated.integration = { state: 'confirmed', wording: integration.title, context };
      setDraft(createStatusDraft(changes, evaluated, risk, context)); setRemoved([]); setDirty(false);
    }
    go('status');
  }
  function reuse() {
    setStage('sources'); setFurthest(0); setRisk(''); setContext(''); setReviews({}); setDraft(null); setRemoved([]); setDirty(false);
    setReflection({ relief: '', judgement: [], nextTime: '' }); setReusePrompt(false);
    setMessage('Neue Vorbereitung gestartet. Deine Quellenauswahl bleibt erhalten; Einordnung, Status und Reflexion sind zurückgesetzt. Es werden dieselben fiktiven Beispieldaten verwendet.');
  }
  const preview = (title: string, references: SourceReference[]) => setEvidence({ title, references });

  const stageLabel = `${stages.findIndex((item) => item.id === stage) < 4 ? `Schritt ${stages.findIndex((item) => item.id === stage) + 1}` : 'Nach dem Status'} · ${current.label}`;

  return <div className="pm-workspace page-container hf-workspace hub-experiment hub-project-experiment">
    <ExperimentTopline backHref="/use-cases/projektstatus-vorbereiten" backLabel="Zum Use Case" category="PROJEKTMANAGEMENT · PROJEKTSTATUS" context={<p className="pm-project-name">{project.name}</p>} />
    <header className="pm-project-header"><p>{project.description}</p><div className="pm-reporting-date"><span>Berichtsstand</span><strong>{project.period}</strong></div></header>
    <p className="pm-demo-note">Demo-Projekt – alle Inhalte und Projektdaten in diesem Prototyp sind fiktiv.</p>
    <nav className="pm-stage-nav hub-experiment-stepper" aria-label="Projektworkflow">{stages.slice(0, 4).map((item, index) => <button key={item.id} disabled={index > furthest || (item.id === 'status' && dirty)} aria-current={stage === item.id ? 'step' : undefined} onClick={() => go(item.id)}><span aria-hidden="true">0{index + 1}</span>{item.label}</button>)}</nav>
    <ExperimentStageHeader stageLabel={stageLabel} title={current.title} description={current.intro} headingRef={heading} className="pm-workspace-heading" />
    <div className="hub-experiment-context-grid">
      <ExperimentResponsibility aiDescription="Strukturiert ausgewählte Projektquellen und bereitet einen Statusentwurf vor." humanDescription="Ordnest Kontext und Risiken ein und verantwortest Freigabe und Kommunikation." />
      <JourneyContextNotice title="Projektinformationen bewusst verwenden" description="Verwende nur Informationen, die im freigegebenen AI-System verarbeitet werden dürfen. Prüfe sensible Inhalte vor der Nutzung." href="/guidelines" linkLabel="Guidelines ansehen" icon={<span className="hub-icon-badge"><Icon name="book" /></span>} variant="guideline" />
    </div>
    <div className="pm-workspace-grid"><aside className="pm-project-sidebar" aria-label="Projektübersicht"><section><h2>Projekt im Blick</h2><dl><dt>Pilotstart</dt><dd>{project.pilot}</dd><dt>Geplanter Go-live</dt><dd>{project.goLive}</dd></dl><h3>Workstreams</h3><ul>{project.workstreams.map((stream) => <li key={stream}>{stream}</li>)}</ul><details><summary>Beteiligte Rollen & Teams</summary><ul>{project.stakeholders.map((person) => <li key={person}>{person}</li>)}</ul></details></section><section><h2>Deine Quellen</h2><p className="pm-small">{sources.length} von 4 einbezogen</p><ul className="pm-sidebar-sources">{projectSources.filter((source) => sources.includes(source.id)).map((source) => <li key={source.id}><button className="pm-text-button" onClick={() => preview(source.title, source.entries.map((entry) => ({ sourceId: source.id, entryId: entry.id })))}><Icon name="book" />{source.title}</button></li>)}</ul>{stage !== 'sources' && <button className="pm-text-button" onClick={() => go('sources')}>Quellenauswahl bearbeiten</button>}</section><p className="pm-small">Demo-Auswertung auf Basis vorbereiteter Beispieldaten. Keine echte AI-Verarbeitung.</p></aside>
    <div className="pm-working-area hub-experiment-stage-panel">
      {message && <p role="status" className="pm-notice">{message}</p>}
      {stage === 'sources' && <><SourcePicker selected={sources} onToggle={toggleSource} onPreview={preview} /><p className="pm-small">Eine geänderte Quellenauswahl setzt Einordnung und Statusentwurf zurück. Der letzte Projektstatus ist die Vergleichsbasis; mindestens eine aktuelle Quelle ergänzt ihn.</p>{!validSources && <p className="pm-notice" role="status">Wähle den letzten Projektstatus und mindestens eine aktuelle Quelle aus.</p>}<div className="pm-footer-actions pm-align-end"><button className="pm-button pm-primary" disabled={!validSources} onClick={() => go('changes')}>Veränderungen erkennen<Icon name="arrow" /></button></div></>}
      {stage === 'changes' && <><p className="pm-small">Vergleich mit {project.previousPeriod} · {changes.length} belegte Hinweise{sources.length < 4 ? ' · Eingeschränkte Quellenauswahl' : ''}</p><ChangeTimeline changes={changes} sources={sources} onEvidence={preview} /><div className="pm-footer-actions"><button className="pm-button pm-secondary" onClick={() => go('sources')}>Quellen prüfen</button><button className="pm-button pm-primary" onClick={() => go('context')}>Veränderungen einordnen<Icon name="arrow" /></button></div></>}
      {stage === 'context' && <><ContextReview changes={changes} sources={sources} risk={risk} context={context} reviews={reviews} onRisk={(value) => { setRisk(value); setDirty(true); }} onContext={(value) => { setContext(value); setDirty(true); }} onReview={revise} onEvidence={preview} />{!canDraft && <p className="pm-notice">Ordne die Auswirkung der Terminverschiebung selbst ein, bevor du den Entwurf erstellst.</p>}{draft && dirty && <p className="pm-notice">Deine Einordnung hat sich geändert. «Statusentwurf erstellen» ersetzt den bisherigen Entwurf einschliesslich deiner Textänderungen durch einen neuen Entwurf.</p>}<div className="pm-footer-actions"><button className="pm-button pm-secondary" onClick={() => go('changes')}>Zurück zu den Veränderungen</button><button className="pm-button pm-primary" disabled={!canDraft} onClick={makeDraft}>{draft && !dirty ? 'Zum Statusentwurf' : 'Statusentwurf erstellen'}<Icon name="arrow" /></button></div></>}
      {stage === 'status' && draft && <><StatusDocument draft={draft} removed={removed} onEdit={(id, text) => setDraft((value) => value!.map((section) => section.id === id ? { ...section, text } : section))} onRemove={(id) => { setRemoved((value) => [...value, id]); setMessage('Abschnitt aus dem Entwurf entfernt. Du kannst ihn unten wiederherstellen.'); }} onRestore={(id) => { setRemoved((value) => value.filter((section) => section !== id)); setMessage('Abschnitt wiederhergestellt.'); }} /><WorkShift compact /><p className="pm-small">Mit dem Abschluss bestätigst du deine Prüfung dieses Demo-Entwurfs. Es wird kein Status versendet oder in einem Projektsystem gespeichert.</p>{!validDraft && <p className="pm-notice">Der Entwurf ist leer. Ergänze mindestens einen Abschnitt.</p>}<div className="pm-footer-actions"><button className="pm-button pm-secondary" onClick={() => go('context')}>Einordnung prüfen</button><button className="pm-button pm-primary" disabled={!validDraft} onClick={() => go('reflection')}>Status finalisieren<Icon name="arrow" /></button></div></>}
      {stage === 'reflection' && <><ProjectReflection value={reflection} onChange={setReflection} onReuse={() => setReusePrompt(true)} onShare={() => go('preview')} /><button className="pm-text-button" onClick={() => go('status')}>Zurück zum Status</button></>}
      {stage === 'preview' && <LearningPreview value={reflection} onConfirm={() => go('complete')} onBack={() => go('reflection')} />}
      {stage === 'complete' && <><section className="pm-completion"><p className="pm-notice">Nur in dieser Demo-Sitzung gespeichert. Dein Learning wurde nicht veröffentlicht oder an andere Personen gesendet.</p><dl><dt>Entlastung</dt><dd>{reflection.relief}</dd><dt>Deine Einschätzung war wichtig bei</dt><dd>{reflection.judgement.join(' · ')}</dd>{reflection.nextTime.trim() && <><dt>Beim nächsten Mal</dt><dd>{reflection.nextTime}</dd></>}</dl></section><div className="pm-footer-actions"><button className="pm-button pm-primary" onClick={() => setReusePrompt(true)}>Workflow wiederverwenden</button><Link className="pm-button pm-secondary" href="/use-cases">Zurück zu den Use Cases</Link></div><button className="pm-text-button" onClick={() => go('reflection')}>Reflexion bearbeiten</button></>}
      {reusePrompt && <section className="pm-reuse-confirmation" aria-labelledby="reuse-title"><h2 id="reuse-title">Neue Vorbereitung starten?</h2><p>Die Quellenauswahl bleibt erhalten. Einordnung, Status und Reflexion werden zurückgesetzt. Die Demo enthält keine neue Berichtsperiode.</p><div className="pm-inline-actions"><button className="pm-button pm-primary" onClick={reuse}>Neue Vorbereitung starten</button><button className="pm-button pm-secondary" onClick={() => setReusePrompt(false)}>Aktuelle Vorbereitung behalten</button></div></section>}
      <p className="pm-session-note">Nur lokale Demo-Sitzung · Beim Neuladen oder Verlassen dieser Arbeitsfläche gehen deine Eingaben verloren.</p>
    </div></div>
    {evidence && <SourceEvidence title={evidence.title} references={evidence.references} onClose={() => setEvidence(null)} />}
  </div>;
}
