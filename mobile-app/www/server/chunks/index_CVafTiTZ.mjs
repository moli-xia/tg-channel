import { $fetch } from 'ofetch';
import * as cheerio from 'cheerio';
import { LRUCache } from 'lru-cache';
import flourite from 'flourite';

function getEnv(env, Astro, name) {
  const runtimeConfig = Astro?.locals?.config;
  if (runtimeConfig) {
    const mapping = {
      CHANNEL: 'site.channel',
      LOCALE: 'site.locale',
      TIMEZONE: 'site.timezone',
      STATIC_PROXY: 'site.staticProxy',
      TELEGRAM: 'social.telegram',
      TWITTER: 'social.twitter',
      GITHUB: 'social.github',
      DISCORD: 'social.discord',
      MASTODON: 'social.mastodon',
      BLUESKY: 'social.bluesky',
      COMMENTS: 'site.comments',
    };

    const path = mapping[name];
    if (path) {
      const value = path.split('.').reduce((obj, key) => obj?.[key], runtimeConfig);
      if (value !== undefined && value !== null) {
        return value
      }
    }
  }

  if (env?.[name] !== undefined) {
    return env[name]
  }

  return Astro?.locals?.runtime?.env?.[name]
}

// 简单的代码高亮工具
// 为了避免引入大型库，提供基本的语法高亮功能

const languageMap = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  cpp: 'cpp',
  c: 'c',
  java: 'java',
  php: 'php',
  sh: 'bash',
  bash: 'bash',
  zsh: 'bash',
  sql: 'sql',
  html: 'html',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  json: 'json',
  xml: 'xml',
  yaml: 'yaml',
  yml: 'yaml',
  md: 'markdown',
  markdown: 'markdown',
};

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML
}

