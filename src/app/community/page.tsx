import Link from 'next/link';
import { CommunityLearnings } from '@/components/community/CommunityLearnings';
import { communityLearnings, sharedLearningQuestions } from '@/data/community';
import '@/components/community/community.css';

export const metadata = { title: 'Community' };
export default function CommunityPage() {
  return <div className="page-container detail-page community-page">
    <Link className="back-link" href="/">← Zur Startseite</Link>
    <p className="eyebrow">COMMUNITY</p>
    <h1>Erfahrungen teilen. Gemeinsam besser entscheiden.</h1>
    <p className="page-lead">Hier werden Erfahrungen aus AI-Experimenten sichtbar – was geholfen hat, wo Grenzen lagen und was Teams beim nächsten Mal anders machen würden.</p>
    <p className="community-note">Alle Beiträge in diesem Prototyp sind fiktiv.</p>
    <section className="community-principle" aria-labelledby="community-principle-title"><h2 id="community-principle-title">Nicht nur Erfolg ist ein Learning</h2><p>Ein Experiment kann weitergeführt, angepasst oder bewusst beendet werden. Entscheidend ist, was daraus für die Arbeit gelernt wurde.</p></section>
    <CommunityLearnings learnings={communityLearnings} />
    <section className="community-pattern" aria-labelledby="community-pattern-title"><h2 id="community-pattern-title">Was ein gutes Learning sichtbar macht</h2><ul>{sharedLearningQuestions.map((question) => <li key={question}>{question}</li>)}</ul></section>
  </div>;
}
