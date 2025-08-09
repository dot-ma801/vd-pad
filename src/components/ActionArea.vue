<script setup lang="ts">
import WordColorForm from '@/components/WordColorForm.vue'
import HighlightKeywords from '@/components/HighlightKeywords.vue'
import type { KeywordMap, KeyWordWithColor } from '@/types/wordTypes'

defineProps<{
  keywords: KeywordMap
}>()

const emit = defineEmits<{
  (e: 'add', payload: KeyWordWithColor): void
  (e: 'delete', word: string): void
}>()

const onAdd = (payload: KeyWordWithColor) => {
  emit('add', payload)
}

const onDelete = (word: string) => {
  emit('delete', word)
}
</script>

<template>
  <div class="action-area">
    <WordColorForm class="form-area" @add="onAdd" />
    <HighlightKeywords class="words-area" :keywords="keywords" @delete="onDelete" />
  </div>
</template>

<style scoped>
.action-area {
  display: flex;
  gap: var(--spacing-base);
  background-color: var(--color-surface);
  padding: var(--spacing-base);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.form-area {
  flex: 1;
}

.words-area {
  flex: 3;
}
</style>
