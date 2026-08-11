import { useRef, useEffect, useCallback, useState } from 'react';
import { renderCard } from '../../lib/cardRenderer.js';

export default function BuilderCardPreview({ state }) {
  const canvasRef = useRef(null);
  const renderIdRef = useRef(0);
  const [rendering, setRendering] = useState(false);

  const redraw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const id = ++renderIdRef.current;
    setRendering(true);
    try {
      await renderCard(canvas, state, { width: 1200, height: 675 });
    } catch (e) {
      console.error('Card render error:', e);
    } finally {
      if (renderIdRef.current === id) setRendering(false);
    }
  }, [state]);

  useEffect(() => { redraw(); }, [redraw]);

  return (
    <div className="card-preview">
      <div className="card-preview__frame">
        <canvas
          ref={canvasRef}
          className="card-preview__canvas"
          aria-label="Builder ID card preview"
        />
        {rendering && (
          <div className="card-preview__overlay">
            <span className="card-preview__status">COMPOSING...</span>
          </div>
        )}
      </div>
      <p className="card-preview__hint">
        LIVE PREVIEW — updates as you type
      </p>
    </div>
  );
}
