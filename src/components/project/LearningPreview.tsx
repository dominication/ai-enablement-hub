import type { Reflection } from './ProjectReflection';

const reliefPhrases: Record<string, string> = {
  'Informationen zusammentragen': 'beim Zusammentragen von Informationen',
  'Veränderungen erkennen': 'beim Erkennen von Veränderungen',
  'Status strukturieren': 'beim Strukturieren des Status',
  'offene Punkte sichtbar machen': 'beim Sichtbarmachen offener Punkte',
};
const judgementPhrases: Record<string, string> = {
  'Risiken bewerten': 'der Bewertung von Risiken',
  'Stakeholder-Kontext': 'der Einordnung des Stakeholder-Kontexts',
  'Prioritäten': 'der Priorisierung',
  'Entscheidungen': 'Entscheidungen',
  'Kommunikation': 'der Kommunikation',
};

export function LearningPreview({ value, onConfirm, onBack }: {
  value: Reflection; onConfirm: () => void; onBack: () => void;
}) {
  const judgement = new Intl.ListFormat('de-CH', { style: 'long', type: 'conjunction' })
    .format(value.judgement.map((option) => judgementPhrases[option] ?? option));
  return <>
    <article className="pm-learning-preview" aria-label="Learning-Vorschau">
      <p className="eyebrow">Projektmanagement</p>
      <blockquote>
        <p>{value.relief === 'Keine erkennbare Entlastung'
          ? 'In diesem Experiment war keine Entlastung durch KI erkennbar.'
          : `KI hat vor allem ${reliefPhrases[value.relief] ?? value.relief} unterstützt.`}</p>
        <p>Menschliche Einschätzung war besonders bei {judgement} wichtig.</p>
      </blockquote>
      {value.nextTime.trim() && <div className="pm-learning-next-time"><h2>Beim nächsten Mal</h2><p>{value.nextTime.trim()}</p></div>}
    </article>
    <p className="pm-notice">So könnte dieses Learning mit anderen Teams geteilt werden. Im Prototyp wird nichts veröffentlicht.</p>
    <div className="pm-footer-actions">
      <button className="pm-button pm-primary" onClick={onConfirm}>Vorschau bestätigen</button>
      <button className="pm-button pm-secondary" onClick={onBack}>Zurück zur Reflexion</button>
    </div>
  </>;
}
