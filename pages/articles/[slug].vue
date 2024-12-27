<template>
  <main>
    <div class="mx-auto py-14">
      <div class="flex flex-col w-auto mb-20">
        <h1 class="text-xl font-bold text-fgColor sm:text-2xl md:text-4xl">
          {{ article.title }}
        </h1>

        <div
          class="flex flex-row items-center justify-start flex-1 space-x-1.5 text-xs my-6"
        >
          <span>Posted {{ passedDate(article.publishedAt) }}</span>

          <div
            class="self-stretch h-5 w-0.5 bg-gradient-to-tr from-transparent via-gray-800 dark:via-white to-transparent opacity-20"
          ></div>

          <span>Updated {{ passedDate(article.updatedAt) }}</span>

          <div
            class="self-stretch w-0.5 h-5 bg-gradient-to-tr from-transparent via-gray-800 dark:via-white to-transparent opacity-20"
          ></div>
          <span>{{ article.readingTime }} minutes read</span>
          <div
            class="self-stretch w-0.5 h-5 bg-gradient-to-tr from-transparent via-gray-800 dark:via-white to-transparent opacity-20"
          ></div>
          <span>Viewed {{ views }} times</span>
        </div>

        <!--  -->
        <div class="inline-flex space-x-2 my-2">
          <UBadge
            v-for="tag in article.tags"
            :key="tag"
            color="neutral"
            variant="outline"
            :label="tag"
            class="mr-2 text-xs"
          />
        </div>

        <!-- Divider -->
        <HorizontalBlurry />

        <!-- content -->
        <article
          class="py-4 prose-sm prose-hub prose max-w-none md:prose-base prose-img:rounded-md"
        >
          <ContentRenderer :value="article" />
        </article>

        <!-- Divider -->
        <HorizontalBlurry />
      </div>
    </div>
  </main>
</template>
<script setup>
import moment from "moment";

const route = useRoute();
const { slug } = route.params;

const { locale } = useI18n();

const views = ref(0);
onMounted(async () => {
  // Check localStorage to avoid duplicate calls
  const viewedPages = JSON.parse(localStorage.getItem("viewed_pages") || "[]");
  if (viewedPages.includes(slug)) return;

  try {
    const { views: currentViews } = await $fetch(`/api/views?slug=${slug}`, {
      method: "POST",
    });
    console.log("currentViews", currentViews);
    
    views.value = currentViews;

    // Mark the page as viewed
    viewedPages.push(slug);
    localStorage.setItem("viewed_pages", JSON.stringify(viewedPages));
  } catch (error) {
    console.error("Failed to save view count:", error);
  }
});

const { data: article } = await useAsyncData(slug, () =>
  queryCollection(`articles_${locale.value}`)
    .where("slug", "=", slug)
    .select(
      "title",
      "slug",
      "description",
      "tags",
      "body",
      "readingTime",
      "publishedAt",
      "updatedAt"
    )
    .first()
);

const passedDate = (value) => {
  locale.value === "fr"
    ? moment.updateLocale(locale.value, localeConfig.fr)
    : moment.locale("en");
  return moment(value, "YYYYMMDD").fromNow();
};
</script>
<style scoped></style>
