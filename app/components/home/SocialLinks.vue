<script lang="ts" setup>
const { socials } = useAppConfig();
</script>

<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">FIND ME ON</h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="social in socials"
        :key="social.icon"
        :to="social.url"
        target="_blank"
        external
        class="flex items-end gap-4 dark:hover:text-gray-300 group"
      >
        <span class="text-sm">
          {{ social.name }}
        </span>
        <div
          class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
        ></div>
        <Icon :name="social.icon" class="w-6 h-6"></Icon>
      </NuxtLink>
    </div>
  </div>
</template>
