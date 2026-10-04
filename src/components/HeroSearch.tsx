import Link from 'next/link';
import { Icon } from './Icon';

export function HeroSearch({ initialQuery = '', compact = false }: { initialQuery?: string; compact?: boolean }) {
  return <div className={compact ? 'hero-search compact' : 'hero-search'}>
    <form action="/use-cases" method="get" role="search">
      <label htmlFor="work-search">Was möchtest du erreichen?</label>
      <div className="search-field"><Icon name="search" /><input id="work-search" name="q" type="search" defaultValue={initialQuery} maxLength={200} placeholder="Ich muss jede Woche einen Projektstatus erstellen." /><button type="submit">Use Case finden<Icon name="arrow" /></button></div>
    </form>
    {!compact && <div className="search-examples"><span>Zum Beispiel</span>{['Projektstatus', 'Interviews', 'Meetings', 'Recherche'].map((term) => <Link key={term} href={`/use-cases?q=${encodeURIComponent(term)}`}>{term}</Link>)}</div>}
  </div>;
}
