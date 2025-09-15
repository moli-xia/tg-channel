import { $fetch } from 'ofetch'
import * as cheerio from 'cheerio'
import { LRUCache } from 'lru-cache'
import flourite from 'flourite'
import prism from '../prism'
import { getEnv } from '../env'

const cache = new LRUCache({
  ttl: 1000 * 60 * 5, // 5 minutes
  maxSize: 50 * 1024 * 1024, // 50MB
  sizeCalculation: (item) => {
    return JSON.stringify(item).length
  },
})

// 规范化文本，增强关键词/标签命中：
// - 统一全角/半角（NFKC）
// - 转小写
// - 去除零宽字符与所有空白
function normalizeText(input) {
  return String(input || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, '')
}

function getVideoStickers($, item, { staticProxy, index }) {
  const loading = index > 15 ? 'eager' : 'lazy'
  return $(item).find('.js-videosticker_video')?.map((_index, video) => {
    const url = $(video)?.attr('src')
    const imgurl = $(video).find('img')?.attr('src')
    return `
    <div style="background-image: none; width: 256px;">
      <video src="${toProxy(url, staticProxy)}" width="100%" height="100%" alt="Video Sticker" preload muted autoplay loop playsinline disablepictureinpicture >
        <img class="sticker" src="${toProxy(imgurl, staticProxy)}" alt="Video Sticker" loading="${loading}" />
      </video>
    </div>
    `
  })?.get()?.join('')
}

function getImageStickers($, item, { staticProxy, index }) {
  const loading = index > 15 ? 'eager' : 'lazy'
  return $(item).find('.tgme_widget_message_sticker')?.map((_index, image) => {
    const url = $(image)?.attr('data-webp')
    return `<img class="sticker" src="${toProxy(url, staticProxy)}" style="width: 256px;" alt="Sticker" loading="${loading}" />`
  })?.get()?.join('')
}

