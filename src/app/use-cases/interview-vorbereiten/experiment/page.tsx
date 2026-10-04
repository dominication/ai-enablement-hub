import type { Metadata } from 'next';
import { RecruitingExperiment } from '@/components/recruiting/RecruitingExperiment';

export const metadata: Metadata = { title: 'Recruiting-Experiment' };
export default function RecruitingExperimentPage() {
  return <RecruitingExperiment />;
}
