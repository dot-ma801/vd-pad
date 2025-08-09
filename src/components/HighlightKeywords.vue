<script setup lang="ts">
import { computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'

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
      <li v-for="(color, word) in keywords" :key="word" class="keyword-item">
        <span class="keyword-color-chip" :style="{ backgroundColor: color }"></span>
        <span class="keyword-text">{{ word }}</span>
        <button class="delete-button" @click="deleteKeyword(word)" :title="`'${word}'を削除`">
          <Trash2 :size="16" />
        </button>
      </li>
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

.keyword-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: var(--color-secondary);
  border: none;
  color: #fff;
  font-size: 0.9rem;
}

.keyword-color-chip {
  display: none;
}

.keyword-text {
  font-weight: 500;
}

.delete-button {
  background: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;
  margin-left: 4px;
  color: #fff;
  display: flex;
  align-items: center;
}

.delete-button:hover {
  color: #ffdede;
}

.no-keywords {
  color: #888;
  text-align: center;
  margin: 0;
  padding: var(--spacing-base);
}
</style>
