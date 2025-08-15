<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

const isShow = ref(false)

const click = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <div>
    <div class="accordion-container" @click="click">
      <p class="options">
        <ChevronRight :class="{ rotated: isShow }" :size="20" /> Options <span class="line"></span>
      </p>
    </div>
    <div class="content">
      <slot v-if="isShow"></slot>
    </div>
  </div>
</template>

<style scoped>
.accordion-container {
  user-select: none;
}

.options {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.line {
  flex: 1;
  height: 1px;
  background-color: var(--color-text);
  opacity: 0.3;
  margin-left: 8px;
}

.content {
  margin-top: 8px;
  margin-left: calc(20px + 8px);
}

/* 開くとき（trueになる時） */
.rotated {
  transform: rotate(90deg);
  transition: transform 0.2s ease-in;
}

/* 閉じるとき（falseになる時） */
:not(.rotated) {
  transition: transform 0.2s ease-out;
}
</style>
