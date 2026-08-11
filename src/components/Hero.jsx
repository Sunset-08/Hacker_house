import { useRef, useEffect, useState } from 'react';
import './Hero.css';

const TICKER_ITEMS = [
  'BUILDER ID GENERATOR',
  'HH GOA 2026',
  '28 – 31 OCT',
  'GOA, INDIA',
  'HACKER HOUSE',
  'CREATE YOUR ID →',
  '2:47 PM STUDIO',
  'BUILD IN GOA',
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((item, i) => (
          <span key={i} className="ticker__item">
            {item}
            <span className="ticker__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ onCTAClick }) {
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Parallax + fade on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (heroRef.current) {
        const bg = heroRef.current.querySelector('.hero__bg');
        if (bg) bg.style.transform = `translateY(${y * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero" aria-labelledby="hero-headline">

      {/* ── Layer 0: Goa / HH environment background ────────── */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="/hero-bg.png"
          alt=""
          className="hero__bg-img"
          fetchPriority="high"
        />
        {/* deep green tint overlay so yellow type pops */}
        <div className="hero__bg-tint" />
        {/* bottom vignette to blend into content below */}
        <div className="hero__bg-vignette" />
      </div>

      {/* ── Main typography ────────────────────────────────── */}
      <div className="hero__content">

        {/* Top label */}
        <div className="hero__label">
          <span className="hero__label-dot" />
          <span className="hero__label-text">BUILDER ID GENERATOR</span>
          <span className="hero__label-badge">LIVE</span>
        </div>

        {/* Giant editorial headline */}
        <h1 id="hero-headline" className="hero__headline" aria-label="Hacker House Goa 2026">
          <span className="hero__headline-row hero__headline-hacker">
            HACKER
          </span>
          <span className="hero__headline-row hero__headline-middle">
            <span className="hero__headline-house">HOUSE</span>
            {/* The गोवा badge — faithful to HH Goa site */}
            <span className="hero__headline-goa-badge" aria-label="Goa">
              गोवा
            </span>
          </span>
          <span className="hero__headline-row hero__headline-year">
            GOA 2026
          </span>
        </h1>

        {/* Subline */}
        <p className="hero__sub">
          Your official identity card for{' '}
          <span className="hero__sub-accent">Hacker House Goa</span>
          {' '}— 28–31 October 2026.
        </p>

        {/* Primary CTA */}
        <div className="hero__cta-row">
          <button
            id="hero-create-btn"
            className="hero__cta hero__cta--primary"
            onClick={onCTAClick}
            aria-label="Create your Builder ID"
          >
            <span className="hero__cta-text">CREATE YOUR BUILDER ID</span>
            <span className="hero__cta-arrow">→</span>
          </button>
          <div className="hero__cta-meta">
            <span>JPG · PNG · HEIC</span>
            <span className="hero__cta-meta-sep">·</span>
            <span>~2 sec generation</span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          {[
            { value: '4', label: 'DAYS' },
            { value: '100+', label: 'BUILDERS' },
            { value: '3', label: 'VISUAL MODES' },
            { value: '∞', label: 'HACKS' },
          ].map(({ value, label }) => (
            <div key={label} className="hero__stat">
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Ticker tape at bottom ────────────────────────────── */}
      <Ticker />

      {/* ── Scroll hint ─────────────────────────────────────── */}
      <div className={`hero__scroll-hint ${scrolled ? 'hidden' : ''}`} aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>

    </section>
  );
}
