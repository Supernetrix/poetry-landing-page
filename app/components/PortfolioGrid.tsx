"use client";

import { useState, useEffect, useRef } from "react";
import { useMobile } from "../hooks/useMobile";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";

type GalleryItem =
  | { type: "image"; url: string; key: string }
  | { type: "video"; url: string; key: string; caption?: string };

type SanityGalleryItem =
  | (SanityImageSource & { _key: string; _type: "image" })
  | { _key: string; _type: "youtubeVideo"; url: string; caption?: string };

interface Project {
  idx: string;
  name: string;
  location: string;
  year: string;
  scale: string;
  note: string;
  color: string;
  img: string;
  gallery: GalleryItem[];
  gridColumn: string;
  mobileGridColumn: string;
  height: string;
  mobileHeight: string;
}

interface SanityProject {
  _id: string;
  name: string;
  location?: string;
  year?: string;
  scale?: string;
  note?: string;
  image?: SanityImageSource;
  gallery?: SanityGalleryItem[];
}

function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

const PROJECT_LAYOUT = [
  { idx: "01", color: "#c5b9aa", gridColumn: "1/3", mobileGridColumn: "1/3", height: "480px", mobileHeight: "280px" },
  { idx: "02", color: "#b0a898", gridColumn: "3/4", mobileGridColumn: "1/2", height: "480px", mobileHeight: "240px" },
  { idx: "03", color: "#cec3b5", gridColumn: "1/2", mobileGridColumn: "2/3", height: "340px", mobileHeight: "240px" },
  { idx: "04", color: "#b8b0a0", gridColumn: "2/3", mobileGridColumn: "1/2", height: "340px", mobileHeight: "200px" },
  { idx: "05", color: "#a09080", gridColumn: "3/4", mobileGridColumn: "2/3", height: "340px", mobileHeight: "200px" },
  { idx: "06", color: "#a8a09a", gridColumn: "1/4", mobileGridColumn: "1/3", height: "220px", mobileHeight: "160px" },
];

