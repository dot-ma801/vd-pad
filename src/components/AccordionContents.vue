<script setup lang="ts">
import { ref } from 'vue'

const delimiters = ref('')

const emit = defineEmits(['update:delimiters'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  delimiters.value = target.value
  const delimiterArray = delimiters.value.split(/\s+/).filter(Boolean)
  emit('update:delimiters', delimiterArray)
}
</script>

<template>
  <div>
    <label for="delimiters">区切り文字 (スペース区切り):</label>
    <input
      type="text"
      id="delimiters"
      :value="delimiters"
      @input="onInput"
      placeholder="例: ： 「 //"
    />
  </div>
</template>

<style scoped>
label {
  margin-right: 10px;
}

input {
  width: 250px;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  padding: 4px 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
</style>
