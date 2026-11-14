import type { PersonalGuideStage, PersonalPathId } from '@/data/personal-guide';

type BaseState = { offerIds: string[] };

export type UnderstandState = BaseState & { workExamples: string; boundaries: string; questions: string; nextStep: string };
export type TryState = BaseState & { taskId: string; customTask: string; approval: 'clear' | 'open' | 'not-needed' | ''; reviewPlan: string; stopCondition: string };
export type ConcernsState = BaseState & { facts: string; openQuestions: string; conversation: string; support: string };
export type ImproveState = BaseState & { focusIds: string[]; currentProcess: string; reviewEffort: string; decisionOwner: string; change: string };
export type PauseState = BaseState & { choice: 'not-now' | 'overview' | 'support' | ''; reason: string; support: string; revisit: string };
export type OtherState = BaseState & { note: string; known: string; support: string };

export type PersonalGuideStates = {
  understand: UnderstandState;
  try: TryState;
  concerns: ConcernsState;
  improve: ImproveState;
  pause: PauseState;
  other: OtherState;
};

export type PersonalGuideStages = Record<PersonalPathId, PersonalGuideStage>;
export type PersonalGuideSection = { id: string; title: string; value: string };
export type PersonalGuideDocument = { title: string; intro: string; sections: PersonalGuideSection[]; disclaimer?: string };

export function createInitialPersonalStates(): PersonalGuideStates {
  return {
    understand: { offerIds: [], workExamples: '', boundaries: '', questions: '', nextStep: '' },
    try: { offerIds: [], taskId: '', customTask: '', approval: '', reviewPlan: '', stopCondition: '' },
    concerns: { offerIds: [], facts: '', openQuestions: '', conversation: '', support: '' },
    improve: { offerIds: [], focusIds: [], currentProcess: '', reviewEffort: '', decisionOwner: '', change: '' },
    pause: { offerIds: [], choice: '', reason: '', support: '', revisit: '' },
    other: { offerIds: [], note: '', known: '', support: '' },
  };
}

export function createInitialPersonalStages(): PersonalGuideStages {
  return { understand: 'situation', try: 'situation', concerns: 'situation', improve: 'situation', pause: 'situation', other: 'situation' };
}
