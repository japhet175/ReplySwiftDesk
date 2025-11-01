import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";
import rw from "./i18n/rw.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    rw: { translation: rw },
  },
  lng: "en", // Langue par défaut
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
