import { getConfig } from '../../../lib/config'

export async function POST(Astro) {
  const data = await Astro.request.json().catch(() => ({}))
  const { username, password } = data
  const config = await getConfig()

  const ok = username === config.admin.username && password === config.admin.password
  if (!ok) {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid credentials' }), { status: 401 })
  }

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Set-Cookie': `admin_session=1; Path=/; HttpOnly; SameSite=Lax`,
  })
  return new Response(JSON.stringify({ ok: true }), { headers })
}
