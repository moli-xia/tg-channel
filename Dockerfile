# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件
COPY . .

# 构建项目
RUN pnpm run build

# 暴露端口
EXPOSE 4321

# 设置环境变量
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# 启动应用
CMD ["pnpm", "run", "start"]