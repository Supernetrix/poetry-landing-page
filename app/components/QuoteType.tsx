import "./QuoteType.css";

export default function QuoteType({ lines }: { lines: string[] }) {
  return (
    <p className="quote-type">
      <span className="quote-type__text">
        {lines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    </p>
  );
}
