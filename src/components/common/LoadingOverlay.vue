<script setup lang="ts">
import { useAppStore } from '@/stores/app'

interface Props {
  show?: boolean
  text?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  text: '',
  fullscreen: false,
})

const appStore = useAppStore()

const isVisible = computed(() => props.show || appStore.isLoading)
const loadingText = computed(() => props.text || appStore.loadingText || '로딩 중...')
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        :class="['loading-overlay', { 'loading-overlay--fullscreen': fullscreen }]"
      >
        <div class="loading-content">
          <div class="loading-spinner" />
          <p
            v-if="loadingText"
            class="loading-text"
          >
            {{ loadingText }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  z-index: 9999;

  &--fullscreen {
    background-color: white;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-200, #e5e7eb);
  border-top-color: var(--primary-color, #1890ff);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
