# Next.js + next-intl i18n (Cookie-Based)

Internationalized **Next.js 16** app using **next-intl** with **cookie-based** locale detection — no `[locale]` route parameter, no next-intl routing.

### Stack

- **Next.js 16** (App Router, Turbopack, React Compiler)
- **TypeScript**, **Tailwind CSS v4**, **ESLint**
- **Prettier** + `prettier-plugin-tailwindcss`
- **shadcn/ui**
- **next-intl** (cookie-based, no routing)
- **next-themes** (light / dark / system)
- **Zustand** (UI state demos)

### Locales Configured

- `en` (English) — default
- `id` (Indonesian)
- `ja` (Japanese)

## How It Works

1. The active locale is stored in a cookie (`next_app_i18n_locale`).
2. `request.ts` reads the cookie via `cookies()` and loads the matching translation JSON.
3. A server action (`update-lang.ts`) sets the cookie when the user switches languages.
4. No `[locale]` dynamic segment — all routes live directly under `app/`.
5. No next-intl routing, navigation helpers, or middleware/proxy are used.

## Project Structure

```
src/
├── app/
│   ├── examples/
│   │   └── page.tsx          ← Demo page (server info, counters)
│   ├── globals.css           ← Tailwind + shadcn CSS variables
│   ├── layout.tsx            ← Root layout with NextIntlClientProvider
│   └── page.tsx              ← Home page with translated content
├── components/
│   ├── counter-zustand.tsx   ← Zustand counter demo
│   ├── counter.tsx           ← Client counter demo
│   ├── lang-switcher.tsx     ← Language switcher (calls server action)
│   ├── server-info.tsx       ← Server component demo
│   ├── theme-provider.tsx    ← next-themes provider
│   └── theme-toggle.tsx      ← Theme toggle button
├── hooks/
│   └── use-is-client.tsx     ← Client-side detection hook
├── i18n/
│   ├── locales/
│   │   ├── en.json           ← English translations
│   │   ├── id.json           ← Indonesian translations
│   │   └── ja.json           ← Japanese translations
│   └── request.ts            ← Reads locale cookie → loads messages
├── lib/
│   ├── actions/
│   │   └── update-lang.ts    ← Server action to set locale cookie
│   ├── constant.ts           ← LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE_NAME
│   └── utils.ts              ← cn() utility
└── store/
    └── counter-store.ts      ← Zustand counter store
```

## Key Files

| File                | Purpose                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `next.config.ts`    | Wrapped with `createNextIntlPlugin()`                             |
| `constant.ts`       | Defines `LOCALES`, `DEFAULT_LOCALE`, and `LOCALE_COOKIE_NAME`     |
| `request.ts`        | Reads locale from cookie, loads translation JSON                  |
| `update-lang.ts`    | Server action — sets the locale cookie                            |
| `layout.tsx`        | Root layout with `NextIntlClientProvider` and `ThemeProvider`     |
| `lang-switcher.tsx` | Client component — buttons that call `updateLang()` server action |

---

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [next-intl Documentation](https://next-intl.dev) — learn about next-intl configuration and usage.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
