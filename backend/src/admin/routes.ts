export default [
  {
    method: 'GET',
    path: '/custom-home',
    handler: 'admin.customHome',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/inquiry-manager',
    handler: 'admin.inquiryManager',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/content-preview/:contentType/:id',
    handler: 'admin.contentPreview',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/inquiry/:id/status',
    handler: 'admin.updateInquiryStatus',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/inquiry/:id/assign',
    handler: 'admin.assignInquiry',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/statistics/dashboard',
    handler: 'admin.getDashboardStats',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];