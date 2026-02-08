<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const scrollPercent = ref(0)

function updateScroll() {
  const scrollTop = window.scrollY || window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="scroll-progress" @click="scrollToTop">
    <ArrowUp :size="16" class="scroll-icon" />
    <span class="scroll-text">{{ scrollPercent }}%</span>
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  bottom: 48px;
  right: 16px;
  background-color: var(--color-primary);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  user-select: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 4px;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.scroll-progress:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.scroll-icon {
  display: inline-block;
}

@media (max-width: 768px) {
  .scroll-progress {
    bottom: 120px;
  }
}
</style>
