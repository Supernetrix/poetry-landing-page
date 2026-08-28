import QuoteType from "./QuoteType";
import "./QuoteSplit.css";

type QuoteSplitProps = {
  imageSrc: string;
  imageAlt: string;
  lines: string[];
  imageSide?: "left" | "right";
};

export default function QuoteSplit({
  imageSrc,
  imageAlt,
  lines,
  imageSide = "right",
}: QuoteSplitProps) {
  return (
    <section
      className={`quote-split quote-split--image-${imageSide}`}
      aria-label={lines.join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="quote-split__img" src={imageSrc} alt={imageAlt} />
      <div className="quote-split__copy">
        <QuoteType lines={lines} />
      </div>
    </section>
  );
}
