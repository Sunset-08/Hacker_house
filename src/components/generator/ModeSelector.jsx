const MODES = [
  {
    id: 'modern',
    label: 'MODE 02',
    name: 'MODERN',
    desc: 'Clean. Editorial. Timeless.',
    badge: '✦',
  },
  {
    id: 'goan',
    label: 'MODE 01',
    name: 'GOAN ART',
    desc: 'Arch frames. Tile borders. Coastal art.',
    badge: '◉',
  },
  {
    id: 'archive',
    label: 'MODE 03',
    name: 'ARCHIVE',
    desc: 'Classified dossier. Builder clearance.',
    badge: '▣',
  },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="mode-selector">
      <p className="gen-section-label">SELECT MODE //</p>
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
