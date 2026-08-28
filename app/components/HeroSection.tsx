"use client";

function HouseIcon() {
  return (
    <svg className="black-hero__house" viewBox="0 0 72 68" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="poetryHouseGrad" x1="36" y1="4" x2="36" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59B52" />
          <stop offset="1" stopColor="#C85A18" />
        </linearGradient>
      </defs>
      <path
        fill="url(#poetryHouseGrad)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 5.5 63.5 31.5V59.5c0 2.2-1.8 4-4 4H12.5c-2.2 0-4-1.8-4-4V31.5L36 5.5Zm0 33.5c-5.8 0-9.5 3.7-9.5 9.5V63.5h19V48.5c0-5.8-3.7-9.5-9.5-9.5Z"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="black-hero" aria-label="Poetry Designs">
      <div className="black-hero__media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/IMG_0569.jpg" alt="" />
      </div>

      <div className="black-hero__bottom">
        <div className="black-hero__brand">
          <h1 className="black-hero__title">POETRY</h1>
          <p className="black-hero__subtitle">DESIGNS</p>
        </div>

        <div className="black-hero__cta">
          <HouseIcon />
          <a href="mailto:hello@poetryconstructions.com" className="black-hero__enquire">
            ENQUIRE
          </a>
        </div>
      </div>
    </section>
  );
}
