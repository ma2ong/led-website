/**
 * 询盘API测试
 */

const request = require('supertest');
const { createTestAdmin, generateAdminJWT } = require('../setup');

describe('Inquiry API', () => {
  let adminToken;
  let testInquiry;

  beforeEach(async () => {
    // 创建测试管理员
    const admin = await createTestAdmin();
    adminToken = generateAdminJWT(admin);

    // 创建测试询盘
    testInquiry = await strapi.entityService.create('api::inquiry.inquiry', {
      data: {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        company: '测试公司',
        subject: '产品咨询',
        message: '我想了解LED显示屏的详细信息',
        status: 'pending',
        source: 'website',
        createdAt: new Date(),
      },
    });
  });

  describe('POST /api/inquiries', () => {
    it('should create new inquiry', async () => {
      const inquiryData = {
        name: '李四',
        email: 'lisi@example.com',
        phone: '13900139000',
        company: '新公司',
        subject: '价格咨询',
        message: '请提供P2.5显示屏的报价',
        source: 'website',
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/inquiries')
        .send(inquiryData)
        .expect(200);

      expect(response.body.data.attributes).toHaveProperty('name', '李四');
      expect(response.body.data.attributes).toHaveProperty('email', 'lisi@example.com');
      expect(response.body.data.attributes).toHaveProperty('status', 'pending');
    });

    it('should validate required fields', async () => {
      const invalidData = {
        email: 'invalid@example.com',
        // 缺少必需的name字段
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/inquiries')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toHaveProperty('status', 400);
    });

    it('should validate email format', async () => {
      const invalidEmailData = {
        name: '王五',
        email: 'invalid-email-format',
        message: '测试消息',
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/inquiries')
        .send(invalidEmailData)
        .expect(400);

      expect(response.body.error.message).toContain('email');
    });

    it('should validate phone format', async () => {
      const invalidPhoneData = {
        name: '赵六',
        email: 'zhaoliu@example.com',
        phone: '123', // 无效的电话号码格式
        message: '测试消息',
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/inquiries')
        .send(invalidPhoneData)
        .expect(400);

      expect(response.body.error.message).toContain('phone');
    });

    it('should sanitize input data', async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>恶意用户',
        email: 'malicious@example.com',
        message: '<img src="x" onerror="alert(1)">恶意消息',
      };

      const response = await request(strapi.server.httpServer)
        .post('/api/inquiries')
        .send(maliciousData)
        .expect(200);

      // 验证脚本标签被清理
      expect(response.body.data.attributes.name).not.toContain('<script>');
      expect(response.body.data.attributes.message).not.toContain('onerror');
    });

    it('should handle rate limiting', async () => {
      const inquiryData = {
        name: '频繁用户',
        email: 'frequent@example.com',
        message: '频繁提交测试',
      };

      // 快速连续提交多个询盘
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(
          request(strapi.server.httpServer)
            .post('/api/inquiries')
            .send({ ...inquiryData, message: `消息 ${i}` })
        );
      }

      const responses = await Promise.all(promises);
      
      // 检查是否有请求被限流
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/inquiries (Admin only)', () => {
    it('should return list of inquiries for admin', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('attributes');
    });

    it('should return 401 without authentication', async () => {
      await request(strapi.server.httpServer)
        .get('/api/inquiries')
        .expect(401);
    });

    it('should support filtering by status', async () => {
      // 创建不同状态的询盘
      await strapi.entityService.create('api::inquiry.inquiry', {
        data: {
          name: '已处理用户',
          email: 'processed@example.com',
          message: '已处理的询盘',
          status: 'processed',
        },
      });

      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries?filters[status][$eq]=processed')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].attributes.status).toBe('processed');
    });

    it('should support sorting by creation date', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries?sort=createdAt:desc')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      // 验证按创建时间降序排列
      if (response.body.data.length > 1) {
        const firstDate = new Date(response.body.data[0].attributes.createdAt);
        const secondDate = new Date(response.body.data[1].attributes.createdAt);
        expect(firstDate >= secondDate).toBe(true);
      }
    });

    it('should support pagination', async () => {
      // 创建更多询盘
      for (let i = 0; i < 5; i++) {
        await strapi.entityService.create('api::inquiry.inquiry', {
          data: {
            name: `用户${i}`,
            email: `user${i}@example.com`,
            message: `询盘消息${i}`,
          },
        });
      }

      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries?pagination[page]=1&pagination[pageSize]=3')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      expect(response.body.meta.pagination).toHaveProperty('page', 1);
      expect(response.body.meta.pagination).toHaveProperty('pageSize', 3);
    });
  });

  describe('GET /api/inquiries/:id (Admin only)', () => {
    it('should return single inquiry for admin', async () => {
      const response = await request(strapi.server.httpServer)
        .get(`/api/inquiries/${testInquiry.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toHaveProperty('id', testInquiry.id);
      expect(response.body.data.attributes).toHaveProperty('name', '张三');
    });

    it('should return 401 without authentication', async () => {
      await request(strapi.server.httpServer)
        .get(`/api/inquiries/${testInquiry.id}`)
        .expect(401);
    });

    it('should return 404 for non-existent inquiry', async () => {
      await request(strapi.server.httpServer)
        .get('/api/inquiries/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('PUT /api/inquiries/:id (Admin only)', () => {
    it('should update inquiry status', async () => {
      const updateData = {
        data: {
          status: 'processed',
          notes: '已联系客户，提供了报价',
        },
      };

      const response = await request(strapi.server.httpServer)
        .put(`/api/inquiries/${testInquiry.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.data.attributes).toHaveProperty('status', 'processed');
      expect(response.body.data.attributes).toHaveProperty('notes', '已联系客户，提供了报价');
    });

    it('should return 401 without authentication', async () => {
      const updateData = {
        data: { status: 'processed' },
      };

      await request(strapi.server.httpServer)
        .put(`/api/inquiries/${testInquiry.id}`)
        .send(updateData)
        .expect(401);
    });

    it('should validate status values', async () => {
      const invalidData = {
        data: {
          status: 'invalid-status',
        },
      };

      const response = await request(strapi.server.httpServer)
        .put(`/api/inquiries/${testInquiry.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.error.message).toContain('status');
    });
  });

  describe('DELETE /api/inquiries/:id (Admin only)', () => {
    it('should delete inquiry', async () => {
      await request(strapi.server.httpServer)
        .delete(`/api/inquiries/${testInquiry.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // 验证询盘已被删除
      await request(strapi.server.httpServer)
        .get(`/api/inquiries/${testInquiry.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('should return 401 without authentication', async () => {
      await request(strapi.server.httpServer)
        .delete(`/api/inquiries/${testInquiry.id}`)
        .expect(401);
    });
  });

  describe('Inquiry Statistics', () => {
    beforeEach(async () => {
      // 创建不同状态的询盘用于统计
      const statuses = ['pending', 'processed', 'closed'];
      
      for (const status of statuses) {
        for (let i = 0; i < 3; i++) {
          await strapi.entityService.create('api::inquiry.inquiry', {
            data: {
              name: `${status}用户${i}`,
              email: `${status}${i}@example.com`,
              message: `${status}状态的询盘`,
              status,
            },
          });
        }
      }
    });

    it('should return inquiry statistics', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('byStatus');
      expect(response.body.byStatus).toHaveProperty('pending');
      expect(response.body.byStatus).toHaveProperty('processed');
      expect(response.body.byStatus).toHaveProperty('closed');
    });
  });

  describe('Inquiry Export', () => {
    it('should export inquiries as CSV', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries/export?format=csv')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.text).toContain('name,email,phone,company,subject,message,status');
    });

    it('should export inquiries as Excel', async () => {
      const response = await request(strapi.server.httpServer)
        .get('/api/inquiries/export?format=xlsx')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.headers['content-type']).toContain('application/vnd.openxmlformats');
    });
  });
});