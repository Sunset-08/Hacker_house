/** Cover-fit an image into a rect (bias top for portrait photos) */
export function drawImageCover(ctx, img, x, y, w, h, topBias = 0.25) {
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

/** Clip to arch shape (semicircle top + rectangle body) */
export function clipArch(ctx, x, y, w, h) {
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
}

/** Rounded rectangle path */
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

/** Wrap text, return array of lines */
export function wrapText(ctx, text, maxWidth) {
  const words = (text || '').split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draw azulejo tile strip */
export function drawTileStrip(ctx, x, y, w, h, colors) {
  const sz = h;
  for (let tx = x; tx < x + w; tx += sz) {
    ctx.fillStyle = colors[0];
    ctx.fillRect(tx, y, sz, sz);
    ctx.fillStyle = colors[1];
    const q = sz / 4;
    ctx.fillRect(tx + q, y, q * 2, sz);
    ctx.fillRect(tx, y + q, sz, q * 2);
    ctx.fillStyle = colors[0];
    ctx.fillRect(tx, y, q, q);
    ctx.fillRect(tx + q * 3, y, q, q);
    ctx.fillRect(tx, y + q * 3, q, q);
    ctx.fillRect(tx + q * 3, y + q * 3, q, q);
    // center diamond accent
    ctx.fillStyle = colors[2] || colors[1];
    const c = sz / 2;
    ctx.beginPath();
    ctx.moveTo(tx + c, y + q);
    ctx.lineTo(tx + q * 3, y + c);
    ctx.lineTo(tx + c, y + q * 3);
    ctx.lineTo(tx + q, y + c);
    ctx.closePath();
    ctx.fill();
  }
}

/** Draw simple palm tree at (x, groundY) with height h */
export function drawPalm(ctx, x, groundY, h, color) {
  ctx.fillStyle = color;
  // trunk
  ctx.beginPath();
  ctx.moveTo(x - 5, groundY);
  ctx.quadraticCurveTo(x + 8, groundY - h * 0.5, x, groundY - h);
  ctx.quadraticCurveTo(x - 8, groundY - h * 0.5, x + 5, groundY);
  ctx.fill();
  // fronds
  const fx = x, fy = groundY - h;
  const fronds = [[-50,-20],[50,-15],[-30,-40],[30,-45],[0,-55]];
  for (const [dx, dy] of fronds) {
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.quadraticCurveTo(fx + dx * 0.5, fy + dy * 0.5 - 10, fx + dx, fy + dy);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

/** Draw graph-paper grid */
export function drawGrid(ctx, w, h, spacing, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += spacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += spacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

/** Diagonal CLASSIFIED-style stamp */
export function drawStamp(ctx, cx, cy, text, color, angle = -0.45, size = 64) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.font = `900 ${size}px "Playfair Display", serif`;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.18;
  ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);
  ctx.globalAlpha = 1;
  ctx.restore();
}

/** Generate deterministic builder ID from name */
export function generateBuilderId(name) {
  const seed = (name || 'ANON').toUpperCase().split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hex = (seed * 2654435761 >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const ts = Date.now().toString(36).slice(-4).toUpperCase();
  return `HHG-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${ts}`;
}
