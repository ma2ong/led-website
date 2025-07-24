# Vercel部署详细指南

## 前期准备

### 1. 确保项目已准备就绪
在开始部署之前，请确保：
- ✅ 前端代码已完成开发
- ✅ 所有测试通过
- ✅ 代码已推送到GitHub仓库

### 2. 准备后端API
由于Vercel主要用于前端部署，您需要先部署后端API。推荐使用：
- **Railway** (最简单): https://railway.app
- **Render** (免费层): https://render.com
- **Heroku** (经典选择): https://heroku.com

## 第一步：创建Vercel账户

1. 访问 [Vercel官网](https://vercel.com)
2. 点击 "Sign Up" 注册账户
3. 选择 "Continue with GitHub" 使用GitHub账户登录
4. 授权Vercel访问您的GitHub仓库

## 第二步：准备GitHub仓库

### 1. 创建GitHub仓库（如果还没有）
```bash
# 在项目根目录执行
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/您的用户名/您的仓库名.git
git push -u origin main
```

### 2. 确保项目结构正确
您的仓库应该包含：
```
your-project/
├── frontend/          # Next.js前端项目
│   ├── package.json
│   ├── next.config.js
│   └── src/
├── backend/           # Strapi后端项目
└── README.md
```

## 第三步：在Vercel中导入项目

1. 登录Vercel后，点击 "New Project"
2. 选择 "Import Git Repository"
3. 找到您的GitHub仓库，点击 "Import"
4. **重要**: 配置项目设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (指向前端目录)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

## 第四步：配置环境变量

在Vercel项目设置中添加以下环境变量：

### 必需的环境变量：
```
NEXT_PUBLIC_STRAPI_API_URL=https://your-backend-api.com
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
NODE_ENV=production
```

### 可选的环境变量：
```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### 如何添加环境变量：
1. 在Vercel项目页面，点击 "Settings"
2. 选择 "Environment Variables"
3. 逐一添加上述变量
4. 选择环境：Production, Preview, Development

## 第五步：部署配置

### 1. 创建vercel.json配置文件在fronte
nd目录下创建 `vercel.json` 文件：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. 优化Next.js配置
确保 `next.config.js` 包含以下设置：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 重要：Vercel部署优化
  images: {
    domains: ['your-backend-domain.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // 其他配置...
};

module.exports = nextConfig;
```

## 第六步：执行部署

1. 确保所有更改已推送到GitHub：
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

2. 在Vercel中点击 "Deploy" 按钮
3. 等待构建完成（通常需要2-5分钟）

## 第七步：验证部署

### 1. 检查部署状态
- 在Vercel控制台查看构建日志
- 确保没有错误信息
- 检查所有页面是否正常加载

### 2. 测试功能
- 访问您的网站：`https://your-project.vercel.app`
- 测试所有主要功能：
  - 页面导航
  - 表单提交
  - 图片加载
  - 多语言切换

### 3. 性能检查
使用以下工具检查网站性能：
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Vercel内置的Analytics

## 第八步：配置自定义域名（可选）

### 1. 在Vercel中添加域名
1. 进入项目设置 → Domains
2. 添加您的域名
3. 按照提示配置DNS记录

### 2. DNS配置示例
在您的域名提供商处添加以下记录：
```
类型: CNAME
名称: www
值: cname.vercel-dns.com

类型: A
名称: @
值: 76.76.19.61
```

## 第九步：设置持续部署

Vercel会自动设置持续部署：
- 每次推送到main分支都会触发生产部署
- 推送到其他分支会创建预览部署
- Pull Request会自动生成预览链接

## 常见问题解决

### 1. 构建失败
**问题**: Build failed with exit code 1
**解决方案**:
- 检查package.json中的依赖版本
- 确保所有环境变量已正确设置
- 查看构建日志中的具体错误信息

### 2. 环境变量未生效
**问题**: 环境变量在生产环境中未生效
**解决方案**:
- 确保变量名以 `NEXT_PUBLIC_` 开头（客户端变量）
- 在Vercel设置中重新部署项目
- 检查变量是否在正确的环境中设置

### 3. 图片加载失败
**问题**: 图片无法显示
**解决方案**:
- 检查 `next.config.js` 中的 `images.domains` 配置
- 确保图片URL是HTTPS协议
- 验证Cloudinary配置是否正确

### 4. API调用失败
**问题**: 无法连接到后端API
**解决方案**:
- 确保 `NEXT_PUBLIC_STRAPI_API_URL` 指向正确的后端地址
- 检查后端CORS设置是否允许前端域名
- 验证后端API是否正常运行

## 部署后优化建议

### 1. 性能监控
- 启用Vercel Analytics
- 设置错误监控（如Sentry）
- 定期检查Core Web Vitals

### 2. SEO优化
- 提交sitemap到Google Search Console
- 设置Google Analytics
- 优化meta标签和结构化数据

### 3. 安全设置
- 启用HTTPS（Vercel自动提供）
- 配置安全头部
- 定期更新依赖包

## 成本估算

Vercel定价（2024年）：
- **Hobby计划**: 免费
  - 100GB带宽/月
  - 无限静态网站
  - 自动HTTPS
  
- **Pro计划**: $20/月
  - 1TB带宽/月
  - 高级分析
  - 密码保护

对于大多数中小型网站，免费计划已经足够使用。

## 总结

使用Vercel部署Next.js应用的优势：
- ✅ 零配置部署
- ✅ 自动HTTPS和CDN
- ✅ 持续集成/部署
- ✅ 优秀的性能优化
- ✅ 免费SSL证书
- ✅ 全球边缘网络

按照以上步骤，您应该能够成功将LED网站部署到Vercel。如果遇到任何问题，请随时询问！