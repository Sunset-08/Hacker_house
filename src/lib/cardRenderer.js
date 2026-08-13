/**
 * Card Renderer — thin orchestrator that delegates to template modules.
 * All visual composition lives in src/lib/templates/*.js
 */
import { TEMPLATES, CARD_W, CARD_H } from './templates/index.js';

async function ensureFonts() {
  if (typeof document !== 'undefined') {
    await document.fonts.ready;
    try {
      // Explicitly trigger loading of specific fonts used in the canvas
      await Promise.all([
        document.fonts.load('700 24px "Space Mono"'),
        document.fonts.load('400 24px "DM Sans"'),
        document.fonts.load('900 24px "Playfair Display"')
      ]);
    } catch (err) {
      console.warn('Font preloading failed, falling back to document.fonts.ready', err);
    }
  }
}

function getTemplate(mode) {
  return TEMPLATES[mode] || TEMPLATES.modern;
}

/**
 * Render the FRONT of the Builder ID card onto `canvas`.
 * @param {HTMLCanvasElement} canvas
 * @param {object} state  — { mode, theme, photo, name, stack, bio, team, builderClass, builderId }
 * @param {{ width?: number, height?: number }} opts
 */
export async function renderCard(canvas, state, opts = {}) {
  const tmpl = getTemplate(state.mode);
  const { width = tmpl.dimensions.width, height = tmpl.dimensions.height } = opts;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  await ensureFonts();
  await tmpl.render(ctx, state, null);
}

/**
 * Render the BACK of the Builder ID card.
 */
export async function renderCardBack(canvas, state, opts = {}) {
  const tmpl = getTemplate(state.mode);
  const { width = tmpl.dimensions.width, height = tmpl.dimensions.height } = opts;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  await ensureFonts();
  await tmpl.renderBack(ctx, state, null);
}

/**
 * Get the dimensions for the current mode's template.
 * Used by preview and download to set correct canvas size.
 */
export function getTemplateDimensions(mode) {
  const tmpl = getTemplate(mode);
  return tmpl.dimensions;
}

/** Export dimensions for reference */
export { CARD_W, CARD_H };
