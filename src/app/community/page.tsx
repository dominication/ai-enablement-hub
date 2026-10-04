import Link from 'next/link';
import { LearningCard } from '@/components/LearningCard';
export const metadata = { title: 'Community' };
export default function CommunityPage() { return <div className="page-container detail-page"><Link className="back-link" href="/">← Zur Startseite</Link><p className="eyebrow">COMMUNITY</p><h1>Jede Erfahrung bringt uns weiter.</h1><p className="page-lead">Was hat geholfen? Wo liegen Grenzen? Hier entsteht Raum für ehrliche Erfahrungen – auch wenn ein Experiment nicht zum erhofften Ergebnis führt.</p><LearningCard /><div className="placeholder-panel"><div><h2>Ein erster Einblick</h2><p>Die gezeigte Erfahrung ist fiktiv. Weitere Beiträge und das Teilen eigener Erfahrungen folgen in einer nächsten Version.</p></div></div></div>; }
