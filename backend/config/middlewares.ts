export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000', // Next.js frontend
        'http://localhost:3001', // Alternative frontend port
        process.env.FRONTEND_URL,
      ].filter(Boolean),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::media-optimization',
    config: {},
  },
  {
    name: 'global::permissions',
    config: {},
  },
];
