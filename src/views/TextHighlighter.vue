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
  <div class="container">
    <WordColorForm @add="addWordColor" />

    <textarea v-model="contentText" rows="6" style="width: 100%; font-family: monospace"></textarea>

    <div style="border: 1px solid #ccc; padding: 1rem; margin-top: 1rem; background: #fdfdfd">
      <HighlightedText :parts="highlightedParts" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
