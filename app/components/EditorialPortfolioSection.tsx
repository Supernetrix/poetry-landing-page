"use client";

import Image from "next/image";
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
    </section>
  );
}
