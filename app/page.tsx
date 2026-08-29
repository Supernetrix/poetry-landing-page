import HeroSection from "./components/HeroSection";
import StatsSnapshot from "./components/StatsSnapshot";
import ConceptToReality from "./components/ConceptToReality";
import QuoteSplit from "./components/QuoteSplit";
import WhatWeDo from "./components/WhatWeDo";
import PortfolioGrid from "./components/PortfolioGrid";
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
        imageSide="left"
        imageSrc="/IMG_0248.jpg"
        imageAlt="Poetry home facade"
        lines={["Spaces drawn", "for how you", "live"]}
      />
      <QuoteSplit
        imageSide="right"
        imageSrc="/IMG_0276.jpg"
        imageAlt="Poetry entrance and verandah"
        lines={["Designs that", "Last for", "Generations"]}
      />
      <QuoteSplit
        imageSide="left"
        imageSrc="/IMG_0534.jpg"
        imageAlt="Poetry residence interior"
        lines={["Building", "Greener Homes", "For a Better", "Future"]}
      />
      <QuoteSplit
        imageSide="right"
        imageSrc="/IMG_0543.jpg"
        imageAlt="Poetry living space"
        lines={["The Shape", "Of Modern", "Granduer"]}
      />
      <QuoteSplit
        imageSide="left"
        imageSrc="/IMG_0982.jpg"
        imageAlt="Poetry courtyard"
        lines={["Meticulous", "Planning for", "Every Project"]}
      />
      <WhatWeDo />
      <PortfolioGrid projects={projects.slice(0, 6)} isHomePage={true} />
      <EditorialPortfolioSection projects={projects.slice(0, 6)} />
      <AboutSection certificates={certificates} />
      <JournalSection articles={articles} />
      <CareersSection roles={jobs} />
      <FooterSection />
    </main>
  );
}
