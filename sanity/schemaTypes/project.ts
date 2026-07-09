import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'scale', title: 'Scale', type: 'string' }),
    defineField({ name: 'note', title: "Architect's Note", type: 'text' }),
    defineField({ name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery', title: 'Gallery', type: 'array',
      of: [
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object', name: 'youtubeVideo', title: 'YouTube Video',
          fields: [
            defineField({ name: 'url', title: 'YouTube URL', type: 'url', validation: Rule => Rule.required() }),
            defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare: ({ url, caption }: { url?: string; caption?: string }) => ({ title: caption || 'YouTube Video', subtitle: url }),
          },
        },
      ],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: '1 = first in grid' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
