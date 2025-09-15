import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Bkt8RdgS.mjs';
import { manifest } from './manifest_BHd9nUzX.mjs';
import { onRequest } from './_astro-internal_middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/settings.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/after/_cursor_.astro.mjs');
const _page4 = () => import('./pages/api/admin/config.astro.mjs');
const _page5 = () => import('./pages/api/admin/login.astro.mjs');
const _page6 = () => import('./pages/api/admin/logout.astro.mjs');
const _page7 = () => import('./pages/api/admin/upload.astro.mjs');
const _page8 = () => import('./pages/before/_cursor_.astro.mjs');
const _page9 = () => import('./pages/links.astro.mjs');
const _page10 = () => import('./pages/page/_page_.astro.mjs');
const _page11 = () => import('./pages/posts/_id_.astro.mjs');
const _page12 = () => import('./pages/rss.json.astro.mjs');
const _page13 = () => import('./pages/rss.xml.astro.mjs');
const _page14 = () => import('./pages/rules/prefetch.json.astro.mjs');
const _page15 = () => import('./pages/search/_q_.astro.mjs');
const _page16 = () => import('./pages/sitemap/_cursor_.xml.astro.mjs');
const _page17 = () => import('./pages/sitemap.xml.astro.mjs');
const _page18 = () => import('./pages/static/_---url_.astro.mjs');
const _page19 = () => import('./pages/tags.astro.mjs');
const _page20 = () => import('./pages/uploads/_---file_.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.15.1_@types+node@22.0.0_rollup@4.21.0_typescript@5.5.4/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/settings.astro", _page1],
    ["src/pages/admin/index.astro", _page2],
    ["src/pages/after/[cursor].astro", _page3],
    ["src/pages/api/admin/config.js", _page4],
    ["src/pages/api/admin/login.js", _page5],
    ["src/pages/api/admin/logout.js", _page6],
    ["src/pages/api/admin/upload.js", _page7],
    ["src/pages/before/[cursor].astro", _page8],
    ["src/pages/links.astro", _page9],
    ["src/pages/page/[page].astro", _page10],
    ["src/pages/posts/[id].astro", _page11],
    ["src/pages/rss.json.js", _page12],
    ["src/pages/rss.xml.js", _page13],
    ["src/pages/rules/prefetch.json.js", _page14],
    ["src/pages/search/[q].astro", _page15],
    ["src/pages/sitemap/[cursor].xml.js", _page16],
    ["src/pages/sitemap.xml.js", _page17],
    ["src/pages/static/[...url].js", _page18],
    ["src/pages/tags.astro", _page19],
    ["src/pages/uploads/[...file].js", _page20],
    ["src/pages/index.astro", _page21]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "mode": "standalone",
    "client": "file:///www/wwwroot/baoxiao.fun/app/dist/client/",
    "server": "file:///www/wwwroot/baoxiao.fun/app/dist/server/",
    "host": true,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
