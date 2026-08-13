/**
 * Template registry — the single source of truth for all card templates.
 * Add new templates here; the generator will automatically pick them up.
 *
 * Each template must export: { id, name, desc, badge, dimensions, render, renderBack }
 */
import hackerHouseTemplate  from './hackerHouseTemplate.js';
import beachTemplate        from './beachTemplate.js';
import minimalTemplate      from './minimalTemplate.js';
import boardingPassTemplate from './boardingPassTemplate.js';

export const TEMPLATES = {
  'hacker-house':  hackerHouseTemplate,
  'beach':         beachTemplate,
  'minimal':       minimalTemplate,
  'boarding-pass': boardingPassTemplate,
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

/** Standard portrait canvas dimensions (2:3) */
export const CARD_W = 1023;
export const CARD_H = 1537;
