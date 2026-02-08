<script setup lang="ts">
const route = useRoute()
const userId = computed(() => route.params['id'] as string)
</script>

<template>
  <div class="user-detail-view">
    <header class="page-header">
      <RouterLink
        to="/users"
        class="back-link"
      >
        ← 목록으로
      </RouterLink>
      <h1 class="page-title">사용자 상세</h1>
    </header>
    
    <div class="card">
      <div class="card-content">
        <p class="empty-state">사용자 ID: {{ userId }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-detail-view {
  max-width: 800px;
}

.page-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--primary-color, #1890ff);
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
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