function toProxy(u, staticProxy) {
  if (!u) {
    return ''
  }
  const s = String(u)
  if (/^https?:\/\//i.test(s)) {
    return staticProxy + s.replace(/^https?:\/\//i, '')
  }
  if (/^\/\//.test(s)) {
    return staticProxy + s.replace(/^\/\//, '')
  }
  return staticProxy + (s.startsWith('/') ? s.slice(1) : s)
}

function getImages($, item, { staticProxy, id, index, title }) {
  const photos = $(item).find('.tgme_widget_message_photo_wrap')
  const urls = photos?.map((_i, photo) => $(photo).attr('style').match(/url\(["'](.*?)["']\)/)?.[1])?.get() || []
  if (!urls.length) {
    return ''
  }
  const loading = index > 15 ? 'eager' : 'lazy'
  const images = urls.map((url, i) => {
    const popoverId = `modal-${id}-${i}`
    const prevId = `modal-${id}-${(i - 1 + urls.length) % urls.length}`
    const nextId = `modal-${id}-${(i + 1) % urls.length}`
    const imgUrl = toProxy(url, staticProxy)
    const navHtml = urls.length > 1 ? `<div class="nav-btn nav-prev" data-target="${prevId}" aria-label="上一张">&#10094;</div>
        <div class="nav-btn nav-next" data-target="${nextId}" aria-label="下一张">&#10095;</div>` : ''
    return `
      <button class="image-preview-button image-preview-wrap" popovertarget="${popoverId}" popovertargetaction="show" data-group="${id}" data-index="${i}">
        <img src="${imgUrl}" alt="${title}" loading="${loading}" />
      </button>
      <div class="image-preview-button modal" id="${popoverId}" popover data-group="${id}" data-index="${i}">
        <div class="modal-backdrop" aria-hidden="true"></div>
        <img class="modal-img" src="${imgUrl}" alt="${title}" loading="lazy" />
        ${navHtml}
      </div>
    `
  })
  return images.length ? `<div class="image-list-container ${images.length % 2 === 0 ? 'image-list-even' : 'image-list-odd'}" data-group="${id}">${images.join('')}</div>` : ''
}

// helper: extract background-image url from inline style
function extractBgUrl(style) {
  if (!style) {
    return ''
  }
  const m = /background-image:\s*url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/i.exec(String(style))
  return (m && m[1]) ? m[1] : ''
}

// poster guard: only allow common image extensions; allow telesco.pe and other hosts
function isSafeImagePoster(u) {
  if (!u) {
    return false
  }
  const raw = String(u)
  try {
    const full = raw.startsWith('//') ? `https:${raw}` : raw
    const parsed = full.startsWith('http') ? new URL(full) : null
    const pathname = parsed ? parsed.pathname : raw.split('?')[0]
    // 仅校验是否为常见图片扩展，允许通过静态代理访问任意上游（包含 telesco.pe）
    const hasExt = /(?:\.jpe?g|\.png|\.webp)$/i.test(pathname)
    const hostOk = parsed ? /(?:telesco\.pe|cdn-telegram\.org|telegram\.org|telegram\.me|t\.me)$/i.test(parsed.hostname) : false
    const looksLikeFile = /\/file\//.test(pathname) || /[?&]token=/.test(raw)
    return Boolean(hasExt || (hostOk && looksLikeFile))
  }
  catch {
    return false
  }
}

function getVideo($, item, { staticProxy, index, id, title }) {
  const preload = index > 15 ? 'auto' : 'metadata'

  const videoWrap = $(item).find('.tgme_widget_message_video_wrap')
  const video = videoWrap.find('video')
  
  // 如果没有视频，返回空字符串
  if (!video.length) return ''

  function findPoster(scope) {
    // 1. 从视频相关元素的背景图片中提取
    const inWrap = scope.find('.tgme_widget_message_video_player, .tgme_widget_message_video_thumb, .tgme_widget_message_video')
      .toArray()
      .map(el => extractBgUrl($(el).attr('style')))
      .find(Boolean)
    if (inWrap) {
      return inWrap
    }

    // 2. 从任何包含video的元素背景图片中提取
    const any = scope.find('[style*="background-image"][class*="video"]').toArray()
      .map(el => extractBgUrl($(el).attr('style')))
      .find(Boolean)
    if (any) {
      return any
    }

    // 3. 从 data-thumb 属性中获取缩略图
    const thumbAttr = scope.find('[data-thumb]').toArray()
      .map(el => $(el).attr('data-thumb'))
      .find(Boolean)
    if (thumbAttr) {
      return thumbAttr
    }

    // 4. 从 data-src 属性中获取缩略图
    const dataSrc = scope.find('[data-src]').toArray()
      .map(el => $(el).attr('data-src'))
      .find(url => url && isSafeImagePoster(url))
    if (dataSrc) {
      return dataSrc
    }

    // 5. 查找视频容器内的img标签
    const imgInVideo = scope.find('img').toArray()
      .map(el => $(el).attr('src') || $(el).attr('data-src'))
      .find(url => url && isSafeImagePoster(url))
    if (imgInVideo) {
      return imgInVideo
    }

    // 6. 从item级别查找
    const inItem = $(item).find('.tgme_widget_message_video_player, .tgme_widget_message_video_thumb').toArray()
      .map(el => extractBgUrl($(el).attr('style')))
      .find(Boolean)

    // 7. Item 级别的 data-thumb 兜底
    const itemThumb = $(item).find('[data-thumb]').toArray()
      .map(el => $(el).attr('data-thumb'))
      .find(Boolean)

    // 8. 查找item内任何img标签作为最后兜底
    const anyImg = $(item).find('img').toArray()
      .map(el => $(el).attr('src') || $(el).attr('data-src'))
      .find(url => url && isSafeImagePoster(url))

    return inItem || itemThumb || anyImg || ''
  }

  const posterCandidate = video?.attr('poster') || findPoster(videoWrap.length ? videoWrap : $(item))
  if (isSafeImagePoster(posterCandidate)) {
    video?.attr('poster', toProxy(posterCandidate, staticProxy))
  }
  else {
    video?.removeAttr('poster')
  }

  const videoSrc = toProxy(video?.attr('src'), staticProxy)
  video?.attr('src', videoSrc)
    ?.attr('controls', true)
    ?.attr('preload', preload)
    ?.attr('playsinline', true).attr('webkit-playsinline', true)

  return $.html(video)
}

function getAudio($, item, { staticProxy }) {
  const audio = $(item).find('.tgme_widget_message_voice')
  audio?.attr('src', toProxy(audio?.attr('src'), staticProxy))
    ?.attr('controls', true)
  return $.html(audio)
}

function getLinkPreview($, item, { staticProxy, index }) {
  const link = $(item).find('.tgme_widget_message_link_preview')
  const title = $(item).find('.link_preview_title')?.text() || $(item).find('.link_preview_site_name')?.text()
  const description = $(item).find('.link_preview_description')?.text()

  link?.attr('target', '_blank').attr('rel', 'noopener').attr('title', description)

  const image = $(item).find('.link_preview_image')
  const src = image?.attr('style')?.match(/url\(["'](.*?)["']/i)?.[1]
  const loading = index > 15 ? 'eager' : 'lazy'
  const imageSrc = src ? toProxy(src, staticProxy) : ''
  image?.replaceWith(`<img class="link_preview_image" alt="${title}" src="${imageSrc}" loading="${loading}" />`)
  return $.html(link)
}

function getReply($, item, { channel }) {
  const reply = $(item).find('.tgme_widget_message_reply')
  reply?.wrapInner('<small></small>')?.wrapInner('<blockquote></blockquote>')

  const href = reply?.attr('href')
  if (href) {
    const url = new URL(href)
    reply?.attr('href', `${url.pathname}`.replace(new RegExp(`/${channel}/`, 'i'), '/posts/'))
  }

  return $.html(reply)
}

function modifyHTMLContent($, content, { index } = {}) {
  $(content).find('.emoji')?.removeAttr('style')
  $(content).find('a')?.each((_index, a) => {
    $(a)?.attr('title', $(a)?.text())?.removeAttr('onclick')
  })
  $(content).find('tg-spoiler')?.each((_index, spoiler) => {
    const id = `spoiler-${index}-${_index}`
    $(spoiler)?.attr('id', id)
      ?.wrap('<label class="spoiler-button"></label>')
      ?.before(`<input type="checkbox" />`)
  })
  $(content).find('pre').each((_index, pre) => {
    try {
      $(pre).find('br')?.replaceWith('\n')

      const code = $(pre).text()
      const language = flourite(code, { shiki: true, noUnknown: true })?.language || 'text'
      const highlightedCode = prism.highlight(code, prism.languages[language], language)
      $(pre).html(`<code class="language-${language}">${highlightedCode}</code>`)
    }
    catch (error) {
      console.error(error)
    }
  })
  return content
}

function getPost($, item, { channel, staticProxy, index = 0 }) {
  item = item ? $(item).find('.tgme_widget_message') : $('.tgme_widget_message')
  const content = $(item).find('.js-message_reply_text')?.length > 0
    ? modifyHTMLContent($, $(item).find('.tgme_widget_message_text.js-message_text'), { index })
    : modifyHTMLContent($, $(item).find('.tgme_widget_message_text'), { index })
  const title = content?.text()?.match(/^.*?(?=[。\n]|http\S)/g)?.[0] ?? content?.text() ?? ''
  const id = $(item).attr('data-post')?.replace(new RegExp(`${channel}/`, 'i'), '')

  const tags = $(content).find('a[href^="?q="]')?.each((_index, a) => {
    $(a)?.attr('href', `/search/${encodeURIComponent($(a)?.text())}`)
  })?.map((_index, a) => $(a)?.text()?.replace('#', ''))?.get()

  return {
    id,
    title,
    type: $(item).attr('class')?.includes('service_message') ? 'service' : 'text',
    datetime: $(item).find('.tgme_widget_message_date time')?.attr('datetime'),
    tags,
    text: content?.text(),
    content: [
      getReply($, item, { channel }),
      getImages($, item, { staticProxy, id, index, title }),
      getVideo($, item, { staticProxy, id, index, title }),
      getAudio($, item, { staticProxy }),
      content?.html(),
      getImageStickers($, item, { staticProxy, index }),
      getVideoStickers($, item, { staticProxy, index }),
      // $(item).find('.tgme_widget_message_sticker_wrap')?.html(),
      $(item).find('.tgme_widget_message_poll')?.html(),
      $.html($(item).find('.tgme_widget_message_document_wrap')),
      $.html($(item).find('.tgme_widget_message_video_player.not_supported')),
      $.html($(item).find('.tgme_widget_message_location_wrap')),
      getLinkPreview($, item, { staticProxy, index }),
    ].filter(Boolean).join('')
      .replace(/url\((['"])([^'")]+)\1\)/gi, (m, q, urlStr) => {
        try {
          const full = urlStr.startsWith('//') ? `https:${urlStr}` : urlStr
          const u = new URL(full)
          if (/^t\.me$/i.test(u.hostname)) {
            return m
          }
          const path = urlStr.replace(/^(https?:)?\/\//i, '')
          return `url(${q}${staticProxy}${path}${q})`
        }
        catch {
          return m
        }
      }),
  }
}

const unnessaryHeaders = ['host', 'cookie', 'origin', 'referer']

export async function getChannelInfo(Astro, { before = '', after = '', q = '', type = 'list', id = '', raw = false } = {}) {
  // Read filters & paging first so cache respects latest admin settings
  const filterKeywords = (Astro?.locals?.config?.content?.filterKeywords || []).map(k => String(k).toLowerCase()).filter(Boolean)
  const blockTags = (Astro?.locals?.config?.content?.blockTags || []).map(k => String(k).toLowerCase()).filter(Boolean)
  const pageSize = Astro?.locals?.config?.content?.maxPostsPerPage || 20

  // 规范化版本用于匹配，解决零宽字符/全角/大小写等造成的漏判
  const normalizedKeywords = filterKeywords.map(normalizeText)
  const normalizedBlockTags = blockTags.map(normalizeText)

  const cacheKey = JSON.stringify({
    before,
    after,
    q,
    type,
    id,
    raw,
    // include settings signature to bust cache when admin updates filters
    fk: filterKeywords.join('|'),
    bt: blockTags.join('|'),
    ps: pageSize,
  })
  const cachedResult = cache.get(cacheKey)

  if (cachedResult) {
    console.info('Match Cache', { before, after, q, type, id })
    return JSON.parse(JSON.stringify(cachedResult))
  }

  // Where t.me can also be telegram.me, telegram.dog
  const host = getEnv(import.meta.env, Astro, 'TELEGRAM_HOST') ?? 't.me'
  const channel = getEnv(import.meta.env, Astro, 'CHANNEL')
  const staticProxyEnv = getEnv(import.meta.env, Astro, 'STATIC_PROXY')
  const staticProxy = (staticProxyEnv && String(staticProxyEnv).trim().length > 0) ? staticProxyEnv : '/static/'
  const fetchTimeout = Number(getEnv(import.meta.env, Astro, 'FETCH_TIMEOUT')) || 8000

  const url = id ? `https://${host}/${channel}/${id}?embed=1&mode=tme` : `https://${host}/s/${channel}`
  const headers = Object.fromEntries(Astro.request.headers)

  Object.keys(headers).forEach((key) => {
    if (unnessaryHeaders.includes(key)) {
      delete headers[key]
    }
  })

  console.info('Fetching', url, { before, after, q, type, id })
  let html
  try {
    html = await $fetch(url, {
      headers,
      query: {
        before: before || undefined,
        after: after || undefined,
        q: q || undefined,
      },
      retry: 3,
      retryDelay: 100,
      timeout: fetchTimeout,
    })
  }
  catch (e) {
    console.error('Fetch Telegram failed', url, e)
    if (id) {
      const blocked = { __blocked: true }
      cache.set(cacheKey, blocked)
      return blocked
    }
    const channelInfo = {
      posts: [],
      title: '',
      description: '',
      descriptionHTML: '',
      avatar: '',
      lastId: '',
      beforeId: '',
    }
    cache.set(cacheKey, channelInfo)
    return channelInfo
  }

  const $ = cheerio.load(html, {}, false)

  if (id) {
    const post = getPost($, null, { channel, staticProxy })
    const textNorm = normalizeText(post?.text)
    const htmlNorm = normalizeText(post?.content)
    const hasKeyword = normalizedKeywords.length > 0 && normalizedKeywords.some(k => textNorm.includes(k) || htmlNorm.includes(k))
    const hasBlockedTag = normalizedBlockTags.length > 0 && (post?.tags || []).some(t => normalizedBlockTags.includes(normalizeText(t)))

    if (hasKeyword || hasBlockedTag) {
      const blocked = { __blocked: true }
      cache.set(cacheKey, blocked)
      return blocked
    }

    cache.set(cacheKey, post)
    return post
  }

  const posts = $('.tgme_channel_history  .tgme_widget_message_wrap')?.map((index, item) => {
    return getPost($, item, { channel, staticProxy, index })
  })?.get()?.reverse().filter(post => ['text'].includes(post.type) && post.id && post.content)

  // 过滤与分页：从配置读取（已在顶部读取 filterKeywords / blockTags / pageSize）
  const filtered = posts.filter((p) => {
    const tn = normalizeText(p.text)
    const hn = normalizeText(p.content)
    const hasKeyword = normalizedKeywords.length > 0 && normalizedKeywords.some(k => tn.includes(k) || hn.includes(k))
    const hasBlockedTag = normalizedBlockTags.length > 0 && (p.tags || []).some(t => normalizedBlockTags.includes(normalizeText(t)))
    return !hasKeyword && !hasBlockedTag
  })

  const sliced = raw ? filtered : filtered.slice(0, pageSize)

  // 从原始 DOM 中收集当页所有消息 ID，取最新的一条作为分页游标
  const domIds = $('.tgme_channel_history .tgme_widget_message')
    .map((_i, el) => $(el).attr('data-post')?.replace(new RegExp(`${channel}/`, 'i'), ''))
    .get()
    .map(v => Number.parseInt(v, 10))
    .filter(n => Number.isFinite(n))
    .sort((a, b) => a - b)
  const oldestId = domIds.length ? String(domIds[0]) : (posts?.[0]?.id || '')

  const channelInfo = {
    posts: sliced,
    title: $('.tgme_channel_info_header_title')?.text(),
    description: $('.tgme_channel_info_description')?.text(),
    descriptionHTML: modifyHTMLContent($, $('.tgme_channel_info_description'))?.html(),
    avatar: $('.tgme_page_photo_image img')?.attr('src'),
    lastId: oldestId,
    beforeId: oldestId,
  }

  cache.set(cacheKey, channelInfo)
  return channelInfo
}
