module.exports = ({ env }) => ({
  // Email plugin configuration
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'noreply@lianjinled.com'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'info@lianjinled.com'),
        testAddress: env('EMAIL_TEST_ADDRESS', 'test@lianjinled.com'),
      },
    },
  },

  // Upload plugin configuration for Cloudinary
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // i18n plugin configuration
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'zh',
      locales: ['zh', 'en'],
    },
  },

  // Documentation plugin
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Lianjin LED API Documentation',
        description: 'API documentation for Lianjin LED website',
        contact: {
          name: 'API Support',
          email: 'api@lianjinled.com',
        },
      },
      servers: [
        {
          url: env('API_URL', 'http://localhost:1337/api'),
          description: 'Development server',
        },
        {
          url: env('PRODUCTION_API_URL', 'https://api.lianjinled.com/api'),
          description: 'Production server',
        },
      ],
    },
  },

  // GraphQL plugin (optional)
  graphql: {
    enabled: false,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },

  // Users permissions plugin
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      register: {
        allowedFields: ['name', 'company', 'phone'],
      },
    },
  },

  // Transformer plugin for content transformation
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },

  // SEO plugin
  seo: {
    enabled: true,
    config: {
      contentTypes: ['api::product.product', 'api::case-study.case-study', 'api::news.news'],
    },
  },

  // Sitemap plugin
  sitemap: {
    enabled: true,
    config: {
      autoGenerate: true,
      allowedFields: ['id', 'slug', 'updatedAt'],
      contentTypes: {
        'api::product.product': {
          url: '/products/:slug',
          priority: 0.8,
          changefreq: 'weekly',
        },
        'api::case-study.case-study': {
          url: '/cases/:slug',
          priority: 0.7,
          changefreq: 'monthly',
        },
        'api::news.news': {
          url: '/news/:slug',
          priority: 0.6,
          changefreq: 'weekly',
        },
      },
    },
  },

  // Redis plugin for caching
  redis: {
    enabled: env.bool('REDIS_ENABLED', false),
    config: {
      connections: {
        default: {
          connection: {
            host: env('REDIS_HOST', '127.0.0.1'),
            port: env.int('REDIS_PORT', 6379),
            db: env.int('REDIS_DB', 0),
            password: env('REDIS_PASSWORD'),
          },
          settings: {
            debug: env.bool('REDIS_DEBUG', false),
          },
        },
      },
    },
  },

  // Rate limiting plugin
  'rate-limit': {
    enabled: true,
    config: {
      interval: 60000, // 1 minute
      max: 100, // 100 requests per minute
      delayAfter: 50, // delay after 50 requests
      delayMs: 500, // delay of 500ms
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      enableDraftAndPublish: true,
    },
  },

  // Security plugin
  security: {
    enabled: true,
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
});