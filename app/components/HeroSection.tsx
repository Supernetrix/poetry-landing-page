"use client";

import { useEffect, useRef, useState } from "react";
import { useMobile } from "../hooks/useMobile";

export default function HeroSection() {
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)));
  };

  const closeMenu = (cb?: () => void) => {
    setMenuVisible(false);
    setTimeout(() => { setMenuOpen(false); cb?.(); }, 550);
  };

  const scrollTo = (id: string) => {
    closeMenu(() => setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100));
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

  const NAV_HEIGHT = isMobile ? 56 : 78;

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
            <a href="#certifications" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.38s both" }}>CERTIFICATIONS</a>
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.46s both" }}>ABOUT US</a>
            <a href="#journal" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("journal")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.54s both" }}>JOURNAL</a>
            <a href="#careers" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" }); }} style={{ animation: "justFade 0.5s ease 0.62s both" }}>JOBS</a>
          </div>
        )}


        {/* Right — Enquire Now + Client Portal */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <a href="#" className="nav-link nav-link--enquire" style={{ animation: "justFade 0.5s ease 0.36s both" }}>ENQUIRE NOW</a>
            <div className="util-link" style={{ animation: "justFade 0.5s ease 0.40s both" }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="5" width="12" height="8" rx="1" />
                <path d="M4 5V3.5a3 3 0 0 1 6 0V5" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase" }}>CLIENT PORTAL</span>
            </div>
          </div>
        )}

        {/* Mobile — hamburger only */}
        {isMobile && (
          <button
            onClick={() => openMenu()}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px", marginLeft: "auto", marginTop: "40px" }}
            aria-label="Open menu"
          >
            <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--c-text)" }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--c-text)" }} />
            <span style={{ display: "block", width: "14px", height: "1.5px", background: "var(--c-text)" }} />
          </button>
        )}
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
            top: isMobile ? "47%" : "50%",
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
          style={isMobile ? {
            position: "absolute",
            top: "47%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
          } : {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-48%) translateY(-50%)",
            height: "82%",
            zIndex: 2,
          }}
        >
          <div style={{ width: "100%", height: "100%", animation: "archEntry 1.5s cubic-bezier(0.22,1,0.36,1) 0.75s both" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arch-hero.png"
              alt="Architectural composition"
              style={isMobile ? {
                width: "100%",
                height: "auto",
                display: "block",
                mixBlendMode: "multiply",
              } : {
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>

        {/* SCULPTING STANZAS — desktop only */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: "148px",
              left: "64px",
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
        )}

        {/* CTA Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: isMobile ? "20px" : "64px",
            right: isMobile ? "20px" : "auto",
            zIndex: 3,
            display: "flex",
            flexDirection: "row",
            gap: isMobile ? "48px" : "26px",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            paddingBottom: isMobile ? "28px" : "48px",
          }}
        >
          <button className="btn-primary" style={{ animation: "slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.20s both", ...(isMobile && { fontSize: "10px", padding: "14px 26px", letterSpacing: "2px" }) }} onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
            VIEW PORTFOLIO
          </button>
          <button className="btn-ghost" style={{ animation: "slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.35s both", ...(isMobile && { fontSize: "10px", letterSpacing: "2px" }) }}>
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
              POETRY DESIGNS
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
      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div ref={overlayRef} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "var(--c-text)", overflow: "hidden", touchAction: "none", transform: menuVisible ? "translateX(0)" : "translateX(100%)", transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)" }}>

          {/* Close button — always pinned top right */}
          <button
            onClick={() => closeMenu()}
            aria-label="Close menu"
            style={{ position: "absolute", top: "14px", right: "20px", background: "none", border: "none", cursor: "pointer", color: "#ece8df", fontSize: "36px", fontWeight: 200, lineHeight: 1, padding: "8px", zIndex: 1 }}
          >
            ×
          </button>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 32px" }}>
            {/* Top label */}
            <div style={{ height: "64px", display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.28)" }}>MENU</span>
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "CERTIFICATIONS", id: "certifications" },
                { label: "ABOUT US", id: "about" },
                { label: "JOURNAL", id: "journal" },
                { label: "JOBS", id: "careers" },
              ].map(({ label, id }, i) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{ background: "none", border: "none", borderBottom: "1px solid rgba(236,232,223,0.08)", cursor: "pointer", textAlign: "left", padding: "18px 0", fontFamily: "var(--font-barlow), Helvetica, sans-serif", fontSize: "26px", fontWeight: 300, letterSpacing: "4px", textTransform: "uppercase", color: "var(--c-bg)", animation: `menuItemIn 0.5s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.07}s both` }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => closeMenu()}
                style={{ background: "none", border: "none", borderBottom: "1px solid rgba(236,232,223,0.08)", cursor: "pointer", textAlign: "left", padding: "18px 0", fontFamily: "var(--font-barlow), Helvetica, sans-serif", fontSize: "26px", fontWeight: 300, letterSpacing: "4px", textTransform: "uppercase", color: "var(--c-btn)", textDecoration: "underline", textUnderlineOffset: "4px", animation: "menuItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.53s both" }}
              >
                ENQUIRE NOW
              </button>
              <button
                onClick={() => closeMenu()}
                style={{ background: "none", border: "none", borderBottom: "1px solid rgba(236,232,223,0.08)", cursor: "pointer", textAlign: "left", padding: "18px 0", fontFamily: "var(--font-barlow), Helvetica, sans-serif", fontSize: "26px", fontWeight: 300, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(236,232,223,0.45)", display: "flex", alignItems: "center", gap: "12px", animation: "menuItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="5" width="12" height="8" rx="1" />
                  <path d="M4 5V3.5a3 3 0 0 1 6 0V5" />
                </svg>
                CLIENT PORTAL
              </button>
            </div>

            {/* Footer */}
            <div style={{ paddingTop: "32px", paddingBottom: "36px", fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.22)" }}>
              POETRY CONSTRUCTIONS · BANGALORE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
