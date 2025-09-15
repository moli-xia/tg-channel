import { c as createComponent, r as renderTemplate, e as renderComponent, b as createAstro } from '../../chunks/astro/server_DLfV5Tyk.mjs';
import { $ as $$List } from '../../chunks/list_l0IF2Vxs.mjs';
import { g as getChannelInfo } from '../../chunks/index_DXnZCgT9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$cursor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$cursor;
  const channel = await getChannelInfo(Astro2, {
    after: Astro2.params.cursor
  });
  channel.seo = {
    noindex: true
  };
  return renderTemplate`${renderComponent($$result, "List", $$List, { "channel": channel })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/after/[cursor].astro", void 0);

const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/after/[cursor].astro";
const $$url = "/after/[cursor]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$cursor,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
