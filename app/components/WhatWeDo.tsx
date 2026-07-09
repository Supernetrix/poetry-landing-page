"use client";

import { useEffect, useRef, useState } from "react";
import { useMobile } from "../hooks/useMobile";

const SERVICES = [
  {
    num: "01",
    name: "TURN-KEY SOLUTIONS",
    tag: "END-TO-END, NOTHING LEFT OUT",
    desc: "One team, one point of contact — from planning and sanctions to construction, interiors, and final handover. Nothing outsourced, nothing left out.",
    stat: "100%",
    statLabel: "End-to-end delivery",
    accent: "rgba(107,29,13,0.55)",
    img: "/arch final wdwedo.png",
    imgScale: 1.5,
  },
  {
    num: "02",
    name: "ARCHITECTURAL DESIGN",
    tag: "EXOTIC DESIGNS, BUILT TO LAST",
    desc: "Exotic, considered architecture grounded in practical execution — delivered on time, without compromise on vision.",
    stat: "6+",
    statLabel: "Years of practice",
    accent: "rgba(62,21,8,0.55)",
    img: "/2.png",
  },
  {
    num: "03",
    name: "PROJECT MANAGEMENT",
    tag: "YOUR PROJECT, PROFESSIONALLY OWNED",
    desc: "We step in as the professional hand on the wheel — tracking every milestone, managing every vendor, delivering with precision.",
    stat: "50+",
    statLabel: "Projects managed",
    accent: "rgba(140,39,18,0.55)",
    img: "/3.png",
  },
  {
    num: "04",
    name: "FARMHOUSE CURATION",
    tag: "LAND, LIGHT & LIVING",
    desc: "The right plot, a retreat that belongs to its land, every detail considered — from the stone underfoot to the view from the verandah.",
    stat: "15+",
    statLabel: "Estates curated",
    accent: "rgba(90,26,8,0.5)",
    img: "/farmhouse curation.png",
  },
];

