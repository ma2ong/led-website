export default ({ env }) => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'zh',
      locales: ['zh', 'en'],
    },
  },
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local'),
      providerOptions: env('UPLOAD_PROVIDER') === 'cloudinary' ? {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
        folder: env('CLOUDINARY_FOLDER', 'lianjin-led'),
        use_filename: true,
        unique_filename: false,
        overwrite: false,
        invalidate: true,
        resource_type: 'auto',
        public_id: undefined,
        folder_mode: 'create',
        use_filename_as_display_name: true,
        // 自动优化设置
        transformation: [
          {
            quality: 'auto:good',
            fetch_format: 'auto',
          }
        ],
        // 响应式图片设置
        responsive_breakpoints: [
          {
            create_derived: true,
            bytes_step: 20000,
            min_width: 200,
            max_width: 1920,
            transformation: {
              quality: 'auto:good',
              fetch_format: 'auto'
            }
          }
        ]
      } : {},
      sizeLimit: 50 * 1024 * 1024, // 50MB for high-res product images
      breakpoints: {
        xlarge: 1920,
        large: 1200,
        medium: 750,
        small: 500,
        xsmall: 64
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
