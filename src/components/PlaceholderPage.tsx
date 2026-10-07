import Link from 'next/link';
import { Icon } from './Icon';
import { HubPageIntro } from './hub-ui/HubPage';

export function PlaceholderPage({ category, title, description, note }: { category: string; title: string; description: string; note?: string }) {
  return <div className="page-container detail-page hub-content-page hub-help"><HubPageIntro backHref="/" backLabel="Zur Startseite" eyebrow={category} title={title} lead={description} /><section className="placeholder-panel"><span className="hub-icon-badge"><Icon name="book" /></span><div><h2>Hier geht es bald weiter.</h2><p>Dieser Bereich ist im Prototyp als Vorschau angelegt. Die geführten Schritte folgen in einer nächsten Version.</p>{note && <p className="context-note"><Icon name="shield" />{note}</p>}</div></section><Link href="/use-cases" className="hub-button hub-button-primary">Use Cases entdecken<Icon name="arrow" /></Link></div>;
}
