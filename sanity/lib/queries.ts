import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc){ _id, name, "slug": slug.current, location, year, scale, note, image, "gallery": gallery[]{ _key, _type, asset, hotspot, crop, url, caption } }`
)

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`
)

export const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    location,
    year,
    scale,
    note,
    intro,
    image,
    sketch,
    specs,
    highlightsTitle,
    highlights[]{ title, body },
    highlightsImage,
    craftTitle,
    craftBody,
    craftImage,
    galleryFeatured,
    "gallery": gallery[_type == "image"]{ _key, _type, asset, hotspot, crop, caption },
    tourTitle,
    tourVideoUrl
  }`
)

export const ARTICLES_QUERY = defineQuery(
  `*[_type == "article"] | order(order asc){ _id, title, category, date, excerpt, tileType, image, body }`
)

export const JOBS_QUERY = defineQuery(
  `*[_type == "jobOpening"] | order(order asc){ _id, title, location, type, desc, requirements, offer }`
)

export const CERTIFICATES_QUERY = defineQuery(
  `*[_type == "certificate"] | order(order asc){ _id, name, subtitle, year, type, image }`
)
