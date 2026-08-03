"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMobile } from "../hooks/useMobile";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface SanityCertificate {
  _id: string;
  name?: string;
  image?: SanityImageSource;
}

interface CertData {
  id: string;
  name: string;
  img: string;
}

function mergeCerts(sanityCerts: SanityCertificate[]): CertData[] {
  return sanityCerts.flatMap((certificate) => {
    if (!certificate.image) return [];

    return [{
      id: certificate._id,
      name: certificate.name ?? "Certificate",
      img: urlFor(certificate.image).width(1600).auto("format").url(),
    }];
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

export default function AboutSection({ certificates: sanityCerts }: { certificates?: SanityCertificate[] }) {
  const certs = mergeCerts(sanityCerts ?? []);
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

        <div className="reveal certificate-gallery">
          {certs.map((certificate) => (
            <Image
              key={certificate.id}
              className="certificate-image"
              src={certificate.img}
              alt={certificate.name}
              width={1600}
              height={1200}
              sizes="(max-width: 900px) calc(100vw - 56px), 1100px"
            />
          ))}
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
            <div style={{ display: "flex", flexDirection: "row", borderTop: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
              <div style={{ flex: 1, padding: isMobile ? "16px 12px 16px 0" : "24px 28px 24px 0", borderRight: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
                <div style={{ fontSize: isMobile ? 24 : 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>50+</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginTop: 8, lineHeight: 1.5 }}>Total<br />Projects</div>
              </div>
              <div style={{ flex: 1, padding: isMobile ? "16px 12px" : "24px 28px", borderRight: "1px solid rgba(var(--c-text-rgb), 0.1)" }}>
                <div style={{ fontSize: isMobile ? 24 : 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>25+</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginTop: 8, lineHeight: 1.5 }}>Ongoing<br />Projects</div>
              </div>
              <div style={{ flex: 1, padding: isMobile ? "16px 0 16px 12px" : "24px 0 24px 28px", background: "var(--c-text)" }}>
                <div style={{ fontSize: isMobile ? 24 : 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1, color: "var(--c-bg)" }}>14+</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(var(--c-bg-rgb), 0.55)", marginTop: 8, lineHeight: 1.5 }}>Completed<br />Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder cards */}
        <div className="reveal two-col" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 3, marginBottom: 80, position: "relative", zIndex: 1 }}>

          {/* Prajon */}
          <div className="founder-card" style={{ padding: 0, overflow: "hidden" }}>
            {isMobile ? (
              <div style={{ padding: "32px 28px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
                <div style={{ width: 160, height: 160, background: "var(--c-btn)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: 1, color: "var(--c-bg)" }}>PN</span>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Prajon Nair</div>
                  <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginBottom: 14 }}>Co-Founder · Managing Partner</div>
                  <div style={{ display: "inline-block", background: "var(--c-text)", padding: "6px 16px" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--c-bg)" }}>LEAD ARCHITECT · 10+ YRS</span>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
            <div style={{ height: 1, background: "rgba(var(--c-text-rgb), 0.08)", margin: isMobile ? "0 28px" : "0 40px" }} />
            <div style={{ padding: isMobile ? "20px 28px 32px" : "28px 40px 40px" }}>
              <p style={{ fontSize: isMobile ? 13 : 14, fontWeight: 300, lineHeight: 1.86, opacity: 0.74 }}>
                An architect with over 10 years of experience across residential, commercial and luxury resort projects, Prajon has always been driven to deliver quality and lasting value. His unique ability to translate a client&apos;s vision into built reality makes him one of Bangalore&apos;s most sought-after architects. He leads design and project execution, and serves as Poetry&apos;s chief of design.
              </p>
            </div>
          </div>

          {/* Praveen */}
          <div className="founder-card" style={{ padding: 0, overflow: "hidden" }}>
            {isMobile ? (
              <div style={{ padding: "32px 28px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
                <div style={{ width: 160, height: 160, background: "var(--c-text)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: 1, color: "var(--c-bg)" }}>PN</span>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Praveen Nair</div>
                  <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", opacity: 0.44, marginBottom: 14 }}>Co-Founder · Managing Partner</div>
                  <div style={{ display: "inline-block", background: "var(--c-text)", padding: "6px 16px" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--c-bg)" }}>EX-JLL &amp; COLLIERS · 15+ YRS</span>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
            <div style={{ height: 1, background: "rgba(var(--c-text-rgb), 0.08)", margin: isMobile ? "0 28px" : "0 40px" }} />
            <div style={{ padding: isMobile ? "20px 28px 32px" : "28px 40px 40px" }}>
              <p style={{ fontSize: isMobile ? 13 : 14, fontWeight: 300, lineHeight: 1.86, opacity: 0.74 }}>
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
