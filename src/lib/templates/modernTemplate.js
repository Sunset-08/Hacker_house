/**
 * TEMPLATE: MODERN
 * Portrait ID card — clean editorial, strong typography, intentional space.
 * HH Goa green / cream / yellow / pink palette.
 * Dimensions: 1023 × 1537
 */
import {
  drawCardBackground, drawImageCover, drawLanyardSlot,
  wrapText, drawFitText, roundRect,
} from '../canvasUtils.js';
import { makeQRCanvas, buildQRPayload } from '../qr.js';

const W = 1023, H = 1537;

export default {
  id: 'modern',
  name: 'MODERN',
  desc: 'Clean. Editorial. Timeless.',
  badge: '✦',
  label: 'MODE 02',
  dimensions: { width: W, height: H },

  async render(ctx, state, t) {
    const { photo, name, stack, bio, team, builderClass, builderId } = state;

    drawCardBackground(ctx, W, H, t.surface, 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    // ── Photo panel (top ~44%) ──────────────────────────────
    const photoH = Math.floor(H * 0.44);
    ctx.fillStyle = t.panel;
    ctx.fillRect(0, 0, W, photoH);
    if (photo) drawImageCover(ctx, photo, 0, 0, W, photoH, 0.15);

    // Photo gradient overlay bottom
    const pOverlay = ctx.createLinearGradient(0, photoH * 0.55, 0, photoH);
    pOverlay.addColorStop(0, 'rgba(0,0,0,0)');
    pOverlay.addColorStop(1, t.surface + 'ee');
    ctx.fillStyle = pOverlay;
    ctx.fillRect(0, 0, W, photoH);

    // HH · GOA top-right label
    ctx.fillStyle = t.bg;
    roundRect(ctx, W - 180, 60, 148, 28, 2);
    ctx.fill();
    ctx.fillStyle = t.primary;
    ctx.font = `700 10px "Space Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('HH · GOA · 2026', W - 106, 78);

    // ── Yellow accent strip below photo ─────────────────────
    ctx.fillStyle = t.primary;
    ctx.fillRect(0, photoH, W, 6);

    // ── Content section ─────────────────────────────────────
    const cY = photoH + 52;

    // Name
    ctx.textAlign = 'left';
    const nameStr = (name || 'YOUR NAME').toUpperCase();
    ctx.fillStyle = t.textDark;
    const nameSize = drawFitText(ctx, nameStr, 52, cY, W - 104, `900 80px "Playfair Display"`, t.textDark);
    const nameLineH = Math.max(nameSize + 12, 60);

    // Stack
    ctx.fillStyle = t.textDark;
    ctx.globalAlpha = 0.6;
    ctx.font = `700 16px "Space Mono"`;
    ctx.fillText((stack || 'STACK / ROLE').toUpperCase(), 52, cY + nameLineH + 8);
    ctx.globalAlpha = 1;

    // Rule
    ctx.fillStyle = t.textDark;
    ctx.globalAlpha = 0.15;
    ctx.fillRect(52, cY + nameLineH + 28, W - 104, 1);
    ctx.globalAlpha = 1;

    // Bio
    ctx.fillStyle = t.textDark;
    ctx.globalAlpha = 0.7;
    ctx.font = `400 16px "DM Sans"`;
    const bioLines = wrapText(ctx, bio || 'Your builder bio goes here.', W - 104);
    bioLines.slice(0, 4).forEach((l, i) => ctx.fillText(l, 52, cY + nameLineH + 60 + i * 26));
    ctx.globalAlpha = 1;

    if (team) {
      ctx.fillStyle = t.textDark;
      ctx.globalAlpha = 0.5;
      ctx.font = `700 12px "Space Mono"`;
      ctx.fillText(`↗ ${team.toUpperCase()}`, 52, cY + nameLineH + 190);
      ctx.globalAlpha = 1;
    }

    // Builder Class
    const cls = (builderClass || 'THE BUILDER').toUpperCase();
    ctx.font = `700 14px "Space Mono"`;
    const clW = ctx.measureText(cls).width + 36;
    ctx.fillStyle = t.accent;
    roundRect(ctx, 52, cY + nameLineH + 218, clW, 34, 3);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(cls, 52 + clW / 2, cY + nameLineH + 240);

    // ── Bottom section (dark panel) ──────────────────────────
    const botPanelY = H - 300;
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, botPanelY, W, 300);

    ctx.fillStyle = t.primary;
    ctx.font = `700 10px "Space Mono"`;
    ctx.textAlign = 'left';
    ctx.globalAlpha = 0.55;
    ctx.fillText('BUILDER ID', 52, botPanelY + 40);
    ctx.globalAlpha = 1;
    ctx.fillStyle = t.primary;
    ctx.font = `700 15px "Space Mono"`;
    ctx.fillText(builderId || 'HHG-XXXX-XXXX-XXXX', 52, botPanelY + 64);

    ctx.fillStyle = t.textLight;
    ctx.globalAlpha = 0.35;
    ctx.font = `400 11px "Space Mono"`;
    ctx.fillText('#FrameInGoa  ·  GOA, INDIA  ·  28–31 OCT 2026', 52, botPanelY + 100);
    ctx.globalAlpha = 1;

    ctx.fillStyle = t.textLight;
    ctx.globalAlpha = 0.35;
    ctx.font = `400 11px "Space Mono"`;
    ctx.fillText('HACKER HOUSE  ·  2:47 PM STUDIO', 52, H - 28);
    ctx.globalAlpha = 1;

    // QR
    try {
      const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 120, dark: t.qrDark, light: t.qrLight });
      ctx.drawImage(qr, W - 172, botPanelY + 22, 120, 120);
    } catch (_) {}

    ctx.restore();
    drawLanyardSlot(ctx, W, 22);
  },

  async renderBack(ctx, state, t) {
    const { name, stack, bio, team, builderClass, builderId } = state;
    const initials = (name || 'HH').split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();

    drawCardBackground(ctx, W, H, t.surface, 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    // Left yellow bar accent
    ctx.fillStyle = t.primary;
    ctx.fillRect(0, 0, 8, H);

    // Top strip
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, W, 52);
    ctx.fillStyle = t.primary;
    ctx.font = `700 11px "Space Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText('HACKER HOUSE GOA 2026  ·  BUILDER FILE', 24, 32);

    // Initials circle
    const cx = W / 2, cy = 310, r = 120;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = t.bg; ctx.fill();
    ctx.strokeStyle = t.primary; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = t.primary;
    ctx.font = `900 90px "Playfair Display"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(initials, cx, cy + 4);
    ctx.textBaseline = 'alphabetic';

    const fY = cy + r + 52;
    const monoField = (label, value, y) => {
      ctx.textAlign = 'left';
      ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45; ctx.font = `700 10px "Space Mono"`;
      ctx.fillText(label, 52, y); ctx.globalAlpha = 1;
      ctx.fillStyle = t.textDark; ctx.font = `900 22px "Playfair Display"`;
      ctx.fillText((value || '—').toUpperCase(), 52, y + 26);
    };

    monoField('BUILDER CLASS', builderClass, fY);
    monoField('FULL NAME', name, fY + 78);
    monoField('STACK / ROLE', stack, fY + 156);

    if (bio) {
      ctx.textAlign = 'left';
      ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45; ctx.font = `700 10px "Space Mono"`;
      ctx.fillText('BIO', 52, fY + 234); ctx.globalAlpha = 1;
      ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.7; ctx.font = `400 14px "DM Sans"`;
      wrapText(ctx, bio, W - 104).slice(0, 3).forEach((l, i) => ctx.fillText(l, 52, fY + 254 + i * 22));
      ctx.globalAlpha = 1;
    }

    if (team) { monoField('TEAM', team, fY + 345); }

    // Fun copy
    ctx.textAlign = 'center'; ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.3;
    ctx.font = `400 11px "Space Mono"`;
    ctx.fillText('PROPERTY OF THE BUILDER.', W / 2, H - 110);
    ctx.fillText('IF FOUND: RETURN TO THE INTERNET.', W / 2, H - 88);
    ctx.globalAlpha = 1;

    try {
      const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 90, dark: t.qrDark, light: t.bg });
      ctx.drawImage(qr, (W - 90) / 2, H - 230, 90, 90);
    } catch (_) {}

    ctx.textAlign = 'center'; ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.25;
    ctx.font = `700 10px "Space Mono"`;
    ctx.fillText(builderId || 'HHG-XXXX-XXXX-XXXX', W / 2, H - 24);
    ctx.globalAlpha = 1;

    ctx.restore();
    drawLanyardSlot(ctx, W, 22);
  },
};
