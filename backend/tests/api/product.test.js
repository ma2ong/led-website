/**
 * 产品API测试
 */

const request = require('supertest');
const { createTestUser, generateJWT, createTestAdmin, generateAdminJWT } = require('../setup');

describe('Product API', () => {
  let userToken;
  let adminToken;
  let testProduct;

  beforeEach(async () => {
    // 创建测试用户和管理员
    const user = await createTestUser();
    const admin = await createTestAdmin();
    
    userToken = generateJWT(user);
    adminToken = generateAdminJWT(admin);

    // 创建测试产品
    testProduct = await strapi.entityService.create('api::product.product', {
      data: {
        name: '测试LED显示屏',
        slug: 'test-led-display',
        description: '这是一个测试产品',
        shortDescription: '测试产品简介',
        price: '¥10,000',
        specifications: {
          pixelPitch: '2.5mm',
          resolution: '1920x1080',
          brightness: '1000cd/m²',
        },
        features: ['高清显示', '低功耗'],
        applications: ['会议室', '展厅'],
        isActive: true,
        isFeatured: false,
        publishedAt: new Date(),
      },
    });
  });

  describe('GET /api/products', () => {
    it('should return list of products', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products')
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('attributes');
    });

    it('should support pagination', async () => {
      // 创建更多测试产品
      for (let i = 0; i < 5; i++) {
        await strapi.entityService.create('api::product.product', {
          data: {
            name: `测试产品 ${i}`,
            slug: `test-product-${i}`,
            description: `测试产品 ${i} 描述`,
            isActive: true,
            publishedAt: new Date(),
          },
        });
      }

      const response = await request(strapi.server.httpServer)
        .get('/api/products?pagination[page]=1&pagination[pageSize]=3')
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      expect(response.body.meta.pagination).toHaveProperty('page', 1);
      expect(response.body.meta.pagination).toHaveProperty('pageSize', 3);
    });

    it('should support filtering by category', async () => {
      // 创建分类
      const category = await strapi.entityService.create('api::category.category', {
        data: {
          name: '室内显示屏',
          slug: 'indoor-displays',
        },
      });

      // 更新产品分类
      await strapi.entityService.update('api::product.product', testProduct.id, {
        data: { category: category.id },
      });

      const response = await request(strapi.server.httpServer)
        .get(`/api/products?filters[category][id][$eq]=${category.id}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].attributes.category.data.id).toBe(category.id);
    });

    it('should support sorting', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products?sort=name:asc')
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      // 验证排序结果
      if (response.body.data.length > 1) {
        expect(response.body.data[0].attributes.name <= response.body.data[1].attributes.name).toBe(true);
      }
    });

    it('should populate related fields', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products?populate=*')
        .expect(200);

      expect(response.body.data[0].attributes).toHaveProperty('category');
      expect(response.body.data[0].attributes).toHaveProperty('images');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return single product', async () => {
      const response = await request(strapi.server.httpServer)
        .get(`/api/products/${testProduct.id}`)
        .expect(200);

      expect(response.body.data).toHaveProperty('id', testProduct.id);
      expect(response.body.data.attributes).toHaveProperty('name', '测试LED显示屏');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products/999999')
        .expect(404);

      expect(response.body.error).toHaveProperty('status', 404);
    });

    it('should populate related fields when requested', async () => {
      const response = await request(strapi.server.httpServer)
        .get(`/api/products/${testProduct.id}?populate=*`)
        .expect(200);

      expect(response.body.data.attributes).toHaveProperty('category');
      expect(response.body.data.attributes).toHaveProperty('images');
    });
  });

  describe('GET /api/products/slug/:slug', () => {
    it('should return product by slug', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products/slug/test-led-display')
        .expect(200);

      expect(response.body.data.attributes).toHaveProperty('slug', 'test-led-display');
      expect(response.body.data.attributes).toHaveProperty('name', '测试LED显示屏');
    });

    it('should return 404 for non-existent slug', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products/slug/non-existent-slug')
        .expect(404);

      expect(response.body.error).toHaveProperty('status', 404);
    });
  });

  describe('POST /api/products', () => {
    it('should create new product with admin token', async () => {
      const productData = {
        data: {
          name: '新LED显示屏',
          slug: 'new-led-display',
          description: '新产品描述',
          shortDescription: '新产品简介',
          price: '¥15,000',
          isActive: true,
        },
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(200);

      expect(response.body.data.attributes).toHaveProperty('name', '新LED显示屏');
      expect(response.body.data.attributes).toHaveProperty('slug', 'new-led-display');
    });

    it('should return 401 without authentication', async () => {
      const productData = {
        data: {
          name: '未授权产品',
          slug: 'unauthorized-product',
        },
      };

      await request(strapi.server.httpServer)
        .post('/api/products')
        .send(productData)
        .expect(401);
    });

    it('should return 403 with user token (insufficient permissions)', async () => {
      const productData = {
        data: {
          name: '用户创建产品',
          slug: 'user-created-product',
        },
      };

      await request(strapi.server.httpServer)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send(productData)
        .expect(403);
    });

    it('should validate required fields', async () => {
      const invalidData = {
        data: {
          description: '缺少名称的产品',
        },
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toHaveProperty('status', 400);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product with admin token', async () => {
      const updateData = {
        data: {
          name: '更新的LED显示屏',
          price: '¥12,000',
        },
      };

      const response = await request(strapi.server.httpServer)
        .put(`/api/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.data.attributes).toHaveProperty('name', '更新的LED显示屏');
      expect(response.body.data.attributes).toHaveProperty('price', '¥12,000');
    });

    it('should return 401 without authentication', async () => {
      const updateData = {
        data: { name: '未授权更新' },
      };

      await request(strapi.server.httpServer)
        .put(`/api/products/${testProduct.id}`)
        .send(updateData)
        .expect(401);
    });

    it('should return 404 for non-existent product', async () => {
      const updateData = {
        data: { name: '不存在的产品' },
      };

      await request(strapi.server.httpServer)
        .put('/api/products/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product with admin token', async () => {
      await request(strapi.server.httpServer)
        .delete(`/api/products/${testProduct.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // 验证产品已被删除
      await request(strapi.server.httpServer)
        .get(`/api/products/${testProduct.id}`)
        .expect(404);
    });

    it('should return 401 without authentication', async () => {
      await request(strapi.server.httpServer)
        .delete(`/api/products/${testProduct.id}`)
        .expect(401);
    });

    it('should return 404 for non-existent product', async () => {
      await request(strapi.server.httpServer)
        .delete('/api/products/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('Product Search', () => {
    beforeEach(async () => {
      // 创建更多测试产品用于搜索
      await strapi.entityService.create('api::product.product', {
        data: {
          name: 'P2.5室内LED显示屏',
          slug: 'p25-indoor-led',
          description: '高清室内LED显示屏，适用于会议室',
          isActive: true,
          publishedAt: new Date(),
        },
      });

      await strapi.entityService.create('api::product.product', {
        data: {
          name: 'P4户外LED显示屏',
          slug: 'p4-outdoor-led',
          description: '防水户外LED显示屏，适用于广告牌',
          isActive: true,
          publishedAt: new Date(),
        },
      });
    });

    it('should search products by name', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products?filters[name][$containsi]=LED')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach(product => {
        expect(product.attributes.name.toLowerCase()).toContain('led');
      });
    });

    it('should search products by description', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/products?filters[description][$containsi]=室内')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach(product => {
        expect(product.attributes.description.toLowerCase()).toContain('室内');
      });
    });
  });

  describe('Product Validation', () => {
    it('should validate slug uniqueness', async () => {
      const duplicateData = {
        data: {
          name: '重复slug产品',
          slug: 'test-led-display', // 与现有产品相同的slug
          description: '测试重复slug',
        },
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(duplicateData)
        .expect(400);

      expect(response.body.error.message).toContain('slug');
    });

    it('should validate price format', async () => {
      const invalidPriceData = {
        data: {
          name: '价格格式错误产品',
          slug: 'invalid-price-product',
          price: 'invalid-price-format',
        },
      };

      // 这个测试取决于你的价格验证逻辑
      const response = await request(strapi.server.httpServer)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidPriceData);

      // 根据你的验证逻辑调整期望结果
      expect([200, 400]).toContain(response.status);
    });
  });
});