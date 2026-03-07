import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES } from "@/lib/constant";
import { cookies } from "next/headers";

export default getRequestConfig(async params => {
  const requested = params.locale || (await cookies())?.get(LOCALE_COOKIE_NAME)?.value;
  const locale = hasLocale(LOCALES, requested) ? requested : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
