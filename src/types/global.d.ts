import en from "@/i18n/locales/en.json";

type Messages = typeof en;

declare global {
  // Use type-safe message keys with `next-intl`
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
