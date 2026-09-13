# AI Agent Guide: Cookie-Based i18n for Next.js App Router

This document is an actionable, step-by-step implementation guide for an AI agent (or developer) to integrate cookie-based internationalization (`next-intl`) into a Next.js App Router project without URL prefix routing (no `[locale]` segments).

---

## 📌 Scenario Selection

- **New Project**: If the user wants a brand new project, suggest cloning this starter directly:
  ```bash
  git clone https://github.com/aryomuzakki/next-app-i18n-cookies.git <project-name>
  cd <project-name>
  bun install # or npm install / pnpm install / yarn install
  ```
- **Existing Project**: Follow the step-by-step instructions below to integrate into the user's existing codebase.

---

## 🎯 Architecture Overview

Unlike standard `next-intl` setups that require wrapping all routes in an `app/[locale]/` dynamic segment, this approach keeps all routes clean (e.g., `/`, `/dashboard`, `/about`) and relies on:
1. **Durable Cookie (`next_app_i18n_locale`)**: Stores the active user locale with a 1-year expiration and `SameSite=Lax`.
2. **First-Visit Auto Negotiation**: Automatically parses the browser's `Accept-Language` header (with quality weighting) if no cookie exists yet.
3. **Smooth Client Transitions**: Uses React 19 / 18 `useTransition` + Server Action + `router.refresh()`. Changes language instantly without a full browser reload.
4. **Compile-Time Type Safety**: Types `IntlMessages` for strict autocompletion on `t("key")`.
5. **Server & Client Component Support**: Seamlessly use `getTranslations` in Server Components and `useTranslations` in Client Components.

---

## 🛠️ Step-by-Step Implementation for Existing Projects

### Step 1: Install Dependencies

Install `next-intl`:

```bash
# Using npm
npm install next-intl

# Using bun
bun add next-intl

# Using pnpm
pnpm add next-intl
```

---

### Step 2: Configure `next.config.ts` (or `next.config.mjs` / `next.config.js`)

Wrap your Next.js configuration with `createNextIntlPlugin`.

```typescript
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// By default, createNextIntlPlugin() looks for `./src/i18n/request.ts` or `./i18n/request.ts`
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* your existing config */
};

export default withNextIntl(nextConfig);
```

> **Note**: If your request config file is located at a custom path, pass it to `createNextIntlPlugin('./path/to/request.ts')`.

---

### Step 3: Define Locales & Constants

