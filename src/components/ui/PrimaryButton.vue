<script setup lang='ts'></script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 48px;
}

button:hover {
  background-color: var(--color-primary-hover);
}

button:disabled {
  color: var(--color-text-disabled);
  background-color: var(--color-disabled-bg);
  cursor: not-allowed;
}
</style>
