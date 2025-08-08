<script setup lang="ts">
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<style scoped>
.app-container {
  /* 高さと幅 */
  width: 100%;
  min-height: 100%;

  /* 色 */
  /* background-color: #222; */

  /* 配置 */
  display: flex;
  flex-direction: column;

  /* 間隔 */
  padding: 1rem;
}
</style>
