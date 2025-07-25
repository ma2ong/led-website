# Vercel部署步骤清单

## ✅ 已完成
- [x] GitHub仓库创建成功
- [x] 代码推送到GitHub
- [x] 仓库地址：https://github.com/ma2ong/led-website

## 🚀 接下来的步骤

### 1. 访问Vercel
- [ ] 打开 https://vercel.com
- [ ] 使用GitHub账户登录

### 2. 导入项目
- [ ] 点击 "New Project"
- [ ] 选择 "ma2ong/led-website" 仓库
- [ ] 点击 "Import"

### 3. 配置项目（重要！）
- [ ] Framework Preset: Next.js
- [ ] **Root Directory: `frontend`** ⚠️ 这个很重要！
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`

### 4. 环境变量配置
添加以下环境变量：
```
NEXT_PUBLIC_STRAPI_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://led-website.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
NODE_ENV=production
```

### 5. 部署
- [ ] 点击 "Deploy" 按钮
- [ ] 等待构建完成

### 6. 验证
- [ ] 访问生成的网站地址
- [ ] 检查网站是否正常显示
- [ ] 测试页面导航

## 🔧 如果遇到问题

### 构建失败
- 检查Root Directory是否设置为 `frontend`
- 查看构建日志中的错误信息
- 确认环境变量设置正确

### 页面无法访问
- 检查Next.js配置文件
- 确认vercel.json配置正确
- 查看Vercel控制台的错误日志

## 📞 需要帮助？
如果在部署过程中遇到任何问题，请告诉我具体的错误信息，我会帮您解决！

## 🎯 部署成功后
一旦部署成功，您将获得：
- ✅ 全球CDN加速的网站
- ✅ 自动HTTPS证书
- ✅ 持续部署（每次推送代码自动更新）
- ✅ 性能监控和分析