<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="error-view">
    <div class="error-code">403</div>
    <h1 class="error-title">접근 권한 없음</h1>
    <p class="error-message">
      이 페이지에 접근할 수 있는 권한이 없습니다.
    </p>
    <BaseButton @click="router.push('/dashboard')">
      대시보드로 이동
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.error-view {
  text-align: center;
  padding: 4rem 2rem;
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  color: var(--gray-200, #e5e7eb);
  line-height: 1;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  margin: 1rem 0 0.5rem;
}

.error-message {
  font-size: 1rem;
  color: var(--gray-500, #6b7280);
  margin: 0 0 2rem;
}
</style>
