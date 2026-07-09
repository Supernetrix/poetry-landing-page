import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc){ _id, name, location, year, scale, note, image, "gallery": gallery[]{ _key, _type, asset, hotspot, crop, url, caption } }`
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
