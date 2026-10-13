'use client';

import { useEffect, useRef, useState } from 'react';
import { ExperimentStageHeader, ExperimentStepper, ExperimentTopline } from '@/components/hub-ui/JourneyPatterns';
import { buildGuideDocument } from './guide-results';
import { createInitialGuideStages, createInitialGuideStates, type GuideDocument, type GuideStates } from './guide-state';
import { CapacityPath } from './paths/CapacityPath';
import { GovernancePath } from './paths/GovernancePath';
import { OrientationPath } from './paths/OrientationPath';
import { OtherPath } from './paths/OtherPath';
import { PerspectivesPath } from './paths/PerspectivesPath';
import { UncertaintyPath } from './paths/UncertaintyPath';
import { UseCasesPath } from './paths/UseCasesPath';
import { GuideOutput } from './GuideOutput';
import { guidePaths, leadershipFrame, type GuidePathId, type GuideStage } from '@/data/leadership';
import '../hub-ui/hub-experiment.css';
import './leadership.css';

const standardSteps = [
  { id: 'orientation', label: 'Orientierung' },
  { id: 'support', label: 'Unterstützung' },
  { id: 'takeaway', label: 'Mitnehmen' },
] as const;

const otherSteps = [
  { id: 'orientation', label: 'Notiz' },
  { id: 'support', label: 'Sortieren' },
  { id: 'takeaway', label: 'Mitnehmen' },
] as const;

