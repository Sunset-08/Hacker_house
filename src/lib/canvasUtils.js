/**
 * Shared canvas primitives used by all portrait templates.
 * Import these in template render functions for consistent quality.
 */

// ── Image fitting ─────────────────────────────────────────────────────────────

/** Cover-fit image into rect. topBias=0 is centred, 0.2 favours face area */
export function drawImageCover(ctx, img, x, y, w, h, topBias = 0.2) {
  if (!img) return;
  const iA = img.width / img.height;
  const tA = w / h;
  let sx, sy, sw, sh;
  if (iA > tA) {
    sh = img.height; sw = sh * tA;
    sx = (img.width - sw) / 2; sy = 0;
  } else {
    sw = img.width; sh = sw / tA;
    sx = 0; sy = Math.max(0, (img.height - sh) * topBias);
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/** Circular photo mask */
export function drawCirclePhoto(ctx, img, cx, cy, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  if (img) drawImageCover(ctx, img, cx - r, cy - r, r * 2, r * 2, 0.15);
  else {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
  ctx.restore();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();
}

/** Arch-clipped photo (semicircle top + rectangle body) */
export function drawArchPhoto(ctx, img, x, y, w, h) {
  const r = w / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.clip();
  if (img) drawImageCover(ctx, img, x, y, w, h, 0.15);
  else {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();
}

// ── Text ──────────────────────────────────────────────────────────────────────

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

/** Draw text, auto-shrink font size if too wide */
export function drawFitText(ctx, text, x, y, maxW, font, fillStyle) {
  let size = parseInt(font);
  const family = font.replace(/^\d+px\s*/, '');
  ctx.fillStyle = fillStyle;
  while (size > 10) {
    ctx.font = `${size}px ${family}`;
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

// ── Decorative ────────────────────────────────────────────────────────────────

/** Portrait azulejo tile strip */
export function drawTileStrip(ctx, x, y, w, h, colors) {
  const sz = h;
  for (let tx = x; tx < x + w; tx += sz) {
    ctx.fillStyle = colors[0]; ctx.fillRect(tx, y, sz, sz);
    ctx.fillStyle = colors[1];
    const q = sz / 4;
    ctx.fillRect(tx + q, y, q * 2, sz);
    ctx.fillRect(tx, y + q, sz, q * 2);
    ctx.fillStyle = colors[0];
    ctx.fillRect(tx, y, q, q);
    ctx.fillRect(tx + q * 3, y, q, q);
    ctx.fillRect(tx, y + q * 3, q, q);
    ctx.fillRect(tx + q * 3, y + q * 3, q, q);
    ctx.fillStyle = colors[2] || colors[1];
    const c = sz / 2;
    ctx.beginPath();
    ctx.moveTo(tx + c, y + q); ctx.lineTo(tx + q * 3, y + c);
    ctx.lineTo(tx + c, y + q * 3); ctx.lineTo(tx + q, y + c);
    ctx.closePath(); ctx.fill();
  }
}

/** Draw a palm tree silhouette */
export function drawPalm(ctx, x, groundY, h, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - 5, groundY);
  ctx.quadraticCurveTo(x + 8, groundY - h * 0.5, x, groundY - h);
  ctx.quadraticCurveTo(x - 8, groundY - h * 0.5, x + 5, groundY);
  ctx.fill();
  const fronds = [[-50,-20],[50,-15],[-30,-40],[30,-45],[0,-55]];
  for (const [dx, dy] of fronds) {
    ctx.beginPath();
    ctx.moveTo(x, groundY - h);
    ctx.quadraticCurveTo(x + dx * 0.5, groundY - h + dy * 0.5 - 10, x + dx, groundY - h + dy);
    ctx.lineWidth = 4; ctx.strokeStyle = color; ctx.stroke();
  }
}

/** Graph-paper grid texture */
export function drawGrid(ctx, w, h, spacing, color) {
  ctx.strokeStyle = color; ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += spacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += spacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

/** Diagonal stamp text (VERIFIED, BUILDER, etc.) */
export function drawStamp(ctx, cx, cy, text, color, angle = -0.4, size = 72) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.font = `900 ${size}px "Playfair Display", serif`;
  ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.globalAlpha = 0.15;
  ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ── Lanyard Slot (portrait format) ───────────────────────────────────────────

/**
 * Draw the physical punch/lanyard slot at top-center.
 * Portrait cards use an elongated capsule shape, not a circle.
 */
export function drawLanyardSlot(ctx, cardW, y = 22) {
  const slotW = 56, slotH = 20, r = slotH / 2;
  const sx = (cardW - slotW) / 2;

  // Outer rim with shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 5;
  roundRect(ctx, sx - 3, y - 3, slotW + 6, slotH + 6, r + 3);
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fill();
  ctx.restore();

  // Inner dark hole
  roundRect(ctx, sx, y, slotW, slotH, r);
  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.fill();

  // Metal rim
  roundRect(ctx, sx, y, slotW, slotH, r);
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Specular glint top-left
  ctx.beginPath();
  ctx.arc(sx + r + 3, y + 4, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fill();
}

// ── Builder ID ────────────────────────────────────────────────────────────────

export function generateBuilderId(name) {
  const seed = (name || 'ANON').toUpperCase().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hex = (seed * 2654435761 >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const ts = Date.now().toString(36).slice(-4).toUpperCase();
  return `HHG-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${ts}`;
}
