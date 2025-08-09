<script setup lang="ts">
import { Github } from 'lucide-vue-next';
import { deployDate, commitHash } from '@/config/deployInfo';
</script>

<template>
  <footer>
    <div class="footer-content">
      <span class="deploy-info">
        Last deployed on {{ deployDate }} for commit
        <a :href="`https://github.com/dot-ma801/vd-pad/commit/${commitHash}`" class="commit-link">{{ commitHash }}</a>
      </span>
      <a href="https://github.com/dot-ma801/vd-pad" class="github-link" target="_blank" rel="noopener">
        <Github />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-base);
  font-size: 0.875rem;
  width: 100%;
}
.commit-link {
  color: inherit;
  text-decoration: underline;
  margin: 0 0.25em;
}
.github-link {
  color: inherit;
}
.github-link svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
footer {
  background-color: var(--color-secondary);
  color: #fff;
  text-align: center;
  padding: var(--spacing-base);
}
</style>
