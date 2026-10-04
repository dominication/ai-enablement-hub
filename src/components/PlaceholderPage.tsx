import Link from 'next/link';
import { Icon } from './Icon';

export function PlaceholderPage({ category, title, description, note }: { category: string; title: string; description: string; note?: string }) {
  return <div className="page-container detail-page"><Link className="back-link" href="/">← Zur Startseite</Link><p className="eyebrow">{category}</p><h1>{title}</h1><p className="page-lead">{description}</p><section className="placeholder-panel"><span className="card-icon"><Icon name="book" /></span><div><h2>Hier geht es bald weiter.</h2><p>Dieser Bereich ist im Prototyp als Vorschau angelegt. Die geführten Schritte folgen in einer nächsten Version.</p>{note && <p className="context-note"><Icon name="shield" />{note}</p>}</div></section><Link href="/use-cases" className="text-link">Use Cases entdecken<Icon name="arrow" /></Link></div>;
}
