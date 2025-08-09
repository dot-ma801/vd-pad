<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute(
    'data-theme',
    isDark.value ? 'dark' : 'light'
  )
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.setAttribute(
    'data-theme',
    isDark.value ? 'dark' : 'light'
  )
})
</script>

<template>
  <header>
    <h1>vd-pad</h1>
    <button class="theme-toggle" @click="toggleTheme">
      <Sun v-if="isDark" :size="20" />
      <Moon v-else :size="20" />
    </button>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-primary);
  padding: var(--spacing-base);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}
h1 {
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  pointer-events: none;
}
.theme-toggle {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
