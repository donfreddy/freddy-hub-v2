import en from "./locales/en.json";
import fr from "./locales/fr.json";


export default defineI18nConfig(() => ({
  legacy: false,
  messages: { en, fr },
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    },
    fr: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    },
  },
}));
