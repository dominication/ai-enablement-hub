import { Icon } from '@/components/Icon';
import { projectSources, type SourceId, type SourceReference } from '@/data/project';

export function SourcePicker({ selected, onToggle, onPreview }: { selected: SourceId[]; onToggle: (id: SourceId) => void; onPreview: (title: string, refs: SourceReference[]) => void }) {
  return <fieldset className="pm-source-picker"><legend className="sr-only">Projektquellen auswählen</legend>{projectSources.map((source) => <article className="pm-source-row" key={source.id}>
    <label><input type="checkbox" checked={selected.includes(source.id)} onChange={() => onToggle(source.id)} /><span><strong>{source.title}</strong><span>{source.date}{source.id === 'previous' ? ' · Vergleichsbasis' : ''}</span></span></label>
    <p>{source.summary}</p><button className="pm-text-button" onClick={() => onPreview(source.title, source.entries.map((entry) => ({ sourceId: source.id, entryId: entry.id })))}>Vorschau ansehen<Icon name="chevron" /></button>
  </article>)}</fieldset>;
}
