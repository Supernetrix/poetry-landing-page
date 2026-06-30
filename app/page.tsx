import HeroSection from "./components/HeroSection";
import WhatWeDo from "./components/WhatWeDo";
import PortfolioGrid from "./components/PortfolioGrid";
import AboutSection from "./components/AboutSection";
import JournalSection from "./components/JournalSection";
import CareersSection from "./components/CareersSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhatWeDo />
      <PortfolioGrid />
      <AboutSection />
      <JournalSection />
      <CareersSection />
      <FooterSection />
    </main>
  );
}
