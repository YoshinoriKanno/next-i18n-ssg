// src/app/[locale]/page.tsx
import { getDictionary, tFactory } from "@/lib/i18n";
import { isLocale } from "@/lib/site";        // ★ これが必要
import { notFound } from "next/navigation";

type Params = { locale: string };
type Props = { params: Promise<Params> };

export const dynamic = "error";

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();          // ★ ここで使用

  const dict = await getDictionary(locale, "home");
  const t = tFactory(dict);
  return (
    <>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("lead")}</p>
    </>
  );
}
