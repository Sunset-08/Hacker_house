/**
 * Shared canvas primitives used by all portrait templates.
 * Import these in template render functions for consistent quality.
 */

// ── Image fitting with Photo Crop Support ─────────────────────────────────────

/**
 * Cover-fit image into rect with user crop controls.
 */
export function drawImageCover(ctx, img, x, y, w, h, topBias = 0.2, crop = {}) {
  if (!img) return;
  const zoom = crop.zoom || 1;
  const offX = crop.offsetX || 0;
  const offY = crop.offsetY || 0;

  const iA = img.width / img.height;
  const tA = w / h;
  let sx, sy, sw, sh;

  if (iA > tA) {
    sh = img.height / zoom;
    sw = sh * tA;
    const maxSx = img.width - sw;
    sx = (img.width - sw) / 2 + offX * maxSx;
    sy = (img.height - sh) * topBias + offY * (img.height - sh);
  } else {
    sw = img.width / zoom;
    sh = sw / tA;
    const maxSy = img.height - sh;
    sx = (img.width - sw) / 2 + offX * (img.width - sw);
    sy = Math.max(0, (img.height - sh) * topBias + offY * maxSy);
  }

  // Clamp source bounds to avoid drawing empty space
  sw = Math.min(img.width, Math.max(10, sw));
  sh = Math.min(img.height, Math.max(10, sh));
  sx = Math.max(0, Math.min(img.width - sw, sx));
  sy = Math.max(0, Math.min(img.height - sh, sy));

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/** Circular photo mask */
export function drawCirclePhoto(ctx, img, cx, cy, r, crop = {}) {
  if (!img) return; // Do not draw placeholder circle/dark fill if no image
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  drawImageCover(ctx, img, cx - r, cy - r, r * 2, r * 2, 0.15, crop);
  ctx.restore();
}

/** Arch-clipped photo (semicircle top + rectangle body) */
export function drawArchPhoto(ctx, img, x, y, w, h, crop = {}) {
  if (!img) return; // Do not draw dark arch background or placeholder text if no image
  const r = w / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.clip();
  drawImageCover(ctx, img, x, y, w, h, 0.15, crop);
  ctx.restore();
}

/** Rounded rectangle photo mask */
export function drawRectPhoto(ctx, img, x, y, w, h, radius = 12, crop = {}) {
  if (!img) return; // Do not draw dark rect background or placeholder text if no image
  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();
  drawImageCover(ctx, img, x, y, w, h, 0.15, crop);
  ctx.restore();
}

// ── Text & Typography Auto-Fitting ────────────────────────────────────────────

/** Wrap text to maxWidth, return array of line strings */
export function wrapText(ctx, text, maxWidth) {
  const words = (text || '').split(' ');
  const lines = []; let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line); line = word;
    } else { line = test; }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draw text, auto-shrink font size if too wide.
 *  Accepts full CSS font strings like 'bold 52px "Space Mono"' or '52px "Space Mono"'.
 */
export function drawFitText(ctx, text, x, y, maxW, font, fillStyle) {
  // Extract numeric px size from strings like 'bold 52px ...' or '900 36px ...'
  const sizeMatch = font.match(/(\d+)px/);
  let size = sizeMatch ? parseInt(sizeMatch[1], 10) : 24;
  // Extract the weight+family portion, e.g. 'bold "Space Mono"' or '900 "Space Mono"'
  const weightAndFamily = font.replace(/\d+px\s*/, '');
  ctx.fillStyle = fillStyle;
  while (size > 10) {
    ctx.font = `${size}px ${weightAndFamily}`;
    if (ctx.measureText(text).width <= maxW) break;
    size -= 2;
  }
  ctx.fillText(text, x, y);
  return size;
}

// ── Shapes ────────────────────────────────────────────────────────────────────

export function roundRect(ctx, x, y, w, h, r = 4) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Rounded card background with corner radius */
export function drawCardBackground(ctx, w, h, color, radius = 28) {
  roundRect(ctx, 0, 0, w, h, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

// ── Lanyard Slot (portrait format) ───────────────────────────────────────────

export function drawLanyardSlot(ctx, cardW, y = 22) {
  const slotW = 56, slotH = 20, r = slotH / 2;
  const sx = (cardW - slotW) / 2;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 5;
  roundRect(ctx, sx - 3, y - 3, slotW + 6, slotH + 6, r + 3);
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fill();
  ctx.restore();

  roundRect(ctx, sx, y, slotW, slotH, r);
  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.fill();

  roundRect(ctx, sx, y, slotW, slotH, r);
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sx + r + 3, y + 4, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fill();
}

// ── Builder ID Generator ──────────────────────────────────────────────────────

export function generateBuilderId(name) {
  const cleanName = (name || 'BUILDER').toUpperCase().replace(/[^A-Z]/g, '');
  const slug = cleanName.slice(0, 7) || 'BUILDER';
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH26-${slug}-${num}`;
}
