const MODES = [
  {
    id: 'hacker-house',
    label: 'STYLE 01',
    name: 'HACKER HOUSE',
    desc: 'Goa hacker aesthetic',
    badge: '✦',
  },
  {
    id: 'beach',
    label: 'STYLE 02',
    name: 'BEACH',
    desc: 'Coastal Goa experience',
    badge: '◉',
  },
  {
    id: 'minimal',
    label: 'STYLE 03',
    name: 'MINIMAL',
    desc: 'Clean modern identity',
    badge: '⚡',
  },
  {
    id: 'boarding-pass',
    label: 'STYLE 04',
    name: 'BOARDING PASS',
    desc: 'Travel / boarding pass aesthetic',
    badge: '✈',
  },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="mode-selector">
      <p className="gen-section-label">SELECT ID STYLE //</p>
      <div className="mode-selector__grid">
        {MODES.map(m => (
          <button
            key={m.id}
            id={`mode-${m.id}`}
            className={`mode-card ${mode === m.id ? 'mode-card--active' : ''}`}
            onClick={() => onChange(m.id)}
            aria-pressed={mode === m.id}
          >
            <span className="mode-card__badge">{m.badge}</span>
            <span className="mode-card__label">{m.label}</span>
            <span className="mode-card__name">{m.name}</span>
            <span className="mode-card__desc">{m.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

