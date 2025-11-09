// src/lib/i18n.ts
import type { Locale } from "@/lib/site";

type Dict = Record<string, string>;

/** 動的に JSON を読み込み、辞書を返す */
export async function getDictionary(locale: Locale, ns: string): Promise<Dict> {
  // 例: "@/locales/en/home.json"
  //     "@/locales/ja/works.json"
  const mod = await import(`@/locales/${locale}/${ns}.json`);
  return (mod as { default: Dict }).default;
}

/** t("key") で取り出せる関数を作る */
export function tFactory(dict: Dict) {
  return (key: string) => dict[key] ?? key;
}
