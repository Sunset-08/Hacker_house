/**
 * Template Utils — Loads official source template images directly
 * without modifying, drawing patches, or adding extra background boxes.
 */
const templateImageCache = new Map();

/**
 * Loads official source template image asset as a raw HTMLImageElement/Canvas.
 */
export async function getCleanTemplateCanvas(src, mode) {
  if (templateImageCache.has(mode)) {
    return templateImageCache.get(mode);
  }

  const rawImg = await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.error(`Failed to load template image for ${mode}:`, src, err);
      reject(err);
    };
    img.src = src;
  });

  const canvas = document.createElement('canvas');
  canvas.width = rawImg.width;
  canvas.height = rawImg.height;
  const ctx = canvas.getContext('2d');

  // Draw full untouched original template image
  ctx.drawImage(rawImg, 0, 0);

  templateImageCache.set(mode, canvas);
  return canvas;
}
