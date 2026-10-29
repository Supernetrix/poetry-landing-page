export const YOUTUBE_CHANNEL_ID = "UCymO-Nd8sTSuZkDJp3cWIbQ";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@PoetryConstructions";
export const INSTAGRAM_URL = "https://www.instagram.com/poetry_constructions/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/poetry-design-build/";
export const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Poetry+Designs&query_place_id=ChIJOzi0tAQSrjsRvYVdk-XpYeE";

export const REEL_LAYOUTS = ["tall", "banner", "box", "top", "split"] as const;
export type ReelLayout = (typeof REEL_LAYOUTS)[number];

export type InstagramReel = {
  id: string;
  title: string;
  caption: string;
  embedUrl: string | null;
  videoUrl: string | null;
  thumbnail: string | null;
  layout: ReelLayout;
};

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  isShort: boolean;
};

export type GoogleReview = {
  id: string;
  text: string;
  rating: number;
  author: string;
  authorUrl: string | null;
  authorPhoto: string | null;
  url: string | null;
  relativeTime: string;
};

export type GoogleReviews = {
  rating: number | null;
  count: number | null;
  url: string;
  reviews: GoogleReview[];
};

export type SocialMedia = {
  kind: "youtube" | "instagram" | "video";
  title: string;
  src: string;
  href: string | null;
  portrait?: boolean;
  poster?: string | null;
};

export function httpsUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export function getYouTubeId(value?: string): string | null {
  const safeUrl = httpsUrl(value);
  if (!safeUrl) return null;
  const url = new URL(safeUrl);
  const hostname = url.hostname.replace(/^www\./, "");
  let id: string | null = null;
  if (hostname === "youtu.be") id = url.pathname.split("/")[1];
  if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(hostname)) {
    const [, route, pathId] = url.pathname.split("/");
    if (route === "watch") id = url.searchParams.get("v");
    else if (["shorts", "live", "embed", "v"].includes(route)) id = pathId;
  }
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}

export function getInstagramEmbedUrl(value: unknown): string | null {
  const safeUrl = httpsUrl(value);
  if (!safeUrl) return null;
  const url = new URL(safeUrl);
  if (!["instagram.com", "www.instagram.com"].includes(url.hostname)) return null;
  const match = url.pathname.match(/^\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)\/?$/);
  if (!match) return null;
  const kind = match[1] === "reels" ? "reel" : match[1];
  return `https://www.instagram.com/${kind}/${match[2]}/embed/`;
}

export type ReelDocument = {
  _id: string;
  title?: string;
  caption?: string;
  reelUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  layout?: string;
};

export function normalizeReels(documents: ReelDocument[]): InstagramReel[] {
  return documents.flatMap((document) => {
    const embedUrl = getInstagramEmbedUrl(document.reelUrl);
    const videoUrl = httpsUrl(document.videoUrl);
    if (!document.title?.trim() || (!embedUrl && !videoUrl)) return [];
    const layout = REEL_LAYOUTS.find((value) => value === document.layout) ?? "box";
    return [{
      id: document._id,
      title: document.title.trim(),
      caption: document.caption?.trim() || document.title.trim(),
      embedUrl,
      videoUrl,
      thumbnail: httpsUrl(document.thumbnailUrl),
      layout,
    }];
  });
}
