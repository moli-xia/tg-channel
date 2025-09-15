import { g as getChannelInfo } from '../chunks/index_DXnZCgT9.mjs';
export { renderers } from '../renderers.mjs';

async function GET(Astro) {
  const request = Astro.request;
  const url = new URL(request.url);
  const channel = await getChannelInfo(Astro);
  const posts = channel.posts || [];

  const pageSize = 20;
  let count = +posts[0]?.id;

  const pages = [];
  pages.push(count);
  while (count > pageSize) {
    count -= pageSize;
    pages.push(count);
  }

  const sitemaps = pages.map((page) => {
    return `
<sitemap>
  <loc>${url.origin}/sitemap/${page}.xml</loc>
</sitemap>`
  });

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.join('')}
</sitemapindex>`, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
