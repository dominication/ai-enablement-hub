import { Icon } from './Icon';
import './journey-workflow.css';

// A semantic, static work-sharing pattern, independent of the experiment's state.
const steps = [
  { title: 'Informationen sammeln', detail: 'Du wählst die Quellen aus.', icon: 'book', role: 'human' },
  { title: 'AI strukturiert', detail: 'AI bereitet den Entwurf vor.', icon: 'project', role: 'ai' },
  { title: 'Kontext ergänzen', detail: 'Du ordnest Auswirkungen ein.', icon: 'team', role: 'human' },
  { title: 'Prüfen', detail: 'Du passt an und gibst frei.', icon: 'shield', role: 'human' },
  { title: 'Kommunizieren', detail: 'Du verantwortest den Status.', icon: 'interview', role: 'human' },
] as const;
export function JourneyWorkflow() {
  return <section className="journey-workflow hub-journey-workflow" aria-label="Veränderte Arbeitsweise"><h2 className="hub-section-heading">So verändert sich dein Arbeitsalltag</h2><p>Ziel: weniger Sammelarbeit, mehr Aufmerksamkeit für Steuerung.</p><ol>{steps.map((step, index) => <li className={`workflow-${step.role}`} key={step.title}><span className="workflow-number" aria-hidden="true">{index + 1}</span><div><h3>{step.title}</h3><p><Icon name={step.icon} />{step.detail}</p></div>{index < steps.length - 1 && <span className="workflow-arrow" aria-hidden="true"><Icon name="arrow" /></span>}</li>)}</ol></section>;
}
