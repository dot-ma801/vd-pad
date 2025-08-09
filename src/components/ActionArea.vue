<script setup lang="ts">
import WordColorForm from '@/components/WordColorForm.vue'
import HighlightKeywords from '@/components/HighlightKeywords.vue'

defineProps<{
  keywords: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'add', payload: { word: string; color: string }): void
  (e: 'delete', word: string): void
}>()

const onAdd = (payload: { word: string; color: string }) => {
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
  gap: 16px;
}

.form-area {
  flex: 1;
}

.words-area {
  flex: 3;
}
</style>
