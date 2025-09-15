import { c as createComponent, r as renderTemplate, e as renderComponent, b as createAstro } from '../chunks/astro/server_DLfV5Tyk.mjs';
import { $ as $$List } from '../chunks/list_CVtzwVov.mjs';
import { g as getChannelInfo } from '../chunks/index_CVafTiTZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageSize = Astro2.locals?.config?.content?.maxPostsPerPage ?? 20;
  const offset = 0;
  const target = pageSize;
  let cursor = void 0;
  let tries = 0;
  const seen = /* @__PURE__ */ new Set();
  const dedup = [];
  while (dedup.length < target && tries < 30) {
    const batch = await getChannelInfo(Astro2, { before: cursor, raw: true });
    const posts = batch?.posts || [];
    if (posts.length === 0) break;
    for (const p of posts) {
      const id = String(p?.id ?? "");
      if (!id || seen.has(id)) continue;
      seen.add(id);
      dedup.push(p);
      if (dedup.length >= target) break;
    }
    cursor = batch.lastId || batch.beforeId || posts?.[0]?.id;
    tries++;
  }
  const display = dedup.slice(offset, target);
  let channel = await getChannelInfo(Astro2);
  channel = { ...channel, posts: display };
  let hasNext = dedup.length > target;
  let probeId = cursor;
  let probeTries = 0;
  while (!hasNext && probeId && probeTries < 3) {
    const nextBatch = await getChannelInfo(Astro2, { before: probeId, raw: true });
    if ((nextBatch?.posts?.length || 0) > 0) {
      hasNext = true;
      break;
    }
    const morePosts = nextBatch?.posts || [];
    probeId = nextBatch.lastId || nextBatch.beforeId || morePosts?.[0]?.id;
    probeTries++;
  }
  return renderTemplate`${renderComponent($$result, "List", $$List, { "channel": channel, "currentPage": 1, "hasNext": hasNext })}`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/index.astro", void 0);

const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
