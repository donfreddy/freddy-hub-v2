<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" :title="$t('nav.articles')" :description="description" />
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <ArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const { t, locale } = useI18n();

const description = t("pages.articles.subtitle");
useSeoMeta({
  title: `${t("nav.projects")} | Don Freddy`,
  description,
});

const { data: articles } = await useAsyncData(locale.value, () =>
  queryCollection(`articles_${locale.value}`)
    //.where("published", "==", true)
    .order("publishedAt", "DESC")
    .select("title", "slug", "description", "tags", "publishedAt")
    .all()
);
</script>

<style></style>
