// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n", "@nuxt/image"],
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "fr",
        name: "Français",
      },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    lazy: true,
    vueI18n: "./i18n.config.ts",
  },
});
