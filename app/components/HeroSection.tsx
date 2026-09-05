"use client";

export default function HeroSection() {
  return (
    <section className="black-hero" aria-label="Poetry Designs">
      <div className="black-hero__media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-section-bg.jpeg" alt="" />
      </div>

      <div className="black-hero__bottom">
        <div className="black-hero__brand">
          <h1 className="black-hero__title">POETRY</h1>
          <p className="black-hero__subtitle">DESIGNS</p>
        </div>

        <div className="black-hero__cta">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="black-hero__house" src="/logo.png" alt="" />
          <a href="mailto:hello@poetryconstructions.com" className="black-hero__enquire">
            ENQUIRE
          </a>
        </div>
      </div>
    </section>
  );
}
