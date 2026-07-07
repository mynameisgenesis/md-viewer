---
title: Git
description: Daily Git commands for moving work safely.
---

# Git Cheatsheet

## Status and History

| Task | Command |
| --- | --- |
| Show changed files | `git status --short` |
| Show recent commits | `git log --oneline --decorate -10` |
| Show current branch | `git branch --show-current` |

## Branches

```bash
git switch -c feature/markdown-tabs
git switch main
git branch --delete feature/old-work
```

## Undo Carefully

- Use `git restore path/to/file` only when you want to discard unstaged local edits.
- Use `git revert <sha>` when a shared commit needs to be undone with a new commit.
- Avoid `git reset --hard` unless you are certain no local work matters.
