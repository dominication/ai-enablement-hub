import { Icon } from '@/components/Icon';
import { candidate, cvExperience, demoDocuments, jobProfile, motivationLetter, requirements, type DocumentId } from '@/data/recruiting';

export function DocumentPicker({ selected, onToggle }: { selected: DocumentId[]; onToggle: (id: DocumentId) => void }) {
  return <fieldset className="r-fieldset"><legend className="sr-only">Demo-Unterlagen auswählen</legend><div className="document-grid">{demoDocuments.map((doc) => <article className="document-card" key={doc.id}>
    <label className="document-select"><input type="checkbox" checked={selected.includes(doc.id)} onChange={() => onToggle(doc.id)} /><span>{doc.label} einbeziehen</span></label>
    <span className="card-icon"><Icon name={doc.id === 'role' ? 'project' : 'book'} /></span><h2>{doc.title}</h2><p>{doc.description}</p>
    <details><summary>Unterlage ansehen</summary><div className="document-preview">
      {doc.id === 'role' && <><p>{jobProfile.description}</p><h3>Deine Aufgaben</h3><ul>{requirements.map((item) => <li key={item}>{item}</li>)}</ul></>}
      {doc.id === 'cv' && <><p>{candidate.name} · Fiktiver Lebenslauf</p>{cvExperience.map((experience) => <section key={experience.id}><h3>{experience.title}</h3><p className="source-label">{experience.source}</p><p>{experience.excerpt}</p></section>)}</>}
      {doc.id === 'letter' && motivationLetter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div></details>
  </article>)}</div></fieldset>;
}
