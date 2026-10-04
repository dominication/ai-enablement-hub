import Link from 'next/link';
export default function NotFound() { return <div className="page-container detail-page"><p className="eyebrow">404</p><h1>Diese Seite gibt es hier noch nicht.</h1><p className="page-lead">Auf der Startseite findest du die verfügbaren Bereiche des Prototyps.</p><Link className="back-link" href="/">← Zur Startseite</Link></div>; }
