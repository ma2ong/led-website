#!/usr/bin/env node

/**
 * 集成测试脚本
 * 测试前后端集成功能和关键用户流程
 */

const axios = require('axios');
const puppeteer = require('puppeteer');

// 测试配置
const config = {
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
    timeout: 30000
  },
  backend: {
    url: process.env.BACKEND_URL || 'http://localhost:1337',
    timeout: 10000
  },
  testData: {
    inquiry: {
      name: '测试用户',
      email: 'test@example.com',
      company: '测试公司',
      phone: '+86 138 0000 0000',
      message: '这是一个测试询盘消息',
      productInterest: 'LED显示屏'
    }
  }
};

// 测试结果收集器
class TestResults {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  add(testName, passed, error = null) {
    this.results.push({
      name: testName,
      passed,
      error: error?.message || null,
      timestamp: new Date().toISOString()
    });
    
    if (passed) {
      this.passed++;
      console.log(`✅ ${testName}`);
    } else {
      this.failed++;
      console.log(`❌ ${testName}: ${error?.message || '未知错误'}`);
    }
  }

  summary() {
    console.log('\n=== 测试结果汇总 ===');
    console.log(`总计: ${this.results.length}`);
    console.log(`通过: ${this.passed}`);
    console.log(`失败: ${this.failed}`);
    console.log(`成功率: ${((this.passed / this.results.length) * 100).toFixed(2)}%`);
    
    if (this.failed > 0) {
      console.log('\n失败的测试:');
      this.results
        .filter(r => !r.passed)
        .forEach(r => console.log(`- ${r.name}: ${r.error}`));
    }
    
    return this.failed === 0;
  }
}

// API测试类
class APITester {
  constructor(baseUrl, timeout) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout,
      validateStatus: () => true // 不自动抛出错误
    });
  }

  async testHealthCheck() {
    const response = await this.client.get('/api/health');
    return response.status === 200;
  }

  async testProductsAPI() {
    const response = await this.client.get('/api/products?locale=zh');
    return response.status === 200 && Array.isArray(response.data.data);
  }

  async testCaseStudiesAPI() {
    const response = await this.client.get('/api/case-studies?locale=zh');
    return response.status === 200 && Array.isArray(response.data.data);
  }

  async testNewsAPI() {
    const response = await this.client.get('/api/news?locale=zh');
    return response.status === 200 && Array.isArray(response.data.data);
  }

  async testInquirySubmission(inquiryData) {
    const response = await this.client.post('/api/inquiries', inquiryData);
    return response.status === 200 || response.status === 201;
  }

  async testGlobalSettings() {
    const response = await this.client.get('/api/global-settings?locale=zh');
    return response.status === 200 && response.data.data;
  }
}

