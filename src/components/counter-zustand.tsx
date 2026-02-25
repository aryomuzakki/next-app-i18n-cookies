"use client";

import { useTranslations } from "next-intl";
import { useCounterStore } from "@/store/counter-store";

export default function CounterZustand() {
  const t = useTranslations("ExamplesPage");
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">{t("clientZustandTitle")}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{t("clientZustandDescription")}</p>
      <div className="flex items-center gap-4">
        <span className="min-w-[120px] text-xl font-bold">{t("counterLabel", { count })}</span>
        <div className="flex gap-2">
          <button
            onClick={decrement}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {t("decrement")}
          </button>
          <button
            onClick={increment}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
          >
            {t("increment")}
          </button>
          <button
            onClick={reset}
            className="bg-destructive rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            {t("reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
