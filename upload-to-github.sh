#!/bin/bash

# TG Channel 项目一键上传到 GitHub 脚本
# 使用方法: ./upload-to-github.sh

set -e

echo "🚀 开始上传 TG Channel 项目到 GitHub..."

# 检查是否已经是 git 仓库
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
else
    echo "✅ Git 仓库已存在"
fi

# 添加所有文件到暂存区
echo "📁 添加文件到暂存区..."
git add .

# 检查是否有文件需要提交
if git diff --staged --quiet; then
    echo "ℹ️  没有文件需要提交"
else
    # 提交更改
    echo "💾 提交更改..."
    git commit -m "Initial commit: TG Channel project"
fi

# 检查是否已经添加了远程仓库
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ 远程仓库已存在"
else
    echo "🔗 添加远程仓库..."
    git remote add origin https://github.com/moli-xia/tg-channel.git
fi

# 设置默认分支为 main
echo "🌿 设置默认分支为 main..."
git branch -M main

# 推送到 GitHub
echo "⬆️  推送到 GitHub..."
git push -u origin main

echo "✅ 项目已成功上传到 GitHub!"
echo "🌐 项目地址: https://github.com/moli-xia/tg-channel"
echo ""
echo "📋 后续步骤:"
echo "1. 访问 https://github.com/moli-xia/tg-channel 查看项目"
echo "2. 根据需要配置 GitHub Pages 或其他部署选项"
echo "3. 更新项目描述和标签"
echo "4. 添加 LICENSE 文件（如需要）"