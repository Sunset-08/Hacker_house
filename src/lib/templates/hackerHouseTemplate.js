/**
 * TEMPLATE: HACKER HOUSE
 * Source of Truth: src/components/templates/Hacker_House.png (1024 × 1536)
 *
 * The template image IS the complete design.
 * This renderer ONLY places dynamic user data into the empty areas
 * that are already visible in the template image. It adds:
 *   1. User photo   → into the large silhouette frame
 *   2. Name text    → over the dark-green nameplate banner
 *   3. Builder ID   → on the line after "BUILDER ID:" label
 *   4. Stack        → on the line after "STACK –" label
 *   5. Builder Class → on the line after "BUILDER CLASS –" label
 *   6. QR code      → inside the pink-border QR rectangle
 *
 * Nothing else. No extra boxes, no extra borders, no CSS recreations.
 */
import { TEMPLATE_CONFIGS } from './templateConfig.js';
import { getCleanTemplateCanvas } from './templateUtils.js';
import { drawRectPhoto, drawFitText, roundRect, drawCardBackground, drawLanyardSlot, wrapText } from '../canvasUtils.js';
import { makeQRCanvas, buildQRPayload } from '../qr.js';

const cfg = TEMPLATE_CONFIGS['hacker-house'];
const { width: W, height: H } = cfg.dimensions;

export default {
  id:         'hacker-house',
  name:       'HACKER HOUSE',
  desc:       'Goa hacker aesthetic',
  badge:      '✦',
  label:      'STYLE 01',
  dimensions: { width: W, height: H },

  async render(ctx, state, _t) {
    const { photo, photoCrop, name, stack, builderClass, builderId, bio } = state;

    // ── LAYER 1: Template background image (untouched) ────────────────────
    try {
      const tmpl = await getCleanTemplateCanvas(cfg.image, 'hacker-house');
      ctx.drawImage(tmpl, 0, 0, W, H);
    } catch (e) {
      console.error('Failed to load Hacker_House template:', e);
      drawCardBackground(ctx, W, H, '#F5F0DC', 28);
    }

    ctx.save();

    // ── LAYER 2: User photo ───────────────────────────────────────────────
    if (photo) {
      const { x, y, width, height, radius } = cfg.photoFrame || cfg.photo;
      drawRectPhoto(ctx, photo, x, y, width, height, radius, photoCrop || {});
    }

    // ── LAYER 3: Name text (over the dark-green nameplate) ────────────────
    if (name && name.trim()) {
      const c = cfg.nameText;
      ctx.textAlign = c.align;
      drawFitText(ctx, name.trim().toUpperCase(), c.x, c.y, c.maxWidth, c.font, c.color);
    }

    // ── LAYER 4: Builder ID value ─────────────────────────────────────────
    if (builderId && builderId.trim()) {
      const c = cfg.builderIdText;
      ctx.textAlign = c.align;
      drawFitText(ctx, builderId.trim(), c.x, c.y, c.maxWidth, c.font, c.color);
    }

    // ── LAYER 5: Stack / Role value ───────────────────────────────────────
    if (stack && stack.trim()) {
      const c = cfg.stackText;
      ctx.textAlign = c.align;
      drawFitText(ctx, stack.trim().toUpperCase(), c.x, c.y, c.maxWidth, c.font, c.color);
    }

    // ── LAYER 6: Builder Class value ──────────────────────────────────────
    if (builderClass && builderClass.trim()) {
      const c = cfg.builderClassText;
      ctx.textAlign = c.align;
      drawFitText(ctx, builderClass.trim().toUpperCase(), c.x, c.y, c.maxWidth, c.font, c.color);
    }

    // ── LAYER 7: Bio / Quote ──────────────────────────────────────────────
    if (bio && bio.trim()) {
      const c = cfg.bioText;
      ctx.textAlign = c.align;
      ctx.font = c.font;
      ctx.fillStyle = c.color;
      const lines = wrapText(ctx, bio.trim(), c.maxWidth);
      // Ensure we handle longer bios gracefully (up to 3 lines)
      lines.slice(0, 3).forEach((line, i) => {
        ctx.fillText(line, c.x, c.y + i * 26);
      });
    }

    // ── LAYER 8: QR code ─────────────────────────────────────────────────
    if (builderId && builderId.trim()) {
      const { x, y, width, height, dark, light } = cfg.qr;
      try {
        const qrCanvas = await makeQRCanvas(
          buildQRPayload(builderId.trim()),
          { size: Math.min(width, height), dark, light }
        );
        ctx.drawImage(qrCanvas, x, y, width, height);
      } catch (_) {}
    }

    ctx.restore();
    drawLanyardSlot(ctx, W, 20);
  },

  async renderBack(ctx, state, _t) {
    const { name, stack, builderClass, builderId } = state;

    drawCardBackground(ctx, W, H, '#093B18', 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    ctx.fillStyle = '#093B18';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#F0C72A';
    ctx.font = '900 52px "Playfair Display"';
    ctx.textAlign = 'center';
    ctx.fillText('HACKER HOUSE GOA', W / 2, 140);
    ctx.fillStyle = 'rgba(245,240,220,0.8)';
    ctx.font = '700 22px "Space Mono"';
    ctx.fillText('BUILDER CREDENTIAL FILE', W / 2, 190);

    const drawField = (label, val, y) => {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(245,240,220,0.55)';
      ctx.font = '700 18px "Space Mono"';
      ctx.fillText(label, W / 2, y);
      ctx.fillStyle = '#F5F0DC';
      ctx.font = '900 34px "Playfair Display"';
      ctx.fillText((val || '—').toUpperCase(), W / 2, y + 48);
    };

    let fY = 320;
    if (name)         { drawField('BUILDER NAME',  name,         fY); fY += 135; }
    if (stack)        { drawField('STACK / ROLE',  stack,        fY); fY += 135; }
    if (builderClass) { drawField('BUILDER CLASS', builderClass, fY); fY += 135; }

    if (builderId) {
      try {
        const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 180, dark: '#093B18', light: '#F5F0DC' });
        ctx.drawImage(qr, (W - 180) / 2, H - 340, 180, 180);
      } catch (_) {}
      ctx.fillStyle = '#F0C72A';
      ctx.font = '700 18px "Space Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(builderId, W / 2, H - 120);
    }

    ctx.restore();
    drawLanyardSlot(ctx, W, 20);
  }
};
