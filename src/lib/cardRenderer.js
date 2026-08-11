import { makeQRCanvas, buildQRPayload } from './qr.js';
import {
  drawImageCover, clipArch, roundRect, wrapText,
  drawTileStrip, drawPalm, drawGrid, drawStamp,
} from './canvasUtils.js';

const W = 1200, H = 675;

async function ensureFonts() {
  await document.fonts.ready;
}

// ─── MODE 01: GOAN ART ──────────────────────────────────────────────────────
async function renderGoan(ctx, state, t) {
  const { photo, name, stack, bio, team, builderClass, builderId } = state;

  // --- Sky gradient ---
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0,   t.bg);
  sky.addColorStop(0.6, t.panel);
  sky.addColorStop(1,   '#1a7a6e');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Sea band
  ctx.fillStyle = '#1a7a6e';
  ctx.fillRect(0, H * 0.58, W, H * 0.15);
  // Sand
  const sand = ctx.createLinearGradient(0, H * 0.72, 0, H);
  sand.addColorStop(0, '#c9a55c');
  sand.addColorStop(1, '#a07c38');
  ctx.fillStyle = sand;
  ctx.fillRect(0, H * 0.72, W, H * 0.28);

  // Tile borders
  const tileColors = ['#1a4a9e', '#f5f0dc', t.primary];
  drawTileStrip(ctx, 0, 0, W, 28, tileColors);
  drawTileStrip(ctx, 0, H - 28, W, 28, tileColors);

  // Palm trees (bg decoration)
  drawPalm(ctx, W * 0.72, H * 0.74, 200, 'rgba(5,30,12,0.7)');
  drawPalm(ctx, W * 0.85, H * 0.72, 170, 'rgba(5,30,12,0.55)');

  // Background arch (decorative, large, centered)
  ctx.strokeStyle = `rgba(240,199,42,0.12)`;
  ctx.lineWidth = 2;
  const bAW = 320, bAX = W * 0.42 - bAW / 2, bAY = H * 0.1, bAH = H * 0.65;
  ctx.beginPath();
  ctx.moveTo(bAX, bAY + bAW / 2);
  ctx.arc(bAX + bAW / 2, bAY + bAW / 2, bAW / 2, Math.PI, 0);
  ctx.lineTo(bAX + bAW, bAY + bAH);
  ctx.lineTo(bAX, bAY + bAH);
  ctx.stroke();

  // Photo in arch frame (left)
  const pX = 52, pY = 44, pW = 270, pH = 490;
  ctx.save();
  clipArch(ctx, pX, pY, pW, pH);
  ctx.clip();
  if (photo) {
    drawImageCover(ctx, photo, pX, pY, pW, pH, 0.2);
  } else {
    ctx.fillStyle = t.panel;
    ctx.fillRect(pX, pY, pW, pH);
    ctx.fillStyle = t.textMuted;
    ctx.font = `700 14px "Space Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('YOUR PHOTO', pX + pW / 2, pY + pH / 2);
  }
  ctx.restore();
  // Arch border
  ctx.strokeStyle = t.primary;
  ctx.lineWidth = 2.5;
  clipArch(ctx, pX, pY, pW, pH);
  ctx.stroke();

  // Right content area  (x from 360)
  const cX = 370, cW = W - cX - 40;

  // HH GOA badge (top right)
  ctx.fillStyle = t.primary;
  roundRect(ctx, W - 180, 40, 140, 32, 2);
  ctx.fill();
  ctx.fillStyle = t.textDark;
  ctx.font = `700 11px "Space Mono"`;
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026 EDITION', W - 110, 61);

  // Name
  ctx.textAlign = 'left';
  ctx.fillStyle = t.primary;
  ctx.font = `900 italic 62px "Playfair Display"`;
  ctx.fillText((name || 'YOUR NAME').toUpperCase(), cX, 160);

  // Stack
  ctx.fillStyle = t.textLight;
  ctx.font = `700 16px "Space Mono"`;
  ctx.fillText((stack || 'STACK / ROLE').toUpperCase(), cX, 195);

  // Divider
  ctx.fillStyle = t.accent;
  ctx.fillRect(cX, 210, 60, 2);

  // Bio
  ctx.fillStyle = t.textLight;
  ctx.font = `400 15px "DM Sans"`;
  ctx.globalAlpha = 0.85;
  const bioLines = wrapText(ctx, bio || 'Your story goes here.', cW - 20);
  bioLines.slice(0, 4).forEach((l, i) => ctx.fillText(l, cX, 240 + i * 22));
  ctx.globalAlpha = 1;

  // Team
  if (team) {
    ctx.fillStyle = t.textMuted;
    ctx.font = `700 11px "Space Mono"`;
    ctx.fillText(`TEAM: ${team.toUpperCase()}`, cX, 340);
  }

  // Builder class pill
  const classLabel = (builderClass || 'THE BUILDER').toUpperCase();
  ctx.font = `700 13px "Space Mono"`;
  const clW = ctx.measureText(classLabel).width + 28;
  ctx.fillStyle = t.accent;
  roundRect(ctx, cX, 360, clW, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText(classLabel, cX + clW / 2, 379);
  ctx.textAlign = 'left';

  // Bottom row: ID + QR
  ctx.fillStyle = t.textMuted;
  ctx.font = `700 10px "Space Mono"`;
  ctx.fillText('BUILDER ID', cX, H - 68);
  ctx.fillStyle = t.textLight;
  ctx.font = `700 13px "Space Mono"`;
  ctx.fillText(builderId || 'HHG-XXXX-XXXX-XXXX', cX, H - 50);

  // QR
  try {
    const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 90, dark: t.qrDark, light: t.qrLight });
    ctx.drawImage(qr, W - 130, H - 118, 90, 90);
  } catch (_) {}

  // Bottom meta strip
  ctx.fillStyle = `rgba(0,0,0,0.35)`;
  ctx.fillRect(0, H - 28, W, 28);
  ctx.fillStyle = t.textMuted;
  ctx.font = `700 9px "Space Mono"`;
  ctx.textAlign = 'left';
  ctx.fillText('GOA, INDIA  ·  28 – 31 OCT 2026  ·  HACKER HOUSE', 16, H - 10);
  ctx.textAlign = 'right';
  ctx.fillText('2:47 PM STUDIO', W - 16, H - 10);
}

// ─── MODE 02: MODERN ────────────────────────────────────────────────────────
async function renderModern(ctx, state, t) {
  const { photo, name, stack, bio, team, builderClass, builderId } = state;

  // Photo panel (left 42%)
  const photoW = Math.floor(W * 0.42);
  ctx.fillStyle = t.panel;
  ctx.fillRect(0, 0, photoW, H);
  if (photo) {
    drawImageCover(ctx, photo, 0, 0, photoW, H, 0.2);
  } else {
    ctx.fillStyle = t.textMuted;
    ctx.font = `700 13px "Space Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PHOTO', photoW / 2, H / 2);
  }
  // Gradient overlay on photo (bottom)
  const photoOverlay = ctx.createLinearGradient(0, H * 0.6, 0, H);
  photoOverlay.addColorStop(0, 'rgba(0,0,0,0)');
  photoOverlay.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = photoOverlay;
  ctx.fillRect(0, 0, photoW, H);

  // Yellow edge strip
  ctx.fillStyle = t.primary;
  ctx.fillRect(photoW, 0, 6, H);

  // Right panel
  const rX = photoW + 6;
  ctx.fillStyle = t.surface;
  ctx.fillRect(rX, 0, W - rX, H);

  // Top green strip
  ctx.fillStyle = t.bg;
  ctx.fillRect(rX, 0, W - rX, 48);
  ctx.fillStyle = t.primary;
  ctx.font = `700 10px "Space Mono"`;
  ctx.textAlign = 'left';
  ctx.fillText('HH · GOA · 2026 BUILDER ID', rX + 28, 30);

  // Divider below top strip
  ctx.fillStyle = t.primary;
  ctx.fillRect(rX, 48, W - rX, 2);

  const cx = rX + 40, cw = W - rX - 80;

  // Name
  ctx.fillStyle = t.textDark;
  ctx.font = `900 52px "Playfair Display"`;
  ctx.textAlign = 'left';
  const nameStr = name || 'YOUR NAME';
  // fit long names
  let nameFontSize = 52;
  while (ctx.measureText(nameStr).width > cw && nameFontSize > 24) {
    nameFontSize -= 2;
    ctx.font = `900 ${nameFontSize}px "Playfair Display"`;
  }
  ctx.fillText(nameStr.toUpperCase(), cx, 120);

  // Stack
  ctx.fillStyle = t.bg;
  ctx.globalAlpha = 0.7;
  ctx.font = `700 14px "Space Mono"`;
  ctx.fillText((stack || 'STACK / ROLE').toUpperCase(), cx, 150);
  ctx.globalAlpha = 1;

  // Horizontal rule
  ctx.fillStyle = t.bg;
  ctx.globalAlpha = 0.2;
  ctx.fillRect(cx, 165, cw, 1);
  ctx.globalAlpha = 1;

  // Bio
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.75;
  ctx.font = `400 15px "DM Sans"`;
  const bioLines = wrapText(ctx, bio || 'Your builder bio goes here.', cw);
  bioLines.slice(0, 4).forEach((l, i) => ctx.fillText(l, cx, 200 + i * 24));
  ctx.globalAlpha = 1;

  // Team
  if (team) {
    ctx.fillStyle = t.bg;
    ctx.globalAlpha = 0.55;
    ctx.font = `700 11px "Space Mono"`;
    ctx.fillText(`↗ ${team.toUpperCase()}`, cx, 315);
    ctx.globalAlpha = 1;
  }

  // Builder class
  const clabel = (builderClass || 'THE BUILDER').toUpperCase();
  ctx.font = `700 12px "Space Mono"`;
  const clW = ctx.measureText(clabel).width + 24;
  ctx.fillStyle = t.accent;
  roundRect(ctx, cx, 340, clW, 26, 3);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText(clabel, cx + clW / 2, 358);
  ctx.textAlign = 'left';

  // Bottom area
  ctx.fillStyle = t.bg;
  ctx.fillRect(rX, H - 100, W - rX, 100);

  ctx.fillStyle = t.primary;
  ctx.globalAlpha = 0.5;
  ctx.font = `700 9px "Space Mono"`;
  ctx.fillText('BUILDER ID', cx, H - 68);
  ctx.globalAlpha = 1;
  ctx.fillStyle = t.primary;
  ctx.font = `700 13px "Space Mono"`;
  ctx.fillText(builderId || 'HHG-XXXX-XXXX-XXXX', cx, H - 48);

  ctx.fillStyle = t.textLight;
  ctx.globalAlpha = 0.45;
  ctx.font = `400 9px "Space Mono"`;
  ctx.fillText('GOA, INDIA  ·  28 – 31 OCT 2026', cx, H - 22);
  ctx.globalAlpha = 1;

  // QR
  try {
    const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 80, dark: t.qrDark, light: t.qrLight });
    ctx.drawImage(qr, W - 104, H - 95, 80, 80);
  } catch (_) {}

  // Photo label at bottom of photo panel
  ctx.fillStyle = t.primary;
  ctx.font = `900 italic 18px "Playfair Display"`;
  ctx.textAlign = 'left';
  ctx.fillText((name || '').toUpperCase(), 18, H - 16);
}

