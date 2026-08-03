"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, MouseEvent } from "react";
import secondHeroImage from "../../public/second hero .png";

const sectionLinks = [
  { label: "HOME", href: "/", active: true },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#portfolio" },
  { label: "JOURNAL", href: "#journal" },
  { label: "CAREERS", href: "#careers" },
];

export default function SecondHeroSection() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isEnquiryOpen) return;

    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus({ preventScroll: true }), 650);
    return () => window.clearTimeout(focusTimer);
  }, [isEnquiryOpen]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsHeroVisible(true);
        observer.disconnect();
      },
      { threshold: 0.32 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const openEnquiry = (event: MouseEvent<HTMLButtonElement>) => {
    lastTriggerRef.current = event.currentTarget;
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      closeEnquiry();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) return;

    const focusableElements = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>("button:not([tabindex='-1']), input:not([tabindex='-1'])"),
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  const handleEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nI would like to discuss a project with Poetry Constructions.`);

    window.location.href = `mailto:hello@poetryconstructions.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={sectionRef}
      className={`second-hero${isHeroVisible ? " is-visible" : ""}`}
      aria-labelledby="second-hero-title"
    >
      <header className="second-hero__topbar">
        <nav className="second-hero__nav" aria-label="Featured section navigation">
          {sectionLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`second-hero__nav-link${item.active ? " second-hero__nav-link--active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="second-hero__actions">
          <a className="second-hero__client-portal" href="#">
            <svg aria-hidden="true" viewBox="0 0 14 14">
              <rect x="1" y="5" width="12" height="8" rx="1" />
              <path d="M4 5V3.5a3 3 0 0 1 6 0V5" />
            </svg>
            CLIENT PORTAL
          </a>
          <button className="second-hero__project-link" type="button" onClick={openEnquiry} aria-haspopup="dialog">
            START A PROJECT
            <svg aria-hidden="true" viewBox="0 0 44 22">
              <path d="M0 11h41M31 1l10 10-10 10" />
            </svg>
          </button>
        </div>
      </header>

      <div className="second-hero__brand-note">Poetry Constructions</div>

      <div className="second-hero__edition-note">
        <span>2026</span>
        <span>Architecture with intention</span>
      </div>

      <ul className="second-hero__disciplines" aria-label="Core disciplines">
        <li>Architecture</li>
        <li>Interior Design</li>
        <li>Construction</li>
      </ul>

      <h2 id="second-hero-title" className="second-hero__title">
        POETRY
      </h2>

      <div className="second-hero__image" aria-hidden="true">
        <Image
          src={secondHeroImage}
          alt=""
          sizes="(max-width: 760px) 230vw, 100vw"
          className="second-hero__image-element"
        />
      </div>

      <div className="second-hero__script" aria-hidden="true">estates</div>

      <button className="second-hero__mobile-project-trigger" type="button" onClick={openEnquiry} aria-haspopup="dialog">
        START A PROJECT
        <span aria-hidden="true">→</span>
      </button>

      <button
        className={`second-hero__enquiry-backdrop${isEnquiryOpen ? " is-open" : ""}`}
        type="button"
        aria-label="Close project enquiry form"
        aria-hidden={!isEnquiryOpen}
        tabIndex={-1}
        onClick={closeEnquiry}
      />

      <aside
        ref={panelRef}
        className={`second-hero__enquiry-dialog${isEnquiryOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isEnquiryOpen}
        aria-labelledby="second-hero-enquiry-title"
        onKeyDown={handlePanelKeyDown}
      >
        <button
          className="second-hero__enquiry-close"
          type="button"
          aria-label="Close project enquiry form"
          tabIndex={isEnquiryOpen ? 0 : -1}
          onClick={closeEnquiry}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <h3 id="second-hero-enquiry-title" className="second-hero__enquiry-title">
          LET&apos;S BRING YOUR VISION TO LIFE
        </h3>

        <form className="second-hero__enquiry-form" onSubmit={handleEnquiry}>
          <div className="second-hero__enquiry-fields">
            <label>
              <span>YOUR NAME</span>
              <input ref={nameInputRef} name="name" type="text" autoComplete="name" required tabIndex={isEnquiryOpen ? 0 : -1} />
            </label>
            <label>
              <span>YOUR PHONE</span>
              <input name="phone" type="tel" autoComplete="tel" required tabIndex={isEnquiryOpen ? 0 : -1} />
            </label>
          </div>

          <button
            className="second-hero__enquiry-submit"
            type="submit"
            aria-label="Send project enquiry"
            tabIndex={isEnquiryOpen ? 0 : -1}
          >
            <svg aria-hidden="true" viewBox="0 0 78 34">
              <path d="M1 17h72M57 1l16 16-16 16" />
            </svg>
          </button>
        </form>
      </aside>
    </section>
  );
}
