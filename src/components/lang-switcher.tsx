"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LangSwitcher");

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm font-medium">{t("label")}:</span>
      <div className="flex gap-1">
        {routing.locales.map(loc => (
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
