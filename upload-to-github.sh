#!/bin/bash

# TG Channel 项目一键上传到 GitHub 脚本
# 使用方法: ./upload-to-github.sh [GitHub用户名] [仓库名]
# 示例: ./upload-to-github.sh your-username tg-channel

set -e

# 获取参数
GITHUB_USERNAME=${1:-"your-username"}
REPO_NAME=${2:-"tg-channel"}
GITHUB_REPO="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "🚀 开始上传 TG Channel 项目到 GitHub..."
echo "📍 目标仓库: ${GITHUB_REPO}"

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
    echo "🔄 更新远程仓库地址..."
    git remote set-url origin ${GITHUB_REPO}
else
    echo "🔗 添加远程仓库..."
    git remote add origin ${GITHUB_REPO}
fi

# 设置默认分支为 main
echo "🌿 设置默认分支为 main..."
git branch -M main

# 推送到 GitHub
echo "⬆️  推送到 GitHub..."
git push -u origin main

echo "✅ 项目已成功上传到 GitHub!"
echo "🌐 项目地址: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "📋 后续步骤:"
echo "1. 在 GitHub 上创建新仓库: https://github.com/new"
echo "2. 仓库名设置为: ${REPO_NAME}"
echo "3. 如果仓库已存在但为空，直接推送即可"
echo "4. 如果需要修改仓库地址，请使用: ./upload-to-github.sh 用户名 仓库名"
echo "5. 根据需要配置 GitHub Pages 或其他部署选项"
echo "6. 更新项目描述和标签"
echo "7. 添加 LICENSE 文件（如需要）"