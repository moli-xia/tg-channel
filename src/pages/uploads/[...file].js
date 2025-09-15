import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export async function GET({ params }) {
  try {
    const filePath = params.file
    if (!filePath) {
      return new Response('File not found', { status: 404 })
    }

    // 安全检查：防止路径遍历攻击
    const safePath = path.normalize(filePath).replace(/^(\.[\\/])+/, '')
    const fullPath = path.join(process.cwd(), 'public', 'uploads', safePath)
    
    // 确保文件在uploads目录内
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fullPath.startsWith(uploadsDir)) {
      return new Response('Access denied', { status: 403 })
    }

    // 检查文件是否存在
    try {
      const stats = await fs.stat(fullPath)
      if (!stats.isFile()) {
        return new Response('File not found', { status: 404 })
      }
    } catch {
      return new Response('File not found', { status: 404 })
    }

    // 读取文件
    const fileBuffer = await fs.readFile(fullPath)
    
    // 获取MIME类型
    const ext = path.extname(fullPath).toLowerCase()
    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }
    const mimeType = mimeTypes[ext] || 'application/octet-stream'
    
    // 返回文件
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000', // 缓存1年
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error serving uploaded file:', error)
    return new Response('Internal server error', { status: 500 })
  }
}