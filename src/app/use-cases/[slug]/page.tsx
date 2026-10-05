import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useCases } from '@/data/content';
import { UseCaseOverview } from '@/components/UseCaseOverview';
import { useCaseOverviews } from '@/data/use-case-library';
import { RecruitingDetail } from '@/components/recruiting/RecruitingDetail';
import { ProjectDetail } from '@/components/project/ProjectDetail';
export const dynamicParams = false;
export function generateStaticParams() { return useCases.filter((item) => item.href.startsWith('/use-cases/')).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; return { title: useCases.find((item) => item.slug === slug)?.title ?? 'Use Case' }; }
export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = useCases.find((item) => item.slug === slug && item.href.startsWith('/use-cases/'));
  if (!item) notFound();
  if (slug === 'interview-vorbereiten') return <RecruitingDetail />;
  if (slug === 'projektstatus-vorbereiten') return <ProjectDetail />;
  const content = useCaseOverviews[slug];
  if (!content) notFound();
  return <UseCaseOverview item={item} content={content} />;
}
