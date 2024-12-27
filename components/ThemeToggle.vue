<template>
  <UTooltip :text="text" :delay-duration="0" :ui="{ popper: { strategy: 'absolute' } }">
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400 cursor-pointer"
      @click="isDark = !isDark"
    >
      <Icon
        aria-hidden="true"
        :name="isDark ? 'solar:sun-2-outline' : 'solar:moon-outline'"
        class="w-5 h-5"
      />
      <span class="sr-only"> {{ text }} </span>
    </button>
  </UTooltip>
</template>

<script setup>
const colorMode = useColorMode();
const { t } = useI18n();

const text = computed(() => t("nav.toggle_theme"));

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
