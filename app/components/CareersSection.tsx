"use client";

import { useEffect, useRef, useState } from "react";

interface Role {
  num: string;
  title: string;
  location: string;
  type: string;
  desc: string;
  req0: string;
  req1: string;
  req2: string;
  req3: string;
  offer: string;
}

const ROLES: Role[] = [
  {
    num: "01",
    title: "SENIOR ARCHITECT",
    location: "Bangalore",
    type: "Full-time",
    desc: "Lead the design and technical development of residential and commercial projects from concept to construction documentation. You will work directly with clients, engineers and contractors to deliver buildings that are considered, buildable and lasting.",
    req0: "7+ years post-qualification experience",
    req1: "Strong command of AutoCAD, Revit or ArchiCAD",
    req2: "Experience with BBMP and BDA approval processes",
    req3: "A portfolio that demonstrates rigour and craft",
    offer: "₹18–28 LPA · Health cover · Flexible hours",
  },
  {
    num: "02",
    title: "INTERIOR DESIGNER",
    location: "Bangalore",
    type: "Full-time",
    desc: "Design residential interiors from material boards to construction details. You will collaborate with the architecture team to create spaces that are cohesive, liveable and built with intention.",
    req0: "3–6 years residential interior design experience",
    req1: "Proficiency in AutoCAD and 3D rendering (SketchUp / 3ds Max / Enscape)",
    req2: "Strong eye for materials, finishes and furniture",
    req3: "Excellent client communication skills",
    offer: "₹10–18 LPA · Health cover · Annual review",
  },
  {
    num: "03",
    title: "SITE ENGINEER",
    location: "Bangalore",
    type: "Full-time",
    desc: "Oversee construction quality on active sites — daily supervision, quality checks, contractor coordination and regular reporting to the project architect. You are the firm's eyes and hands on the ground.",
    req0: "BE / B.Tech in Civil Engineering",
    req1: "3+ years residential or mixed-use construction",
    req2: "Working knowledge of RCC, brickwork and finishing standards",
    req3: "Site reporting and documentation proficiency",
    offer: "₹8–14 LPA · Site allowances · Growth path",
  },
  {
    num: "04",
    title: "PROJECT COORDINATOR",
    location: "Bangalore",
    type: "Full-time",
    desc: "The operational backbone of each project — managing timelines, client communication, vendor schedules and documentation. You keep the practice moving so the designers can focus on design.",
    req0: "2–4 years project management or similar role",
    req1: "Excellent written and verbal communication",
    req2: "Proficiency in project tracking tools",
    req3: "Architecture or engineering background preferred",
    offer: "₹6–10 LPA · Performance bonus · Mentorship",
  },
  {
    num: "05",
    title: "3D VISUALISATION ARTIST",
    location: "Remote",
    type: "Contract",
    desc: "Produce photorealistic renders and walkthroughs for client presentations and marketing. You will work closely with both the architecture and interior teams, translating design intent into compelling imagery.",
    req0: "3+ years architectural visualisation",
    req1: "Expert in 3ds Max, Corona Renderer or V-Ray",
    req2: "Strong sense of light, material and composition",
    req3: "Fast turnaround on revision cycles",
    offer: "Project-based · Competitive day rate",
  },
];

