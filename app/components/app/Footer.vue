<script setup lang="ts">
const currentYear = new Date().getFullYear();
const { socials } = useAppConfig();
</script>

<template>
  <footer class="">
    <div
      class="flex flex-col-reverse items-center w-full max-w-3xl px-4 py-6 mx-auto text-center sm:flex-row sm:justify-between sm:px-6 lg:px-8"
    >
      <span class="text-sm/10 text-zinc-500"
      >Copyright &copy; {{ currentYear }} Don Freddy.
        {{ $t('components.footer') }}</span
      >

     <div class="flex flex-wrap mb-3 space-x-2.5 sm:mb-0">
       <NuxtLink
         v-for="social in socials"
         :key="social.icon"
         :to="social.url"
         target="_blank"
         external
         class="hover:text-primary-400  transition-colors duration-300"
       >
         <Icon :name="social.icon" class="w-6 h-6"></Icon>
       </NuxtLink>
     </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
