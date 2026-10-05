import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSearch } from '@/components/HeroSearch';
import { UseCaseCard } from '@/components/UseCaseCard';
import { searchUseCases } from '@/data/content';
export const metadata: Metadata = { title: 'Use Cases' };
export default async function UseCasesPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const query = (typeof params.q === 'string' ? params.q : '').trim().slice(0, 200);
  const results = searchUseCases(query);
  return <div className="page-container detail-page library-page"><Link href="/" className="back-link">← Zur Startseite</Link><p className="eyebrow">AI IM ARBEITSALLTAG</p><h1>Deine Aufgabe. Ein neuer Ansatz.</h1><p className="page-lead">Entdecke einen passenden Einstieg für deine Arbeit. Du entscheidest, was du ausprobieren möchtest.</p><HeroSearch initialQuery={query} compact /><p className="results-header" role="status">{query ? `${results.length} passende Use Cases für «${query}»` : `${results.length} Use Cases für deinen Arbeitsalltag`}</p>{results.length ? <div className="use-case-grid">{results.map((item) => <UseCaseCard key={item.slug} item={item} />)}</div> : <section className="empty-state"><h2>Noch kein passender Use Case dabei.</h2><p>Versuche einen anderen Begriff oder beschreibe die Aufgabe, bei der du Unterstützung suchst.</p><Link href="/use-cases" className="text-link">Alle Use Cases ansehen →</Link></section>}</div>;
}
