"use client";

import { useEffect, useState } from "react";

interface Article {
  idx: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  color: string;
  tileType: "image" | "type-dark" | "type-medium";
  img?: string;
  gridColumn: string;
  gridRow: string;
  strip?: boolean;
  body: string[];
}

const ARTICLES: Article[] = [
  {
    idx: "01",
    title: "The Case for Restraint in Modern Indian Homes",
    category: "ARCHITECTURE",
    date: "April 2026",
    excerpt: "In a market flooded with maximalism, we argue for the discipline of doing less — and doing it well.",
    color: "#b0a898",
    tileType: "image",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    gridColumn: "1/2",
    gridRow: "1/3",
    body: [
      "There is a particular kind of home that announces itself the moment you walk in. Every surface has been considered; every material chosen with care. Nothing competes. The space breathes.",
      "This is not a home built for Instagram. It is built for living — and paradoxically, it photographs better than any of the cluttered, surface-applied interiors that dominate Bangalore's project reels.",
      "At Poetry, restraint is not a style choice. It is a discipline rooted in the belief that architecture should serve the person who inhabits it, not the portfolio of the person who designed it.",
      "The most difficult thing to design is a wall with nothing on it. It requires absolute confidence in proportion, material and light. There is nowhere to hide. But when it works, it works completely.",
    ],
  },
  {
    idx: "02",
    title: "Exposed Concrete: A Material for Our Time",
    category: "CONSTRUCTION",
    date: "March 2026",
    excerpt: "Why the most honest material in a builder's palette is also the most demanding.",
    color: "#3e1508",
    tileType: "type-dark",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    gridColumn: "2/4",
    gridRow: "1/2",
    body: [
      "Concrete does not forgive. Every pour carries the risk of a visible failure — a cold joint, a honeycombed surface, a form tie left too long. To use it well is to take it seriously.",
      "We have been specifying exposed concrete in residential projects for three years now, and our relationship with the material continues to deepen. What draws us back is its honesty: it shows you exactly how it was made.",
    ],
  },
  {
    idx: "03",
    title: "Designing Around Bangalore's Climate",
    category: "ARCHITECTURE",
    date: "February 2026",
    excerpt: "The city's elevation and microclimate offer more passive design possibilities than most architects use.",
    color: "#c4bdb3",
    tileType: "image",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80",
    gridColumn: "2/3",
    gridRow: "2/3",
    body: [
      "Bangalore sits at 920 metres. Its temperature rarely exceeds 35°C in summer, and nights are reliably cool year-round. This is a remarkable gift for an Indian city — and most buildings here ignore it entirely.",
      "Good passive design in Bangalore means cross-ventilation, proper shading and thermal mass — all things done instinctively a century ago and forgotten in the rush to air-condition everything.",
    ],
  },
  {
    idx: "04",
    title: "The Details That Make an Interior",
    category: "INTERIOR",
    date: "January 2026",
    excerpt: "A conversation about the small decisions that separate a good room from a great one.",
    color: "#d0c9be",
    tileType: "type-medium",
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
    gridColumn: "3/4",
    gridRow: "2/3",
    body: [
      "The difference between a good interior and an exceptional one is rarely a single element. It lives in the accumulation of small, correct decisions: the reveal around a door frame, the way a baseboard meets the floor.",
      "These are the things that go unnoticed when they are right, and become immediately visible when they are wrong. We call them invisible details — not because they cannot be seen, but because when they succeed, the eye moves past them.",
    ],
  },
  {
    idx: "05",
    title: "Navigating BBMP Approvals",
    category: "PROCESS",
    date: "December 2025",
    excerpt: "What we have learned from 50+ approval submissions — and what your architect should know.",
    color: "#9a9288",
    tileType: "image",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    gridColumn: "1/3",
    gridRow: "3/4",
    body: [
      "The BBMP approval process is not opaque — it is procedural. The delays that clients dread almost always stem from incomplete documentation submitted by architects who have not done it enough times.",
      "In five years and over fifty submissions, Poetry has developed a checklist that pre-empts the most common objection points. We share our thinking here in the hope that the process becomes less intimidating.",
    ],
  },
  {
    idx: "06",
    title: "The Garden as Architecture",
    category: "LANDSCAPE",
    date: "November 2025",
    excerpt: "Why landscape must begin the moment the first sketch is drawn — not when construction ends.",
    color: "#3e1508",
    tileType: "type-dark",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    gridColumn: "3/4",
    gridRow: "3/4",
    body: [
      "The garden is not an afterthought. It is the first thing a visitor experiences, and the thing a resident interacts with most — even if only through a window.",
      "When landscape is designed after the building is finished, it almost always looks like it: plants chosen to fill empty space rather than to complete a composition.",
    ],
  },
];

const CATEGORIES = ["ALL", "ARCHITECTURE", "INTERIOR", "CONSTRUCTION", "LANDSCAPE", "PROCESS"];

