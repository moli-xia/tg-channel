import { getConfig, setConfig } from '../../../lib/config'

function isLogin(Astro) {
  const cookie = Astro.request.headers.get('cookie') || ''
  return /(?:^|;\s*)admin_session=1(?:;|$)/.test(cookie)
}

export async function GET(Astro) {
  if (!isLogin(Astro)) {
    return new Response('Unauthorized', { status: 401 })
  }
  const config = await getConfig()
  return new Response(JSON.stringify(config), { headers: { 'Content-Type': 'application/json' } })
}

export async function POST(Astro) {
  if (!isLogin(Astro)) {
    return new Response('Unauthorized', { status: 401 })
  }
  const data = await Astro.request.json().catch(() => ({}))
  const updated = await setConfig(data)
  return new Response(JSON.stringify(updated), { headers: { 'Content-Type': 'application/json' } })
}