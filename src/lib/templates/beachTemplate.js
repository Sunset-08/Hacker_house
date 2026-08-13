/**
 * TEMPLATE: BEACH
 * Source of Truth: src/components/templates/Beach.png (1023 × 1537)
 *
 * The template image IS the complete design.
 * This renderer ONLY places dynamic user data into the empty areas:
 *   1. User photo   → into the portrait frame (top-left)
 *   2. Name text    → in the cream name box (top-right)
 *   3. Builder ID   → after the "BUILDER ID:" label (top-right second box)
 *   4. Stack        → after the "</> STACK –" label
 *   5. Builder Class → after the "🏛 BUILDER CLASS –" label
 *   6. QR code      → inside the large cream QR square (bottom)
 *
 * Nothing else. No extra boxes, no extra borders.
 */
import { TEMPLATE_CONFIGS } from './templateConfig.js';
import { getCleanTemplateCanvas } from './templateUtils.js';
import { drawRectPhoto, drawFitText, roundRect, drawCardBackground, drawLanyardSlot } from '../canvasUtils.js';
import { makeQRCanvas, buildQRPayload } from '../qr.js';

const cfg = TEMPLATE_CONFIGS['beach'];
const { width: W, height: H } = cfg.dimensions;

export default {
  id:         'beach',
  name:       'BEACH',
  desc:       'Coastal Goa experience',
  badge:      '◉',
  label:      'STYLE 02',
  dimensions: { width: W, height: H },

  async render(ctx, state, _t) {
    const { photo, photoCrop, name, stack, builderClass, builderId } = state;

    // ── LAYER 1: Template background image (untouched) ────────────────────
    try {
      const tmpl = await getCleanTemplateCanvas(cfg.image, 'beach');
      ctx.drawImage(tmpl, 0, 0, W, H);
    } catch (e) {
      console.error('Failed to load Beach template:', e);
      drawCardBackground(ctx, W, H, '#E8652B', 28);
    }

    ctx.save();

    // ── LAYER 2: User photo ───────────────────────────────────────────────
    if (photo) {
      const { x, y, width, height, radius } = cfg.photoFrame || cfg.photo;
      drawRectPhoto(ctx, photo, x, y, width, height, radius, photoCrop || {});
    }

    // ── LAYER 3: Name text (inside cream name box, top-right) ─────────────
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

    // ── LAYER 7: QR code ─────────────────────────────────────────────────
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

    drawCardBackground(ctx, W, H, '#C85A1E', 28);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 28);
    ctx.clip();

    ctx.fillStyle = '#C85A1E';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#FFF8EE';
    ctx.font = '900 52px "Playfair Display"';
    ctx.textAlign = 'center';
    ctx.fillText('BEACH BUILDER ID', W / 2, 140);
    ctx.fillStyle = 'rgba(255,248,238,0.8)';
    ctx.font = '700 22px "Space Mono"';
    ctx.fillText('HH GOA 2026 CREDENTIAL', W / 2, 190);

    const drawField = (label, val, y) => {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,248,238,0.55)';
      ctx.font = '700 18px "Space Mono"';
      ctx.fillText(label, W / 2, y);
      ctx.fillStyle = '#FFF8EE';
      ctx.font = '900 34px "Playfair Display"';
      ctx.fillText((val || '—').toUpperCase(), W / 2, y + 48);
    };

    let fY = 320;
    if (name)         { drawField('BUILDER NAME',  name,         fY); fY += 135; }
    if (stack)        { drawField('STACK / ROLE',  stack,        fY); fY += 135; }
    if (builderClass) { drawField('BUILDER CLASS', builderClass, fY); fY += 135; }

    if (builderId) {
      try {
        const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 180, dark: '#0C4A1E', light: '#FFFFFF' });
        ctx.drawImage(qr, (W - 180) / 2, H - 340, 180, 180);
      } catch (_) {}
      ctx.fillStyle = '#FFF8EE';
      ctx.font = '700 18px "Space Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(builderId, W / 2, H - 120);
    }

    ctx.restore();
    drawLanyardSlot(ctx, W, 20);
  }
};
