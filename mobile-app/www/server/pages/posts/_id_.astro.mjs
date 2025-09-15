import { c as createComponent, r as renderTemplate, e as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_DLfV5Tyk.mjs';
import { g as getChannelInfo, a as getEnv } from '../../chunks/index_CVafTiTZ.mjs';
import { v as voidFile } from '../../chunks/header_MAu7La_Q.mjs';
import { $ as $$List } from '../../chunks/list_CVtzwVov.mjs';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { SITE_URL } = Astro2.locals;
  const channelInfo = await getChannelInfo(Astro2);
  const post = await getChannelInfo(Astro2, {
    type: "post",
    id: Astro2.params.id
  });
  if (post?.__blocked) {
    return new Response("Not Found", { status: 404 });
  }
  const channel = {
    ...channelInfo || {},
    posts: [post],
    seo: post
  };
  const staticProxy = getEnv(Object.assign(__vite_import_meta_env__, { STATIC_PROXY: "" }), Astro2, "STATIC_PROXY") ?? "/static/";
  return renderTemplate`${renderComponent($$result, "List", $$List, { "channel": channel, "before": false, "after": false, "isItem": true }, { "header": ($$result2) => renderTemplate`${maybeRenderHead()}<div id="breadcrumb"> <img${addAttribute(channel?.avatar?.startsWith("http") ? staticProxy + channel?.avatar : voidFile.src, "src")}${addAttribute(channel?.title, "alt")} loading="eager" class="breadcrumb-avatar"> <div class="breadcrumb-title"> <a${addAttribute(SITE_URL, "href")} class="site-title"${addAttribute(channel?.title, "title")}> ${channel.title} </a> </div> </div>` })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/posts/[id].astro", void 0);
const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/posts/[id].astro";
const $$url = "/posts/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
