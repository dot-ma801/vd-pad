<script setup lang="ts">
import DelimiterInput from './DelimiterInput.vue'

const emit = defineEmits(['update:delimiters'])

const handleUpdateDelimiters = (delimiters: string[]) => {
  emit('update:delimiters', delimiters)
}
</script>

<template>
  <div class="contents-container">
    <DelimiterInput @update:delimiters="handleUpdateDelimiters" />
  </div>
</template>

<style scoped>
.contents-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
