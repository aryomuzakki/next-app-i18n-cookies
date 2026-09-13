"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES, type Locale } from "@/lib/constant";
import { updateLang } from "@/lib/actions/update-lang";

export default function LangSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LangSwitcher");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(newLocale: Locale) {
    if (newLocale === locale) return;

    startTransition(async () => {
      await updateLang(newLocale);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm font-medium">{t("label")}:</span>
      <div
        className="flex gap-1"
        role="group"
        aria-label={t("label")}
      >
        {LOCALES.map(loc => {
          const isActive = loc === locale;
          return (
            <button
              key={loc}
              type="button"
              disabled={isPending}
              aria-pressed={isActive}
              onClick={() => handleChange(loc)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              } ${isPending ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {t(loc)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
