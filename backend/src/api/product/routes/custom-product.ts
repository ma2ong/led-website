export default {
  routes: [
    {
      method: 'GET',
      path: '/products/slug/:slug',
      handler: 'product.findBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/featured',
      handler: 'product.findFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/category/:category',
      handler: 'product.findByCategory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/search',
      handler: 'product.search',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/:id/related',
      handler: 'product.findRelated',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/compare',
      handler: 'product.compare',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/stats',
      handler: 'product.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};