"use client";

import { useState, useEffect } from "react";
import { useMobile } from "../hooks/useMobile";

interface Project {
  idx: string;
  name: string;
  location: string;
  year: string;
  scale: string;
  note: string;
  color: string;
  img: string;
  gallery: string[];
  gridColumn: string;
  mobileGridColumn: string;
  height: string;
  mobileHeight: string;
}

const PROJECTS: Project[] = [
  {
    idx: "01",
    name: "Villa Serrata",
    location: "Tuscany, Italy",
    year: "2024",
    scale: "8,400 sq ft",
    note: "A stone farmhouse drawn from the hillside itself — every wall a continuation of the landscape. Restored over three years with local artisans using traditional lime plaster and reclaimed terracotta.",
    color: "#c5b9aa",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
    ],
    gridColumn: "1/3",
    mobileGridColumn: "1/3",
    height: "480px",
    mobileHeight: "280px",
  },
  {
    idx: "02",
    name: "Maison Lacroix",
    location: "Provence, France",
    year: "2023",
    scale: "6,200 sq ft",
    note: "A nineteenth-century mas reinvented as a home of radical quietude. Thick walls hold out the heat; deep embrasures frame the lavender fields like paintings.",
    color: "#b0a898",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
    ],
    gridColumn: "3/4",
    mobileGridColumn: "1/2",
    height: "480px",
    mobileHeight: "240px",
  },
  {
    idx: "03",
    name: "The Arden House",
    location: "Cotswolds, UK",
    year: "2025",
    scale: "11,800 sq ft",
    note: "Honey-coloured Cotswold stone extended with a wing of raw concrete. The tension between old and new is the architecture.",
    color: "#cec3b5",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    ],
    gridColumn: "1/2",
    mobileGridColumn: "2/3",
    height: "340px",
    mobileHeight: "240px",
  },
  {
    idx: "04",
    name: "Casa del Faro",
    location: "Amalfi Coast, Italy",
    year: "2023",
    scale: "4,900 sq ft",
    note: "Perched above the Tyrrhenian Sea, this former lighthouse keeper's residence steps down the cliff in three terraced volumes, each opening to the water.",
    color: "#b8b0a0",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    ],
    gridColumn: "2/3",
    mobileGridColumn: "1/2",
    height: "340px",
    mobileHeight: "200px",
  },
  {
    idx: "05",
    name: "Château Éclat",
    location: "Burgundy, France",
    year: "2024",
    scale: "14,200 sq ft",
    note: "A seventeenth-century château brought into the present without apology. Original parquet, new steel and glass. The past and future in perfect argument.",
    color: "#a09080",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=900&q=80",
    ],
    gridColumn: "3/4",
    mobileGridColumn: "2/3",
    height: "340px",
    mobileHeight: "200px",
  },
  {
    idx: "06",
    name: "The Fell Estate",
    location: "Lake District, UK",
    year: "2026",
    scale: "9,600 sq ft",
    note: "A vast Victorian lodge pared back to its bones and rebuilt with a sculptor's restraint. The fells beyond every window are the real interior.",
    color: "#a8a09a",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=900&q=80",
    ],
    gridColumn: "1/4",
    mobileGridColumn: "1/3",
    height: "220px",
    mobileHeight: "160px",
  },
];

