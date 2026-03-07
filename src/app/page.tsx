import { useTranslations } from "next-intl";
import LangSwitcher from "@/components/lang-switcher";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex items-center gap-4">
        <LangSwitcher />
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground max-w-md text-center text-lg">{t("description")}</p>
      </div>
      <Link
        href="/examples"
        className="bg-primary text-primary-foreground rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
      >
        {t("goToExamples")}
      </Link>
    </div>
  );
}
