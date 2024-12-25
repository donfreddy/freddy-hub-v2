<template>
  <NuxtLink
    :to="localePath({ name: 'article-slug', params: { slug: article.slug } })"
    class="group"
  >
    <article>
      <time
        class="relative z-10 order-first mb-3 flex items-center text-sm text-gray-400 dark:text-gray-500 pl-3.5"
        datetime="2022-09-05"
        ><span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"
          ><span class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500"></span
        ></span>
        {{ $d(Date.parse(article.publishedAt), "short") }}
      </time>
      <h2
        class="text-base font-semibold font-display tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-primary-600"
      >
        {{ article.title }}
      </h2>
      <p class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
        {{ article.description }}
      </p>
      <div class="inline-flex flex-wrap my-2.5">
        <UBadge
          v-for="tag in article.tags"
          :key="tag"
          color="neutral"
          variant="outline"
          :label="tag"
          class="mr-2 text-xs"
        />
      </div>
    </article>
  </NuxtLink>
</template>

<script setup>
const localePath = useLocalePath();
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>
