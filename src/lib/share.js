/**
 * share.js
 * ============================================================
 * Centralized sharing utility for Builder ID cards.
 * Handles native Web Share API with image attachments and
 * provides honest fallbacks for unsupported environments.
 */

/**
 * Download a Blob as a file.
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  // Clean up after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Try native file sharing with the given text and PNG file.
 * Returns true if the share was completed (or at least initiated),
 * false if unsupported, and silently handles user cancellation.
 */
async function tryNativeShare(text, blob, filename) {
  if (!navigator.share || !navigator.canShare) return false;

  const file = new File([blob], filename, { type: 'image/png' });
  if (!navigator.canShare({ files: [file] })) return false;

  try {
    await navigator.share({ text, files: [file] });
    return true;
  } catch (err) {
    // User cancelled the share sheet — not an error
    if (err.name === 'AbortError') return true;
    // Other errors — treat as unsupported
    console.warn('Native share failed:', err);
    return false;
  }
}

/**
 * Share the Builder ID card to a specific platform.
 * 
 * @param {Object} opts
 * @param {Blob} opts.blob - The generated PNG blob
 * @param {string} opts.filename - The filename for the PNG
 * @param {string} opts.text - The prewritten caption/message
 * @param {'x' | 'linkedin'} opts.platform - The target platform
 * @returns {Promise<'native_shared' | 'fallback_download'>}
 */
export async function shareBuilderCard({ blob, filename, text, platform }) {
  // 1. Try native Web Share API first
  const shared = await tryNativeShare(text, blob, filename);
  
  if (shared) {
    return 'native_shared';
  }
  
  // 2. Fallback: Open the platform composer WITHOUT downloading the PNG
  let url = '';
  if (platform === 'x') {
    url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
  } else if (platform === 'linkedin') {
    url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent('https://hackerhouse.show');
  }
  
  if (url) {
    window.open(url, '_blank', 'noopener');
  }
  
  return 'fallback_download';
}
