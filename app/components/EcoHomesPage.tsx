import Image from "next/image";
import Link from "next/link";
import "./EcoHomesPage.css";

export default function EcoHomesPage() {
  return (
    <main className="eco-homes-page">
      <div className="eco-homes__container">
        {/* Architectural Graphic Artwork */}
        <div className="eco-homes__artwork-wrap">
          <Image
            src="/eco-homes.png"
            alt="Eco Homes Architecture"
            width={1677}
            height={938}
            priority
            className="eco-homes__artwork"
          />
        </div>

        {/* Text Content */}
        <div className="eco-homes__content">
          <span className="eco-homes__eyebrow">ECO HOMES</span>
          <h1 className="eco-homes__title">Page Under Construction</h1>
          <p className="eco-homes__subtitle">
            We&apos;re currently working on this page. Please check back soon.
          </p>

          <Link href="/" className="eco-homes__btn" aria-label="Back to homepage">
            <svg
              className="eco-homes__btn-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>BACK TO HOMEPAGE</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
