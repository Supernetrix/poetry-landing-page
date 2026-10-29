This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Social page

- YouTube shows the three newest uploads from [Poetry Constructions](https://www.youtube.com/@PoetryConstructions), including Shorts. The public channel feed refreshes every six hours when the page is visited; no YouTube API key is needed.
- Add reels in `/studio` under **Instagram Reel**. Enter a public Instagram reel or post URL, or upload an MP4/WebM for direct playback. Add a thumbnail, caption, layout and display order, then publish. Changes reach `/social` within a minute. Instagram controls whether a public post can be embedded; each embed also links to the original post.
- For Google reviews, copy `.env.example` to `.env.local`, supply a Places API (New) key, then restart the server. The example includes the verified Place ID for Poetry Designs in Whitefield, linked to poetryconstructions.com. The Google Cloud project needs billing enabled and a key restricted to Places API (New). Keep the API key server-side. The page shows Google's rating, review count and up to three reviews in relevance order, with author and source links.
- Google review requests are not persisted in the Next.js cache, in line with [Places API caching restrictions](https://developers.google.com/maps/documentation/places/web-service/policies). If credentials are missing or a provider is unavailable, the section links to the source without inventing ratings, videos or testimonials.

Google reviews are optional. Leaving `GOOGLE_PLACES_API_KEY` unset makes no Google API calls. To activate later, enable billing and Places API (New) in the Google Cloud project, create a key restricted to that API, and add it to `.env.local` with the Place ID from `.env.example`. Restart local development; for a hosted site, set the same server-side environment variables and rebuild. Each Social page request can make one Place Details request, so review usage and quotas before enabling it. Automated tests use mocked Google responses and do not require a key or billing.

The careers form opens an email draft addressed to `hr@poetryconstructions.com`. Applicants attach their résumé in their email app before sending. Floor-plan requests still open drafts addressed to `hello@poetryconstructions.com`.

If Studio displays **Connect this studio to your project**, use **Add development host** to allow the local origin in Sanity, with credentials enabled. Register the hosted Studio's origin separately before using it in production.

The local Studio at `/studio` and the [hosted Studio](https://www.sanity.io/@oHdllsxcg/studio/htodbd51hxl3657anwpvkpys/default/structure) share the same production dataset. Publishing a document updates its content, but schema changes also need a Studio deployment before new document types appear in the hosted editor. Sign in to the CLI with the Poetry account using `npx sanity login`, then run `npm run cms:deploy` to update the existing hosted Studio. `npm run cms:build` checks its standalone build without deploying. This is separate from deploying the Next.js website.

Run `npm test` for URL, feed and content-normalization checks, and `npm run build` to check the production build. Sanity Studio access requires a Sanity account with access to this project's dataset.
