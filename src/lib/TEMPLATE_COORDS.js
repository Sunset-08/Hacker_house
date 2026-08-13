/**
 * TEMPLATE_COORDS.js
 * ============================================================
 * Single source of truth for all template layout coordinates.
 *
 * All values are in ORIGINAL IMAGE PIXEL SPACE.
 * Use pct(value, dimension) to convert to CSS percentages.
 *
 * Template image dimensions (verified with sips):
 *   hacker-house  : 1024 x 1536 px
 *   beach         : 1023 x 1537 px
 *   minimal       : 1024 x 1536 px
 *   boarding-pass : 1536 x 1024 px
 *
 * Coordinates measured by visual inspection of the actual PNG source files.
 * Every template has its own independent coordinate system.
 * DO NOT copy coordinates between templates.
 *
 * DEBUG_OVERLAYS:
 *   Set to true during development to show dashed outlines on every
 *   overlay slot so you can verify alignment against the template.
 *   MUST be false for production.
 */

export const DEBUG_OVERLAYS = false;

/** Convert original-px coordinate to CSS percentage string */
export function pct(value, dimension) {
  return `${((value / dimension) * 100).toFixed(4)}%`;
}

// ─────────────────────────────────────────────────────────────
// HACKER HOUSE   1024 x 1536
// ─────────────────────────────────────────────────────────────
// photo:        Large portrait silhouette frame, centre of card
// name:         Dark-green pill nameplate banner below photo
// builderId:    Blank line after printed "BUILDER ID:" label
// stack:        Blank line after printed "STACK –" label
// builderClass: Blank line after printed "BUILDER CLASS –" label
// qr:           Pink-border QR placeholder rectangle (lower centre)
// ─────────────────────────────────────────────────────────────
const hackerHouse = {
  id:    'hacker-house',
  label: 'HACKER HOUSE',
  W: 1024,
  H: 1536,

  photo: {
    x: 207, y: 430, w: 610, h: 550, radius: 12,
    objectPosition: '50% 18%',
  },

  name: {
    x: 120, y: 990, w: 790, h: 80,
    align: 'center',
    color: '#F5F0DC',
    fontWeight: '800',
    fontSize: 52,
  },

  builderId: {
    x: 375, y: 1095, w: 595, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 34,
  },

  stack: {
    x: 345, y: 1150, w: 625, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 34,
  },

  builderClass: {
    x: 455, y: 1206, w: 515, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 32,
  },

  qr: {
    x: 298, y: 1305, w: 215, h: 210,
    dark: '#0C4A1E',
    light: '#FFF8EE',
  },
};

// ─────────────────────────────────────────────────────────────
// BEACH   1023 x 1537
// ─────────────────────────────────────────────────────────────
// photo:        Portrait frame top-left
// name:         Empty cream name box (first rounded rect, top-right)
// builderId:    Inside the "BUILDER ID:" cream box (second rounded rect)
// stack:        Blank area after "</> STACK –" label
// builderClass: Blank area after "BUILDER CLASS –" label
// qr:           Large cream QR square at bottom centre
// ─────────────────────────────────────────────────────────────
const beach = {
  id:    'beach',
  label: 'BEACH',
  W: 1023,
  H: 1537,

  photo: {
    x: 47, y: 443, w: 327, h: 377, radius: 14,
    objectPosition: '50% 18%',
  },

  name: {
    x: 395, y: 463, w: 590, h: 68,
    align: 'center',
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: 42,
  },

  builderId: {
    x: 430, y: 540, w: 540, h: 58,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 30,
  },

  stack: {
    x: 445, y: 627, w: 525, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 30,
  },

  builderClass: {
    x: 445, y: 695, w: 525, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 30,
  },

  qr: {
    x: 335, y: 1085, w: 230, h: 225,
    dark: '#0C4A1E',
    light: '#FFF8EE',
  },
};

// ─────────────────────────────────────────────────────────────
// MINIMAL   1024 x 1536
// ─────────────────────────────────────────────────────────────
// photo:        Centre teal-border portrait frame
// name:         Centred below photo (no printed label on template)
// stack:        Blank after "</> STACK –"
// builderClass: Blank after "BUILDER CLASS –"
// builderId:    Navy footer strip (right of QR)
// qr:           White QR square in navy footer section
// ─────────────────────────────────────────────────────────────
const minimal = {
  id:    'minimal',
  label: 'MINIMAL',
  W: 1024,
  H: 1536,

  photo: {
    x: 288, y: 487, w: 446, h: 474, radius: 16,
    objectPosition: '50% 18%',
  },

  name: {
    x: 165, y: 995, w: 695, h: 58,
    align: 'center',
    color: '#1a2744',
    fontWeight: '800',
    fontSize: 48,
  },

  stack: {
    x: 265, y: 1068, w: 680, h: 46,
    align: 'left',
    color: '#D9534F',
    fontWeight: '700',
    fontSize: 34,
  },

  builderClass: {
    x: 265, y: 1132, w: 680, h: 46,
    align: 'left',
    color: '#1A7A6E',
    fontWeight: '700',
    fontSize: 32,
  },

  builderId: {
    x: 395, y: 1428, w: 430, h: 32,
    align: 'left',
    color: '#F37825',
    fontWeight: '700',
    fontSize: 22,
  },

  qr: {
    x: 308, y: 1320, w: 208, h: 208,
    dark: '#0B2545',
    light: '#FFFFFF',
  },
};

// ─────────────────────────────────────────────────────────────
// BOARDING PASS   1536 x 1024  (landscape)
// ─────────────────────────────────────────────────────────────
// photo:        Small portrait box left of main ticket
// name:         Above "BUILDER ID:", right of photo
// builderId:    Blank area after "BUILDER ID:" printed label
// stack:        Blank area after "</> STACK –"
// builderClass: Blank area after "BUILDER CLASS –"
// qr:           Cream QR square, bottom centre of main ticket
// ─────────────────────────────────────────────────────────────
const boardingPass = {
  id:    'boarding-pass',
  label: 'BOARDING PASS',
  W: 1536,
  H: 1024,

  photo: {
    x: 183, y: 450, w: 258, h: 288, radius: 12,
    objectPosition: '50% 18%',
  },

  name: {
    x: 475, y: 460, w: 415, h: 52,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: 38,
  },

  builderId: {
    x: 618, y: 525, w: 375, h: 46,
    align: 'left',
    color: '#4A2574',
    fontWeight: '700',
    fontSize: 28,
  },

  stack: {
    x: 642, y: 592, w: 351, h: 46,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 28,
  },

  builderClass: {
    x: 697, y: 656, w: 296, h: 46,
    align: 'left',
    color: '#cc3c00',
    fontWeight: '700',
    fontSize: 26,
  },

  qr: {
    x: 390, y: 765, w: 165, h: 158,
    dark: '#0C4A1E',
    light: '#FFF8EE',
  },
};

// ─────────────────────────────────────────────────────────────
// Registry — single entry point for all templates
// ─────────────────────────────────────────────────────────────
export const TEMPLATE_COORDS = {
  'hacker-house':  hackerHouse,
  'beach':         beach,
  'minimal':       minimal,
  'boarding-pass': boardingPass,
};

export default TEMPLATE_COORDS;
