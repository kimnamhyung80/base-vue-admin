// Re-export all types
export * from './api'
export * from './user'

// Common utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Recordable<T = unknown> = Record<string, T>

// Function types
export type Fn<T = void> = () => T
export type AsyncFn<T = void> = () => Promise<T>
export type PromiseFn<T = void, R = void> = (arg: T) => Promise<R>

// Component types
export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

// Form types
export interface FormState<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isDirty: boolean
}

// Table types
export interface TableColumn<T = unknown> {
  key: keyof T | string
  title: string
  width?: number | string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, row: T, index: number) => unknown
}

// Select option type
export interface SelectOption<T = string | number> {
  label: string
  value: T
  disabled?: boolean
}

// Tree node type
export interface TreeNode<T = unknown> {
  id: string | number
  label: string
  children?: TreeNode<T>[]
  data?: T
  disabled?: boolean
  expanded?: boolean
}
