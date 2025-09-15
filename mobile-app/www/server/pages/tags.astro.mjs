import { c as createComponent, r as renderTemplate, e as renderComponent, b as createAstro, f as renderSlot, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_DLfV5Tyk.mjs';
import { $ as $$Header, a as $$Base } from '../chunks/header_Rl2dEKeB.mjs';
import { g as getChannelInfo, a as getEnv } from '../chunks/index_DXnZCgT9.mjs';
export { renderers } from '../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const $$Astro = createAstro();
const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tags;
  const channel = await getChannelInfo(Astro2);
  channel.seo = {
    title: "Tags"
  };
  const tags = (getEnv(Object.assign(__vite_import_meta_env__, { TAGS: "" }), Astro2, "TAGS") || "").split(",");
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "channel": channel, "id": "main-container" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["header"], renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "channel": channel })} `)} ${maybeRenderHead()}<div class="section-title">Tags</div> <div class="tag-cloud"> ${tags.map((tag) => renderTemplate`<div class="tag-cloud-item"> <a${addAttribute(`/search/%23${tag}`, "href")} class="tag"> ${tag} </a>  </div>`)} </div> ` })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/tags.astro", void 0);
const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/tags.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tags,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
