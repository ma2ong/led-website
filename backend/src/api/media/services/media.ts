/**
 * Media service
 * Handles media upload, optimization, and CDN operations
 */

export default {
  /**
   * Upload file to Cloudinary with optimization
   * @param {Object} file - File object
   * @param {Object} options - Upload options
   * @returns {Object} - Upload result
   */
  async uploadOptimized(file: any, options: any = {}) {
    try {
      const uploadOptions: any = {
        folder: process.env.CLOUDINARY_FOLDER || 'lianjin-led',
        use_filename: true,
        unique_filename: false,
        overwrite: false,
        resource_type: 'auto',
        // 自动优化设置
        transformation: [
          {
            quality: 'auto:good',
            fetch_format: 'auto',
          }
        ],
        ...options
      };

      // 根据文件类型设置不同的优化策略
      if (file.mime && file.mime.startsWith('image/')) {
        // 产品图片优化
        if (options.type === 'product') {
          uploadOptions.transformation = [
            {
              quality: 'auto:best',
              fetch_format: 'auto',
              width: 1920,
              height: 1080,
              crop: 'limit'
            }
          ];
          uploadOptions.eager = [
            { width: 400, height: 300, crop: 'fill', quality: 'auto:good' },
            { width: 800, height: 600, crop: 'fill', quality: 'auto:good' },
            { width: 1200, height: 900, crop: 'fill', quality: 'auto:good' }
          ];
        }
        // 缩略图优化
        else if (options.type === 'thumbnail') {
          uploadOptions.transformation = [
            {
              width: 400,
              height: 300,
              crop: 'fill',
              quality: 'auto:good',
              fetch_format: 'auto'
            }
          ];
        }
      }

      const result = await strapi.plugins.upload.services.upload.upload({
        data: uploadOptions,
        files: file
      });

      return result;
    } catch (error) {
      strapi.log.error('Media upload failed:', error);
      throw error;
    }
  },

  /**
   * Generate responsive image URLs
   * @param {Object} media - Media object from Strapi
   * @param {Array} breakpoints - Responsive breakpoints
   * @returns {Object} - Responsive image URLs
   */
  generateResponsiveUrls(media, breakpoints = [400, 800, 1200, 1920]) {
    if (!media || !media.url) return null;

    const baseUrl = media.url;
    const isCloudinary = baseUrl.includes('cloudinary.com');

    if (!isCloudinary) {
      // For local files, return original URL
      return {
        original: baseUrl,
        responsive: breakpoints.reduce((acc, width) => {
          acc[`w${width}`] = baseUrl;
          return acc;
        }, {})
      };
    }

    // For Cloudinary, generate optimized URLs
    const cloudinaryBase = baseUrl.split('/upload/')[0] + '/upload/';
    const imagePath = baseUrl.split('/upload/')[1];

    return {
      original: baseUrl,
      responsive: breakpoints.reduce((acc, width) => {
        acc[`w${width}`] = `${cloudinaryBase}w_${width},c_limit,q_auto,f_auto/${imagePath}`;
        return acc;
      }, {}),
      webp: breakpoints.reduce((acc, width) => {
        acc[`w${width}`] = `${cloudinaryBase}w_${width},c_limit,q_auto,f_webp/${imagePath}`;
        return acc;
      }, {}),
      avif: breakpoints.reduce((acc, width) => {
        acc[`w${width}`] = `${cloudinaryBase}w_${width},c_limit,q_auto,f_avif/${imagePath}`;
        return acc;
      }, {})
    };
  },

  /**
   * Get optimized image URL with specific parameters
   * @param {string} url - Original image URL
   * @param {Object} params - Optimization parameters
   * @returns {string} - Optimized URL
   */
  getOptimizedUrl(url: string, params: any = {}) {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }

    const { width, height, quality = 'auto:good', format = 'auto', crop = 'limit' } = params;
    
    const cloudinaryBase = url.split('/upload/')[0] + '/upload/';
    const imagePath = url.split('/upload/')[1];
    
    let transformations = [];
    
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
    transformations.push(`q_${quality}`);
    transformations.push(`f_${format}`);
    
    return `${cloudinaryBase}${transformations.join(',')}/${imagePath}`;
  },

  /**
   * Delete media from Cloudinary
   * @param {string} publicId - Cloudinary public ID
   * @returns {Object} - Deletion result
   */
  async deleteFromCloudinary(publicId) {
    try {
      // This would typically use Cloudinary SDK directly
      // For now, we'll rely on Strapi's upload plugin
      const result = await strapi.plugins.upload.services.upload.remove({
        public_id: publicId
      });
      
      return result;
    } catch (error) {
      strapi.log.error('Failed to delete from Cloudinary:', error);
      throw error;
    }
  },

  /**
   * Get media file metadata
   * @param {Object} media - Media object
   * @returns {Object} - Enhanced metadata
   */
  getMediaMetadata(media) {
    if (!media) return null;

    return {
      id: media.id,
      name: media.name,
      alternativeText: media.alternativeText,
      caption: media.caption,
      width: media.width,
      height: media.height,
      size: media.size,
      mime: media.mime,
      url: media.url,
      formats: media.formats,
      // 添加响应式URL
      responsive: this.generateResponsiveUrls(media),
      // 添加优化建议
      optimized: {
        thumbnail: this.getOptimizedUrl(media.url, { width: 400, height: 300, crop: 'fill' }),
        medium: this.getOptimizedUrl(media.url, { width: 800, height: 600, crop: 'limit' }),
        large: this.getOptimizedUrl(media.url, { width: 1200, height: 900, crop: 'limit' })
      }
    };
  }
};