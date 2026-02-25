"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/use-is-client";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeToggle");
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium">{t("label")}:</span>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="bg-secondary size-9 animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  const modes = [
    { value: "light", icon: Sun },
    { value: "dark", icon: Moon },
    { value: "system", icon: Monitor },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm font-medium">{t("label")}:</span>
      <div className="flex gap-1">
        {modes.map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex size-9 items-center justify-center rounded-md transition-all duration-200",
              theme === value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
            )}
            aria-label={t(value)}
            title={t(value)}
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
