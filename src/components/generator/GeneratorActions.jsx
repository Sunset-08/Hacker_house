import { renderCard } from '../../lib/cardRenderer.js';

function buildXCaption(state) {
  const cls = state.builderClass || 'THE BUILDER';
  const nm = state.name ? ` ${state.name}` : '';
  return encodeURIComponent(
    `Built my HH Goa 2026 Builder ID.\n\nApparently I'm ${cls}.\n\n#FrameInGoa #HackerHouseGoa`
  );
}

function buildLinkedInCaption(state) {
  const nm = state.name ? `${state.name} · ` : '';
  return encodeURIComponent(
    `${nm}Hacker House Goa 2026 — 28–31 October, Goa India.\n\nBuilding in Goa with the best founders, hackers and makers in the country.\n\n#HackerHouseGoa #FrameInGoa`
  );
}

export default function GeneratorActions({ state, onGenerate, status }) {
  async function handleDownload() {
    const canvas = document.createElement('canvas');
    await renderCard(canvas, state, { width: 1200, height: 675 });
    const a = document.createElement('a');
    a.download = `HH-Goa-Builder-ID-${(state.name || 'Builder').replace(/\s+/g, '-')}.png`;
    a.href = canvas.toDataURL('image/png', 1.0);
    a.click();
  }

  function shareX() {
    const url = 'https://twitter.com/intent/tweet?text=' + buildXCaption(state);
    window.open(url, '_blank', 'noopener');
  }

  function shareLinkedIn() {
    const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' +
      encodeURIComponent('https://hackerhouse.show') +
      '&summary=' + buildLinkedInCaption(state);
    window.open(url, '_blank', 'noopener');
  }

  const isDone = status === 'done';

  return (
    <div className="gen-actions">
      <button
        id="generate-btn"
        className="gen-actions__primary"
        onClick={onGenerate}
        disabled={status === 'generating'}
      >
        {status === 'generating' ? 'MAKING IT OFFICIAL...' : isDone ? 'REGENERATE ID' : 'GENERATE BUILDER ID →'}
      </button>

      {isDone && (
        <div className="gen-actions__secondary">
          <button
            id="download-btn"
            className="gen-actions__btn gen-actions__btn--download"
            onClick={handleDownload}
          >
            ↓ DOWNLOAD PNG
          </button>
          <button
            id="share-x-btn"
            className="gen-actions__btn gen-actions__btn--x"
            onClick={shareX}
          >
            𝕏 SHARE
          </button>
          <button
            id="share-li-btn"
            className="gen-actions__btn gen-actions__btn--li"
            onClick={shareLinkedIn}
          >
            in LINKEDIN
          </button>
        </div>
      )}

      <div className="gen-actions__team-hint">
        <button
          id="add-crew-btn"
          className="gen-actions__crew"
          disabled
          title="Coming soon — create a combined team frame"
        >
          + ADD YOUR CREW
        </button>
        <span className="gen-actions__crew-hint">Team frames — coming soon</span>
      </div>
    </div>
  );
}
