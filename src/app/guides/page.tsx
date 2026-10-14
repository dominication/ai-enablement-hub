import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { HubPageIntro } from '@/components/hub-ui/HubPage';
import './guides.css';

export const metadata: Metadata = { title: 'Guides' };

export default function GuidesPage() {
  return <div className="page-container detail-page hub-content-page guides-page">
    <section className="guides-hero" aria-label="Einführung zu den Guides">
      <HubPageIntro backHref="/" backLabel="Zur Startseite" eyebrow="GUIDES" title="Orientierung für deinen nächsten Schritt mit KI" lead="Wähle einen Guide passend zu deiner Situation. Die Inhalte unterstützen dich beim Einordnen, Vorbereiten und gemeinsamen Lernen." />
      <div className="guides-hero-visual" aria-hidden="true"><Image src="/images/home/learning-notes.svg" alt="" width={460} height={300} priority /></div>
    </section>

    <section className="guides-catalogue" aria-labelledby="guides-catalogue-title">
      <div className="guides-section-heading"><div><p className="eyebrow hub-eyebrow">VERFÜGBAR UND GEPLANT</p><h2 id="guides-catalogue-title">Welcher Einstieg passt gerade?</h2></div><p>Verfügbare Guides lassen sich direkt öffnen. Geplante Angebote sind klar als Vorschau markiert.</p></div>
      <div className="guides-grid">
        <article className="guide-card guide-card-available">
          <div className="guide-card-heading"><span className="hub-icon-badge"><Icon name="team" /></span><span className="guide-status">Verfügbar</span></div>
          <p className="eyebrow hub-eyebrow">FÜHRUNG & CHANGE</p>
          <h3>KI im Team begleiten</h3>
          <p>Klärung für Unsicherheit, Use Cases, unterschiedliche Perspektiven, Kapazität, Governance oder offene Spielräume.</p>
          <ul><li>Sieben situationsbezogene Einstiege</li><li>Editierbare und kopierbare Arbeitshilfen</li></ul>
          <Link className="hub-button hub-button-primary" href="/leadership">Führungskräfte-Guide öffnen<Icon name="arrow" /></Link>
        </article>

        <article className="guide-card guide-card-planned" aria-labelledby="personal-guide-title">
          <div className="guide-card-heading"><span className="hub-icon-badge"><Icon name="book" /></span><span className="guide-status">Geplant</span></div>
          <p className="eyebrow hub-eyebrow">PERSÖNLICHER EINSTIEG</p>
          <h3 id="personal-guide-title">Persönlicher KI-Einstieg</h3>
          <p>Ein künftiger Guide für die persönliche Orientierung beim Einstieg in die Arbeit mit KI.</p>
          <p className="guide-planned-note">Dieses Angebot ist in Vorbereitung und noch nicht verfügbar.</p>
        </article>
      </div>
    </section>
  </div>;
}
