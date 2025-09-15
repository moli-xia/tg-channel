export { renderers } from '../../../renderers.mjs';

async function POST() {
  const headers = new Headers({
    'Content-Type': 'application/json',
    // 通过过期时间清除 cookie
    'Set-Cookie': 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
  });
  return new Response(JSON.stringify({ ok: true }), { headers })
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
