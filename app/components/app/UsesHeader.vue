<script lang="ts" setup>
defineProps({
  title: String,
});
</script>

<template>
  <li>
    <div
      class="relative after:-z-10 after:block after:h-[2px] after:absolute after:top-1/2 after:transform after:bg-gray-100 dark:after:bg-white/10 after:w-full after:left-0 after:right-0"
    >
      <span
        class="font-medium text-sm text-gray-600 dark:text-gray-500 bg-white dark:bg-zinc-900 pr-4"
      >{{ title }}</span
      >
    </div>
  </li>
</template>
