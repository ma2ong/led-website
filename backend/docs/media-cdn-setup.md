# 媒体存储和CDN配置指南

## Cloudinary配置

### 1. 创建Cloudinary账户
1. 访问 [Cloudinary官网](https://cloudinary.com/)
2. 注册免费账户
3. 获取以下配置信息：
   - Cloud Name
   - API Key
   - API Secret

### 2. 环境变量配置
在 `.env` 文件中配置以下变量：

```env
# Upload Configuration
UPLOAD_PROVIDER=cloudinary

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
CLOUDINARY_FOLDER=lianjin-led
```

### 3. 功能特性

#### 自动优化
- 自动格式转换（WebP、AVIF）
- 自动质量优化
- 响应式图片生成

#### 图片变换
- 尺寸调整：`w_300,h_200`
- 质量控制：`q_80`
- 格式转换：`f_webp`
- 裁剪模式：`c_fill`

#### URL示例
```
原始URL：
https://res.cloudinary.com/demo/image/upload/sample.jpg

优化URL：
https://res.cloudinary.com/demo/image/upload/w_300,h_200,q_auto,f_auto/sample.jpg
```

## 本地存储配置

### 开发环境
```env
UPLOAD_PROVIDER=local
```

### 特性
- 文件存储在 `public/uploads/` 目录
- 支持基本的文件管理
- 适合开发和测试环境

## 媒体优化中间件

### 功能
- 自动添加缓存头
- CORS支持
- 请求日志记录
- 优化参数处理

### 配置
中间件已自动配置在 `config/middlewares.ts` 中：

```typescript
{
  name: 'global::media-optimization',
  config: {},
}
```

## API端点

### 媒体管理
- `GET /api/media` - 获取媒体列表
- `GET /api/media/:id` - 获取单个媒体文件
- `POST /api/media/upload` - 上传媒体文件
- `DELETE /api/media/:id` - 删除媒体文件
- `GET /api/media/:id/optimize` - 获取优化后的媒体URL

### 上传限制
- 文件大小：10MB
- 支持格式：
  - 图片：JPG, PNG, WebP, SVG
  - 文档：PDF, DOC, DOCX, XLS, XLSX

## 前端集成

### 媒体上传组件
```tsx
import MediaUpload from '@/components/ui/media-upload'

<MediaUpload
  onUpload={(files) => console.log('Uploaded:', files)}
  accept={['image/*']}
  maxFiles={5}
/>
```

### 优化图片组件
```tsx
import OptimizedImage from '@/components/ui/optimized-image'

<OptimizedImage
  src={mediaFile}
  width={300}
  height={200}
  quality={80}
  format="webp"
  responsive
/>
```

### 媒体工具函数
```typescript
import { getOptimizedImageUrl, formatFileSize } from '@/lib/media'

// 获取优化后的图片URL
const optimizedUrl = getOptimizedImageUrl(file, {
  width: 300,
  height: 200,
  quality: 80,
  format: 'webp'
})

// 格式化文件大小
const size = formatFileSize(file.size) // "1.2 MB"
```

## 性能优化

### 图片优化
- 自动WebP/AVIF格式转换
- 响应式图片生成
- 懒加载支持
- 缓存策略

### CDN分发
- 全球CDN节点
- 自动缓存
- 带宽优化
- 快速加载

## 安全配置

### 文件验证
- 文件类型检查
- 文件大小限制
- 恶意文件扫描

### 访问控制
- CORS配置
- API权限控制
- 安全头设置

## 监控和分析

### 上传日志
```javascript
strapi.log.info('Media uploaded', {
  count: files.length,
  totalSize: files.reduce((sum, f) => sum + f.size, 0),
  types: files.map(f => f.mime)
})
```

### 性能指标
- 上传成功率
- 平均上传时间
- 存储使用量
- CDN命中率

## 故障排除

### 常见问题

1. **上传失败**
   - 检查文件大小和格式
   - 验证Cloudinary配置
   - 查看网络连接

2. **图片不显示**
   - 检查CORS配置
   - 验证URL格式
   - 确认权限设置

3. **优化不生效**
   - 确认使用Cloudinary
   - 检查变换参数
   - 验证URL格式

### 调试技巧
- 查看浏览器Network面板
- 检查Strapi日志
- 使用Cloudinary控制台
- 测试API端点

## 最佳实践

### 图片优化
- 使用适当的图片尺寸
- 选择合适的质量设置
- 启用自动格式转换
- 实现响应式图片

### 存储管理
- 定期清理未使用的文件
- 使用文件夹组织结构
- 设置合理的缓存策略
- 监控存储使用量

### 用户体验
- 显示上传进度
- 提供错误反馈
- 支持拖拽上传
- 预览功能