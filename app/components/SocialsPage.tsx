"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./SocialsPage.css";

const INSTAGRAM = [
  { src: "/spaces.jpg", caption: "Homes that breathe", layout: "tall" },
  { src: "/greener-homes.png", caption: "Built for a better tomorrow", layout: "banner" },
  { src: "/generations.jpg", caption: "Where light lives", layout: "box" },
  { src: "/grandeur.jpg", caption: "Design Deeper\nLive Higher", layout: "top" },
  { src: "/from-ideas-to-reality-2.png", caption: "Natural Materials Last Longer", layout: "split" },
] as const;

const VIDEOS = [
  {
    src: "/greener-homes.png",
    title: "A home in harmony with nature",
    meta: "Full project walkthrough",
    duration: "12:46",
    featured: true,
  },
  {
    src: "/from-ideas-to-reality-1.png",
    title: "The story behind Poetry",
    meta: "Studio conversation",
    duration: "8:15",
    featured: false,
  },
  {
    src: "/grandeur.jpg",
    title: "From concept to construction",
    meta: "Process film",
    duration: "10:24",
    featured: false,
  },
] as const;

const REVIEWS = [
  {
    quote: "They held the design and the build in one conversation. We always knew what was happening, and why.",
    name: "Arjun Mehta",
    role: "Homeowner",
  },
  {
    quote: "The house feels like us — quiet, practical, and considered. Nothing was added for show.",
    name: "Nalini Rao",
    role: "Homeowner",
  },
  {
    quote: "Timelines held. Materials were what was promised. That is rarer than it should be.",
    name: "Vikram Shah",
    role: "Homeowner",
  },
] as const;

const STUDIO = [
  { src: "/spaces.jpg", category: "Project", title: "Concept to reality", date: "Mar 12, 2024" },
  { src: "/from-ideas-to-reality-1.png", category: "Process", title: "Material exploration", date: "Feb 04, 2024" },
  { src: "/generations.jpg", category: "People", title: "A day on site", date: "Jan 21, 2024" },
  { src: "/grandeur.jpg", category: "Ideas", title: "Light as a material", date: "Dec 08, 2023" },
] as const;

function Stars() {
  return (
    <span className="social-stars" aria-hidden="true">
      ★★★★★
    </span>
  );
}

function GoogleMark() {
  return (
    <svg className="social-g" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.8c2.3-2.1 3.6-5.2 3.6-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.8-3c-1.1.7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.4 7.4 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.2-.7-.4-1.4-.4-2.3s.1-1.6.4-2.3V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.1 15.2 0 12 0 7.4 0 3.3 2.6 1.3 6.6l4 3.1c.9-2.9 3.6-5 6.7-5z" />
    </svg>
  );
}

