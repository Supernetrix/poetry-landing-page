import "./ConceptQuote.css";

export default function ConceptQuote() {
  return (
    <div className="quote-panel">
      <span className="quote quote--open" aria-hidden="true">
        “
      </span>
      <h2 className="quote-text">
        <span>From</span>
        <span>Concept</span>
        <span>To Reality</span>
      </h2>
      <span className="quote quote--close" aria-hidden="true">
        ”
      </span>
    </div>
  );
}
