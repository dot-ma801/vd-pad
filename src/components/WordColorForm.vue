<script setup>
import { ref } from 'vue'

const newName = ref('')
const newColor = ref('#000000')

const emit = defineEmits(['add'])

const submit = () => {
  console.log('aaaa')
  const name = newName.value.trim()
  if (name) {
    emit('add', { word: name, color: newColor.value })
    newName.value = ''
    newColor.value = '#000000'
  }
}
</script>

<template>
  <form @submit.prevent="submit" style="margin-bottom: 1rem">
    <input v-model="newName" placeholder="名前（例：太郎）" />
    <input v-model="newColor" type="color" />
    <button>追加</button>
  </form>
</template>
