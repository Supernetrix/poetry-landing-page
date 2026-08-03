import HeroSection from "./components/HeroSection";
import WhatWeDo from "./components/WhatWeDo";
import PortfolioGrid from "./components/PortfolioGrid";
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
      <WhatWeDo />
      <PortfolioGrid projects={projects.slice(0, 6)} isHomePage={true} />
      <AboutSection certificates={certificates} />
      <JournalSection articles={articles} />
      <CareersSection roles={jobs} />
      <FooterSection />
    </main>
  );
}
