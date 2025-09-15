import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_DLfV5Tyk.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN" data-astro-cid-u2h3djql> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>后台登录</title>${renderHead()}</head> <body data-astro-cid-u2h3djql> <div class="card" data-astro-cid-u2h3djql> <h1 data-astro-cid-u2h3djql>管理后台登录</h1> <label data-astro-cid-u2h3djql>用户名</label> <input id="u" placeholder="admin" data-astro-cid-u2h3djql> <label data-astro-cid-u2h3djql>密码</label> <input id="p" type="password" placeholder="••••••" data-astro-cid-u2h3djql> <button id="b" data-astro-cid-u2h3djql>登录</button> <div class="msg" id="m" data-astro-cid-u2h3djql></div> </div>  </body> </html>`;
}, "/www/wwwroot/baoxiao.fun/app/src/pages/admin/index.astro", void 0);

const $$file = "/www/wwwroot/baoxiao.fun/app/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
