export const options = {
  name: 'Don Freddy',
  shortDescription: 'A blag platform where I share my thoughts and ideas about software development.',
  description:
    "Freddy's Hub is a blog where I share my thoughts and ideas about software development and  technology in general.",
  url: 'https://donfreddy.com',
  loading: {
    color: 'var(--ui-primary)',
    background: 'var(--ui-bg)',
  },
  keywords: ['developer', 'software', 'technology', 'backend', 'frontend', 'fullstack', 'blog'],
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  //typescript: { typeCheck: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: options.name,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
        { name: 'keywords', content: options.keywords.join(', ') },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [],
    },
  },
  runtimeConfig: {
    public: {
      appName: options.name,
      appColor: options.loading.color,
    },
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n', '@nuxt/image', '@vueuse/nuxt'],
  content: {
    build: {
      pathMeta: {},
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'fr',
        name: 'Français',
      },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
});
