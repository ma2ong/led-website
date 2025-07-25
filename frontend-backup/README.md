# 联进LED网站前端

基于Next.js 14构建的现代化LED显示屏企业网站前端应用。

## 技术栈

- **Next.js 14** - React框架，支持SSR和SSG
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **next-intl** - 国际化支持（中文/英文）
- **Headless UI** - 无样式UI组件库
- **Heroicons** - 精美的SVG图标库

## 功能特性

- 🌐 **多语言支持**: 中文（zh）和英文（en）双语切换
- 📱 **响应式设计**: 适配桌面、平板和移动设备
- ⚡ **性能优化**: 静态生成、图片优化、代码分割
- 🎨 **现代UI**: 基于Tailwind CSS的精美界面
- 🔒 **安全性**: 内置安全头和XSS防护
- 📊 **SEO友好**: 优化的元数据和结构化数据

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 多语言路由
│   ├── globals.css        # 全局样式
│   └── layout.tsx         # 根布局
├── components/            # React组件
│   ├── layout/           # 布局组件
│   └── ui/               # UI组件
├── lib/                  # 工具库
│   ├── strapi.ts        # Strapi API客户端
│   └── utils.ts         # 通用工具函数
├── i18n.ts              # 国际化配置
└── middleware.ts        # Next.js中间件
```

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 6.0.0

### 安装依赖
```bash
npm install
```

### 环境配置
复制 `.env.example` 到 `.env.local` 并配置相应参数：

```bash
cp .env.example .env.local
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
npm start
```

## 环境变量

### 必需配置
- `NEXT_PUBLIC_APP_URL` - 应用URL
- `NEXT_PUBLIC_STRAPI_URL` - Strapi后端API地址
- `STRAPI_API_TOKEN` - Strapi API访问令牌

### 可选配置
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary云存储名称
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `SMTP_*` - 邮件服务配置

## 多语言支持

### 支持的语言
- 中文 (zh) - 默认语言
- 英文 (en)

### 路由结构
- `/zh/` - 中文页面
- `/en/` - 英文页面

### 添加翻译
在 `messages/` 目录下编辑对应的JSON文件：
- `zh.json` - 中文翻译
- `en.json` - 英文翻译

## API集成

### Strapi CMS集成
项目通过 `src/lib/strapi.ts` 与Strapi后端进行数据交互：

```typescript
import { strapi } from '@/lib/strapi'

// 获取产品列表
const products = await strapi.getProducts({ locale: 'zh' })

// 获取单个产品
const product = await strapi.getProductBySlug('product-slug', { locale: 'zh' })
```

### 支持的API端点
- 产品管理 (Products)
- 案例研究 (Case Studies)  
- 新闻资讯 (News)
- 全局设置 (Global Settings)
- 询盘提交 (Inquiries)

## 样式系统

### Tailwind CSS配置
- 自定义颜色主题（主色调：蓝色）
- 响应式断点
- 自定义动画和过渡效果
- 实用工具类

### 组件样式类
```css
.heading-1    /* 主标题样式 */
.heading-2    /* 二级标题样式 */
.body-large   /* 大号正文样式 */
.btn-primary  /* 主要按钮样式 */
.btn-secondary /* 次要按钮样式 */
```

## 组件库

### 布局组件
- `Header` - 网站头部导航
- `Footer` - 网站底部信息

### UI组件
- 基于Headless UI构建
- 完全可定制的样式
- 支持键盘导航和无障碍访问

## 性能优化

### 图片优化
- Next.js Image组件自动优化
- 支持WebP格式
- 懒加载和响应式图片

### 代码分割
- 自动路由级代码分割
- 动态导入支持
- 优化的包大小

### 缓存策略
- 静态资源缓存
- API响应缓存
- 增量静态再生成(ISR)

## 部署

### Vercel部署（推荐）
```bash
npm install -g vercel
vercel
```

### 其他平台
项目支持部署到任何支持Node.js的平台：
- Netlify
- AWS Amplify
- 自托管服务器

## 开发指南

### 添加新页面
1. 在 `src/app/[locale]/` 下创建页面文件
2. 添加相应的翻译文本
3. 更新导航菜单（如需要）

### 创建新组件
1. 在 `src/components/` 下创建组件文件
2. 使用TypeScript定义props类型
3. 添加必要的样式和交互逻辑

### API数据获取
```typescript
// 服务端数据获取
export default async function Page() {
  const data = await strapi.getProducts()
  return <div>{/* 渲染数据 */}</div>
}

// 客户端数据获取
'use client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    strapi.getProducts().then(setData)
  }, [])
  
  return <div>{/* 渲染数据 */}</div>
}
```

## 故障排除

### 常见问题
1. **构建失败**: 检查TypeScript类型错误
2. **API连接失败**: 验证环境变量配置
3. **翻译缺失**: 检查messages文件中的键值
4. **样式问题**: 确认Tailwind CSS类名正确

### 调试技巧
- 使用浏览器开发者工具
- 检查Network面板的API请求
- 查看Console中的错误信息
- 使用Next.js内置的错误页面

## 贡献指南

1. Fork项目仓库
2. 创建功能分支
3. 提交代码更改
4. 创建Pull Request

## 技术支持

如有问题，请联系开发团队或查看相关文档：
- Next.js文档: https://nextjs.org/docs
- Tailwind CSS文档: https://tailwindcss.com/docs
- next-intl文档: https://next-intl-docs.vercel.app/

---

## 许可证

本项目采用MIT许可证。