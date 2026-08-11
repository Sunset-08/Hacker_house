import './GeneratorPlaceholder.css';

/**
 * GeneratorPlaceholder — the section the hero CTA scrolls to.
 * This is the anchor point for the future generator UI.
 * It communicates the upcoming feature without implementing it.
 */
export default function GeneratorPlaceholder() {
  return (
    <section className="gen" id="generator" aria-label="Builder ID Generator">

      <div className="gen__inner">

        {/* Header */}
        <div className="gen__header">
          <div className="gen__header-label">
            <span className="gen__header-tag">COMING NEXT</span>
          </div>
          <h2 className="gen__title">
            IDENTITY
            <br />
            <span className="gen__title-accent">GENERATOR</span>
          </h2>
          <p className="gen__desc">
            Generate your official Hacker House Goa 2026 Builder ID card.
            Upload a photo, choose your visual mode, enter your details — done in ~2 seconds.
          </p>
        </div>

        {/* Feature grid */}
        <div className="gen__features">
          {[
            {
              icon: '⬆',
              title: 'UPLOAD',
              desc: 'JPG · PNG · HEIC\nDrag & drop or camera',
            },
            {
              icon: '◧',
              title: 'CHOOSE MODE',
              desc: '3 visual themes\nHH Cypherpunk · Goa Sunset · Matrix',
            },
            {
              icon: '◉',
              title: 'YOUR DETAILS',
              desc: 'Name · Stack · Bio\nOptional team frame',
            },
            {
              icon: '↓',
              title: 'DOWNLOAD',
              desc: 'Share on X · LinkedIn\nQR code included',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="gen__feature">
              <span className="gen__feature-icon">{icon}</span>
              <div>
                <span className="gen__feature-title">{title}</span>
                <span className="gen__feature-desc">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder canvas area */}
        <div className="gen__canvas-placeholder">
          <div className="gen__canvas-inner">
            <span className="gen__canvas-icon">◫</span>
            <p className="gen__canvas-label">
              BUILDER ID GENERATOR
            </p>
            <p className="gen__canvas-sub">
              INTERFACE LOADING SOON
            </p>
            <div className="gen__canvas-edition">HH GOA 2026 EDITION</div>
          </div>
          {/* Corner decorators like the reference */}
          <span className="gen__corner gen__corner--tl" />
          <span className="gen__corner gen__corner--tr" />
          <span className="gen__corner gen__corner--bl" />
          <span className="gen__corner gen__corner--br" />
        </div>

      </div>

      {/* Footer strip */}
      <div className="gen__footer">
        <span className="gen__footer-left">
          GOA, INDIA · 28 – 31 OCT 2026
        </span>
        <span className="gen__footer-right">
          2:47 PM STUDIO
        </span>
      </div>

    </section>
  );
}
