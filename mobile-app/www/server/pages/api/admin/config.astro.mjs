import { g as getConfig, s as setConfig } from '../../../chunks/config_ulrTIJGX.mjs';
export { renderers } from '../../../renderers.mjs';

function isLogin(Astro) {
  const cookie = Astro.request.headers.get('cookie') || '';
  return /(?:^|;\s*)admin_session=1(?:;|$)/.test(cookie)
}

async function GET(Astro) {
  if (!isLogin(Astro)) {
    return new Response('Unauthorized', { status: 401 })
  }
  const config = await getConfig();
  return new Response(JSON.stringify(config), { headers: { 'Content-Type': 'application/json' } })
}

async function POST(Astro) {
  if (!isLogin(Astro)) {
    return new Response('Unauthorized', { status: 401 })
  }
  const data = await Astro.request.json().catch(() => ({}));
  const updated = await setConfig(data);
  return new Response(JSON.stringify(updated), { headers: { 'Content-Type': 'application/json' } })
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
