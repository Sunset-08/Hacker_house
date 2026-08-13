/**
 * TemplateRenderer.jsx
 * ============================================================
 * HTML/CSS-based live preview renderer with 3D card flip.
 *
 * Architecture:
 *   .tr-flip-scene      → perspective container (no overflow:hidden)
 *   .tr-flip-card       → the 3D card, rotates on Y axis
 *   .tr-flip-face       → front face (all overlays live here)
 *   .tr-flip-face--back → back face (just the _back.png)
 *
 * Key constraints:
 *   - overflow:hidden must NOT be on the preserve-3d element
 *   - Each face clips its own overflow independently
 *   - Coordinates stored in original px, converted to % → scales perfectly
 */
import { useEffect, useRef, useState } from 'react';
import './TemplateRenderer.css';
import { TEMPLATE_COORDS, DEBUG_OVERLAYS, CALIBRATION_MODE, pct } from '../../lib/TEMPLATE_COORDS.js';
import { makeQRCanvas, buildQRPayload } from '../../lib/qr.js';
import FrameCalibrator from './FrameCalibrator.jsx';

/* ── Template image imports (Vite hashes these for cache-busting) ── */
import hackerHouseImg      from '../templates/Hacker_House.png';
import hackerHouseBackImg  from '../templates/Hacker_House_back.png';
import beachImg            from '../templates/Beach.png';
import beachBackImg        from '../templates/Beach_back.png';
import minimalImg          from '../templates/Minimal.png';
import minimalBackImg      from '../templates/Minimal_back.png';
import boardingPassImg     from '../templates/Boarding_Pass.png';
import boardingPassBackImg from '../templates/Boarding_Pass_back.png';

const TEMPLATE_IMAGES = {
  'hacker-house':  { front: hackerHouseImg,  back: hackerHouseBackImg },
  'beach':         { front: beachImg,         back: beachBackImg },
  'minimal':       { front: minimalImg,       back: minimalBackImg },
  'boarding-pass': { front: boardingPassImg,  back: boardingPassBackImg },
};

/* ── Responsive width tracker ───────────────────────────────────── */
function useElementWidth(ref) {
  const [width, setWidth] = useState(480);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

/* ── QR generator (async, only fires when builderId exists) ─────── */
function useQRDataUrl(builderId, qrConfig) {
  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    if (!builderId?.trim()) { setDataUrl(null); return; }
    let cancelled = false;
    (async () => {
      try {
        const size  = qrConfig ? Math.min(qrConfig.w, qrConfig.h) * 2 : 400;
        const dark  = qrConfig?.dark  || '#0c4a1e';
        const light = qrConfig?.light || '#ffffff';
        const cv = await makeQRCanvas(buildQRPayload(builderId.trim()), { size, dark, light });
        if (!cancelled) setDataUrl(cv.toDataURL('image/png'));
      } catch (_) { if (!cancelled) setDataUrl(null); }
    })();
    return () => { cancelled = true; };
  }, [builderId, qrConfig]);
  return dataUrl;
}

