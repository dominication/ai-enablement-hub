import type { Metadata } from 'next';
import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import './globals.css';
import '../components/hub-ui/hub-content.css';

export const metadata: Metadata = {
  title: { default: 'AI Enablement Hub – AI im Arbeitsalltag', template: '%s | AI Enablement Hub' },
  description: 'Entdecke praktische AI Use Cases, erprobe neue Arbeitsweisen und lerne aus den Erfahrungen anderer. Ein Prototyp mit fiktiven Inhalten.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de-CH"><body><a href="#main-content" className="skip-link">Zum Inhalt springen</a><AppHeader /><main id="main-content">{children}</main><footer className="app-footer"><span>AI Enablement Hub <span className="footer-divider">/</span> Gemeinsam neue Arbeitsweisen entdecken.</span><div><span>Prototyp · Fiktive Inhalte</span><Link href="/help">Hilfe & Orientierung<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></Link></div></footer></body></html>;
}
