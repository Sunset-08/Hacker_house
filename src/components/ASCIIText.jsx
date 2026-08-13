import { useEffect, useRef } from 'react';

/**
 * ASCIIText — ported and enhanced from
 * https://codepen.io/JuanFuentes/pen/eYEeoyE
 *
 * Renders text as an ASCII/scanline canvas effect with
 * chromatic aberration (cyan/magenta offset layers).
 * Used as a decorative overlay in the hero section.
 */

const ASCII_CHARS = '01アイウエオカキクケコサシスセソタチツテトHACKERHOUSEGOA2026';

function getCharDensity(brightness) {
  const index = Math.floor((1 - brightness) * (ASCII_CHARS.length - 1));
  return ASCII_CHARS[Math.max(0, Math.min(ASCII_CHARS.length - 1, index))];
}

export default function ASCIIText({
  text = 'HACKER',
  fontSize = 120,
  cellSize = 6,
  color = '#f0c72a',
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const offscreenRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const offscreen = document.createElement('canvas');
    offscreenRef.current = offscreen;
    const octx = offscreen.getContext('2d', { willReadFrequently: true });

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width  = rect.width  || 800;
      canvas.height = rect.height || 220;
      offscreen.width  = canvas.width;
      offscreen.height = canvas.height;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const draw = (timestamp) => {
      const dt = timestamp - timeRef.current;
      timeRef.current = timestamp;
      const t = timestamp * 0.001;

      const W = canvas.width;
      const H = canvas.height;

      // --- draw text to offscreen ---
      octx.clearRect(0, 0, W, H);
      octx.fillStyle = '#000';
      octx.fillRect(0, 0, W, H);

      const dynamicSize = Math.min(fontSize, W * 0.18);
      octx.font = `900 ${dynamicSize}px 'Playfair Display', Georgia, serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';

      // subtle wave distortion on each letter
      const words = text.split('\n');
      const lineH = dynamicSize * 1.15;
      const startY = H / 2 - ((words.length - 1) * lineH) / 2;
      words.forEach((word, wi) => {
        octx.fillText(word.toUpperCase(), W / 2, startY + wi * lineH);
      });

      // --- read pixels ---
      const imageData = octx.getImageData(0, 0, W, H);
      const pixels = imageData.data;

      // --- render ASCII to main canvas ---
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(0,0,0,0)'; // transparent bg

      const cols = Math.ceil(W / cellSize);
      const rows = Math.ceil(H / cellSize);

      ctx.font = `${cellSize * 1.1}px 'Space Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * cellSize;
          const py = row * cellSize;
          const idx = (py * W + px) * 4;

          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          const brightness = (r + g + b) / (3 * 255);

          if (brightness < 0.04) continue;

          const ch = getCharDensity(brightness);

          // chromatic aberration layers
          const aberr = Math.sin(t * 0.7 + row * 0.15) * 1.5;

          // cyan layer
          ctx.fillStyle = `rgba(0, 255, 210, ${brightness * 0.55})`;
          ctx.fillText(ch, px - aberr, py + cellSize / 2);

          // magenta layer
          ctx.fillStyle = `rgba(255, 46, 139, ${brightness * 0.55})`;
          ctx.fillText(ch, px + aberr, py + cellSize / 2);

          // main color layer
          ctx.fillStyle = color;
          ctx.globalAlpha = brightness * 0.92 + Math.sin(t * 2 + col * 0.3) * 0.04;
          ctx.fillText(ch, px, py + cellSize / 2);
          ctx.globalAlpha = 1;
        }
      }

      // scanline overlay
      for (let y = 0; y < H; y += cellSize * 2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.fillRect(0, y, W, 1);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [text, fontSize, cellSize, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        ...style,
      }}
      aria-label={text}
    />
  );
}
