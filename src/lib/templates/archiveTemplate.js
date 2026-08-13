/**
 * TEMPLATE: ARCHIVE
 * Portrait ID card — classified dossier / builder file aesthetic.
 * Manila paper, grid texture, monospace typography, technical annotations.
 * Dimensions: 1023 × 1537
 */
import {
  drawCardBackground, drawImageCover, drawGrid, drawStamp,
  drawLanyardSlot, wrapText, roundRect,
} from '../canvasUtils.js';
import { makeQRCanvas, buildQRPayload } from '../qr.js';

const W = 1023, H = 1537;

export default {
  id: 'archive',
  name: 'ARCHIVE',
  desc: 'Classified dossier. Builder clearance.',
  badge: '▣',
  label: 'MODE 03',
  dimensions: { width: W, height: H },

  async render(ctx, state, t) {
    const { photo, name, stack, bio, team, builderClass, builderId } = state;

    drawCardBackground(ctx, W, H, t.surface, 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    // Grid texture
    drawGrid(ctx, W, H, 22, `${t.textDark}12`);

    // Diagonal BUILDER stamp
    drawStamp(ctx, W * 0.5, H * 0.45, 'BUILDER', t.accent, -0.38, 100);

    // ── Header bar ───────────────────────────────────────────
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, W, 52);
    ctx.fillStyle = t.primary;
    ctx.font = `700 11px "Space Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText('// HACKER HOUSE GOA 2026  ·  CONFIDENTIAL BUILDER PROFILE', 24, 31);
    ctx.textAlign = 'right';
    ctx.fillText(`CLEARANCE: BUILDER`, W - 24, 31);

    // Bottom bar
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, H - 44, W, 44);

    // ── Photo (mugshot style, centered) ─────────────────────
    const phW = 340, phH = 420, phX = (W - phW) / 2, phY = 72;
    ctx.strokeStyle = t.textDark; ctx.lineWidth = 2;
    ctx.strokeRect(phX - 2, phY - 2, phW + 4, phH + 4);
    // Fill with photo or placeholder
    ctx.save();
    ctx.beginPath(); ctx.rect(phX, phY, phW, phH); ctx.clip();
    if (photo) drawImageCover(ctx, photo, phX, phY, phW, phH, 0.12);
    else {
      ctx.fillStyle = `${t.bg}22`; ctx.fillRect(phX, phY, phW, phH);
      ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.3;
      ctx.font = `700 13px "Space Mono"`; ctx.textAlign = 'center';
      ctx.fillText('SUBJECT PHOTO', phX + phW / 2, phY + phH / 2);
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // "SUBJECT" label above photo
    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45;
    ctx.font = `700 10px "Space Mono"`; ctx.textAlign = 'left';
    ctx.fillText('SUBJECT', phX, phY - 6);
    ctx.globalAlpha = 1;

    // Height markers on right side of photo
    ctx.strokeStyle = `${t.textDark}40`; ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const my = phY + (phH / 5) * i;
      ctx.beginPath(); ctx.moveTo(phX + phW + 4, my); ctx.lineTo(phX + phW + 18, my); ctx.stroke();
      ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.3;
      ctx.font = `400 8px "Space Mono"`; ctx.textAlign = 'left';
      ctx.fillText(`${180 - i * 15}`, phX + phW + 20, my + 3);
      ctx.globalAlpha = 1;
    }

    // Ref number below photo
    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.35;
    ctx.font = `400 9px "Space Mono"`; ctx.textAlign = 'center';
    ctx.fillText(`REF: ${(builderId || 'HHG-XXXX').slice(0,12)}`, phX + phW / 2, phY + phH + 16);
    ctx.globalAlpha = 1;

    // ── Fields ───────────────────────────────────────────────
    const fY = phY + phH + 52; ctx.textAlign = 'left';

    const monoField = (label, value, y) => {
      ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45;
      ctx.font = `700 10px "Space Mono"`; ctx.fillText(`${label}:`, 52, y);
      ctx.globalAlpha = 1;
      ctx.fillStyle = t.bg; ctx.font = `700 18px "Space Mono"`;
      ctx.fillText((value || '—').toUpperCase(), 52, y + 22);
    };

    monoField('FULL NAME', name, fY);
    monoField('DESIGNATION', stack, fY + 62);

    // Bio (multiline)
    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45;
    ctx.font = `700 10px "Space Mono"`; ctx.fillText('MISSION BRIEF:', 52, fY + 128);
    ctx.globalAlpha = 0.75; ctx.fillStyle = t.bg; ctx.font = `400 13px "Space Mono"`;
    wrapText(ctx, bio || 'Classified.', W - 104).slice(0, 3).forEach((l, i) =>
      ctx.fillText(l, 52, fY + 148 + i * 20));
    ctx.globalAlpha = 1;

    // Team or redacted
    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45;
    ctx.font = `700 10px "Space Mono"`; ctx.fillText('SQUAD:', 52, fY + 240);
    ctx.globalAlpha = 1;
    if (team) {
      ctx.fillStyle = t.bg; ctx.font = `700 18px "Space Mono"`;
      ctx.fillText(team.toUpperCase(), 52, fY + 262);
    } else {
      ctx.fillStyle = t.bg; ctx.font = `900 20px "Space Mono"`;
      ctx.fillText('██████████', 52, fY + 262);
    }

    // Builder Class box
    const bcY = fY + 302;
    ctx.strokeStyle = t.accent; ctx.lineWidth = 1.5;
    ctx.strokeRect(52, bcY, W - 104, 50);
    ctx.fillStyle = t.accent; ctx.globalAlpha = 0.07;
    ctx.fillRect(52, bcY, W - 104, 50);
    ctx.globalAlpha = 1;
    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.45;
    ctx.font = `700 10px "Space Mono"`; ctx.fillText('BUILDER CLASS:', 68, bcY + 16);
    ctx.globalAlpha = 1;
    ctx.fillStyle = t.accent; ctx.font = `700 16px "Space Mono"`;
    ctx.fillText((builderClass || 'THE BUILDER').toUpperCase(), 68, bcY + 36);

    // ── Builder ID + QR ──────────────────────────────────────
    const bY = fY + 400;
    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.3;
    ctx.font = `400 8px "Space Mono"`;
    const barStr = (builderId || 'HHG0000').replace(/-/g,'');
    ctx.fillText(Array(10).fill(barStr).join(' '), 52, bY);
    ctx.globalAlpha = 1;
    ctx.fillStyle = t.textDark; ctx.font = `700 13px "Space Mono"`;
    ctx.fillText(`BUILDER ID: ${builderId || 'HHG-XXXX-XXXX-XXXX'}`, 52, bY + 20);

    ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.3; ctx.font = `400 10px "Space Mono"`;
    ctx.fillText('PROPERTY OF THE BUILDER. STRONGLY WORDED COMMIT MESSAGES IF FOUND.', 52, bY + 44);
    ctx.globalAlpha = 1;

    try {
      const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 110, dark: t.qrDark, light: t.surface });
      ctx.drawImage(qr, W - 162, bY - 18, 110, 110);
    } catch (_) {}

    // Footer
    ctx.fillStyle = t.primary; ctx.font = `700 9px "Space Mono"`; ctx.textAlign = 'left';
    ctx.fillText('HH GOA 2026  ·  GOA, INDIA  ·  28–31 OCT  ·  2:47 PM STUDIO', 24, H - 16);
    ctx.textAlign = 'right';
    ctx.fillText('ACCESS LEVEL: BUILDER', W - 24, H - 16);

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
    drawGrid(ctx, W, H, 22, `${t.textDark}10`);
    drawStamp(ctx, W / 2, H * 0.5, 'VERIFIED', t.accent, -0.3, 80);

    ctx.fillStyle = t.bg; ctx.fillRect(0, 0, W, 52);
    ctx.fillStyle = t.primary; ctx.font = `700 11px "Space Mono"`; ctx.textAlign = 'left';
    ctx.fillText('// SUPPLEMENTARY DOSSIER  ·  HH GOA 2026', 24, 31);
    ctx.textAlign = 'right';
    ctx.fillText('BUILDER CLEARANCE CONFIRMED', W - 24, 31);

    ctx.fillStyle = t.bg; ctx.fillRect(0, H - 44, W, 44);

    // Initials box
    const bx = (W - 180) / 2, by = 80, bw = 180, bh = 180;
    ctx.strokeStyle = t.textDark; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = `${t.bg}18`; ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = t.bg; ctx.font = `900 72px "Playfair Display"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(initials, bx + bw / 2, by + bh / 2 + 2);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = `${t.bg}55`; ctx.font = `700 8px "Space Mono"`;
    ctx.textAlign = 'center'; ctx.fillText('SUBJECT', bx + bw / 2, by - 6);

    const fY = by + bh + 52; ctx.textAlign = 'left';
    const monoField2 = (label, value, y) => {
      ctx.fillStyle = `${t.textDark}55`; ctx.font = `700 10px "Space Mono"`;
      ctx.fillText(`${label}:`, 52, y);
      ctx.fillStyle = t.bg; ctx.font = `700 16px "Space Mono"`;
      ctx.fillText((value || '—').toUpperCase(), 52, y + 20);
    };

    monoField2('FULL NAME', name, fY);
    monoField2('BUILDER CLASS', builderClass, fY + 62);
    monoField2('DESIGNATION', stack, fY + 124);

    ctx.fillStyle = `${t.textDark}55`; ctx.font = `700 10px "Space Mono"`;
    ctx.fillText('MISSION NOTES:', 52, fY + 188);
    ctx.fillStyle = `${t.bg}cc`; ctx.font = `400 12px "Space Mono"`;
    wrapText(ctx, bio || 'Classified.', W - 104).slice(0, 3).forEach((l, i) =>
      ctx.fillText(l, 52, fY + 208 + i * 18));

    if (team) { monoField2('SQUAD', team, fY + 295); }
    else {
      ctx.fillStyle = `${t.textDark}55`; ctx.font = `700 10px "Space Mono"`;
      ctx.fillText('SQUAD:', 52, fY + 295);
      ctx.fillStyle = t.bg; ctx.font = `900 18px "Space Mono"`;
      ctx.fillText('██████████', 52, fY + 315);
    }

    ctx.textAlign = 'center'; ctx.fillStyle = t.textDark; ctx.globalAlpha = 0.3;
    ctx.font = `400 10px "Space Mono"`;
    ctx.fillText('PROPERTY OF THE BUILDER.', W / 2, H - 120);
    ctx.fillText('UNAUTHORIZED ACCESS: STRONGLY WORDED COMMIT MESSAGES.', W / 2, H - 100);
    ctx.globalAlpha = 1;

    try {
      const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 90, dark: t.qrDark, light: t.surface });
      ctx.drawImage(qr, (W - 90) / 2, H - 240, 90, 90);
    } catch (_) {}

    ctx.textAlign = 'left'; ctx.fillStyle = t.primary; ctx.font = `700 9px "Space Mono"`;
    ctx.fillText(`HH GOA 2026  ·  BUILDER ID: ${builderId || 'HHG-XXXX'}`, 24, H - 16);

    ctx.restore();
    drawLanyardSlot(ctx, W, 22);
  },
};
