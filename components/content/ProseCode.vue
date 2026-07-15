<script setup lang="ts">
import type { Ref } from "vue";

const activeCheatsheetPath = inject<Ref<string>>("activeCheatsheetPath");
const codeRef = ref<HTMLElement | null>(null);
const copyState = ref<"idle" | "copied" | "failed">("idle");
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const canCopyInlineCode = computed(() => {
  const path = activeCheatsheetPath?.value ?? "";

  const filesWithInlineCopy = [
    "/git",
    "/kubernetes-cluster-search",
    "/protobuf-commands",
  ];

  return filesWithInlineCopy.includes(path);
});

const copyLabel = computed(() => {
  if (copyState.value === "copied") {
    return "Copied";
  }

  if (copyState.value === "failed") {
    return "Copy failed";
  }

  return "Copy snippet";
});

async function copyInlineCode() {
  const text = codeRef.value?.innerText.trim();

  if (!text) {
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      copyWithTextarea(text);
    }

    copyState.value = "copied";
  } catch {
    try {
      copyWithTextarea(text);
      copyState.value = "copied";
    } catch {
      copyState.value = "failed";
    }
  }

  if (resetTimer) {
    clearTimeout(resetTimer);
  }

  resetTimer = setTimeout(() => {
    copyState.value = "idle";
  }, 1400);
}

function copyWithTextarea(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Unable to copy snippet");
  }
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer);
  }
});
</script>

<template>
  <span v-if="canCopyInlineCode" class="inline-code-copy">
    <code ref="codeRef"><slot /></code>
    <button
      class="inline-copy-button"
      type="button"
      :aria-label="copyLabel"
      :title="copyLabel"
      :data-state="copyState"
      @click="copyInlineCode"
    >
      <svg v-if="copyState !== 'copied'" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="10" height="10" rx="2" />
        <path d="M5 15V7a2 2 0 0 1 2-2h8" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
      </svg>
    </button>
  </span>
  <code v-else><slot /></code>
</template>
