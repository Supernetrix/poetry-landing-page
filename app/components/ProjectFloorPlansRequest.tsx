"use client";

import { useEffect, useId, useState, type FormEvent } from "react";

const ENQUIRY_EMAIL = "hello@poetryconstructions.com";

export default function ProjectFloorPlansRequest({
  projectName,
  inline = false,
}: {
  projectName: string;
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Floor plans request — ${projectName}`);
    const body = encodeURIComponent(
      `Project: ${projectName}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\n${message}`
    );
    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  const trigger = (
    <button type="button" className="project-detail__floor-plans-btn" onClick={() => setOpen(true)}>
      <span className="project-detail__floor-plans-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M8 2v9M4.2 7.8 8 11.6l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      Download floor plans
    </button>
  );

  return (
    <>
      {inline ? (
        <div className="project-detail__floor-plans-inline">{trigger}</div>
      ) : (
        <div className="project-detail__floor-plans-bar">{trigger}</div>
      )}

      {open ? (
        <div className="project-detail__modal" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="project-detail__modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="project-detail__modal-close" aria-label="Close" onClick={() => setOpen(false)}>
              ×
            </button>
            <h2 id={titleId}>Request floor plans</h2>
            <p className="project-detail__modal-lead">
              Share your details and we&apos;ll send floor plans for <strong>{projectName}</strong>.
            </p>
            <form className="project-detail__modal-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label>
                <span>Company / organisation</span>
                <input name="company" type="text" autoComplete="organization" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={4} placeholder="Any notes about your plot or requirements" />
              </label>
              <button type="submit" className="project-detail__modal-submit">
                Submit request
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
