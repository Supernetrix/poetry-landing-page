import Link from "next/link";
import ServicesStepper from "./ServicesStepper";
import "./ServicesPage.css";

const SERVICES = [
  {
    num: "01",
    title: "Turn-Key Solutions",
    body: "From concept to completion, we bring together design, approvals, construction and execution under one coordinated process.",
    image: "/greener-homes.png",
    alt: "Completed Poetry home with brick, timber and planting",
  },
  {
    num: "02",
    title: "Architectural Planning & Design",
    body: "Bespoke architectural solutions shaped around the site, lifestyle, functionality and aspirations of each client.",
    image: "/from-ideas-to-reality-1.png",
    alt: "Working drawing of a Poetry entrance",
  },
  {
    num: "03",
    title: "Project Management Solutions",
    body: "Coordinating every stage of execution to maintain quality, timelines, costs and the original design intent.",
    image: "/grandeur.jpg",
    alt: "Residence under delivery with coordinated site work",
  },
] as const;

export default function ServicesPage() {
  return (
    <article className="services-page">
      <header className="services-page__intro">
        <h1>Our Services</h1>
        <span className="services-page__rule" aria-hidden="true" />
      </header>

      <ul className="services-page__grid">
        {SERVICES.map((service) => (
          <li key={service.num} className="services-card">
            <div className="services-card__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.image} alt={service.alt} />
            </div>
            <div className="services-card__index">
              <span>{service.num}</span>
              <span className="services-card__index-rule" aria-hidden="true" />
            </div>
            <h2>{service.title}</h2>
            <p>{service.body}</p>
            <Link href="mailto:hello@poetryconstructions.com" className="services-card__more">
              Know more
              <span className="services-card__arrow" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <section className="services-page__vision" aria-labelledby="services-vision-title">
        <h2 id="services-vision-title">One vision. Three expertises.</h2>
        <ServicesStepper />
      </section>
    </article>
  );
}
