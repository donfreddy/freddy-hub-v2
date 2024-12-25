<template>
  <div>
    <AppHeader
      class="mb-12"
      :title="$t('nav.projects')"
      :description="description"
    />
    <ul>
      <li v-for="project in projects" :key="project._id">
        <nuxt-link :to="`/projects/${project.slug}`">{{
          project.title
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();

const description = t("pages.projects.subtitle");
useSeoMeta({
  title: `${t("nav.projects")} | Don Freddy`,
  description,
});

const { data: projects } = await useAsyncData(locale.value, () =>
  queryCollection(`projects_${locale.value}`)
    //.where("published", "=", true)
    //.order("published_at", "DESC")
    // .select("title", "slug", "description", "tags")
    //.limit(3)
    .all()
);
</script>

<style></style>
