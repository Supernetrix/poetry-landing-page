import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { getInstagramEmbedUrl, REEL_LAYOUTS, type ReelLayout } from "../app/lib/social";

type ImportReel = {
  _id: string;
  title: string;
  caption: string;
  reelUrl: string;
  thumbnailFile: string;
  layout: ReelLayout;
  order: number;
};

async function main() {
  const folder = resolve(dirname(fileURLToPath(import.meta.url)), "../content/instagram-reels");
  const source: { projectId: string; dataset: string; reels: ImportReel[] } = JSON.parse(
    await readFile(resolve(folder, "records.json"), "utf8"),
  );

  for (const reel of source.reels) {
    if (!reel._id.startsWith("instagram-reel-") || !reel.title.trim() || !getInstagramEmbedUrl(reel.reelUrl)) {
      throw new Error(`Invalid reel: ${reel._id}`);
    }
    if (!REEL_LAYOUTS.includes(reel.layout) || !Number.isInteger(reel.order)) {
      throw new Error(`Invalid layout or order: ${reel._id}`);
    }
    const file = resolve(folder, reel.thumbnailFile);
    if (!file.startsWith(folder + "/") || (await stat(file)).size < 500) {
      throw new Error(`Missing thumbnail: ${reel._id}`);
    }
  }

  if (process.argv.includes("--check")) {
    console.log(`Validated ${source.reels.length} reels and thumbnails for ${source.projectId}/${source.dataset}. No changes made.`);
    return;
  }

  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;
  if (!token) throw new Error("Set SANITY_API_TOKEN to an authorized Editor token before importing.");
  const client = getCliClient({ projectId: source.projectId, dataset: source.dataset, apiVersion: "2026-07-04", useCdn: false, token });
  const existing = await client.fetch<Array<{ _id: string; reelUrl?: string }>>(
    '*[_type == "instagramReel"]{_id, reelUrl}',
  );
  const pending = source.reels.filter((reel) => !existing.some((item) =>
    item._id.replace(/^drafts\./, "") === reel._id || getInstagramEmbedUrl(item.reelUrl) === getInstagramEmbedUrl(reel.reelUrl),
  ));
  if (!pending.length) {
    console.log("All reel records already exist. No changes made.");
    return;
  }

  let transaction = client.transaction();
  for (const reel of pending) {
    const asset = await client.assets.upload("image", createReadStream(resolve(folder, reel.thumbnailFile)), {
      filename: reel.thumbnailFile.split("/").at(-1),
    });
    transaction = transaction.createIfNotExists({
      _id: reel._id,
      _type: "instagramReel",
      title: reel.title,
      caption: reel.caption,
      reelUrl: reel.reelUrl,
      layout: reel.layout,
      order: reel.order,
      thumbnail: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    });
  }
  await transaction.commit();
  console.log(`Published ${pending.length} Instagram reels in ${source.projectId}/${source.dataset}. Existing records were preserved.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Instagram import failed.");
  process.exitCode = 1;
});
