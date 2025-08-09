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
  border: 1px solid #ccc;
  padding: 1rem;
  background: #fdfdfd;
  min-height: 50px;
  border-radius: 4px;
  margin-top: 16px;
}

.keywords-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  font-size: 0.9rem;
}

.keyword-color-chip {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.keyword-text {
  font-weight: 500;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  display: flex;
  align-items: center;
  color: #888;
  border-radius: 50%;
}

.delete-button:hover {
  color: #d9534f;
}

.no-keywords {
  color: #888;
  text-align: center;
  margin: 0;
  padding-top: 4px;
}
</style>
