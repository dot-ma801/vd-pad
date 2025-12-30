<script setup lang="ts">
import HighlightedText from '@/components/HighlightedText.vue'
import ActionArea from '@/components/ActionArea.vue'
import { useTextHighlighter } from '@/composables/useTextHighlighter'
import { computed, ref } from 'vue'
import type { KeywordMap, KeyWordWithColor } from '@/types/wordTypes'
import { initialText, initialCharacter } from '@/config/initialSetting'
import { X } from 'lucide-vue-next'

const contentText = ref<string>(initialText)
const highlightWordsWithColor = ref<KeywordMap>(initialCharacter)
const delimiters = ref<string[]>([])

const addWordColor = (payload: KeyWordWithColor) => {
  highlightWordsWithColor.value[payload.word] = payload.color
}

const deleteWordColor = (word: string) => {
  delete highlightWordsWithColor.value[word]
}

const updateDelimiters = (newDelimiters: string[]) => {
  delimiters.value = newDelimiters
}

const onClickClear = () => {
  contentText.value = ''
}

const { highlightedParts } = useTextHighlighter(contentText, highlightWordsWithColor, delimiters)
</script>

<template>
  <div class="container">
    <ActionArea
      :keywords="highlightWordsWithColor"
      @add="addWordColor"
      @delete="deleteWordColor"
      @update:delimiters="updateDelimiters"
    />
    <div class="text-container">
      <div class="input-container">
        <textarea v-model="contentText" rows="6" placeholder="原文を入力…"></textarea>
        <!-- TODO: src\components\KeywordChip.vue にも button あるから、共通化しなきゃ -->
        <button @click="onClickClear" class="clear-btn">
          <X :size="16" />
          <p>テキストをクリア</p>
        </button>
      </div>
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
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  padding: var(--spacing-base);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.highlight-text-area {
  background-color: var(--color-surface);
  padding: var(--spacing-base);
  flex: 5;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);
}

button {
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 48px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;

  > .clear-btn {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .text-container {
    flex-direction: column;
  }
}
</style>
