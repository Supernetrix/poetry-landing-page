import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import "./ProjectDetail.css";

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
  return urls.slice(0, 7);
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
  const featuredPhoto = photos[0];
  const thumbPhotos = photos.slice(1, 7);
  const tourId = youtubeId(project.tourVideoUrl);

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
          </div>
        </section>
      )}

      {featuredPhoto ? (
        <section className="project-detail__gallery">
          <h2>Image Gallery</h2>
          <div className="project-detail__gallery-grid">
            <div className="project-detail__gallery-feature">
              <Image src={featuredPhoto} alt="" fill sizes="50vw" className="project-detail__photo" />
            </div>
            {thumbPhotos.length > 0 ? (
              <div className="project-detail__gallery-thumbs">
                {thumbPhotos.map((src) => (
                  <div key={src} className="project-detail__gallery-thumb">
                    <Image src={src} alt="" fill sizes="25vw" className="project-detail__photo" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

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
