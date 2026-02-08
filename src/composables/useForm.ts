import { reactive, ref, computed } from 'vue'

type ValidationRule = {
  validator: (value: unknown, formData?: Record<string, unknown>) => boolean | Promise<boolean>
  message: string
}

interface FormOptions<T extends Record<string, unknown>> {
  initialValues: T
  rules?: Partial<Record<keyof T, ValidationRule[]>>
  onSubmit?: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, unknown>>(options: FormOptions<T>) {
  const { initialValues, rules = {} as Partial<Record<keyof T, ValidationRule[]>>, onSubmit } = options

  // reactive 사용 - 템플릿에서 직접 접근 가능
  const formData = reactive<T>({ ...initialValues } as T)
  const errors = reactive<Record<string, string>>({})
  const touched = reactive<Record<string, boolean>>({})
  const isSubmitting = ref(false)
  const isValidating = ref(false)

  const isDirty = computed(() => {
    return Object.keys(initialValues).some(
      (key) => (formData as Record<string, unknown>)[key] !== initialValues[key as keyof T]
    )
  })

  const isValid = computed(() => {
    return Object.keys(errors).length === 0
  })

  async function validateField(field: keyof T): Promise<boolean> {
    const fieldKey = field as string
    const fieldRules = rules[field]
    if (!fieldRules) return true

    const value = (formData as Record<string, unknown>)[fieldKey]
    for (const rule of fieldRules) {
      const isFieldValid = await rule.validator(value, formData as Record<string, unknown>)
      if (!isFieldValid) {
        errors[fieldKey] = rule.message
        return false
      }
    }

    delete errors[fieldKey]
    return true
  }

  async function validate(): Promise<boolean> {
    isValidating.value = true
    const fields = Object.keys(rules) as (keyof T)[]
    const results = await Promise.all(fields.map(validateField))
    isValidating.value = false
    return results.every(Boolean)
  }

  function setFieldValue<K extends keyof T>(field: K, value: T[K]): void {
    (formData as Record<string, unknown>)[field as string] = value
    touched[field as string] = true
  }

  function setFieldError(field: keyof T, message: string): void {
    errors[field as string] = message
  }

  function clearFieldError(field: keyof T): void {
    delete errors[field as string]
  }

  function reset(): void {
    Object.assign(formData, initialValues)
    Object.keys(errors).forEach((key) => delete errors[key])
    Object.keys(touched).forEach((key) => delete touched[key])
  }

  async function handleSubmit(): Promise<void> {
    const isFormValid = await validate()
    if (!isFormValid || !onSubmit) return

    isSubmitting.value = true
    try {
      await onSubmit(formData as T)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    // State
    formData,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isDirty,
    isValid,

    // Methods
    validateField,
    validate,
    setFieldValue,
    setFieldError,
    clearFieldError,
    reset,
    handleSubmit,
  }
}

// Common validation rules
export const validators = {
  required: (message = '필수 입력 항목입니다.'): ValidationRule => ({
    validator: (value) => {
      if (typeof value === 'string') return value.trim().length > 0
      return value !== null && value !== undefined
    },
    message,
  }),

  email: (message = '올바른 이메일 형식이 아닙니다.'): ValidationRule => ({
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validator: (value) => (value as string).length >= min,
    message: message ?? `최소 ${min}자 이상 입력해주세요.`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    validator: (value) => (value as string).length <= max,
    message: message ?? `최대 ${max}자까지 입력 가능합니다.`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validator: (value) => regex.test(value as string),
    message,
  }),

  match: (fieldName: string, message = '값이 일치하지 않습니다.'): ValidationRule => ({
    validator: (value, formData) => formData?.[fieldName] === value,
    message,
  }),
}
