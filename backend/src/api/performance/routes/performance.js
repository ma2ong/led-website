/**
 * 性能监控路由
 */

'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/performance/stats',
      handler: 'performance.getStats',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/performance/report',
      handler: 'performance.getReport',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/performance/clear',
      handler: 'performance.clearStats',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/performance/health',
      handler: 'performance.healthCheck',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};