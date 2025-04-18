<script setup lang="ts">
const { t, locale } = useI18n();
const { me } = useAppConfig();

const description = t('pages.whats_in_my_bag.subtitle');

useSeoMeta({
  title: `${t('pages.whats_in_my_bag.title')} | ${me.fullName}`,
  description,
});

const categories = ['hardware', 'software', 'desk', 'others'];
const [hardware, software, desk, other] = await Promise.all(
  categories.map(category =>
    queryCollection(`uses_${locale.value}`).where('category', '=', category).all(),
  ),
);
</script>

<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      :title="$t('nav.whats_in_my_bag')"
      :description="description"
    />
    <div class="space-y-24">
      <ul class="space-y-8">
        <AppUsesHeader :title="$t('categories.hardware')" />
        <AppUsesItem v-for="(item, id) in hardware" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader :title="$t('categories.software')" />
        <AppUsesItem v-for="(item, id) in software" :key="id" :item="item" />
      </ul>
      <!--      <ul class="space-y-8">
              <AppUsesHeader :title="$t('categories.desk')" />
              <AppUsesItem v-for="(item, id) in desk" :key="id" :item="item" />
            </ul>
            <ul class="space-y-8">
              <AppUsesHeader :title="$t('categories.others')" />
              <AppUsesItem v-for="(item, id) in other" :key="id" :item="item" />
            </ul>-->
    </div>
  </main>
</template>
