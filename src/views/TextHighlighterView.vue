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
  <ActionArea
    :keywords="highlightWordsWithColor"
    @add="addWordColor"
    @delete="deleteWordColor"
  />
  <div class="container">
    <textarea v-model="contentText" rows="6"></textarea>
    <div class="highlight-text-area">
      <HighlightedText :parts="highlightedParts" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 16px;
}

.action-area {
  display: flex;
  align-items: center;
}

textarea {
  flex: 1;
}

.highlight-text-area {
  border: 1px solid #ccc;
  padding: 1rem;
  background: #fdfdfd;

  flex: 5;
}
</style>
