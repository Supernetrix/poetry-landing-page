"use client";

import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface SanityCertificate {
  _id: string;
  name?: string;
  subtitle?: string;
  year?: string;
  type?: string;
  image?: SanityImageSource;
}

interface CertData {
  name: string;
  subtitle: string;
  year: string;
  type: string;
  img?: string;
  flex: number;
  rotate: string;
  col: "left" | "right";
}

const CERT_LAYOUT = [
  { flex: 5, rotate: "-0.8deg", col: "left" as const },
  { flex: 3, rotate: "0.6deg",  col: "left" as const },
  { flex: 3, rotate: "0.5deg",  col: "right" as const },
  { flex: 4, rotate: "-0.4deg", col: "right" as const },
];

const FALLBACK_CERTS: CertData[] = [
  { name: "Industry Outlook Award", subtitle: "Top 10 Project Management\nServices Startups", year: "2023", type: "CERTIFICATE", flex: 5, rotate: "-0.8deg", col: "left" },
  { name: "ISO 9001:2015 Certified", subtitle: "Quality Management Systems\nBureau Veritas Certification", year: "2024", type: "CERTIFICATE", flex: 3, rotate: "0.6deg", col: "left" },
  { name: "IGBC Membership Certificate", subtitle: "Indian Green Building Council · CII\nMembership No. IGBCCS240055", year: "2024", type: "CERTIFICATE", flex: 3, rotate: "0.5deg", col: "right" },
  { name: "Industry Outlook — Featured Article", subtitle: "A Competent Architecture & Engineering Firm\nDedicated to Curating Exceptional Designs", year: "2023", type: "EDITORIAL FEATURE", flex: 4, rotate: "-0.4deg", col: "right" },
];

function mergeCerts(sanityCerts: SanityCertificate[]): CertData[] {
  return sanityCerts.slice(0, 4).map((c, i) => {
    const layout = CERT_LAYOUT[i] ?? CERT_LAYOUT[0];
    return {
      ...layout,
      name: c.name ?? "",
      subtitle: c.subtitle ?? "",
      year: c.year ?? "",
      type: c.type ?? "CERTIFICATE",
      img: c.image ? urlFor(c.image).width(600).url() : undefined,
    };
  });
}

const faqItems = [
  {
    q: "Why should one choose Poetry over other contractors?",
    a: "Poetry is known for trust and honest advisory. We are your partners throughout the journey of your dream home — helping you plan finances, avoid unnecessary spends, and suggesting utility-based designs with the right materials. No upsells, no surprises.",
  },
  {
    q: "Does Poetry demand extra funds mid-project?",
    a: "No. Poetry will help you plan your finances so that you never face unexpected costs. Every spend is well planned and communicated in advance — no unpleasant surprises, which is what sets us apart from others.",
  },
  {
    q: "Can designs be changed during construction?",
    a: "Designs are iterated and finalised during the design phase before construction starts. Minor, practically feasible changes can be accommodated during construction. Your architect walks you through every scenario before designs are finalised, so there are no doubts later on.",
  },
  {
    q: "Does the owner need to pay all the money at once?",
    a: "No. All payments are made as per the construction schedule, communicated clearly at the beginning of the project so you can plan your finances accordingly.",
  },
  {
    q: "Are architect services limited to only designing?",
    a: "No. Your dedicated Project Architect remains with you throughout the entire project cycle — advising on material selections, civil works, automation, solar electrification and more. Our architects are your partners for all seasons.",
  },
];

function CertCorners() {
  return (
    <>
      <div className="c-corner c-tl" />
      <div className="c-corner c-tr" />
      <div className="c-corner c-bl" />
      <div className="c-corner c-br" />
    </>
  );
}

function CertPlaceholder({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", opacity: 0.28, padding: 32 }}>
      <div style={{ width: 36, height: 36, border: "1px solid var(--c-text)", transform: "rotate(45deg)", margin: "0 auto 20px" }} />
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, marginTop: 8 }}>IMAGE PLACEHOLDER</div>
    </div>
  );
}

