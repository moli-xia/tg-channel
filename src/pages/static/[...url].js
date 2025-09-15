const targetWhitelist = [
  't.me',
  'telegram.org',
  'telegram.me',
  'telegram.dog',
  'cdn-telegram.org',
  'telesco.pe',
  'yandex.ru',
]

function normalizeUpstream(raw, search) {
  let r = String(raw || '')
  // 去掉首部多余空格
  r = r.trim()
  // 支持 /static/https:/cdn... => https://cdn...
  r = r.replace(/^https?:\/+/, m => (m.toLowerCase().startsWith('https') ? 'https://' : 'http://'))
  // 支持 /static//cdn... => https://cdn...
  if (r.startsWith('//')) {
    r = `https:${r}`
  }
  // 支持 /static/cdn... => https://cdn...
  if (!/^https?:\/\//i.test(r)) {
    r = `https://${r}`
  }
  return new URL(r + (search || ''))
}

export async function GET({ request, params, url }) {
  try {
    const targetURL = normalizeUpstream(params.url, url.search)

    if (!targetWhitelist.some(domain => targetURL.hostname.endsWith(domain))) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: targetURL.toString(),
        },
      })
    }

    // 仅透传必要的请求头，支持 Range 以提升视频/音频体验
    const headers = new Headers()
    const range = request.headers.get('range')
    if (range) {
      headers.set('Range', range)
    }
    const accept = request.headers.get('accept') || '*/*'
    headers.set('Accept', accept)
    const ua = request.headers.get('user-agent') || 'Mozilla/5.0'
    headers.set('User-Agent', ua)

    const upstream = await fetch(targetURL.toString(), { method: 'GET', headers })

    const outHeaders = new Headers()
    upstream.headers.forEach((value, key) => {
      outHeaders.append(key, value)
    })
    // 可选强化：若上游未设置缓存策略，提供一个合理的缓存
    if (!outHeaders.has('Cache-Control')) {
      outHeaders.set('Cache-Control', 'public, max-age=3600')
    }
    // 开放跨域，便于前端 video/audio 标签加载
    outHeaders.set('Access-Control-Allow-Origin', '*')

    return new Response(upstream.body, {
      status: upstream.status,
      headers: outHeaders,
    })
  }
  catch (error) {
    return new Response(error?.message || 'Upstream fetch error', { status: 500 })
  }
}

export async function HEAD({ request, params, url }) {
  try {
    const targetURL = normalizeUpstream(params.url, url.search)

    if (!targetWhitelist.some(domain => targetURL.hostname.endsWith(domain))) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: targetURL.toString(),
        },
      })
    }

    const headers = new Headers()
    const range = request.headers.get('range')
    if (range) {
      headers.set('Range', range)
    }
    const accept = request.headers.get('accept') || '*/*'
    headers.set('Accept', accept)
    const ua = request.headers.get('user-agent') || 'Mozilla/5.0'
    headers.set('User-Agent', ua)

    const upstream = await fetch(targetURL.toString(), { method: 'HEAD', headers })

    const outHeaders = new Headers()
    upstream.headers.forEach((value, key) => {
      outHeaders.append(key, value)
    })
    if (!outHeaders.has('Cache-Control')) {
      outHeaders.set('Cache-Control', 'public, max-age=3600')
    }
    outHeaders.set('Access-Control-Allow-Origin', '*')

    return new Response(null, {
      status: upstream.status,
      headers: outHeaders,
    })
  }
  catch (error) {
    return new Response(error?.message || 'Upstream fetch error', { status: 500 })
  }
}
