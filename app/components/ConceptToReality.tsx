import ConceptQuote from "./ConceptQuote";
import "./ConceptToReality.css";

export default function ConceptToReality() {
  return (
    <section className="concept-spread" aria-label="From concept to reality">
      <div className="concept-spread__panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/from-ideas-to-reality-1.png"
          alt="Working drawing of a Poetry entrance"
        />
      </div>

      <ConceptQuote />

      <div className="concept-spread__panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/from-ideas-to-reality-2.png"
          alt="Completed Poetry home entrance"
        />
      </div>
    </section>
  );
}
