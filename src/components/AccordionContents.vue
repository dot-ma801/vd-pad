<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CircleHelp } from 'lucide-vue-next'

const delimiters = ref('')
const isTooltipVisible = ref(false)
const tooltipContainer = ref<HTMLElement | null>(null)

const emit = defineEmits(['update:delimiters'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  delimiters.value = target.value
  const delimiterArray = delimiters.value.split(/\s+/).filter(Boolean)
  emit('update:delimiters', delimiterArray)
}

const toggleTooltip = () => {
  isTooltipVisible.value = !isTooltipVisible.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (tooltipContainer.value && !tooltipContainer.value.contains(event.target as Node)) {
    isTooltipVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
})
</script>

<template>
  <div class="container">
    <label for="delimiters">区切り文字</label>
    <div class="tooltip-container" ref="tooltipContainer">
      <CircleHelp
        class="tooltip-trigger"
        :size="20"
        :stroke-width="1.5"
        @click.stop="toggleTooltip"
      />
      <div v-if="isTooltipVisible" class="tooltip-content">
        区切り文字として入力された文字以降、その行はハイライトされません。<br /> 複数の区切り文字を入力したい場合、半角スペースで区切って入力します。
      </div>
    </div>
    <input
      type="text"
      id="delimiters"
      :value="delimiters"
      @input="onInput"
      placeholder="例: ： 「"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tooltip-container {
  position: relative;
  display: flex;
  align-items: center;
}

.tooltip-trigger {
  cursor: pointer;
  color: var(--color-text-alt);
}

.tooltip-content {
  position: absolute;
  top: 140%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 10px 14px;
  width: 300px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: left;
}

label {
  width: auto;
}

input {
  width: 180px;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  padding: 4px 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
</style>