// 前端测试类
class FrontendTester {
  constructor(baseUrl, timeout) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.browser = null;
    this.page = null;
  }

  async setup() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async teardown() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async testPageLoad(path) {
    try {
      const response = await this.page.goto(`${this.baseUrl}${path}`, {
        waitUntil: 'networkidle0',
        timeout: this.timeout
      });
      return response.status() === 200;
    } catch (error) {
      return false;
    }
  }

  async testLanguageSwitching() {
    try {
      // 访问中文首页
      await this.page.goto(`${this.baseUrl}/zh`, { waitUntil: 'networkidle0' });
      
      // 点击语言切换按钮
      await this.page.click('[data-testid="language-switcher"]');
      await this.page.click('[data-testid="language-en"]');
      
      // 等待页面跳转
      await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
      
      // 检查URL是否变为英文
      const currentUrl = this.page.url();
      return currentUrl.includes('/en');
    } catch (error) {
      return false;
    }
  }

  async testProductFiltering() {
    try {
      await this.page.goto(`${this.baseUrl}/zh/products`, { waitUntil: 'networkidle0' });
      
      // 等待产品列表加载
      await this.page.waitForSelector('[data-testid="product-list"]');
      
      // 获取初始产品数量
      const initialCount = await this.page.$$eval('[data-testid="product-card"]', els => els.length);
      
      // 应用筛选器
      await this.page.click('[data-testid="category-filter"]');
      await this.page.click('[data-testid="category-indoor"]');
      
      // 等待筛选结果
      await this.page.waitForTimeout(1000);
      
      // 获取筛选后的产品数量
      const filteredCount = await this.page.$$eval('[data-testid="product-card"]', els => els.length);
      
      return filteredCount <= initialCount;
    } catch (error) {
      return false;
    }
  }

  async testInquiryForm() {
    try {
      await this.page.goto(`${this.baseUrl}/zh/contact`, { waitUntil: 'networkidle0' });
      
      // 填写表单
      await this.page.type('[data-testid="inquiry-name"]', config.testData.inquiry.name);
      await this.page.type('[data-testid="inquiry-email"]', config.testData.inquiry.email);
      await this.page.type('[data-testid="inquiry-company"]', config.testData.inquiry.company);
      await this.page.type('[data-testid="inquiry-phone"]', config.testData.inquiry.phone);
      await this.page.type('[data-testid="inquiry-message"]', config.testData.inquiry.message);
      
      // 提交表单
      await this.page.click('[data-testid="inquiry-submit"]');
      
      // 等待成功消息
      await this.page.waitForSelector('[data-testid="inquiry-success"]', { timeout: 5000 });
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async testResponsiveDesign() {
    try {
      // 测试移动端视图
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(`${this.baseUrl}/zh`, { waitUntil: 'networkidle0' });
      
      // 检查移动端导航菜单
      const mobileMenu = await this.page.$('[data-testid="mobile-menu-button"]');
      if (!mobileMenu) return false;
      
      // 点击移动端菜单
      await this.page.click('[data-testid="mobile-menu-button"]');
      await this.page.waitForSelector('[data-testid="mobile-menu"]');
      
      // 测试平板视图
      await this.page.setViewport({ width: 768, height: 1024 });
      await this.page.reload({ waitUntil: 'networkidle0' });
      
      // 测试桌面视图
      await this.page.setViewport({ width: 1920, height: 1080 });
      await this.page.reload({ waitUntil: 'networkidle0' });
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async testSEOElements() {
    try {
      await this.page.goto(`${this.baseUrl}/zh`, { waitUntil: 'networkidle0' });
      
      // 检查基本SEO元素
      const title = await this.page.title();
      const description = await this.page.$eval('meta[name="description"]', el => el.content);
      const canonical = await this.page.$eval('link[rel="canonical"]', el => el.href);
      const hreflang = await this.page.$$('link[rel="alternate"][hreflang]');
      
      return title && description && canonical && hreflang.length > 0;
    } catch (error) {
      return false;
    }
  }

  async testPerformance() {
    try {
      // 启用性能监控
      await this.page.tracing.start({ path: 'trace.json' });
      
      const startTime = Date.now();
      await this.page.goto(`${this.baseUrl}/zh`, { waitUntil: 'networkidle0' });
      const loadTime = Date.now() - startTime;
      
      await this.page.tracing.stop();
      
      // 检查Core Web Vitals
      const metrics = await this.page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const vitals = {};
            
            entries.forEach((entry) => {
              if (entry.name === 'FCP') vitals.fcp = entry.value;
              if (entry.name === 'LCP') vitals.lcp = entry.value;
              if (entry.name === 'CLS') vitals.cls = entry.value;
            });
            
            resolve(vitals);
          }).observe({ entryTypes: ['measure'] });
          
          // 超时处理
          setTimeout(() => resolve({}), 5000);
        });
      });
      
      // 页面加载时间应小于3秒
      return loadTime < 3000;
    } catch (error) {
      return false;
    }
  }
}