export function LeadershipJourney() {
  const [activePath, setActivePath] = useState<GuidePathId | null>(null);
  const [states, setStates] = useState<GuideStates>(createInitialGuideStates);
  const [stages, setStages] = useState(createInitialGuideStages);
  const [drafts, setDrafts] = useState<Partial<Record<GuidePathId, GuideDocument>>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const activeStage = activePath ? stages[activePath] : null;
  const path = activePath ? guidePaths.find((item) => item.id === activePath) : null;

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [activePath, activeStage]);

  function selectPath(id: GuidePathId) {
    setActivePath(id);
  }

  function updatePath<K extends GuidePathId>(id: K, value: GuideStates[K]) {
    setStates((current) => ({ ...current, [id]: value }));
    setDrafts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function changeStage(stage: GuideStage) {
    if (!activePath) return;
    if (stage === 'takeaway') {
      setDrafts((current) => current[activePath] ? current : { ...current, [activePath]: buildGuideDocument(activePath, states) });
    }
    setStages((current) => ({ ...current, [activePath]: stage }));
  }

  function resetCurrentPath() {
    if (!activePath) return;
    const initial = createInitialGuideStates();
    updatePath(activePath, initial[activePath]);
    setStages((current) => ({ ...current, [activePath]: 'orientation' }));
  }

  function renderPathContent(id: GuidePathId, stage: GuideStage) {
    switch (id) {
      case 'uncertainty': return <UncertaintyPath stage={stage} state={states.uncertainty} onChange={(value) => updatePath('uncertainty', value)} />;
      case 'use-cases': return <UseCasesPath stage={stage} state={states['use-cases']} onChange={(value) => updatePath('use-cases', value)} />;
      case 'perspectives': return <PerspectivesPath stage={stage} state={states.perspectives} onChange={(value) => updatePath('perspectives', value)} />;
      case 'capacity': return <CapacityPath stage={stage} state={states.capacity} onChange={(value) => updatePath('capacity', value)} />;
      case 'governance': return <GovernancePath stage={stage} state={states.governance} onChange={(value) => updatePath('governance', value)} />;
      case 'orientation': return <OrientationPath stage={stage} state={states.orientation} onChange={(value) => updatePath('orientation', value)} />;
      case 'other': return <OtherPath stage={stage} state={states.other} onChange={(value) => updatePath('other', value)} onChoosePath={selectPath} />;
    }
  }

  if (!activePath) return <div className="page-container leadership-journey hub-experiment">
    <ExperimentTopline backHref="/leadership" backLabel="Zur Einstiegsseite" category="Führung & Change · KI im Team begleiten" context={<p>Fachlich kuratierter Guide · keine KI-Auswertung</p>} />
    <ExperimentStageHeader stageLabel="DEIN ANLIEGEN" title="Was beschäftigt dich gerade bei der KI-Einführung in deinem Team?" description="Wähle den Weg, der zu deiner Situation passt. Du kannst jederzeit wechseln; deine Eingaben bleiben während dieser Sitzung erhalten." headingRef={heading} />
    <p className="leadership-demo-note"><strong>Fiktiver Rahmen:</strong> {leadershipFrame} Verwende in freiwilligen Notizen keine vertraulichen Unternehmens- oder Personendaten.</p>
    <section className="leadership-topic-grid" aria-label="Sieben Einstiegspunkte">{guidePaths.map((item, index) => <button type="button" key={item.id} onClick={() => selectPath(item.id)}><span className="leadership-topic-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><small>{item.promise}</small><em>Mitnahme: {item.takeaway}</em></span></button>)}</section>
    <p className="experiment-footnote">Enterprise-Prototyp · Fiktive Inhalte · Keine KI-API, Analyse, Speicherung oder automatische Veröffentlichung.</p>
  </div>;

  const stage = stages[activePath];
  const steps = activePath === 'other' ? otherSteps : standardSteps;
  const stageIndex = steps.findIndex((item) => item.id === stage);
  const draft = drafts[activePath];
  const stageTitle = stage === 'orientation' ? path!.title : stage === 'support' ? 'Was könnte dir jetzt helfen?' : (draft?.title ?? 'Deine Mitnahme');
  const stageDescription = stage === 'orientation' ? path!.promise : stage === 'support' ? 'Wähle nur die Hilfen, die für deine Situation nützlich sind. Du kannst jederzeit abkürzen oder das Thema wechseln.' : 'Die Vorlage spiegelt nur deine tatsächlichen Auswahlen und Eingaben. Du kannst sie vor dem Kopieren bearbeiten.';

  return <div className="page-container leadership-journey hub-experiment">
    <ExperimentTopline backHref="/leadership" backLabel="Zur Einstiegsseite" category="Führung & Change · KI im Team begleiten" context={<p>Fiktiver Rahmen · lokale Sitzung</p>} />
    <div className="leadership-path-bar"><div><span>Aktives Anliegen</span><strong>{path!.title}</strong></div><button type="button" className="leadership-text-button" onClick={() => setActivePath(null)}>Anderes Anliegen wählen</button></div>
    <ExperimentStepper currentIndex={stageIndex} statusLabel={`${steps[stageIndex].label} · ${stageIndex + 1} von 3 in diesem Guide`} ariaLabel="Fortschritt im gewählten Guide" steps={steps.map((item) => ({ label: item.label, onSelect: () => changeStage(item.id) }))} />
    <ExperimentStageHeader stageLabel={steps[stageIndex].label} title={stageTitle} description={stageDescription} headingRef={heading} />
    <p className="leadership-demo-note"><strong>Nur lokale Sitzung:</strong> Eingaben werden nicht ausgewertet, versendet oder gespeichert und gehen beim Neuladen oder Verlassen verloren.</p>
    {stage === 'takeaway' && draft ? <GuideOutput path={activePath} document={draft} onChange={(document) => setDrafts((current) => ({ ...current, [activePath]: document }))} onBack={() => changeStage('support')} onTopics={() => setActivePath(null)} onReset={resetCurrentPath} /> : <section className="hub-experiment-stage-panel leadership-guide-panel" aria-label={stageTitle}>{renderPathContent(activePath, stage)}<div className="leadership-guide-actions">{stage === 'support' && <button type="button" className="hub-button hub-button-secondary" onClick={() => changeStage('orientation')}>Zur Orientierung</button>}<div>{stage === 'orientation' && <button type="button" className="hub-button hub-button-secondary" onClick={() => changeStage('takeaway')}>Direkt mitnehmen</button>}<button type="button" className="hub-button hub-button-primary" onClick={() => changeStage(stage === 'orientation' ? 'support' : 'takeaway')}>{stage === 'orientation' ? 'Unterstützung ansehen' : 'Mitnahme erstellen'}</button></div></div></section>}
    <p className="experiment-footnote">Fiktive Demo · Keine KI-API · Keine Freigabe · Keine Persistenz oder automatische Datenübertragung.</p>
  </div>;
}
