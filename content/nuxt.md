---
title: Nuxt
description: Common Nuxt commands and project files.
---

# Nuxt Cheatsheet

## Commands

| Task | Command |
| --- | --- |
| Start dev server | `pnpm dev` |
| Build for production | `pnpm build` |
| Generate static output | `pnpm generate` |

## Important Files

- `nuxt.config.ts` controls modules, app metadata, and build settings.
- `content.config.ts` defines Markdown collections for Nuxt Content.
- `pages/index.vue` renders the cheatsheet shelf.

## Content Query

```ts
const { data: docs } = await useAsyncData('cheatsheets', () =>
  queryCollection('cheatsheets').order('title', 'ASC').all()
)
```