// 主测试函数
async function runTests() {
  const results = new TestResults();
  
  console.log('开始集成测试...\n');
  
  // 后端API测试
  console.log('=== 后端API测试 ===');
  const apiTester = new APITester(config.backend.url, config.backend.timeout);
  
  try {
    const healthCheck = await apiTester.testHealthCheck();
    results.add('后端健康检查', healthCheck, healthCheck ? null : new Error('健康检查失败'));
  } catch (error) {
    results.add('后端健康检查', false, error);
  }
  
  try {
    const productsAPI = await apiTester.testProductsAPI();
    results.add('产品API测试', productsAPI, productsAPI ? null : new Error('产品API测试失败'));
  } catch (error) {
    results.add('产品API测试', false, error);
  }
  
  try {
    const caseStudiesAPI = await apiTester.testCaseStudiesAPI();
    results.add('案例研究API测试', caseStudiesAPI, caseStudiesAPI ? null : new Error('案例研究API测试失败'));
  } catch (error) {
    results.add('案例研究API测试', false, error);
  }
  
  try {
    const newsAPI = await apiTester.testNewsAPI();
    results.add('新闻API测试', newsAPI, newsAPI ? null : new Error('新闻API测试失败'));
  } catch (error) {
    results.add('新闻API测试', false, error);
  }
  
  try {
    const globalSettings = await apiTester.testGlobalSettings();
    results.add('全局设置API测试', globalSettings, globalSettings ? null : new Error('全局设置API测试失败'));
  } catch (error) {
    results.add('全局设置API测试', false, error);
  }
  
  // 前端测试
  console.log('\n=== 前端功能测试 ===');
  const frontendTester = new FrontendTester(config.frontend.url, config.frontend.timeout);
  
  try {
    await frontendTester.setup();
    
    // 页面加载测试
    const pages = ['/zh', '/en', '/zh/products', '/en/products', '/zh/case-studies', '/en/case-studies', '/zh/contact', '/en/contact'];
    for (const page of pages) {
      try {
        const pageLoad = await frontendTester.testPageLoad(page);
        results.add(`页面加载测试: ${page}`, pageLoad, pageLoad ? null : new Error(`页面加载失败: ${page}`));
      } catch (error) {
        results.add(`页面加载测试: ${page}`, false, error);
      }
    }
    
    // 语言切换测试
    try {
      const languageSwitching = await frontendTester.testLanguageSwitching();
      results.add('语言切换测试', languageSwitching, languageSwitching ? null : new Error('语言切换失败'));
    } catch (error) {
      results.add('语言切换测试', false, error);
    }
    
    // 产品筛选测试
    try {
      const productFiltering = await frontendTester.testProductFiltering();
      results.add('产品筛选测试', productFiltering, productFiltering ? null : new Error('产品筛选失败'));
    } catch (error) {
      results.add('产品筛选测试', false, error);
    }
    
    // 询盘表单测试
    try {
      const inquiryForm = await frontendTester.testInquiryForm();
      results.add('询盘表单测试', inquiryForm, inquiryForm ? null : new Error('询盘表单提交失败'));
    } catch (error) {
      results.add('询盘表单测试', false, error);
    }
    
    // 响应式设计测试
    try {
      const responsiveDesign = await frontendTester.testResponsiveDesign();
      results.add('响应式设计测试', responsiveDesign, responsiveDesign ? null : new Error('响应式设计测试失败'));
    } catch (error) {
      results.add('响应式设计测试', false, error);
    }
    
    // SEO元素测试
    try {
      const seoElements = await frontendTester.testSEOElements();
      results.add('SEO元素测试', seoElements, seoElements ? null : new Error('SEO元素测试失败'));
    } catch (error) {
      results.add('SEO元素测试', false, error);
    }
    
    // 性能测试
    try {
      const performance = await frontendTester.testPerformance();
      results.add('性能测试', performance, performance ? null : new Error('性能测试失败'));
    } catch (error) {
      results.add('性能测试', false, error);
    }
    
  } finally {
    await frontendTester.teardown();
  }
  
  // 输出测试结果
  const success = results.summary();
  
  // 生成测试报告
  const report = {
    timestamp: new Date().toISOString(),
    environment: {
      frontend: config.frontend.url,
      backend: config.backend.url
    },
    summary: {
      total: results.results.length,
      passed: results.passed,
      failed: results.failed,
      successRate: ((results.passed / results.results.length) * 100).toFixed(2)
    },
    results: results.results
  };
  
  require('fs').writeFileSync('integration-test-report.json', JSON.stringify(report, null, 2));
  console.log('\n测试报告已保存到: integration-test-report.json');
  
  process.exit(success ? 0 : 1);
}

// 错误处理
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

if (require.main === module) {
  runTests();
}

module.exports = { runTests };