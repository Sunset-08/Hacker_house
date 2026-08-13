import { useState, useEffect, useRef } from 'react';

/**
 * Developer-only tool to visually calibrate the photo frame.
 * Renders a draggable/resizable box overlay.
 */
export default function FrameCalibrator({ W, H, initialFrame, scale }) {
  const [frame, setFrame] = useState({
    x: initialFrame?.x || 100,
    y: initialFrame?.y || 100,
    w: initialFrame?.w || 300,
    h: initialFrame?.h || 300,
    radius: initialFrame?.radius || 0
  });

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startFrame, setStartFrame] = useState({ ...frame });

  const handlePointerDown = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartFrame({ ...frame });
    if (type === 'drag') setDragging(true);
    if (type === 'resize') setResizing(true);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragging && !resizing) return;
      const dx = (e.clientX - startPos.x) / scale;
      const dy = (e.clientY - startPos.y) / scale;

      if (dragging) {
        setFrame({
          ...startFrame,
          x: Math.round(startFrame.x + dx),
          y: Math.round(startFrame.y + dy)
        });
      } else if (resizing) {
        setFrame({
          ...startFrame,
          w: Math.max(20, Math.round(startFrame.w + dx)),
          h: Math.max(20, Math.round(startFrame.h + dy))
        });
      }
    };

    const handlePointerUp = () => {
      setDragging(false);
      setResizing(false);
    };

    if (dragging || resizing) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, resizing, startPos, startFrame, scale]);

  const outputStr = `
  photoFrame: {
    x:      ${frame.x},
    y:      ${frame.y},
    w:      ${frame.w},
    h:      ${frame.h},
    radius: ${frame.radius},
  },
  `;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: `${(frame.x / W) * 100}%`,
          top: `${(frame.y / H) * 100}%`,
          width: `${(frame.w / W) * 100}%`,
          height: `${(frame.h / H) * 100}%`,
          border: '3px solid #ff00ff',
          backgroundColor: 'rgba(255, 0, 255, 0.2)',
          zIndex: 9999,
          cursor: dragging ? 'grabbing' : 'grab',
          borderRadius: `${(frame.radius / H) * 100}%`
        }}
        onPointerDown={(e) => handlePointerDown(e, 'drag')}
      >
        {/* Resize Handle */}
        <div
          style={{
            position: 'absolute',
            right: '-6px',
            bottom: '-6px',
            width: '12px',
            height: '12px',
            backgroundColor: '#fff',
            border: '2px solid #ff00ff',
            cursor: 'nwse-resize',
            borderRadius: '50%'
          }}
          onPointerDown={(e) => handlePointerDown(e, 'resize')}
        />
        
        {/* Radius controls */}
        <div 
          style={{ position: 'absolute', top: -30, left: 0, background: '#000', color: '#fff', padding: '2px 6px', fontSize: '10px', display: 'flex', gap: '5px' }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Radius: 
          <button onClick={() => setFrame(f => ({ ...f, radius: Math.max(0, f.radius - 2) }))}>-</button>
          {frame.radius}
          <button onClick={() => setFrame(f => ({ ...f, radius: f.radius + 2 }))}>+</button>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.85)',
        color: '#0f0',
        padding: '12px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 10000,
        borderRadius: '6px',
        whiteSpace: 'pre'
      }}>
        <div>CALIBRATION MODE</div>
        {outputStr}
      </div>
    </>
  );
}
