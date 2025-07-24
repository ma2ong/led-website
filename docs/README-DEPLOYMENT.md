# LED网站部署指南

## 快速开始

### 1. 运行部署前检查
```bash
node scripts/vercel-deploy-check.js
```

### 2. 选择部署方式

#### 方式一：Vercel部署（推荐）
- 📖 详细指南：[vercel-deployment-guide.md](./vercel-deployment-guide.md)
- ✅ 检查清单：[vercel-deployment-checklist.md](./vercel-deployment-checklist.md)

#### 方式二：传统VPS部署
- 📖 详细指南：[deployment-checklist.md](./deployment-checklist.md)

## 文件说明

| 文件 | 用途 |
|------|------|
| `vercel-deployment-guide.md` | Vercel部署详细步骤 |
| `vercel-deployment-checklist.md` | Vercel部署检查清单 |
| `deployment-checklist.md` | 通用部署检查清单 |
| `simple-deployment-guide.md` | 简化部署指南 |
| `../scripts/vercel-deploy-check.js` | 部署前自动检查脚本 |
| `../frontend/vercel.json` | Vercel配置文件 |

## 推荐部署流程

1. **准备阶段**
   ```bash
   # 运行检查脚本
   node scripts/vercel-deploy-check.js
   
   # 确保代码已提交
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **后端部署**
   - 使用Railway、Render或Heroku部署Strapi后端
   - 获取后端API地址

3. **前端部署**
   - 使用Vercel部署Next.js前端
   - 配置环境变量
   - 设置自定义域名（可选）

## 需要帮助？

- 🐛 遇到问题：检查[常见问题解决](./vercel-deployment-guide.md#常见问题解决)
- 📧 技术支持：联系开发团队
- 📚 官方文档：[Vercel文档](https://vercel.com/docs) | [Next.js文档](https://nextjs.org/docs)