<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent): void {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--block': block, 'btn--loading': loading }
    ]"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="btn__spinner"
    />
    <span class="btn__content">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: var(--radius-md, 6px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Sizes
  &--sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  &--md {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  &--lg {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  // Variants
  &--primary {
    background-color: var(--primary-color, #1890ff);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--primary-color-dark, #096dd9);
    }
  }

  &--secondary {
    background-color: var(--gray-100, #f3f4f6);
    color: var(--gray-700, #374151);

    &:hover:not(:disabled) {
      background-color: var(--gray-200, #e5e7eb);
    }
  }

  &--success {
    background-color: var(--success-color, #52c41a);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--success-color-dark, #389e0d);
    }
  }

  &--warning {
    background-color: var(--warning-color, #faad14);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--warning-color-dark, #d48806);
    }
  }

  &--danger {
    background-color: var(--danger-color, #ff4d4f);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--danger-color-dark, #cf1322);
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--primary-color, #1890ff);

    &:hover:not(:disabled) {
      background-color: var(--primary-color-light, #e6f7ff);
    }
  }

  &--block {
    width: 100%;
  }

  &--loading {
    position: relative;
    pointer-events: none;

    .btn__content {
      opacity: 0;
    }
  }

  &__spinner {
    position: absolute;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
