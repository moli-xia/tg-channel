# TG Channel - Telegram频道内容聚合平台

一个基于 Astro 构建的现代化 Telegram 频道内容聚合平台，支持多端访问和移动应用。

## 功能特性

- 📺 Telegram 频道内容聚合
- 📱 响应式设计，支持移动端
- 🔍 智能搜索功能
- 🌙 深色/浅色主题切换
- 📦 支持 PWA 和原生 Android 应用
- ⚡ 基于 Astro 的高性能 SSR

## 部署方式

### 🚀 一键安装（推荐）

```bash
# 克隆项目
git clone https://github.com/moli-xia/tg-channel.git
cd tg-channel

# 安装依赖并启动
npm install
npm run build
npm run start
```

访问 `http://localhost:4321` 即可使用。

### 🐳 Docker 部署

#### 使用 Docker Compose（推荐）

```bash
# 克隆项目
git clone https://github.com/moli-xia/tg-channel.git
cd tg-channel

# 启动服务
docker-compose up -d
```

#### 手动 Docker 部署

```bash
# 构建镜像
docker build -t tg-channel .

# 运行容器
docker run -d -p 4321:4321 --name tg-channel tg-channel
```

### 🛠️ 手动安装

#### 环境要求

- Node.js >= 18.0.0
- npm 或 pnpm

#### 安装步骤

1. **克隆项目**

   ```bash
   git clone https://github.com/moli-xia/tg-channel.git
   cd tg-channel
   ```

2. **安装依赖**

   ```bash
   # 使用 npm
   npm install

   # 或使用 pnpm（推荐）
   pnpm install
   ```

3. **配置环境变量**

   ```bash
   cp .env.example .env
   # 编辑 .env 文件，配置必要的环境变量
   ```

4. **构建项目**

   ```bash
   npm run build
   ```

5. **启动服务**

   ```bash
   # 生产环境
   npm run start

   # 开发环境
   npm run dev
   ```

### 📱 移动应用构建

#### Android APK

```bash
# 进入移动应用目录
cd mobile-app

# 同步 Web 资源
npx cap sync android

# 构建 APK
cd android
./gradlew assembleDebug
```

生成的 APK 文件位于 `mobile-app/android/app/build/outputs/apk/debug/`

### 🔧 PM2 部署（生产环境推荐）

```bash
# 安装 PM2
npm install -g pm2

# 构建项目
npm run build

# 使用 PM2 启动
npm run start:pm2

# 查看状态
pm2 status

# 重启服务
npm run restart:pm2

# 停止服务
npm run stop:pm2
```

## 配置说明

### 环境变量

在 `.env` 文件中配置以下变量：

```env
# 服务器配置
HOST=0.0.0.0
PORT=4321

# 应用配置
SITE_TITLE=TG Channel
SITE_DESCRIPTION=Telegram频道内容聚合平台

# Telegram 配置
TG_API_ID=your_api_id
TG_API_HASH=your_api_hash
TG_BOT_TOKEN=your_bot_token
```

### 数据配置

编辑 `data/config.json` 文件来配置站点信息：

```json
{
  "site": {
    "title": "TG Channel",
    "description": "Telegram频道内容聚合平台",
    "channel": "your_channel_name"
  }
}
```

## 开发指南

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 代码格式化
npm run lint:fix
```

### 项目结构

```
├── src/
│   ├── components/     # 组件
│   ├── layouts/        # 布局
│   ├── pages/          # 页面
│   ├── assets/         # 静态资源
│   └── lib/            # 工具库
├── public/             # 公共资源
├── mobile-app/         # 移动应用
├── data/               # 数据配置
└── dist/               # 构建输出
```

## 技术栈

- **前端框架**: Astro
- **样式**: CSS3
- **移动应用**: Capacitor
- **构建工具**: Vite
- **部署**: Node.js + PM2

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- GitHub: [@moli-xia](https://github.com/moli-xia)
- 项目地址: [https://github.com/moli-xia/tg-channel](https://github.com/moli-xia/tg-channel)