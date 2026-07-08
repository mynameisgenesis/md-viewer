export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-07-07',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Cheatsheeter',
      meta: [
        {
          name: 'description',
          content: 'A local Nuxt Markdown viewer for code cheatsheets.'
        }
      ]
    }
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-light'
        }
      }
    }
  }
})
