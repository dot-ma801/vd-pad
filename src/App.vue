<script setup lang="ts">
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader class="header" />
    <div class="content">
      <router-view />
    </div>
    <AppFooter class="footer" />
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
}

.header {
  width: 100%;
  top: 0;
}

.content {
  margin: 0 1rem;
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
