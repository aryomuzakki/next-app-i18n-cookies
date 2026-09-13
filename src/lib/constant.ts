export const LOCALE_COOKIE_NAME = "next_app_i18n_locale";
export const DEFAULT_LOCALE = "en";
// export const LOCALES = ["en", "id", "ja", "zh-Hans", "zh-Hant"] as const;
export const LOCALES = ["en", "id", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

