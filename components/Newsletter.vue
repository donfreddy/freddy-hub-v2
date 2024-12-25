<template>
  <UCard>
    <div class="mb-3 flex items-center gap-3">
      <UChip color="neutral" standalone inset />
      <h2 class="uppercase text-xs font-semibold text-gray-400">
        {{ $t("components.newsletter.title") }}
      </h2>
    </div>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      {{ $t("components.newsletter.subtitle") }}
    </p>
    <div class="flex items-center gap-3 mt-6">
      <UInput
        placeholder="youremail@gmail.com"
        icon="solar:letter-outline"
        class="flex-1"
        size="lg"
      />
      <UButton label="Subscribe &rarr;" size="lg" />
    </div>
  </UCard>
</template>
