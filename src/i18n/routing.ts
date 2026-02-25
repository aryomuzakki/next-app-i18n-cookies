import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "id", "ja"],

  // Used when no locale matches
  defaultLocale: "en",

  // 'never'     → all locale uses "/" without prefix
  // 'as-needed' → default locale uses "/" without prefix, others use "/id", "/ja"
  // 'always'    → all locales use prefix: "/en", "/id", "/ja"
  // Change this value to switch between strategies
  localePrefix: "as-needed",

  localeCookie: {
    name: "next_app_i18n_locale",
    maxAge: 60 * 60 * 24 * 365, // one year
  },
});
