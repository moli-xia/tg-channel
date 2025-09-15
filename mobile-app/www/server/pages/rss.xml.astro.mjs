import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { g as getChannelInfo, a as getEnv } from '../chunks/index_DXnZCgT9.mjs';
export { renderers } from '../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
async function GET(Astro) {
  const { SITE_URL } = Astro.locals;
  const tag = Astro.url.searchParams.get("tag");
  const channel = await getChannelInfo(Astro, {
    q: tag ? `#${tag}` : ""
  });
  const posts = channel.posts || [];
  const request = Astro.request;
  const url = new URL(request.url);
  url.pathname = SITE_URL;
  url.search = "";
  const response = await rss({
    title: `${tag ? `${tag} | ` : ""}${channel.title}`,
    description: channel.description,
    site: url.origin,
    trailingSlash: false,
    stylesheet: getEnv(Object.assign(__vite_import_meta_env__, { RSS_BEAUTIFY: "" }), Astro, "RSS_BEAUTIFY") ? "/rss.xsl" : void 0,
    items: posts.map((item) => ({
      link: `posts/${item.id}`,
      title: item.title,
      description: item.description,
      pubDate: new Date(item.datetime),
      content: sanitizeHtml(item.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "video", "audio"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          video: ["src", "width", "height", "poster"],
          audio: ["src", "controls"],
          img: ["src", "srcset", "alt", "title", "width", "height", "loading", "class"]
        },
        exclusiveFilter(frame) {
          return frame.tag === "img" && frame.attribs?.class?.includes("modal-img");
        }
      })
    }))
  });
  response.headers.set("Content-Type", "text/xml");
  response.headers.set("Cache-Control", "public, max-age=3600");
  return response;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
