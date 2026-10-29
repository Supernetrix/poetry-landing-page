import assert from "node:assert/strict";
import test from "node:test";
import { getInstagramEmbedUrl, getYouTubeId, normalizeReels } from "../app/lib/social";
import { fetchGoogleReviews, normalizeGoogleReviews } from "../app/lib/google-reviews";
import { parseYouTubeFeed } from "../app/lib/youtube-feed";
import { buildCareerMailto } from "../app/lib/careers";

const videoId = "1bn90IKEIHw";

test("Career drafts go to HR and preserve punctuation and newlines in applicant details", () => {
  const data = new FormData();
  data.set("name", "  Sam & Co  ");
  data.set("email", "sam+jobs@example.com");
  data.set("phone", "+91 98765 43210");
  data.set("message", "Architecture & interiors?\nPortfolio: https://example.com/?a=1&b=2");
  const url = new URL(buildCareerMailto(data));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "hr@poetryconstructions.com");
  assert.equal(url.searchParams.get("subject"), "Careers application from Sam & Co");
  assert.match(url.searchParams.get("body")!, /Email: sam\+jobs@example\.com/);
  assert.match(url.searchParams.get("body")!, /Architecture & interiors\?\nPortfolio: https:\/\/example\.com\/\?a=1&b=2/);
});

test("YouTube watch, share, Shorts, live and embed links resolve to the same video", () => {
  for (const url of [
    `https://www.youtube.com/watch?v=${videoId}&t=30`,
    `https://youtu.be/${videoId}?si=example`,
    `https://www.youtube.com/shorts/${videoId}`,
    `https://www.youtube.com/live/${videoId}`,
    `https://www.youtube.com/embed/${videoId}`,
    `https://www.youtube-nocookie.com/embed/${videoId}`,
    `https://m.youtube.com/watch?v=${videoId}`,
  ]) assert.equal(getYouTubeId(url), videoId, url);
});

test("YouTube links reject unrelated hosts, credentials and malformed IDs", () => {
  for (const url of [
    `https://youtube.com.evil.example/watch?v=${videoId}`,
    `https://youtube.com@evil.example/watch?v=${videoId}`,
    `https://user:pass@youtube.com/watch?v=${videoId}`,
    "https://youtube.com/watch?v=short", "javascript:alert(1)", "not a URL",
  ]) assert.equal(getYouTubeId(url), null, url);
});

test("Instagram embeds use only public post paths on Instagram", () => {
  assert.equal(getInstagramEmbedUrl("https://www.instagram.com/reel/Example_123/?igsh=test"), "https://www.instagram.com/reel/Example_123/embed/");
  assert.equal(getInstagramEmbedUrl("https://instagram.com/reels/Example_123/"), "https://www.instagram.com/reel/Example_123/embed/");
  assert.equal(getInstagramEmbedUrl("https://instagram.com/p/Example_123/"), "https://www.instagram.com/p/Example_123/embed/");
  assert.equal(getInstagramEmbedUrl("https://instagram.com/poetry_constructions/reel/Example_123/"), "https://www.instagram.com/reel/Example_123/embed/");
  for (const url of ["https://instagram.com/poetry_constructions/", "https://instagram.com.evil.example/reel/x/", "javascript:alert(1)", "<iframe src='https://instagram.com/reel/x/'>"])
    assert.equal(getInstagramEmbedUrl(url), null);
});

test("CMS normalization keeps playable reels and excludes missing or unsafe sources", () => {
  const reels = normalizeReels([
    { _id: "embed", title: "Site visit", reelUrl: "https://www.instagram.com/reel/Example_123/", layout: "tall" },
    { _id: "upload", title: " Detail ", videoUrl: "https://cdn.sanity.io/files/example/production/clip.mp4", layout: "unknown" },
    { _id: "missing", title: "No media" },
    { _id: "invalid", title: "Bad URL", reelUrl: "https://example.com/reel/nope", videoUrl: "javascript:alert(1)" },
    { _id: "untitled", title: " ", videoUrl: "https://cdn.sanity.io/clip.mp4" },
  ]);
  assert.deepEqual(reels.map((reel) => reel.id), ["embed", "upload"]);
  assert.equal(reels[0].layout, "tall");
  assert.equal(reels[1].layout, "box");
  assert.equal(reels[1].caption, "Detail");
});

function entry(id: string, published: string, title = "House &amp; garden", isShort = false) {
  return `<entry><yt:videoId>${id}</yt:videoId><title>${title}</title><published>${published}</published><link href="https://www.youtube.com/${isShort ? "shorts/" : "watch?v="}${id}"/><media:group><media:title>Not the title</media:title></media:group></entry>`;
}

