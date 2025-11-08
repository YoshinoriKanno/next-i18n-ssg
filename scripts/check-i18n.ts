import fs from "node:fs";
import path from "node:path";

const candidates = ["locales", "src/locales"] as const;
const ROOT = (() => {
  for (const c of candidates) {
    const p = path.join(process.cwd(), c);
    if (fs.existsSync(p)) return p;
  }
  console.error("✖ locales ディレクトリが見つかりません。'locales' または 'src/locales' を作成してください。");
  process.exit(1);
})();

const enDir = path.join(ROOT, "en");
const jaDir = path.join(ROOT, "ja");

if (!fs.existsSync(enDir) || !fs.existsSync(jaDir)) {
  console.error("✖ locales/en と locales/ja が必要です。");
  process.exit(1);
}

const namespaces = fs.readdirSync(enDir).filter(f => f.endsWith(".json"));
let ok = true;

for (const ns of namespaces) {
  const en = JSON.parse(fs.readFileSync(path.join(enDir, ns), "utf8"));
  const jaPath = path.join(jaDir, ns);
  if (!fs.existsSync(jaPath)) {
    ok = false;
    console.error(`✖ Namespace: ${ns} が ja に存在しません`);
    continue;
  }
  const ja = JSON.parse(fs.readFileSync(jaPath, "utf8"));
  const enKeys = new Set(Object.keys(en));
  const jaKeys = new Set(Object.keys(ja));
  const missEn = [...jaKeys].filter(k => !enKeys.has(k));
  const missJa = [...enKeys].filter(k => !jaKeys.has(k));
  if (missEn.length || missJa.length) {
    ok = false;
    console.error(`✖ Namespace: ${ns}`);
    if (missEn.length) console.error("  Missing in en:", missEn);
    if (missJa.length) console.error("  Missing in ja:", missJa);
  }
}

if (!ok) process.exit(1);
console.log("✔ i18n keys OK");
