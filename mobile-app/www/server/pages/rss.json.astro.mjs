import { g as getChannelInfo } from '../chunks/index_DXnZCgT9.mjs';
export { renderers } from '../renderers.mjs';

async function GET(Astro) {
  const { SITE_URL } = Astro.locals;
  const tag = Astro.url.searchParams.get('tag');
  const channel = await getChannelInfo(Astro, {
    q: tag ? `#${tag}` : '',
  });
  const posts = channel.posts || [];

  const request = Astro.request;
  const url = new URL(request.url);
  url.pathname = SITE_URL;
  url.search = '';

  return Response.json({
    version: 'https://jsonfeed.org/version/1.1',
    title: `${tag ? `${tag} | ` : ''}${channel.title}`,
    description: channel.description,
    home_page_url: url.toString(),
    items: posts.map(item => ({
      url: `${url.toString()}posts/${item.id}`,
      title: item.title,
      description: item.description,
      date_published: new Date(item.datetime),
      tags: item.tags,
      content_html: item.content,
    })),
  })
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
