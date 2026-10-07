import type { ReactNode, Ref } from 'react';
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
  backHref?: string;
  backLabel?: string;
  category: string;
  title: string;
  description: string;
  art: ReactNode;
  metadata: ReactNode;
};

type ContextNoticeProps = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  icon: ReactNode;
  variant: 'guideline' | 'personal-data';
  className?: string;
};

type ExperimentResponsibilityProps = {
  aiDescription: string;
  humanDescription: string;
};

type JourneyMetaItem = {
  icon: ReactNode;
  title: string;
  detail: string;
};

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function JourneyHero({ backHref, backLabel, category, title, description, art, metadata }: JourneyHeroProps) {
  return <header className="hub-journey-hero"><div className="hub-journey-hero-inner">
    {backHref && backLabel && <Link href={backHref} className="back-link">← {backLabel}</Link>}
    <div className="hub-journey-hero-copy"><p className="eyebrow hub-eyebrow">{category}</p><h1>{title}</h1><p className="hub-journey-benefit">{description}</p></div>
    {art}
    {metadata}
  </div></header>;
}

export function JourneyMeta({ items, className }: { items: [JourneyMetaItem, JourneyMetaItem, JourneyMetaItem]; className?: string }) {
  return <div className={classes('hub-journey-meta', 'hub-meta', className)}>{items.map((item) => <span key={item.title}>
    {item.icon}<span><strong>{item.title}</strong><small>{item.detail}</small></span>
  </span>)}</div>;
}

export function JourneySummary({ items, className }: { items: [SummaryItem, SummaryItem]; className?: string }) {
  return <div className={classes('entry-summary', 'hub-journey-summary', className)}>{items.map((item) => <section key={item.title}>
    {item.icon}
    <div><h2 className="hub-section-heading">{item.title}</h2><p>{item.description}</p>{item.details && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</div>
  </section>)}</div>;
}

export function JourneyStartCard({ href, label, note, className }: { href: string; label: string; note: string; className?: string }) {
  return <div className={classes('hub-journey-start', className)}><Link className="hub-button hub-button-primary" href={href}>{label}<Icon name="arrow" /></Link><p>{note}</p></div>;
}

export function JourneyResponsibility({ id, title = 'Unterstützung und Verantwortung', className, children }: ResponsibilityProps) {
  return <section className={classes('entry-responsibility', 'hub-journey-responsibility', className)} aria-labelledby={id}>
    <h2 className="hub-section-heading" id={id}>{title}</h2><div className="entry-pair hub-responsibility-pair">{children}</div>
  </section>;
}

export function JourneyContextNotice({ title, description, href, linkLabel, icon, variant, className }: ContextNoticeProps) {
  return <aside className={classes('hub-context-notice', `hub-context-notice-${variant}`, className)}>
    {icon}<div><h2 className="hub-section-heading">{title}</h2><p>{description}</p>{href && linkLabel && <Link href={href} className="text-link hub-text-link">{linkLabel}<Icon name="arrow" /></Link>}</div>
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

export function ExperimentTopline({ backHref, backLabel, category, context }: { backHref: string; backLabel: string; category: string; context?: ReactNode }) {
  return <><Link className="back-link" href={backHref}>← {backLabel}</Link><div className="experiment-topline"><div><p className="eyebrow hub-eyebrow">{category}</p>{context}</div><span className="experiment-demo">Geführte Demo</span></div></>;
}

export function ExperimentStageHeader({ stageLabel, title, description, headingRef, className }: { stageLabel: string; title: string; description: string; headingRef: Ref<HTMLHeadingElement>; className?: string }) {
  return <header className={classes('experiment-heading', className)}><p className="hub-experiment-stage-label">{stageLabel}</p><h1 ref={headingRef} tabIndex={-1}>{title}</h1><p>{description}</p></header>;
}
