# Docker部署LOGO显示问题修复指南

## 问题描述

在使用Docker部署TG Channel项目时，可能会遇到LOGO和上传图片不显示的问题。

## 问题原因

Docker容器中的 `public/uploads` 目录挂载到宿主机时，如果宿主机对应目录为空或不存在相应文件，就会导致LOGO和上传的图片无法显示。

## 解决方案

### 方案1：恢复丢失的文件（推荐）

如果您有原始的LOGO文件，请将其复制到宿主机的 `./public/uploads/` 目录：

```bash
# 在docker-compose.yml所在目录执行
mkdir -p ./public/uploads
# 将您的LOGO文件复制到该目录
cp /path/to/your/logo.png ./public/uploads/
```

### 方案2：重新上传LOGO

1. 访问管理后台：`http://your-domain:4321/admin`
2. 登录后进入设置页面（默认用户名/密码：admin/admin）
3. 重新上传LOGO文件
4. 保存配置

### 方案3：修改配置使用默认LOGO

编辑 `./data/config.json` 文件，将LOGO字段设置为空：

```json
{
  "site": {
    "logo": ""
  }
}
```

### 方案4：确保目录权限正确

```bash
# 确保uploads目录有正确的权限
sudo chown -R 1000:1000 ./public/uploads
sudo chmod -R 755 ./public/uploads
```

## 预防措施

为避免类似问题，建议：

1. **备份重要文件**：定期备份 `./data` 和 `./public/uploads` 目录
2. **使用绝对路径挂载**：在生产环境中使用绝对路径进行Docker挂载
3. **检查文件权限**：确保Docker容器有读写挂载目录的权限

## 验证修复

完成上述任何一个方案后：

1. 重启Docker容器：`docker-compose restart`
2. 访问网站首页检查LOGO是否正常显示
3. 访问管理后台测试文件上传功能

## 技术细节

- 上传API位置：`/src/pages/api/admin/upload.js`
- 文件存储路径：`public/uploads/`
- Docker挂载配置：`./public/uploads:/app/public/uploads`
- 配置文件：`data/config.json`