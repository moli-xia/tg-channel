import fs from 'node:fs/promises'
import path from 'node:path'
import { Buffer } from 'node:buffer'
import process from 'node:process'

function isLogin(Astro) {
  const cookie = Astro.request.headers.get('cookie') || ''
  return /(?:^|;\s*)admin_session=1(?:;|$)/.test(cookie)
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const EXT_MAP = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
}

export async function POST(Astro) {
  if (!isLogin(Astro)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const form = await Astro.request.formData().catch(() => null)
  const file = form?.get('file')
  if (!file || typeof file.arrayBuffer !== 'function') {
    return new Response(JSON.stringify({ ok: false, message: 'No file provided' }), { status: 400 })
  }

  const type = file.type || ''
  if (!type.startsWith('image/')) {
    return new Response(JSON.stringify({ ok: false, message: 'Only image uploads are allowed' }), { status: 415 })
  }

  const buf = Buffer.from(await file.arrayBuffer())
  if (buf.length > MAX_SIZE) {
    return new Response(JSON.stringify({ ok: false, message: 'File too large (max 5MB)' }), { status: 413 })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  const extFromType = EXT_MAP[type] || ''
  const extFromName = String(file.name || '').split('.').pop() || ''
  const ext = (extFromType || extFromName || 'png').replace(/[^a-z0-9]/gi, '')

  const safeBase = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  const filename = `${safeBase}.${ext}`
  const filepath = path.join(uploadsDir, filename)

  await fs.writeFile(filepath, buf)

  const url = `/uploads/${filename}`
  const headers = new Headers({ 'Content-Type': 'application/json' })
  return new Response(JSON.stringify({ ok: true, url }), { headers })
}