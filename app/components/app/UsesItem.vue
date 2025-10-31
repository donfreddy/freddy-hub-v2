<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li>
    <NuxtLink :to="item.url" class="group" target="_blank" external>
      <p
        class="text-base font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-primary-600 transition-all duration-300"
      >
        {{ item.name }}
      </p>
      <p class="text-sm text-muted">{{ item.description }}</p>
    </NuxtLink>
  </li>
</template>
