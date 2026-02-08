<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// Initialize app
onMounted(() => {
  appStore.initialize()
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      name="fade"
      mode="out-in"
    >
      <component
        :is="Component"
        :key="route.path"
      />
    </Transition>
  </RouterView>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
