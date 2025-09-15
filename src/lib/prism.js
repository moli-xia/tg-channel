// 简单的代码高亮工具
// 为了避免引入大型库，提供基本的语法高亮功能

const languageMap = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  cpp: 'cpp',
  c: 'c',
  java: 'java',
  php: 'php',
  sh: 'bash',
  bash: 'bash',
  zsh: 'bash',
  sql: 'sql',
  html: 'html',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  json: 'json',
  xml: 'xml',
  yaml: 'yaml',
  yml: 'yaml',
  md: 'markdown',
  markdown: 'markdown',
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function highlightCode(code, language) {
  // 基本的HTML转义
  const escaped = escapeHtml(code)

  // 简单的语法高亮（仅处理常见模式）
  if (language === 'javascript' || language === 'typescript') {
    return escaped
      .replace(/\b(const|let|var|function|class|if|else|for|while|return|import|export|from|default)\b/g, '<span class="keyword">$1</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
      .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
      .replace(/`([^`\\]|\\.)*`/g, '<span class="string">$&</span>')
  }

  if (language === 'python') {
    return escaped
      .replace(/\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield)\b/g, '<span class="keyword">$1</span>')
      .replace(/#.*$/gm, '<span class="comment">$&</span>')
      .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
      .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
  }

  if (language === 'css' || language === 'scss') {
    return escaped
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/([a-z-]+)(\s*:\s*)/gi, '<span class="property">$1</span>$2')
      .replace(/#[0-9a-f]{3,6}/gi, '<span class="value">$&</span>')
      .replace(/\b\d+(?:px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax|fr)\b/g, '<span class="value">$&</span>')
  }

  return escaped
}

export default {
  highlight(code, language) {
    const normalizedLang = languageMap[language?.toLowerCase()] || language?.toLowerCase()
    return highlightCode(code, normalizedLang)
  },
}
