import { useState } from 'react';
import { generateBuilderCardBlob } from '../../lib/generateCardBlob.js';
import { shareBuilderCard, downloadBlob } from '../../lib/share.js';

function buildXCaption(state) {
  const cls = state.builderClass || 'THE BUILDER';
  return `Built my HH Goa 2026 Builder ID.\n\nApparently I'm ${cls}.\n\n#FrameInGoa #HackerHouseGoa`;
}

function buildLinkedInCaption() {
  return `Hacker House Goa 2026 — 28–31 October, Goa India.\n\nBuilding in Goa with the best founders, hackers and makers.\n\n#HackerHouseGoa #FrameInGoa`;
}

export default function GeneratorActions({ state, onGenerate, status }) {
  const [shareMsg, setShareMsg] = useState(null);

  // Clear share message after a few seconds
  function showShareMsg(msg, durationMs = 4000) {
    setShareMsg(msg);
    setTimeout(() => setShareMsg(null), durationMs);
  }

  async function handleDownload() {
    try {
      const { blob, filename } = await generateBuilderCardBlob(state);
      downloadBlob(blob, filename);
    } catch (err) {
      console.error('PNG generation failed:', err);
      showShareMsg("Couldn't generate your Builder ID. Please try again.");
    }
  }

  async function handleShareX() {
    try {
      const { blob, filename } = await generateBuilderCardBlob(state);
      const text = buildXCaption(state);
      const result = await shareBuilderCard({ blob, filename, text, platform: 'x' });
      
      // No need to show a message on fallback since we just open the compose URL.
      if (result === 'fallback_download') {
        // Silently opened new tab.
      }
    } catch (err) {
      console.error('PNG generation failed:', err);
      showShareMsg("Couldn't generate your Builder ID. Please try again.");
    }
  }

  async function handleShareLinkedIn() {
    try {
      const { blob, filename } = await generateBuilderCardBlob(state);
      const text = buildLinkedInCaption();
      const result = await shareBuilderCard({ blob, filename, text, platform: 'linkedin' });
      
      // No need to show a message on fallback since we just open the compose URL.
      if (result === 'fallback_download') {
        // Silently opened new tab.
      }
    } catch (err) {
      console.error('PNG generation failed:', err);
      showShareMsg("Couldn't generate your Builder ID. Please try again.");
    }
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
            onClick={handleShareX}
          >
            𝕏 SHARE
          </button>
          <button
            id="share-li-btn"
            className="gen-actions__btn gen-actions__btn--li"
            onClick={handleShareLinkedIn}
          >
            in LINKEDIN
          </button>
        </div>
      )}

      {shareMsg && (
        <div className="gen-actions__share-msg" role="status">
          {shareMsg}
        </div>
      )}


    </div>
  );
}
