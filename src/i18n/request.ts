import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES, type Locale } from "@/lib/constant";

/**
 * Negotiates preferred locale from the browser's Accept-Language header.
 */
function getPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;

  const languages = acceptLanguageHeader
    .split(",")
    .map(item => {
      const [lang, qValue] = item.trim().split(";q=");
      return {
        code: lang.trim().toLowerCase(),
        quality: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    if (hasLocale(LOCALES, code)) {
      return code;
    }
    const primary = code.split("-")[0];
    if (hasLocale(LOCALES, primary)) {
      return primary;
    }
  }

  return DEFAULT_LOCALE;
}

export default getRequestConfig(async params => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  let locale: Locale;

  if (params.locale && hasLocale(LOCALES, params.locale)) {
    locale = params.locale;
  } else if (cookieLocale && hasLocale(LOCALES, cookieLocale)) {
    locale = cookieLocale;
  } else {
    const headersList = await headers();
    locale = getPreferredLocale(headersList.get("accept-language"));
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
