import QRCode from 'qrcode';

/** Single source of truth — change this when the backend is ready */
export const VERIFICATION_BASE_URL = 'https://verify.hhgoa.com';

export function buildQRPayload(builderId) {
  return `${VERIFICATION_BASE_URL}/${builderId || 'preview'}`;
}

export async function makeQRCanvas(text, { size = 120, dark = '#0c4a1e', light = '#f5f0dc' } = {}) {
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, text || VERIFICATION_BASE_URL, {
    width: size, margin: 2, color: { dark, light },
  });
  return canvas;
}
