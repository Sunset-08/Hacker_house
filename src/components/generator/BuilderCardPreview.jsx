import { useRef, useEffect, useCallback, useState } from 'react';
import { renderCard, renderCardBack, getTemplateDimensions } from '../../lib/cardRenderer.js';

export default function BuilderCardPreview({ state }) {
  const frontRef    = useRef(null);
  const backRef     = useRef(null);
  const renderIdRef = useRef(0);
  const [rendering, setRendering] = useState(false);
  const [flipped, setFlipped]     = useState(false);

  const redraw = useCallback(async () => {
    const id = ++renderIdRef.current;
    setRendering(true);
    try {
      const dims = getTemplateDimensions(state.mode);
      const opts = { width: dims.width, height: dims.height };
      await Promise.all([
        frontRef.current && renderCard(frontRef.current, state, opts),
        backRef.current  && renderCardBack(backRef.current, state, opts),
      ]);
    } catch (e) {
      console.error('Card render error:', e);
    } finally {
      if (renderIdRef.current === id) setRendering(false);
    }
  }, [state]);

  useEffect(() => { redraw(); }, [redraw]);

  return (
    <div className="card-preview">

      {/* Hanging tag */}
      <div className="card-tag-area" aria-hidden="true">
        <div className="card-tag">
          <div className="card-tag__badge">HH GOA · 2026</div>
          <div className="card-tag__loop" />
          <div className="card-tag__string" />
        </div>
      </div>

      {/* 3D flip container */}
      <div className="card-flip-outer">
        <div className={`card-flip-inner${flipped ? ' card-flip-inner--flipped' : ''}`}>

          {/* FRONT */}
          <div className="card-flip__face card-flip__front">
            <div className="card-preview__frame">
              <canvas ref={frontRef} className="card-preview__canvas" aria-label="Builder ID — front" />
              {rendering && (
                <div className="card-preview__overlay">
                  <span className="card-preview__status">COMPOSING...</span>
                </div>
              )}
            </div>
          </div>

          {/* BACK */}
          <div className="card-flip__face card-flip__back">
            <div className="card-preview__frame">
              <canvas ref={backRef} className="card-preview__canvas" aria-label="Builder ID — back" />
            </div>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="card-preview__controls">
        <button className="card-flip-btn" id="flip-card-btn"
          onClick={() => setFlipped(f => !f)}
          aria-label={flipped ? 'Show card front' : 'Flip card to see back'}>
          {flipped ? '← FRONT' : 'FLIP ID ↻'}
        </button>
        <p className="card-preview__hint">
          {flipped ? 'BACK — builder file' : 'LIVE PREVIEW — updates as you type'}
        </p>
      </div>

    </div>
  );
}
