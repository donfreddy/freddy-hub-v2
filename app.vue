<template>
  <div>
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <AppNavbar />
    <div class="h-32"></div>
    <UContainer>
      <NuxtPage />
      <div class="h-32"></div>
      <Newsletter />
    </UContainer>
    <div class="h-32"></div>
    <AppFooter />
  </div>
</template>

<script setup>
// const { locale } = useI18n();
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
