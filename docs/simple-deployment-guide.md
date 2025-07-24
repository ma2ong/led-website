# LED网站部署指南 - 简化版

## 🚀 快速部署方案

我推荐使用最简单的部署方案：**前端部署到Vercel，后端部署到Railway**

### 为什么选择这个方案？
- ✅ **零配置部署** - 不需要管理服务器
- ✅ **自动HTTPS** - 自动配置SSL证书
- ✅ **全球CDN** - 网站访问速度快
- ✅ **免费额度** - 小型网站完全免费
- ✅ **自动备份** - 平台自动处理备份

## 📋 部署前准备

### 1. 注册必要账户
- [Vercel](https://vercel.com) - 用于前端部署
- [Railway](https://railway.app) - 用于后端部署
- [Cloudinary](https://cloudinary.com) - 用于图片存储
- [GitHub](https://github.com) - 用于代码托管

### 2. 准备域名（可选）
- 如果有自己的域名，可以在部署后绑定
- 没有域名也可以使用平台提供的免费域名

## 🔧 第一步：准备代码

### 1. 上传代码到GitHub
```bash
# 初始化Git仓库
git init
git add .
git commit -m "Initial commit"

# 创建GitHub仓库并推送
git remote add origin https://github.com/你的用户名/led-website.git
git push -u origin main
```

## 🌐 第二步：部署后端 (Strapi)

### 1. 登录Railway
- 访问 [railway.app](https://railway.app)
- 使用GitHub账户登录

### 2. 创建新项目
- 点击 "New Project"
- 选择 "Deploy from GitHub repo"
- 选择你的LED网站仓库
- 选择 `backend` 文件夹

### 3. 配置环境变量
在Railway项目设置中添加以下环境变量：

```env
NODE_ENV=production
DATABASE_CLIENT=postgres
JWT_SECRET=你的JWT密钥
ADMIN_JWT_SECRET=你的管理员JWT密钥
API_TOKEN_SALT=你的API令牌盐
APP_KEYS=密钥1,密钥2,密钥3,密钥4

# Cloudinary配置
CLOUDINARY_NAME=你的Cloudinary名称
CLOUDINARY_KEY=你的Cloudinary密钥
CLOUDINARY_SECRET=你的Cloudinary秘钥

# 邮件配置（可选）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=你的邮箱
SMTP_PASSWORD=你的邮箱密码
```

### 4. 添加PostgreSQL数据库
- 在Railway项目中点击 "Add Service"
- 选择 "PostgreSQL"
- Railway会自动配置数据库连接

### 5. 部署
- Railway会自动检测到Strapi项目并开始部署
- 等待部署完成，获取后端API地址

## 🎨 第三步：部署前端 (Next.js)

### 1. 登录Vercel
- 访问 [vercel.com](https://vercel.com)
- 使用GitHub账户登录

### 2. 导入项目
- 点击 "New Project"
- 选择你的LED网站仓库
- 选择 `frontend` 文件夹作为根目录

### 3. 配置环境变量
在Vercel项目设置中添加：

```env
NEXT_PUBLIC_STRAPI_API_URL=你的Railway后端地址/api
NEXT_PUBLIC_SITE_URL=你的Vercel前端地址
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=你的Cloudinary名称
```

### 4. 部署
- 点击 "Deploy"
- Vercel会自动构建和部署前端
- 获取前端网站地址

## ✅ 第四步：配置和测试

### 1. 初始化后端数据
- 访问你的后端地址 + `/admin`
- 创建管理员账户
- 配置内容类型和权限

### 2. 测试网站功能
- 访问前端网站地址
- 测试中英文切换
- 测试产品页面
- 测试联系表单

### 3. 绑定自定义域名（可选）
- 在Vercel项目设置中添加自定义域名
- 在域名提供商处配置DNS记录

## 🔒 安全配置

### 1. 更新CORS设置
在Railway后端环境变量中添加：
```env
CORS_ORIGIN=你的前端域名
```

### 2. 配置安全头
前端会自动配置安全头，无需额外设置

## 📊 监控和维护

### 1. 监控工具
- Vercel自带性能监控
- Railway提供应用监控
- 可以集成Google Analytics

### 2. 备份
- Railway自动备份数据库
- 代码备份在GitHub
- Cloudinary自动备份媒体文件

## 🆘 常见问题

### Q: 部署失败怎么办？
A: 检查环境变量配置，查看部署日志，确保所有必需的变量都已设置

### Q: 网站访问慢怎么办？
A: Vercel和Railway都有全球CDN，通常访问速度很快。如果慢，可能是图片没有优化

### Q: 如何更新网站内容？
A: 通过后端管理界面 (你的后端地址/admin) 更新内容

### Q: 如何备份数据？
A: Railway会自动备份数据库，你也可以手动导出数据

## 💰 费用说明

### 免费额度
- **Vercel**: 个人项目免费，包含100GB带宽
- **Railway**: 每月$5免费额度，通常够小型网站使用
- **Cloudinary**: 每月25GB免费存储和带宽

### 付费升级
- 如果超出免费额度，可以按需付费升级
- 通常小型企业网站月费用在$10-30之间

---

**需要帮助？** 我可以帮你完成每一个步骤！