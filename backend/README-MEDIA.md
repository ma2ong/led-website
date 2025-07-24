# 媒体存储和CDN使用指南

## 快速开始

### 1. 配置Cloudinary
运行自动配置脚本：
```bash
npm run setup:cloudinary
```

或手动配置环境变量：
```env
UPLOAD_PROVIDER=cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
CLOUDINARY_FOLDER=lianjin-led
```

### 2. 测试配置
```bash
npm run test:media
```

### 3. 启动服务
```bash
npm run dev
```

## 功能特性

### 🖼️ 自动图片优化
- **格式转换**: 自动转换为WebP/AVIF格式
- **质量优化**: 智能质量调整，平衡文件大小和视觉效果
- **尺寸调整**: 根据需求自动生成不同尺寸
- **响应式图片**: 为不同设备生成适配图片

### 📱 响应式支持
- 自动生成多个断点的图片版本
- 支持现代图片格式（WebP, AVIF）
- 智能加载策略

### 🚀 CDN分发
- 全球CDN节点，快速加载
- 自动缓存策略
- 带宽优化

### 🔒 安全特性
- 文件类型验证
- 文件大小限制
- 恶意文件检测
- CORS安全配置

## API使用

### 上传文件
```javascript
// 前端上传
const formData = new FormData();
formData.append('files', file);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
```

### 获取优化图片URL
```javascript
// 后端服务
const optimizedUrl = strapi.service('api::media.media').getOptimizedUrl(
  originalUrl, 
  {
    width: 300,
    height: 200,
    quality: 80,
    format: 'webp'
  }
);
```

### 前端组件使用
```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';
import MediaUpload from '@/components/ui/media-upload';

// 优化图片显示
<OptimizedImage
  src={mediaFile}
  width={300}
  height={200}
  alt="产品图片"
  responsive
/>

// 文件上传
<MediaUpload
  onUpload={(files) => console.log('上传完成:', files)}
  accept={['image/*']}
  maxFiles={5}
  maxSize={10 * 1024 * 1024} // 10MB
/>
```

## 管理命令

### 优化现有媒体文件
```bash
npm run optimize:media
```

### 清理未使用的文件
```bash
npm run cleanup:media
```

### 测试媒体配置
```bash
npm run test:media
```

## 配置选项

### Cloudinary设置
```typescript
// config/plugins.ts
upload: {
  config: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
      folder: env('CLOUDINARY_FOLDER', 'lianjin-led'),
      // 自动优化
      transformation: [
        {
          quality: 'auto:good',
          fetch_format: 'auto',
        }
      ],
      // 响应式断点
      responsive_breakpoints: [
        {
          create_derived: true,
          bytes_step: 20000,
          min_width: 200,
          max_width: 1920
        }
      ]
    },
    sizeLimit: 50 * 1024 * 1024, // 50MB
  }
}
```

### 文件类型限制
```typescript
// 支持的文件类型
const allowedTypes = [
  'image/jpeg', 
  'image/png', 
  'image/webp', 
  'image/svg+xml', 
  'image/avif',
  'application/pdf',
  'video/mp4',
  'video/webm'
];
```

## 性能优化

### 图片优化策略
1. **产品图片**: 高质量，多尺寸变体
2. **缩略图**: 小尺寸，快速加载
3. **背景图**: 适中质量，响应式
4. **图标**: SVG格式，矢量图形

### 缓存策略
- 媒体文件：1年缓存
- 优化图片：自动缓存
- CDN分发：全球节点

### 加载优化
- 懒加载支持
- 渐进式加载
- 预加载关键图片

## 监控和分析

### 上传统计
```javascript
// 获取媒体库统计
const stats = await strapi.service('api::media.media').getStats();
console.log('总文件数:', stats.totalFiles);
console.log('总大小:', stats.totalSize);
console.log('按类型分布:', stats.byType);
```

### 性能指标
- 上传成功率
- 平均上传时间
- 存储使用量
- CDN命中率

## 故障排除

### 常见问题

**1. 上传失败**
- 检查文件大小（最大50MB）
- 验证文件类型
- 确认Cloudinary配置
- 检查网络连接

**2. 图片不显示**
- 检查CORS配置
- 验证URL格式
- 确认权限设置

**3. 优化不生效**
- 确认使用Cloudinary
- 检查变换参数
- 验证URL格式

### 调试技巧
```bash
# 查看详细日志
DEBUG=strapi:* npm run dev

# 测试Cloudinary连接
npm run test:media

# 检查上传配置
node -e "console.log(require('./config/plugins.js'))"
```

## 最佳实践

### 文件组织
```
cloudinary-folder/
├── products/          # 产品图片
├── case-studies/      # 案例图片
├── news/             # 新闻图片
├── company/          # 公司相关
└── documents/        # 文档文件
```

### 命名规范
- 使用描述性文件名
- 避免特殊字符
- 统一命名格式
- 包含版本信息

### 安全建议
- 定期更新API密钥
- 监控存储使用量
- 设置合理的文件大小限制
- 启用访问日志

### 性能建议
- 使用适当的图片尺寸
- 启用自动格式转换
- 实现响应式图片
- 优化加载策略

## 技术支持

如有问题，请查看：
1. [Cloudinary文档](https://cloudinary.com/documentation)
2. [Strapi上传插件文档](https://docs.strapi.io/dev-docs/plugins/upload)
3. 项目issue跟踪器

---

*最后更新: 2024年*