import { defineField, defineType } from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', description: 'Short description shown below the name' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Certificate', value: 'CERTIFICATE' },
          { title: 'Editorial Feature', value: 'EDITORIAL FEATURE' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'image', title: 'Certificate Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: '1–4, controls grid position' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
