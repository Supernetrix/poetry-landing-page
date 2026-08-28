import OurStory from "../components/OurStory";
import FooterSection from "../components/FooterSection";

export const metadata = {
  title: "Our Story — Poetry Designs",
  description:
    "Poetry was founded in 2020 to close the gaps between residential architecture and execution, with a transparent design-and-build process.",
};

export default function OurStoryPage() {
  return (
    <main>
      <OurStory />
      <FooterSection />
    </main>
  );
}
