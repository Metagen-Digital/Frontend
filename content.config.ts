import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title:    z.string(),
        excerpt:  z.string().optional(),
        category: z.string().optional(),
        date:     z.string().optional(),
        readTime: z.string().optional(),
        thumbnail:z.string().optional(),
      }),
    }),
  },
})
