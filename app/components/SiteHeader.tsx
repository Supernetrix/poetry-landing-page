"use client";

import { useEffect, useState } from "react";
import { useMobile } from "../hooks/useMobile";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "OUR STORY", href: "/ourstory" },
  { label: "PROJECTS", href: "/projects" },
  { label: "SERVICES", href: "/#services" },
  { label: "CERTIFICATIONS", href: "/#certifications" },
  { label: "ECO HOMES", href: "/#portfolio" },
  { label: "CAREERS", href: "/#careers" },
  { label: "SOCIAL", href: "/#footer" },
] as const;

export default function SiteHeader() {
  const isMobile = useMobile(768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="black-hero__header">
      {!isMobile ? (
        <nav className="black-hero__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="black-hero__nav-link">
              {link.label}
            </a>
          ))}
        </nav>
      ) : (
        <>
          <button
            type="button"
            className="black-hero__menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav className={`black-hero__drawer${menuOpen ? " is-open" : ""}`} aria-label="Primary">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="black-hero__drawer-link"
                style={{ animationDelay: `${0.05 + index * 0.04}s` }}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {menuOpen && (
            <button
              type="button"
              className="black-hero__drawer-backdrop"
              aria-label="Close menu"
              onClick={closeMenu}
            />
          )}
        </>
      )}
    </header>
  );
}
