<script setup>
defineProps({
  parts: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div style="white-space: pre-wrap">
    <template v-for="(part, idx) in parts" :key="idx">
      <span v-if="part.color" :style="{ color: part.color, fontWeight: 'bold' }">{{
        part.text
      }}</span>
      <template v-else>{{ part.text }}</template>
    </template>
  </div>
</template>
