<template>
  <div>
    <h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
    <p class="mt-6 text-base">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
