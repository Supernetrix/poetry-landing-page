"use client";

import { useEffect } from "react";
import { useMobile } from "../hooks/useMobile";

export default function HeroSection() {
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const sy = window.scrollY;
      const wm = document.querySelector('[data-parallax="watermark"]') as HTMLElement | null;
      const ao = document.querySelector('[data-parallax="arch"]') as HTMLElement | null;
      if (wm) wm.style.transform = `translateY(calc(-50% + ${-sy * 0.18}px))`;
      if (ao) ao.style.transform = `translateX(-48%) translateY(calc(-50% + ${-sy * 0.07}px))`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const NAV_HEIGHT = isMobile ? 60 : 78;

  return (
    <div
      style={{
        width: "100%",
        background: "var(--c-bg)",
        fontFamily: "var(--font-barlow), Helvetica, sans-serif",
        color: "var(--c-text)",
      }}
    >
      {/* ── SCANNER LINE ─────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRight: "1.5px solid var(--c-scan)",
            animation: "scanner 1.1s cubic-bezier(0.76,0,0.24,1) 0.05s both",
          }}
        />
      </div>

      {/* ── NAVBAR ───────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 24px" : "0 64px",
          height: `${NAV_HEIGHT}px`,
          position: "relative",
          animation: "navEntry 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both",
        }}
      >
        {/* Left nav links — desktop only */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "44px", alignItems: "center" }}>
            <a href="#portfolio" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.30s both" }}>PORTFOLIO</a>
            <a href="#certifications" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.38s both" }}>RECOGNITION</a>
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.46s both" }}>ABOUT US</a>
          </div>
        )}

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            fontSize: isMobile ? "28px" : "38px",
            fontWeight: 800,
            letterSpacing: "2px",
            color: "var(--c-text)",
            textTransform: "uppercase",
            lineHeight: 1,
            whiteSpace: "nowrap",
            animation: "logoEntry 1.0s cubic-bezier(0.22,1,0.36,1) 0.2s both",
          }}
        >
          POETRY
        </div>

        {/* Right — Client Portal only */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="util-link" style={{ animation: "justFade 0.5s ease 0.40s both" }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="5" width="12" height="8" rx="1" />
                <path d="M4 5V3.5a3 3 0 0 1 6 0V5" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase" }}>CLIENT PORTAL</span>
            </div>
          </div>
        )}

        {/* Mobile spacer to balance logo centering */}
        {isMobile && <div />}
      </nav>

      {/* ── HERO BODY ─────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: isMobile ? `calc(100svh - ${NAV_HEIGHT}px)` : `calc(100vh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
        }}
      >
        {/* Watermark */}
        <div
          data-parallax="watermark"
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            top: "50%",
            fontSize: isMobile ? "28vw" : "21.5vw",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: "var(--c-wm)",
            lineHeight: 0.88,
            whiteSpace: "nowrap",
            textAlign: "center",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
            animation: "watermarkBoom 1.6s cubic-bezier(0.22,1,0.36,1) 0.25s both",
          }}
        >
          POETRY
        </div>

        {/* Arch image */}
        <div
          data-parallax="arch"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: isMobile
              ? "translateX(-50%) translateY(-50%)"
              : "translateX(-48%) translateY(-50%)",
            height: isMobile ? "70%" : "82%",
            zIndex: 2,
          }}
        >
          <div style={{ width: "100%", height: "100%", animation: "archEntry 1.5s cubic-bezier(0.22,1,0.36,1) 0.75s both" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arch-hero.png"
              alt="Architectural composition"
              style={{ height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
            />
          </div>
        </div>

        {/* SCULPTING STANZAS */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? "64px" : "148px",
            left: isMobile ? "24px" : "64px",
            zIndex: 3,
            animation: "slideRight 0.8s cubic-bezier(0.22,1,0.36,1) 1.05s both",
          }}
        >
          <div className="heading-text">SCULPTING<br />STANZAS.</div>
          <div
            style={{
              height: "1px",
              background: "var(--c-text)",
              marginTop: "18px",
              animation: "lineGrow76 0.6s cubic-bezier(0.22,1,0.36,1) 1.35s both",
            }}
          />
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: isMobile ? 0 : "64px",
            right: isMobile ? 0 : "auto",
            zIndex: 3,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "14px" : "26px",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            paddingBottom: isMobile ? "28px" : "48px",
          }}
        >
          <button className="btn-primary" style={{ animation: "slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.20s both" }}>
            VIEW PORTFOLIO
          </button>
          <button className="btn-ghost" style={{ animation: "slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.35s both" }}>
            START YOUR PROJECT
          </button>
        </div>

        {/* CURATED ESTATES 2026 — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              right: "64px",
              zIndex: 3,
              textAlign: "right",
              paddingBottom: "48px",
              animation: "slideLeft 0.8s cubic-bezier(0.22,1,0.36,1) 1.45s both",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "4px",
                color: "var(--c-text)",
                lineHeight: 2,
                textTransform: "uppercase",
              }}
            >
              CURATED<br />ESTATES<br />2026
            </div>
            <div
              style={{
                width: "36px",
                height: "1.5px",
                background: "var(--c-text)",
                marginTop: "10px",
                marginLeft: "auto",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
