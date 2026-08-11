import { rerollBuilderClass } from '../../lib/builderClasses.js';

export default function BuilderClassPicker({ builderClass, onChange }) {
  function reroll() {
    onChange(rerollBuilderClass(builderClass));
  }

  return (
    <div className="class-picker">
      <p className="gen-section-label">BUILDER CLASS //</p>
      <div className="class-picker__row">
        <div className="class-picker__display">
          <span className="class-picker__badge">◈</span>
          <span className="class-picker__value">{builderClass || '...'}</span>
        </div>
        <button
          className="class-picker__reroll"
          id="reroll-btn"
          onClick={reroll}
          title="Roll again"
          aria-label="Roll a new builder class"
        >
          ⚄ REROLL
        </button>
      </div>
      <p className="class-picker__hint">Auto-assigned. Eerily accurate.</p>
    </div>
  );
}
