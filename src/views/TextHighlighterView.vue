<script setup lang="ts">
import HighlightedText from '@/components/HighlightedText.vue'
import WordColorForm from '@/components/WordColorForm.vue'
import { useTextHighlighter } from '@/composables/useTextHighlighter'
import { ref } from 'vue'

const contentText = ref<string>('')
const highlightWordsWithColor = ref<Record<string, string>>({})

const addWordColor = ({ word, color }: { word: string; color: string }) => {
  highlightWordsWithColor.value[word] = color
}

const { highlightedParts } = useTextHighlighter(contentText, highlightWordsWithColor)
</script>

<template>
  <WordColorForm @add="addWordColor" />
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
