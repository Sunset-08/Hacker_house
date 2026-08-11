import QRCode from 'qrcode';

/**
 * Renders a QR code to an offscreen canvas and returns it.
 */
export async function makeQRCanvas(text, { size = 120, dark = '#0c4a1e', light = '#f5f0dc' } = {}) {
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, text || 'https://hackerhouse.show', {
    width: size,
    margin: 2,
    color: { dark, light },
  });
  return canvas;
}

/**
 * Build the QR payload URL.
 * Points to a future verification endpoint.
 */
export function buildQRPayload(builderId) {
  return `https://hackerhouse.show/verify/${builderId}`;
}
