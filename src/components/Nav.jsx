import './Nav.css';

export default function Nav({ onCTAClick }) {
  return (
    <header className="nav" role="banner">
      <div className="nav__inner">

        {/* Left — wordmark */}
        <a href="/" className="nav__wordmark" aria-label="Hacker House Goa 2026">
          <span className="nav__wordmark-hh">HH</span>
          <span className="nav__wordmark-sep">·</span>
          <span className="nav__wordmark-goa">GOA</span>
          <span className="nav__wordmark-year">2026</span>
        </a>

        {/* Center — meta */}
        <div className="nav__meta">
          <span className="nav__meta-dot" />
          <span>28 – 31 OCT 2026</span>
          <span className="nav__meta-sep">·</span>
          <span>GOA, INDIA</span>
        </div>

        {/* Right — links + CTA */}
        <nav className="nav__links" aria-label="Primary navigation">
          <a
            href="https://hhgoa.com/"
            className="nav__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            ABOUT
          </a>
          <button
            className="nav__cta"
            id="nav-create-btn"
            onClick={onCTAClick}
            aria-label="Create your Builder ID"
          >
            CREATE ID →
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav__burger"
          id="nav-burger-btn"
          aria-label="Open menu"
          onClick={onCTAClick}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}
