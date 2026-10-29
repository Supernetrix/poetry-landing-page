"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialMediaDialog from "./SocialMediaDialog";
import { GOOGLE_MAPS_URL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_CHANNEL_URL, type GoogleReviews, type InstagramReel, type SocialMedia, type YouTubeVideo } from "../lib/social";
import "./SocialsPage.css";

const STUDIO = [
  { src: "/spaces.jpg", category: "Project", title: "Concept to reality", date: "Mar 12, 2024" },
  { src: "/from-ideas-to-reality-1.png", category: "Process", title: "Material exploration", date: "Feb 04, 2024" },
  { src: "/generations.jpg", category: "People", title: "A day on site", date: "Jan 21, 2024" },
  { src: "/grandeur.jpg", category: "Ideas", title: "Light as a material", date: "Dec 08, 2023" },
] as const;

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="social-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">{"★".repeat(filled)}{"☆".repeat(5 - filled)}</span>
    </span>
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

export default function SocialsPage({ reels, videos, reviews }: { reels: InstagramReel[]; videos: YouTubeVideo[]; reviews: GoogleReviews | null }) {
  const featured = videos[0];
  const sideVideos = videos.slice(1);
  const [media, setMedia] = useState<SocialMedia | null>(null);
  const [activeItem, setActiveItem] = useState<(typeof STUDIO)[number] | null>(null);
  const reviewsUrl = reviews?.url ?? GOOGLE_MAPS_URL;

  const playYouTube = (video: YouTubeVideo) => setMedia({
    kind: "youtube",
    title: video.title,
    src: `https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0&origin=${encodeURIComponent(window.location.origin)}`,
    href: `https://www.youtube.com/watch?v=${video.id}`,
    portrait: video.isShort,
  });

  const playReel = (reel: InstagramReel) => {
    const src = reel.videoUrl || reel.embedUrl;
    if (!src) return;
    setMedia({
      kind: reel.videoUrl ? "video" : "instagram",
      title: reel.title,
      src,
      href: reel.embedUrl ? reel.embedUrl.replace(/embed\/$/, "") : null,
      poster: reel.thumbnail,
      portrait: true,
    });
  };

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
        <Band label="On Instagram" href={INSTAGRAM_URL} action="Follow us" extra="@poetry_constructions" />
        <h2 id="social-ig-title" className="sr-only">
          On Instagram
        </h2>
        {reels.length ? <ul className="social-ig">
          {reels.map((reel) => (
            <li key={reel.id} className={`social-ig__item social-ig__item--${reel.layout}`}>
              <button type="button" className="social-reel" onClick={() => playReel(reel)} aria-label={`Play ${reel.title}`}>
                {reel.thumbnail ? <Image src={reel.thumbnail} alt="" width={640} height={800} sizes="(max-width: 700px) 100vw, 33vw" /> : <span className="social-reel__cover" />}
                <span className="social-yt__play is-small" aria-hidden="true" />
                <span className="social-ig__caption">
                  <span>{reel.caption}</span>
                  <span className="social-ig__caption-rule" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul> : <p className="social-empty">Follow our Instagram for the latest reels, site visits and finished homes.</p>}
      </section>

      <section className="socials-block" aria-labelledby="social-yt-title">
        <Band label="Watch Poetry" href={YOUTUBE_CHANNEL_URL} action="Visit our YouTube" />
        <h2 id="social-yt-title" className="sr-only">
          Watch Poetry
        </h2>
        {featured ? <div className="social-yt">
          <button type="button" className="social-yt__feature" onClick={() => playYouTube(featured)} aria-label={`Play ${featured.title}`}>
            <Image src={featured.thumbnail} alt="" fill loading="eager" sizes="(max-width: 1000px) 100vw, 60vw" />
            <span className="social-yt__play" aria-hidden="true" />
            <span className="social-yt__copy">
              <strong>{featured.title}</strong>
              <em>{featured.isShort ? "YouTube Short" : "Latest from our channel"}</em>
            </span>
          </button>
          <div className="social-yt__side">
            {sideVideos.map((video) => (
              <button type="button" key={video.id} className="social-yt__clip" onClick={() => playYouTube(video)} aria-label={`Play ${video.title}`}>
                <Image src={video.thumbnail} alt="" fill loading="eager" sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 35vw" />
                <span className="social-yt__play is-small" aria-hidden="true" />
                <span className="social-yt__copy">
                  <strong>{video.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </div> : <p className="social-empty">Our latest films are available on the Poetry YouTube channel.</p>}
      </section>

      <section className="socials-block" aria-labelledby="social-reviews-title">
        <Band label="What our clients say" href={reviewsUrl} action="Read all reviews" />
        <h2 id="social-reviews-title" className="sr-only">
          What our clients say
        </h2>
        {reviews ? <div className="social-reviews">
          <div className="social-reviews__score">
            {reviews.rating !== null ? <p className="social-reviews__rating">
              <span className="social-reviews__value">{reviews.rating.toFixed(1)}</span>
              <span className="social-reviews__outof">/ 5</span>
            </p> : null}
            {reviews.rating !== null ? <Stars rating={reviews.rating} /> : null}
            <p className="social-reviews__label">Google Reviews</p>
            {reviews.count !== null ? <p className="social-reviews__tagline">{reviews.count} reviews</p> : null}
            <p className="social-reviews__tagline">Reviews ordered by relevance.</p>
            <a className="social-google-attribution" href={reviewsUrl} translate="no">Google Maps</a>
          </div>
          {reviews.reviews.map((review) => (
            <blockquote key={review.id} className="social-review">
              <Stars rating={review.rating} />
              <p>“{review.text}”</p>
              <footer>
                {review.authorPhoto ? <Image className="social-review__avatar" src={review.authorPhoto} alt="" width={36} height={36} unoptimized /> : null}
                <cite>{review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">{review.author}</a> : review.author}</cite>
                <span>{review.relativeTime}</span>
                <a href={review.url || reviewsUrl} target="_blank" rel="noopener noreferrer">Read on Google Maps ↗</a>
              </footer>
            </blockquote>
          ))}
        </div> : <p className="social-empty">Read our clients’ experiences on Google Maps.</p>}
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
          <Link href={INSTAGRAM_URL}>Instagram</Link>
          <Link href={YOUTUBE_CHANNEL_URL}>YouTube</Link>
          <Link href={reviewsUrl}>Google</Link>
          <Link href={LINKEDIN_URL}>LinkedIn</Link>
        </nav>
      </footer>
      {media ? <SocialMediaDialog media={media} onClose={() => setMedia(null)} /> : null}
    </article>
  );
}
