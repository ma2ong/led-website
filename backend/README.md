# 联进LED网站后端CMS系统

基于Strapi v5构建的LED显示屏企业网站内容管理系统。

## 功能特性

- 🌐 多语言支持（中文/英文）
- 📱 响应式管理界面
- 🔒 安全的API访问控制
- 📊 完整的内容管理功能
- 🎯 询盘管理系统
- 📸 媒体文件管理

## 内容类型

### 产品管理 (Products)
- 产品信息（中英文）
- 技术规格和特性
- 产品图片和文档
- 分类管理
- SEO优化

### 案例研究 (Case Studies)
- 客户案例展示
- 挑战-解决方案-成果结构
- 行业分类
- 项目图片和视频

### 新闻资讯 (News)
- 公司新闻发布
- 行业资讯
- 产品更新
- 富文本编辑

### 询盘管理 (Inquiries)
- 客户询盘收集
- 状态跟踪
- 优先级管理
- 邮件通知

### 全局设置 (Global Settings)
- 网站基本信息
- 联系方式
- 社交媒体链接
- 菜单配置

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 6.0.0
- PostgreSQL (生产环境) 或 SQLite (开发环境)

### 安装依赖
```bash
npm install
```

### 环境配置
复制 `.env.example` 到 `.env` 并配置相应参数：

```bash
cp .env.example .env
```

### 数据库配置

#### 开发环境 (SQLite)
```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

#### 生产环境 (PostgreSQL)
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=lianjin_led_cms
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_password_here
```

### 启动开发服务器
```bash
npm run develop
```

访问管理面板：http://localhost:1337/admin

### 生产环境部署
```bash
npm run build
npm start
```

## API端点

### 产品 API
- `GET /api/products` - 获取产品列表
- `GET /api/products/:id` - 获取单个产品
- `GET /api/products/slug/:slug` - 通过slug获取产品
- `GET /api/products/featured` - 获取特色产品
- `GET /api/products/category/:category` - 按分类获取产品

### 案例研究 API
- `GET /api/case-studies` - 获取案例列表
- `GET /api/case-studies/:id` - 获取单个案例
- `GET /api/case-studies/slug/:slug` - 通过slug获取案例
- `GET /api/case-studies/featured` - 获取特色案例
- `GET /api/case-studies/industry/:industry` - 按行业获取案例

### 新闻 API
- `GET /api/news` - 获取新闻列表
- `GET /api/news/:id` - 获取单篇新闻
- `GET /api/news/slug/:slug` - 通过slug获取新闻
- `GET /api/news/featured` - 获取特色新闻
- `GET /api/news/category/:category` - 按分类获取新闻

### 询盘 API
- `POST /api/inquiries` - 创建新询盘
- `GET /api/inquiries` - 获取询盘列表（需要认证）
- `PUT /api/inquiries/:id/status` - 更新询盘状态（需要认证）

### 全局设置 API
- `GET /api/global-setting` - 获取全局设置

## 权限配置

系统默认配置了以下权限：
- 公开访问：产品、案例、新闻、全局设置的读取
- 认证访问：询盘管理、内容创建和编辑
- 管理员访问：所有功能和设置

## 多语言配置

系统支持中文（zh）和英文（en）两种语言：
- 默认语言：中文（zh）
- 备用语言：英文（en）
- URL结构：`/api/products?locale=zh` 或 `/api/products?locale=en`

## 媒体文件管理

- 支持图片格式：JPG, PNG, WebP, SVG
- 支持文档格式：PDF, DOC, DOCX, XLS, XLSX
- 文件大小限制：10MB
- 自动生成多种尺寸的缩略图

## 安全配置

- CORS配置支持前端域名
- API令牌认证
- 输入验证和清理
- 文件上传安全检查
- 环境变量保护敏感信息

## 开发指南

### 添加新的内容类型
1. 在 `src/api/` 目录下创建新的API文件夹
2. 定义schema.json文件
3. 创建controller、service和routes文件
4. 配置权限和关系

### 自定义API端点
在相应的routes文件中添加自定义路由，参考现有的custom-*.ts文件。

### 数据库迁移
Strapi会自动处理数据库结构变更，无需手动迁移。

## 故障排除

### 常见问题
1. **端口占用**：修改.env中的PORT配置
2. **数据库连接失败**：检查数据库配置和服务状态
3. **权限错误**：在管理面板中配置API权限
4. **文件上传失败**：检查文件大小和格式限制

### 日志查看
开发环境下，日志会直接输出到控制台。生产环境建议配置日志文件。

## 技术支持

如有问题，请联系开发团队或查看Strapi官方文档：
- Strapi文档：https://docs.strapi.io/
- 项目仓库：[项目Git地址]

---

## 🚀 原始Strapi说明

### `develop`
Start your Strapi application with autoReload enabled.
```
npm run develop
```

### `start`
Start your Strapi application with autoReload disabled.
```
npm run start
```

### `build`
Build your admin panel.
```
npm run build
```