function highlightCode(code, language) {
  // 基本的HTML转义
  const escaped = escapeHtml(code);

  // 简单的语法高亮（仅处理常见模式）
  if (language === 'javascript' || language === 'typescript') {
    return escaped
      .replace(/\b(const|let|var|function|class|if|else|for|while|return|import|export|from|default)\b/g, '<span class="keyword">$1</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
      .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
      .replace(/`([^`\\]|\\.)*`/g, '<span class="string">$&</span>')
  }

  if (language === 'python') {
    return escaped
      .replace(/\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield)\b/g, '<span class="keyword">$1</span>')
      .replace(/#.*$/gm, '<span class="comment">$&</span>')
      .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
      .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
  }

  if (language === 'css' || language === 'scss') {
    return escaped
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/([a-z-]+)(\s*:\s*)/gi, '<span class="property">$1</span>$2')
      .replace(/#[0-9a-f]{3,6}/gi, '<span class="value">$&</span>')
      .replace(/\b\d+(?:px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax|fr)\b/g, '<span class="value">$&</span>')
  }

  return escaped
}

const prism = {
  highlight(code, language) {
    const normalizedLang = languageMap[language?.toLowerCase()] || language?.toLowerCase();
    return highlightCode(code, normalizedLang)
  },
};

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const cache = new LRUCache({
  ttl: 1e3 * 60 * 5,
  // 5 minutes
  maxSize: 50 * 1024 * 1024,
  // 50MB
  sizeCalculation: (item) => {
    return JSON.stringify(item).length;
  }
});
function normalizeText(input) {
  return String(input || "").normalize("NFKC").toLowerCase().replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, "");
}
function getVideoStickers($, item, { staticProxy, index }) {
  const loading = index > 15 ? "eager" : "lazy";
  return $(item).find(".js-videosticker_video")?.map((_index, video) => {
    const url = $(video)?.attr("src");
    const imgurl = $(video).find("img")?.attr("src");
    return `
    <div style="background-image: none; width: 256px;">
      <video src="${toProxy(url, staticProxy)}" width="100%" height="100%" alt="Video Sticker" preload muted autoplay loop playsinline disablepictureinpicture >
        <img class="sticker" src="${toProxy(imgurl, staticProxy)}" alt="Video Sticker" loading="${loading}" />
      </video>
    </div>
    `;
  })?.get()?.join("");
}
function getImageStickers($, item, { staticProxy, index }) {
  const loading = index > 15 ? "eager" : "lazy";
  return $(item).find(".tgme_widget_message_sticker")?.map((_index, image) => {
    const url = $(image)?.attr("data-webp");
    return `<img class="sticker" src="${toProxy(url, staticProxy)}" style="width: 256px;" alt="Sticker" loading="${loading}" />`;
  })?.get()?.join("");
}
function toProxy(u, staticProxy) {
  if (!u) {
    return "";
  }
  const s = String(u);
  if (/^https?:\/\//i.test(s)) {
    return staticProxy + s.replace(/^https?:\/\//i, "");
  }
  if (/^\/\//.test(s)) {
    return staticProxy + s.replace(/^\/\//, "");
  }
  return staticProxy + (s.startsWith("/") ? s.slice(1) : s);
}
function getImages($, item, { staticProxy, id, index, title }) {
  const photos = $(item).find(".tgme_widget_message_photo_wrap");
  const urls = photos?.map((_i, photo) => $(photo).attr("style").match(/url\(["'](.*?)["']\)/)?.[1])?.get() || [];
  if (!urls.length) {
    return "";
  }
  const loading = index > 15 ? "eager" : "lazy";
  const images = urls.map((url, i) => {
    const popoverId = `modal-${id}-${i}`;
    const prevId = `modal-${id}-${(i - 1 + urls.length) % urls.length}`;
    const nextId = `modal-${id}-${(i + 1) % urls.length}`;
    const imgUrl = toProxy(url, staticProxy);
    const navHtml = urls.length > 1 ? `<div class="nav-btn nav-prev" data-target="${prevId}" aria-label="上一张">&#10094;</div>
        <div class="nav-btn nav-next" data-target="${nextId}" aria-label="下一张">&#10095;</div>` : "";
    return `
      <button class="image-preview-button image-preview-wrap" popovertarget="${popoverId}" popovertargetaction="show" data-group="${id}" data-index="${i}">
        <img src="${imgUrl}" alt="${title}" loading="${loading}" />
      </button>
      <div class="image-preview-button modal" id="${popoverId}" popover data-group="${id}" data-index="${i}">
        <div class="modal-backdrop" aria-hidden="true"></div>
        <img class="modal-img" src="${imgUrl}" alt="${title}" loading="lazy" />
        ${navHtml}
      </div>
    `;
  });
  return images.length ? `<div class="image-list-container ${images.length % 2 === 0 ? "image-list-even" : "image-list-odd"}" data-group="${id}">${images.join("")}</div>` : "";
}
function extractBgUrl(style) {
  if (!style) {
    return "";
  }
  const m = /background-image:\s*url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/i.exec(String(style));
  return m && m[1] ? m[1] : "";
}
function isSafeImagePoster(u) {
  if (!u) {
    return false;
  }
  const raw = String(u);
  try {
    const full = raw.startsWith("//") ? `https:${raw}` : raw;
    const parsed = full.startsWith("http") ? new URL(full) : null;
    const pathname = parsed ? parsed.pathname : raw.split("?")[0];
    const hasExt = /(?:\.jpe?g|\.png|\.webp)$/i.test(pathname);
    const hostOk = parsed ? /(?:telesco\.pe|cdn-telegram\.org|telegram\.org|telegram\.me|t\.me)$/i.test(parsed.hostname) : false;
    const looksLikeFile = /\/file\//.test(pathname) || /[?&]token=/.test(raw);
    return Boolean(hasExt || hostOk && looksLikeFile);
  } catch {
    return false;
  }
}
function getVideo($, item, { staticProxy, index }) {
  const preload = index > 15 ? "auto" : "metadata";
  const videoWrap = $(item).find(".tgme_widget_message_video_wrap");
  const video = videoWrap.find("video");
  function findPoster(scope) {
    const inWrap = scope.find(".tgme_widget_message_video_player, .tgme_widget_message_video_thumb, .tgme_widget_message_video").toArray().map((el) => extractBgUrl($(el).attr("style"))).find(Boolean);
    if (inWrap) {
      return inWrap;
    }
    const any = scope.find('[style*="background-image"][class*="video"]').toArray().map((el) => extractBgUrl($(el).attr("style"))).find(Boolean);
    if (any) {
      return any;
    }
    const thumbAttr = scope.find("[data-thumb]").toArray().map((el) => $(el).attr("data-thumb")).find(Boolean);
    if (thumbAttr) {
      return thumbAttr;
    }
    const dataSrc = scope.find("[data-src]").toArray().map((el) => $(el).attr("data-src")).find((url) => url && isSafeImagePoster(url));
    if (dataSrc) {
      return dataSrc;
    }
    const imgInVideo = scope.find("img").toArray().map((el) => $(el).attr("src") || $(el).attr("data-src")).find((url) => url && isSafeImagePoster(url));
    if (imgInVideo) {
      return imgInVideo;
    }
    const inItem = $(item).find(".tgme_widget_message_video_player, .tgme_widget_message_video_thumb").toArray().map((el) => extractBgUrl($(el).attr("style"))).find(Boolean);
    const itemThumb = $(item).find("[data-thumb]").toArray().map((el) => $(el).attr("data-thumb")).find(Boolean);
    const anyImg = $(item).find("img").toArray().map((el) => $(el).attr("src") || $(el).attr("data-src")).find((url) => url && isSafeImagePoster(url));
    return inItem || itemThumb || anyImg || "";
  }
  const posterCandidate = video?.attr("poster") || findPoster(videoWrap.length ? videoWrap : $(item));
  if (isSafeImagePoster(posterCandidate)) {
    video?.attr("poster", toProxy(posterCandidate, staticProxy));
  } else {
    video?.removeAttr("poster");
  }
  video?.attr("src", toProxy(video?.attr("src"), staticProxy))?.attr("controls", true)?.attr("preload", preload)?.attr("playsinline", true).attr("webkit-playsinline", true);
  const roundWrap = $(item).find(".tgme_widget_message_roundvideo_wrap");
  const roundVideo = roundWrap.find("video");
  const roundPosterCandidate = roundVideo?.attr("poster") || findPoster(roundWrap.length ? roundWrap : $(item));
  if (isSafeImagePoster(roundPosterCandidate)) {
    roundVideo?.attr("poster", toProxy(roundPosterCandidate, staticProxy));
  } else {
    roundVideo?.removeAttr("poster");
  }
  roundVideo?.attr("src", toProxy(roundVideo?.attr("src"), staticProxy))?.attr("controls", true)?.attr("preload", preload)?.attr("playsinline", true).attr("webkit-playsinline", true);
  return $.html(video) + $.html(roundVideo);
}
function getAudio($, item, { staticProxy }) {
  const audio = $(item).find(".tgme_widget_message_voice");
  audio?.attr("src", toProxy(audio?.attr("src"), staticProxy))?.attr("controls", true);
  return $.html(audio);
}
function getLinkPreview($, item, { staticProxy, index }) {
  const link = $(item).find(".tgme_widget_message_link_preview");
  const title = $(item).find(".link_preview_title")?.text() || $(item).find(".link_preview_site_name")?.text();
  const description = $(item).find(".link_preview_description")?.text();
  link?.attr("target", "_blank").attr("rel", "noopener").attr("title", description);
  const image = $(item).find(".link_preview_image");
  const src = image?.attr("style")?.match(/url\(["'](.*?)["']/i)?.[1];
  const loading = index > 15 ? "eager" : "lazy";
  const imageSrc = src ? toProxy(src, staticProxy) : "";
  image?.replaceWith(`<img class="link_preview_image" alt="${title}" src="${imageSrc}" loading="${loading}" />`);
  return $.html(link);
}
function getReply($, item, { channel }) {
  const reply = $(item).find(".tgme_widget_message_reply");
  reply?.wrapInner("<small></small>")?.wrapInner("<blockquote></blockquote>");
  const href = reply?.attr("href");
  if (href) {
    const url = new URL(href);
    reply?.attr("href", `${url.pathname}`.replace(new RegExp(`/${channel}/`, "i"), "/posts/"));
  }
  return $.html(reply);
}
function modifyHTMLContent($, content, { index } = {}) {
  $(content).find(".emoji")?.removeAttr("style");
  $(content).find("a")?.each((_index, a) => {
    $(a)?.attr("title", $(a)?.text())?.removeAttr("onclick");
  });
  $(content).find("tg-spoiler")?.each((_index, spoiler) => {
    const id = `spoiler-${index}-${_index}`;
    $(spoiler)?.attr("id", id)?.wrap('<label class="spoiler-button"></label>')?.before(`<input type="checkbox" />`);
  });
  $(content).find("pre").each((_index, pre) => {
    try {
      $(pre).find("br")?.replaceWith("\n");
      const code = $(pre).text();
      const language = flourite(code, { shiki: true, noUnknown: true })?.language || "text";
      const highlightedCode = prism.highlight(code, prism.languages[language], language);
      $(pre).html(`<code class="language-${language}">${highlightedCode}</code>`);
    } catch (error) {
      console.error(error);
    }
  });
  return content;
}
function getPost($, item, { channel, staticProxy, index = 0 }) {
  item = item ? $(item).find(".tgme_widget_message") : $(".tgme_widget_message");
  const content = $(item).find(".js-message_reply_text")?.length > 0 ? modifyHTMLContent($, $(item).find(".tgme_widget_message_text.js-message_text"), { index }) : modifyHTMLContent($, $(item).find(".tgme_widget_message_text"), { index });
  const title = content?.text()?.match(/^.*?(?=[。\n]|http\S)/g)?.[0] ?? content?.text() ?? "";
  const id = $(item).attr("data-post")?.replace(new RegExp(`${channel}/`, "i"), "");
  const tags = $(content).find('a[href^="?q="]')?.each((_index, a) => {
    $(a)?.attr("href", `/search/${encodeURIComponent($(a)?.text())}`);
  })?.map((_index, a) => $(a)?.text()?.replace("#", ""))?.get();
  return {
    id,
    title,
    type: $(item).attr("class")?.includes("service_message") ? "service" : "text",
    datetime: $(item).find(".tgme_widget_message_date time")?.attr("datetime"),
    tags,
    text: content?.text(),
    content: [
      getReply($, item, { channel }),
      getImages($, item, { staticProxy, id, index, title }),
      getVideo($, item, { staticProxy, id, index, title }),
      getAudio($, item, { staticProxy, id, index, title }),
      content?.html(),
      getImageStickers($, item, { staticProxy, index }),
      getVideoStickers($, item, { staticProxy, index }),
      // $(item).find('.tgme_widget_message_sticker_wrap')?.html(),
      $(item).find(".tgme_widget_message_poll")?.html(),
      $.html($(item).find(".tgme_widget_message_document_wrap")),
      $.html($(item).find(".tgme_widget_message_video_player.not_supported")),
      $.html($(item).find(".tgme_widget_message_location_wrap")),
      getLinkPreview($, item, { staticProxy, index })
    ].filter(Boolean).join("").replace(/url\((['"])([^'")]+)\1\)/gi, (m, q, urlStr) => {
      try {
        const full = urlStr.startsWith("//") ? `https:${urlStr}` : urlStr;
        const u = new URL(full);
        if (/^t\.me$/i.test(u.hostname)) {
          return m;
        }
        const path = urlStr.replace(/^(https?:)?\/\//i, "");
        return `url(${q}${staticProxy}${path}${q})`;
      } catch {
        return m;
      }
    })
  };
}
const unnessaryHeaders = ["host", "cookie", "origin", "referer"];
async function getChannelInfo(Astro, { before = "", after = "", q = "", type = "list", id = "", raw = false } = {}) {
  const filterKeywords = (Astro?.locals?.config?.content?.filterKeywords || []).map((k) => String(k).toLowerCase()).filter(Boolean);
  const blockTags = (Astro?.locals?.config?.content?.blockTags || []).map((k) => String(k).toLowerCase()).filter(Boolean);
  const pageSize = Astro?.locals?.config?.content?.maxPostsPerPage || 20;
  const normalizedKeywords = filterKeywords.map(normalizeText);
  const normalizedBlockTags = blockTags.map(normalizeText);
  const cacheKey = JSON.stringify({
    before,
    after,
    q,
    type,
    id,
    raw,
    // include settings signature to bust cache when admin updates filters
    fk: filterKeywords.join("|"),
    bt: blockTags.join("|"),
    ps: pageSize
  });
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    console.info("Match Cache", { before, after, q, type, id });
    return JSON.parse(JSON.stringify(cachedResult));
  }
  const host = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", TELEGRAM: "ccbikai", TELEGRAM_HOST: "telegram.dog", STATIC_PROXY: "", FETCH_TIMEOUT: "8000" }), Astro, "TELEGRAM_HOST") ?? "t.me";
  const channel = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", TELEGRAM: "ccbikai", TELEGRAM_HOST: "telegram.dog", STATIC_PROXY: "", FETCH_TIMEOUT: "8000" }), Astro, "CHANNEL");
  const staticProxyEnv = getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", TELEGRAM: "ccbikai", TELEGRAM_HOST: "telegram.dog", STATIC_PROXY: "", FETCH_TIMEOUT: "8000" }), Astro, "STATIC_PROXY");
  const staticProxy = staticProxyEnv && String(staticProxyEnv).trim().length > 0 ? staticProxyEnv : "/static/";
  const fetchTimeout = Number(getEnv(Object.assign(__vite_import_meta_env__, { CHANNEL: "miantiao_me", TELEGRAM: "ccbikai", TELEGRAM_HOST: "telegram.dog", STATIC_PROXY: "", FETCH_TIMEOUT: "8000" }), Astro, "FETCH_TIMEOUT")) || 8e3;
  const url = id ? `https://${host}/${channel}/${id}?embed=1&mode=tme` : `https://${host}/s/${channel}`;
  const headers = Object.fromEntries(Astro.request.headers);
  Object.keys(headers).forEach((key) => {
    if (unnessaryHeaders.includes(key)) {
      delete headers[key];
    }
  });
  console.info("Fetching", url, { before, after, q, type, id });
  let html;
  try {
    html = await $fetch(url, {
      headers,
      query: {
        before: before || void 0,
        after: after || void 0,
        q: q || void 0
      },
      retry: 3,
      retryDelay: 100,
      timeout: fetchTimeout
    });
  } catch (e) {
    console.error("Fetch Telegram failed", url, e);
    if (id) {
      const blocked = { __blocked: true };
      cache.set(cacheKey, blocked);
      return blocked;
    }
    const channelInfo2 = {
      posts: [],
      title: "",
      description: "",
      descriptionHTML: "",
      avatar: "",
      lastId: "",
      beforeId: ""
    };
    cache.set(cacheKey, channelInfo2);
    return channelInfo2;
  }
  const $ = cheerio.load(html, {}, false);
  if (id) {
    const post = getPost($, null, { channel, staticProxy });
    const textNorm = normalizeText(post?.text);
    const htmlNorm = normalizeText(post?.content);
    const hasKeyword = normalizedKeywords.length > 0 && normalizedKeywords.some((k) => textNorm.includes(k) || htmlNorm.includes(k));
    const hasBlockedTag = normalizedBlockTags.length > 0 && (post?.tags || []).some((t) => normalizedBlockTags.includes(normalizeText(t)));
    if (hasKeyword || hasBlockedTag) {
      const blocked = { __blocked: true };
      cache.set(cacheKey, blocked);
      return blocked;
    }
    cache.set(cacheKey, post);
    return post;
  }
  const posts = $(".tgme_channel_history  .tgme_widget_message_wrap")?.map((index, item) => {
    return getPost($, item, { channel, staticProxy, index });
  })?.get()?.reverse().filter((post) => ["text"].includes(post.type) && post.id && post.content);
  const filtered = posts.filter((p) => {
    const tn = normalizeText(p.text);
    const hn = normalizeText(p.content);
    const hasKeyword = normalizedKeywords.length > 0 && normalizedKeywords.some((k) => tn.includes(k) || hn.includes(k));
    const hasBlockedTag = normalizedBlockTags.length > 0 && (p.tags || []).some((t) => normalizedBlockTags.includes(normalizeText(t)));
    return !hasKeyword && !hasBlockedTag;
  });
  const sliced = raw ? filtered : filtered.slice(0, pageSize);
  const domIds = $(".tgme_channel_history .tgme_widget_message").map((_i, el) => $(el).attr("data-post")?.replace(new RegExp(`${channel}/`, "i"), "")).get().map((v) => Number.parseInt(v, 10)).filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
  const oldestId = domIds.length ? String(domIds[0]) : posts?.[0]?.id || "";
  const channelInfo = {
    posts: sliced,
    title: $(".tgme_channel_info_header_title")?.text(),
    description: $(".tgme_channel_info_description")?.text(),
    descriptionHTML: modifyHTMLContent($, $(".tgme_channel_info_description"))?.html(),
    avatar: $(".tgme_page_photo_image img")?.attr("src"),
    lastId: oldestId,
    beforeId: oldestId
  };
  cache.set(cacheKey, channelInfo);
  return channelInfo;
}

export { getEnv as a, getChannelInfo as g };
