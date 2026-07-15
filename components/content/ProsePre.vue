<script setup lang="ts">
import type { Ref } from "vue";

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
    class?: string | null;
  }>(),
  {
    code: "",
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null,
  },
);

const activeCheatsheetPath = inject<Ref<string>>("activeCheatsheetPath");
const copyState = ref<"idle" | "copied" | "failed">("idle");
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const copyLabel = computed(() => {
  if (copyState.value === "copied") {
    return "Copied";
  }

  if (copyState.value === "failed") {
    return "Copy failed";
  }

  return "Copy code";
});

const isCommandExample = computed(() => {
  const path = activeCheatsheetPath?.value ?? "";
  const filesWithInlineCopy = [
    "/git",
    "/kubernetes-cluster-search",
    "/protobuf-commands",
  ];

  return filesWithInlineCopy.includes(path);
});

async function copyCode() {
  const text = props.code.trimEnd();

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
  }, 1600);
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
    throw new Error("Unable to copy code");
  }
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer);
  }
});
</script>

<template>
  <div class="code-block" :class="{ 'code-block-command': isCommandExample }">
    <button
      v-if="isCommandExample"
      class="code-copy-button"
      type="button"
      :aria-label="copyLabel"
      :title="copyLabel"
      :data-state="copyState"
      @click="copyCode"
    >
      <svg v-if="copyState !== 'copied'" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="10" height="10" rx="2" />
        <path d="M5 15V7a2 2 0 0 1 2-2h8" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
      </svg>
      <span>{{ copyState === "copied" ? "Copied" : "Copy" }}</span>
    </button>

    <pre :class="props.class"><slot /></pre>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
