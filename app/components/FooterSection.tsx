"use client";

export default function FooterSection() {
  return (
    <footer
      style={{
        position: "relative",
        background: "#3e1508",
        overflow: "hidden",
        fontFamily: "'Barlow', Helvetica, sans-serif",
        color: "#ece8df",
      }}
    >
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1, padding: "120px 64px 64px" }}>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 300,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.9,
              lineHeight: 1.1,
            }}
          >
            LET&apos;S BUILD
          </div>
          <div
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            YOUR DREAM.
          </div>
        </div>

        {/* CTA button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 96 }}>
          <button
            style={{
              background: "#ece8df",
              color: "#3e1508",
              border: "none",
              padding: "18px 48px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            START YOUR PROJECT
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(236,232,223,0.1)", marginBottom: 56 }} />

        {/* Bottom grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              POETRY
            </div>
            <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.4, marginBottom: 24 }}>
              CONSTRUCTIONS · EST. 2020
            </div>
            <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.8, opacity: 0.5 }}>
              Design &amp; Build, under one roof.<br />Bangalore, India.
            </p>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.35, marginBottom: 20 }}>
              CONTACT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="mailto:hello@poetryconstructions.com"
                style={{ fontSize: 13, fontWeight: 300, opacity: 0.65, color: "#ece8df", textDecoration: "none", letterSpacing: "0.02em" }}
              >
                hello@poetryconstructions.com
              </a>
              <a
                href="tel:+919999999999"
                style={{ fontSize: 13, fontWeight: 300, opacity: 0.65, color: "#ece8df", textDecoration: "none", letterSpacing: "0.02em" }}
              >
                +91 99999 99999
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.35, marginBottom: 20 }}>
              NAVIGATE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Home", "Portfolio", "Certifications", "About", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{ fontSize: 13, fontWeight: 300, opacity: 0.65, color: "#ece8df", textDecoration: "none", letterSpacing: "0.02em" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{ height: 1, background: "rgba(236,232,223,0.08)", margin: "56px 0 32px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.2em", opacity: 0.3, textTransform: "uppercase" }}>
            © 2025 Poetry Constructions. All rights reserved.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 8, height: 8, background: "rgba(236,232,223,0.2)", transform: "rotate(45deg)" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.3em", opacity: 0.25, textTransform: "uppercase" }}>
              BANGALORE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