export default function PortfolioGrid() {
  const [selected, setSelected] = useState<Project | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        let delay = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.animationDelay = delay + "ms";
            target.classList.add("card-visible");
            io.unobserve(entry.target);
            delay += 85;
          }
        });
      },
      { threshold: 0.06 }
    );
    document.querySelectorAll(".pcard").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const px = isMobile ? "24px" : "64px";

  return (
    <div
      id="portfolio"
      style={{
        width: "100%",
        background: "#ece8df",
        fontFamily: "var(--font-barlow), Helvetica, sans-serif",
        color: "#3e1508",
      }}
    >
      {/* ── SECTION HEADER ───────────────────────── */}
      <div
        style={{
          padding: isMobile ? `60px ${px} 40px` : `112px ${px} 72px`,
          animation: "headerIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div
            style={{
              height: "1px",
              background: "#3e1508",
              opacity: 0.28,
              animation: "lineGrow48 0.55s ease 0.4s both",
            }}
          />
          <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.5 }}>SELECTED WORKS</span>
        </div>

        <div style={{ fontSize: isMobile ? "32px" : "56px", fontWeight: 300, letterSpacing: isMobile ? "6px" : "9px", textTransform: "uppercase", lineHeight: 1 }}>PORTFOLIO</div>
        <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.32, marginTop: "14px" }}>
          {PROJECTS.length} ESTATES · 2023–2026
        </div>
      </div>

      {/* ── GRID ─────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "3px",
          padding: "0 3px 3px",
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.idx}
            className="pcard"
            style={{
              gridColumn: isMobile ? p.mobileGridColumn : p.gridColumn,
              height: isMobile ? p.mobileHeight : p.height,
              background: p.color,
              position: "relative",
            }}
            onClick={() => setSelected(p)}
          >
            {/* Zoom wrapper */}
            <div className="pcard-scale" style={{ position: "absolute", inset: 0, background: p.color }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Dim overlay */}
            <div className="pcard-dim" />

            {/* Index — top left */}
            <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 3, fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(62,21,8,0.26)" }}>
              {p.idx}
            </div>

            {/* Year — top right */}
            <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 3, fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(62,21,8,0.26)" }}>
              {p.year}
            </div>

            {/* Hover info */}
            <div className="pcard-info" style={{ padding: isMobile ? "16px 18px" : "32px 36px" }}>
              <div style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "6px" }}>{p.location}</div>
              <div style={{ fontSize: isMobile ? "16px" : "26px", fontWeight: 300, letterSpacing: "3px", color: "#fff", textTransform: "uppercase", lineHeight: 1.2, marginBottom: "10px" }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
                <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>VIEW PROJECT</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER NOTE ──────────────────────────── */}
      <div style={{ padding: isMobile ? `32px ${px} 56px` : `52px ${px} 96px`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "32px", height: "1px", background: "#3e1508", opacity: 0.22 }} />
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.36 }}>POETRY STUDIOS</span>
        </div>
      </div>

      {/* ── PROJECT DETAIL OVERLAY ───────────────── */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#ece8df",
            zIndex: 500,
            overflowY: "auto",
            animation: "detailUp 0.78s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {/* Back button */}
          <button
            className="back-btn"
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              top: isMobile ? "16px" : "40px",
              left: isMobile ? "24px" : "64px",
              zIndex: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--font-barlow), Helvetica, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#3e1508",
              padding: 0,
              animation: "justFade 0.4s ease 0.55s both",
              opacity: 0,
            }}
          >
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" stroke="#3e1508" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="4" x2="1" y2="4" />
              <polyline points="5,1 1,4 5,7" />
            </svg>
            PORTFOLIO
          </button>

          {/* Hero swatch */}
          <div style={{ position: "relative", height: isMobile ? "320px" : "600px", background: selected.color, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected.img}
              alt={selected.name}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "justFade 1s ease 0.15s both", opacity: 0 }}
            />

            {/* Name watermark */}
            <div
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                top: "50%",
                fontSize: isMobile ? "18vw" : "11vw",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                textAlign: "center",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                userSelect: "none",
                color: "rgba(255,255,255,0.1)",
                animation: "wmBoom 1.4s cubic-bezier(0.22,1,0.36,1) 0.25s both",
                opacity: 0,
                transform: "translateY(-50%)",
              }}
            >
              {selected.name}
            </div>

            {/* Bottom gradient */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: isMobile ? "160px" : "270px", background: "linear-gradient(to bottom, transparent, rgba(20,8,4,0.6))", pointerEvents: "none" }} />

            {/* Title overlay */}
            <div
              style={{
                position: "absolute",
                bottom: isMobile ? "28px" : "54px",
                left: isMobile ? "24px" : "64px",
                animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.58s both",
                opacity: 0,
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "4px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "8px" }}>{selected.location}</div>
              <div style={{ fontSize: isMobile ? "28px" : "52px", fontWeight: 300, letterSpacing: isMobile ? "3px" : "5px", color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>{selected.name}</div>
            </div>

            {/* Year badge */}
            <div
              style={{
                position: "absolute",
                top: isMobile ? "56px" : "38px",
                right: isMobile ? "24px" : "64px",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                animation: "justFade 0.5s ease 0.7s both",
                opacity: 0,
              }}
            >
              {selected.year}
            </div>
          </div>

          {/* Specs bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: isMobile ? "24px" : "0",
              borderBottom: "1px solid rgba(62,21,8,0.1)",
              padding: isMobile ? `32px ${px}` : `52px ${px}`,
              animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.72s both",
              opacity: 0,
            }}
          >
            <div>
              <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.36, marginBottom: "10px" }}>Location</div>
              <div style={{ fontSize: "15px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase" }}>{selected.location}</div>
            </div>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.36, marginBottom: "10px" }}>Completed</div>
              <div style={{ fontSize: "15px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase" }}>{selected.year}</div>
            </div>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.36, marginBottom: "10px" }}>Scale</div>
              <div style={{ fontSize: "15px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase" }}>{selected.scale}</div>
            </div>
          </div>

          {/* Architect's Note */}
          <div
            style={{
              padding: isMobile ? `40px ${px} 40px` : `84px ${px} 72px`,
              maxWidth: "760px",
              animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.88s both",
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.36 }}>Architect&apos;s Note</span>
              <div style={{ height: "1px", width: "32px", background: "#3e1508", opacity: 0.25 }} />
            </div>
            <p style={{ fontSize: isMobile ? "16px" : "21px", fontWeight: 300, lineHeight: 1.78, letterSpacing: "0.3px" }}>{selected.note}</p>
          </div>

          {/* Gallery row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
              gap: "3px",
              padding: "0 3px",
              animation: "justFade 0.7s ease 1.05s both",
              opacity: 0,
            }}
          >
            {selected.gallery.map((g, i) => (
              <div key={i} style={{ height: isMobile ? "180px" : "340px", background: "#b8ac9d", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ padding: isMobile ? `40px ${px} 56px` : `64px ${px} 88px`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              className="cta-all"
              onClick={() => setSelected(null)}
              style={{
                background: "#6b1d0d",
                color: "#fff",
                fontFamily: "var(--font-barlow), Helvetica, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                padding: "14px 24px",
                border: "none",
                cursor: "pointer",
              }}
            >
              ← ALL PROJECTS
            </button>
            <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.3 }}>POETRY STUDIOS</span>
          </div>
        </div>
      )}
    </div>
  );
}
