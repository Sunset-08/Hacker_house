import { toPng } from 'html-to-image';

/**
 * Sanitizes builder name into a safe filename.
 * @param {string} name - Builder Name
 * @param {string} team - Team Name
 * @returns {string} Sanitized filename
 */
export function sanitizeFilename(name = '', team = '') {
    const cleanName = (name || 'Builder').trim().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
    const cleanTeam = (team || '').trim().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');

    if (cleanTeam && cleanTeam !== 'SOLO') {
        return `Builder-ID-${cleanName}-${cleanTeam}.png`;
    }
    return `Builder-ID-${cleanName}.png`;
}

/**
 * Renders a target DOM node to a high-resolution PNG data URL.
 * @param {HTMLElement} domNode - Target DOM element ref
 * @returns {Promise<string>} PNG Data URL
 */
export async function renderElementToPng(domNode) {
    if (!domNode) {
        throw new Error('Export element target not found.');
    }

    // Ensure document fonts are loaded before capture
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }

    // Capture using html-to-image with 2.5x high-res pixel ratio for 300 DPI sharpness
    const dataUrl = await toPng(domNode, {
        quality: 0.95,
        pixelRatio: 2.5,
        cacheBust: true,
        backgroundColor: '#08080C',
        filter: (node) => {
            // Exclude unwanted elements if marked
            return !node.classList || !node.classList.contains('no-export');
        }
    });

    return dataUrl;
}

/**
 * Triggers a browser download for a given PNG data URL.
 * @param {string} dataUrl - Data URL string
 * @param {string} filename - Output filename
 */
export function downloadDataUrl(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
