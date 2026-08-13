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

/**
 * CALIBRATION_MODE
 * Set to true ONLY during local development to show the FrameCalibrator overlay.
 * MUST be false for production.
 * Also activated automatically when the URL contains ?calibrate=1
 */
export const CALIBRATION_MODE = false;

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
// bio:          Bio/Quote region
// qr:           Pink-border QR placeholder rectangle (lower centre)
// ─────────────────────────────────────────────────────────────
const hackerHouse = {
  id: 'hacker-house',
  label: 'HACKER HOUSE',
  W: 1024,
  H: 1536,

  /**
   * photoFrame — authoritative photo bounding box in native canvas px.
   * Used by:
   *   - TemplateRenderer.jsx  → clips the CSS <img> to this rect (border-radius applied)
   *   - hackerHouseTemplate.js → drawRectPhoto() uses this to clip the canvas render
   * Adjust these values with the FrameCalibrator tool (?calibrate=1).
   */
  photoFrame: {
    x: 315,
    y: 540,
    w: 390,
    h: 390,
    radius: 12,
  },

  // Legacy alias kept so existing canvas templates still destructure cfg.photo
  photo: {
    x: 282,
    y: 418,
    w: 450,
    h: 400,
    objectPosition: '50% 18%'
  },
  name: {
    x: 152,
    y: 960,
    w: 720,
    h: 40,
    fontFamily: 'var(--font-mono)',
    fontSize: 52,
    fontWeight: 700,
    color: '#F5F0DC',
    align: 'center'
  },
  builderId: {
    x: 395,
    y: 1045,
    w: 400,
    h: 30,
    fontFamily: 'var(--font-mono)',
    fontSize: 22,
    fontWeight: 700,
    color: '#0C4A1E',
    align: 'left'
  },
  stack: {
    x: 355,
    y: 1095,
    w: 450,
    h: 30,
    fontFamily: 'var(--font-mono)',
    fontSize: 22,
    fontWeight: 700,
    color: '#0C4A1E',
    align: 'left'
  },
  builderClass: {
    x: 470,
    y: 1155,
    w: 450,
    h: 30,
    fontFamily: 'var(--font-mono)',
    fontSize: 22,
    fontWeight: 700,
    color: '#0C4A1E',
    align: 'left'
  },
  bio: {
    x: 152,
    y: 1155,
    w: 720,
    h: 60,
    fontFamily: 'var(--font-editorial)',
    fontSize: 22,
    fontWeight: 400,
    color: 'rgba(12, 74, 30, 0.8)',
    align: 'center'
  },
  qr: {
    x: 395,
    y: 1240,
    w: 230,
    h: 230,
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
  id: 'beach',
  label: 'BEACH',
  W: 1023,
  H: 1537,

  /**
   * photoFrame — authoritative photo bounding box in native canvas px.
   * Adjust with FrameCalibrator tool (?calibrate=1).
   */
  photoFrame: {
    x: 95,
    y: 480,
    w: 300,
    h: 435,
    radius: 14,
  },

  photo: {
    x: 47, y: 443, w: 327, h: 377,
    objectPosition: '50% 18%',
  },

  name: {
    x: 325, y: 525, w: 585, h: 68,
    align: 'center',
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: 35,
  },

  builderId: {
    x: 565, y: 615, w: 540, h: 58,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 20,
  },

  stack: {
    x: 600, y: 695, w: 525, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 17,
  },

  builderClass: {
    x: 680, y: 780, w: 525, h: 45,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 17,
  },

  qr: {
    x: 390, y: 1190, w: 230, h: 300,
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
  id: 'minimal',
  label: 'MINIMAL',
  W: 1024,
  H: 1536,

  /**
   * photoFrame — authoritative photo bounding box in native canvas px.
   * Adjust with FrameCalibrator tool (?calibrate=1).
   */
  photoFrame: {
    x: 355,
    y: 650,
    w: 300,
    h: 334,
    radius: 16,
  },

  photo: {
    x: 288, y: 487, w: 446, h: 474,
    objectPosition: '50% 18%',
  },

  name: {
    x: 165, y: 975, w: 695, h: 58,
    align: 'center',
    color: '#1a2744',
    fontWeight: '800',
    fontSize: 40,
  },

  stack: {
    x: 430, y: 1015, w: 680, h: 46,
    align: 'left',
    color: '#D9534F',
    fontWeight: '700',
    fontSize: 24,
  },

  builderClass: {
    x: 545, y: 1090, w: 680, h: 46,
    align: 'left',
    color: '#1A7A6E',
    fontWeight: '700',
    fontSize: 24,
  },

  builderId: {
    x: 755, y: 1300, w: 430, h: 32,
    align: 'left',
    color: '#F37825',
    fontWeight: '700',
    fontSize: 22,
  },

  qr: {
    x: 370, y: 1263, w: 250, h: 180,
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
  id: 'boarding-pass',
  label: 'BOARDING PASS',
  W: 1536,
  H: 1024,

  /**
   * photoFrame — authoritative photo bounding box in native canvas px.
   * Adjust with FrameCalibrator tool (?calibrate=1).
   */
  photoFrame: {
    x: 283,
    y: 520,
    w: 258,
    h: 288,
    radius: 12,
  },

  photo: {
    x: 183, y: 450, w: 258, h: 288,
    objectPosition: '50% 18%',
  },

  name: {
    x: 1205, y: 190, w: 415, h: 52,
    align: 'left',
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: 28,
  },

  builderId: {
    x: 700, y: 525, w: 375, h: 46,
    align: 'left',
    color: '#4A2574',
    fontWeight: '700',
    fontSize: 28,
  },

  stack: {
    x: 730, y: 607, w: 351, h: 46,
    align: 'left',
    color: '#4A2574',
    fontWeight: '700',
    fontSize: 20,
  },

  builderClass: {
    x: 820, y: 676, w: 296, h: 46,
    align: 'left',
    color: '#cc3c00',
    fontWeight: '700',
    fontSize: 17,
  },

  qr: {
    x: 470, y: 840, w: 165, h: 158,
    dark: '#0C4A1E',
    light: '#FFF8EE',
  },
};

// ─────────────────────────────────────────────────────────────
// Registry — single entry point for all templates
// ─────────────────────────────────────────────────────────────
export const TEMPLATE_COORDS = {
  'hacker-house': hackerHouse,
  'beach': beach,
  'minimal': minimal,
  'boarding-pass': boardingPass,
};

export default TEMPLATE_COORDS;