export default function WhatWeDo() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    root.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const svc = SERVICES[active];

  /* ── MOBILE LAYOUT ──────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section
        ref={rootRef}
        style={{ width: "100%", fontFamily: "'Barlow', Helvetica, sans-serif", marginTop: "48px" }}
      >
        <div style={{ background: "#3e1508", padding: "48px 24px 24px" }}>
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ height: "1px", width: "32px", background: "rgba(236,232,223,0.25)" }} />
              <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(236,232,223,0.45)" }}>WHAT WE DO</span>
            </div>
            <div style={{ fontSize: "36px", fontWeight: 300, letterSpacing: "6px", textTransform: "uppercase", lineHeight: 1, color: "#ece8df" }}>SERVICES</div>
            <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.3)", marginTop: "12px" }}>
              {SERVICES.length} DISCIPLINES · BANGALORE
            </div>
          </div>

          {SERVICES.map((s, i) => {
            const isOpen = i === openIdx;
            return (
              <div key={s.num} style={{ borderTop: "1px solid rgba(236,232,223,0.08)" }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 0",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2.5, color: "rgba(236,232,223,0.4)", minWidth: 28 }}>{s.num}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: isOpen ? "#ece8df" : "rgba(236,232,223,0.38)", flex: 1, lineHeight: 1.1 }}>
                    {s.name}
                  </span>
                  <div style={{ display: "inline-block", transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1)", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", lineHeight: 0, flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="rgba(236,232,223,0.5)" strokeWidth="1.2" strokeLinecap="round">
                      <line x1="9" y1="2" x2="9" y2="16" />
                      <line x1="2" y1="9" x2="16" y2="9" />
                    </svg>
                  </div>
                </button>

                <div style={{ maxHeight: isOpen ? "200px" : "0", overflow: "hidden", transition: "max-height 0.54s cubic-bezier(0.22,1,0.36,1)" }}>
                  <div style={{ paddingLeft: 44, paddingBottom: 24 }}>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3.5, textTransform: "uppercase", color: "rgba(236,232,223,0.28)", marginBottom: 10 }}>{s.tag}</div>
                    <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.74, color: "rgba(236,232,223,0.52)", marginBottom: 18 }}>{s.desc}</p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, color: "#ece8df", lineHeight: 1 }}>{s.stat}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(236,232,223,0.34)", lineHeight: 1.5 }}>{s.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ borderTop: "1px solid rgba(236,232,223,0.08)", paddingTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 5, height: 5, background: "rgba(236,232,223,0.18)", transform: "rotate(45deg)" }} />
            <span style={{ fontSize: 9, fontWeight: 300, letterSpacing: 3.5, textTransform: "uppercase", color: "rgba(236,232,223,0.2)" }}>POETRY CONSTRUCTIONS · BANGALORE</span>
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP LAYOUT ─────────────────────────────────────────── */
  return (
    <section
      ref={rootRef}
      style={{ width: "100%", fontFamily: "'Barlow', Helvetica, sans-serif", marginTop: "80px" }}
    >
      {/* 50/50 split */}
      <div style={{
        width: "100%",
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT — DARK ──────────────────────────────────── */}
      <div
        style={{
          width: "50%",
          background: "#3e1508",
          padding: "96px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: -8,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "22vw",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "rgba(236,232,223,0.04)",
            lineHeight: 0.85,
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          DO
        </div>

        <div style={{ position: "absolute", top: 44, left: 44, width: 22, height: 22, borderTop: "1px solid rgba(236,232,223,0.14)", borderLeft: "1px solid rgba(236,232,223,0.14)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 44, left: 44, width: 22, height: 22, borderBottom: "1px solid rgba(236,232,223,0.14)", borderLeft: "1px solid rgba(236,232,223,0.14)", pointerEvents: "none" }} />

        <div className="reveal" style={{ marginBottom: 40, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 32, height: 1, background: "rgba(236,232,223,0.18)" }} />
            <span style={{ fontSize: 12, fontWeight: 400, letterSpacing: 5, textTransform: "uppercase", color: "rgba(236,232,223,0.34)" }}>WHAT WE DO</span>
          </div>
          <div style={{ fontSize: "52px", fontWeight: 300, letterSpacing: "7px", textTransform: "uppercase", lineHeight: 1, color: "#ece8df" }}>SERVICES</div>
          <div style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.3)", marginTop: "12px" }}>
            {SERVICES.length} DISCIPLINES · BANGALORE
          </div>
        </div>

        <div className="reveal" style={{ position: "relative", zIndex: 1 }}>
          {SERVICES.map((s, i) => {
            const isActive = i === active;
            const isHov = hovered === i;
            return (
              <div
                key={s.num}
                className="svc-row"
                style={{ opacity: isActive ? 1 : isHov ? 0.48 : 0.19, padding: "16px 0" }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, color: "rgba(236,232,223,0.55)", minWidth: 36, flexShrink: 0 }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: 62,
                  fontWeight: 800,
                  letterSpacing: isActive ? 3.5 : 2,
                  textTransform: "uppercase",
                  color: "#ece8df",
                  lineHeight: 1,
                  flex: 1,
                  transition: "letter-spacing 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}>
                  {s.name}
                </span>
                <div style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-12px)",
                  transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  flexShrink: 0,
                }}>
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="#ece8df" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="0" y1="6" x2="22" y2="6" />
                    <polyline points="16,1 22,6 16,11" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal" style={{ marginTop: 40, position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 6, height: 6, background: "rgba(236,232,223,0.18)", transform: "rotate(45deg)" }} />
          <span style={{ fontSize: 12, fontWeight: 300, letterSpacing: 4, textTransform: "uppercase", color: "rgba(236,232,223,0.2)" }}>ONE TEAM · EVERY DISCIPLINE</span>
        </div>
      </div>

      {/* ── RIGHT — CREAM ─────────────────────────────────── */}
      <div
        style={{
          width: "50%",
          background: "#ece8df",
          padding: "96px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          color: "#3e1508",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: -20,
            bottom: 10,
            fontSize: "28vw",
            fontWeight: 800,
            color: "rgba(62,21,8,0.05)",
            lineHeight: 0.85,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          {svc.num}
        </div>

        <div style={{ position: "absolute", top: 44, right: 44, width: 22, height: 22, borderTop: "1px solid rgba(62,21,8,0.13)", borderRight: "1px solid rgba(62,21,8,0.13)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 44, right: 44, width: 22, height: 22, borderBottom: "1px solid rgba(62,21,8,0.13)", borderRight: "1px solid rgba(62,21,8,0.13)", pointerEvents: "none" }} />

        <div
          key={active}
          style={{ position: "relative", zIndex: 1, animation: "panelIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards" }}
        >
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 4.5, textTransform: "uppercase", color: "rgba(62,21,8,0.36)", marginBottom: 22 }}>
            {svc.tag}
          </div>

          <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: 5, textTransform: "uppercase", color: "#3e1508", lineHeight: 1.0, marginBottom: 28 }}>
            {svc.name}
          </div>

          <div style={{ width: 52, height: 1.5, background: "rgba(62,21,8,0.2)", marginBottom: 28 }} />

          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.92, letterSpacing: 0.2, color: "rgba(62,21,8,0.66)", maxWidth: 390, marginBottom: 44 }}>
            {svc.desc}
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 16, paddingBottom: 44, borderBottom: "1px solid rgba(62,21,8,0.1)", marginBottom: 44 }}>
            <span style={{ fontSize: 60, fontWeight: 800, letterSpacing: -2, color: "#3e1508", lineHeight: 1 }}>{svc.stat}</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(62,21,8,0.36)", maxWidth: 90, lineHeight: 1.65 }}>{svc.statLabel}</span>
          </div>

          {svc.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={svc.img} alt={svc.name} style={{ width: "100%", maxWidth: 360, display: "block", transform: svc.imgScale ? `scale(${svc.imgScale})` : undefined }} />
          ) : (
            <div style={{ position: "relative", width: "100%", maxWidth: 360, aspectRatio: "3/2", background: "rgba(62,21,8,0.035)", border: "1px solid rgba(62,21,8,0.1)" }}>
              <div style={{ position: "absolute", top: 10, left: 10, width: 16, height: 16, borderTop: "1px solid rgba(62,21,8,0.22)", borderLeft: "1px solid rgba(62,21,8,0.22)" }} />
              <div style={{ position: "absolute", top: 10, right: 10, width: 16, height: 16, borderTop: "1px solid rgba(62,21,8,0.22)", borderRight: "1px solid rgba(62,21,8,0.22)" }} />
              <div style={{ position: "absolute", bottom: 10, left: 10, width: 16, height: 16, borderBottom: "1px solid rgba(62,21,8,0.22)", borderLeft: "1px solid rgba(62,21,8,0.22)" }} />
              <div style={{ position: "absolute", bottom: 10, right: 10, width: 16, height: 16, borderBottom: "1px solid rgba(62,21,8,0.22)", borderRight: "1px solid rgba(62,21,8,0.22)" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, opacity: 0.22 }}>
                <div style={{ width: 26, height: 26, border: "1.5px solid #3e1508", transform: "rotate(45deg)" }} />
                <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#3e1508" }}>IMAGE PLACEHOLDER</div>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 3, background: svc.accent }} />
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
