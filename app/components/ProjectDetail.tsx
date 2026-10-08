"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import "./ProjectDetail.css";
import ProjectFloorPlansRequest from "./ProjectFloorPlansRequest";

export type ProjectDetailData = {
  name: string;
  intro?: string;
  note?: string;
  image?: SanityImageSource;
  sketch?: SanityImageSource;
  specs?: {
    plot?: string;
    dimensions?: string;
    bhk?: string;
    facing?: string;
    solar?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
  highlightsTitle?: string;
  highlights?: Array<{ title?: string; body?: string } | null> | null;
  highlightsImage?: SanityImageSource;
  craftTitle?: string;
  craftBody?: string;
  craftImage?: SanityImageSource;
  galleryFeatured?: SanityImageSource;
  gallery?: Array<(SanityImageSource & { _key?: string; caption?: string }) | null> | null;
  tourTitle?: string;
  tourVideoUrl?: string;
};

function imageUrl(source?: SanityImageSource, width = 1800): string | null {
  if (!source) return null;
  try {
    const url = urlFor(source).width(width).auto("format").url();
    return typeof url === "string" && url.length > 0 ? url : null;
  } catch {
    return null;
  }
}

function youtubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
}

const STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  completed: "Completed",
};

function specRows(specs?: ProjectDetailData["specs"]) {
  if (!specs) return [];
  return [
    ["PLOT", specs.plot],
    ["DIM.", specs.dimensions],
    ["BHK", specs.bhk],
    ["FACE", specs.facing],
    ["SOLAR", specs.solar],
    ["STATUS", specs.status ? STATUS_LABEL[specs.status] ?? specs.status : undefined],
    ["START", specs.startDate],
    ["END", specs.endDate],
  ].filter((row): row is [string, string] => Boolean(row[1]));
}

function galleryUrls(project: ProjectDetailData): string[] {
  const urls: string[] = [];
  const featured = imageUrl(project.galleryFeatured);
  if (featured) urls.push(featured);
  for (const item of project.gallery ?? []) {
    if (!item) continue;
    const url = imageUrl(item);
    if (url && !urls.includes(url)) urls.push(url);
  }
  if (urls.length === 0) {
    const hero = imageUrl(project.image);
    if (hero) urls.push(hero);
  }
  return urls;
}

