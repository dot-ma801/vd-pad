<script setup lang="ts">
import { ref } from 'vue'
import type { KeyWordWithColor } from '@/types/wordTypes'

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
    <input v-model="newName"/>
    <input v-model="newColor" type="color" />
    <button>追加</button>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  gap: 8px;
}
</style>
