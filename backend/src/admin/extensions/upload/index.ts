export default {
  config: {
    // 媒体库配置
    settings: {
      // 文件大小限制 (50MB)
      sizeLimit: 50 * 1024 * 1024,
      
      // 允许的文件类型
      allowedTypes: [
        'images',
        'videos',
        'files',
        'audios'
      ],
      
      // 图片格式配置
      formats: {
        thumbnail: {
          width: 245,
          height: 156,
          quality: 80,
        },
        small: {
          width: 500,
          height: 500,
          quality: 85,
        },
        medium: {
          width: 750,
          height: 750,
          quality: 85,
        },
        large: {
          width: 1000,
          height: 1000,
          quality: 90,
        },
        xlarge: {
          width: 1920,
          height: 1080,
          quality: 90,
        },
      },
      
      // 自动优化配置
      optimization: {
        // 自动压缩图片
        autoCompress: true,
        
        // 压缩质量
        quality: 85,
        
        // 自动生成WebP格式
        generateWebP: true,
        
        // 保留原始文件
        keepOriginal: true,
      },
      
      // 文件夹组织
      folders: {
        // 按类型自动分类
        autoOrganize: true,
        
        // 默认文件夹结构
        structure: {
          products: '产品图片',
          cases: '案例图片',
          news: '新闻图片',
          documents: '文档资料',
          logos: '标志图标',
          banners: '横幅图片',
          certificates: '证书资质',
        },
      },
      
      // 元数据配置
      metadata: {
        // 自动提取EXIF信息
        extractExif: true,
        
        // 自动生成Alt文本
        generateAlt: true,
        
        // 自动标记
        autoTagging: true,
      },
    },
    
    // 自定义上传界面
    interface: {
      // 拖拽上传
      dragAndDrop: true,
      
      // 批量上传
      multiple: true,
      
      // 进度显示
      showProgress: true,
      
      // 预览功能
      preview: true,
      
      // 编辑功能
      editing: {
        crop: true,
        resize: true,
        rotate: true,
        filters: true,
      },
    },
    
    // 搜索和过滤
    search: {
      // 可搜索字段
      fields: ['name', 'alternativeText', 'caption'],
      
      // 过滤选项
      filters: {
        type: ['image', 'video', 'document', 'audio'],
        size: ['small', 'medium', 'large'],
        date: ['today', 'week', 'month', 'year'],
        folder: 'dynamic', // 动态加载文件夹列表
      },
      
      // 排序选项
      sorting: {
        default: 'createdAt:desc',
        options: [
          'name:asc',
          'name:desc',
          'size:asc',
          'size:desc',
          'createdAt:asc',
          'createdAt:desc',
        ],
      },
    },
  },
};