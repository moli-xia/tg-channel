import { c as createComponent, r as renderTemplate, e as renderComponent, b as createAstro } from '../../chunks/astro/server_DLfV5Tyk.mjs';
import { $ as $$List } from '../../chunks/list_l0IF2Vxs.mjs';
import { g as getChannelInfo } from '../../chunks/index_DXnZCgT9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$q = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$q;
  const q = Astro2.url.searchParams.get("q") || Astro2.params.q;
  const channel = await getChannelInfo(Astro2, {
    q
  });
  channel.seo = {
    title: `${q}`
  };
  return renderTemplate`${renderComponent($$result, "List", $$List, { "channel": channel, "before": false, "after": false })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/search/[q].astro", void 0);

const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/search/[q].astro";
const $$url = "/search/[q]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$q,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
