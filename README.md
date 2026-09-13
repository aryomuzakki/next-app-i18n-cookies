# Next.js + next-intl i18n (Cookie-Based)

Internationalized **Next.js 16** app using **next-intl** with **cookie-based** locale detection — no `[locale]` route parameter, no next-intl routing.

### Stack

- **Next.js 16** (App Router, Turbopack, React Compiler)
- **TypeScript**, **Tailwind CSS v4**, **ESLint**
- **Prettier** + `prettier-plugin-tailwindcss`
- **shadcn/ui**
- **next-intl** (cookie-based, no URL prefix routing)
- **next-themes** (light / dark / system)
- **Zustand** (UI state demos)

### Locales Configured

- `en` (English) — default
- `id` (Indonesian)
- `ja` (Japanese)

---

## 🤖 AI Agent & Integration Guide

Want to use or replicate this setup in another project?

- **New Project**: Clone this repository as a ready-to-use template:
  ```bash
  git clone https://github.com/aryomuzakki/next-app-i18n-cookies.git <project-name>
  ```
- **Existing Project (For AI Agents & Developers)**: Step-by-step instructions designed for an AI agent or developer to integrate cookie-based `next-intl` without breaking existing routing:
  - **Local Guide**: [AGENT_GUIDE.md](AGENT_GUIDE.md)
  - **Raw GitHub URL** *(for AI agents, curl, or web fetch tools)*:  
    `https://raw.githubusercontent.com/aryomuzakki/next-app-i18n-cookies/main/AGENT_GUIDE.md`
  - **Deployed Demo Path**: `/agent-guide.md` (or discoverable via `/llms.txt`)

> 💡 **Prompt for AI Coding Assistants**:  
> *"Please fetch the instructions at `https://raw.githubusercontent.com/aryomuzakki/next-app-i18n-cookies/main/AGENT_GUIDE.md` and follow them to add cookie-based next-intl i18n to this project."*

---

## How It Works

1. **Cookie-Based Persistence**: The active locale is stored in a durable cookie (`next_app_i18n_locale`) with a 1-year expiration and `SameSite=Lax`.
2. **First-Visit Auto Negotiation**: If no cookie exists (first visit), `request.ts` inspects the browser's `Accept-Language` header to automatically serve the visitor's preferred language before falling back to `DEFAULT_LOCALE`.
3. **Smooth Client Transitions**: `LangSwitcher` invokes the `updateLang` Server Action inside React's `startTransition` paired with `router.refresh()`. This triggers an instant React Server Component refresh without a hard browser reload and provides a non-blocking `isPending` indicator.
4. **End-to-End Type Safety**: `src/types/global.d.ts` registers `IntlMessages` so all translation keys used in `useTranslations()` and `getTranslations()` are strictly typed with full IDE autocompletion.
5. **Dynamic Localized Metadata**: Root layout utilizes `generateMetadata()` to dynamically translate document titles and descriptions.
6. **No `[locale]` Dynamic Segment**: All routes live cleanly under `app/` without subpath prefixes.

## Project Structure

```
src/
├── app/
│   ├── examples/
│   │   └── page.tsx          ← Demo page (server info, counters)
│   ├── globals.css           ← Tailwind + shadcn CSS variables
│   ├── layout.tsx            ← Root layout with NextIntlClientProvider & generateMetadata
│   └── page.tsx              ← Home page with translated content
├── components/
│   ├── counter-zustand.tsx   ← Zustand counter demo
│   ├── counter.tsx           ← Client counter demo
│   ├── lang-switcher.tsx     ← Language switcher with useTransition & router.refresh()
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
│   └── request.ts            ← Cookie reader & Accept-Language negotiator
├── lib/
│   ├── actions/
│   │   └── update-lang.ts    ← Server action to validate & persist locale cookie
│   ├── constant.ts           ← LOCALES, Locale type, DEFAULT_LOCALE, COOKIE_MAX_AGE
│   └── utils.ts              ← cn() utility
├── store/
│   └── counter-store.ts      ← Zustand counter store
└── types/
    └── global.d.ts           ← Type-safe next-intl message definitions
```

## Key Files

| File                | Purpose                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| `next.config.ts`    | Wrapped with `createNextIntlPlugin()`                                              |
| `constant.ts`       | Defines `LOCALES`, `Locale` type, `DEFAULT_LOCALE`, and `LOCALE_COOKIE_NAME`       |
| `request.ts`        | Reads locale cookie with `Accept-Language` fallback, loads translation messages     |
| `update-lang.ts`    | Server action — validates and sets the durable locale cookie                        |
| `layout.tsx`        | Root layout with `generateMetadata()`, `NextIntlClientProvider`, and `ThemeProvider`|
| `lang-switcher.tsx` | Client component — switches locale via `useTransition` and `router.refresh()`       |
| `global.d.ts`       | Declares `IntlMessages` for compile-time translation key type safety                |

---

## Scripts

```bash
# Start development server
bun dev # or npm run dev

# Run type check manually
bun run check # or npm run check

# Run linter
bun run lint # or npm run lint

# Build for production
bun run build # or npm run build
```

> **Note on Builds**: Type validation is bypassed in `next.config.ts` via `ignoreBuildErrors: true` for rapid builds. Run `bun run check` (or `npm run check`) in your CI/CD pipeline or before committing.
