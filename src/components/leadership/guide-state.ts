import type { GuidePathId, GuideStage, ResponsibilityId } from '@/data/leadership';

export type IdeaDecision = 'review' | 'later' | 'not-fit' | '';
export type CheckStatus = 'clear' | 'open' | 'irrelevant' | '';
export type ClarityStatus = 'clear' | 'open' | '';

export type WorkIdea = {
  id: number;
  task: string;
  friction: string;
  learning: string;
  decision: IdeaDecision;
  questions: string;
};

export type UncertaintyState = { offerId: 'self' | 'team' | 'leadership' | ''; questionIds: string[]; nextStep: string; note: string };
export type UseCasesState = { mode: 'discover' | 'ideas' | ''; frictionIds: string[]; ideas: WorkIdea[]; nextStep: string };
export type PerspectivesState = { topicId: string; formatId: string; questionIds: string[]; feedback: string };
export type CapacityState = { factorIds: string[]; leverIds: string[]; responsibilities: Partial<Record<string, ResponsibilityId>>; nextConversation: string };
export type GovernanceState = { topicIds: string[]; checks: Partial<Record<string, CheckStatus>>; nextClarification: string; reviewer: string };
export type OrientationState = { statuses: Partial<Record<string, ClarityStatus>>; partner: string; nextStep: string };
export type OtherState = { note: string; known: string; support: string };

export type GuideStates = {
  uncertainty: UncertaintyState;
  'use-cases': UseCasesState;
  perspectives: PerspectivesState;
  capacity: CapacityState;
  governance: GovernanceState;
  orientation: OrientationState;
  other: OtherState;
};

export type GuideStages = Record<GuidePathId, GuideStage>;
export type GuideSection = { id: string; title: string; value: string };
export type GuideDocument = { title: string; intro: string; sections: GuideSection[]; disclaimer?: string };

function emptyIdeas(): WorkIdea[] {
  return Array.from({ length: 3 }, (_, index) => ({ id: index + 1, task: '', friction: '', learning: '', decision: '', questions: '' }));
}

export function createInitialGuideStates(): GuideStates {
  return {
    uncertainty: { offerId: '', questionIds: [], nextStep: '', note: '' },
    'use-cases': { mode: '', frictionIds: [], ideas: emptyIdeas(), nextStep: '' },
    perspectives: { topicId: '', formatId: '', questionIds: [], feedback: '' },
    capacity: { factorIds: [], leverIds: [], responsibilities: {}, nextConversation: '' },
    governance: { topicIds: [], checks: {}, nextClarification: '', reviewer: '' },
    orientation: { statuses: {}, partner: '', nextStep: '' },
    other: { note: '', known: '', support: '' },
  };
}

export function createInitialGuideStages(): GuideStages {
  return { uncertainty: 'orientation', 'use-cases': 'orientation', perspectives: 'orientation', capacity: 'orientation', governance: 'orientation', orientation: 'orientation', other: 'orientation' };
}
