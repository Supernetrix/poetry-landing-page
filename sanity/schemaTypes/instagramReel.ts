import { defineField, defineType } from "sanity";
import { getInstagramEmbedUrl, REEL_LAYOUTS } from "../../app/lib/social";

export const instagramReel = defineType({
  name: "instagramReel",
  title: "Instagram Reel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "caption", title: "Caption", type: "text", rows: 3 }),
    defineField({
      name: "reelUrl", title: "Instagram reel URL", type: "url",
      description: "Use a public Instagram reel or post URL with embedding enabled.",
      validation: (rule) => rule.custom((value) => !value || getInstagramEmbedUrl(value) ? true : "Enter an Instagram reel or post URL."),
    }),
    defineField({
      name: "videoFile", title: "Video upload", type: "file", options: { accept: "video/mp4,video/webm" },
      description: "Optional MP4 or WebM. Uploaded videos play directly on the site and take precedence over the Instagram embed.",
    }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({
      name: "layout", title: "Tile layout", type: "string", initialValue: "box",
      options: { list: REEL_LAYOUTS.map((value) => ({ title: value[0].toUpperCase() + value.slice(1), value })) },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  validation: (rule) => rule.custom((document) => {
    const video = document?.videoFile as { asset?: { _ref?: string } } | undefined;
    return document?.reelUrl || video?.asset?._ref ? true : "Add an Instagram reel URL or upload a video.";
  }),
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "caption", media: "thumbnail" } },
});
