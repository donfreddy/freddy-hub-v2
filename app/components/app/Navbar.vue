<template>
  <div ref="headerRef" :style="styles" class="fixed top-0 w-full z-50">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <ul
        class="flex items-center my-4 px-3 text-sm font-medium text-zinc-800 rounded-full shadow-lg bg-white/90 shadow-zinc-800/5 ring-1 backdrop-filter backdrop-blur dark:bg-zinc-500/10 dark:text-zinc-200 dark:ring-white/20 ring-zinc-900/5"
      >
        <li v-for="item in items" :key="item.path">
          <UTooltip :text="item.name" :ui="{ popper: { strategy: 'absolute' } }">
            <ULink
              :to="$localePath(item.path)"
              class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
              active-class="text-primary-600 dark:text-primary-400"
            >
              <Icon aria-hidden="true" :name="item.icon" class="w-5 h-5 z-10" />
              <span
                v-if="$localeRoute(item.path).path === $route.path"
                class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0"
              ></span>
              <span
                v-if="$localeRoute(item.path).path === $route.path"
                class="absolute h-8 w-8 z-0 rounded-full bg-zinc-100 dark:bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></span>
              <span class="sr-only">{{ item.name }}</span>
            </ULink>
          </UTooltip>
        </li>
        <li class="flex-1"></li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useFixedHeader } from "vue-use-fixed-header";

const { t } = useI18n();
const headerRef = ref(null);
const { styles } = useFixedHeader(headerRef);

const items = [
  { name: t("nav.home"), path: "/", icon: "solar:home-smile-outline" },
  {
    name: t("nav.projects"),
    path: "/projects",
    icon: "solar:folder-with-files-outline",
  },
  {
    name: t("nav.articles"),
    path: "/articles",
    icon: "solar:document-add-outline",
  },
];
</script>
