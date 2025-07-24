export default {
  routes: [
    {
      method: 'GET',
      path: '/case-studies/stats',
      handler: 'case-study.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/case-studies/industry/:industry',
      handler: 'case-study.findByIndustry',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/case-studies/region/:region',
      handler: 'case-study.findByRegion',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/case-studies/featured',
      handler: 'case-study.findFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/case-studies/:id/related',
      handler: 'case-study.findRelated',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/case-studies/tags',
      handler: 'case-study.getTags',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/case-studies/tag/:tag',
      handler: 'case-study.findByTag',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};