<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  width?: string | number
  closable?: boolean
  closeOnClickOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '480px',
  closable: true,
  closeOnClickOverlay: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

function close(): void {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick(): void {
  if (props.closeOnClickOverlay) {
    close()
  }
}

// Prevent body scroll when modal is open
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

// Close on ESC key
function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.closable) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click.self="handleOverlayClick"
      >
        <div
          class="modal-container"
          :style="{ width: modalWidth }"
        >
          <header
            v-if="title || closable || $slots['header']"
            class="modal-header"
          >
            <slot name="header">
              <h3 class="modal-title">
                {{ title }}
              </h3>
            </slot>
            <button
              v-if="closable"
              type="button"
              class="modal-close"
              @click="close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </header>
          
          <div class="modal-body">
            <slot />
          </div>
          
          <footer
            v-if="$slots['footer']"
            class="modal-footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-container {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 2rem);
  background-color: white;
  border-radius: var(--radius-lg, 8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
}

.modal-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-md, 6px);
  background-color: transparent;
  color: var(--gray-400, #9ca3af);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-100, #f3f4f6);
    color: var(--gray-600, #4b5563);
  }
}

.modal-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--gray-200, #e5e7eb);
}

// Transition
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .modal-container {
    transition: transform 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-container {
    transform: scale(0.95) translateY(-20px);
  }
}
</style>
