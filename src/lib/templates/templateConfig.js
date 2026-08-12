/**
 * Template Layout Configuration
 * =============================================================
 * ALL COORDINATES are in the original template image pixel space.
 *
 * Actual template image dimensions (verified with sips):
 *   Hacker House : 1024 × 1536 px (portrait)
 *   Beach        : 1023 × 1537 px (portrait)
 *   Minimal      : 1024 × 1536 px (portrait)
 *   Boarding Pass: 1536 × 1024 px (landscape)
 *
 * Coordinates were mapped by visual inspection of each template image.
 * The renderer ONLY overlays: user photo, name, stack, builderClass,
 * builderId text, and QR code. Nothing else.
 */
import hackerHouseImgSrc  from '../../components/templates/Hacker_House.png';
import beachImgSrc        from '../../components/templates/Beach.png';
import minimalImgSrc      from '../../components/templates/Minimal.png';
import boardingPassImgSrc from '../../components/templates/Boarding_Pass.png';

export const TEMPLATE_CONFIGS = {

  /* ─────────────────────────────────────────────────────────────
     HACKER HOUSE  1024 × 1536
     ─ Large portrait silhouette frame, centre of card
     ─ Dark-green name banner below photo (existing design element)
     ─ Cream data section: BUILDER ID, STACK, BUILDER CLASS lines
     ─ QR: empty pink-border rectangle in bottom third
   ───────────────────────────────────────────────────────────── */
  'hacker-house': {
    id:    'hacker-house',
    label: 'HACKER HOUSE',
    image: hackerHouseImgSrc,
    dimensions: { width: 1024, height: 1536 },

    // Silhouette photo region
    photo: { x: 208, y: 432, width: 608, height: 548, radius: 12 },

    // Dark-green nameplate pill — text is centred inside the banner
    nameText: {
      x:        512,        // canvas centre-x
      y:        1063,       // baseline
      maxWidth: 720,
      font:     'bold 52px "Space Mono", monospace',
      color:    '#F5F0DC',
      align:    'center'
    },

    // After the printed label "BUILDER ID:" (value only goes here)
    builderIdText: {
      x:        375,
      y:        1130,
      maxWidth: 575,
      font:     'bold 34px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    // After the printed label "STACK –"
    stackText: {
      x:        355,
      y:        1187,
      maxWidth: 595,
      font:     'bold 34px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    // After the printed label "BUILDER CLASS –"
    builderClassText: {
      x:        470,
      y:        1245,
      maxWidth: 480,
      font:     'bold 32px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    // Pink-border QR placeholder rectangle (lower centre)
    qr: { x: 300, y: 1310, width: 215, height: 215, dark: '#0C4A1E', light: '#FFF8EE' }
  },

  /* ─────────────────────────────────────────────────────────────
     BEACH  1023 × 1537
     ─ Portrait frame top-left
     ─ Cream name box top-right (first rounded rect)
     ─ "BUILDER ID:" cream box top-right (second rounded rect)
     ─ Stack / Class lines mid-right
     ─ Large QR square bottom centre
   ───────────────────────────────────────────────────────────── */
  'beach': {
    id:    'beach',
    label: 'BEACH',
    image: beachImgSrc,
    dimensions: { width: 1023, height: 1537 },

    photo: { x: 48, y: 445, width: 330, height: 380, radius: 14 },

    nameText: {
      x:        511,        // centre of name cream box
      y:        505,
      maxWidth: 380,
      font:     'bold 38px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'center'
    },

    builderIdText: {
      x:        430,        // after "BUILDER ID:" printed label
      y:        573,
      maxWidth: 350,
      font:     'bold 28px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    stackText: {
      x:        440,
      y:        642,
      maxWidth: 500,
      font:     'bold 30px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    builderClassText: {
      x:        440,
      y:        708,
      maxWidth: 500,
      font:     'bold 30px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    qr: { x: 340, y: 1090, width: 230, height: 230, dark: '#0C4A1E', light: '#FFF8EE' }
  },

  /* ─────────────────────────────────────────────────────────────
     MINIMAL  1024 × 1536
     ─ Centre portrait frame (teal rounded-rect border)
     ─ Name below photo centre
     ─ Stack / Class below name
     ─ QR square in bottom navy section
   ───────────────────────────────────────────────────────────── */
  'minimal': {
    id:    'minimal',
    label: 'MINIMAL',
    image: minimalImgSrc,
    dimensions: { width: 1024, height: 1536 },

    photo: { x: 290, y: 492, width: 444, height: 470, radius: 16 },

    nameText: {
      x:        512,
      y:        1035,
      maxWidth: 700,
      font:     'bold 50px "Space Mono", monospace',
      color:    '#1a2744',
      align:    'center'
    },

    builderIdText: {
      // In the navy footer strip — right-side area
      x:        395,
      y:        1436,
      maxWidth: 440,
      font:     'bold 24px "Space Mono", monospace',
      color:    '#F37825',
      align:    'left'
    },

    stackText: {
      x:        270,
      y:        1107,
      maxWidth: 660,
      font:     'bold 34px "Space Mono", monospace',
      color:    '#D9534F',
      align:    'left'
    },

    builderClassText: {
      x:        270,
      y:        1167,
      maxWidth: 660,
      font:     'bold 32px "Space Mono", monospace',
      color:    '#1A7A6E',
      align:    'left'
    },

    qr: { x: 310, y: 1330, width: 200, height: 200, dark: '#0B2545', light: '#FFFFFF' }
  },

  /* ─────────────────────────────────────────────────────────────
     BOARDING PASS  1536 × 1024  (landscape)
     ─ Small portrait box left side of main ticket
     ─ Name after "BUILDER ID:" in right section
     ─ Stack / Class mid ticket
     ─ QR bottom centre of main ticket
     ─ Stub (right column) repeats key info
   ───────────────────────────────────────────────────────────── */
  'boarding-pass': {
    id:    'boarding-pass',
    label: 'BOARDING PASS',
    image: boardingPassImgSrc,
    dimensions: { width: 1536, height: 1024 },

    photo: { x: 183, y: 452, width: 258, height: 290, radius: 12 },

    // Name above the "BUILDER ID:" field, right of photo
    nameText: {
      x:        475,
      y:        502,
      maxWidth: 420,
      font:     'bold 40px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    builderIdText: {
      x:        620,        // after "BUILDER ID:" printed label
      y:        558,
      maxWidth: 380,
      font:     'bold 30px "Space Mono", monospace',
      color:    '#4A2574',
      align:    'left'
    },

    stackText: {
      x:        645,
      y:        620,
      maxWidth: 355,
      font:     'bold 30px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'left'
    },

    builderClassText: {
      x:        700,
      y:        682,
      maxWidth: 300,
      font:     'bold 28px "Space Mono", monospace',
      color:    '#cc3c00',
      align:    'left'
    },

    qr: { x: 393, y: 772, width: 165, height: 165, dark: '#0C4A1E', light: '#FFF8EE' },

    // Right-side stub column
    stubName: {
      x:        1310,
      y:        230,
      maxWidth: 200,
      font:     'bold 22px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'center'
    },
    stubClass: {
      x:        1310,
      y:        658,
      maxWidth: 200,
      font:     '20px "Space Mono", monospace',
      color:    '#1a1a1a',
      align:    'center'
    },
    stubId: {
      x:        1310,
      y:        752,
      maxWidth: 200,
      font:     'bold 20px "Space Mono", monospace',
      color:    '#4A2574',
      align:    'center'
    }
  }
};
