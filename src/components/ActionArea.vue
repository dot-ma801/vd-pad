<script setup lang="ts">
import WordColorForm from '@/components/WordColorForm.vue'
import HighlightKeywords from '@/components/HighlightKeywords.vue'
import Accordion from '@/components/AccordionComponent.vue'
import AccordionContents from '@/components/AccordionContents.vue'
import type { KeywordMap, KeyWordWithColor } from '@/types/wordTypes'

defineProps<{
  keywords: KeywordMap
}>()

const emit = defineEmits<{
  (e: 'add', payload: KeyWordWithColor): void
  (e: 'delete', word: string): void
  (e: 'update:delimiters', delimiters: string[]): void
}>()

const onAdd = (payload: KeyWordWithColor) => {
  emit('add', payload)
}

const onDelete = (word: string) => {
  emit('delete', word)
}

const onUpdateDelimiters = (delimiters: string[]) => {
  emit('update:delimiters', delimiters)
}
</script>

<template>
  <div class="card-container">
    <div class="action-area">
      <WordColorForm class="form-area" @add="onAdd" />
      <HighlightKeywords class="words-area" :keywords="keywords" @delete="onDelete" />
    </div>
    <Accordion class="accordion">
      <AccordionContents @update:delimiters="onUpdateDelimiters" />
    </Accordion>
  </div>
</template>

<style scoped>
.card-container {
  background-color: var(--color-surface);
  padding: var(--spacing-base);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.action-area {
  display: flex;
  gap: var(--spacing-base);
  align-items: center;
}

.form-area {
  flex: 1;
}

.words-area {
  flex: 3;
}

.accordion {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .action-area {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
