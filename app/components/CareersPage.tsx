"use client";

import { useRef, useState, type FormEvent } from "react";
import "./CareersPage.css";

export default function CareersPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Careers application from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}\n\nResume attached separately if provided.`
    );
    window.location.href = `mailto:careers@poetryconstructions.com?subject=${subject}&body=${body}`;
  };

  return (
    <article className="careers-page">
      <div className="careers-page__layout">
        <div className="careers-page__main">
          <header className="careers-page__hero">
            <div className="careers-page__kicker">
              <span>Careers</span>
              <span className="careers-page__rule careers-page__rule--short" aria-hidden="true" />
            </div>
            <h1>Join us</h1>
          </header>

          <p className="careers-page__motto">Great spaces are built by great people.</p>

          <form className="careers-form" onSubmit={handleSubmit}>
            <div className="careers-form__head">
              <span>Apply now</span>
              <span className="careers-page__rule careers-page__rule--form" aria-hidden="true" />
            </div>

            <label className="careers-field">
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>

            <label className="careers-field">
              <span>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>

            <label className="careers-field">
              <span>
                Email<span className="careers-field__req">*</span>
              </span>
              <input name="email" type="email" autoComplete="email" required />
            </label>

            <label className="careers-field careers-field--message">
              <span>Message</span>
              <textarea name="message" rows={7} />
            </label>

            <div className="careers-form__upload">
              <button
                type="button"
                className="careers-form__attach"
                onClick={() => fileRef.current?.click()}
              >
                <svg className="careers-form__clip" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M9.5 1.5 4.8 6.2a2.6 2.6 0 0 0 3.7 3.7l5.4-5.4a1.5 1.5 0 0 0-2.1-2.1L6.4 7.8a.5.5 0 1 0 .7.7l5.4-5.4" />
                </svg>
                Attach resume
              </button>
              <span className="careers-form__file">{fileName}</span>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setFileName(file?.name ?? "No file chosen");
                }}
              />
            </div>

            <button type="submit" className="careers-form__submit">
              Submit application <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="careers-page__legal">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </p>
        </div>

        <aside className="careers-page__aside" aria-label="Careers imagery">
          <div className="careers-page__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/spaces.jpg" alt="Sunlit architectural space with garden views" />
            <p className="careers-page__photo-caption">
              Better environments
              <br />
              a brighter tomorrow
              <span className="careers-page__rule careers-page__rule--caption" aria-hidden="true" />
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
