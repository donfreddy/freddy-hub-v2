<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator color="#14b8a6" />
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

<script setup>
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
</script>
