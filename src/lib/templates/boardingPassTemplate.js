/**
 * TEMPLATE: BOARDING PASS
 * Source of Truth: src/components/templates/Boarding_Pass.png (1536 × 1024)
 *
 * The template image IS the complete design.
 * This renderer ONLY places dynamic user data into the empty areas:
 *   1. User photo    → into the small portrait box (left side)
 *   2. Name text     → in the passenger area (right of photo)
 *   3. Builder ID    → after the "BUILDER ID:" label
 *   4. Stack         → after the "</> STACK –" label
 *   5. Builder Class → after the "🏛 BUILDER CLASS –" label
 *   6. QR code       → inside the cream QR square (bottom centre)
 *   7. Stub column   → repeats name, class, ID in the right strip
 *
 * Nothing else. No extra boxes, no extra borders.
 */
import { TEMPLATE_CONFIGS } from './templateConfig.js';
import { getCleanTemplateCanvas } from './templateUtils.js';
import { drawRectPhoto, drawFitText, roundRect, drawCardBackground } from '../canvasUtils.js';
import { makeQRCanvas, buildQRPayload } from '../qr.js';

const cfg = TEMPLATE_CONFIGS['boarding-pass'];
const { width: W, height: H } = cfg.dimensions;

export default {
  id:         'boarding-pass',
  name:       'BOARDING PASS',
  desc:       'Travel / boarding pass aesthetic',
  badge:      '✈',
  label:      'STYLE 04',
  dimensions: { width: W, height: H },

  async render(ctx, state, _t) {
    const { photo, photoCrop, name, stack, builderClass, builderId } = state;

    // ── LAYER 1: Template background image (untouched) ────────────────────
    try {
      const tmpl = await getCleanTemplateCanvas(cfg.image, 'boarding-pass');
      ctx.drawImage(tmpl, 0, 0, W, H);
    } catch (e) {
      console.error('Failed to load Boarding_Pass template:', e);
      drawCardBackground(ctx, W, H, '#F7F4EB', 24);
    }

    ctx.save();

    // ── LAYER 2: User photo ───────────────────────────────────────────────
    if (photo) {
      const { x, y, width, height, radius } = cfg.photo;
      drawRectPhoto(ctx, photo, x, y, width, height, radius, photoCrop || {});
    }

    // ── LAYER 3: Name text ────────────────────────────────────────────────
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

    // ── LAYER 8: Stub column (right side strip) ───────────────────────────
    if (name && name.trim()) {
      const c = cfg.stubName;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      drawFitText(ctx, name.trim().toUpperCase(), 0, 0, c.maxWidth, c.font, c.color);
      ctx.restore();
    }

    if (builderClass && builderClass.trim()) {
      const c = cfg.stubClass;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      drawFitText(ctx, builderClass.trim().toUpperCase(), 0, 0, c.maxWidth, c.font, c.color);
      ctx.restore();
    }

    if (builderId && builderId.trim()) {
      const c = cfg.stubId;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      drawFitText(ctx, builderId.trim(), 0, 0, c.maxWidth, c.font, c.color);
      ctx.restore();
    }

    ctx.restore();
  },

  async renderBack(ctx, state, _t) {
    const { name, stack, builderClass, builderId } = state;

    drawCardBackground(ctx, W, H, '#4A2574', 24);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 24);
    ctx.clip();

    ctx.fillStyle = '#4A2574';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#FFE600';
    ctx.font = '900 48px "Space Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('BOARDING PASS', W / 2, 120);
    ctx.fillStyle = 'rgba(255,230,0,0.8)';
    ctx.font = '700 22px "Space Mono"';
    ctx.fillText('FLIGHT HH-2026 CREDENTIAL', W / 2, 170);

    const drawField = (label, val, y) => {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,230,0,0.55)';
      ctx.font = '700 18px "Space Mono"';
      ctx.fillText(label, W / 2, y);
      ctx.fillStyle = '#FFF';
      ctx.font = '900 34px "Playfair Display"';
      ctx.fillText((val || '—').toUpperCase(), W / 2, y + 48);
    };

    let fY = 270;
    if (name)         { drawField('PASSENGER NAME',      name,         fY); fY += 135; }
    if (stack)        { drawField('STACK / ROLE',        stack,        fY); fY += 135; }
    if (builderClass) { drawField('BUILDER SEAT & CLASS',builderClass, fY); fY += 135; }

    if (builderId) {
      try {
        const qr = await makeQRCanvas(buildQRPayload(builderId), { size: 180, dark: '#4A2574', light: '#FFFFFF' });
        ctx.drawImage(qr, (W - 180) / 2, H - 280, 180, 180);
      } catch (_) {}
      ctx.fillStyle = '#FFE600';
      ctx.font = '700 18px "Space Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(builderId, W / 2, H - 60);
    }

    ctx.restore();
  }
};
