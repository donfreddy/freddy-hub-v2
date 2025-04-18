<script setup lang="ts">
const { t, locale } = useI18n();
const { me } = useAppConfig();

const description = t('pages.articles.subtitle');
useSeoMeta({
  title: `${t('pages.articles.title')} | ${me.fullName}`,
  description,
});

const { data: articles } = await useAsyncData('all-articles', () =>
  queryCollection(`articles_${locale.value}`)
    .select('title', 'slug', 'description', 'tags', 'publishedAt')
    .where('published', '=', Boolean(true))
    .order('publishedAt', 'DESC')
    .all(),
);
</script>

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
