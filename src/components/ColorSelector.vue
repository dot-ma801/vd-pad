<script setup lang="ts">
import { computed, ref } from 'vue'
import { defaultColorList } from '@/config/colors'
import { Palette, Check } from 'lucide-vue-next'
import { useContrastingColor } from '@/composables/useColorUtils'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', color: string): void
}>()

const colorInput = ref<HTMLInputElement | null>(null)

const isCustomColorActive = computed(() => {
  return !defaultColorList.includes(props.modelValue)
})

const customColorValue = computed(() => {
  return isCustomColorActive.value ? props.modelValue : '#ffffff'
})

const contrastingIconColor = useContrastingColor(customColorValue)

const iconColor = computed(() => {
  if (!isCustomColorActive.value) {
    return 'currentColor'
  }
  return contrastingIconColor.value
})

const selectColor = (color: string) => {
  emit('update:modelValue', color)
}

const openColorPicker = () => {
  colorInput.value?.click()
}

const onColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
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
    >
      <Check v-if="modelValue === color" :size="16" color="#FFF" />
    </div>
    <div
      class="color-marker custom-color-marker"
      :class="{ 'is-active': isCustomColorActive }"
      :style="{ backgroundColor: customColorValue }"
      @click="openColorPicker"
    >
      <Palette :key="iconColor" :size="20" :color="iconColor" />
      <input
        ref="colorInput"
        type="color"
        :value="customColorValue"
        class="color-input"
        @change="onColorChange"
      />
    </div>
  </div>
</template>

<style scoped>
.color-selector-container {
  --marker-size: 30px;
  --marker-gap-size: 8px;
  --selected-marker-border-size: 3px;

  gap: 8px;
  width: calc(var(--marker-size) * 3 + var(--marker-gap-size) * 3 + var(--selected-marker-border-size) * 2);
  display: flex;
  flex-wrap: wrap;
}

.color-marker {
  position: relative;
  height: var(--marker-size);
  width: var(--marker-size);

  border-radius: 50%;
  border: 1px solid var(--color-border);

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-marker.is-active {
  border: var(--selected-marker-border-size) solid var(--color-secondary);
}

.custom-color-marker {
  background-color: var(--color-surface-alt);
}

.color-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
