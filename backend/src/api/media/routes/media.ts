/**
 * Media routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/media/upload-multiple',
      handler: 'media.uploadMultiple',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/media/:id/optimized',
      handler: 'media.getOptimizedUrl',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/media/:id/responsive',
      handler: 'media.getResponsiveUrls',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/media/stats',
      handler: 'media.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};