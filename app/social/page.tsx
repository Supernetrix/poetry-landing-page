import SocialsPage from "../components/SocialsPage";
import FooterSection from "../components/FooterSection";
import { getGoogleReviews, getInstagramReels, getYouTubeVideos } from "../lib/social-feeds";

export const metadata = {
  title: "Social — Poetry Designs",
  description: "Projects, ideas, stories and moments from Poetry Designs.",
};

export default async function SocialRoute() {
  const [reels, videos, reviews] = await Promise.all([
    getInstagramReels(), getYouTubeVideos(), getGoogleReviews(),
  ]);
  return (
    <main>
      <SocialsPage reels={reels} videos={videos} reviews={reviews} />
      <FooterSection />
    </main>
  );
}