function GoldSeal() {
  return (
    <div style={{ position: "absolute", bottom: 68, right: 24, width: 28, height: 28, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, rgba(var(--c-cert-gold-rgb), 0.5), rgba(var(--c-cert-gold-rgb), 0.15))", border: "1px solid rgba(var(--c-cert-gold-rgb), 0.4)" }} />
  );
}

export default function AboutSection({ certificates: sanityCerts }: { certificates?: SanityCertificate[] }) {
  const certs: CertData[] =
    sanityCerts && sanityCerts.length > 0 ? mergeCerts(sanityCerts) : FALLBACK_CERTS;
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      { threshold: 0.07, rootMargin: "0px 0px -32px 0px" }
    );

    root.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 6) * 70}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>

      {/* ── CERTIFICATIONS ─────────────────────────────────────── */}
      <section
        id="certifications"
        className="section-wrap"
        style={{ position: "relative", padding: "120px 64px 140px", background: "var(--c-text)", overflow: "hidden", fontFamily: "'Barlow',Helvetica,sans-serif", color: "var(--c-bg)" }}
      >
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, position: "relative", zIndex: 1 }}>
          <div style={{ height: 1, width: 48, background: "rgba(var(--c-bg-rgb), 0.25)" }} />
          <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 4, textTransform: "uppercase", opacity: 0.48 }}>CERTIFICATIONS</span>
        </div>

        <div className="reveal" style={{ marginBottom: 88, position: "relative", zIndex: 1 }}>
          <div className="hero-title" style={{ fontSize: 52, fontWeight: 300, letterSpacing: 6, textTransform: "uppercase", lineHeight: 1 }}>INDUSTRY CERTIFICATIONS</div>
          <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", opacity: 0.32, marginTop: 18 }}>CERTIFICATIONS · AWARDS · FEATURES</div>
        </div>

        <div className="reveal cert-wall" style={{ display: "grid", gridTemplateColumns: "38% 1fr", gap: 36, position: "relative", zIndex: 1, height: "880px" }}>
          {(["left", "right"] as const).map((col, colIdx) => (
            <div key={col} className={col === "right" ? "cert-right-col" : ""} style={{ display: "flex", flexDirection: "column", gap: 36, height: "100%" }}>
              {certs.filter(c => c.col === col).map((cert, i) => (
                <div key={colIdx * 2 + i} className="cert-frame" style={{ flex: cert.flex, display: "flex", flexDirection: "column", transform: `rotate(${cert.rotate})` }}>
                  <div style={{ flex: 1, minHeight: 0, background: "var(--c-cert-inner)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {cert.img
                      ? <img src={cert.img} alt={cert.name} style={{ width: "100%", height: "100%", objectFit: "cover", padding: 10 }} />
                      : <CertPlaceholder label={cert.type} />
                    }
                  </div>
                  <div style={{ padding: "22px 28px 28px", flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6, color: "#6b1d0d" }}>{cert.name}</div>
                      <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: 2, textTransform: "uppercase", color: "#6b1d0d", opacity: 0.75, lineHeight: 1.6 }}>
                        {cert.subtitle.split("\n").map((line, j) => (
                          <span key={j}>{line}{j < cert.subtitle.split("\n").length - 1 && <br />}</span>
                        ))}
                      </div>
                    </div>
                    <div className="year-badge" style={{ flexShrink: 0 }}>{cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="reveal" style={{ height: 1, background: "rgba(var(--c-bg-rgb), 0.12)", margin: "80px 0 48px", position: "relative", zIndex: 1 }} />
        <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", opacity: 0.3 }}>All certifications verified</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 10, height: 10, background: "rgba(var(--c-bg-rgb), 0.18)", transform: "rotate(45deg)" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", opacity: 0.34 }}>POETRY CONSTRUCTIONS</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT US ───────────────────────────────────────────── */}
      <section
        id="about"
        className="section-wrap"
        style={{ position: "relative", padding: "80px 64px 0", background: "var(--c-bg)", overflow: "hidden", fontFamily: "'Barlow',Helvetica,sans-serif", color: "var(--c-text)" }}
      >
        {/* Intro */}
        <div className="reveal two-col" style={{ display: "grid", gridTemplateColumns: "45% 1fr", gap: 72, alignItems: "start", marginBottom: 64, position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <div style={{ height: 1, width: 48, background: "var(--c-text)", opacity: 0.25 }} />
              <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 4, textTransform: "uppercase", opacity: 0.48 }}>ABOUT US</span>
            </div>
            <div className="hero-title" style={{ fontSize: 46, fontWeight: 300, letterSpacing: 5, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 20 }}>BUILDING DREAMS WITH INTEGRITY &amp; CRAFT</div>
            <div style={{ fontSize: 10, fontWeight: 400, letterSpacing: 5, textTransform: "uppercase", opacity: 0.34 }}>BANGALORE · EST. 2020</div>
          </div>
          <div style={{ paddingTop: 4 }}>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.84, letterSpacing: 0.2, marginBottom: 44, opacity: 0.82 }}>
              Founded in 2020, Poetry replaces the chaos of managing multiple vendors with a single integrated design-and-build solution. One team, one architect, one point of contact — from brief to handover. Over 20 years of combined experience, delivered under one roof at a contractor&apos;s price.
            </p>
            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
              <div style={{ padding: "24px 28px 24px 0", borderRight: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>50+</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginTop: 8, lineHeight: 1.5 }}>Total<br />Projects</div>
              </div>
              <div style={{ padding: "24px 28px", borderRight: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>25+</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginTop: 8, lineHeight: 1.5 }}>Ongoing<br />Projects</div>
              </div>
              <div style={{ padding: "24px 0 24px 28px", background: "var(--c-text)" }}>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1, color: "var(--c-bg)" }}>14+</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(var(--c-bg-rgb), 0.55)", marginTop: 8, lineHeight: 1.5 }}>Completed<br />Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder cards */}
        <div className="reveal two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 80, position: "relative", zIndex: 1 }}>

          {/* Prajon: circle left · info right (same layout as Praveen) */}
          <div className="founder-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "40px 40px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 200, height: 200, background: "var(--c-btn)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: 1, color: "var(--c-bg)" }}>PN</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Prajon Nair</div>
                <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginBottom: 18 }}>Co-Founder · Managing Partner</div>
                <div style={{ display: "inline-block", background: "var(--c-text)", padding: "6px 16px" }}>
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--c-bg)" }}>LEAD ARCHITECT · 10+ YRS</span>
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(var(--c-text-rgb), 0.08)", margin: "0 40px" }} />
            <div style={{ padding: "28px 40px 40px" }}>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.86, opacity: 0.74 }}>
                An architect with over 10 years of experience across residential, commercial and luxury resort projects, Prajon has always been driven to deliver quality and lasting value. His unique ability to translate a client&apos;s vision into built reality makes him one of Bangalore&apos;s most sought-after architects. He leads design and project execution, and serves as Poetry&apos;s chief of design.
              </p>
            </div>
          </div>

          {/* Praveen: circle left · info right */}
          <div className="founder-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "40px 40px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 200, height: 200, background: "var(--c-text)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: 1, color: "var(--c-bg)" }}>PN</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Praveen Nair</div>
                <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginBottom: 18 }}>Co-Founder · Managing Partner</div>
                <div style={{ display: "inline-block", background: "var(--c-text)", padding: "6px 16px" }}>
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--c-bg)" }}>EX-JLL &amp; COLLIERS · 15+ YRS</span>
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(var(--c-text-rgb), 0.08)", margin: "0 40px" }} />
            <div style={{ padding: "28px 40px 40px" }}>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.86, opacity: 0.74 }}>
                With over 15 years in the Indian Real Estate Investment industry, having worked with JLL &amp; Colliers International, Praveen brings vast experience in strategy and operations to Poetry. A master in business management, he understands the gaps in today&apos;s retail construction market. He leads strategy, corporate management, investor relations and brand marketing.
              </p>
            </div>
          </div>

        </div>

        {/* FAQ */}
        <div className="reveal" style={{ position: "relative", zIndex: 1, marginTop: 80, marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", opacity: 0.34, marginBottom: 10 }}>QUESTIONS &amp; ANSWERS</div>
          <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: 5, textTransform: "uppercase", lineHeight: 1 }}>FREQUENTLY ASKED</div>
        </div>

        <div className="reveal" style={{ marginBottom: 80, position: "relative", zIndex: 1, borderTop: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
          {faqItems.map((item, i) => (
            <div key={i} className="faq-row">
              <div className="faq-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="faq-q">{item.q}</span>
                <span style={{ display: "inline-block", flexShrink: 0, fontSize: 22, fontWeight: 300, lineHeight: 1, color: "var(--c-btn)", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>+</span>
              </div>
              <div style={{ maxHeight: openFaq === i ? 220 : 0, overflow: "hidden", transition: "max-height 0.44s cubic-bezier(0.22,1,0.36,1)" }}>
                <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.86, opacity: 0.68, paddingBottom: 28, paddingRight: 52 }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
