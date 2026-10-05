import { featuredCommunityLearning as learning } from '@/data/community';
import { Icon } from './Icon';

export function LearningCard() {
  return <article className="learning-card">
    <div className="learning-label"><span className="eyebrow">{learning.useCase.category}</span><span className="demo-label">Fiktives Beispiel</span></div>
    <div className="quote-layout"><span className="quote-mark" aria-hidden="true">“</span><blockquote>{learning.summary}</blockquote></div>
    <div className="learning-footer"><div className="learning-attribution"><span className="mini-avatar"><Icon name="team" /></span><span>{learning.attribution}</span></div><p>{learning.takeaway}</p></div>
  </article>;
}
