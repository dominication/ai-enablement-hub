import type { ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import './hub-ui.css';

type SummaryItem = {
  title: string;
  description: string;
  details?: string[];
  icon?: ReactNode;
};

type ResponsibilityProps = {
  id?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

type JourneyHeroProps = {
  backHref: string;
  backLabel: string;
  category: string;
  title: string;
  description: string;
  art: ReactNode;
  metadata: ReactNode;
};

type ContextNoticeProps = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: ReactNode;
  variant: 'guideline' | 'personal-data';
  className?: string;
};

type ExperimentResponsibilityProps = {
  aiDescription: string;
  humanDescription: string;
};

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function JourneyHero({ backHref, backLabel, category, title, description, art, metadata }: JourneyHeroProps) {
  return <header className="hub-journey-hero"><div className="hub-journey-hero-inner">
    <Link href={backHref} className="back-link">← {backLabel}</Link>
    <div className="hub-journey-hero-copy"><p className="eyebrow hub-eyebrow">{category}</p><h1>{title}</h1><p className="hub-journey-benefit">{description}</p></div>
    {art}
    {metadata}
  </div></header>;
}

export function JourneySummary({ items, className }: { items: [SummaryItem, SummaryItem]; className?: string }) {
  return <div className={classes('entry-summary', 'hub-journey-summary', className)}>{items.map((item) => <section key={item.title}>
    {item.icon}
    <div><h2 className="hub-section-heading">{item.title}</h2><p>{item.description}</p>{item.details && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</div>
  </section>)}</div>;
}

export function JourneyResponsibility({ id, title = 'Unterstützung und Verantwortung', className, children }: ResponsibilityProps) {
  return <section className={classes('entry-responsibility', 'hub-journey-responsibility', className)} aria-labelledby={id}>
    <h2 className="hub-section-heading" id={id}>{title}</h2><div className="entry-pair hub-responsibility-pair">{children}</div>
  </section>;
}

export function JourneyContextNotice({ title, description, href, linkLabel, icon, variant, className }: ContextNoticeProps) {
  return <aside className={classes('hub-context-notice', `hub-context-notice-${variant}`, className)}>
    {icon}<div><h2 className="hub-section-heading">{title}</h2><p>{description}</p><Link href={href} className="text-link hub-text-link">{linkLabel}<Icon name="arrow" /></Link></div>
  </aside>;
}

export function ExperimentResponsibility({ aiDescription, humanDescription }: ExperimentResponsibilityProps) {
  return <section className="hub-experiment-responsibility" aria-labelledby="experiment-responsibility-title">
    <p className="eyebrow hub-eyebrow">ARBEITSTEILUNG</p>
    <h2 className="hub-section-heading" id="experiment-responsibility-title">AI unterstützt. Du entscheidest.</h2>
    <div className="hub-experiment-responsibility-grid">
      <div><span className="hub-experiment-responsibility-mark" aria-hidden="true">AI</span><p><strong>AI unterstützt</strong>{aiDescription}</p></div>
      <div><span className="hub-experiment-responsibility-mark" aria-hidden="true">Du</span><p><strong>Du entscheidest</strong>{humanDescription}</p></div>
    </div>
  </section>;
}
