'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ExperimentResponsibility, ExperimentStageHeader, ExperimentStepper, ExperimentTopline, JourneyContextNotice } from '@/components/hub-ui/JourneyPatterns';
import { defaultNextSteps, defaultReflection, demoTeam, desiredEffects, initialAssignments, leadershipRole, possibleSideEffects, teamActivities, teamRequirements, type Activity, type Assignment, type Discussion, type Outcome, type TeamReflection } from '@/data/team';
import { ActivityBoard } from './ActivityBoard';
import { FocusBoard } from './FocusBoard';
import { ResponsibilityBoard } from './ResponsibilityBoard';
import { ChoiceList, ExperimentEditor, ExperimentSummary, type Experiment } from './ExperimentCanvas';
import { TeamRetrospective } from './TeamRetrospective';
import { TeamLearningPreview } from './TeamLearningPreview';
import './team.css';
import '../hub-ui/hub-experiment.css';

type Stage = 'work' | 'focus' | 'mapping' | 'needs' | 'experiment' | 'summary' | 'prepared' | 'retro' | 'preview' | 'complete';
const stageInfo: Record<Stage, { group: number; title: string; intro: string }> = {
  work: { group: 0, title: 'Wo verlieren wir heute Zeit oder Energie?', intro: 'Startet bei konkreten Tätigkeiten aus eurem Arbeitsalltag – nicht bei möglichen KI-Funktionen.' },
  focus: { group: 1, title: 'Welche Aufgabe lohnt sich für ein Experiment?', intro: 'Besprecht eure Auswahl aus unterschiedlichen Perspektiven. Die vorbereiteten Einschätzungen sind Gesprächsanfänge, keine Bewertung des Teams.' },
  mapping: { group: 2, title: 'Welche Arbeit soll KI unterstützen – und was bleibt bei uns?', intro: 'Ordnet die Teilaufgaben gemeinsam zu. Die Zuordnung beschreibt Unterstützung, nicht die Abgabe von Verantwortung.' },
  needs: { group: 2, title: 'Was brauchen wir, damit wir das sinnvoll ausprobieren können?', intro: 'Unterschiedliche Voraussetzungen und Bedenken gehören zu einem Experiment dazu. Klärt sie, bevor ihr startet.' },
  experiment: { group: 3, title: 'Unser Experiment', intro: 'Beschreibt einen überschaubaren Versuch. Beobachtet gewünschte Wirkung und mögliche Nebenwirkungen gleich aufmerksam.' },
  summary: { group: 3, title: 'Euer Experiment auf einen Blick', intro: 'Prüft den Canvas gemeinsam. Er ist eine Vereinbarung für einen Versuch, keine Verpflichtung zur dauerhaften Nutzung.' },
  prepared: { group: 3, title: 'Experiment vorbereitet', intro: 'Im realen Einsatz würde das Team diesen Ansatz nun im vereinbarten Zeitraum testen. Für den Prototyp könnt ihr direkt eine vorbereitete Demo-Retrospektive ansehen.' },
  retro: { group: 4, title: 'Aus dem Versuch lernen', intro: 'Auch zusätzlicher Aufwand und Grenzen gehören zum Ergebnis. Entscheidet gemeinsam, wie es weitergeht.' },
  preview: { group: 4, title: 'Vorschau des Team-Learnings', intro: 'Prüft, was andere Teams aus dieser Erfahrung mitnehmen könnten.' },
  complete: { group: 4, title: 'Team Experiment abgeschlossen', intro: 'Das Demo-Learning wurde nur in dieser Sitzung gespeichert und nicht veröffentlicht. In einem realen AI Enablement Hub könnten solche Erfahrungen anderen Teams helfen, geeignete Experimente schneller einzuschätzen und wiederkehrende Hindernisse sichtbar zu machen.' },
};
const groups: { title: string; stage: Stage }[] = [{ title: 'Arbeit', stage: 'work' }, { title: 'Fokus', stage: 'focus' }, { title: 'Mensch & KI', stage: 'mapping' }, { title: 'Experiment', stage: 'experiment' }, { title: 'Retrospektive', stage: 'retro' }];
function newExperiment(activity: Activity): Experiment {
  return { hypothesis: activity.hypothesis, duration: '3 Wochen', effects: [desiredEffects[0], desiredEffects[4]], sideEffects: [possibleSideEffects[0], possibleSideEffects[1]] };
}
const toggle = (values: string[], value: string) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

