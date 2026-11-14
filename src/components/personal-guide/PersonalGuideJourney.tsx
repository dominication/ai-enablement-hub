'use client';

import { useEffect, useRef, useState } from 'react';
import { ExperimentStageHeader, ExperimentStepper, ExperimentTopline } from '@/components/hub-ui/JourneyPatterns';
import { personalPaths, type PersonalGuideStage, type PersonalPathId } from '@/data/personal-guide';
import { buildPersonalDocument } from './personal-guide-results';
import { createInitialPersonalStages, createInitialPersonalStates, type PersonalGuideDocument, type PersonalGuideStates } from './personal-guide-state';
import { PersonalGuideOutput } from './PersonalGuideOutput';
import { PersonalGuidePath } from './PersonalGuidePath';
import '../hub-ui/hub-experiment.css';
import './personal-guide.css';

const steps = [
  { id: 'situation', label: 'Einordnen' },
  { id: 'offers', label: 'Angebote' },
  { id: 'takeaway', label: 'Mitnehmen' },
] as const;

export function PersonalGuideJourney() {
  const [activePath, setActivePath] = useState<PersonalPathId | null>(null);
  const [states, setStates] = useState<PersonalGuideStates>(createInitialPersonalStates);
  const [stages, setStages] = useState(createInitialPersonalStages);
  const [drafts, setDrafts] = useState<Partial<Record<PersonalPathId, PersonalGuideDocument>>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const activeStage = activePath ? stages[activePath] : null;
  const path = activePath ? personalPaths.find((item) => item.id === activePath) : null;

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [activePath, activeStage]);

  function updatePath<K extends PersonalPathId>(id: K, value: PersonalGuideStates[K]) {
    setStates((current) => ({ ...current, [id]: value }));
    setDrafts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function changeStage(stage: PersonalGuideStage) {
    if (!activePath) return;
    if (stage === 'takeaway') setDrafts((current) => current[activePath] ? current : { ...current, [activePath]: buildPersonalDocument(activePath, states) });
    setStages((current) => ({ ...current, [activePath]: stage }));
  }

  function resetCurrentPath() {
    if (!activePath) return;
    const initial = createInitialPersonalStates();
    updatePath(activePath, initial[activePath]);
    setStages((current) => ({ ...current, [activePath]: 'situation' }));
  }

  if (!activePath) return <div className="page-container personal-journey hub-experiment">
    <ExperimentTopline backHref="/guides/personal" backLabel="Zur Einstiegsseite" category="Guides · Persönlicher KI-Einstieg" context={<p>Fachlich kuratiert · keine KI-Auswertung</p>} />
    <ExperimentStageHeader stageLabel="DEINE SITUATION" title="Was beschäftigt dich gerade im Umgang mit KI?" description="Wähle den Einstieg, der im Moment zu dir passt. Es gibt keine Bewertung und kein Ziel, möglichst viel KI zu nutzen. Beim Wechsel bleiben deine Eingaben in dieser Sitzung erhalten." headingRef={heading} />
    <p className="personal-local-note"><strong>Nur lokale Sitzung:</strong> Nutze ausschliesslich fiktive oder allgemeine Beispiele. Freie Eingaben werden nicht ausgewertet, versendet oder gespeichert.</p>
    <section className="personal-topic-grid" aria-label="Sechs persönliche Einstiegspunkte">{personalPaths.map((item, index) => <button type="button" key={item.id} onClick={() => setActivePath(item.id)}><span className="personal-topic-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><small>{item.promise}</small><em>Mitnahme: {item.takeaway}</em></span></button>)}</section>
    <p className="experiment-footnote">Enterprise-Prototyp · Fiktive Inhalte · Keine KI-API, Analyse, Speicherung oder automatische Empfehlung.</p>
  </div>;

  const stage = stages[activePath];
  const stageIndex = steps.findIndex((item) => item.id === stage);
  const draft = drafts[activePath];
  const stageTitle = stage === 'situation' ? path!.title : stage === 'offers' ? 'Was könnte dir jetzt praktisch helfen?' : (draft?.title ?? 'Deine persönliche Arbeitshilfe');
  const stageDescription = stage === 'situation' ? path!.promise : stage === 'offers' ? 'Wähle nur, was für dich nützlich ist. Alle Angaben sind freiwillig; auch kein weiterer Schritt ist ein gültiges Ergebnis.' : 'Die Vorlage enthält nur deine Auswahlen und Eingaben. Du kannst sie vor dem Kopieren bearbeiten.';

  return <div className="page-container personal-journey hub-experiment">
    <ExperimentTopline backHref="/guides/personal" backLabel="Zur Einstiegsseite" category="Guides · Persönlicher KI-Einstieg" context={<p>Fiktive Beispiele · lokale Sitzung</p>} />
    <div className="personal-path-bar"><div><span>Aktives Anliegen</span><strong>{path!.title}</strong></div><button type="button" className="personal-text-button" onClick={() => setActivePath(null)}>Anderes Anliegen wählen</button></div>
    <ExperimentStepper currentIndex={stageIndex} statusLabel={`${steps[stageIndex].label} · ${stageIndex + 1} von 3 in diesem Guide`} ariaLabel="Fortschritt im persönlichen Guide" steps={steps.map((item) => ({ label: item.label, onSelect: () => changeStage(item.id) }))} />
    <ExperimentStageHeader stageLabel={steps[stageIndex].label} title={stageTitle} description={stageDescription} headingRef={heading} />
    <p className="personal-local-note"><strong>Nur lokal:</strong> Freie Eingaben werden nicht interpretiert, versendet oder gespeichert und gehen beim Neuladen oder Verlassen verloren.</p>
    {stage === 'takeaway' && draft ? <PersonalGuideOutput path={activePath} document={draft} onChange={(document) => setDrafts((current) => ({ ...current, [activePath]: document }))} onBack={() => changeStage('offers')} onTopics={() => setActivePath(null)} onReset={resetCurrentPath} /> : <section className="hub-experiment-stage-panel personal-guide-panel" aria-label={stageTitle}><PersonalGuidePath path={activePath} stage={stage} states={states} onChange={updatePath} /><div className="personal-guide-actions">{stage === 'offers' && <button type="button" className="hub-button hub-button-secondary" onClick={() => changeStage('situation')}>Zur Einordnung</button>}<button type="button" className="hub-button hub-button-primary" onClick={() => changeStage(stage === 'situation' ? 'offers' : 'takeaway')}>{stage === 'situation' ? 'Praktische Angebote ansehen' : 'Arbeitshilfe erstellen'}</button></div></section>}
    <p className="experiment-footnote">Fiktive Demo · Keine KI-API · Kein Score · Keine Persistenz oder automatische Datenübertragung.</p>
  </div>;
}
