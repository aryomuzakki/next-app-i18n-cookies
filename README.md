# Next.js + next-intl i18n Project Setup

Initialized a **Next.js 16** project with **next-intl** for internationalization

### Stack Installed
- **Next.js 16.1.6** (App Router, Turbopack)
- **TypeScript**, **Tailwind CSS v4**, **ESLint**
- **Prettier** + `prettier-plugin-tailwindcss`
- **shadcn/ui** (default config)
- **next-intl** (locale-based routing)

### Locales Configured
- `en` (English) — default
- `id` (Indonesian)

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx    ← Locale layout with NextIntlClientProvider
│   │   └── page.tsx      ← Demo page with translated content + locale switch
│   └── globals.css       ← Tailwind + shadcn CSS variables
├── i18n/
│   ├── routing.ts        ← Central routing config (locales, defaultLocale)
│   ├── navigation.ts     ← Locale-aware Link, useRouter, etc.
│   └── request.ts        ← Server request config (loads translation JSON)
├── lib/
│   └── utils.ts          ← shadcn cn() utility
└── proxy.ts              ← Locale middleware (Next.js 16 uses proxy.ts)
messages/
├── en.json               ← English translations
└── id.json               ← Indonesian translations
```

## Key Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Wrapped with `createNextIntlPlugin()` |
| `routing.ts` | Defines supported locales (`en`, `id`) and default |
| `proxy.ts` | Handles locale detection and routing |
| `request.ts` | Loads message JSON based on resolved locale |
| `navigation.ts` | Exports locale-aware `Link`, `useRouter`, etc. |
| `layout.tsx` | Validates locale, provides `NextIntlClientProvider` |
| `page.tsx` | Demo page with `useTranslations` and locale switch |


---

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
