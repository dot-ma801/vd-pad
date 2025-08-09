<script setup lang="ts">
import HighlightedText from '@/components/HighlightedText.vue'
import ActionArea from '@/components/ActionArea.vue'
import { useTextHighlighter } from '@/composables/useTextHighlighter'
import { ref } from 'vue'
import type { KeywordMap, KeyWordWithColor } from '@/types/wordTypes'

const contentText = ref<string>('')
const highlightWordsWithColor = ref<KeywordMap>({})

const addWordColor = (payload: KeyWordWithColor) => {
  highlightWordsWithColor.value[payload.word] = payload.color
}

const deleteWordColor = (word: string) => {
  delete highlightWordsWithColor.value[word]
}

const { highlightedParts } = useTextHighlighter(contentText, highlightWordsWithColor)
</script>

<template>
  <div class="container">
    <ActionArea :keywords="highlightWordsWithColor" @add="addWordColor" @delete="deleteWordColor" />
    <div class="text-container">
      <textarea v-model="contentText" rows="6" placeholder="原文を入力…"></textarea>
      <div class="highlight-text-area">
        <HighlightedText :parts="highlightedParts" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.text-container {
  display: flex;
  gap: 16px;
}

textarea {
  flex: 1;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  padding: var(--spacing-base);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.highlight-text-area {
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  padding: var(--spacing-base);
  flex: 5;
  border-radius: 4px;
}
</style>
