import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useCases } from '@/data/content';
import { PlaceholderPage } from '@/components/PlaceholderPage';
import { RecruitingDetail } from '@/components/recruiting/RecruitingDetail';
export const dynamicParams = false;
export function generateStaticParams() { return useCases.filter((item) => item.href.startsWith('/use-cases/')).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; return { title: useCases.find((item) => item.slug === slug)?.title ?? 'Use Case' }; }
export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = useCases.find((item) => item.slug === slug && item.href.startsWith('/use-cases/'));
  if (!item) notFound();
  if (slug === 'interview-vorbereiten') return <RecruitingDetail />;
  return <PlaceholderPage category={item.category} title={item.title} description={item.description} note={item.context === 'Personendaten' ? 'Nutze hier ausschliesslich fiktive Bewerbungsunterlagen. Interviewentscheidungen bleiben bei den verantwortlichen Menschen.' : 'Prüfe vor der Nutzung, welche Projektinformationen du in einem freigegebenen AI-System verwenden darfst.'} />;
}
