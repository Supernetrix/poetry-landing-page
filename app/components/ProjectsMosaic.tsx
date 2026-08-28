import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import "./ProjectsMosaic.css";

export type MosaicProject = {
  _id: string;
  name: string;
  slug?: string;
  location?: string;
  year?: string;
  scale?: string;
  image?: SanityImageSource;
};

const SPANS = [
  "portrait",
  "portrait",
  "wide",
  "portrait",
  "square",
  "tall",
  "wide",
  "portrait",
  "square",
  "portrait",
  "tall",
  "wide",
] as const;

function imageUrl(source?: SanityImageSource): string | null {
  if (!source) return null;
  try {
    const url = urlFor(source).width(1600).auto("format").url();
    return typeof url === "string" && url.length > 0 ? url : null;
  } catch {
    return null;
  }
}

function overlay(project: MosaicProject): { primary: string; secondary: string } {
  const primary = project.scale
    ? `Plot: ${project.scale}`
    : project.name;
  const secondary = [project.location, project.year].filter(Boolean).join("  ·  ");
  return { primary, secondary };
}

export default function ProjectsMosaic({ projects }: { projects: MosaicProject[] }) {
  return (
    <section className="projects-mosaic" aria-label="Projects">
      <h1 className="projects-mosaic__title">Projects</h1>

      {projects.length === 0 ? (
        <p className="projects-mosaic__empty">No projects published yet.</p>
      ) : (
        <div className="projects-mosaic__grid">
          {projects.map((project, index) => {
            const src = imageUrl(project.image);
            const span = SPANS[index % SPANS.length];
            const meta = overlay(project);
            const corner = index % 3 === 0 ? "tl" : index % 3 === 1 ? "bl" : "br";

            const cardClass = `projects-mosaic__card projects-mosaic__card--${span} projects-mosaic__card--${corner}`;
            const body = (
              <>
                {src ? (
                  <Image
                    src={src}
                    alt={project.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className="projects-mosaic__img"
                  />
                ) : (
                  <div className="projects-mosaic__ph" />
                )}
                <div className="projects-mosaic__meta">
                  <span>{meta.primary}</span>
                  {meta.secondary ? <span>{meta.secondary}</span> : null}
                </div>
              </>
            );

            return project.slug ? (
              <Link key={project._id} href={`/projects/${project.slug}`} className={cardClass}>
                {body}
              </Link>
            ) : (
              <article key={project._id} className={cardClass}>
                {body}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
