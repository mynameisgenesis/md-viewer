---
title: JavaScript
description: Modern JavaScript patterns worth remembering.
---

# JavaScript Cheatsheet

## Arrays

```js
const names = users.map((user) => user.name)
const activeUsers = users.filter((user) => user.active)
const byId = users.find((user) => user.id === selectedId)
```

## Objects

```js
const nextSettings = {
  ...settings,
  theme: 'light'
}
```

## Async

```js
async function loadUser(id) {
  const response = await fetch(`/api/users/${id}`)

  if (!response.ok) {
    throw new Error('Unable to load user')
  }

  return response.json()
}
```
