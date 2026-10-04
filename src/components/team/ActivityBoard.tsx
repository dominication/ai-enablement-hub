import { useState } from 'react';
import { type Activity, customActivity } from '@/data/team';

export function ActivityBoard({ activities, selected, custom, onToggle, onCustom }: {
  activities: Activity[]; selected: string[]; custom: Activity | null; onToggle: (id: string) => void; onCustom: (activity: Activity) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(custom?.title ?? '');
  const [description, setDescription] = useState(custom?.description ?? '');
  return <><fieldset><legend className="sr-only">Tätigkeiten für das Gespräch auswählen</legend><div className="tl-activity-grid">{activities.map((activity) => <article className="tl-activity-card" key={activity.id}>
    <p className="eyebrow">{activity.role}</p><h2>{activity.title}</h2><p>{activity.description}</p><label className="tl-check"><input type="checkbox" checked={selected.includes(activity.id)} onChange={() => onToggle(activity.id)} /><span>Untersuchen: {activity.title}</span></label>
    {activity.id === 'custom' && <button className="tl-text-button" onClick={() => { setTitle(custom!.title); setDescription(custom!.description); setEditing(true); }}>Eigenen Beitrag bearbeiten</button>}
  </article>)}</div></fieldset>
  {!custom && !editing && <button className="tl-button tl-secondary tl-add-activity" onClick={() => setEditing(true)}>Eigene Demo-Aufgabe ergänzen</button>}
  {editing && <form className="tl-custom-activity" onSubmit={(event) => { event.preventDefault(); if (!title.trim() || !description.trim()) return; onCustom(customActivity(title.trim(), description.trim())); setEditing(false); }}><h2>{custom ? 'Eigenen Beitrag bearbeiten' : 'Eine weitere Tätigkeit'}</h2><label htmlFor="tl-activity-title">Aufgabe</label><input id="tl-activity-title" autoFocus value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} required /><label htmlFor="tl-activity-description">Wo entsteht Reibung?</label><textarea id="tl-activity-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={500} rows={3} required /><p className="tl-small">Ein lokaler Demo-Beitrag. Bitte keine realen Personen- oder Unternehmensinformationen eingeben.</p><div className="tl-inline-actions"><button className="tl-button tl-primary" disabled={!title.trim() || !description.trim()}>Beitrag übernehmen</button><button type="button" className="tl-button tl-secondary" onClick={() => setEditing(false)}>Abbrechen</button></div></form>}
  </>;
}
