<script setup lang="ts">
// User list view placeholder
</script>

<template>
  <div class="user-list-view">
    <header class="page-header">
      <div class="header-content">
        <div>
          <h1 class="page-title">사용자 관리</h1>
          <p class="page-subtitle">시스템 사용자 목록 및 관리</p>
        </div>
        <BaseButton>
          + 사용자 추가
        </BaseButton>
      </div>
    </header>
    
    <div class="card">
      <div class="card-content">
        <p class="empty-state">등록된 사용자가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-list-view {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
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
