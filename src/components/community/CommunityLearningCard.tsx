import Link from 'next/link';
import type { CommunityLearning } from '@/data/community';
import { Icon } from '../Icon';

export function CommunityLearningCard({ learning }: { learning: CommunityLearning }) {
  return <article className="community-card" aria-labelledby={`learning-${learning.id}`}>
    <div className="community-card-meta"><span className="eyebrow">{learning.useCase.category}</span><span className="community-outcome"><span className="sr-only">Entscheidung: </span>{learning.outcome}</span></div>
    <p className="community-use-case">{learning.useCase.title}</p>
    <h3 id={`learning-${learning.id}`}>{learning.takeaway}</h3>
    <p className="community-summary">{learning.summary}</p>
    <p className="community-attribution">{learning.attribution}</p>
    <details className="community-details">
      <summary>Erfahrung vertiefen<span className="sr-only">: {learning.takeaway}</span></summary>
      <div className="community-detail-content">
        <section><h4>Was geholfen hat</h4><ul>{learning.whatHelped.map((text) => <li key={text}>{text}</li>)}</ul></section>
        <section><h4>Wo menschliche Einordnung wichtig war</h4><ul>{learning.whereHumanJudgementMattered.map((text) => <li key={text}>{text}</li>)}</ul></section>
        <section><h4>Was nicht funktioniert hat</h4><ul>{learning.whatDidNotWork.map((text) => <li key={text}>{text}</li>)}</ul></section>
        <section><h4>Was wir als Nächstes machen</h4><p>{learning.nextStep}</p></section>
      </div>
    </details>
    <Link className="community-case-link" href={learning.useCase.href}><span>Zum Use Case: {learning.useCase.title}</span><Icon name="arrow" /></Link>
  </article>;
}
