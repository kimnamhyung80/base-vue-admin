<script setup lang="ts">
// Auth layout - minimal layout for authentication pages
</script>

<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-header">
        <h1 class="auth-logo">VueBase</h1>
        <p class="auth-subtitle">Enterprise Application</p>
      </div>
      
      <div class="auth-content">
        <RouterView />
      </div>
      
      <div class="auth-footer">
        <p>&copy; {{ new Date().getFullYear() }} VueBase. All rights reserved.</p>
      </div>
    </div>
    
    <div class="auth-background">
      <div class="auth-pattern" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
}

.auth-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  background-color: white;

  @media (min-width: 1024px) {
    padding: 3rem;
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color, #1890ff);
  margin: 0 0 0.5rem;
}

.auth-subtitle {
  font-size: 0.875rem;
  color: var(--gray-500, #6b7280);
  margin: 0;
}

.auth-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-footer {
  text-align: center;
  padding-top: 2rem;

  p {
    font-size: 0.75rem;
    color: var(--gray-400, #9ca3af);
    margin: 0;
  }
}

.auth-background {
  display: none;
  flex: 1;
  background: linear-gradient(135deg, var(--primary-color, #1890ff) 0%, #096dd9 100%);
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    display: block;
  }
}

.auth-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
