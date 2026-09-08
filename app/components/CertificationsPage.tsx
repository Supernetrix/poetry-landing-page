import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import "./CertificationsPage.css";

export type Certification = {
  _id: string;
  name?: string;
  subtitle?: string;
  year?: string;
  image?: SanityImageSource;
};

function imageSrc(cert: Certification): string | null {
  if (cert.image) {
    try {
      const url = urlFor(cert.image).width(1800).auto("format").url();
      if (typeof url === "string" && url.length > 0) return url;
    } catch {
      /* fall through */
    }
  }
  if (/igbc/i.test(cert.name ?? "")) return "/igbc-membership-certificate.png";
  return null;
}

function heading(cert: Certification): string {
  if (/igbc/i.test(cert.name ?? "")) return "IGBC Certification";
  return cert.name || "Certificate";
}

export default function CertificationsPage({ certificates }: { certificates: Certification[] }) {
  const items = certificates
    .map((cert) => {
      const src = imageSrc(cert);
      if (!src) return null;
      return { ...cert, src, title: heading(cert) };
    })
    .filter((item): item is Certification & { src: string; title: string } => item !== null)
    .sort((a, b) => Number(/igbc/i.test(b.title)) - Number(/igbc/i.test(a.title)));

  const shown =
    items.length > 0
      ? items
      : [
          {
            _id: "igbc",
            src: "/igbc-membership-certificate.png",
            title: "IGBC Certification",
          },
        ];

  return (
    <article className="certs-page">
      <header className="certs-page__intro">
        <h1>Certifications</h1>
        <span className="certs-page__rule" aria-hidden="true" />
      </header>

      {shown.map((cert) => (
        <section key={cert._id} className="certs-block">
          <h2>{cert.title}</h2>
          <span className="certs-block__accent" aria-hidden="true" />
          <figure className="certs-block__frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cert.src} alt={cert.title} />
          </figure>
        </section>
      ))}
    </article>
  );
}
