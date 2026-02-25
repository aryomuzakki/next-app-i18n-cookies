import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import LangSwitcher from "@/components/lang-switcher";
import ServerInfo from "@/components/server-info";
import Counter from "@/components/counter";
import CounterZustand from "@/components/counter-zustand";
import ThemeToggle from "@/components/theme-toggle";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ExamplesPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("ExamplesPage");

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          {t("backHome")}
        </Link>
        <div className="flex items-center gap-4">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Server Component Example */}
      <ServerInfo locale={locale} />

      {/* Client Component Example */}
      <Counter />

      {/* Client Component (Zustand) Example */}
      <CounterZustand />
    </div>
  );
}
