"use client";

import { useEffect, useRef, useState } from "react";
const SERVICES = [
  {
    num: "01",
    name: "TURN-KEY SOLUTIONS",
    tag: "END-TO-END, NOTHING LEFT OUT",
    desc: "Poetry's turn-key solutions cover everything under one roof — planning, design, government sanctions, construction management, interior design & decoration, and full project oversight. From the first sketch to the final key handover, your dream home is managed entirely by our experienced team.",
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
    desc: "Design has been Poetry's backbone since inception in 2020. Our architects bring exotic, considered homes to life while keeping practical execution firmly in mind — ensuring seamless delivery within set timelines, without compromise on vision.",
    stat: "6+",
    statLabel: "Years of practice",
    accent: "rgba(62,21,8,0.55)",
    img: "/2.png",
  },
  {
    num: "03",
    name: "PROJECT MANAGEMENT",
    tag: "YOUR PROJECT, PROFESSIONALLY OWNED",
    desc: "Poetry's PMC expertise draws on deep team experience and the smart use of technology. For clients busy with their lives, we step in as the professional hand on the wheel — tracking every milestone, managing every vendor, and delivering your project with precision.",
    stat: "50+",
    statLabel: "Projects managed",
    accent: "rgba(140,39,18,0.55)",
    img: "/3.png",
  },
  {
    num: "04",
    name: "FARMHOUSE CURATION",
    tag: "LAND, LIGHT & LIVING",
    desc: "There is a particular kind of calm that only land can offer. Poetry's farmhouse curation service is built for those who seek it — identifying the right plot, designing a retreat that belongs to its surroundings, and delivering a finished estate where every detail, from the stone underfoot to the view from the verandah, has been considered.",
    stat: "15+",
    statLabel: "Estates curated",
    accent: "rgba(90,26,8,0.5)",
    img: "/farmhouse curation.png",
  },
];

export default function WhatWeDo() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

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

  return (
    <section
      ref={rootRef}
      style={{
        width: "100%",
        display: "flex",
        fontFamily: "'Barlow', Helvetica, sans-serif",
        height: "100vh",
        overflow: "hidden",
        marginTop: "80px",
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
        {/* Ghost watermark */}
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

        {/* Corner accents */}
        <div style={{ position: "absolute", top: 44, left: 44, width: 22, height: 22, borderTop: "1px solid rgba(236,232,223,0.14)", borderLeft: "1px solid rgba(236,232,223,0.14)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 44, left: 44, width: 22, height: 22, borderBottom: "1px solid rgba(236,232,223,0.14)", borderLeft: "1px solid rgba(236,232,223,0.14)", pointerEvents: "none" }} />

        {/* Section label */}
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, position: "relative", zIndex: 1 }}>
          <div style={{ width: 32, height: 1, background: "rgba(236,232,223,0.18)" }} />
          <span style={{ fontSize: 12, fontWeight: 400, letterSpacing: 5, textTransform: "uppercase", color: "rgba(236,232,223,0.34)" }}>WHAT WE DO</span>
        </div>

        {/* Service list */}
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

        {/* Brand note */}
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
        {/* Ghost service number */}
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

        {/* Corner accents */}
        <div style={{ position: "absolute", top: 44, right: 44, width: 22, height: 22, borderTop: "1px solid rgba(62,21,8,0.13)", borderRight: "1px solid rgba(62,21,8,0.13)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 44, right: 44, width: 22, height: 22, borderBottom: "1px solid rgba(62,21,8,0.13)", borderRight: "1px solid rgba(62,21,8,0.13)", pointerEvents: "none" }} />

        {/* Animated panel — key forces remount on active change, re-triggering CSS animation */}
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

          {/* Image */}
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
    </section>
  );
}
