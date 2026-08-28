import QuoteType from "./QuoteType";
import "./ConceptToReality.css";

export default function ConceptToReality() {
  return (
    <section className="concept-spread" aria-label="From concept to reality">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="concept-spread__img concept-spread__img--left"
        src="/IMG_0692-2.jpg"
        alt="Concept view of a Poetry home"
      />

      <div className="concept-spread__copy">
        <QuoteType lines={["From", "Concept", "To Reality"]} />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="concept-spread__img concept-spread__img--right"
        src="/IMG_0276.jpg"
        alt="Completed Poetry home entrance"
      />
    </section>
  );
}