export default function JournalSection() {
  const [selected, setSelected] = useState<Article | null>(null);
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    const cardIo = new IntersectionObserver(
      (entries) => {
        let delay = 0;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationDelay = `${delay}ms`;
            e.target.classList.add("card-visible");
            cardIo.unobserve(e.target);
            delay += 85;
          }
        });
      },
      { threshold: 0.06 }
    );
    document.querySelectorAll(".acard").forEach((c) => cardIo.observe(c));
    return () => cardIo.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <div style={{ fontFamily: "'Barlow', Helvetica, sans-serif", color: "#3e1508", background: "#ece8df" }}>

      {/* HEADER */}
      <div style={{ padding: "112px 64px 72px", position: "relative", overflow: "hidden", animation: "headerIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
        <div aria-hidden="true" style={{ position: "absolute", right: "-0.05em", top: "50%", transform: "translateY(-50%)", fontSize: "20vw", fontWeight: 800, letterSpacing: "-0.02em", color: "rgba(62,21,8,0.04)", lineHeight: 0.85, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>JOURNAL</div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", position: "relative", zIndex: 1 }}>
          <div style={{ height: "1px", width: "48px", background: "#3e1508", opacity: 0.25 }} />
          <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.48 }}>THE POETRY JOURNAL</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ fontSize: "56px", fontWeight: 300, letterSpacing: "9px", textTransform: "uppercase", lineHeight: 1 }}>ESSAYS &amp; THINKING</div>
            <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.3, marginTop: "14px" }}>{ARTICLES.length} ARTICLES · 2025–2026</div>
          </div>
          <div style={{ display: "flex", gap: "28px", alignItems: "center", paddingBottom: "4px" }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} className={cat === category ? "cat-btn cat-btn-active" : "cat-btn"} onClick={() => setCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLE GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "380px 260px 320px", gap: "3px", padding: "0 3px 3px" }}>
        {ARTICLES.map((art) => {
          const isActive = category === "ALL" || art.category === category;
          const isImage = art.tileType === "image";
          const isDark = art.tileType === "type-dark";
          const fg = isDark ? "236,232,223" : "62,21,8";
          const fgSolid = isDark ? "#ece8df" : "#3e1508";
          const isStrip = !!art.strip;

          return (
            <div
              key={art.idx}
              className={isImage ? "acard" : "acard tcard"}
              style={{
                gridColumn: art.gridColumn,
                gridRow: art.gridRow,
                background: art.color,
                position: "relative",
                opacity: isActive ? 1 : 0.05,
                filter: isActive ? "none" : "grayscale(1) brightness(1.14) contrast(0.85)",
                transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1)",
                pointerEvents: isActive ? "auto" : "none",
              }}
              onClick={isActive ? () => setSelected(art) : undefined}
            >
              {/* Image tile layers */}
              {isImage && (
                <>
                  <div className="acard-scale" style={{ position: "absolute", inset: 0, backgroundImage: `url(${art.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="acard-dim" />
                  <div style={{ position: "absolute", top: "24px", left: "28px", zIndex: 3, fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.42)" }}>{art.idx}</div>
                  <div style={{ position: "absolute", top: "24px", right: "28px", zIndex: 3, fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(236,232,223,0.36)" }}>{art.date}</div>
                  <div className="acard-info">
                    <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", color: "rgba(255,255,255,0.52)", textTransform: "uppercase", marginBottom: "9px" }}>{art.category}</div>
                    <div style={{ fontSize: "24px", fontWeight: 300, letterSpacing: "2px", color: "#fff", textTransform: "uppercase", lineHeight: 1.2, marginBottom: "11px" }}>{art.title}</div>
                    <div style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "16px", maxWidth: "360px" }}>{art.excerpt}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.38)" }} />
                      <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", color: "rgba(255,255,255,0.52)", textTransform: "uppercase" }}>READ ARTICLE</span>
                    </div>
                  </div>
                </>
              )}

              {/* Type tile content */}
              {!isImage && (
                <div style={{
                  position: "absolute", inset: 0, overflow: "hidden", zIndex: 3,
                  display: "flex", flexDirection: "column",
                  justifyContent: isStrip ? "center" : "space-between",
                  gap: isStrip ? "10px" : undefined,
                  padding: isStrip ? "28px 48px" : "32px 36px",
                }}>
                  <div style={{ position: "absolute", top: "20px", left: "20px", width: "18px", height: "18px", borderTop: `1px solid rgba(${fg},0.14)`, borderLeft: `1px solid rgba(${fg},0.14)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "18px", height: "18px", borderBottom: `1px solid rgba(${fg},0.14)`, borderRight: `1px solid rgba(${fg},0.14)`, pointerEvents: "none" }} />
                  <div aria-hidden="true" style={{ position: "absolute", right: "-0.04em", bottom: "-0.06em", fontSize: isStrip ? "9vw" : "13vw", fontWeight: 800, color: `rgba(${fg},0.04)`, lineHeight: 0.85, pointerEvents: "none", userSelect: "none", zIndex: 1, whiteSpace: "nowrap" }}>{art.idx}</div>
                  <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4.5px", textTransform: "uppercase", color: `rgba(${fg},0.3)`, position: "relative", zIndex: 2 }}>{art.category}</div>
                  <div style={{ position: "relative", zIndex: 2, flex: isStrip ? undefined : "1", display: "flex", flexDirection: "column", justifyContent: isStrip ? undefined : "flex-end" }}>
                    <div style={{ fontSize: isStrip ? "20px" : "26px", fontWeight: 300, letterSpacing: "3px", textTransform: "uppercase", color: fgSolid, lineHeight: 1.1, marginBottom: isStrip ? "0" : "12px" }}>{art.title}</div>
                    {!isStrip && <p style={{ fontSize: "12px", fontWeight: 300, lineHeight: 1.78, color: `rgba(${fg},0.5)` }}>{art.excerpt}</p>}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "18px" }}>
                      <div style={{ width: "16px", height: "1px", background: `rgba(${fg},0.28)` }} />
                      <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: `rgba(${fg},0.44)` }}>READ ARTICLE</span>
                    </div>
                  </div>
                  {!isStrip && <div style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", color: `rgba(${fg},0.26)`, position: "relative", zIndex: 2 }}>{art.date}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER NOTE */}
      <div style={{ padding: "52px 64px 96px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.28 }}>Writing on architecture, craft and making</span>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "32px", height: "1px", background: "#3e1508", opacity: 0.2 }} />
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.32 }}>POETRY STUDIOS</span>
        </div>
      </div>

      {/* ARTICLE DETAIL OVERLAY */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "#ece8df", zIndex: 500, overflowY: "auto", animation: "detailUp 0.78s cubic-bezier(0.22,1,0.36,1) both" }}>
          <button
            className="back-btn"
            onClick={() => setSelected(null)}
            style={{ position: "fixed", top: "40px", left: "64px", zIndex: 10, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontFamily: "'Barlow', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#3e1508", padding: 0, animation: "justFade 0.4s ease 0.55s both", opacity: 0 }}
          >
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" stroke="#3e1508" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="4" x2="1" y2="4" />
              <polyline points="5,1 1,4 5,7" />
            </svg>
            JOURNAL
          </button>

          <div style={{ display: "flex", height: "100vh", minHeight: "720px" }}>
            <div style={{ flex: "0 0 40%", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 72px 88px", borderRight: "1px solid rgba(62,21,8,0.1)", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: "-0.06em", top: "50%", transform: "translateY(-50%)", fontSize: "28vw", fontWeight: 800, letterSpacing: "-0.02em", color: "rgba(62,21,8,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", animation: "justFade 1.4s ease 0.1s both", opacity: 0 }}>{selected.idx}</div>
              <div style={{ position: "relative", zIndex: 1, animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.38s both", opacity: 0 }}>
                <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "5px", textTransform: "uppercase", opacity: 0.38, marginBottom: "30px" }}>{selected.category}</div>
                <div style={{ width: "1px", height: "72px", background: "#3e1508", opacity: 0.18, marginBottom: "30px" }} />
                <div style={{ fontSize: "38px", fontWeight: 300, letterSpacing: "3px", textTransform: "uppercase", lineHeight: 1.1, color: "#3e1508", marginBottom: "22px" }}>{selected.title}</div>
                <div style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.32 }}>{selected.date}</div>
              </div>
            </div>
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              <div style={{ width: "100%", height: "100%", backgroundImage: `url(${selected.img})`, backgroundSize: "cover", backgroundPosition: "center", animation: "justFade 1.1s ease 0.12s both", opacity: 0 }} />
            </div>
          </div>

          <div style={{ padding: "88px 64px 0", maxWidth: "800px", animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "52px" }}>
              <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.36 }}>{selected.category}</span>
              <div style={{ height: "1px", width: "32px", background: "#3e1508", opacity: 0.22 }} />
              <span style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.28 }}>{selected.date}</span>
            </div>
            <div className="article-body">
              {selected.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>

          <div style={{ padding: "72px 64px 88px", display: "flex", alignItems: "center", justifyContent: "space-between", animation: "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.8s both", opacity: 0 }}>
            <button className="cta-back" onClick={() => setSelected(null)} style={{ background: "#6b1d0d", color: "#ece8df", fontFamily: "'Barlow', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", padding: "16px 32px", border: "none", cursor: "pointer" }}>← ALL ARTICLES</button>
            <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.28 }}>POETRY STUDIOS</span>
          </div>
        </div>
      )}
    </div>
  );
}
