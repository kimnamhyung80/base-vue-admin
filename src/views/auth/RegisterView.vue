<script setup lang="ts">
import { useForm, validators } from '@/composables/useForm'
import { useAuth } from '@/composables/useAuth'

const { register, isLoading, error } = useAuth()

const { formData, errors, handleSubmit, validateField } = useForm({
  initialValues: {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  },
  rules: {
    email: [validators.required(), validators.email()],
    username: [validators.required(), validators.minLength(2), validators.maxLength(20)],
    password: [validators.required(), validators.minLength(8)],
    confirmPassword: [validators.required(), validators.match('password', '비밀번호가 일치하지 않습니다.')],
  },
  onSubmit: async (values) => {
    await register({
      email: values.email,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    })
  },
})
</script>

<template>
  <div class="register-view">
    <h2 class="view-title">회원가입</h2>
    
    <form
      class="register-form"
      @submit.prevent="handleSubmit"
    >
      <div
        v-if="error"
        class="error-alert"
      >
        {{ error }}
      </div>
      
      <BaseInput
        v-model="formData.email"
        type="email"
        label="이메일"
        placeholder="이메일을 입력하세요"
        :error="errors['email']"
        @blur="() => validateField('email')"
      />
      
      <BaseInput
        v-model="formData.username"
        type="text"
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        :error="errors['username']"
        @blur="() => validateField('username')"
      />
      
      <BaseInput
        v-model="formData.password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        hint="최소 8자 이상"
        :error="errors['password']"
        @blur="() => validateField('password')"
      />
      
      <BaseInput
        v-model="formData.confirmPassword"
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력하세요"
        :error="errors['confirmPassword']"
        @blur="() => validateField('confirmPassword')"
      />
      
      <BaseButton
        type="submit"
        :loading="isLoading"
        block
      >
        회원가입
      </BaseButton>
      
      <p class="login-link">
        이미 계정이 있으신가요?
        <RouterLink to="/auth/login">로그인</RouterLink>
      </p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register-view {
  width: 100%;
}

.view-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  margin: 0 0 1.5rem;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-alert {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md, 6px);
  background-color: #fef2f2;
  color: #dc2626;
  font-size: 0.875rem;
}

.login-link {
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  margin: 0;

  a {
    color: var(--primary-color, #1890ff);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
