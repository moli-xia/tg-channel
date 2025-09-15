import { promises } from 'node:fs';
import { join, dirname } from 'node:path';
import process from 'node:process';

// 使用进程工作目录作为项目根目录，构建后也能正确定位到 data/config.json
const projectRoot = process.cwd();
const configPath = join(projectRoot, 'data/config.json');

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
  },
  templates: {
    activeTemplate: 'modern',
    customCSS: '',
    headerHtml: '',
    footerHtml: '',
  },
};

async function ensureConfigExists() {
  try {
    await promises.access(configPath);
  }
  catch {
    await promises.mkdir(dirname(configPath), { recursive: true });
    await promises.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
  }
}

async function getConfig() {
  await ensureConfigExists();
  try {
    const content = await promises.readFile(configPath, 'utf-8');
    const config = JSON.parse(content);
    return mergeDeep(defaultConfig, config)
  }
  catch (error) {
    console.error('Failed to read config:', error);
    return defaultConfig
  }
}

async function setConfig(newConfig) {
  await ensureConfigExists();
  try {
    const currentConfig = await getConfig();
    const updatedConfig = mergeDeep(currentConfig, newConfig);
    await promises.writeFile(configPath, JSON.stringify(updatedConfig, null, 2));
    return updatedConfig
  }
  catch (error) {
    console.error('Failed to write config:', error);
    throw error
  }
}

function mergeDeep(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(target[key] || {}, source[key]);
    }
    else {
      result[key] = source[key];
    }
  }
  return result
}

export { getConfig as g, setConfig as s };
