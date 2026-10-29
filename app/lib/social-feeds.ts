import "server-only";
import { client } from "@/sanity/lib/client";
import { INSTAGRAM_REELS_QUERY } from "@/sanity/lib/queries";
import { YOUTUBE_CHANNEL_ID, normalizeReels, type ReelDocument } from "./social";
import { fetchGoogleReviews } from "./google-reviews";
import { parseYouTubeFeed } from "./youtube-feed";

export async function getInstagramReels() {
  try {
    const documents = await client.withConfig({ useCdn: false }).fetch<ReelDocument[]>(
      INSTAGRAM_REELS_QUERY, {}, { next: { revalidate: 60 }, timeout: 10000 },
    );
    return normalizeReels(documents);
  } catch {
    console.warn("Instagram reels could not be loaded from Sanity.");
    return [];
  }
}

export async function getYouTubeVideos() {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`, {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);
    const videos = parseYouTubeFeed(await response.text());
    if (!videos.length) throw new Error("YouTube feed had no videos");
    return videos;
  } catch {
    console.warn("The YouTube channel feed is unavailable.");
    return [];
  }
}

export function getGoogleReviews() {
  return fetchGoogleReviews({
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    placeId: process.env.GOOGLE_PLACE_ID,
  });
}
