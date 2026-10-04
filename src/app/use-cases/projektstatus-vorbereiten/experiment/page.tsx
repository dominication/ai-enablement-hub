import type { Metadata } from 'next';
import { ProjectWorkspace } from '@/components/project/ProjectWorkspace';

export const metadata: Metadata = { title: 'Projektstatus vorbereiten – Arbeitsfläche' };
export default function ProjectExperimentPage() { return <ProjectWorkspace />; }
