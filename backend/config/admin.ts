export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  url: env('ADMIN_URL', '/admin'),
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  forgotPassword: {
    emailTemplate: {
      subject: '重置密码',
      text: '您好，请点击以下链接重置您的密码：<%= url %>',
      html: '<p>您好，</p><p>请点击以下链接重置您的密码：</p><p><a href="<%= url %>">重置密码</a></p>',
    },
  },
});
