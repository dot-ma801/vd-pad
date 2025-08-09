<script setup lang="ts">
defineProps({
  parts: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="highlighted-text">
    <template v-for="(part, idx) in parts" :key="idx">
      <span v-if="part.color" :style="{ color: part.color, fontWeight: 'bold' }">{{
        part.text
      }}</span>
      <template v-else>{{ part.text }}</template>
    </template>
  </div>
</template>

<style scoped>
.highlighted-text {
  white-space: pre-wrap;
}
</style>
