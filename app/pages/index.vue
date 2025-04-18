<script setup lang="ts">
const { t } = useI18n();
const { me } = useAppConfig();

useSeoMeta({
  title: `${me.fullName} | ${t('pages.home.meta.title')} `,
  description: t('pages.home.meta.description'),
});
</script>

<template>
  <main class="min-h-screen">
    <div class="space-y-24">
      <HomeIntro />
      <HomeSocialLinks />
      <HomeFeaturedProjects />
      <HomeFeaturedArticles />
    </div>
  </main>
</template>
