import { I18n } from 'vue-i18n'

declare module '#app' {
  interface NuxtApp {
    $i18n: ReturnType<typeof I18n>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t(key: string): string
  }
}