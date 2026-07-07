import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cheatsheets: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
})