export default function CareersSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openRole, setOpenRole] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -28px 0px" }
    );

    root.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 4) * 65}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} style={{ fontFamily: "'Barlow', Helvetica, sans-serif", color: "#3e1508" }}>

      {/* DARK HERO */}
      <div style={{ background: "#3e1508", position: "relative", overflow: "hidden", padding: "120px 64px 110px" }}>
        <div aria-hidden="true" style={{ position: "absolute", right: "-0.06em", top: "50%", transform: "translateY(-50%)", fontSize: "24vw", fontWeight: 800, letterSpacing: "-0.02em", color: "rgba(236,232,223,0.04)", lineHeight: 0.85, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>JOIN</div>
        <div style={{ position: "absolute", top: "44px", left: "44px", width: "22px", height: "22px", borderTop: "1px solid rgba(236,232,223,0.12)", borderLeft: "1px solid rgba(236,232,223,0.12)" }} />
        <div style={{ position: "absolute", top: "44px", right: "44px", width: "22px", height: "22px", borderTop: "1px solid rgba(236,232,223,0.12)", borderRight: "1px solid rgba(236,232,223,0.12)" }} />
        <div style={{ position: "absolute", bottom: "44px", left: "44px", width: "22px", height: "22px", borderBottom: "1px solid rgba(236,232,223,0.12)", borderLeft: "1px solid rgba(236,232,223,0.12)" }} />
        <div style={{ position: "absolute", bottom: "44px", right: "44px", width: "22px", height: "22px", borderBottom: "1px solid rgba(236,232,223,0.12)", borderRight: "1px solid rgba(236,232,223,0.12)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "52px", position: "relative", zIndex: 1, animation: "slideRight 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(236,232,223,0.2)" }} />
          <span style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "4.5px", textTransform: "uppercase", color: "rgba(236,232,223,0.32)" }}>CAREERS</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "45% 1fr", gap: "80px", alignItems: "end", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ fontSize: "68px", fontWeight: 300, letterSpacing: "8px", textTransform: "uppercase", lineHeight: 1, color: "#ece8df", marginBottom: "24px", animation: "slideRight 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>BUILD<br />WITH US.</div>
            <div style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(236,232,223,0.3)", animation: "justFade 0.6s ease 0.5s both" }}>BANGALORE · {ROLES.length} OPEN ROLES</div>
          </div>
          <div style={{ animation: "slideUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.84, letterSpacing: "0.2px", color: "rgba(236,232,223,0.62)", maxWidth: "440px", marginBottom: "44px" }}>We are a small studio that punches above its weight. Every person here owns their work — from first sketch to final handover. We are growing, and we are looking for people who care about craft as much as we do.</p>
            <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
              <div>
                <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", color: "#ece8df", lineHeight: 1 }}>35+</div>
                <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.34)", marginTop: "8px", lineHeight: 1.5 }}>Team<br />Members</div>
              </div>
              <div style={{ width: "1px", height: "56px", background: "rgba(236,232,223,0.12)" }} />
              <div>
                <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", color: "#ece8df", lineHeight: 1 }}>6</div>
                <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.34)", marginTop: "8px", lineHeight: 1.5 }}>Years<br />Growing</div>
              </div>
              <div style={{ width: "1px", height: "56px", background: "rgba(236,232,223,0.12)" }} />
              <div>
                <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", color: "#ece8df", lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.34)", marginTop: "8px", lineHeight: 1.5 }}>Promoted<br />Within</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OPEN ROLES */}
      <div style={{ padding: "100px 64px 80px", background: "#ece8df" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div style={{ height: "1px", width: "48px", background: "#3e1508", opacity: 0.22 }} />
          <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.46 }}>OPEN POSITIONS</span>
        </div>
        <div className="reveal" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "64px" }}>
          <div>
            <div style={{ fontSize: "52px", fontWeight: 300, letterSpacing: "7px", textTransform: "uppercase", lineHeight: 1 }}>CURRENT OPENINGS</div>
            <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.3, marginTop: "14px" }}>{ROLES.length} POSITIONS · BANGALORE &amp; REMOTE</div>
          </div>
          <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.22 }}>CLICK A ROLE TO EXPAND</span>
        </div>

        <div className="reveal">
          {ROLES.map((role) => (
            <div key={role.num} className="role-row">
              <div className="role-trigger" onClick={() => setOpenRole(openRole === role.num ? null : role.num)}>
                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "3px", color: "rgba(62,21,8,0.26)", minWidth: "36px" }}>{role.num}</span>
                <span style={{ fontSize: "38px", fontWeight: 300, letterSpacing: "4px", textTransform: "uppercase", flex: 1, lineHeight: 1, color: "#3e1508" }}>{role.title}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", background: "rgba(62,21,8,0.07)", padding: "5px 12px", color: "rgba(62,21,8,0.5)" }}>{role.type}</span>
                  <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(62,21,8,0.36)", minWidth: "80px", textAlign: "right" }}>{role.location}</span>
                  <div style={{ display: "inline-block", transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1)", transform: openRole === role.num ? "rotate(45deg)" : "rotate(0deg)", lineHeight: 0, flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3e1508" strokeWidth="1.2" strokeLinecap="round">
                      <line x1="9" y1="2" x2="9" y2="16" />
                      <line x1="2" y1="9" x2="16" y2="9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div style={{ maxHeight: openRole === role.num ? "440px" : "0", overflow: "hidden", transition: "max-height 0.54s cubic-bezier(0.22,1,0.36,1)" }}>
                <div style={{ padding: "8px 0 48px 52px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", borderTop: "1px solid rgba(62,21,8,0.06)" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.88, opacity: 0.68, marginBottom: "32px" }}>{role.desc}</p>
                    <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.34, marginBottom: "18px" }}>WHAT WE&apos;RE LOOKING FOR</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[role.req0, role.req1, role.req2, role.req3].map((req, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <div style={{ width: "4px", height: "4px", background: "#6b1d0d", transform: "rotate(45deg)", flexShrink: 0, marginTop: "8px" }} />
                          <span style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.6, color: "rgba(62,21,8,0.72)" }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", opacity: 0.34, marginBottom: "16px" }}>COMPENSATION</div>
                      <div style={{ fontSize: "15px", fontWeight: 300, letterSpacing: "0.5px", opacity: 0.72, lineHeight: 1.6, marginBottom: "28px" }}>{role.offer}</div>
                      <div style={{ height: "1px", background: "rgba(62,21,8,0.1)", marginBottom: "28px" }} />
                      <p style={{ fontSize: "12px", fontWeight: 400, letterSpacing: "0.5px", opacity: 0.38, lineHeight: 1.7 }}>
                        Send your CV and portfolio to<br />
                        <strong style={{ fontWeight: 600, letterSpacing: "1px", opacity: 1 }}>careers@poetryconstructions.com</strong>
                      </p>
                    </div>
                    <button className="btn-apply" style={{ alignSelf: "flex-start", marginTop: "32px" }}>APPLY FOR THIS ROLE →</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STUDIO VALUES */}
      <div style={{ background: "#3e1508", padding: "100px 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", right: "-0.04em", top: "50%", transform: "translateY(-50%)", fontSize: "20vw", fontWeight: 800, color: "rgba(236,232,223,0.035)", lineHeight: 0.85, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>CULTURE</div>

        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "52px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(236,232,223,0.18)" }} />
          <span style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "4.5px", textTransform: "uppercase", color: "rgba(236,232,223,0.32)" }}>STUDIO LIFE</span>
        </div>
        <div className="reveal" style={{ fontSize: "52px", fontWeight: 300, letterSpacing: "7px", textTransform: "uppercase", color: "#ece8df", marginBottom: "72px", position: "relative", zIndex: 1, lineHeight: 1 }}>WHY POETRY</div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px", position: "relative", zIndex: 1 }}>
          <div className="value-card" style={{ background: "rgba(236,232,223,0.04)" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.28)", marginBottom: "24px" }}>01</div>
            <div style={{ fontSize: "19px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#ece8df", marginBottom: "20px", lineHeight: 1.2 }}>CRAFT FIRST</div>
            <div style={{ width: "28px", height: "1.5px", background: "rgba(236,232,223,0.18)", marginBottom: "20px" }} />
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.82, color: "rgba(236,232,223,0.56)" }}>We slow down to get things right. Every detail is deliberate. Our people are given the time and trust to do their best work — without compromise.</p>
          </div>
          <div className="value-card" style={{ background: "rgba(236,232,223,0.04)" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.28)", marginBottom: "24px" }}>02</div>
            <div style={{ fontSize: "19px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#ece8df", marginBottom: "20px", lineHeight: 1.2 }}>ONE TEAM</div>
            <div style={{ width: "28px", height: "1.5px", background: "rgba(236,232,223,0.18)", marginBottom: "20px" }} />
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.82, color: "rgba(236,232,223,0.56)" }}>Architects, engineers, interior designers and coordinators share one studio. No silos. Decisions are made together and owned together.</p>
          </div>
          <div className="value-card" style={{ background: "rgba(236,232,223,0.04)" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.28)", marginBottom: "24px" }}>03</div>
            <div style={{ fontSize: "19px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#ece8df", marginBottom: "20px", lineHeight: 1.2 }}>REAL GROWTH</div>
            <div style={{ width: "28px", height: "1.5px", background: "rgba(236,232,223,0.18)", marginBottom: "20px" }} />
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.82, color: "rgba(236,232,223,0.56)" }}>Small enough that your contribution is visible. Growing fast enough that opportunity is constant. We promote from within — always.</p>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "6px", height: "6px", background: "rgba(236,232,223,0.16)", transform: "rotate(45deg)" }} />
            <span style={{ fontSize: "9px", fontWeight: 300, letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(236,232,223,0.2)" }}>ONE TEAM · EVERY DISCIPLINE</span>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(236,232,223,0.2)" }}>BANGALORE · EST. 2020</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "100px 64px 80px", background: "#ece8df", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: "26vw", fontWeight: 800, color: "rgba(62,21,8,0.03)", lineHeight: 0.85, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>APPLY</div>

        <div className="reveal" style={{ maxWidth: "680px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "5px", textTransform: "uppercase", opacity: 0.34, marginBottom: "20px" }}>GET IN TOUCH</div>
          <div style={{ fontSize: "52px", fontWeight: 300, letterSpacing: "6px", textTransform: "uppercase", lineHeight: 1.08, marginBottom: "28px" }}>DON&apos;T SEE<br />YOUR ROLE?</div>
          <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.82, opacity: 0.6, maxWidth: "480px", marginBottom: "44px" }}>If you&apos;re the kind of person who cares deeply about craft, we&apos;d like to hear from you regardless of what&apos;s listed above. Send us your portfolio and a short note about what drives you.</p>
          <button className="btn-careers-primary">SEND YOUR PORTFOLIO</button>
        </div>

        <div className="reveal" style={{ height: "1px", background: "rgba(62,21,8,0.1)", margin: "80px 0 44px", position: "relative", zIndex: 1 }} />
        <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.28 }}>All applications treated in confidence</span>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "10px", height: "10px", background: "rgba(62,21,8,0.16)", transform: "rotate(45deg)" }} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.32 }}>POETRY CONSTRUCTIONS</span>
          </div>
        </div>
      </div>

    </div>
  );
}
