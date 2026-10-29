import { SaxesParser } from "saxes";
import type { YouTubeVideo } from "./social";

export function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  const parser = new SaxesParser();
  let entry: { id: string; title: string; publishedAt: string; isShort: boolean } | null = null;
  let field: "id" | "title" | "publishedAt" | null = null;

  parser.on("doctype", () => { throw new Error("Unexpected document type in YouTube feed"); });
  parser.on("opentag", (tag) => {
    if (tag.name === "entry") entry = { id: "", title: "", publishedAt: "", isShort: false };
    if (!entry) return;
    if (tag.name === "yt:videoId") field = "id";
    if (tag.name === "title") field = "title";
    if (tag.name === "published") field = "publishedAt";
    if (tag.name === "link" && typeof tag.attributes.href === "string") {
      entry.isShort = tag.attributes.href.includes("youtube.com/shorts/");
    }
  });
  const appendText = (text: string) => { if (entry && field) entry[field] += text; };
  parser.on("text", appendText);
  parser.on("cdata", appendText);
  parser.on("closetag", (tag) => {
    if (["yt:videoId", "title", "published"].includes(tag.name)) field = null;
    if (tag.name !== "entry" || !entry) return;
    const id = entry.id.trim();
    if (/^[\w-]{11}$/.test(id) && entry.title.trim() && Number.isFinite(Date.parse(entry.publishedAt))) {
      videos.push({ ...entry, id, title: entry.title.trim(), thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` });
    }
    entry = null;
  });
  parser.write(xml).close();

  return videos
    .filter((video, index) => videos.findIndex((other) => other.id === video.id) === index)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 3);
}
