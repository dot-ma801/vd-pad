<script setup lang="ts">
import { ref } from 'vue'
import type { KeyWordWithColor } from '@/types/wordTypes'
import ColorSelector from '@/components/ColorSelector.vue'
import { defaultColorList } from '@/config/colors'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

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
    <div class="input-area">
      <input v-model="newName" type="text" />
      <ColorSelector v-model="newColor" />
    </div>
    <PrimaryButton>追加</PrimaryButton>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  gap: var(--spacing-base);
  align-items: center;
}
.input-area {
  display: contents;
}

input[type='text'] {
  padding: 0.5rem;
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  border: 1px solid var(--color-input-border);
  border-radius: 4px;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .form-container {
    justify-content: space-around;
  }
  .action-area {
    flex-direction: column;
    align-items: stretch;
  }

  .input-area {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
