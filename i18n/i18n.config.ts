import en from '~~/i18n/locales/en-US.json';
import fr from '~~/i18n/locales/fr-FR.json';

export default defineI18nConfig(() => ({
  legacy: false,
  messages: { en, fr },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
  },
}));
