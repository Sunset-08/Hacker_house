import { THEME_LIST } from '../../lib/themes.js';

export default function ThemeSelector({ theme, onChange }) {
  return (
    <div className="theme-selector">
      <p className="gen-section-label">SELECT THEME //</p>
      <div className="theme-selector__list">
        {THEME_LIST.map(t => (
          <button
            key={t.id}
            id={`theme-${t.id}`}
            className={`theme-chip ${theme === t.id ? 'theme-chip--active' : ''}`}
            onClick={() => onChange(t.id)}
            aria-pressed={theme === t.id}
            title={t.name}
          >
            <span
              className="theme-chip__swatch"
              style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }}
            />
            <span className="theme-chip__name">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
