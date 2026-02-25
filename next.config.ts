import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";
const hideConsole = process.env.HIDE_CONSOLE ? process.env.HIDE_CONSOLE === "true" : isProd;

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  compiler: { removeConsole: hideConsole },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //     },
  //   ],
  // },
  async headers() {
    // secure for installed web app / pwa
    // https://nextjs.org/docs/app/guides/progressive-web-apps
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      // if use service worker for pwa features
      // {
      //   source: '/sw.js',
      //   headers: [
      //     {
      //       key: 'Content-Type',
      //       value: 'application/javascript; charset=utf-8',
      //     },
      //     {
      //       key: 'Cache-Control',
      //       value: 'no-cache, no-store, must-revalidate',
      //     },
      //     {
      //       key: 'Content-Security-Policy',
      //       value: "default-src 'self'; script-src 'self'",
      //     },
      //   ],
      // },
    ];
  },
};

export default withNextIntl(nextConfig);
