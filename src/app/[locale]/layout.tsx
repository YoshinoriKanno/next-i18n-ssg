import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

type Params = { locale: string };
type Props = { children: React.ReactNode; params: Promise<Params> };

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }];
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === "ja" ? "ja_JP" : "en_US";

  return {
    alternates: {
      languages: { en: "/en", ja: "/ja", "x-default": "/en" },
    },
    openGraph: { siteName: SITE.name, locale: ogLocale },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params; // ← ここがポイント

  return (
    <html lang={locale}>
      <body className="min-h-dvh antialiased">
        <header className="p-4 flex gap-4 items-center border-b">
          <Link href={`/${locale}`}>{SITE.name}</Link>
          <nav className="ml-auto flex gap-2 text-sm">
            <Link href={`/${locale}`}>Home</Link>
            <Link href={`/${locale}/works`}>Works</Link>
          </nav>
        </header>
        <main className="p-6 max-w-3xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
