import Link from 'next/link';
import { HubPageIntro } from '@/components/hub-ui/HubPage';
import { Icon } from '@/components/Icon';
export default function NotFound() { return <div className="page-container detail-page hub-content-page hub-help"><HubPageIntro eyebrow="404" title="Diese Seite gibt es hier noch nicht." lead="Auf der Startseite findest du die verfügbaren Bereiche des Prototyps." /><Link className="hub-button hub-button-primary" href="/">Zur Startseite<Icon name="arrow" /></Link></div>; }
