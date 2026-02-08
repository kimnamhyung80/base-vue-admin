<script setup lang="ts">
import { useForm, validators } from '@/composables/useForm'
import { useAuth } from '@/composables/useAuth'

const { login, isLoading, error } = useAuth()

const isDev = import.meta.env.DEV

const { formData, errors, handleSubmit, validateField } = useForm({
  initialValues: {
    email: '',
    password: '',
    rememberMe: false,
  },
  rules: {
    email: [validators.required(), validators.email()],
    password: [validators.required(), validators.minLength(6)],
  },
  onSubmit: async (values) => {
    await login({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    })
  },
})
</script>

<template>
  <div class="login-view">
    <h2 class="view-title">로그인</h2>
    
    <form
      class="login-form"
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
        v-model="formData.password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        :error="errors['password']"
        @blur="() => validateField('password')"
      />
      
      <div class="form-options">
        <label class="checkbox-label">
          <input
            v-model="formData.rememberMe"
            type="checkbox"
          />
          <span>로그인 상태 유지</span>
        </label>
        
        <RouterLink
          to="/auth/forgot-password"
          class="forgot-link"
        >
          비밀번호 찾기
        </RouterLink>
      </div>
      
      <BaseButton
        type="submit"
        :loading="isLoading"
        block
      >
        로그인
      </BaseButton>
      
      <p class="register-link">
        계정이 없으신가요?
        <RouterLink to="/auth/register">회원가입</RouterLink>
      </p>

      <!-- 테스트 계정 정보 (개발 환경에서만 표시) -->
      <div
        v-if="isDev"
        class="test-accounts"
      >
        <p class="test-title">테스트 계정</p>
        <p class="test-info">관리자: admin@example.com / password123</p>
        <p class="test-info">사용자: user@example.com / password123</p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  width: 100%;
}

.view-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  margin: 0 0 1.5rem;
  text-align: center;
}

.login-form {
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

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  cursor: pointer;

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
}

.forgot-link {
  font-size: 0.875rem;
  color: var(--primary-color, #1890ff);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.register-link {
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

.test-accounts {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md, 6px);
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
}

.test-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #0369a1;
  margin: 0 0 0.5rem;
}

.test-info {
  font-size: 0.75rem;
  color: #0c4a6e;
  margin: 0;
  font-family: monospace;
}
</style>