export default function ProjectDetail({ project }: { project: ProjectDetailData }) {
  const intro = project.intro || project.note;
  const sketchSrc = imageUrl(project.sketch) ?? imageUrl(project.image);
  const specs = specRows(project.specs);
  const highlights = (project.highlights ?? []).filter((item) => item?.title);
  const highlightsImage = imageUrl(project.highlightsImage);
  const craftImage = imageUrl(project.craftImage);
  const craftParagraphs = (project.craftBody ?? "")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  const photos = galleryUrls(project);
  const chunks: string[][] = [];
  if (photos.length > 0) {
    chunks.push(photos.slice(0, 5));
    for (let i = 5; i < photos.length; i += 8) {
      chunks.push(photos.slice(i, i + 8));
    }
  }

  const [currentChunk, setCurrentChunk] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tourId = youtubeId(project.tourVideoUrl);

  const prevChunk = useCallback(() => {
    if (chunks.length < 2) return;
    setCurrentChunk((prev) => (prev - 1 + chunks.length) % chunks.length);
  }, [chunks.length]);

  const nextChunk = useCallback(() => {
    if (chunks.length < 2) return;
    setCurrentChunk((prev) => (prev + 1) % chunks.length);
  }, [chunks.length]);

  const prevLightbox = useCallback(() => {
    if (photos.length < 2) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const nextLightbox = useCallback(() => {
    if (photos.length < 2) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, prevLightbox, nextLightbox]);

  return (
    <article className="project-detail">
      <div className="project-detail__toolbar">
        <Link href="/projects" className="project-detail__back">
          Back to projects
        </Link>
      </div>
      <section className="project-detail__hero">
        <div className="project-detail__sketch">
          {sketchSrc ? (
            <Image src={sketchSrc} alt={`${project.name} sketch`} fill sizes="50vw" className="project-detail__sketch-img" />
          ) : null}
        </div>
        <div className="project-detail__summary">
          <h1>{project.name}</h1>
          {intro ? <p className="project-detail__intro">{intro}</p> : null}
          {specs.length > 0 ? (
            <dl className="project-detail__specs">
              {specs.map(([label, value]) => (
                <div key={label} className="project-detail__spec">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>

      {(highlights.length > 0 || highlightsImage) && (
        <section className="project-detail__band">
          <div className="project-detail__band-copy">
            <h2>{project.highlightsTitle || "Architectural Highlights & Spatial Design"}</h2>
            <ul>
              {highlights.map((item) => (
                <li key={item!.title}>
                  <strong>{item!.title}</strong>
                  {item!.body ? <p>{item!.body}</p> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="project-detail__band-media">
            {highlightsImage ? (
              <Image src={highlightsImage} alt="" fill sizes="50vw" className="project-detail__photo" />
            ) : null}
          </div>
        </section>
      )}

      {(craftParagraphs.length > 0 || craftImage) && (
        <section className="project-detail__band project-detail__band--flip">
          <div className="project-detail__band-media">
            {craftImage ? (
              <Image src={craftImage} alt="" fill sizes="50vw" className="project-detail__photo" />
            ) : null}
          </div>
          <div className="project-detail__band-copy">
            <h2>{project.craftTitle || "Craftsmanship & Quality"}</h2>
            {craftParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <ProjectFloorPlansRequest projectName={project.name} inline />
          </div>
        </section>
      )}

      {!craftParagraphs.length && !craftImage ? (
        <ProjectFloorPlansRequest projectName={project.name} />
      ) : null}

      {photos.length > 0 ? (
        <section className="project-detail__gallery" aria-label="Project Image Gallery">
          <div className="project-detail__gallery-header">
            <h2>Image Gallery</h2>
            {chunks.length > 1 && (
              <div className="project-detail__gallery-controls">
                <button
                  type="button"
                  className="project-detail__gallery-arrow"
                  onClick={prevChunk}
                  aria-label="Previous images"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="project-detail__gallery-arrow"
                  onClick={nextChunk}
                  aria-label="Next images"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="project-detail__gallery-slider">
            <div
              className="project-detail__gallery-track"
              style={{ transform: `translateX(-${currentChunk * 100}%)` }}
            >
              {chunks.map((chunk, chunkIndex) => (
                <div 
                  key={chunkIndex} 
                  className={`project-detail__gallery-grid ${chunkIndex > 0 ? "project-detail__gallery-grid--regular" : ""}`}
                >
                  {chunkIndex === 0 ? (
                    <>
                      <div
                        className="project-detail__gallery-feature"
                        onClick={() => setLightboxIndex(0)}
                        role="button"
                        tabIndex={0}
                        aria-label="Open full size image"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setLightboxIndex(0);
                          }
                        }}
                      >
                        <Image
                          src={chunk[0]}
                          alt={`${project.name} gallery feature`}
                          fill
                          sizes="(max-width: 900px) 100vw, 55vw"
                          className="project-detail__photo"
                        />
                      </div>

                      {chunk.length > 1 ? (
                        <div className="project-detail__gallery-thumbs">
                          {chunk.slice(1).map((photoSrc, i) => {
                            const absIndex = 1 + i;
                            return (
                              <div
                                key={`${photoSrc}-${absIndex}`}
                                className="project-detail__gallery-thumb"
                                onClick={() => setLightboxIndex(absIndex)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Open photo ${absIndex + 1}`}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setLightboxIndex(absIndex);
                                  }
                                }}
                              >
                                <Image
                                  src={photoSrc}
                                  alt={`${project.name} gallery thumbnail ${absIndex}`}
                                  fill
                                  sizes="(max-width: 900px) 50vw, 25vw"
                                  className="project-detail__photo"
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    chunk.map((photoSrc, i) => {
                      const absIndex = 5 + (chunkIndex - 1) * 8 + i;
                      return (
                        <div
                          key={`${photoSrc}-${absIndex}`}
                          className="project-detail__gallery-thumb project-detail__gallery-thumb--regular"
                          onClick={() => setLightboxIndex(absIndex)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Open photo ${absIndex + 1}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setLightboxIndex(absIndex);
                            }
                          }}
                        >
                          <Image
                            src={photoSrc}
                            alt={`${project.name} gallery thumbnail ${absIndex}`}
                            fill
                            sizes="(max-width: 900px) 25vw, 25vw"
                            className="project-detail__photo"
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {lightboxIndex !== null && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="project-lightbox__topbar" onClick={(e) => e.stopPropagation()}>
            <span className="project-lightbox__title">
              {project.name} · {String(lightboxIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="project-lightbox__close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image popup"
            >
              ✕
            </button>
          </div>

          <div className="project-lightbox__content" onClick={(e) => e.stopPropagation()}>
            {photos.length > 1 && (
              <button
                type="button"
                className="project-lightbox__nav project-lightbox__nav--prev"
                onClick={prevLightbox}
                aria-label="Previous photo"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div className="project-lightbox__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[lightboxIndex]}
                alt={`${project.name} photo ${lightboxIndex + 1}`}
                className="project-lightbox__img"
              />
            </div>

            {photos.length > 1 && (
              <button
                type="button"
                className="project-lightbox__nav project-lightbox__nav--next"
                onClick={nextLightbox}
                aria-label="Next photo"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {tourId ? (
        <section className="project-detail__tour">
          <h2>{project.tourTitle || "Home Tour"}</h2>
          <div className="project-detail__video">
            <iframe
              src={`https://www.youtube.com/embed/${tourId}`}
              title={project.tourTitle || `${project.name} home tour`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}
    </article>
  );
}
