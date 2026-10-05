import Link from 'next/link';
import type { UseCase } from '@/data/content';
import type { UseCaseOverviewContent } from '@/data/use-case-library';
import { Icon } from './Icon';
import './use-case-overview.css';

export function UseCaseOverview({ item, content }: { item: UseCase; content: UseCaseOverviewContent }) {
  return <article className="page-container detail-page uc-overview">
    <Link href="/use-cases" className="back-link">← Zu den Use Cases</Link>
    <p className="eyebrow">{item.category}</p>
    <h1>{item.title}</h1>
    <p className="page-lead">{item.description}</p>
    <div className="uc-overview-meta"><span><Icon name="clock" />{item.duration}</span><span>{item.context === 'Personendaten' && <Icon name="shield" />}{item.context}</span></div>
    <div className="uc-overview-roles">
      <section aria-labelledby="ai-support"><h2 id="ai-support">Wobei AI unterstützen kann</h2><ul>{content.support.map((text) => <li key={text}>{text}</li>)}</ul></section>
      <section aria-labelledby="human-responsibility"><h2 id="human-responsibility">Was bei dir bleibt</h2><ul>{content.humanResponsibility.map((text) => <li key={text}>{text}</li>)}</ul></section>
    </div>
    <section className="uc-overview-steps" aria-labelledby="practical-steps"><h2 id="practical-steps">So könntest du vorgehen</h2><ol>{content.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
    <section className="uc-overview-considerations" aria-labelledby="considerations"><h2 id="considerations">Worauf du achten solltest</h2><ul>{content.considerations.map((text) => <li key={text}>{text}</li>)}</ul><Link className="text-link" href="/guidelines">{content.guidelinesLabel}<Icon name="arrow" /></Link></section>
  </article>;
}
