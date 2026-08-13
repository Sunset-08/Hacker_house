import { useState } from 'react';
import { rerollBuilderClass } from '../../lib/builderClasses.js';

/* ── SVG dice face (simple geometric, 3 visible faces) ──── */
function DiceIcon({ rolling }) {
  return (
    <svg
      className={`dice-icon${rolling ? ' dice-icon--rolling' : ''}`}
      viewBox="0 0 48 48"
      width="28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top face — lighter green */}
      <path d="M24 6 L42 16 L24 26 L6 16 Z" fill="#1a6b30" stroke="var(--hh-yellow)" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Left face — darkest */}
      <path d="M6 16 L24 26 L24 44 L6 34 Z" fill="#093B18" stroke="var(--hh-yellow)" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Right face — mid green */}
      <path d="M24 26 L42 16 L42 34 L24 44 Z" fill="#0c4a1e" stroke="var(--hh-yellow)" strokeWidth="1.2" strokeLinejoin="round" />

      {/* Dots — top face (3 showing) */}
      <circle cx="18" cy="14" r="1.8" fill="var(--hh-yellow)" />
      <circle cx="24" cy="16" r="1.8" fill="var(--hh-yellow)" />
      <circle cx="30" cy="14" r="1.8" fill="var(--hh-yellow)" />

      {/* Dots — left face (2 showing) */}
      <circle cx="13" cy="22" r="1.6" fill="var(--hh-pink)" />
      <circle cx="17" cy="33" r="1.6" fill="var(--hh-pink)" />

      {/* Dots — right face (1 showing) */}
      <circle cx="33" cy="30" r="1.8" fill="var(--hh-cream)" opacity="0.7" />
    </svg>
  );
}

export default function BuilderClassPicker({ builderClass, onChange }) {
  const [rolling, setRolling] = useState(false);

  function reroll() {
    if (rolling) return;
    setRolling(true);
    // Brief animation, then land on the new class
    setTimeout(() => {
      onChange(rerollBuilderClass(builderClass));
      setRolling(false);
    }, 420);
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
          className={`dice-btn${rolling ? ' dice-btn--rolling' : ''}`}
          id="reroll-btn"
          onClick={reroll}
          title="Roll again"
          aria-label="Roll a new builder class"
          disabled={rolling}
        >
          <DiceIcon rolling={rolling} />
          <span className="dice-btn__label">REROLL</span>
        </button>
      </div>
      <p className="class-picker__hint">Auto-assigned. Eerily accurate.</p>
    </div>
  );
}
