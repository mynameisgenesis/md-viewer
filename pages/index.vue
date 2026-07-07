<script setup lang="ts">
type Cheatsheet = {
  title?: string
  description?: string
  path: string
}

const { data: cheatsheets } = await useAsyncData('cheatsheets', () =>
  queryCollection('cheatsheets').order('title', 'ASC').all()
)

const search = ref('')
const activePath = ref('')

const docs = computed(() => cheatsheets.value ?? [])

const filteredDocs = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) {
    return docs.value
  }

  return docs.value.filter((doc) => {
    const title = getTitle(doc).toLowerCase()
    const description = doc.description?.toLowerCase() ?? ''

    return title.includes(query) || description.includes(query)
  })
})

const activeDoc = computed(() => {
  return docs.value.find((doc) => doc.path === activePath.value) ?? docs.value[0] ?? null
})

watch(
  docs,
  (currentDocs) => {
    if (!currentDocs.length) {
      activePath.value = ''
      return
    }

    const stillExists = currentDocs.some((doc) => doc.path === activePath.value)

    if (!activePath.value || !stillExists) {
      activePath.value = currentDocs[0]!.path
    }
  },
  { immediate: true }
)

watch(filteredDocs, (currentDocs) => {
  if (!currentDocs.length) {
    return
  }

  const activeIsVisible = currentDocs.some((doc) => doc.path === activePath.value)

  if (!activeIsVisible) {
    activePath.value = currentDocs[0]!.path
  }
})

function getTitle(doc: Cheatsheet) {
  return doc.title || doc.path.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Untitled'
}

useSeoMeta({
  title: () => activeDoc.value ? `${getTitle(activeDoc.value)} - Cheatsheet Shelf` : 'Cheatsheet Shelf',
  description: 'Browse local Markdown cheatsheets from the content folder.'
})
</script>

<template>
  <main class="app-shell">
    <aside class="sidebar" aria-label="Cheatsheet tabs">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true">#</div>
        <div>
          <h1>Cheatsheet Shelf</h1>
          <p>{{ docs.length }} markdown {{ docs.length === 1 ? 'file' : 'files' }}</p>
        </div>
      </div>

      <label class="search">
        <span>Search cheatsheets</span>
        <input v-model="search" type="search" placeholder="Find a topic" />
      </label>

      <nav class="tabs">
        <button
          v-for="doc in filteredDocs"
          :key="doc.path"
          class="tab"
          :class="{ 'tab-active': activeDoc?.path === doc.path }"
          type="button"
          @click="activePath = doc.path"
        >
          <span>{{ getTitle(doc) }}</span>
          <small>{{ doc.path }}</small>
        </button>
      </nav>

      <p v-if="docs.length && !filteredDocs.length" class="empty-note">
        No cheatsheets match that search.
      </p>

      <div class="drop-note">
        <strong>Add another tab</strong>
        <span>Drop a new <code>.md</code> file into <code>/content</code>.</span>
      </div>
    </aside>

    <section class="reader" aria-live="polite">
      <template v-if="activeDoc">
        <header class="reader-header">
          <div>
            <p class="path-label">{{ activeDoc.path }}</p>
            <h2>{{ getTitle(activeDoc) }}</h2>
            <p v-if="activeDoc.description">{{ activeDoc.description }}</p>
          </div>
        </header>

        <article class="markdown-body">
          <ContentRenderer :value="activeDoc" />
        </article>
      </template>

      <section v-else class="empty-state">
        <h2>No markdown files yet</h2>
        <p>Add a <code>.md</code> file to <code>/content</code>, then Nuxt Content will make it available here.</p>
      </section>
    </section>
  </main>
</template>
