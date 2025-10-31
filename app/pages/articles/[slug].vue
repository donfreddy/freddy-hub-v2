<script setup>
import moment from 'moment';
import localeConfig from '~/utils/local-config.js';

const route = useRoute();
const { slug } = route.params;

const { locale } = useI18n();

const { data: article } = await useAsyncData(route.path, () =>
  queryCollection(`articles_${locale.value}`)
    .where('slug', '=', slug)
    .select(
      'title',
      'slug',
      'description',
      'tags',
      'body',
      'readingTime',
      'publishedAt',
      'updatedAt',
    )
    .first(),
);

const title = article.value.title;
const description = article.value.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

const passedDate = (value) => {
  locale.value === 'fr'
    ? moment.updateLocale(locale.value, localeConfig.fr)
    : moment.locale('en');
  return moment(value, 'YYYYMMDD').fromNow();
};
</script>

<template>
  <main>
    <div class="mx-auto">
      <div class="flex flex-col w-auto mb-20">
        <h1 class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted">
          {{ article.title }}
        </h1>

        <div
          class="flex flex-row items-center justify-start flex-1 space-x-1.5 font-normal text-sm my-4"
        >
          <span>{{
              $t('pages.article_detail.posted', { date: passedDate(article.publishedAt) })
            }}</span>

          <div
            class="self-stretch h-5 w-0.5 bg-gradient-to-tr from-transparent via-zinc-800 dark:via-white to-transparent opacity-20"
          ></div>

          <span>{{
              $t('pages.article_detail.updated', { date: passedDate(article.updatedAt) })
            }}</span>

          <div
            class="self-stretch w-0.5 h-5 bg-gradient-to-tr from-transparent via-zinc-800 dark:via-white to-transparent opacity-20"
          ></div>
          <span>{{
              $t('pages.article_detail.reading', { time: article.readingTime })
            }}</span>
        </div>

        <!--  -->
        <div class="inline-flex space-x-2">
          <UBadge
            v-for="tag in article.tags"
            :key="tag"
            color="neutral"
            variant="outline"
            :label="tag"
            size="md"
          />
        </div>

        <!-- Divider -->
        <HorizontalBlurry class="my-8" />

        <!-- content -->
        <ContentRenderer
          v-if="article"
          :value="article"
        />

        <!-- Divider -->
        <HorizontalBlurry class="my-8" />
      </div>
    </div>
  </main>
</template>
