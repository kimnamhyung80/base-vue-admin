<script setup lang="ts">
// Blank layout - no header, sidebar, or footer
</script>

<template>
  <div class="blank-layout">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.blank-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-50, #f9fafb);
}
</style>
