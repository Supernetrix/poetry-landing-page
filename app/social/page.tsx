import SocialsPage from "../components/SocialsPage";
import FooterSection from "../components/FooterSection";

export const metadata = {
  title: "Social — Poetry Designs",
  description: "Projects, ideas, stories and moments from Poetry Designs.",
};

export default function SocialRoute() {
  return (
    <main>
      <SocialsPage />
      <FooterSection />
    </main>
  );
}