function Band({
  label,
  href,
  action,
  extra,
  onClick,
}: {
  label: string;
  href: string;
  action: string;
  extra?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="social-band">
      <div className="social-band__label">
        <span>{label}</span>
        <span className="social-band__rule" aria-hidden="true" />
      </div>
      <div className="social-band__meta">
        {extra ? <span>{extra}</span> : null}
        <Link href={href} className="social-band__action" onClick={onClick}>
          <strong>{action}</strong> <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function SocialsPage() {
  const featured = VIDEOS[0];
  const sideVideos = VIDEOS.slice(1);
  const [activeItem, setActiveItem] = useState<(typeof STUDIO)[number] | null>(null);

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeItem]);

  return (
    <article className="socials-page">
      <header className="socials-hero">
        <div className="socials-hero__kicker">
          <span>Social</span>
          <span className="socials-hero__rule" aria-hidden="true" />
        </div>
        <h1>
          <span>Follow</span>
          <span>the journey.</span>
        </h1>
        <p className="socials-hero__lead">Projects, ideas, stories and moments from Poetry.</p>
      </header>

      <section className="socials-block" aria-labelledby="social-ig-title">
        <Band label="On Instagram" href="#" action="Follow us" extra="@poetry.designs" />
        <h2 id="social-ig-title" className="sr-only">
          On Instagram
        </h2>
        <ul className="social-ig">
          {INSTAGRAM.map((post) => (
            <li key={post.caption} className={`social-ig__item social-ig__item--${post.layout}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.src} alt="" />
              <div className="social-ig__caption">
                {post.caption.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span className="social-ig__caption-rule" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="socials-block" aria-labelledby="social-yt-title">
        <Band label="Watch Poetry" href="#" action="Visit our YouTube" />
        <h2 id="social-yt-title" className="sr-only">
          Watch Poetry
        </h2>
        <div className="social-yt">
          <a href="#" className="social-yt__feature">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.src} alt="" />
            <span className="social-yt__play" aria-hidden="true" />
            <span className="social-yt__copy">
              <strong>{featured.title}</strong>
              <em>{featured.meta}</em>
            </span>
            <span className="social-yt__time">{featured.duration}</span>
          </a>
          <div className="social-yt__side">
            {sideVideos.map((video) => (
              <a key={video.title} href="#" className="social-yt__clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.src} alt="" />
                <span className="social-yt__play is-small" aria-hidden="true" />
                <span className="social-yt__copy">
                  <strong>{video.title}</strong>
                </span>
                <span className="social-yt__time">{video.duration}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="socials-block" aria-labelledby="social-reviews-title">
        <Band label="What our clients say" href="#" action="Read all reviews" />
        <h2 id="social-reviews-title" className="sr-only">
          What our clients say
        </h2>
        <div className="social-reviews">
          <div className="social-reviews__score">
            <p className="social-reviews__rating">
              <span className="social-reviews__value">4.8</span>
              <span className="social-reviews__outof">/ 5</span>
            </p>
            <Stars />
            <p className="social-reviews__label">Google Reviews</p>
            <p className="social-reviews__tagline">
              <span>Real people.</span>
              <span>Real stories.</span>
            </p>
          </div>
          {REVIEWS.map((review) => (
            <blockquote key={review.name} className="social-review">
              <Stars />
              <p>“{review.quote}”</p>
              <footer>
                <cite>— {review.name}</cite>
                <span>{review.role}</span>
              </footer>
              <GoogleMark />
            </blockquote>
          ))}
        </div>
      </section>

      <section className="socials-block" aria-labelledby="social-studio-title">
        <Band
          label="From the studio"
          href="#studio"
          action="More updates"
          onClick={(e) => {
            e.preventDefault();
            setActiveItem(STUDIO[0]);
          }}
        />
        <h2 id="social-studio-title" className="sr-only">
          From the studio
        </h2>
        <ul className="social-studio">
          {STUDIO.map((item) => (
            <li
              key={item.title}
              className={`social-studio__item ${activeItem?.title === item.title ? "is-selected" : ""}`}
              onClick={() => setActiveItem(item)}
              tabIndex={0}
              role="button"
              aria-label={`${item.title} - Under Development`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
            >
              <div className="social-studio__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.title} />
                <div className="social-studio__overlay">
                  <span className="social-studio__dev-text">UNDER DEVELOPMENT</span>
                </div>
              </div>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <time>{item.date}</time>
            </li>
          ))}
        </ul>
      </section>

      {activeItem && (
        <div
          className="social-studio-modal__backdrop"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="studio-modal-title"
        >
          <div
            className="social-studio-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="social-studio-modal__close"
              onClick={() => setActiveItem(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="social-studio-modal__header">
              <div className="social-studio-modal__status">
                <span>UNDER DEVELOPMENT</span>
              </div>
              <span className="social-studio-modal__category">{activeItem.category}</span>
            </div>

            <div className="social-studio-modal__image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeItem.src} alt={activeItem.title} />
              <div className="social-studio-modal__stamp">
                <span>IN PROGRESS</span>
              </div>
            </div>

            <div className="social-studio-modal__body">
              <h3 id="studio-modal-title">{activeItem.title}</h3>
              <time>{activeItem.date}</time>
              <p>
                This studio journal story is currently under development. Our team is curating project essays, on-site photography, and material explorations for this feature.
              </p>
              <div className="social-studio-modal__actions">
                <button
                  type="button"
                  className="social-studio-modal__btn"
                  onClick={() => setActiveItem(null)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="socials-close">
        <div>
          <span>See more</span>
          <p>of Poetry.</p>
        </div>
        <span className="socials-close__rule" aria-hidden="true" />
        <nav aria-label="Social links">
          <Link href="#">Instagram</Link>
          <Link href="#">YouTube</Link>
          <Link href="#">Google</Link>
          <Link href="#">LinkedIn</Link>
        </nav>
      </footer>
    </article>
  );
}
