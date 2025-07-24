import { prefixPluginTranslations } from '@strapi/helper-plugin';
import CustomHomePage from '../../admin/components/CustomHomePage';
import InquiryManager from '../../admin/components/InquiryManager';
import pluginId from './pluginId';

const name = 'admin-dashboard';

export default {
  register(app) {
    // 注册自定义仪表板页面
    app.addMenuLink({
      to: `/plugins/${pluginId}/dashboard`,
      icon: 'dashboard',
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: '仪表板',
      },
      permissions: [
        {
          action: 'plugin::admin-dashboard.read',
          subject: null,
        },
      ],
    });

    // 注册询盘管理页面
    app.addMenuLink({
      to: `/plugins/${pluginId}/inquiries`,
      icon: 'message',
      intlLabel: {
        id: `${pluginId}.inquiries.name`,
        defaultMessage: '询盘管理',
      },
      permissions: [
        {
          action: 'plugin::admin-dashboard.inquiries.read',
          subject: null,
        },
      ],
    });

    // 注册插件
    app.registerPlugin({
      id: pluginId,
      initializer: () => null,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    // 插件启动逻辑
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};