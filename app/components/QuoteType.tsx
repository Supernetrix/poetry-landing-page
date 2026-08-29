import "./QuoteType.css";

export default function QuoteType({ lines }: { lines: string[] }) {
  return (
    <blockquote className="quote-type">
      <span className="quote-type__grid">
        <span className="quote-type__mark quote-type__mark--open" aria-hidden="true">
          “
        </span>
        <span className="quote-type__copy">
          {lines.map((line, index) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </span>
        <span className="quote-type__mark quote-type__mark--close" aria-hidden="true">
          ”
        </span>
      </span>
    </blockquote>
  );
}
