<script setup lang="ts">
import { ref } from 'vue'
import type { KeyWordWithColor } from '@/types/wordTypes'
import { CirclePlus } from 'lucide-vue-next'

const newName = ref('')
const newColor = ref('#000000')

const emit = defineEmits<{
  (e: 'add', payload: KeyWordWithColor): void
}>()

const submit = () => {
  const name = newName.value.trim()
  if (name) {
    emit('add', { word: name, color: newColor.value })
    newName.value = ''
    newColor.value = '#000000'
  }
}
</script>

<template>
  <form class="form-container" @submit.prevent="submit">
    <input v-model="newName" type="text" />
    <input v-model="newColor" type="color" />
    <button><CirclePlus /></button>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  gap: var(--spacing-base);
  align-items: center;
}

input[type='text'],
input[type='color'] {
  padding: 0.5rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
}

button {
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #417dc1;
}

button:disabled {
  background-color: var(--color-disabled-bg);
  cursor: not-allowed;
}
</style>
