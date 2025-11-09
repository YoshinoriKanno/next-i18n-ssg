// src/lib/site.ts
export const LOCALES = ["en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  name: "Your Site",
  locales: LOCALES,
} as const;

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}
