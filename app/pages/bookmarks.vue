<script setup lang="ts">
const { t, locale } = useI18n();
const { me } = useAppConfig();

const description = t('pages.bookmarks.subtitle');

useSeoMeta({
  title: `${t('pages.bookmarks.title')} | ${me.fullName}`,
  description,
});

const bookmarks = [
  {
    id: 1,
    label: 'Roadmap.sh - Roadmap to learn web development',
    url: 'https://roadmap.sh',
  },
  {
    id: 2,
    label: 'Hoppscotch - API testing tool',
    url: 'https://hoppscotch.io',
  },
  {
    id: 3,
    label: 'Dicebear - Avatar generator',
    url: 'https://www.dicebear.com',
  },
  {
    id: 4,
    label: 'Convert a color - Color converter',
    url: 'https://convertacolor.com',
  },
  {
    id: 5,
    label: 'Beautiful Gradient Generator',
    url: 'https://joshwcomeau.com/gradient-generator/',
  },
  {
    id: 6,
    label: 'Tines - Beautiful landing page',
    url: 'https://tines.com/product',
  },
  {
    id: 7,
    label: 'SVG Spinners',
    url: 'https://github.com/n3r4zzurr0/svg-spinners',
  },
  {
    id: 8,
    label: 'REQRES Mock apis for testing',
    url: 'https://reqres.in/',
  },
  {
    id: 9,
    label: 'IP API - IP geolocation API',
    url: 'https://ipapi.is/',
  },
];

function getHost(url: string) {
  const parsedUrl = new URL(url);
  let host = parsedUrl.host;
  if (host.startsWith('www.')) {
    host = host.substring(4);
  }
  return host;
}

function getThumbnail(url: string) {
  const host = getHost(url);
  return `https://logo.clearbit.com/${host}`;
}
</script>

<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" :title="$t('nav.bookmarks')" :description="description" />
    <ul class="space-y-2">
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        <a
          :href="bookmark.url"
          target="_blank"
          class="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0"
        >
          <UAvatar
            :src="getThumbnail(bookmark.url)"
            :alt="bookmark.label"
            :ui="{ image: 'rounded-md' }"
          />
          <p class="truncate text-gray-700 dark:text-gray-200">
            {{ bookmark.label }}
          </p>
          <span class="flex-1"></span>
          <span class="text-xs font-medium text-gray-400 dark:text-gray-600">
            {{ getHost(bookmark.url) }}
          </span>
        </a>
      </li>
    </ul>
  </main>
</template>
