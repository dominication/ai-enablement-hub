import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSearch } from '@/components/HeroSearch';
import { UseCaseCard } from '@/components/UseCaseCard';
import { Icon } from '@/components/Icon';
import { searchUseCases, useCases } from '@/data/content';
import { homepageJourneys } from '@/data/homepage';
import './library.css';
import { librarySummaries } from '@/data/library-presentation';

export const metadata: Metadata = { title: 'Use Cases' };
const categories = [...new Set(useCases.map((item) => item.category))];
export default async function UseCasesPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; category?: string | string[] }> }) {
  const params = await searchParams;
  const query = (typeof params.q === 'string' ? params.q : '').trim().slice(0, 200);
  const category = typeof params.category === 'string' && categories.includes(params.category) ? params.category : '';
  const results = searchUseCases(query).filter((item) => !category || item.category === category);
  const curated = !query && !category;
  const library = curated ? results.filter((item) => !item.featured) : results;
  function filterHref(value: string) {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (value) params.set('category', value);
    return `/use-cases${params.size ? `?${params}` : ''}`;
  }
  return <div className="uc-library">
    <section className="library-hero" aria-labelledby="library-title"><div className="library-hero-inner">
      <div className="library-hero-copy"><p className="eyebrow">AI IM ARBEITSALLTAG</p><h1 id="library-title">Deine Aufgabe. Ein neuer Ansatz.</h1><p className="library-intro">Entdecke einen passenden Einstieg für deine Arbeit. Du entscheidest, was du ausprobieren möchtest.</p><HeroSearch initialQuery={query} compact category={category} /></div>
      <Image className="library-hero-art" src="/images/home/team-hero.webp" alt="" width={1400} height={933} sizes="(max-width: 760px) 100vw, 40vw" priority />
    </div></section>
    <div className="library-content">
      <nav className="library-filters" aria-label="Use Cases nach Kategorie">{['', ...categories].map((value) => <Link key={value} href={filterHref(value)} aria-current={category === value ? 'page' : undefined}>{value || 'Alle'}</Link>)}</nav>
      <p className="library-results" role="status">{query ? `${results.length} passende Use Cases für «${query}»` : `${results.length} Use Cases für deinen Arbeitsalltag`}{category && ` · ${category}`}</p>
      {curated && <section aria-labelledby="recommended-title"><div className="library-section-heading"><h2 id="recommended-title">Unsere Empfehlungen für dich</h2><a href="#all-use-cases" className="library-text-link">Alle Use Cases ansehen<Icon name="arrow" /></a></div><div className="library-featured">
        {homepageJourneys.map(({ item, benefit, image, tone }) => <article className={`use-case-card library-featured-card library-${tone}`} key={item.slug}>
          <div className="library-featured-copy"><p className="eyebrow">{item.category}</p><h3><Link href={item.href}>{item.title}</Link></h3><p>{benefit}</p></div>
          <Image className="library-featured-art" src={`/images/home/${image}`} alt="" width={260} height={280} />
          <div className="card-meta"><span><Icon name="clock" />{item.duration}</span><span>{item.context}</span></div><Link href={item.href} className="card-action" aria-label={`${item.action}: ${item.title}`}><Icon name="arrow" /></Link>
        </article>)}
      </div></section>}
      {results.length ? <section id="all-use-cases" aria-labelledby="all-title"><h2 id="all-title">{curated ? 'Alle Use Cases' : 'Passende Use Cases'}</h2><div className="library-grid">{library.map((item) => <UseCaseCard key={item.slug} item={item} summary={librarySummaries[item.slug]} compact />)}</div></section> : <section className="empty-state"><h2>Noch kein passender Use Case dabei.</h2><p>Versuche einen anderen Begriff oder beschreibe die Aufgabe, bei der du Unterstützung suchst.</p><Link href="/use-cases" className="library-text-link">Alle Use Cases ansehen →</Link></section>}
      <aside className="library-guidance" aria-labelledby="orientation-title"><Image src="/images/home/learning-notes.svg" alt="" width={130} height={90} /><div><h2 id="orientation-title">Noch mehr praktische Tipps und Orientierung?</h2><p>Schau in unsere Guidelines oder entdecke Erfahrungen aus der Community.</p></div><Link href="/guidelines" className="library-text-link">Zu den Guidelines<Icon name="arrow" /></Link><Link href="/community" className="library-text-link">Zur Community<Icon name="arrow" /></Link></aside>
    </div>
  </div>;
}
