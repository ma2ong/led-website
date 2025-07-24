/**
 * Media controller
 * Handles media upload, optimization, and management
 */

export default {
  /**
   * Upload multiple files
   */
  async uploadMultiple(ctx) {
    try {
      const { files } = ctx.request;
      
      if (!files || Object.keys(files).length === 0) {
        return ctx.badRequest('No files provided');
      }

      const uploadedFiles = [];
      
      // Process each file
      for (const [key, file] of Object.entries(files)) {
        if (Array.isArray(file)) {
          // Handle multiple files with same field name
          for (const singleFile of file) {
            const uploaded = await strapi.plugins.upload.services.upload.upload({
              data: {},
              files: singleFile,
            });
            uploadedFiles.push(...uploaded);
          }
        } else {
          // Handle single file
          const uploaded = await strapi.plugins.upload.services.upload.upload({
            data: {},
            files: file,
          });
          uploadedFiles.push(...uploaded);
        }
      }

      return { data: uploadedFiles };
    } catch (error) {
      strapi.log.error('Media upload error:', error);
      return ctx.internalServerError('Upload failed');
    }
  },

  /**
   * Get optimized image URL
   */
  async getOptimizedUrl(ctx) {
    try {
      const { id } = ctx.params;
      const { width, height, quality = 'auto', format = 'auto' } = ctx.query;

      const file = await strapi.plugins.upload.services.upload.findOne(id);
      
      if (!file) {
        return ctx.notFound('File not found');
      }

      // If using Cloudinary, generate optimized URL
      if (process.env.UPLOAD_PROVIDER === 'cloudinary' && file.provider === 'cloudinary') {
        const cloudinary = require('cloudinary').v2;
        
        const transformations = [];
        
        if (width || height) {
          transformations.push({
            width: width ? parseInt(width) : undefined,
            height: height ? parseInt(height) : undefined,
            crop: 'fill',
            gravity: 'auto'
          });
        }
        
        transformations.push({
          quality,
          fetch_format: format
        });

        const optimizedUrl = cloudinary.url(file.provider_metadata?.public_id, {
          transformation: transformations
        });

        return { data: { url: optimizedUrl, original: file } };
      }

      // For local files, return original URL
      return { data: { url: file.url, original: file } };
    } catch (error) {
      strapi.log.error('Image optimization error:', error);
      return ctx.internalServerError('Optimization failed');
    }
  },

  /**
   * Generate responsive image URLs
   */
  async getResponsiveUrls(ctx) {
    try {
      const { id } = ctx.params;
      const { breakpoints = '320,640,768,1024,1280,1920' } = ctx.query;

      const file = await strapi.plugins.upload.services.upload.findOne(id);
      
      if (!file) {
        return ctx.notFound('File not found');
      }

      const breakpointArray = breakpoints.split(',').map(bp => parseInt(bp.trim()));
      const responsiveUrls = {};

      // If using Cloudinary, generate responsive URLs
      if (process.env.UPLOAD_PROVIDER === 'cloudinary' && file.provider === 'cloudinary') {
        const cloudinary = require('cloudinary').v2;
        
        for (const width of breakpointArray) {
          const key = `w${width}`;
          responsiveUrls[key] = cloudinary.url(file.provider_metadata?.public_id, {
            transformation: [
              {
                width,
                crop: 'scale',
                quality: 'auto:good',
                fetch_format: 'auto'
              }
            ]
          });
        }
      } else {
        // For local files, return original URL for all breakpoints
        for (const width of breakpointArray) {
          const key = `w${width}`;
          responsiveUrls[key] = file.url;
        }
      }

      return { 
        data: { 
          responsive: responsiveUrls, 
          original: file.url,
          file 
        } 
      };
    } catch (error) {
      strapi.log.error('Responsive URLs generation error:', error);
      return ctx.internalServerError('Generation failed');
    }
  },

  /**
   * Get media library statistics
   */
  async getStats(ctx) {
    try {
      const files = await strapi.plugins.upload.services.upload.findMany({});
      
      const stats = {
        totalFiles: files.length,
        totalSize: files.reduce((sum, file) => sum + (file.size || 0), 0),
        byType: {},
        byProvider: {},
        recentUploads: files
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 10)
      };

      // Group by MIME type
      files.forEach(file => {
        const type = file.mime?.split('/')[0] || 'unknown';
        stats.byType[type] = (stats.byType[type] || 0) + 1;
      });

      // Group by provider
      files.forEach(file => {
        const provider = file.provider || 'local';
        stats.byProvider[provider] = (stats.byProvider[provider] || 0) + 1;
      });

      return { data: stats };
    } catch (error) {
      strapi.log.error('Media stats error:', error);
      return ctx.internalServerError('Stats generation failed');
    }
  }
};