Create `src/lib/constant.ts` (or place in your project's constants file):

```typescript
// src/lib/constant.ts
export const LOCALE_COOKIE_NAME = "next_app_i18n_locale";
export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "id", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds
```

*(Adjust the `LOCALES` array and `DEFAULT_LOCALE` to match the project's supported languages.)*

---

### Step 4: Create Request Configuration (`src/i18n/request.ts`)

Create `src/i18n/request.ts`. This file runs on every request on the server to determine the active locale and load the corresponding translation messages.

```typescript
// src/i18n/request.ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, LOCALES, type Locale } from "@/lib/constant";

/**
 * Negotiates preferred locale from the browser's Accept-Language header.
 */
function getPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;

  const languages = acceptLanguageHeader
    .split(",")
    .map(item => {
      const [lang, qValue] = item.trim().split(";q=");
      return {
        code: lang.trim().toLowerCase(),
        quality: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    if (hasLocale(LOCALES, code)) {
      return code;
    }
    const primary = code.split("-")[0];
    if (hasLocale(LOCALES, primary)) {
      return primary;
    }
  }

  return DEFAULT_LOCALE;
}

export default getRequestConfig(async params => {
  // In Next.js 15+, cookies() and headers() are asynchronous
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  let locale: Locale;

  if (params.locale && hasLocale(LOCALES, params.locale)) {
    locale = params.locale;
  } else if (cookieLocale && hasLocale(LOCALES, cookieLocale)) {
    locale = cookieLocale;
  } else {
    const headersList = await headers();
    locale = getPreferredLocale(headersList.get("accept-language"));
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
```

---

### Step 5: Create Server Action to Persist Locale Cookie

Create `src/lib/actions/update-lang.ts`:

```typescript
// src/lib/actions/update-lang.ts
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
```

---

### Step 6: Create Translation Message Files

Create translation JSON files under `src/i18n/locales/`:

`src/i18n/locales/en.json`:
```json
{
  "Metadata": {
    "title": "My App",
    "description": "Internationalized Next.js application"
  },
  "LangSwitcher": {
    "label": "Language",
    "en": "English",
    "id": "Indonesia",
    "ja": "日本語"
  },
  "Home": {
    "welcome": "Welcome to our application!"
  }
}
```

`src/i18n/locales/id.json`:
```json
{
  "Metadata": {
    "title": "Aplikasi Saya",
    "description": "Aplikasi Next.js dengan internasionalisasi"
  },
  "LangSwitcher": {
    "label": "Bahasa",
    "en": "English",
    "id": "Indonesia",
    "ja": "日本語"
  },
  "Home": {
    "welcome": "Selamat datang di aplikasi kami!"
  }
}
```

`src/i18n/locales/ja.json`:
```json
{
  "Metadata": {
    "title": "マイアプリ",
    "description": "国際化されたNext.jsアプリケーション"
  },
  "LangSwitcher": {
    "label": "言語",
    "en": "English",
    "id": "Indonesia",
    "ja": "日本語"
  },
  "Home": {
    "welcome": "私たちのアプリケーションへようこそ！"
  }
}
```

---

### Step 7: Configure TypeScript Autocomplete for Translation Keys

Create or update `src/types/global.d.ts`:

```typescript
// src/types/global.d.ts
import en from "@/i18n/locales/en.json";

type Messages = typeof en;

declare global {
  // Use type-safe message keys with `next-intl`
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
```

Ensure `tsconfig.json` includes `"src/types/**/*.d.ts"` or `"**/*.d.ts"` in `include`.

---

### Step 8: Update Root Layout (`src/app/layout.tsx`)

Wrap your application in `NextIntlClientProvider` and optionally use `getTranslations` in `generateMetadata`:

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

### Step 9: Build Language Switcher Component

Create `src/components/lang-switcher.tsx`:

```tsx
// src/components/lang-switcher.tsx
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
      <span className="text-sm font-medium">{t("label")}:</span>
      <div className="flex gap-1" role="group" aria-label={t("label")}>
        {LOCALES.map(loc => {
          const isActive = loc === locale;
          return (
            <button
              key={loc}
              type="button"
              disabled={isPending}
              aria-pressed={isActive}
              onClick={() => handleChange(loc)}
              className={`rounded px-3 py-1 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
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
```

---

### Step 10: Usage in Pages and Components

#### In Server Components:
```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Home");
  return <h1>{t("welcome")}</h1>;
}
```

#### In Client Components:
```tsx
"use client";

import { useTranslations } from "next-intl";

export default function ClientWidget() {
  const t = useTranslations("Home");
  return <p>{t("welcome")}</p>;
}
```

---

## 🧪 Verification Checklist for AI Agents

1. **Build & Type Check**:
   - Run `bun run check` / `npm run check` (`tsc --noEmit`) to ensure translation keys and imports have no typing errors.
   - Run `bun run build` / `npm run build` to confirm `createNextIntlPlugin()` compiles successfully.
2. **Initial Visit (No Cookie)**:
   - Clear cookies, open browser with preferred language headers. Verify the app automatically chooses the matching supported locale, or falls back to `DEFAULT_LOCALE`.
3. **Language Switch**:
   - Click the language switcher. Verify `next_app_i18n_locale` cookie is set, no full page reload occurs, and Server & Client Components update instantaneously via `router.refresh()`.
4. **Persistence**:
   - Refresh the page or reopen browser. Verify the selected language persists.
