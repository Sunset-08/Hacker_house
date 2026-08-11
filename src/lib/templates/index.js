/**
 * Template registry — the single source of truth for all card templates.
 * Add new templates here; the generator will automatically pick them up.
 *
 * Each template must export: { id, name, desc, badge, dimensions, render, renderBack }
 */
import goanTemplate  from './goanTemplate.js';
import modernTemplate from './modernTemplate.js';
import archiveTemplate from './archiveTemplate.js';

export const TEMPLATES = {
  goan:    goanTemplate,
  modern:  modernTemplate,
  archive: archiveTemplate,
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

/** Standard portrait canvas dimensions (2:3) */
export const CARD_W = 1023;
export const CARD_H = 1537;
