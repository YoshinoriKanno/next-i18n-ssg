/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL ?? 'https://example.com';
export default {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  alternateRefs: [
    { href: `${siteUrl}/en`, hreflang: 'en' },
    { href: `${siteUrl}/ja`, hreflang: 'ja' },
    { href: `${siteUrl}`, hreflang: 'x-default' },
  ],
  transform: async (config, path) => {
    // 言語別URLを列挙（/en/*, /ja/*）
    const paths = path === '/' ? ['/en', '/ja'] : [`/en${path}`, `/ja${path}`];
    return paths.map((p) => ({
      loc: `${config.siteUrl}${p}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  },
};
