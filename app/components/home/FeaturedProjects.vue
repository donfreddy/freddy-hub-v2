<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath()

const projects = await queryCollection(`projects_${locale.value}`).limit(3).all();
</script>

<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-zinc-400 mb-6">
      {{ $t('pages.home.featured_projects') }}
    </h2>
    <div class="space-y-4">
      <ProjectCard v-for="(project, id) in projects" :key="id" :project="project" />
    </div>
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton
        :label="$t('pages.home.all_projects') + ' &rarr;'"
        :to="localePath('/projects')"
        variant="link"
        color="zinc"
      />
    </div>
  </div>
</template>
