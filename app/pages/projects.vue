<script setup lang="ts">
const { t, locale } = useI18n();
const { me } = useAppConfig();

const description = t('pages.projects.subtitle');
useSeoMeta({
  title: `${t('pages.projects.title')} | ${me.fullName}`,
  description,
});

const projects = await queryCollection(`projects_${locale.value}`).all();
</script>

<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" :title="$t('nav.projects')" :description="description" />
    <div class="space-y-4">
      <ProjectCard v-for="(project, id) in projects" :key="id" :project="project" />
    </div>
  </main>
</template>
