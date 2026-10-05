'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';

const navigation = [{ href: '/use-cases', label: 'Use Cases' }, { href: '/team-lab', label: 'Team Lab' }, { href: '/community', label: 'Community' }, { href: '/guidelines', label: 'Guidelines' }];
export function AppHeader() {
  const pathname = usePathname();
  return <header className="app-header">
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="AI Enablement Hub – Startseite">
        <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
        <span>AI Enablement <strong>Hub</strong></span>
      </Link>
      <nav className="main-nav" aria-label="Hauptnavigation">
        {navigation.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <div className="header-tools"><Link href="/help" className="help-link" aria-current={pathname === "/help" ? "page" : undefined}><Icon name="help" /><span>Hilfe</span></Link></div>
    </div>
  </header>;
}
