import HeroSection from "./components/HeroSection";
import StatsSnapshot from "./components/StatsSnapshot";
import ConceptToReality from "./components/ConceptToReality";
import QuoteSplit from "./components/QuoteSplit";
import EditorialPortfolioSection from "./components/EditorialPortfolioSection";
import AboutSection from "./components/AboutSection";
import JournalSection from "./components/JournalSection";
import CareersSection from "./components/CareersSection";
import FooterSection from "./components/FooterSection";
import { client } from "@/sanity/lib/client";
import {
  PROJECTS_QUERY,
  ARTICLES_QUERY,
  JOBS_QUERY,
  CERTIFICATES_QUERY,
} from "@/sanity/lib/queries";

const fetchOptions = { next: { revalidate: 60 } };

export default async function Home() {
  const [projects, articles, jobs, certificates] = await Promise.all([
    client.fetch(PROJECTS_QUERY, {}, fetchOptions),
    client.fetch(ARTICLES_QUERY, {}, fetchOptions),
    client.fetch(JOBS_QUERY, {}, fetchOptions),
    client.fetch(CERTIFICATES_QUERY, {}, fetchOptions),
  ]);

  return (
    <main>
      <HeroSection />
      <StatsSnapshot />
      <ConceptToReality />
      <QuoteSplit
        imageSide="right"
        imageSrc="/greener-homes.png"
        imageAlt="Greener home with brick facade and integrated planting"
        lines={["Building", "Greener Homes", "For a Better", "Future"]}
      />
      <QuoteSplit
        imageSide="left"
        imageSrc="/spaces.jpg"
        imageAlt="Sunlit verandah overlooking a garden"
        lines={["Spaces That", "Uplift Your", "Lifestyle"]}
      />
      <QuoteSplit
        imageSide="right"
        imageSrc="/generations.jpg"
        imageAlt="Balcony with planter boxes and hanging greenery"
        lines={["Designs That", "Last For", "Generations"]}
      />
      <QuoteSplit
        imageSide="left"
        imageSrc="/grandeur.jpg"
        imageAlt="Modern villa with terracotta screens and rooftop solar"
        lines={["The Shape", "Of Modern", "Granduer"]}
      />
      <QuoteSplit
        imageSide="right"
        imageSrc="/meticulous.png"
        imageAlt="Annotated architectural elevation of a residence"
        lines={["Meticulous", "Planning for", "Every Project"]}
      />
      <EditorialPortfolioSection projects={projects.slice(0, 6)} />
      <AboutSection certificates={certificates} />
      <JournalSection articles={articles} />
      <CareersSection roles={jobs} />
      <FooterSection />
    </main>
  );
}
