import Link from 'next/link';
import { governanceChecks, governanceTopics, type GuideStage } from '@/data/leadership';
import type { CheckStatus, GovernanceState } from '../guide-state';
import { toggle } from './path-helpers';

const statuses: [CheckStatus, string][] = [['clear', 'Bereits geklärt'], ['open', 'Noch zu klären'], ['irrelevant', 'Nicht relevant für unser fiktives Beispiel']];

export function GovernancePath({ stage, state, onChange }: { stage: GuideStage; state: GovernanceState; onChange: (state: GovernanceState) => void }) {
  if (stage === 'orientation') return <>
    <div className="leadership-orientation"><p>KI-Entwürfe können hilfreich sein. Ob sie für eine konkrete Aufgabe geeignet und zulässig sind, muss dennoch fachlich und organisatorisch geklärt werden.</p><p>Dieser Guide ist kein Freigabe-Assistent und erzeugt kein Sicherheitsurteil.</p></div>
    <fieldset className="leadership-fieldset"><legend>Welche Themen möchtest du besonders prüfen?</legend><div className="leadership-check-list leadership-check-grid">{governanceTopics.map((topic) => <label key={topic.id}><input type="checkbox" checked={state.topicIds.includes(topic.id)} onChange={() => onChange({ ...state, topicIds: toggle(state.topicIds, topic.id) })} /><span>{topic.label}</span></label>)}</div></fieldset>
  </>;

  return <>
    <section className="leadership-support-intro"><p className="eyebrow hub-eyebrow">PRÜFPUNKTE, KEIN GREEN-LIGHT</p><h2>Offene Fragen vor einem realen Versuch sichtbar machen</h2><p>Auch wenn alles als geklärt markiert ist, entsteht daraus keine automatische Freigabe.</p></section>
    <div className="leadership-governance-list">{governanceChecks.map((check, index) => <fieldset key={check.id}><legend><span>{String(index + 1).padStart(2, '0')}</span>{check.text}</legend><div>{statuses.map(([value, label]) => <label key={value}><input type="radio" name={`governance-${check.id}`} checked={state.checks[check.id] === value} onChange={() => onChange({ ...state, checks: { ...state.checks, [check.id]: value } })} /><span>{label}</span></label>)}</div></fieldset>)}</div>
    <div className="leadership-input-grid"><label><span>Wer übernimmt die fachliche Prüfung? <small>optional</small></span><textarea rows={3} maxLength={800} value={state.reviewer} onChange={(event) => onChange({ ...state, reviewer: event.target.value })} /></label><label><span>Nächste Abklärung <small>optional</small></span><textarea rows={3} maxLength={1000} value={state.nextClarification} onChange={(event) => onChange({ ...state, nextClarification: event.target.value })} /></label></div>
    <aside className="leadership-link-card"><div><h2>Bestehende Leitplanken nutzen</h2><p>Die Hub-Inhalte geben allgemeine Orientierung, ersetzen aber keine organisationsinterne Freigabe oder Rechtsberatung.</p></div><div><Link href="/guidelines" className="hub-button hub-button-secondary">Guidelines ansehen</Link><Link href="/help" className="hub-button hub-button-secondary">Hilfe öffnen</Link></div></aside>
  </>;
}
