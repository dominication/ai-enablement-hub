'use client';

import { useState } from 'react';
import { communityCategories, type CommunityCategory, type CommunityLearning } from '@/data/community';
import { CommunityLearningCard } from './CommunityLearningCard';

export function CommunityLearnings({ learnings }: { learnings: readonly CommunityLearning[] }) {
  const [category, setCategory] = useState<CommunityCategory | 'Alle'>('Alle');
  const visible = category === 'Alle' ? learnings : learnings.filter((learning) => learning.useCase.category === category);
  return <section className="community-learnings" aria-labelledby="community-learnings-title">
    <h2 id="community-learnings-title">Einblicke aus dem Arbeitsalltag</h2>
    <div className="community-filters" role="group" aria-label="Learnings nach Arbeitsbereich filtern">
      <button type="button" aria-pressed={category === 'Alle'} onClick={() => setCategory('Alle')}>Alle</button>
      {communityCategories.map((filter) => <button type="button" key={filter.value} aria-pressed={category === filter.value} onClick={() => setCategory(filter.value)}>{filter.label}</button>)}
    </div>
    <p className="community-result-count" role="status">{visible.length} {visible.length === 1 ? 'fiktives Learning' : 'fiktive Learnings'} · {communityCategories.find((filter) => filter.value === category)?.label ?? 'Alle Bereiche'}</p>
    {visible.length ? <div className="community-grid">{visible.map((learning) => <CommunityLearningCard key={learning.id} learning={learning} />)}</div> : <p className="community-empty">Für diesen Bereich gibt es in der Demo noch kein Learning.</p>}
  </section>;
}
