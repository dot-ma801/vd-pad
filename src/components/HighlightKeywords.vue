<script setup lang="ts">
import { computed } from 'vue'
import KeywordChip from './KeywordChip.vue'

const props = defineProps<{
  keywords: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'delete', word: string): void
}>()

const hasKeywords = computed(() => Object.keys(props.keywords).length > 0)

const deleteKeyword = (word: string) => {
  emit('delete', word)
}
</script>

<template>
  <div class="keywords-container">
    <ul v-if="hasKeywords" class="keywords-list">
      <KeywordChip
        v-for="(color, word) in keywords"
        :key="word"
        :word="word"
        :color="color"
        @delete="deleteKeyword"
      />
    </ul>
    <p v-else class="no-keywords">ハイライト中の単語はありません。</p>
  </div>
</template>

<style scoped>
.keywords-container {
  border: 1px solid var(--color-border);
  background-color: var(--color-surface-alt);
  padding: var(--spacing-base);
  border-radius: 4px;
  min-height: 50px;
  margin-top: var(--spacing-base);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.keywords-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
}
</style>
