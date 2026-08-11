/**
 * TEMPLATE: GOAN ART
 * Portrait ID card — Goan editorial / architectural illustration aesthetic.
 * Inspired by: Portuguese-Goan architecture, azulejo tiles, coastal palms,
 * vintage travel poster art direction, HH Goa brand identity.
 *
 * Dimensions: 1023 × 1537
 */
import {
  drawCardBackground, drawImageCover, drawArchPhoto, drawTileStrip,
  drawPalm, drawLanyardSlot, wrapText, drawFitText, roundRect,
} from '../canvasUtils.js';
import { makeQRCanvas, buildQRPayload } from '../qr.js';

const W = 1023, H = 1537;

export default {
  id:   'goan',
  name: 'GOAN ART',
  desc: 'Arch frames. Tile borders. Coastal editorial.',
  badge: '◉',
  label: 'MODE 01',
  dimensions: { width: W, height: H },

  async render(ctx, state, t) {
    const { photo, name, stack, bio, team, builderClass, builderId } = state;

    // ── 1. Card base & rounded corners ─────────────────────
    drawCardBackground(ctx, W, H, t.bg, 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    // ── 2. Sky gradient (top 52%) ───────────────────────────
    const skyH = Math.floor(H * 0.52);
    const skyGrad = ctx.createLinearGradient(0, 0, 0, skyH);
    skyGrad.addColorStop(0, t.bg);
    skyGrad.addColorStop(0.7, t.panel);
    skyGrad.addColorStop(1, '#1a7a6e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, skyH);

    // Sea band
    ctx.fillStyle = '#1a7a6e';
    ctx.fillRect(0, skyH - 20, W, 60);
    // Sand
    const sandGrad = ctx.createLinearGradient(0, skyH + 40, 0, skyH + 110);
    sandGrad.addColorStop(0, '#c9a55c');
    sandGrad.addColorStop(1, '#a07c38');
    ctx.fillStyle = sandGrad;
    ctx.fillRect(0, skyH + 40, W, 80);

    // ── 3. Tile borders ──────────────────────────────────────
    const tileColors = ['#1a4a9e', '#f5f0dc', t.primary];
    drawTileStrip(ctx, 0, 52, W, 28, tileColors);      // top (after slot space)
    drawTileStrip(ctx, 0, H - 28 - 28, W, 28, tileColors); // above footer

    // ── 4. Palm trees ────────────────────────────────────────
    drawPalm(ctx, W * 0.12, skyH + 42, 260, 'rgba(5,30,12,0.65)');
    drawPalm(ctx, W * 0.88, skyH + 42, 220, 'rgba(5,30,12,0.5)');

    // ── 5. HH GOA badge top-right ───────────────────────────
    ctx.fillStyle = t.primary;
    roundRect(ctx, W - 200, 60, 168, 30, 2);
    ctx.fill();
    ctx.fillStyle = t.textDark;
    ctx.font = `700 10px "Space Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('HH GOA 2026 · BUILDER ID', W - 116, 79);

    // ── 6. Photo in arch frame (center-top) ─────────────────
    const phW = 320, phH = 420, phX = (W - phW) / 2, phY = 90;
    drawArchPhoto(ctx, photo, phX, phY, phW, phH);
    // Arch border
    const archR = phW / 2;
    ctx.strokeStyle = t.primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(phX, phY + archR);
    ctx.arc(phX + archR, phY + archR, archR, Math.PI, 0);
    ctx.lineTo(phX + phW, phY + phH);
    ctx.lineTo(phX, phY + phH);
    ctx.stroke();

    // ── 7. "HACKER HOUSE" watermark over illustration ───────
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = t.primary;
    ctx.font = `900 72px "Playfair Display"`;
    ctx.textAlign = 'center';
    ctx.fillText('HACKER HOUSE', W / 2, skyH - 20);
    ctx.restore();

    // ── 8. Content area (below illustration) ─────────────────
    const contentY = skyH + 130;
    ctx.textAlign = 'left';

    // Name
    ctx.fillStyle = t.primary;
    const nameStr = (name || 'YOUR NAME').toUpperCase();
    drawFitText(ctx, nameStr, 52, contentY, W - 104, `700 italic 72px "Playfair Display"`, t.primary);

    // Stack
    ctx.fillStyle = t.textLight;
    ctx.globalAlpha = 0.75;
    ctx.font = `700 18px "Space Mono"`;
    ctx.fillText((stack || 'STACK / ROLE').toUpperCase(), 52, contentY + 52);
    ctx.globalAlpha = 1;

    // Accent rule
    ctx.fillStyle = t.accent;
    ctx.fillRect(52, contentY + 68, 80, 2);

    // Bio
    ctx.fillStyle = t.textLight;
    ctx.globalAlpha = 0.8;
    ctx.font = `400 17px "DM Sans"`;
    const bioLines = wrapText(ctx, bio || 'Your story goes here.', W - 108);
    bioLines.slice(0, 4).forEach((l, i) => ctx.fillText(l, 52, contentY + 100 + i * 26));
    ctx.globalAlpha = 1;

    // Team
    if (team) {
      ctx.fillStyle = t.textMuted;
      ctx.font = `700 12px "Space Mono"`;
      ctx.fillText(`TEAM: ${team.toUpperCase()}`, 52, contentY + 220);
    }

    // ── 9. Builder Class pill ────────────────────────────────
    const cls = (builderClass || 'THE BUILDER').toUpperCase();
    ctx.font = `700 14px "Space Mono"`;
    const clW = ctx.measureText(cls).width + 36;
    ctx.fillStyle = t.accent;
    roundRect(ctx, 52, contentY + 248, clW, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(cls, 52 + clW / 2, contentY + 269);

    // ── 10. Bottom section ───────────────────────────────────
    const botY = H - 200;
    // Builder ID
    ctx.textAlign = 'left';
    ctx.fillStyle = t.textMuted;
    ctx.font = `700 10px "Space Mono"`;
    ctx.fillText('BUILDER ID', 52, botY);
    ctx.fillStyle = t.textLight;
    ctx.font = `700 14px "Space Mono"`;
    ctx.fillText(builderId || 'HHG-XXXX-XXXX-XXXX', 52, botY + 20);

    // #FrameInGoa
    ctx.fillStyle = t.textMuted;
    ctx.font = `700 11px "Space Mono"`;
    ctx.fillText('#FrameInGoa', 52, botY + 50);

    // QR
    try {
      const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 110, dark: t.qrDark, light: t.qrLight });
      ctx.drawImage(qr, W - 162, botY - 10, 110, 110);
    } catch (_) {}

    // Footer strip
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, H - 60, W, 60);
    ctx.fillStyle = t.textMuted;
    ctx.font = `700 10px "Space Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText('HACKER HOUSE  ·  GOA, INDIA  ·  28–31 OCT 2026', 52, H - 22);
    ctx.textAlign = 'right';
    ctx.fillText('2:47 PM STUDIO', W - 52, H - 22);

    ctx.restore();

    // ── 11. Lanyard slot (drawn last, on top) ─────────────────
    drawLanyardSlot(ctx, W, 22);
  },

  async renderBack(ctx, state, t) {
    const { name, stack, bio, team, builderClass, builderId } = state;
    const initials = (name || 'HH').split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();

    drawCardBackground(ctx, W, H, t.bg, 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    drawTileStrip(ctx, 0, 52, W, 28, ['#1a4a9e', '#f5f0dc', t.primary]);
    drawTileStrip(ctx, 0, H - 56, W, 28, ['#1a4a9e', '#f5f0dc', t.primary]);

    // Top badge
    ctx.fillStyle = t.primary;
    roundRect(ctx, 52, 62, 220, 28, 2);
    ctx.fill();
    ctx.fillStyle = t.textDark;
    ctx.font = `700 10px "Space Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText('HACKER HOUSE GOA 2026 · BUILDER FILE', 62, 80);

    // Initials circle
    const cx = W / 2, cy = 340, r = 110;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fill();
    ctx.strokeStyle = t.primary;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = t.primary;
    ctx.font = `900 80px "Playfair Display"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, cx, cy + 4);
    ctx.textBaseline = 'alphabetic';

    // Fields
    const fY = cy + r + 60;
    const field = (label, value, y) => {
      ctx.fillStyle = t.textMuted; ctx.font = `700 11px "Space Mono"`; ctx.textAlign = 'left';
      ctx.fillText(label.toUpperCase(), 52, y);
      ctx.fillStyle = t.primary; ctx.font = `900 italic 26px "Playfair Display"`;
      ctx.fillText((value || '—').toUpperCase(), 52, y + 30);
    };

    field('Name', name, fY);
    field('Builder Class', builderClass, fY + 80);
    field('Stack', stack, fY + 160);

    if (bio) {
      ctx.fillStyle = t.textMuted; ctx.font = `700 11px "Space Mono"`; ctx.textAlign = 'left';
      ctx.fillText('BIO', 52, fY + 240);
      ctx.fillStyle = t.textLight; ctx.globalAlpha = 0.8;
      ctx.font = `400 15px "DM Sans"`;
      wrapText(ctx, bio, W - 104).slice(0, 3).forEach((l, i) => ctx.fillText(l, 52, fY + 260 + i * 22));
      ctx.globalAlpha = 1;
    }

    if (team) {
      ctx.fillStyle = t.textMuted; ctx.font = `700 11px "Space Mono"`; ctx.textAlign = 'left';
      ctx.fillText('TEAM', 52, fY + 360);
      ctx.fillStyle = t.textLight; ctx.font = `700 18px "Space Mono"`;
      ctx.fillText(team.toUpperCase(), 52, fY + 382);
    }

    // Fun copy
    ctx.fillStyle = t.textMuted; ctx.font = `400 12px "Space Mono"`; ctx.textAlign = 'center';
    ctx.fillText('PROPERTY OF THE BUILDER.', W / 2, H - 130);
    ctx.fillText('IF FOUND: RETURN TO THE INTERNET.', W / 2, H - 110);

    // QR
    try {
      const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 100, dark: t.qrDark, light: t.qrLight });
      ctx.drawImage(qr, (W - 100) / 2, H - 260, 100, 100);
    } catch (_) {}

    // Builder ID
    ctx.fillStyle = t.textMuted; ctx.font = `700 10px "Space Mono"`; ctx.textAlign = 'center';
    ctx.fillText(builderId || 'HHG-XXXX-XXXX-XXXX', W / 2, H - 20);

    ctx.restore();
    drawLanyardSlot(ctx, W, 22);
  },
};
