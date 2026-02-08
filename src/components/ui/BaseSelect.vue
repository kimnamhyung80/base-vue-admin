<script setup lang="ts">
import type { SelectOption } from '@/types'

interface Props {
  modelValue: string | number | null
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '선택하세요',
  disabled: false,
  size: 'md',
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  change: [value: string | number | null]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue)
})

function toggleDropdown(): void {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

function selectOption(option: SelectOption): void {
  if (option.disabled) return
  
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

function handleClear(event: MouseEvent): void {
  event.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent): void {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}
</script>

<template>
  <div
    ref="selectRef"
    :class="['select-wrapper', `select-wrapper--${size}`]"
  >
    <label
      v-if="label"
      class="select-label"
    >
      {{ label }}
    </label>
    
    <div
      :class="[
        'select-trigger',
        {
          'select-trigger--open': isOpen,
          'select-trigger--error': error,
          'select-trigger--disabled': disabled
        }
      ]"
      @click="toggleDropdown"
    >
      <span :class="['select-value', { 'select-placeholder': !selectedOption }]">
        {{ selectedOption?.label ?? placeholder }}
      </span>
      
      <button
        v-if="clearable && selectedOption"
        type="button"
        class="select-clear"
        @click="handleClear"
      >
        ×
      </button>
      
      <span class="select-arrow">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" />
        </svg>
      </span>
    </div>
    
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="select-dropdown"
      >
        <div
          v-for="option in options"
          :key="option.value"
          :class="[
            'select-option',
            {
              'select-option--selected': option.value === modelValue,
              'select-option--disabled': option.disabled
            }
          ]"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </Transition>
    
    <p
      v-if="error"
      class="select-error"
    >
      {{ error }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  &--sm {
    .select-trigger {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  }

  &--md {
    .select-trigger {
      padding: 0.5rem 0.875rem;
      font-size: 1rem;
    }
  }

  &--lg {
    .select-trigger {
      padding: 0.75rem 1rem;
      font-size: 1.125rem;
    }
  }
}

.select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700, #374151);
}

.select-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--gray-300, #d1d5db);
  border-radius: var(--radius-md, 6px);
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &--open {
    border-color: var(--primary-color, #1890ff);
    box-shadow: 0 0 0 2px var(--primary-color-light, rgba(24, 144, 255, 0.1));
  }

  &--error {
    border-color: var(--danger-color, #ff4d4f);
  }

  &--disabled {
    background-color: var(--gray-100, #f3f4f6);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.select-value {
  flex: 1;
  color: var(--gray-900, #111827);
}

.select-placeholder {
  color: var(--gray-400, #9ca3af);
}

.select-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--gray-300, #d1d5db);
  color: var(--gray-600, #4b5563);
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-400, #9ca3af);
  }
}

.select-arrow {
  display: flex;
  align-items: center;
  color: var(--gray-400, #9ca3af);
  transition: transform 0.2s ease;

  .select-trigger--open & {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 0.25rem;
  padding: 0.25rem 0;
  border: 1px solid var(--gray-200, #e5e7eb);
  border-radius: var(--radius-md, 6px);
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-height: 240px;
  overflow-y: auto;
}

.select-option {
  padding: 0.5rem 0.875rem;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover:not(.select-option--disabled) {
    background-color: var(--gray-50, #f9fafb);
  }

  &--selected {
    background-color: var(--primary-color-light, #e6f7ff);
    color: var(--primary-color, #1890ff);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.select-error {
  font-size: 0.75rem;
  color: var(--danger-color, #ff4d4f);
  margin: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