/* ── px coord → CSS % ───────────────────────────────────────────── */
function slot(s, W, H) {
  return { left: pct(s.x, W), top: pct(s.y, H), width: pct(s.w, W), height: pct(s.h, H) };
}
/* ── Photo frame slot — uses photoFrame (authoritative) or falls back to photo ─ */
function photoSlot(coords, W, H, scale) {
  const frame = coords.photoFrame || coords.photo;
  const radiusPx = frame.radius || 0;
  const pos = slot(frame, W, H);
  // Calculate border radius in pixels scaled to the preview size
  return { ...pos, borderRadius: `${radiusPx * scale}px`, overflow: 'hidden' };
}
/* ── Component ──────────────────────────────────────────────────── */
export default function TemplateRenderer({ state, flipped = false }) {
  const mode   = state.mode || 'hacker-house';
  const coords = TEMPLATE_COORDS[mode] || TEMPLATE_COORDS['hacker-house'];
  const assets = TEMPLATE_IMAGES[mode] || TEMPLATE_IMAGES['hacker-house'];
  const { W, H } = coords;
  const sceneRef   = useRef(null);
  const sceneWidth = useElementWidth(sceneRef);
  const qrDataUrl  = useQRDataUrl(state.builderId, coords.qr);

  const scale      = sceneWidth > 0 ? sceneWidth / W : 1;
  const isLandscape = W > H;
  const dbg        = DEBUG_OVERLAYS ? ' tr-debug' : '';
  const isCalibrating = CALIBRATION_MODE || (typeof window !== 'undefined' && window.location.search.includes('calibrate=1'));

  function fs(field) {
    return { '--tr-fs': `${Math.max(7, Math.round(field.fontSize * scale))}px`,
             '--tr-color': field.color, '--tr-fw': field.fontWeight };
  }
  function textStyle(field) {
    return { ...slot(field, W, H), justifyContent: field.align === 'center' ? 'center' : 'flex-start', ...fs(field) };
  }
  function dbgAttr(label, s) {
    return DEBUG_OVERLAYS ? { 'data-debug': `${label} (${s.x},${s.y} ${s.w}×${s.h})` } : {};
  }

  return (
    <div
      ref={sceneRef}
      className={`tr-scene${isLandscape ? ' tr-scene--landscape' : ''}`}
      style={{ '--tr-ar': `${W} / ${H}` }}
    >
      <div className={`tr-flipcard${flipped ? ' tr-flipcard--flipped' : ''}`}>

        {/* ══════════════════════════════════════════════════════ */}
        {/* FRONT FACE                                            */}
        {/* ══════════════════════════════════════════════════════ */}
        <div className="tr-face tr-face--front">

          {/* Layer 1: template artwork — fills 100% of face */}
          <img className="tr-bg" src={assets.front} alt={`${coords.label} template`} draggable={false} />

          {/* Layer 2: user photo (only when provided) */}
          {state.photo && (
            <div className={`tr-slot tr-photo${dbg}`} 
                 style={photoSlot(coords, W, H, scale)} 
                 {...dbgAttr('photo', coords.photoFrame || coords.photo)}>
              <img src={state.photo.src} alt="Builder photo" draggable={false}
                   style={{ objectPosition: coords.photo.objectPosition || '50% 18%' }} />
            </div>
          )}

          {/* Layer 3: name */}
          {state.name?.trim() && (
            <div className={`tr-slot tr-text${dbg}`} style={textStyle(coords.name)} {...dbgAttr('name', coords.name)}>
              <span>{state.name.trim().toUpperCase()}</span>
            </div>
          )}

          {/* Layer 4: builder ID */}
          {state.builderId?.trim() && coords.builderId && (
            <div className={`tr-slot tr-text${dbg}`} style={textStyle(coords.builderId)} {...dbgAttr('builderId', coords.builderId)}>
              <span>{state.builderId.trim()}</span>
            </div>
          )}

          {/* Layer 5: stack / role */}
          {state.stack?.trim() && coords.stack && (
            <div className={`tr-slot tr-text${dbg}`} style={textStyle(coords.stack)} {...dbgAttr('stack', coords.stack)}>
              <span>{state.stack.trim().toUpperCase()}</span>
            </div>
          )}

          {/* Layer 6: builder class */}
          {state.builderClass?.trim() && coords.builderClass && (
            <div className={`tr-slot tr-text${dbg}`} style={textStyle(coords.builderClass)} {...dbgAttr('builderClass', coords.builderClass)}>
              <span>{state.builderClass.trim().toUpperCase()}</span>
            </div>
          )}

          {/* Layer 7: bio */}
          {state.bio?.trim() && coords.bio && (
            <div className={`tr-slot tr-text${dbg}`} style={textStyle(coords.bio)} {...dbgAttr('bio', coords.bio)}>
              <span>{state.bio.trim()}</span>
            </div>
          )}

          {/* Layer 8: QR code */}
          {qrDataUrl && (
            <div className={`tr-slot tr-qr${dbg}`} style={slot(coords.qr, W, H)} {...dbgAttr('qr', coords.qr)}>
              <img src={qrDataUrl} alt="QR verification code" draggable={false} />
            </div>
          )}

          {isCalibrating && (
            <FrameCalibrator W={W} H={H} initialFrame={photoFrame} scale={scale} />
          )}

        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* BACK FACE                                             */}
        {/* ══════════════════════════════════════════════════════ */}
        <div className="tr-face tr-face--back">
          <img className="tr-bg" src={assets.back} alt={`${coords.label} back template`} draggable={false} />
        </div>

      </div>
    </div>
  );
}