export function TeamWorkshop() {
  const [stage, setStage] = useState<Stage>('work');
  const [custom, setCustom] = useState<Activity | null>(null);
  const [selected, setSelected] = useState(['status', 'cases']);
  const [focus, setFocus] = useState('');
  const [discussions, setDiscussions] = useState<Record<string, Discussion>>({});
  const [assignments, setAssignments] = useState<Record<string, Assignment>>({});
  const [needs, setNeeds] = useState([teamRequirements[0], teamRequirements[1], teamRequirements[3]]);
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [outcome, setOutcome] = useState<Outcome | ''>('');
  const [nextSteps, setNextSteps] = useState({ ...defaultNextSteps });
  const [reflection, setReflection] = useState<TeamReflection>({ work: '', ai: '', others: '' });
  const [notice, setNotice] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const activities = custom ? [...teamActivities, custom] : teamActivities;
  const activity = activities.find((item) => item.id === focus);
  const info = stageInfo[stage];
  const validExperiment = !!experiment && !!experiment.hypothesis.trim() && !!experiment.effects.length && !!experiment.sideEffects.length;

  useEffect(() => { heading.current?.focus({ preventScroll: true }); window.scrollTo(0, 0); }, [stage]);
  function go(next: Stage) {
    if (next !== 'work' && next !== 'focus' && (!activity || !experiment || !selected.includes(focus))) return;
    setStage(next); setNotice('');
  }
  function clearFocus() {
    setFocus(''); setAssignments({}); setExperiment(null); setOutcome('');
    setNextSteps({ ...defaultNextSteps }); setReflection({ work: '', ai: '', others: '' });
  }
  function toggleActivity(id: string) {
    setSelected((values) => toggle(values, id));
    if (id === focus) clearFocus();
  }
  function chooseFocus(id: string) {
    if (id === focus) return;
    const item = activities.find((entry) => entry.id === id);
    if (!item || !selected.includes(id)) return;
    setFocus(id); setAssignments(initialAssignments(item)); setExperiment(newExperiment(item)); setOutcome(''); setNextSteps({ ...defaultNextSteps });
    setReflection({ ...defaultReflection });
  }
  function updateCustom(item: Activity) { setCustom(item); setSelected((values) => values.includes('custom') ? values : [...values, 'custom']); setNotice('Der lokale Demo-Beitrag wurde übernommen. Er ist nur in dieser Sitzung sichtbar.'); }
  function restart() {
    setCustom(null); setSelected(['status', 'cases']); clearFocus(); setDiscussions({});
    setNeeds([teamRequirements[0], teamRequirements[1], teamRequirements[3]]); go('work');
  }
  return <div className="page-container tl-workshop hub-experiment hub-team-workshop">
    <ExperimentTopline backHref="/team-lab" backLabel="Zum Team Lab" category="TEAM LAB · GEMEINSAM ARBEIT GESTALTEN" context={<p>{demoTeam.name} · 45 Minuten Teamgespräch</p>} />
    <ExperimentStepper ariaLabel="Workshop-Phasen" currentIndex={info.group} steps={groups.map((group, index) => ({ label: group.title, disabled: index > info.group, onSelect: () => go(group.stage) }))} />
    <ExperimentStageHeader stageLabel={`Phase ${info.group + 1} von 5 · ${groups[info.group].title}`} title={info.title} description={info.intro} headingRef={heading} className="tl-stage-heading" />
    <div className="hub-experiment-context-grid">
      <ExperimentResponsibility aiLabel="KI kann unterstützen" humanLabel="Ihr entscheidet gemeinsam" aiDescription="Hilft, Material und Beobachtungen für das Experiment zu strukturieren." humanDescription="Wählt die Aufgabe, klärt Verantwortung und entscheidet über Weiterführen, Anpassen oder Stoppen." />
      <JourneyContextNotice title="Fiktive Team-Demo" description={`Demo-Team – alle Rollen, Beiträge und Inhalte sind fiktiv. ${demoTeam.situation} Ihr erkundet eine lokale Demo; es sind keine anderen Personen verbunden.`} icon={<span className="hub-icon-badge"><Icon name="team" /></span>} variant="guideline" />
    </div>
    {notice && <p className="tl-insight" role="status">{notice}</p>}
    {activity && stage !== 'work' && stage !== 'focus' && stage !== 'complete' && <p className="tl-focus-strip"><strong>Euer Fokus:</strong> {activity.title}</p>}
    <section className="hub-team-stage-panel hub-experiment-stage-panel" aria-label={info.title}>
    {stage === 'work' && <><ActivityBoard activities={activities} selected={selected} custom={custom} onToggle={toggleActivity} onCustom={updateCustom} /><p className="tl-small">Die Beiträge sind vorbereitete Perspektiven, keine Stimmen oder Live-Abstimmung. Wählt auch Tätigkeiten aus, bei denen ihr euch noch nicht einig seid.</p><div className="tl-actions"><span>{selected.length ? `${selected.length} Tätigkeiten für das Gespräch ausgewählt` : 'Wählt mindestens eine Tätigkeit aus.'}</span><button className="tl-button tl-primary" disabled={!selected.length} onClick={() => go('focus')}>Gemeinsam fokussieren<Icon name="arrow" /></button></div></>}
    {stage === 'focus' && <><FocusBoard activities={activities.filter((item) => selected.includes(item.id))} discussions={discussions} focus={focus} onDiscuss={(id, value) => setDiscussions((current) => ({ ...current, [id]: value }))} onFocus={chooseFocus} /><p className="tl-small">Eine andere Fokusaufgabe setzt Aufgabenaufteilung, Hypothese und Retrospektive auf passende Demo-Vorschläge zurück. Für andere Tätigkeiten wird eine allgemeine, anpassbare Strukturierungshypothese verwendet.</p><div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('work')}>Zurück zur Arbeit</button><button className="tl-button tl-primary" disabled={!selected.includes(focus)} onClick={() => go('mapping')}>Aufgabe gemeinsam untersuchen<Icon name="arrow" /></button></div></>}
    {stage === 'mapping' && activity && experiment && <><ResponsibilityBoard activity={activity} assignments={assignments} onChange={(id, value) => { setAssignments((current) => ({ ...current, [id]: value })); setNotice('Zuordnung aktualisiert. Die Verantwortung für Entscheidungen bleibt beim Team.'); }} /><div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('focus')}>Fokus prüfen</button><button className="tl-button tl-primary" onClick={() => go('needs')}>Voraussetzungen klären<Icon name="arrow" /></button></div></>}
    {stage === 'needs' && activity && experiment && <><div className="tl-needs-layout"><ChoiceList title="Was braucht unser Team?" options={teamRequirements} selected={needs} onChange={setNeeds} /><aside className="tl-leadership"><h2>Rolle der Teamleitung</h2><ul>{leadershipRole.map((item) => <li key={item}>{item}</li>)}</ul><p className="tl-small">Das Experiment gehört dem ganzen Team. Alle Perspektiven dürfen eingebracht werden.</p></aside></div>{needs.includes(teamRequirements[5]) && <p className="tl-insight">Ein Experiment braucht Raum zum Lernen. Neue Arbeitsweisen können zunächst auch zusätzlichen Aufwand erzeugen.</p>}<div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('mapping')}>Aufteilung prüfen</button><button className="tl-button tl-primary" onClick={() => go('experiment')}>Experiment gestalten<Icon name="arrow" /></button></div></>}
    {stage === 'experiment' && activity && experiment && <><ExperimentEditor activity={activity} value={experiment} onChange={setExperiment} />{!validExperiment && <p className="tl-insight">Formuliert eine Hypothese und wählt mindestens eine gewünschte Wirkung sowie eine mögliche Nebenwirkung.</p>}<div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('needs')}>Voraussetzungen prüfen</button><button className="tl-button tl-primary" disabled={!validExperiment} onClick={() => go('summary')}>Experiment vorbereiten<Icon name="arrow" /></button></div></>}
    {stage === 'summary' && activity && experiment && <><ExperimentSummary activity={activity} assignments={assignments} needs={needs} value={experiment} /><div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('experiment')}>Experiment bearbeiten</button><button className="tl-button tl-primary" onClick={() => go('prepared')}>Experiment starten<Icon name="arrow" /></button></div></>}
    {stage === 'prepared' && activity && experiment && <><p className="tl-insight">Es wurde kein realer Versuch gestartet und kein Zeitraum ist vergangen. Die nächste Ansicht enthält bewusst vorbereitete, gemischte Beobachtungen.</p><div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('experiment')}>Experiment bearbeiten</button><button className="tl-button tl-primary" onClick={() => go('retro')}>Demo-Retrospektive ansehen<Icon name="arrow" /></button></div></>}
    {stage === 'retro' && activity && experiment && <><TeamRetrospective outcome={outcome} nextSteps={nextSteps} reflection={reflection} onOutcome={setOutcome} onNextStep={(value) => { if (outcome) setNextSteps((current) => ({ ...current, [outcome]: value })); }} onReflection={setReflection} />{!outcome && <p className="tl-small">Trefft eine gemeinsame Entscheidung: Alle drei Ergebnisse sind legitim.</p>}<div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('summary')}>Experiment ansehen</button><button className="tl-button tl-primary" disabled={!outcome} onClick={() => go('preview')}>Learning teilen<Icon name="arrow" /></button></div></>}
    {stage === 'preview' && activity && experiment && outcome && <><TeamLearningPreview activityTitle={activity.title} outcome={outcome} nextStep={nextSteps[outcome]} reflection={reflection} /><div className="tl-actions"><button className="tl-button tl-secondary" onClick={() => go('retro')}>Zurück zur Retrospektive</button><button className="tl-button tl-primary" onClick={() => go('complete')}>Vorschau bestätigen<Icon name="arrow" /></button></div></>}
    {stage === 'complete' && <><p className="tl-insight">Weiterführen, Anpassen oder Stoppen: Jede bewusste Entscheidung trägt zum gemeinsamen Lernen bei.</p><div className="tl-completion-actions"><button className="tl-button tl-primary" onClick={restart}>Neues Team Experiment starten</button><Link className="tl-button tl-secondary" href="/community">Zur Community</Link><Link className="tl-text-button" href="/use-cases">Zurück zu den Use Cases</Link></div></>}
    </section>
    <p className="tl-session-note">Fiktive Demo · Nur aktueller Browserzustand · Beim Neuladen oder Verlassen gehen eure Eingaben verloren. Keine Veröffentlichung.</p>
  </div>;
}
