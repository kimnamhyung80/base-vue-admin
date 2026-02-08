<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  label?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  size: 'md',
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  clear: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

function handleFocus(event: FocusEvent): void {
  isFocused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent): void {
  isFocused.value = false
  emit('blur', event)
}

function handleClear(): void {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function focus(): void {
  inputRef.value?.focus()
}

function blur(): void {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<template>
  <div :class="['input-wrapper', `input-wrapper--${size}`]">
    <label
      v-if="label"
      class="input-label"
    >
      {{ label }}
    </label>
    
    <div
      :class="[
        'input-container',
        {
          'input-container--focused': isFocused,
          'input-container--error': error,
          'input-container--disabled': disabled
        }
      ]"
    >
      <slot name="prefix" />
      
      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="input-field"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      
      <button
        v-if="clearable && modelValue"
        type="button"
        class="input-clear"
        tabindex="-1"
        @click="handleClear"
      >
        ×
      </button>
      
      <slot name="suffix" />
    </div>
    
    <p
      v-if="error"
      class="input-error"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="input-hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700, #374151);
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--gray-300, #d1d5db);
  border-radius: var(--radius-md, 6px);
  background-color: white;
  transition: all 0.2s ease;
  overflow: hidden;

  &--focused {
    border-color: var(--primary-color, #1890ff);
    box-shadow: 0 0 0 2px var(--primary-color-light, rgba(24, 144, 255, 0.1));
  }

  &--error {
    border-color: var(--danger-color, #ff4d4f);

    &.input-container--focused {
      box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
    }
  }

  &--disabled {
    background-color: var(--gray-100, #f3f4f6);
    cursor: not-allowed;
  }
}

.input-field {
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background-color: white !important;
  color: #111827 !important;
  -webkit-text-fill-color: #111827 !important;
  line-height: 1.5;

  .input-wrapper--sm & {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  .input-wrapper--md & {
    padding: 0.625rem 0.875rem;
    font-size: 1rem;
  }

  .input-wrapper--lg & {
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
  }

  &::placeholder {
    color: #9ca3af;
    -webkit-text-fill-color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
    color: #6b7280 !important;
    -webkit-text-fill-color: #6b7280 !important;
    background-color: transparent !important;
  }

  // Chrome autofill 스타일 오버라이드
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: #111827 !important;
    box-shadow: 0 0 0 1000px white inset !important;
    caret-color: #111827 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
}

.input-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--gray-300, #d1d5db);
  color: var(--gray-600, #4b5563);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-400, #9ca3af);
  }
}

.input-error {
  font-size: 0.75rem;
  color: var(--danger-color, #ff4d4f);
  margin: 0;
}

.input-hint {
  font-size: 0.75rem;
  color: var(--gray-500, #6b7280);
  margin: 0;
}
</style>
