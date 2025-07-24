export default {
  routes: [
    {
      method: 'GET',
      path: '/news/slug/:slug',
      handler: 'news.findBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/featured',
      handler: 'news.findFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/category/:category',
      handler: 'news.findByCategory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/search',
      handler: 'news.search',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/:id/related',
      handler: 'news.findRelated',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/stats',
      handler: 'news.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/tag/:tag',
      handler: 'news.findByTag',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};