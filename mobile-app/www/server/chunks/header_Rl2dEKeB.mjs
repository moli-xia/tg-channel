import { c as createComponent, r as renderTemplate, a as addAttribute, b as createAstro, s as spreadAttributes, u as unescapeHTML, e as renderComponent, f as renderSlot, d as renderHead, F as Fragment, m as maybeRenderHead } from './astro/server_DLfV5Tyk.mjs';
/* empty css                            */
import { a as getEnv } from './index_DXnZCgT9.mjs';

const $$Astro$9 = createAstro();
const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$8 = createAstro();
const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$7 = createAstro();
const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$6 = createAstro();
const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$5 = createAstro();
const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(name, "name")}${addAttribute(property, "property")}${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}>`)}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$4 = createAstro();
const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$3 = createAstro();
const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$2 = createAstro();
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is strongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  const baseUrl = Astro2.site ?? Astro2.url;
  const defaultCanonicalUrl = new URL(Astro2.url.pathname + Astro2.url.search, baseUrl);
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || defaultCanonicalUrl.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "/www/wwwroot/baoxiao.fun/app/node_modules/.pnpm/astro-seo@0.8.4_prettier-plugin-astro@0.14.1_prettier@3.3.3_typescript@5.5.4/node_modules/astro-seo/src/SEO.astro", void 0);

const backToTopIcon = new Proxy({"src":"/_astro/back-to-top.CnE45Dm3.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/back-to-top.svg";
							}
							
							return target[name];
						}
					});

const __vite_import_meta_env__$1 = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Base;
  const { SITE_URL } = Astro2.locals;
  const { channel } = Astro2.props;
  const locale = getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "LOCALE");
  const theme = getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "THEME") ?? "auto";
  const cfg = Astro2.locals?.config || {};
  const siteTitle = cfg.site?.title && String(cfg.site.title).trim().length > 0 ? cfg.site.title : channel?.title || "";
  const siteLogo = cfg.site?.logo && String(cfg.site.logo).trim().length > 0 ? cfg.site.logo : "";
  cfg.site?.icp && String(cfg.site.icp).trim().length > 0 ? cfg.site.icp : "";
  const seo = channel?.seo;
  const reqPathname = Astro2.url.pathname.replace(/\/$/, "");
  const canonical = SITE_URL.startsWith("http") ? new URL(SITE_URL).origin + reqPathname : Astro2.url.origin + reqPathname;
  const { origin, pathname } = new URL(canonical);
  const twitter = getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "TWITTER");
  const pageTitle = seo?.title || siteTitle;
  const seoParams = {
    title: pageTitle,
    description: seo?.text ?? channel?.description,
    canonical,
    noindex: seo?.noindex ?? getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "NOINDEX"),
    nofollow: seo?.nofollow ?? getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "NOFOLLOW"),
    openGraph: {
      basic: {
        type: "website",
        title: pageTitle ?? "",
        url: canonical,
        image: siteLogo || (channel?.avatar ? channel.avatar : origin + "/favicon.ico")
      },
      optional: {
        description: seo?.text ?? channel?.description,
        locale
      }
    },
    extend: {
      link: [
        {
          rel: "icon",
          href: siteLogo ? siteLogo : channel?.avatar ? `https://wsrv.nl/?w=64&h=64&fit=cover&mask=circle&url=ssl:${channel?.avatar?.replace(/^https?:\/\//, "")}` : "/favicon.svg"
        }
      ]
    }
  };
  const GOOGLE_SEARCH_SITE = getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "GOOGLE_SEARCH_SITE");
  const searchAction = GOOGLE_SEARCH_SITE ? "https://www.google.com/search" : "/search/result";
  const HEADER_INJECT = getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "HEADER_INJECT");
  const FOOTER_INJECT = getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "FOOTER_INJECT");
  getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "TAGS");
  getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "LINKS");
  (getEnv(Object.assign(__vite_import_meta_env__$1, { LOCALE: "zh-cn", TWITTER: "ccbikai", FOOTER_INJECT: "FOOTER_INJECT", HEADER_INJECT: "HEADER_INJECT", GOOGLE_SEARCH_SITE: "", TAGS: "", LINKS: "", NAVS: "", ARCH: process.env.ARCH }), Astro2, "NAVS") || "").split(";").filter(Boolean).map((link) => {
    link = link.split(",");
    return {
      title: link[0],
      href: link[1]
    };
  });
  const headerInjectSafe = HEADER_INJECT && /</.test(HEADER_INJECT) ? HEADER_INJECT : "";
  const footerInjectSafe = FOOTER_INJECT && /</.test(FOOTER_INJECT) ? FOOTER_INJECT : "";
  return renderTemplate(_a || (_a = __template(["<html", "", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><!-- theme-color for light/dark to improve mobile PWA appearance --><meta name="theme-color" content="#f4f1ec" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#0b0b0e" media="(prefers-color-scheme: dark)"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><style>\n      @view-transition {\n        navigation: auto; /* enabled */\n      }\n    </style>', "<!-- 仅注入 HTML 片段，避免纯文本出现在页面上 -->", "", '</head> <body> <div id="wrapper"> <div id="container"> <div id="main-container"> ', ' </div> </div> </div> <!-- 搜索弹窗（原生 popover） --> <form id="search-popover" class="search-modal"', ' method="get" popover hidden> ', ' <input type="text" name="q" placeholder="搜索" autofocus> </form> <a href="#wrapper" id="back-to-top" aria-label="Back to top"> <img', ' alt="Back to Top"> </a>   ', ` <script>
      // 主题切换功能
      function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle')
        if (!themeToggle) return

        themeToggle.addEventListener('click', (e) => {
          e.preventDefault()
          const html = document.documentElement
          const currentTheme = html.getAttribute('data-theme')
          
          if (currentTheme === 'dark') {
            html.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
          } else {
            html.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
          }
        })
      }

      // 初始化主题
      function initTheme() {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = savedTheme || (prefersDark ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', theme)
      }

      // 页面加载时初始化
      initTheme()
      document.addEventListener('DOMContentLoaded', initThemeToggle)

      // 单实例防抖（避免重复注入）
      if (!window.__sepiaModalInit) {
        window.__sepiaModalInit = true

        document.addEventListener('click', (e) => {
          const trigger = e.target.closest('[data-popover]')
          if (trigger) {
            e.preventDefault()
            const id = trigger.getAttribute('data-popover')
            const el = document.getElementById(id)
            // 优先使用原生 popover
            if (el?.showPopover) {
              el.showPopover()
            }
            // 兼容不支持 popover 的浏览器：移除 hidden 并添加 open 类用于动画
            el?.removeAttribute('hidden')
            el?.classList?.add('open')
            const input = el?.querySelector('input[name="q"]')
            input?.focus?.()
            return
          }
        })

        // 关闭逻辑（Esc 或点击页面空白处）——同时兼容 popover 与 fallback
        document.addEventListener('keydown', (e) => {
          if (e.key !== 'Escape') return
          const el = document.getElementById('search-popover')
          if (!el) return
          if (el.matches(':popover-open')) {
            try { el.hidePopover() } catch {}
            el.setAttribute('hidden','')
            el.classList.remove('open')
          } else if (!el.hasAttribute('hidden')) {
            // fallback 已打开
            el.setAttribute('hidden','')
            el.classList.remove('open')
          }
        })

        document.addEventListener('click', (e) => {
          const el = document.getElementById('search-popover')
          if (!el) return
          const isTrigger = !!e.target.closest('[data-popover="search-popover"]')
          if (isTrigger) return
          // 点击非弹窗区域关闭（仅 fallback）
          if (!el.hasAttribute('hidden') && !el.contains(e.target)) {
            el.setAttribute('hidden','')
            el.classList.remove('open')
          }
        })
      }
    </script> <script>
      // 单实例防抖（避免 HMR 或重复注入导致多次绑定）
      if (window.__sepiaImgInit) {
        // 已初始化，直接返回
      } else {
        window.__sepiaImgInit = true
      }

      // 统一的点击事件处理（仅保留必要的导航与关闭）
      document.addEventListener('click', (e) => {
        // 优先处理导航按钮点击：切换图片（使用 .nav-btn）
        const nav = e.target.closest('.nav-btn')
        if (nav && nav.dataset.target) {
          const target = document.getElementById(nav.dataset.target)
          if (target?.showPopover) {
            const current = nav.closest('.modal')
            try { current?.hidePopover?.() } catch {}
            target.showPopover()
          }
          return
        }

        const openModal = document.querySelector('.modal:popover-open')
        if (!openModal) return

        // 计算“真实可见的图片内容区域”（考虑 object-fit: scale-down 造成的留白）
        const imgEl = openModal.querySelector('.modal-img')
        if (!imgEl) return

        const isPointInImageContent = (img, clientX, clientY) => {
          const rect = img.getBoundingClientRect()
          const x = clientX, y = clientY
          const natW = img.naturalWidth || img.videoWidth || 0
          const natH = img.naturalHeight || img.videoHeight || 0
          // 若图片/视频尚未获得固有尺寸（未加载完），一律视为“不在内容内”，避免误触切换
          if (!natW || !natH) return false
          const scaleDown = Math.min(rect.width / natW, rect.height / natH, 1)
          const contentW = natW * scaleDown
          const contentH = natH * scaleDown
          const left = rect.left + (rect.width - contentW) / 2
          const top = rect.top + (rect.height - contentH) / 2
          const right = left + contentW
          const bottom = top + contentH
          return x >= left && x <= right && y >= top && y <= bottom
        }

        const insideContent = isPointInImageContent(imgEl, e.clientX, e.clientY)
        
        // 检查是否点击在导航按钮上，如果是则不处理
        if (e.target.closest('.nav-btn')) {
          return
        }
        
        if (insideContent) {
          // 在内容区域内点按左右半区切换上下一个
          const rect = imgEl.getBoundingClientRect()
          const natW = imgEl.naturalWidth || imgEl.videoWidth || rect.width
          const natH = imgEl.naturalHeight || imgEl.videoHeight || rect.height
          const scaleDown = Math.min(rect.width / natW, rect.height / natH, 1)
          const contentW = natW * scaleDown
          const left = rect.left + (rect.width - contentW) / 2
          const right = left + contentW
          const midX = (left + right) / 2
          const usePrev = e.clientX < midX
          
          // 只有在有多张图片时才允许切换
          const navEl = openModal.querySelector(usePrev ? '.nav-prev' : '.nav-next')
          if (navEl && navEl.dataset.target) {
            const nextId = navEl.dataset.target
            const target = document.getElementById(nextId)
            if (target?.showPopover) {
              const current = openModal
              // 离开当前弹窗时，暂停其中的视频
              try { current?.querySelectorAll?.('video')?.forEach(v => v.pause?.()) } catch {}
              try { current?.hidePopover?.() } catch {}
              target.showPopover()
            }
          }
        } else {
          // 点击留白区域关闭
          try { openModal?.hidePopover?.() } catch {}
          try { openModal?.querySelectorAll?.('video')?.forEach(v => v.pause?.()) } catch {}
        }
      })

      // 方向键切换与 Esc 关闭
      document.addEventListener('keydown', (e) => {
        const openModal = document.querySelector('.modal:popover-open')
        if (!openModal) return
        if (['ArrowLeft','ArrowRight','Escape'].includes(e.key)) {
          e.preventDefault()
        }
        if (e.key === 'Escape') {
          try { openModal?.querySelectorAll?.('video')?.forEach(v => v.pause?.()) } catch {}
          try { openModal?.hidePopover?.() } catch {}
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          const usePrev = e.key === 'ArrowLeft'
          const navEl = openModal.querySelector(usePrev ? '.nav-prev' : '.nav-next')
          const nextId = navEl?.dataset?.target
          if (nextId) {
            const target = document.getElementById(nextId)
            if (target?.showPopover) {
              try { openModal?.querySelectorAll?.('video')?.forEach(v => v.pause?.()) } catch {}
              try { openModal?.hidePopover?.() } catch {}
              target.showPopover()
            }
          }
        }
      })
    </script> <script>
      // 当视频滚出视口时自动暂停
      (function(){
        if (window.__autoPauseVideoInit) return; window.__autoPauseVideoInit = true
        const pause = (v) => { try { v.pause() } catch {} }
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const v = entry.target
            if (!entry.isIntersecting || entry.intersectionRatio < 0.6) pause(v)
          })
        }, { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] })
        const observeAll = () => document.querySelectorAll('video').forEach(v => io.observe(v))
        observeAll()
        // 监听新节点（例如瀑布流加载或路由切换后注入）
        const mo = new MutationObserver((muts) => {
          for (const m of muts) {
            m.addedNodes && m.addedNodes.forEach((n) => {
              if (n.nodeType === 1) {
                if (n.tagName === 'VIDEO') io.observe(n)
                n.querySelectorAll && n.querySelectorAll('video').forEach(v => io.observe(v))
              }
            })
          }
        })
        mo.observe(document.documentElement, { childList: true, subtree: true })
        // 标签页隐藏时统一暂停
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) document.querySelectorAll('video').forEach(pause)
        })
        // 离开页面时清理
        window.addEventListener('pagehide', () => { io.disconnect(); mo.disconnect() })
      })()
    </script> <style>
      /* 移除底部备案信息样式 */
      .search-modal {
        padding: 12px;
        background: var(--cell-background-color);
        border-radius: var(--box-border-radius);
        box-shadow: var(--shadows);
        border: 1px solid var(--border-color);
        width: min(92vw, 320px);
        /* 让弹窗自身尺寸自适应内容，而不是铺满全屏 */
        height: auto;
        max-height: none;
        /* 固定在视口顶部居中 */
        position: fixed;
        /* 重置 UA 可能设置的 inset: 0，避免高度被 bottom:0 拉满 */
        inset: auto;
        top: 16px;
        left: 50%;
        right: auto;
        bottom: auto;
        transform: translateX(-50%);
        margin: 0;
        box-sizing: border-box;
        z-index: 1001;
        /* 去除滚动条 */
        overflow: hidden;
      }
      /* 使用原生 popover 的 backdrop 作为遮罩层 */
      #search-popover::backdrop {
        background: rgba(0,0,0,0.3);
      }
      /* 简化动画效果 */
      .search-modal {
        opacity: 0;
        transform: translateX(-50%) translateY(-4px);
        transition: opacity .15s ease, transform .15s ease;
      }
      .search-modal:popover-open, .search-modal.open {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
       .search-modal input[name="q"] {
         width: 100%;
         height: 28px;
         border: 1px solid var(--border-color);
         background: var(--cell-background-color);
         color: var(--foreground-color);
         padding: 6px 10px;
         border-radius: 4px;
         font-size: 14px;
         outline: none;
         transition: border-color .2s ease;
       }
       .search-modal input[name="q"]::placeholder {
         color: var(--secondary-color);
         opacity: .8;
       }
       .search-modal input[name="q"]:focus {
         border-color: #4c8bf5;
         background: var(--cell-background-color);
       }
       .search-hint {
         display: none;
       }
    </style> </body> </html>`])), addAttribute(locale ?? "en", "lang"), addAttribute(theme !== "auto" ? theme : null, "data-theme"), renderComponent($$result, "SEO", $$SEO, { "titleDefault": pageTitle, "twitter": {
    card: "summary_large_image",
    creator: twitter ? `@${twitter}` : void 0
  }, ...seoParams }), headerInjectSafe && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(headerInjectSafe)}` })}`, renderHead(), renderSlot($$result, $$slots["default"]), addAttribute(searchAction, "action"), GOOGLE_SEARCH_SITE ? renderTemplate`<input type="hidden" name="as_sitesearch"${addAttribute(GOOGLE_SEARCH_SITE, "value")}>` : null, spreadAttributes(backToTopIcon), footerInjectSafe && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(footerInjectSafe)}` })}`);
}, "/www/wwwroot/baoxiao.fun/app/src/layouts/base.astro", void 0);

const voidFile = new Proxy({"src":"/_astro/void.48wdlgMU.png","width":128,"height":128,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/void.png";
							}
							
							return target[name];
						}
					});

const podcast = new Proxy({"src":"/_astro/podcast.C2tLBMc1.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/podcast.svg";
							}
							
							return target[name];
						}
					});

const twitter = new Proxy({"src":"/_astro/twitter.DqUhhn25.svg","width":64,"height":64,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/twitter.svg";
							}
							
							return target[name];
						}
					});

const github = new Proxy({"src":"/_astro/github.z0dct1GQ.svg","width":64,"height":64,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/github.svg";
							}
							
							return target[name];
						}
					});

const discord = new Proxy({"src":"/_astro/discord.DwdWJxoi.svg","width":800,"height":800,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/discord.svg";
							}
							
							return target[name];
						}
					});

const search = new Proxy({"src":"/_astro/search.DsGSW3tX.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/search.svg";
							}
							
							return target[name];
						}
					});

const themeToggle = new Proxy({"src":"/_astro/theme-toggle.BFeb63U_.svg","width":24,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/theme-toggle.svg";
							}
							
							return target[name];
						}
					});

const moonIcon = new Proxy({"src":"/_astro/moon-icon.9XOh5Tl-.svg","width":20,"height":20,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/moon-icon.svg";
							}
							
							return target[name];
						}
					});

const mastodon = new Proxy({"src":"/_astro/mastodon.BYNdYR6e.svg","width":448,"height":512,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/mastodon.svg";
							}
							
							return target[name];
						}
					});

const bluesky = new Proxy({"src":"/_astro/bluesky.DzsTfgug.svg","width":576,"height":512,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/www/wwwroot/baoxiao.fun/app/src/assets/bluesky.svg";
							}
							
							return target[name];
						}
					});

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { SITE_URL } = Astro2.locals;
  const { channel } = Astro2.props;
  const PODCASRT = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "PODCASRT");
  const TWITTER = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "TWITTER");
  const GITHUB = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "GITHUB");
  const DISCORD = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "DISCORD");
  const MASTODON = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "MASTODON");
  const BLUESKY = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "BLUESKY");
  const HIDE_SOCIALS = (getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "HIDE_SOCIALS") || "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
  const hidden = new Set(HIDE_SOCIALS);
  const isHidden = (...names) => names.some((n) => hidden.has(String(n).toUpperCase()));
  const staticProxy = getEnv(Object.assign(__vite_import_meta_env__, { TWITTER: "ccbikai", GITHUB: "ccbikai", DISCORD: "https://DISCORD.com", PODCASRT: "https://PODCASRT.com", MASTODON: "mastodon.social/@Mastodon", BLUESKY: "bsky.app", HIDE_SOCIALS: "RSS,DISCORD,PODCAST", STATIC_PROXY: "", ARCH: process.env.ARCH }), Astro2, "STATIC_PROXY") ?? "/static/";
  const cfg = Astro2.locals?.config || {};
  const siteTitle = cfg.site?.title && String(cfg.site.title).trim().length > 0 ? cfg.site.title : channel?.title || "";
  const introHTML = cfg.site?.description && String(cfg.site.description).trim().length > 0 ? cfg.site.description : channel?.descriptionHTML || "";
  const siteSubtitle = cfg.site?.subtitle && String(cfg.site.subtitle).trim().length > 0 ? cfg.site.subtitle : "";
  const siteLogo = cfg.site?.logo && String(cfg.site.logo).trim().length > 0 ? cfg.site.logo : "";
  const headerImgSrc = siteLogo || (channel?.avatar?.startsWith("http") ? staticProxy + channel?.avatar : voidFile.src);
  return renderTemplate`${maybeRenderHead()}<div id="header" data-astro-cid-hpnw4vwy> <a${addAttribute(SITE_URL, "href")}${addAttribute(siteTitle, "title")} data-astro-cid-hpnw4vwy> <img${addAttribute(headerImgSrc, "src")}${addAttribute(siteTitle, "alt")} loading="eager" class="header-avatar" data-astro-cid-hpnw4vwy> </a> <div class="header-title" data-astro-cid-hpnw4vwy> <a${addAttribute(SITE_URL, "href")} class="site-title"${addAttribute(siteTitle, "title")} data-astro-cid-hpnw4vwy> ${siteTitle} </a> ${siteSubtitle && renderTemplate`<div class="site-subtitle" data-astro-cid-hpnw4vwy>${siteSubtitle}</div>`} </div> <div class="header-icons" data-astro-cid-hpnw4vwy> ${PODCASRT && !isHidden("PODCAST", "PODCASRT") && renderTemplate`<a${addAttribute(PODCASRT, "href")} target="_blank" title="Podcast" data-astro-cid-hpnw4vwy> <img${spreadAttributes(podcast)} alt="Podcast" class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`} ${TWITTER && TWITTER.length > 0 && !isHidden("TWITTER") && renderTemplate`<a${addAttribute(`https://twitter.com/${TWITTER}`, "href")} title="Twitter" target="_blank" data-astro-cid-hpnw4vwy> <img${spreadAttributes(twitter)}${addAttribute(`twitter.com/${TWITTER}`, "alt")} class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`} ${GITHUB && GITHUB.length > 0 && !isHidden("GITHUB") && renderTemplate`<a${addAttribute(`https://github.com/${GITHUB}`, "href")} title="GitHub" target="_blank" data-astro-cid-hpnw4vwy> <img${spreadAttributes(github)}${addAttribute(`github.com/${GITHUB}`, "alt")} class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`}  ${!isHidden("SEARCH") && renderTemplate`<a href="#" title="搜索" data-popover="search-popover" data-astro-cid-hpnw4vwy> <img${spreadAttributes(search)} alt="Search" class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`}  ${!isHidden("THEME") && renderTemplate`<a href="#" title="切换主题" id="theme-toggle" data-astro-cid-hpnw4vwy> <img${spreadAttributes(themeToggle)} alt="Light Theme" class="social-icon theme-icon light-icon" width="1em" data-astro-cid-hpnw4vwy> <img${spreadAttributes(moonIcon)} alt="Dark Theme" class="social-icon theme-icon dark-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`} ${DISCORD && DISCORD.length > 0 && !isHidden("DISCORD") && renderTemplate`<a${addAttribute(DISCORD, "href")} title="Discord" target="_blank" data-astro-cid-hpnw4vwy> <img${spreadAttributes(discord)} alt="Discord Invite" class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`} ${MASTODON && MASTODON.length > 0 && !isHidden("MASTODON") && renderTemplate`<a${addAttribute(`https://${MASTODON}`, "href")} title="Mastodon" target="_blank" data-astro-cid-hpnw4vwy> <img${spreadAttributes(mastodon)}${addAttribute(`@${MASTODON}`, "alt")} class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`} ${BLUESKY && BLUESKY.length > 0 && !isHidden("BLUESKY") && renderTemplate`<a${addAttribute(`https://bsky.app/profile/${BLUESKY}`, "href")} title="BlueSky" target="_blank" data-astro-cid-hpnw4vwy> <img${spreadAttributes(bluesky)}${addAttribute(`@${BLUESKY}`, "alt")} class="social-icon" width="1em" data-astro-cid-hpnw4vwy> </a>`} </div> </div> ${introHTML && renderTemplate`<div class="text-box" id="site-intro" data-astro-cid-hpnw4vwy>${unescapeHTML(introHTML)}</div>`} `;
}, "/www/wwwroot/baoxiao.fun/app/src/components/header.astro", void 0);

export { $$Header as $, $$Base as a, voidFile as v };
