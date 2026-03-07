"use client";

import { useLocale, useTranslations } from "next-intl";
import { LOCALES } from "@/lib/constant";
import { updateLang } from "@/lib/actions/update-lang";

export default function LangSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LangSwitcher");

  async function handleChange(newLocale: string) {
    const cookieData = await updateLang(newLocale);
    console.log("Language Updated: ");
    console.log({ cookieData });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm font-medium">{t("label")}:</span>
      <div className="flex gap-1">
        {LOCALES.map(loc => (
          <button
            key={loc}
            onClick={() => handleChange(loc)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              loc === locale
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {t(loc)}
          </button>
        ))}
      </div>
    </div>
  );
}
