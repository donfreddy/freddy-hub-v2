<script setup>
const { t } = useI18n();

useSeoMeta({
  title: t('pages.home.meta.title'),
  description: t('pages.home.meta.description'),
});
</script>

<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />
      <HomeFeaturedProjects />
      <HomeFeaturedArticles />
    </div>
  </main>
</template>
