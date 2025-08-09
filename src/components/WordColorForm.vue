<script setup lang="ts">
import { ref } from 'vue'
import type { KeyWordWithColor } from '@/types/wordTypes'
import ColorSelector from '@/components/ColorSelector.vue'
import { defaultColorList } from '@/config/colors'

const newName = ref('')
const newColor = ref(defaultColorList[0])

const emit = defineEmits<{
  (e: 'add', payload: KeyWordWithColor): void
}>()

const submit = () => {
  const name = newName.value.trim()
  if (name) {
    emit('add', { word: name, color: newColor.value })
    newName.value = ''
  }
}
</script>

<template>
  <form class="form-container" @submit.prevent="submit">
    <input v-model="newName" type="text" />
    <ColorSelector v-model="newColor" />
    <button>追加</button>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  gap: var(--spacing-base);
  align-items: center;
}

input[type='text'] {
  padding: 0.5rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem
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

button:hover {
  background-color: var(--color-primary-hover);
}

button:disabled {
  background-color: var(--color-disabled-bg);
  cursor: not-allowed;
}
</style>