// ─── MODE 03: ARCHIVE ───────────────────────────────────────────────────────
async function renderArchive(ctx, state, t) {
  const { photo, name, stack, bio, team, builderClass, builderId } = state;

  // Paper background
  ctx.fillStyle = t.surface;
  ctx.fillRect(0, 0, W, H);

  // Grid texture
  drawGrid(ctx, W, H, 20, `${t.textDark}12`);

  // CLASSIFIED stamp
  drawStamp(ctx, W * 0.52, H * 0.52, 'BUILDER', t.accent, -0.35, 72);

  // Top header bar
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, 44);
  ctx.fillStyle = t.primary;
  ctx.font = `700 10px "Space Mono"`;
  ctx.textAlign = 'left';
  ctx.fillText('// HACKER HOUSE GOA 2026  ·  CONFIDENTIAL BUILDER PROFILE', 16, 27);
  ctx.textAlign = 'right';
  ctx.fillText(`CLEARANCE: BUILDER  ·  ${new Date().toISOString().slice(0,10)}`, W - 16, 27);

  // Bottom bar
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, H - 32, W, 32);

  // Photo box (left, mugshot style)
  const pX = 36, pY = 66, pW = 230, pH = 290;
  ctx.strokeStyle = t.textDark;
  ctx.lineWidth = 2;
  ctx.strokeRect(pX - 2, pY - 2, pW + 4, pH + 4);
  if (photo) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pW, pH);
    ctx.clip();
    drawImageCover(ctx, photo, pX, pY, pW, pH, 0.15);
    ctx.restore();
  } else {
    ctx.fillStyle = `${t.bg}22`;
    ctx.fillRect(pX, pY, pW, pH);
    ctx.fillStyle = t.textDark;
    ctx.font = `700 11px "Space Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('SUBJECT PHOTO', pX + pW / 2, pY + pH / 2);
  }

  // "SUBJECT" label above photo
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.55;
  ctx.font = `700 9px "Space Mono"`;
  ctx.textAlign = 'left';
  ctx.fillText('SUBJECT', pX, pY - 6);
  ctx.globalAlpha = 1;

  // Height markers on right of photo
  ctx.strokeStyle = `${t.textDark}40`;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const my = pY + (pH / 5) * i;
    ctx.beginPath();
    ctx.moveTo(pX + pW + 4, my);
    ctx.lineTo(pX + pW + 14, my);
    ctx.stroke();
    ctx.fillStyle = t.textDark;
    ctx.globalAlpha = 0.35;
    ctx.font = `400 7px "Space Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText(`${180 - i * 15}`, pX + pW + 16, my + 3);
    ctx.globalAlpha = 1;
  }

  // Photo ID beneath photo
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.4;
  ctx.font = `400 9px "Space Mono"`;
  ctx.textAlign = 'center';
  ctx.fillText(`REF: ${(builderId || 'HHG-0000').slice(0, 12)}`, pX + pW / 2, pY + pH + 16);
  ctx.globalAlpha = 1;

  // Content area
  const cX = 308, cY = 68;
  const fieldFont = `700 10px "Space Mono"`;
  const valueFont = `700 16px "Space Mono"`;
  const monoSmall = `400 11px "Space Mono"`;

  const field = (label, value, fy) => {
    ctx.fillStyle = t.textDark;
    ctx.globalAlpha = 0.5;
    ctx.font = fieldFont;
    ctx.textAlign = 'left';
    ctx.fillText(label + ':', cX, fy);
    ctx.globalAlpha = 1;
    ctx.font = valueFont;
    ctx.fillStyle = t.bg;
    ctx.fillText((value || '—').toUpperCase(), cX, fy + 18);
  };

  field('FULL NAME', name, cY);
  field('DESIGNATION', stack, cY + 56);

  // Mission brief (bio, multiline)
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.5;
  ctx.font = fieldFont;
  ctx.textAlign = 'left';
  ctx.fillText('MISSION BRIEF:', cX, cY + 114);
  ctx.globalAlpha = 0.8;
  ctx.font = monoSmall;
  ctx.fillStyle = t.bg;
  const bioLines = wrapText(ctx, bio || 'Classified. See attached dossier.', 540);
  bioLines.slice(0, 3).forEach((l, i) => ctx.fillText(l, cX, cY + 130 + i * 17));
  ctx.globalAlpha = 1;

  // Team or redacted
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.5;
  ctx.font = fieldFont;
  ctx.fillText('SQUAD:', cX, cY + 200);
  ctx.globalAlpha = 1;
  if (team) {
    ctx.font = valueFont;
    ctx.fillStyle = t.bg;
    ctx.fillText(team.toUpperCase(), cX, cY + 218);
  } else {
    ctx.fillStyle = t.bg;
    ctx.font = `900 18px "Space Mono"`;
    ctx.fillText('█████████', cX, cY + 218);
  }

  // Builder Class box
  const bcY = cY + 255;
  ctx.strokeStyle = t.accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cX, bcY, 480, 40);
  ctx.fillStyle = t.accent;
  ctx.globalAlpha = 0.08;
  ctx.fillRect(cX, bcY, 480, 40);
  ctx.globalAlpha = 1;
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.5;
  ctx.font = fieldFont;
  ctx.fillText('BUILDER CLASS:', cX + 10, bcY + 14);
  ctx.globalAlpha = 1;
  ctx.fillStyle = t.accent;
  ctx.font = `700 14px "Space Mono"`;
  ctx.fillText((builderClass || 'THE BUILDER').toUpperCase(), cX + 10, bcY + 30);

  // Bottom: barcode-style ID + QR
  const barY = H - 32 - 56;
  ctx.fillStyle = t.textDark;
  ctx.globalAlpha = 0.3;
  ctx.font = `400 8px "Space Mono"`;
  ctx.textAlign = 'left';
  // fake barcode text
  const barStr = (builderId || 'HHG0000').replace(/-/g,'');
  ctx.fillText(Array(8).fill(barStr).join(' '), 36, barY);
  ctx.globalAlpha = 1;

  ctx.fillStyle = t.textDark;
  ctx.font = `700 11px "Space Mono"`;
  ctx.fillText(`BUILDER ID: ${builderId || 'HHG-XXXX-XXXX-XXXX'}`, 36, barY + 20);

  // QR
  try {
    const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 80, dark: t.qrDark, light: t.surface });
    ctx.drawImage(qr, W - 100, H - 32 - 90, 80, 80);
  } catch (_) {}

  // Bottom bar text
  ctx.fillStyle = t.primary;
  ctx.font = `700 9px "Space Mono"`;
  ctx.textAlign = 'left';
  ctx.fillText('HH GOA 2026  ·  GOA, INDIA  ·  28 – 31 OCT  ·  2:47 PM STUDIO', 16, H - 10);
  ctx.textAlign = 'right';
  ctx.fillStyle = t.primary;
  ctx.fillText('ACCESS LEVEL: BUILDER', W - 16, H - 10);
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────────
export async function renderCard(canvas, state, { width = W, height = H } = {}) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const { THEMES } = await import('./themes.js');
  const t = THEMES[state.theme] || THEMES.classic;

  await ensureFonts();

  switch (state.mode) {
    case 'goan':    await renderGoan(ctx, state, t); break;
    case 'archive': await renderArchive(ctx, state, t); break;
    default:        await renderModern(ctx, state, t); break;
  }
}
