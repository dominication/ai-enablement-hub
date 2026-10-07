import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { CommunityLearnings } from '@/components/community/CommunityLearnings';
import { HubPageIntro } from '@/components/hub-ui/HubPage';
import { communityLearnings, sharedLearningQuestions } from '@/data/community';
import '@/components/community/community.css';

export const metadata = { title: 'Community' };
export default function CommunityPage() {
  return <div className="page-container detail-page community-page hub-content-page hub-community">
    <section className="community-hero" aria-label="Einführung zur Community">
      <HubPageIntro backHref="/" backLabel="Zur Startseite" eyebrow="COMMUNITY" title="Erfahrungen teilen. Gemeinsam besser entscheiden." lead="Hier werden Erfahrungen aus AI-Experimenten sichtbar – was geholfen hat, wo Grenzen lagen und was Teams beim nächsten Mal anders machen würden." meta={<p className="community-note"><span className="hub-icon-badge"><Icon name="team" /></span>Alle Beiträge in diesem Prototyp sind fiktiv.</p>} />
      <div className="community-hero-visual" aria-hidden="true"><Image src="/images/home/team-hero.webp" alt="" width={1400} height={933} priority sizes="(max-width: 760px) 100vw, 48vw" /><span>Aus Erfahrungen entstehen neue Perspektiven.</span></div>
    </section>
    <CommunityLearnings learnings={communityLearnings} />
    <section className="community-principle" aria-labelledby="community-principle-title"><div><h2 id="community-principle-title">Nicht nur Erfolg ist ein Learning</h2><p className="community-principle-lead">Auch Herausforderungen bringen uns weiter.</p><p>Ein Experiment kann weitergeführt, angepasst oder bewusst beendet werden. Entscheidend ist, was daraus für die Arbeit gelernt wurde.</p></div><Image src="/images/home/learning-team.svg" alt="" width={460} height={300} /></section>
    <section className="community-pattern" aria-labelledby="community-pattern-title"><h2 id="community-pattern-title">Was ein gutes Learning sichtbar macht</h2><ul>{sharedLearningQuestions.map((question) => <li key={question}>{question}</li>)}</ul></section>
    <section className="community-organisation" aria-labelledby="community-organisation-title"><div><p className="eyebrow">ORGANISATION</p><h2 id="community-organisation-title">Was lernen wir daraus als Organisation?</h2><p>Das Standortbild verdichtet wiederkehrende Beobachtungen aus Use Cases, Experimenten und geteilten Erfahrungen.</p></div><Link className="text-link" href="/organisation">Standortbild ansehen<Icon name="arrow" /></Link></section>
  </div>;
}
