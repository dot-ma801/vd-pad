<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'

defineProps<{
  word: string
  color: string
}>()

const emit = defineEmits<{
  (e: 'delete', word: string): void
}>()

const deleteKeyword = (word: string) => {
  emit('delete', word)
}
</script>

<template>
  <li class="keyword-item">
    <span class="keyword-color-chip" :style="{ backgroundColor: color }"></span>
    <span class="keyword-text">{{ word }}</span>
    <button class="delete-button" @click="deleteKeyword(word)" :title="`'${word}'を削除`">
      <Trash2 :size="16" />
    </button>
  </li>
</template>

<style scoped>
.keyword-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  font-size: 0.9rem;
}

.keyword-color-chip {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.keyword-text {
  font-weight: 500;
}

.delete-button {
  background: none;
  cursor: pointer;
  padding: 4px;
  margin-left: 4px;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  border: none;
}

.delete-button:hover {
  color: var(--color-danger-hover);
}


</style>
