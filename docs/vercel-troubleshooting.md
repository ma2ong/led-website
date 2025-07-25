# Vercel部署故障排除指南

## 🔧 已修复的问题

### 问题1: DEPLOYMENT_NOT_FOUND 错误
**原因**: Next.js配置中的i18n设置与App Router不兼容
**解决方案**: 
- ✅ 移除了next.config.js中的i18n配置
- ✅ 修复了路由重定向（从/zh改为/zh-Hans）
- ✅ 添加了向后兼容的重定向规则

### 问题2: 路由不匹配
**原因**: 根页面重定向到/zh，但i18n配置使用zh-Hans
**解决方案**:
- ✅ 更新根页面重定向到/zh-Hans
- ✅ 添加/zh到/zh-Hans的重定向规则

## 🚀 现在应该做什么

### 1. 等待自动重新部署
Vercel会自动检测到GitHub的更新并重新部署。您可以：
- 在Vercel控制台查看部署状态
- 等待2-5分钟让部署完成

### 2. 检查部署状态
访问您的Vercel项目页面：
- 查看"Deployments"标签
- 确认最新部署状态为"Ready"
- 查看构建日志确认没有错误

### 3. 测试网站
部署完成后，访问您的网站：
- 主页应该自动重定向到/zh-Hans
- 检查页面是否正常显示
- 测试语言切换功能

## 🔍 如果仍有问题

### 检查Vercel设置
确认以下设置正确：
- **Root Directory**: `frontend` ✅
- **Framework**: Next.js ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

### 环境变量
确认已设置：
```
NEXT_PUBLIC_STRAPI_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NODE_ENV=production
```

### 常见错误及解决方案

#### 1. 构建失败
**错误**: Build failed
**解决方案**:
- 检查构建日志中的具体错误
- 确认所有依赖都已正确安装
- 检查TypeScript类型错误

#### 2. 页面404错误
**错误**: Page not found
**解决方案**:
- 确认文件路径正确
- 检查动态路由配置
- 验证locale参数

#### 3. 环境变量未生效
**错误**: API调用失败
**解决方案**:
- 确认变量名以NEXT_PUBLIC_开头
- 在Vercel设置中重新部署
- 检查变量值是否正确

## 📊 部署成功的标志

当部署成功时，您应该看到：
- ✅ Vercel显示"Deployment Ready"
- ✅ 网站可以正常访问
- ✅ 页面自动重定向到/zh-Hans
- ✅ 没有控制台错误
- ✅ 样式和功能正常

## 🆘 需要进一步帮助

如果问题仍然存在，请提供：
1. Vercel部署日志的错误信息
2. 浏览器控制台的错误信息
3. 具体的错误页面截图
4. 您的Vercel项目URL

我会根据具体错误信息为您提供针对性的解决方案！