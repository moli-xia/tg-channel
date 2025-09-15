import { getConfig } from './lib/config'

export async function onRequest(context, next) {
  context.locals.SITE_URL = `${import.meta.env.SITE ?? ''}${import.meta.env.BASE_URL}`

  // 载入持久化配置
  try {
    context.locals.config = await getConfig()
  }
  catch (e) {
    console.error('Load config failed:', e)
    context.locals.config = undefined
  }



  const response = await next()

  if (!response.bodyUsed) {
    if (response.headers.get('Content-type') === 'text/html') {
      response.headers.set('Speculation-Rules', '"/rules/prefetch.json"')
    }

    if (!response.headers.has('Cache-Control')) {
      response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300')
    }

    // 根据配置设置 robots
    const noIndex = context.locals.config?.seo?.noIndex
    const noFollow = context.locals.config?.seo?.noFollow
    if (noIndex || noFollow) {
      response.headers.set('X-Robots-Tag', `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`)
    }
  }
  return response
};
