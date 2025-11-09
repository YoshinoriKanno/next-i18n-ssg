// src/app/[locale]/works/page.tsx
import { getDictionary, tFactory } from "@/lib/i18n";
import { isLocale } from "@/lib/site";        // ★ これが必要
import { notFound } from "next/navigation";

type Params = { locale: string };
type Props = { params: Promise<Params> };

export const dynamic = "error";

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale, "works");
  const t = tFactory(dict);
  return (
    <>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <ul className="mt-4 list-disc pl-6 space-y-2">
        <li>{t("item.sample1")}</li>
        <li>{t("item.sample2")}</li>
      </ul>
    </>
  );
}
