import Link from 'next/link';
import { informationCategories } from '@/data/content';
import { Icon } from './Icon';

export function GuidelinesTeaser() {
  return <section className="guidelines-teaser" aria-labelledby="guidelines-title">
    <div className="guidelines-intro"><span className="guidelines-icon"><Icon name="shield" /></span><div><p className="eyebrow">Sicher mit KI arbeiten</p><h2 id="guidelines-title">Welche Informationen darf ich verwenden?</h2></div></div>
    <div className="information-types">{informationCategories.map((item, index) => <Link href={`/guidelines#${index + 1}`} key={item.name}><span className={`category-dot dot-${index}`} />{item.name}</Link>)}</div>
    <Link className="text-link" href="/guidelines">Guidelines ansehen<Icon name="arrow" /></Link>
  </section>;
}
