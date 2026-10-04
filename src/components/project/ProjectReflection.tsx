import { judgementOptions, reliefOptions } from '@/data/project';

export type Reflection = { relief: string; judgement: string[]; nextTime: string };
export function ProjectReflection({ value, onChange, onReuse, onShare }: {
  value: Reflection; onChange: (value: Reflection) => void; onReuse: () => void; onShare: () => void;
}) {
  const complete = !!value.relief && value.judgement.length > 0;
  return <form className="pm-reflection" onSubmit={(event) => { event.preventDefault(); if (complete) onShare(); }}>
    <fieldset><legend>Wo hat dich die Unterstützung am meisten entlastet?</legend><div className="pm-choice-grid">{reliefOptions.map((option) => <label className="pm-choice" key={option}><input type="radio" name="project-relief" checked={value.relief === option} onChange={() => onChange({ ...value, relief: option })} required /><span>{option}</span></label>)}</div></fieldset>
    <fieldset><legend>Wo war deine eigene Einschätzung besonders wichtig?</legend><p className="pm-small">Mehrfachauswahl möglich.</p><div className="pm-choice-grid">{judgementOptions.map((option) => <label className="pm-choice" key={option}><input type="checkbox" checked={value.judgement.includes(option)} onChange={() => onChange({ ...value, judgement: value.judgement.includes(option) ? value.judgement.filter((item) => item !== option) : [...value.judgement, option] })} /><span>{option}</span></label>)}</div></fieldset>
    <label className="pm-field-label" htmlFor="pm-next-time">Was würdest du beim nächsten Mal anders machen? <span>· Optional</span></label><textarea id="pm-next-time" rows={3} maxLength={1000} value={value.nextTime} onChange={(event) => onChange({ ...value, nextTime: event.target.value })} placeholder="Zum Beispiel Abhängigkeiten früher mit den beteiligten Teams klären …" />
    <p className="pm-small">Keine realen Projektinformationen eingeben. «Learning teilen» öffnet zuerst eine Vorschau. Dein Learning bleibt nur in dieser Demo-Sitzung; es wird nichts veröffentlicht.</p>
    <div className="pm-footer-actions"><button className="pm-button pm-primary" type="button" onClick={onReuse}>Workflow wiederverwenden</button><button className="pm-button pm-secondary" type="submit" disabled={!complete}>Learning teilen</button></div>
    {!complete && <p className="pm-small">Zum Teilen wähle eine Entlastung und mindestens einen Bereich deiner eigenen Einschätzung. Du kannst den Workflow auch ohne Reflexion wiederverwenden.</p>}
  </form>;
}
