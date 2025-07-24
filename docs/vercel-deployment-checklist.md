# Vercel部署检查清单

## 部署前准备 ✅

### 代码准备
- [ ] 前端代码开发完成
- [ ] 所有测试通过
- [ ] 代码已推送到GitHub
- [ ] 后端API已部署并可访问

### 账户准备
- [ ] 创建Vercel账户
- [ ] 连接GitHub账户
- [ ] 准备域名（可选）

## 部署步骤 ✅

### 1. 项目导入
- [ ] 在Vercel中点击"New Project"
- [ ] 选择GitHub仓库
- [ ] 设置Root Directory为 `frontend`
- [ ] 确认Framework为Next.js

### 2. 环境变量配置
必需变量：
- [ ] `NEXT_PUBLIC_STRAPI_API_URL` - 后端API地址
- [ ] `NEXT_PUBLIC_SITE_URL` - 前端网站地址
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary名称
- [ ] `NODE_ENV=production`

可选变量：
- [ ] `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- [ ] `NEXT_PUBLIC_SENTRY_DSN`

### 3. 配置文件
- [ ] 创建 `frontend/vercel.json`
- [ ] 确认 `next.config.js` 包含 `output: 'standalone'`
- [ ] 检查图片域名配置

### 4. 执行部署
- [ ] 点击Deploy按钮
- [ ] 等待构建完成
- [ ] 检查构建日志无错误

## 部署后验证 ✅

### 功能测试
- [ ] 网站首页正常加载
- [ ] 所有页面导航正常
- [ ] 表单提交功能正常
- [ ] 图片正常显示
- [ ] 多语言切换正常
- [ ] 移动端显示正常

### 性能检查
- [ ] Google PageSpeed Insights评分 > 90
- [ ] 首屏加载时间 < 3秒
- [ ] 图片优化正常
- [ ] CDN缓存生效

### SEO检查
- [ ] Meta标签正确
- [ ] 结构化数据正常
- [ ] Sitemap可访问
- [ ] robots.txt正确

## 可选配置 ✅

### 自定义域名
- [ ] 在Vercel中添加域名
- [ ] 配置DNS记录
- [ ] SSL证书自动生成
- [ ] 域名解析正常

### 监控设置
- [ ] 启用Vercel Analytics
- [ ] 配置错误监控
- [ ] 设置性能警报

## 常见问题检查 ✅

如果遇到问题，检查：
- [ ] 环境变量是否正确设置
- [ ] 后端API是否正常运行
- [ ] CORS设置是否正确
- [ ] 图片域名是否在next.config.js中配置
- [ ] 构建日志中是否有错误信息

## 部署成功标志 ✅

- [ ] 网站可以通过 `https://your-project.vercel.app` 访问
- [ ] 所有功能正常工作
- [ ] 性能指标达标
- [ ] 没有控制台错误
- [ ] 移动端体验良好

---

**部署完成！** 🎉

您的LED网站现已成功部署到Vercel。记住：
- 每次推送到main分支都会自动重新部署
- 可以在Vercel控制台查看部署历史和分析数据
- 如需帮助，随时联系技术支持