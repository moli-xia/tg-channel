import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'

// 使用进程工作目录作为项目根目录，构建后也能正确定位到 data/config.json
const projectRoot = process.cwd()
const configPath = join(projectRoot, 'data/config.json')

const defaultConfig = {
  admin: {
    username: 'admin',
    password: 'admin',
    lastLogin: null,
  },
  site: {
    title: '平壤卫视',
    description: '平壤卫视频道订阅',
    channel: 'pingrangTV',
    locale: 'zh-cn',
    timezone: 'Asia/Shanghai',
    theme: 'auto',
    // 站点副标题、LOGO、ICP备案（默认空字符串）
    subtitle: '',
    logo: '',
    icp: '',
  },
  content: {
    filterKeywords: ['广告', 'spam', '垃圾'],
    blockTags: [],
    hideEmptyPosts: true,
    maxPostsPerPage: 20,
  },
  social: {
    telegram: 'pingrangTV',
    twitter: '',
    github: '',
    discord: '',
    mastodon: '',
    bluesky: '',
  },
  seo: {
    noIndex: false,
    noFollow: false,
    googleSearchSite: '',
    rssBeautify: true,
  },
  templates: {
    activeTemplate: 'modern',
    customCSS: '',
    headerHtml: '',
    footerHtml: '',
  },
}

async function ensureConfigExists() {
  try {
    await fs.access(configPath)
  }
  catch {
    await fs.mkdir(dirname(configPath), { recursive: true })
    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2))
  }
}

export async function getConfig() {
  await ensureConfigExists()
  try {
    const content = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(content)
    return mergeDeep(defaultConfig, config)
  }
  catch (error) {
    console.error('Failed to read config:', error)
    return defaultConfig
  }
}

export async function setConfig(newConfig) {
  await ensureConfigExists()
  try {
    const currentConfig = await getConfig()
    const updatedConfig = mergeDeep(currentConfig, newConfig)
    await fs.writeFile(configPath, JSON.stringify(updatedConfig, null, 2))
    return updatedConfig
  }
  catch (error) {
    console.error('Failed to write config:', error)
    throw error
  }
}

export async function getConfigValue(path) {
  const config = await getConfig()
  return getNestedValue(config, path)
}

export async function setConfigValue(path, value) {
  const config = await getConfig()
  setNestedValue(config, path, value)
  return await setConfig(config)
}

function mergeDeep(target, source) {
  const result = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(target[key] || {}, source[key])
    }
    else {
      result[key] = source[key]
    }
  }
  return result
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.')
  const lastKey = keys.pop()
  const target = keys.reduce((current, key) => {
    if (!(key in current)) {
      current[key] = {}
    }
    return current[key]
  }, obj)
  target[lastKey] = value
}