<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-zinc-400 mb-6">
      {{ $t('pages.home.recent_articles') }}
    </h2>
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <ArticleCard :article="article" />
      </li>
    </ul>
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton
        :label="$t('pages.home.all_articles') + ' &rarr;'"
        :to="localePath('/articles')"
        variant="link"
        color="zinc"
      />
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();

const { data: articles } = await useAsyncData('projects-home', () =>
  queryCollection(`articles_${locale.value}`)
    .order('publishedAt', 'DESC')
    .select('title', 'slug', 'description', 'tags', 'publishedAt')
    .limit(3)
    .all(),
);
</script>
