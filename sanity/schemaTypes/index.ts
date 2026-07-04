import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { article } from './article'
import { jobOpening } from './jobOpening'
import { certificate } from './certificate'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, article, jobOpening, certificate],
}
