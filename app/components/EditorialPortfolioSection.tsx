"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

type GalleryImage = SanityImageSource & {
  _key: string;
  _type: "image";
};

type GalleryVideo = {
  _key: string;
  _type: "youtubeVideo";
  url: string;
  caption?: string;
};

interface PortfolioProject {
  _id: string;
  name: string;
  location?: string;
  year?: string;
  image?: SanityImageSource;
  gallery?: Array<GalleryImage | GalleryVideo>;
}

interface ProjectImage {
  key: string;
  name: string;
  location: string;
  url: string;
}

const PRINCIPLES = [
  {
    quote:
      "We begin with the way you want to live, then shape the architecture around it. Every decision is explained before it becomes part of the build.",
    title: "Design practice",
    source: "Poetry Constructions",
  },
  {
    quote:
      "Design and execution stay under one roof, giving every project one accountable team from the first brief through final handover.",
    title: "Delivery practice",
    source: "Poetry Constructions",
  },
];

function imageUrl(source?: SanityImageSource): string | null {
  if (!source) return null;

  try {
    const url = urlFor(source).width(1800).auto("format").url();
    return typeof url === "string" && url.length > 0 ? url : null;
  } catch {
    return null;
  }
}

function collectProjectImages(projects: PortfolioProject[]): ProjectImage[] {
  const collected: ProjectImage[] = [];

  projects.forEach((project) => {
    const heroUrl = imageUrl(project.image);
    if (heroUrl) {
      collected.push({
        key: `${project._id}-hero`,
        name: project.name,
        location: project.location ?? project.year ?? "",
        url: heroUrl,
      });
    }

    project.gallery?.forEach((item) => {
      if (item._type !== "image") return;
      const galleryUrl = imageUrl(item);
      if (!galleryUrl) return;

      collected.push({
        key: `${project._id}-${item._key}`,
        name: project.name,
        location: project.location ?? project.year ?? "",
        url: galleryUrl,
      });
    });
  });

  return collected;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 18" className={direction === "left" ? "editorial-portfolio__arrow--left" : undefined}>
      <path d="M1 9h33M26 1l8 8-8 8" />
    </svg>
  );
}

export default function EditorialPortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  const projectImages = useMemo(() => collectProjectImages(projects), [projects]);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryMotion, setGalleryMotion] = useState({ direction: "next", sequence: 0 });

  const visibleImages = projectImages.length
    ? [0, 1, 2].map((step) => projectImages[(activeImage + step) % projectImages.length])
    : [];

  const moveGallery = (direction: number) => {
    if (projectImages.length < 2) return;
    setGalleryMotion((current) => ({
      direction: direction > 0 ? "next" : "previous",
      sequence: current.sequence + 1,
    }));
    setActiveImage((current) => (current + direction + projectImages.length) % projectImages.length);
  };

  const handleEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nI would like to discuss a project with Poetry Constructions.`);
    window.location.href = `mailto:hello@poetryconstructions.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="editorial-portfolio" aria-labelledby="editorial-portfolio-title">
      <div className="editorial-portfolio__heading-row">
        <h2 id="editorial-portfolio-title">PORTFOLIO</h2>
        <div className="editorial-portfolio__controls" aria-label="Browse project images">
          <button type="button" onClick={() => moveGallery(-1)} aria-label="Previous project image" disabled={projectImages.length < 2}>
            <ArrowIcon direction="left" />
          </button>
          <button type="button" onClick={() => moveGallery(1)} aria-label="Next project image" disabled={projectImages.length < 2}>
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div
        key={galleryMotion.sequence}
        className={`editorial-portfolio__gallery editorial-portfolio__gallery--${galleryMotion.direction}`}
        aria-live="polite"
      >
        {visibleImages.map((image, index) => (
          <article key={`${image.key}-${index}`} className={`editorial-portfolio__project editorial-portfolio__project--${index + 1}`}>
            <div className="editorial-portfolio__project-meta">
              <h3>{image.name}</h3>
              <p>{image.location}</p>
            </div>
            <div className="editorial-portfolio__image-frame">
              <Image
                fill
                src={image.url}
                alt={`${image.name}${image.location ? `, ${image.location}` : ""}`}
                sizes={index === 0 ? "(max-width: 760px) 100vw, 61vw" : "(max-width: 760px) 50vw, 22vw"}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="editorial-portfolio__enquiry">
        <div className="editorial-portfolio__enquiry-title">
          <span>INSPIRE</span>
          <h3>LET&apos;S<br />BRING YOUR<br />VISION TO<br />LIFE</h3>
        </div>

        <div className="editorial-portfolio__enquiry-form-wrap">
          <p>Our architects will help you shape a considered space around how you live, what you value, and what the site makes possible.</p>
          <form onSubmit={handleEnquiry} className="editorial-portfolio__form">
            <label>
              <span>YOUR NAME</span>
              <input name="name" type="text" autoComplete="name" required aria-label="Your name" />
            </label>
            <label>
              <span>YOUR PHONE</span>
              <input name="phone" type="tel" autoComplete="tel" required aria-label="Your phone" />
            </label>
            <button type="submit" aria-label="Start a project enquiry">
              <ArrowIcon direction="right" />
            </button>
          </form>
        </div>
      </div>

      <div className="editorial-portfolio__principles-heading">
        <h3>WHAT GUIDES<br />OUR WORK</h3>
        <div className="editorial-portfolio__controls" aria-hidden="true">
          <span><ArrowIcon direction="left" /></span>
          <span><ArrowIcon direction="right" /></span>
        </div>
      </div>

      <div className="editorial-portfolio__principles">
        {PRINCIPLES.map((principle) => (
          <article key={principle.title}>
            <div className="editorial-portfolio__quote-mark" aria-hidden="true">“</div>
            <div className="editorial-portfolio__principle-copy">
              <blockquote>{principle.quote}</blockquote>
              <p><strong>{principle.title}</strong><span>{principle.source}</span></p>
            </div>
          </article>
        ))}
      </div>

      <div className="editorial-portfolio__portfolio-link">
        <Link href="/estates">VIEW ENTIRE PORTFOLIO <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
