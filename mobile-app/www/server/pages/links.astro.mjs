import { c as createComponent, r as renderTemplate, e as renderComponent, b as createAstro, f as renderSlot, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_DLfV5Tyk.mjs';
import { $ as $$Header, a as $$Base } from '../chunks/header_MAu7La_Q.mjs';
import { g as getChannelInfo, a as getEnv } from '../chunks/index_CVafTiTZ.mjs';
export { renderers } from '../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const $$Astro = createAstro();
const $$Links = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Links;
  const channel = await getChannelInfo(Astro2);
  channel.seo = {
    title: "Links"
  };
  const links = (getEnv(Object.assign(__vite_import_meta_env__, { LINKS: "" }), Astro2, "LINKS") || "").split(";").filter(Boolean).map((link) => {
    link = link.split(",");
    return {
      title: link[0],
      href: link[1]
    };
  });
  if (!links.length) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "channel": channel, "id": "main-container" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["header"], renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "channel": channel })} `)} ${maybeRenderHead()}<div class="section-title">Links</div> <div class="tag-cloud"> ${links.map((link) => renderTemplate`<div class="tag-cloud-item"> <a${addAttribute(link.href, "href")} class="tag" target="_blank" rel="noopener"${addAttribute(link.title, "title")}> ${link.title} </a> </div>`)} </div> ` })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/links.astro", void 0);
const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/links.astro";
const $$url = "/links";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Links,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
