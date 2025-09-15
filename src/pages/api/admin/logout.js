export async function POST() {
  const headers = new Headers({
    'Content-Type': 'application/json',
    // 通过过期时间清除 cookie
    'Set-Cookie': 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
  })
  return new Response(JSON.stringify({ ok: true }), { headers })
}
