<script setup lang="ts">
import { useForm, validators } from '@/composables/useForm'

const isSubmitted = ref(false)

const { formData, errors, handleSubmit, validateField } = useForm({
  initialValues: {
    email: '',
  },
  rules: {
    email: [validators.required(), validators.email()],
  },
  onSubmit: async () => {
    // TODO: Implement forgot password API call
    isSubmitted.value = true
  },
})
</script>

<template>
  <div class="forgot-password-view">
    <h2 class="view-title">비밀번호 찾기</h2>
    
    <template v-if="!isSubmitted">
      <p class="view-description">
        가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
      </p>
      
      <form
        class="forgot-form"
        @submit.prevent="handleSubmit"
      >
        <BaseInput
          v-model="formData.email"
          type="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          :error="errors['email']"
          @blur="() => validateField('email')"
        />
        
        <BaseButton
          type="submit"
          block
        >
          재설정 링크 보내기
        </BaseButton>
      </form>
    </template>
    
    <template v-else>
      <div class="success-message">
        <div class="success-icon">✓</div>
        <h3>이메일을 확인하세요</h3>
        <p>
          <strong>{{ formData.email }}</strong>로 비밀번호 재설정 링크를 보냈습니다.
          이메일을 확인하여 비밀번호를 재설정하세요.
        </p>
      </div>
    </template>
    
    <p class="back-link">
      <RouterLink to="/auth/login">← 로그인으로 돌아가기</RouterLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password-view {
  width: 100%;
}

.view-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900, #111827);
  margin: 0 0 0.5rem;
  text-align: center;
}

.view-description {
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  margin: 0 0 1.5rem;
}

.forgot-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background-color: #f0fdf4;
  border-radius: var(--radius-lg, 8px);

  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    border-radius: 50%;
    background-color: #22c55e;
    color: white;
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--gray-900, #111827);
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: var(--gray-600, #4b5563);
    margin: 0;
  }
}

.back-link {
  text-align: center;
  margin: 1.5rem 0 0;

  a {
    font-size: 0.875rem;
    color: var(--primary-color, #1890ff);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
