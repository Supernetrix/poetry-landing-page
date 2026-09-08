import ServicesPage from "../components/ServicesPage";
import FooterSection from "../components/FooterSection";

export const metadata = {
  title: "Services — Poetry Designs",
  description:
    "Turn-key solutions, architectural planning and design, and project management from Poetry Designs.",
};

export default function ServicesRoute() {
  return (
    <main>
      <ServicesPage />
      <FooterSection />
    </main>
  );
}
