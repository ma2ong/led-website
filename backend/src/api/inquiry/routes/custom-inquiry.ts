export default {
  routes: [
    {
      method: 'GET',
      path: '/inquiries/stats',
      handler: 'inquiry.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inquiries/status/:status',
      handler: 'inquiry.findByStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inquiries/priority/:priority',
      handler: 'inquiry.findByPriority',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inquiries/follow-ups',
      handler: 'inquiry.findFollowUps',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/inquiries/:id/status',
      handler: 'inquiry.updateStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inquiries/export',
      handler: 'inquiry.export',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/inquiries/report',
      handler: 'inquiry.generateReport',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/inquiries/bulk-update',
      handler: 'inquiry.bulkUpdateStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/inquiries/:id/reply',
      handler: 'inquiry.addReply',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/inquiries/:id/reminder',
      handler: 'inquiry.setReminder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};