function feed(entries: string) {
  return `<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/">${entries}</feed>`;
}

test("YouTube RSS returns the three newest unique uploads, including Shorts", () => {
  const videos = parseYouTubeFeed(feed([
    entry("aaaaaaaaaaa", "2026-01-01T00:00:00Z"),
    entry("bbbbbbbbbbb", "2026-04-01T00:00:00Z", "<![CDATA[Home <tour>]]>", true),
    entry("ccccccccccc", "2026-03-01T00:00:00Z"),
    entry("ddddddddddd", "2026-02-01T00:00:00Z"),
    entry("ccccccccccc", "2026-03-01T00:00:00Z"),
    entry("invalid", "2027-01-01T00:00:00Z"),
    entry("eeeeeeeeeee", "invalid date"),
  ].join("")));
  assert.deepEqual(videos.map((video) => video.id), ["bbbbbbbbbbb", "ccccccccccc", "ddddddddddd"]);
  assert.equal(videos[0].title, "Home <tour>");
  assert.equal(videos[0].isShort, true);
  assert.equal(videos[1].title, "House & garden");
  assert.equal(videos[0].thumbnail, "https://i.ytimg.com/vi/bbbbbbbbbbb/hqdefault.jpg");
});

test("YouTube RSS handles an empty channel and rejects malformed XML or doctypes", () => {
  assert.deepEqual(parseYouTubeFeed(feed("")), []);
  assert.throws(() => parseYouTubeFeed("<feed><entry></feed>"));
  assert.throws(() => parseYouTubeFeed('<!DOCTYPE feed [<!ENTITY example "unsafe">]><feed/>'));
});

test("Google reviews preserve ratings, author attribution and source links", () => {
  const result = normalizeGoogleReviews({
    rating: 4.6, userRatingCount: 23, googleMapsUri: "https://maps.google.com/?cid=123",
    reviews: [{
      name: "review-1", rating: 4, originalText: { text: "Original review" }, text: { text: "Translated review" },
      authorAttribution: { displayName: "Test author", uri: "https://maps.google.com/contrib/123", photoUri: "https://lh3.googleusercontent.com/test" },
      googleMapsUri: "https://maps.google.com/review/123", relativePublishTimeDescription: "a week ago",
    }],
  });
  assert.equal(result.rating, 4.6);
  assert.equal(result.count, 23);
  assert.equal(result.reviews[0].text, "Original review");
  assert.equal(result.reviews[0].author, "Test author");
  assert.equal(result.reviews[0].url, "https://maps.google.com/review/123");
});

test("Missing Google data never turns into a made-up score or testimonial", () => {
  const result = normalizeGoogleReviews({ reviews: [{ rating: 5 }, { text: { text: "Missing author" } }] });
  assert.equal(result.rating, null);
  assert.equal(result.count, null);
  assert.deepEqual(result.reviews, []);
});

test("Google reviews stay inactive without both settings and make no API calls", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async () => { calls++; return new Response(); };
  for (const config of [{}, { apiKey: "test-key" }, { placeId: "test-place" }]) {
    assert.equal(await fetchGoogleReviews(config, fetcher), null);
  }
  assert.equal(calls, 0);
});

test("Google reviews request only the display fields, bypass caching and limit results to three", async () => {
  const result = await fetchGoogleReviews({ apiKey: "test-key", placeId: "test-place" }, async (url, options) => {
    assert.equal(url, "https://places.googleapis.com/v1/places/test-place");
    assert.equal(options?.cache, "no-store");
    const headers = new Headers(options?.headers);
    assert.equal(headers.get("X-Goog-Api-Key"), "test-key");
    assert.equal(headers.get("X-Goog-FieldMask"), "rating,userRatingCount,googleMapsUri,reviews");
    return Response.json({
      rating: 4.6, userRatingCount: 16,
      reviews: [1, 2, 3, 4].map((number) => ({
        name: `review-${number}`, rating: 5, text: { text: `Review ${number}` },
        authorAttribution: { displayName: `Author ${number}` },
      })),
    });
  });
  assert.equal(result?.rating, 4.6);
  assert.equal(result?.count, 16);
  assert.deepEqual(result?.reviews.map((review) => review.id), ["review-1", "review-2", "review-3"]);
});

test("Google authorization, network and malformed-response failures use the source-link fallback", async (context) => {
  context.mock.method(console, "warn", () => {});
  const failures: Array<typeof fetch> = [
    async () => new Response("Not authorized", { status: 403 }),
    async () => { throw new Error("Network unavailable"); },
    async () => new Response("Not JSON"),
  ];
  for (const fetcher of failures) {
    assert.equal(await fetchGoogleReviews({ apiKey: "test-key", placeId: "test-place" }, fetcher), null);
  }
});
