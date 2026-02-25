import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

type Props = {
  locale: string;
};

export default async function ServerInfo({ locale }: Props) {
  const header = await headers();
  const t = await getTranslations("ExamplesPage");
  const timestamp = new Date().toISOString();

  return (
    <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">{t("serverComponentTitle")}</h3>
      <p className="text-muted-foreground mb-3 text-sm">
        {t("serverComponentDescription", { locale })}
      </p>
      <p className="bg-muted text-muted-foreground rounded-md px-3 py-2 font-mono text-xs">
        {t("serverTimestamp", { timestamp })}
      </p>
      <ul className="bg-muted text-muted-foreground rounded-md px-3 py-2 font-mono text-xs">
        {[...header.entries()].slice(0, 5).map(([key, val], index) => (
          <li key={index}>
            {key} : {val}
          </li>
        ))}
        ... and {[...header.entries()].length} more entries
      </ul>
    </div>
  );
}
