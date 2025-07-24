/**
 * 页面构建器路由
 */

'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/page-builders',
      handler: 'page-builder.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/page-builders/:id',
      handler: 'page-builder.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/page-builders/slug/:slug',
      handler: 'page-builder.findBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/page-builders',
      handler: 'page-builder.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/page-builders/:id',
      handler: 'page-builder.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/page-builders/:id',
      handler: 'page-builder.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/page-builders/:id/preview',
      handler: 'page-builder.preview',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/page-builders/:id/duplicate',
      handler: 'page-builder.duplicate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/page-builder-templates',
      handler: 'page-builder.getTemplates',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};