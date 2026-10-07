import Link from 'next/link';
import type { UseCase } from '@/data/content';
import { Icon } from './Icon';

export function UseCaseCard({ item, outcome, summary, compact = false }: { item: UseCase; outcome?: string; summary?: string; compact?: boolean }) {
  return <article className={`use-case-card card-${item.icon}`}>
    <div className="card-heading"><span className="card-icon"><Icon name={item.icon} /></span><span className="eyebrow hub-eyebrow">{item.category}</span></div>
    <h3><Link href={item.href}>{item.title}</Link></h3>
    <p>{summary ?? item.description}</p>
    {outcome && <div className="card-outcome"><strong>Am Ende</strong><p>{outcome}</p></div>}
    <div className="card-meta hub-meta"><span><Icon name="clock" />{item.duration}</span><span className="meta-divider" aria-hidden="true" /><span>{item.context === 'Personendaten' && <Icon name="shield" />}{item.context}</span></div>
    <Link href={item.href} className={compact ? 'card-action hub-icon-button' : 'card-action'} aria-label={compact ? `${item.action}: ${item.title}` : undefined}>{!compact && item.action}<Icon name="arrow" /></Link>
  </article>;
}
