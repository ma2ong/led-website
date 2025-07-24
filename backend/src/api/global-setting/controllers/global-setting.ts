/**
 * global-setting controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::global-setting.global-setting', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const populateQuery = {
      ...query,
      populate: {
        logo: true,
        favicon: true
      }
    };

    const entity = await strapi.entityService.findMany('api::global-setting.global-setting', populateQuery);
    
    return { data: entity };
  }
}));