import { projectSources, referencesFor, type ProjectChange, type SourceId, type SourceReference } from '@/data/project';

export function ChangeTimeline({ changes, sources, onEvidence }: { changes: ProjectChange[]; sources: SourceId[]; onEvidence: (title: string, references: SourceReference[]) => void }) {
  return <ol className="pm-change-timeline">{changes.map((change) => <li key={change.id}><article aria-label={change.title}><p className="eyebrow">{change.category}</p><h2>{change.title}</h2><p>{change.description}</p><div className="pm-change-evidence"><span>{referencesFor(change, sources).map((ref) => projectSources.find((source) => source.id === ref.sourceId)!.title).join(' + ')}</span><button className="pm-text-button" onClick={() => onEvidence(change.title, referencesFor(change, sources))}>Quelle ansehen</button></div></article></li>)}</ol>;
}
