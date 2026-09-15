import HeroSection from "./components/HeroSection";
import StatsSnapshot from "./components/StatsSnapshot";
import ConceptToReality from "./components/ConceptToReality";
import QuoteSplit from "./components/QuoteSplit";
import FooterSection from "./components/FooterSection";

export default function Home() {
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
      <FooterSection />
    </main>
  );
}
