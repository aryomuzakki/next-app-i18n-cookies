"use server";

import { LOCALE_COOKIE_NAME } from "@/lib/constant";
import { cookies } from "next/headers";

export const updateLang = async (locale: string) => {
  const res = (await cookies()).set(LOCALE_COOKIE_NAME, locale);
  return res.get(LOCALE_COOKIE_NAME);
};
