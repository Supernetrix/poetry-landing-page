Here's the plan:

  1. Setup (~5 min)
  - Install Sanity in the project (@sanity/client, next-sanity)
  - Run sanity init to create the studio, connect to a project

  2. Define schemas (~15 min)
  - project — name, location, year, scale, note, hero image, gallery
  - article — title, category, date, excerpt, body, cover image, tile type
  - jobOpening — title, location, type, description, requirements, compensation
  - service — name, tag, description, stat, stat label, image (singleton array)

  3. Wire up data fetching (~20 min)
  - Create a Sanity client (lib/sanity.ts)
  - Replace the hardcoded PROJECTS, ARTICLES, ROLES, SERVICES arrays with GROQ queries
  - Use async server components to fetch on the server (no loading states needed)

  4. Migrate existing content (~10 min)
  - Enter all current hardcoded data into the Sanity studio so nothing goes blank

  Total: ~50 min of focused work.

  The only decision before we start: do you want the Sanity Studio embedded in the Next.js app at /studio
  (easiest, one repo), or as a separate project? I'd recommend embedded.

  Ready to go?

✻ Churned for 14s

※ recap: Working on a Poetry Studios landing page. Just finished tweaking the WhatWeDo section images and
  agreed on a Sanity CMS integration plan. Next step is running sanity init to set up the embedded
  studio.

❯ connecting to an empty new project or creating from here what's easier ? don't code yet                

⏺ Creating from here (embedded) is easier. Here's why:

  - sanity init inside your existing Next.js project scaffolds everything — studio, schemas, client
  config — in one command
  - The studio lives at /studio in the same repo, same deployment
  - No context switching between two codebases
  - One npm run dev runs both Next.js and the studio

  Starting from Sanity's website (new empty project) means you'd manually wire up the project ID,
  dataset, CORS settings, and client config yourself. More steps, same result.

  Only reason to do it separately is if a non-dev client needs their own standalone CMS URL — but you can
  always do that later.

  Go with embedded. Ready when you are.

✻ Crunched for 6s

─────────────────────────────────────────────────────────────────────────────────────────────────────────

