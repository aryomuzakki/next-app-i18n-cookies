"use server";

import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { COOKIE_MAX_AGE, DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES, type Locale } from "@/lib/constant";

export const updateLang = async (locale: Locale | string) => {
  const targetLocale = hasLocale(LOCALES, locale) ? locale : DEFAULT_LOCALE;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, targetLocale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true, locale: targetLocale };
};
