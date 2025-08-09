<script setup lang="ts">
import { defaultColorList } from '@/config/colors'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', color: string): void
}>()

const selectColor = (color: string) => {
  emit('update:modelValue', color)
}
</script>
<template>
  <div class="color-selector-container">
    <div
      v-for="color in defaultColorList"
      :key="color"
      class="color-marker"
      :class="{ 'is-active': modelValue === color }"
      :style="{ backgroundColor: color }"
      @click="selectColor(color)"
    ></div>
  </div>
</template>

<style scoped>
.color-selector-container {
  --marker-size: 30px;

  gap: 8px;
  width: calc((var(--marker-size) + 8px) * 3);

  display: flex;
  flex-wrap: wrap;
}

.color-marker {
  height: var(--marker-size);
  width: var(--marker-size);

  border-radius: 50%;
  border: 1px solid var(--color-border);

  cursor: pointer;
}

.color-marker.is-active {
  border: 3px solid var(--color-primary);
  border-radius: 50%;
}
</style>
