import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['ARCHITECTURE', 'INTERIOR', 'CONSTRUCTION', 'LANDSCAPE', 'PROCESS'] },
    }),
    defineField({ name: 'date', title: 'Date', type: 'string', description: 'e.g. "April 2026"' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({
      name: 'tileType',
      title: 'Tile Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image tile', value: 'image' },
          { title: 'Type — Dark background', value: 'type-dark' },
          { title: 'Type — Medium background', value: 'type-medium' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One entry per paragraph',
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: '1 = top-left tile' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
