/**
 * BuilderCardPreview.jsx
 * ============================================================
 * Live preview panel for the ID card generator.
 *
 * Uses the HTML/CSS-based TemplateRenderer for the live preview —
 * pixel-perfect, responsive, and zero drift.
 *
 * The canvas-based renderCard / renderCardBack is kept for
 * the DOWNLOAD path in GeneratorActions.jsx.
 */
import { useState, useEffect } from 'react';
import TemplateRenderer from './TemplateRenderer.jsx';

export default function BuilderCardPreview({ state }) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip state when the template changes
  useEffect(() => {
    setFlipped(false);
  }, [state.mode]);

  return (
    <div className="card-preview">

      {/* Header */}
      <div className="card-preview__header">
        <span className="card-preview__label">LIVE PREVIEW //</span>
        <span className="card-preview__status-dot">● REALTIME</span>
      </div>

      {/* Card face (TemplateRenderer now handles the 3D flip internally) */}
      <TemplateRenderer state={state} flipped={flipped} />

      {/* Controls */}
      <div className="card-preview__controls">
        <button
          className="card-flip-btn"
          id="flip-card-btn"
          onClick={() => setFlipped(f => !f)}
          aria-label={flipped ? 'Show card front' : 'Flip card to see back'}
        >
          {flipped ? '← SHOW FRONT' : 'FLIP CARD ↻'}
        </button>
        <p className="card-preview__hint">
          {flipped ? 'BACK — BUILDER CREDENTIAL' : 'FRONT — EVENT IDENTITY PASS'}
        </p>
      </div>
    </div>
  );
}