const FALLBACK_PROJECTS: Project[] = [
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
      { type: "video", key: "g1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Project Walkthrough" },
      { type: "image", key: "g2", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g3", url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g4", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80" },
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
      { type: "image", key: "g1", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g2", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g3", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80" },
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
      { type: "image", key: "g1", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g2", url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g3", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80" },
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
      { type: "image", key: "g1", url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g2", url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g3", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" },
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
      { type: "image", key: "g1", url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g2", url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g3", url: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=900&q=80" },
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
      { type: "image", key: "g1", url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g2", url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
      { type: "image", key: "g3", url: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=900&q=80" },
    ],
    gridColumn: "1/4",
    mobileGridColumn: "1/3",
    height: "220px",
    mobileHeight: "160px",
  },
];

function mergeProjects(sanityProjects: SanityProject[]): Project[] {
  return sanityProjects.map((p, i) => {
    const layout = PROJECT_LAYOUT[i % PROJECT_LAYOUT.length];
    const gallery: GalleryItem[] = [];
    for (const g of p.gallery ?? []) {
      if (g._type === "youtubeVideo") {
        if (g.url) gallery.push({ type: "video", key: g._key, url: g.url, caption: g.caption });
      } else {
        const src = g as SanityImageSource & { _key: string; asset?: { _ref?: string } };
        if (src.asset?._ref) gallery.push({ type: "image", key: g._key, url: urlFor(g).width(900).url() });
      }
    }
    return {
      ...layout,
      idx: (i + 1).toString().padStart(2, "0"),
      name: p.name,
      location: p.location ?? "",
      year: p.year ?? "",
      scale: p.scale ?? "",
      note: p.note ?? "",
      img: p.image ? urlFor(p.image).width(1400).url() : "",
      gallery,
    };
  });
}

export default function PortfolioGrid({ projects: sanityProjects, isHomePage = false }: { projects?: SanityProject[]; isHomePage?: boolean }) {
  const projects: Project[] =
    sanityProjects && sanityProjects.length > 0
      ? mergeProjects(sanityProjects)
      : FALLBACK_PROJECTS;

  const [selected, setSelected] = useState<Project | null>(null);
  const [galStart, setGalStart] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const galRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const actionButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--c-btn)",
    color: "var(--c-btn-text)",
    fontFamily: "var(--font-barlow), Helvetica, sans-serif",
    fontSize: isMobile ? "9.5px" : "10.5px",
    fontWeight: 600,
    letterSpacing: isMobile ? "2.4px" : "2.5px",
    lineHeight: 1,
    textAlign: "center",
    textTransform: "uppercase",
    padding: isMobile ? "15px 18px" : "16px 32px",
    textDecoration: "none",
    width: isMobile ? "100%" : "auto",
    maxWidth: isMobile ? "320px" : "none",
    minHeight: isMobile ? "48px" : "auto",
  };

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

  useEffect(() => { setGalStart(0); setLightbox(null); }, [selected]);

  useEffect(() => {
    if (!galRef.current) return;
    const itemW = galRef.current.offsetWidth / 3;
    galRef.current.scrollTo({ left: galStart * itemW, behavior: "smooth" });
  }, [galStart]);

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
        background: "var(--c-bg)",
        fontFamily: "var(--font-barlow), Helvetica, sans-serif",
        color: "var(--c-text)",
      }}
    >
      {/* ── SECTION HEADER ───────────────────────── */}
      <div
        style={{
          padding: isMobile 
            ? (isHomePage ? `60px ${px} 40px` : `32px ${px} 40px`) 
            : (isHomePage ? `112px ${px} 72px` : `48px ${px} 72px`),
          animation: "headerIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          {isHomePage ? (
            <>
              <div
                style={{
                  height: "1px",
                  width: "48px",
                  background: "var(--c-text)",
                  opacity: 0.28,
                  animation: "lineGrow48 0.55s ease 0.4s both",
                }}
              />
              <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.5 }}>SELECTED WORKS</span>
            </>
          ) : (
            <Link href="/" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--c-btn)" }}>
              <span style={{ fontSize: "14px" }}>&larr;</span> BACK TO HOME
            </Link>
          )}
        </div>

        <div style={{ fontSize: isMobile ? "32px" : "56px", fontWeight: 300, letterSpacing: isMobile ? "6px" : "9px", textTransform: "uppercase", lineHeight: 1 }}>PORTFOLIO</div>
        <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.32, marginTop: "14px" }}>
          {projects.length} ESTATES · 2023–2026
        </div>
        {isHomePage && !isMobile && (
          <Link
            href="/estates"
            className="cta-all"
            style={{
              ...actionButtonStyle,
              position: isMobile ? "static" : "absolute",
              right: isMobile ? "auto" : "64px",
              bottom: isMobile ? "auto" : "100px",
              marginTop: isMobile ? "28px" : "0",
            }}
          >
            VIEW ENTIRE PORTFOLIO →
          </Link>
        )}
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
        {projects.map((p) => (
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
            <div className="pcard-scale" style={{ position: "absolute", inset: 0, background: p.color }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div className="pcard-dim" />
            <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 3, fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(var(--c-text-rgb), 0.26)" }}>
              {p.idx}
            </div>
            <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 3, fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(var(--c-text-rgb), 0.26)" }}>
              {p.year}
            </div>
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
      <div style={{ padding: isMobile ? `36px ${px} 64px` : `52px ${px} 96px`, display: "flex", alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", gap: isMobile ? "28px" : "24px" }}>
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--c-text)", opacity: 0.22 }} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.36 }}>POETRY STUDIOS</span>
          </div>
        )}
        {isHomePage ? (
          isMobile && (
            <Link
              href="/estates"
              className="cta-all"
              style={actionButtonStyle}
            >
              VIEW ENTIRE PORTFOLIO →
            </Link>
          )
        ) : (
          <Link
            href="/"
            className="cta-all"
            style={actionButtonStyle}
          >
            ← BACK TO HOME
          </Link>
        )}
      </div>

      {/* ── PROJECT DETAIL OVERLAY ───────────────── */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--c-bg)",
            zIndex: 500,
            overflowY: "auto",
            animation: "detailUp 0.78s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
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
              color: "var(--c-text)",
              padding: 0,
              animation: "justFade 0.4s ease 0.55s both",
              opacity: 0,
            }}
          >
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" stroke="var(--c-text)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="4" x2="1" y2="4" />
              <polyline points="5,1 1,4 5,7" />
            </svg>
            PORTFOLIO
          </button>

          <div style={{ position: "relative", height: isMobile ? "320px" : "600px", background: selected.color, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected.img}
              alt={selected.name}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "justFade 1s ease 0.15s both", opacity: 0 }}
            />
            <div
              style={{
                position: "absolute", left: 0, width: "100%", top: "50%",
                fontSize: isMobile ? "18vw" : "11vw", fontWeight: 800, letterSpacing: "-0.01em",
                textAlign: "center", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
                color: "rgba(255,255,255,0.1)", animation: "wmBoom 1.4s cubic-bezier(0.22,1,0.36,1) 0.25s both",
                opacity: 0, transform: "translateY(-50%)",
              }}
            >
              {selected.name}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: isMobile ? "160px" : "270px", background: "linear-gradient(to bottom, transparent, rgba(var(--c-shadow-rgb), 0.6))", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: isMobile ? "28px" : "54px", left: isMobile ? "24px" : "64px", animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.58s both", opacity: 0 }}>
              <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "4px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "8px" }}>{selected.location}</div>
              <div style={{ fontSize: isMobile ? "28px" : "52px", fontWeight: 300, letterSpacing: isMobile ? "3px" : "5px", color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>{selected.name}</div>
            </div>
            <div style={{ position: "absolute", top: isMobile ? "56px" : "38px", right: isMobile ? "24px" : "64px", fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", animation: "justFade 0.5s ease 0.7s both", opacity: 0 }}>
              {selected.year}
            </div>
          </div>

          <div
            style={{
              display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: isMobile ? "24px" : "0", borderBottom: "1px solid rgba(var(--c-text-rgb), 0.1)",
              padding: isMobile ? `32px ${px}` : `52px ${px}`,
              animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.72s both", opacity: 0,
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
              <div style={{ height: "1px", width: "32px", background: "var(--c-text)", opacity: 0.25 }} />
            </div>
            <p style={{ fontSize: isMobile ? "16px" : "21px", fontWeight: 300, lineHeight: 1.78, letterSpacing: "0.3px" }}>{selected.note}</p>
          </div>

          {selected.gallery.length > 0 && (() => {
            const canPrev = galStart > 0;
            const canNext = galStart + 3 < selected.gallery.length;
            const arrowStyle = (active: boolean): React.CSSProperties => ({
              flexShrink: 0,
              background: "none",
              border: "none",
              cursor: active ? "pointer" : "default",
              padding: isMobile ? "0 8px" : "0 20px",
              opacity: active ? 0.65 : 0,
              pointerEvents: active ? "auto" : "none",
              transition: "opacity 0.2s",
              color: "var(--c-text)",
            });
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  animation: "justFade 0.7s ease 1.05s both",
                  opacity: 0,
                  padding: "0 3px",
                }}
              >
                {/* Left arrow */}
                <button style={arrowStyle(canPrev)} onClick={() => setGalStart((s) => s - 1)} aria-label="Previous">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="23" y1="6" x2="1" y2="6"/><polyline points="6,1 1,6 6,11"/>
                  </svg>
                </button>

                {/* Continuous sliding strip */}
                <div ref={galRef} className="gal-strip" style={{ flex: 1, display: "flex", gap: "3px" }}>
                  {selected.gallery.map((g, idx) => (
                    <div key={g.key} onClick={() => setLightbox(idx)} style={{ flexShrink: 0, width: "calc(33.333% - 2px)", height: isMobile ? "180px" : "340px", background: "var(--c-gallery-ph)", overflow: "hidden", cursor: "zoom-in" }}>
                      {g.type === "video" ? (
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`https://img.youtube.com/vi/${getYouTubeId(g.url)}/hqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
                            <svg width="52" height="52" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.9)"/><polygon points="21,16 40,26 21,36" fill="#3e1508"/></svg>
                          </div>
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={g.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Right arrow */}
                <button style={arrowStyle(canNext)} onClick={() => setGalStart((s) => s + 1)} aria-label="Next">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="6" x2="23" y2="6"/><polyline points="18,1 23,6 18,11"/>
                  </svg>
                </button>
              </div>
            );
          })()}

          <div style={{ padding: isMobile ? `40px ${px} 56px` : `64px ${px} 88px`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              className="cta-all"
              onClick={() => setSelected(null)}
              style={{
                background: "var(--c-btn)", color: "var(--c-btn-text)",
                fontFamily: "var(--font-barlow), Helvetica, sans-serif",
                fontSize: "10px", fontWeight: 600, letterSpacing: "3px",
                textTransform: "uppercase", padding: "14px 24px", border: "none", cursor: "pointer",
              }}
            >
              ← ALL PROJECTS
            </button>
            <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.3 }}>POETRY STUDIOS</span>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX — rendered at root to escape fixed stacking context ── */}
      {selected && lightbox !== null && (() => {
        const item = selected.gallery[lightbox];
        const canPrev = lightbox > 0;
        const canNext = lightbox < selected.gallery.length - 1;
        const arrowBtn = (dir: "left" | "right", active: boolean, onClick: () => void) => (
          <button
            onClick={(e) => { e.stopPropagation(); if (active) onClick(); }}
            style={{
              background: "none", border: "none", cursor: active ? "pointer" : "default",
              opacity: active ? 0.8 : 0, pointerEvents: active ? "auto" : "none",
              padding: isMobile ? "0 12px" : "0 32px", color: "var(--c-bg)", flexShrink: 0,
            }}
          >
            {dir === "left" ? (
              <svg width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="27" y1="7" x2="1" y2="7"/><polyline points="7,1 1,7 7,13"/>
              </svg>
            ) : (
              <svg width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="7" x2="27" y2="7"/><polyline points="21,1 27,7 21,13"/>
              </svg>
            )}
          </button>
        );
        return (
          <div
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {arrowBtn("left", canPrev, () => setLightbox((i) => i! - 1))}

            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: isMobile ? "92vw" : "78vw", height: isMobile ? "75vh" : "90vh", background: "var(--c-bg)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
            >
              <button
                onClick={() => setLightbox(null)}
                style={{ position: "absolute", top: "14px", right: "18px", background: "none", border: "none", fontSize: "22px", fontWeight: 300, color: "var(--c-text)", cursor: "pointer", lineHeight: 1, opacity: 0.5, zIndex: 1 }}
              >×</button>

              {item.type === "video" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              )}
            </div>

            {arrowBtn("right", canNext, () => setLightbox((i) => i! + 1))}
          </div>
        );
      })()}
    </div>
  );
}
