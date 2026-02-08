<script setup lang="ts">
// Analytics view placeholder
</script>

<template>
  <div class="analytics-view">
    <header class="page-header">
      <h1 class="page-title">분석</h1>
      <p class="page-subtitle">데이터 분석 및 인사이트</p>
    </header>
    
    <div class="card">
      <div class="card-content">
        <p class="empty-state">분석 데이터가 준비 중입니다.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.analytics-view {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  margin: 0 0 0.25rem;
}

.page-subtitle {
  font-size: 0.875rem;
  color: var(--gray-500, #6b7280);
  margin: 0;
}

.card {
  background-color: white;
  border-radius: var(--radius-lg, 8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1.25rem;
}

.empty-state {
  text-align: center;
  color: var(--gray-400, #9ca3af);
  font-size: 0.875rem;
  padding: 4rem 0;
  margin: 0;
}
</style>
