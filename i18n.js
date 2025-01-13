import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/public/locales/en/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: "en",
    resources,
  });

export default i18n;
