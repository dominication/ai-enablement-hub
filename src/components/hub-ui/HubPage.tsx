import type { ReactNode } from 'react';
import Link from 'next/link';

type HubPageIntroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  backHref?: string;
  backLabel?: string;
  description?: string;
  meta?: ReactNode;
};

export function HubPageIntro({ eyebrow, title, lead, backHref, backLabel, description, meta }: HubPageIntroProps) {
  return <header className="hub-page-intro">
    {backHref && backLabel && <Link className="back-link" href={backHref}>← {backLabel}</Link>}
    <p className="eyebrow hub-eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <p className="page-lead">{lead}</p>
    {description && <p className="hub-page-description">{description}</p>}
    {meta}
  </header>;
}
