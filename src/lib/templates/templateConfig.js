/**
 * Template Layout Configuration
 * =============================================================
 * DERIVED FROM TEMPLATE_COORDS.js — the single source of truth.
 *
 * This file bridges the TEMPLATE_COORDS coordinate format
 * (used by the live preview) into the format expected by
 * the canvas template renderers (used for PNG export).
 *
 * DO NOT hardcode coordinates here. All layout values are
 * derived from TEMPLATE_COORDS so preview ↔ PNG stay in sync.
 */
import { TEMPLATE_COORDS } from '../TEMPLATE_COORDS.js';

import hackerHouseImgSrc  from '../../components/templates/Hacker_House.png';
import beachImgSrc        from '../../components/templates/Beach.png';
import minimalImgSrc      from '../../components/templates/Minimal.png';
import boardingPassImgSrc from '../../components/templates/Boarding_Pass.png';

// ── Bridge helpers ─────────────────────────────────────────────
// Convert TEMPLATE_COORDS text field → canvas renderer text config.
// TEMPLATE_COORDS uses: { x, y, w, h, fontSize, fontWeight, fontFamily, color, align }
// Canvas renderers expect: { x, y, maxWidth, font, color, align }

function resolveFontConfig(field) {
  const weight = field.fontWeight || 700;
  const size   = field.fontSize  || 24;
  let family = field.fontFamily || '"Space Mono", monospace';
  if (family.includes('var(--font-mono)'))      family = '"Space Mono", monospace';
  if (family.includes('var(--font-editorial)')) family = '"DM Sans", sans-serif';
  const style = family.includes('DM Sans') ? 'italic' : 'normal';
  return { family, size, weight, style };
}

function textConfig(field) {
  return {
    x:        field.x + (field.align === 'center' ? field.w / 2 : 0),
    y:        field.y + field.h / 2,
    maxWidth: field.w,
    font:     resolveFontConfig(field),
    color:    field.color || '#1a1a1a',
    align:    field.align || 'left',
    baseline: 'middle',
  };
}


function photoConfig(coords) {
  const frame = coords.photoFrame;
  return {
    x:      frame.x,
    y:      frame.y,
    width:  frame.w,
    height: frame.h,
    radius: frame.radius || 12,
  };
}

function qrConfig(qr) {
  return {
    x:      qr.x,
    y:      qr.y,
    width:  qr.w,
    height: qr.h,
    dark:   qr.dark  || '#0C4A1E',
    light:  qr.light || '#FFF8EE',
  };
}

// ── Template image map ─────────────────────────────────────────
const IMAGES = {
  'hacker-house':  hackerHouseImgSrc,
  'beach':         beachImgSrc,
  'minimal':       minimalImgSrc,
  'boarding-pass': boardingPassImgSrc,
};

// ── Build config for each template from TEMPLATE_COORDS ────────

function buildConfig(templateId) {
  const coords = TEMPLATE_COORDS[templateId];
  if (!coords) throw new Error(`Unknown template: ${templateId}`);

  const config = {
    id:         coords.id,
    label:      coords.label,
    image:      IMAGES[templateId],
    dimensions: { width: coords.W, height: coords.H },

    photoFrame: photoConfig(coords),
    photo:      photoConfig(coords),

    nameText:         textConfig(coords.name),
    builderIdText:    textConfig(coords.builderId),
    stackText:        textConfig(coords.stack),
    builderClassText: textConfig(coords.builderClass),

    qr: qrConfig(coords.qr),
  };



  return config;
}

// ── Boarding Pass has extra stub fields ─────────────────────────

function buildBoardingPassConfig() {
  const config = buildConfig('boarding-pass');
  const coords = TEMPLATE_COORDS['boarding-pass'];

  // The boarding pass template has stub text fields that don't exist
  // in TEMPLATE_COORDS — use the existing name/class/id fields as basis
  // for the rotated stub column. These are hand-tuned for the stub strip.
  config.stubName = {
    x:        1310,
    y:        230,
    maxWidth: 200,
    font:     'bold 22px "Space Mono", monospace',
    color:    '#1a1a1a',
    align:    'center',
  };
  config.stubClass = {
    x:        1310,
    y:        658,
    maxWidth: 200,
    font:     '20px "Space Mono", monospace',
    color:    '#1a1a1a',
    align:    'center',
  };
  config.stubId = {
    x:        1310,
    y:        752,
    maxWidth: 200,
    font:     'bold 20px "Space Mono", monospace',
    color:    '#4A2574',
    align:    'center',
  };

  return config;
}

// ── Export ──────────────────────────────────────────────────────

export const TEMPLATE_CONFIGS = {
  'hacker-house':  buildConfig('hacker-house'),
  'beach':         buildConfig('beach'),
  'minimal':       buildConfig('minimal'),
  'boarding-pass': buildBoardingPassConfig(),
};
