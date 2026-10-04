import { discussionQuestions, type Activity, type Discussion } from '@/data/team';

export function FocusBoard({ activities, discussions, focus, onDiscuss, onFocus }: {
  activities: Activity[]; discussions: Record<string, Discussion>; focus: string; onDiscuss: (id: string, value: Discussion) => void; onFocus: (id: string) => void;
}) {
  return <fieldset><legend className="sr-only">Eine Aufgabe gemeinsam auswählen</legend><div className="tl-focus-board">{activities.map((activity) => {
    const discussion = discussions[activity.id] ?? activity.discussion;
    return <article className="tl-focus-card" key={activity.id}><div className="tl-focus-heading"><h2>{activity.title}</h2><label className="tl-check"><input type="radio" name="team-focus" checked={focus === activity.id} onChange={() => onFocus(activity.id)} /><span>Unser Fokus: {activity.title}</span></label></div><div className="tl-discussion-grid">{discussionQuestions.map((item) => <label key={item.id}>{item.question}<select value={discussion[item.id]} onChange={(event) => onDiscuss(activity.id, { ...discussion, [item.id]: event.target.value })}>{item.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}</div><p className="tl-discussion-note"><strong>Gesprächsimpuls · kein Urteil: </strong>{discussion.judgement === 'sehr hoch' || discussion.judgement === 'hoch' ? 'AI könnte bei Vorbereitung oder Strukturierung unterstützen. Die Beurteilung selbst bleibt beim Menschen.' : discussion.recurring === 'ja' && discussion.information === 'ja' ? 'Interessant für ein kleines Experiment. Ob es sinnvoll ist, entscheidet ihr gemeinsam.' : 'Klärt zuerst Informationsgrundlage und konkreten Nutzen. Auch ohne AI kann eine bessere Arbeitsweise entstehen.'}</p></article>;
  })}</div></fieldset>;
}
