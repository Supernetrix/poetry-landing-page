"use client";

import { type FormEvent } from "react";
import { buildCareerMailto } from "../lib/careers";
import "./CareersPage.css";

export default function CareersPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = buildCareerMailto(new FormData(event.currentTarget));
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

            <p className="careers-page__legal" id="careers-email-note">
              This opens your email app with your application details. Attach your résumé there before sending it to hr@poetryconstructions.com.
            </p>

            <button type="submit" className="careers-form__submit" aria-describedby="careers-email-note">
              Continue in email <span aria-hidden="true">→</span>
            </button>
          </form>

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
