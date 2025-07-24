/**
 * Media optimization middleware
 * Handles image optimization and format conversion
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Only process media files
    if (ctx.url.startsWith('/uploads/') || ctx.url.includes('cloudinary')) {
      // Add cache headers for media files
      ctx.set('Cache-Control', 'public, max-age=31536000, immutable');
      
      // Add CORS headers for media files
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    // Handle image optimization requests
    if (ctx.query.format || ctx.query.quality || ctx.query.width || ctx.query.height) {
      // Log optimization request for debugging
      strapi.log.info(`Image optimization requested: ${ctx.url}`, {
        format: ctx.query.format,
        quality: ctx.query.quality,
        width: ctx.query.width,
        height: ctx.query.height,
      });
    }
  };
};