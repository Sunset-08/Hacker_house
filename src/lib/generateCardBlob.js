/**
 * generateCardBlob.js
 * ============================================================
 * Single entry point for generating the final Builder ID card
 * as a PNG Blob. Used by Download, X Share, and LinkedIn Share
 * so every output is identical.
 *
 * Pipeline:
 *   card state → renderCard (canvas) → PNG Blob
 *       ├── Download
 *       ├── X Share
 *       └── LinkedIn Share
 */
import { renderCard, getTemplateDimensions } from './cardRenderer.js';

/**
 * Sanitize a name for use in a filename.
 * Strips non-alphanumeric chars, collapses spaces → hyphens, uppercases.
 */
function sanitizeName(name) {
  return (name || 'BUILDER')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    || 'BUILDER';
}

/**
 * Generate the final Builder ID card as a PNG Blob.
 *
 * @param {object} state — full generator state (mode, photo, name, etc.)
 * @returns {Promise<{ blob: Blob, filename: string }>}
 */
export async function generateBuilderCardBlob(state) {
  const dims = getTemplateDimensions(state.mode);
  const canvas = document.createElement('canvas');

  // Render at the template's native resolution — no custom overrides
  await renderCard(canvas, state, { width: dims.width, height: dims.height });

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas toBlob returned null'));
      },
      'image/png',
      1.0
    );
  });

  const sanitized = sanitizeName(state.name);
  const filename = `HHGOA-2026-${sanitized}.png`;

  return { blob, filename };
}
