import Link from 'next/link';
import type { UseCase } from '@/data/content';
import { Icon } from './Icon';

export function UseCaseCard({ item }: { item: UseCase }) {
  return <article className={`use-case-card card-${item.icon}`}>
    <div className="card-heading"><span className="card-icon"><Icon name={item.icon} /></span><span className="eyebrow">{item.category}</span></div>
    <h3><Link href={item.href}>{item.title}</Link></h3>
    <p>{item.description}</p>
    <div className="card-meta"><span><Icon name="clock" />{item.duration}</span><span className="meta-divider" aria-hidden="true" /><span>{item.context === 'Personendaten' && <Icon name="shield" />}{item.context}</span></div>
    <Link href={item.href} className="card-action">{item.action}<Icon name="arrow" /></Link>
  </article>;
}
