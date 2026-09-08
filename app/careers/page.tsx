import CareersPage from "../components/CareersPage";
import FooterSection from "../components/FooterSection";

export const metadata = {
  title: "Careers — Poetry Designs",
  description: "Join the Poetry Designs team. Apply now for architecture, design and construction roles in Bangalore.",
};

export default function CareersRoute() {
  return (
    <main>
      <CareersPage />
      <FooterSection />
    </main>
  );
}
