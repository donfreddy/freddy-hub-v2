<template>
  <NuxtLinkLocale
    :to="localePath({ name: 'articles-slug', params: { slug: article.slug } })"
    class="group"
  >
    <article>
      <time
        class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
        datetime="2022-09-05"
        ><span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"
          ><span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span
        ></span>
        {{ $d(Date.parse(article.publishedAt), "short") }}
      </time>
      <h2
        class="text-base font-semibold transition-colors font-display tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-primary-600"
      >
        {{ article.title }}
      </h2>
      <p class="relative z-10 mt-2 text-sm text-muted">
        {{ article.description }}
      </p>
      <div class="inline-flex flex-wrap my-2">
        <UBadge
          v-for="tag in article.tags"
          :key="tag"
          color="neutral"
          variant="outline"
          :label="tag"
          class="mr-2 mb-2 sm:mb-0 text-xs"
        />
      </div>
    </article>
  </NuxtLinkLocale>
</template>

<script setup>
const localePath = useLocalePath();
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
//
</script>
