<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();
const lang = computed(() => locales[locale.value].code);

useHead({
  htmlAttrs: { lang },
});
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <SettingsLanguageToggle class="fixed right-5 z-50 bottom-5" />
    <AppNavbar />
    <div class="h-32"></div>
    <UContainer>
      <NuxtPage />
      <div class="h-32"></div>
      <Newsletter />
    </UContainer>
    <div class="h-32"></div>
    <AppFooter />
  </UApp>
</template>

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
