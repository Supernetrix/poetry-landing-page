# Instagram reel import

Five public reels from [Poetry Constructions](https://www.instagram.com/poetry_constructions/), checked on 29 October 2026. The cover images are saved locally so the import does not depend on expiring Instagram image URLs.

The titles are short editorial labels based on the cover images. Captions are copied where Instagram exposed one; empty captions remain empty. The 25 October 2024 reel was omitted because its supplied thumbnail was blank. These are selected public reels, not a claim about the account's complete or newest feed.

Run `npm run cms:instagram:check` to validate the records and image files without changing Sanity. With an authorized `SANITY_API_TOKEN` available in the environment, run `npm run cms:instagram:import` to upload the covers and create the published records.

The import targets project `z6qms9wh`, dataset `production`. It skips an existing published record or draft with the same ID or Instagram URL; it never replaces existing content.
