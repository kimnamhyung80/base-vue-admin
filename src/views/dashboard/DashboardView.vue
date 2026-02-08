<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const stats = ref([
  { label: '총 사용자', value: '1,234', change: '+12%' },
  { label: '활성 세션', value: '567', change: '+8%' },
  { label: '일일 방문자', value: '890', change: '-3%' },
  { label: '전환율', value: '24.5%', change: '+5%' },
])
</script>

<template>
  <div class="dashboard-view">
    <header class="page-header">
      <h1 class="page-title">대시보드</h1>
      <p class="page-subtitle">
        안녕하세요, {{ authStore.currentUser?.displayName ?? '사용자' }}님! 오늘의 현황입니다.
      </p>
    </header>
    
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card"
      >
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-value">{{ stat.value }}</div>
        <div
          :class="[
            'stat-change',
            stat.change.startsWith('+') ? 'stat-change--positive' : 'stat-change--negative'
          ]"
        >
          {{ stat.change }}
        </div>
      </div>
    </div>
    
    <!-- Content Grid -->
    <div class="content-grid">
      <div class="card">
        <h3 class="card-title">최근 활동</h3>
        <div class="card-content">
          <p class="empty-state">최근 활동 내역이 없습니다.</p>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">빠른 작업</h3>
        <div class="card-content">
          <div class="quick-actions">
            <BaseButton
              variant="secondary"
              size="sm"
            >
              새 프로젝트
            </BaseButton>
            <BaseButton
              variant="secondary"
              size="sm"
            >
              보고서 생성
            </BaseButton>
            <BaseButton
              variant="secondary"
              size="sm"
            >
              팀 초대
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-view {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.25rem;
  background-color: white;
  border-radius: var(--radius-lg, 8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-500, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  margin: 0.25rem 0;
}

.stat-change {
  font-size: 0.75rem;
  font-weight: 500;

  &--positive {
    color: #22c55e;
  }

  &--negative {
    color: #ef4444;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: white;
  border-radius: var(--radius-lg, 8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  padding: 1rem 1.25rem;
  margin: 0;
  border-bottom: 1px solid var(--gray-100, #f3f4f6);
}

.card-content {
  padding: 1.25rem;
}

.empty-state {
  text-align: center;
  color: var(--gray-400, #9ca3af);
  font-size: 0.875rem;
  padding: 2rem 0;
  margin: 0;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
