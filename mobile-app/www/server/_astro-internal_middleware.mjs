import { g as getConfig } from './chunks/config_S9XpwabU.mjs';
import './chunks/shared_BQ26NZh_.mjs';
import { s as sequence } from './chunks/index_BUry3Yx1.mjs';

async function onRequest$1(context, next) {
  context.locals.SITE_URL = `${""}${"/"}`;
  try {
    context.locals.config = await getConfig();
  } catch (e) {
    console.error("Load config failed:", e);
    context.locals.config = void 0;
  }
  const response = await next();
  if (!response.bodyUsed) {
    if (response.headers.get("Content-type") === "text/html") {
      response.headers.set("Speculation-Rules", '"/rules/prefetch.json"');
    }
    if (!response.headers.has("Cache-Control")) {
      response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
    }
    const noIndex = context.locals.config?.seo?.noIndex;
    const noFollow = context.locals.config?.seo?.noFollow;
    if (noIndex || noFollow) {
      response.headers.set("X-Robots-Tag", `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`);
    }
  }
  return response;
}

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
