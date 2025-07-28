#!/usr/bin/env node

/**
 * 网站功能完整性测试脚本
 * 测试所有页面的正常加载、导航功能和用户交互
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// 测试配置
const TEST_CONFIG = {
  baseUrl: process.env.TEST_URL || 'http://localhost:3000',
  timeout: 30000,
  viewport: {
    width: 1920,
    height: 1080
  },
  mobileViewport: {
    width: 375,
    height: 667
  },
  headless: process.env.HEADLESS !== 'false',
  slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
};

// 测试页面列表
const TEST_PAGES = [
  { path: '/', name: '首页', critical: true },
  { path: '/about', name: '关于我们', critical: true },
  { path: '/products', name: '产品中心', critical: true },
  { path: '/solutions', name: '解决方案', critical: false },
  { path: '/cases', name: '成功案例', critical: true },
  { path: '/news', name: '新闻资讯', critical: false },
  { path: '/support', name: '技术支持', critical: false },
  { path: '/contact', name: '联系我们', critical: true }
];

// 测试结果存储
const testResults = {
  timestamp: new Date().toISOString(),
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  },
  tests: [],
  performance: {},
  accessibility: {},
  errors: []
};

// 日志工具
const logger = {
  info: (message) => console.log(`ℹ️  ${message}`),
  success: (message) => console.log(`✅ ${message}`),
  warning: (message) => console.log(`⚠️  ${message}`),
  error: (message) => console.log(`❌ ${message}`),
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`🐛 ${message}`);
    }
  }
};

// 测试工具类
class WebsiteTestRunner {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    logger.info('初始化测试环境...');
    
    this.browser = await puppeteer.launch({
      headless: TEST_CONFIG.headless,
      slowMo: TEST_CONFIG.slowMo,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    this.page = await this.browser.newPage();
    await this.page.setViewport(TEST_CONFIG.viewport);
    
    // 设置请求拦截
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
      // 阻止不必要的资源加载以提高测试速度
      if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // 监听控制台错误
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        testResults.errors.push({
          type: 'console',
          message: msg.text(),
          timestamp: new Date().toISOString()
        });
      }
    });

    // 监听页面错误
    this.page.on('pageerror', (error) => {
      testResults.errors.push({
        type: 'page',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    });

    logger.success('测试环境初始化完成');
  }

  async runAllTests() {
    logger.info('开始执行网站功能测试...');
    
    try {
      // 基础功能测试
      await this.testBasicFunctionality();
      
      // 导航测试
      await this.testNavigation();
      
      // 响应式设计测试
      await this.testResponsiveDesign();
      
      // 表单功能测试
      await this.testForms();
      
      // 性能测试
      await this.testPerformance();
      
      // 可访问性测试
      await this.testAccessibility();
      
      // 多语言测试
      await this.testMultiLanguage();
      
      // SEO测试
      await this.testSEO();
      
    } catch (error) {
      logger.error(`测试执行失败: ${error.message}`);
      testResults.errors.push({
        type: 'test_execution',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }
  }

  async testBasicFunctionality() {
    logger.info('测试基础页面功能...');
    
    for (const testPage of TEST_PAGES) {
      const testResult = {
        name: `页面加载 - ${testPage.name}`,
        path: testPage.path,
        status: 'pending',
        duration: 0,
        details: {},
        errors: []
      };

      const startTime = Date.now();
      
      try {
        // 访问页面
        const response = await this.page.goto(`${TEST_CONFIG.baseUrl}${testPage.path}`, {
          waitUntil: 'networkidle2',
          timeout: TEST_CONFIG.timeout
        });

        testResult.duration = Date.now() - startTime;

        // 检查HTTP状态
        if (response.status() !== 200) {
          throw new Error(`HTTP状态码: ${response.status()}`);
        }

        // 检查页面标题
        const title = await this.page.title();
        if (!title || title.includes('404') || title.includes('Error')) {
          throw new Error(`页面标题异常: ${title}`);
        }

        // 检查页面内容
        const bodyText = await this.page.evaluate(() => document.body.innerText);
        if (!bodyText || bodyText.length < 100) {
          throw new Error('页面内容过少或为空');
        }

        // 检查关键元素
        await this.checkCriticalElements(testPage.path);

        testResult.status = 'passed';
        testResult.details = {
          httpStatus: response.status(),
          title,
          contentLength: bodyText.length,
          loadTime: testResult.duration
        };

        logger.success(`${testPage.name} 页面测试通过`);
        
      } catch (error) {
        testResult.status = 'failed';
        testResult.errors.push(error.message);
        logger.error(`${testPage.name} 页面测试失败: ${error.message}`);
        
        if (testPage.critical) {
          testResults.summary.failed++;
        } else {
          testResults.summary.warnings++;
        }
      }

      testResults.tests.push(testResult);
      testResults.summary.total++;
      
      if (testResult.status === 'passed') {
        testResults.summary.passed++;
      }
    }
  }

  async checkCriticalElements(pagePath) {
    // 检查导航栏
    const nav = await this.page.$('nav, header');
    if (!nav) {
      throw new Error('未找到导航栏');
    }

    // 检查页面特定元素
    switch (pagePath) {
      case '/':
        // 首页关键元素
        const hero = await this.page.$('[class*="hero"], .hero, main section:first-child');
        if (!hero) {
          throw new Error('首页未找到主要内容区域');
        }
        break;
        
      case '/products':
        // 产品页面关键元素
        const productGrid = await this.page.$('[class*="grid"], .grid, [class*="product"]');
        if (!productGrid) {
          throw new Error('产品页面未找到产品展示区域');
        }
        break;
        
      case '/contact':
        // 联系页面关键元素
        const contactForm = await this.page.$('form');
        if (!contactForm) {
          throw new Error('联系页面未找到联系表单');
        }
        break;
    }
  }

  async testNavigation() {
    logger.info('测试导航功能...');
    
    const testResult = {
      name: '导航功能测试',
      status: 'pending',
      duration: 0,
      details: {},
      errors: []
    };

    const startTime = Date.now();

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}/`, {
        waitUntil: 'networkidle2'
      });

      // 测试主导航链接
      const navLinks = await this.page.$$eval('nav a[href]', links => 
        links.map(link => ({
          text: link.textContent.trim(),
          href: link.getAttribute('href')
        }))
      );

      if (navLinks.length === 0) {
        throw new Error('未找到导航链接');
      }

      // 测试每个导航链接
      for (const link of navLinks.slice(0, 5)) { // 限制测试数量
        if (link.href && link.href.startsWith('/')) {
          try {
            await this.page.click(`nav a[href="${link.href}"]`);
            await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
            
            const currentUrl = this.page.url();
            if (!currentUrl.includes(link.href)) {
              throw new Error(`导航到 ${link.href} 失败`);
            }
          } catch (error) {
            testResult.errors.push(`导航链接 "${link.text}" 测试失败: ${error.message}`);
          }
        }
      }

      // 测试移动端导航
      await this.page.setViewport(TEST_CONFIG.mobileViewport);
      await this.page.goto(`${TEST_CONFIG.baseUrl}/`);
      
      const mobileMenuButton = await this.page.$('[class*="menu"], .menu-button, button[aria-label*="menu"]');
      if (mobileMenuButton) {
        await mobileMenuButton.click();
        await this.page.waitForTimeout(500);
        
        const mobileMenu = await this.page.$('[class*="mobile"], .mobile-menu');
        if (!mobileMenu) {
          testResult.errors.push('移动端菜单未正确显示');
        }
      }

      testResult.duration = Date.now() - startTime;
      testResult.status = testResult.errors.length === 0 ? 'passed' : 'failed';
      testResult.details = {
        navLinksCount: navLinks.length,
        testedLinks: navLinks.slice(0, 5).length
      };

      if (testResult.status === 'passed') {
        logger.success('导航功能测试通过');
        testResults.summary.passed++;
      } else {
        logger.error('导航功能测试失败');
        testResults.summary.failed++;
      }

    } catch (error) {
      testResult.status = 'failed';
      testResult.errors.push(error.message);
      testResult.duration = Date.now() - startTime;
      logger.error(`导航功能测试失败: ${error.message}`);
      testResults.summary.failed++;
    }

    testResults.tests.push(testResult);
    testResults.summary.total++;
  }

  async testResponsiveDesign() {
    logger.info('测试响应式设计...');
    
    const viewports = [
      { name: '桌面端', ...TEST_CONFIG.viewport },
      { name: '平板端', width: 768, height: 1024 },
      { name: '移动端', ...TEST_CONFIG.mobileViewport }
    ];

    for (const viewport of viewports) {
      const testResult = {
        name: `响应式设计 - ${viewport.name}`,
        status: 'pending',
        duration: 0,
        details: {},
        errors: []
      };

      const startTime = Date.now();

      try {
        await this.page.setViewport({
          width: viewport.width,
          height: viewport.height
        });

        await this.page.goto(`${TEST_CONFIG.baseUrl}/`, {
          waitUntil: 'networkidle2'
        });

        // 检查布局是否正常
        const layoutCheck = await this.page.evaluate(() => {
          const body = document.body;
          const hasHorizontalScroll = body.scrollWidth > window.innerWidth;
          const hasOverflowElements = Array.from(document.querySelectorAll('*')).some(el => {
            const rect = el.getBoundingClientRect();
            return rect.right > window.innerWidth;
          });

          return {
            hasHorizontalScroll,
            hasOverflowElements,
            bodyWidth: body.scrollWidth,
            windowWidth: window.innerWidth
          };
        });

        if (layoutCheck.hasHorizontalScroll) {
          testResult.errors.push('存在水平滚动条');
        }

        if (layoutCheck.hasOverflowElements) {
          testResult.errors.push('存在溢出元素');
        }

        testResult.duration = Date.now() - startTime;
        testResult.status = testResult.errors.length === 0 ? 'passed' : 'failed';
        testResult.details = layoutCheck;

        if (testResult.status === 'passed') {
          logger.success(`${viewport.name} 响应式测试通过`);
          testResults.summary.passed++;
        } else {
          logger.warning(`${viewport.name} 响应式测试有问题`);
          testResults.summary.warnings++;
        }

      } catch (error) {
        testResult.status = 'failed';
        testResult.errors.push(error.message);
        testResult.duration = Date.now() - startTime;
        logger.error(`${viewport.name} 响应式测试失败: ${error.message}`);
        testResults.summary.failed++;
      }

      testResults.tests.push(testResult);
      testResults.summary.total++;
    }
  }

  async testForms() {
    logger.info('测试表单功能...');
    
    const testResult = {
      name: '表单功能测试',
      status: 'pending',
      duration: 0,
      details: {},
      errors: []
    };

    const startTime = Date.now();

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}/contact`, {
        waitUntil: 'networkidle2'
      });

      // 查找表单
      const form = await this.page.$('form');
      if (!form) {
        throw new Error('未找到联系表单');
      }

      // 测试表单字段
      const formFields = await this.page.$$eval('form input, form textarea, form select', fields =>
        fields.map(field => ({
          type: field.type || field.tagName.toLowerCase(),
          name: field.name,
          required: field.required,
          placeholder: field.placeholder
        }))
      );

      if (formFields.length === 0) {
        throw new Error('表单中没有输入字段');
      }

      // 测试表单验证
      const submitButton = await this.page.$('form button[type="submit"], form input[type="submit"]');
      if (submitButton) {
        // 尝试提交空表单
        await submitButton.click();
        await this.page.waitForTimeout(1000);

        // 检查是否有验证消息
        const validationMessages = await this.page.$$eval(
          '[class*="error"], .error, [class*="invalid"], .invalid',
          elements => elements.map(el => el.textContent.trim())
        );

        testResult.details.validationMessages = validationMessages;
      }

      // 填写并提交表单
      await this.page.type('input[name="name"], input[type="text"]:first-of-type', '测试用户');
      await this.page.type('input[name="email"], input[type="email"]', 'test@example.com');
      
      const messageField = await this.page.$('textarea[name="message"], textarea');
      if (messageField) {
        await this.page.type('textarea[name="message"], textarea', '这是一个测试消息');
      }

      testResult.duration = Date.now() - startTime;
      testResult.status = 'passed';
      testResult.details.formFields = formFields;

      logger.success('表单功能测试通过');
      testResults.summary.passed++;

    } catch (error) {
      testResult.status = 'failed';
      testResult.errors.push(error.message);
      testResult.duration = Date.now() - startTime;
      logger.error(`表单功能测试失败: ${error.message}`);
      testResults.summary.failed++;
    }

    testResults.tests.push(testResult);
    testResults.summary.total++;
  }

  async testPerformance() {
    logger.info('测试页面性能...');
    
    const performanceResults = {};

    for (const testPage of TEST_PAGES.slice(0, 3)) { // 测试前3个关键页面
      try {
        const metrics = await this.page.metrics();
        
        await this.page.goto(`${TEST_CONFIG.baseUrl}${testPage.path}`, {
          waitUntil: 'networkidle2'
        });

        const performanceMetrics = await this.page.evaluate(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          return {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
          };
        });

        performanceResults[testPage.path] = {
          ...performanceMetrics,
          jsHeapUsedSize: metrics.JSHeapUsedSize,
          jsHeapTotalSize: metrics.JSHeapTotalSize
        };

        // 性能警告
        if (performanceMetrics.loadTime > 3000) {
          logger.warning(`${testPage.name} 页面加载时间过长: ${performanceMetrics.loadTime}ms`);
        }

      } catch (error) {
        logger.error(`${testPage.name} 性能测试失败: ${error.message}`);
        performanceResults[testPage.path] = { error: error.message };
      }
    }

    testResults.performance = performanceResults;
    logger.success('性能测试完成');
  }

  async testAccessibility() {
    logger.info('测试可访问性...');
    
    const accessibilityResults = {};

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}/`, {
        waitUntil: 'networkidle2'
      });

      // 基础可访问性检查
      const accessibilityCheck = await this.page.evaluate(() => {
        const results = {
          imagesWithoutAlt: 0,
          linksWithoutText: 0,
          headingStructure: [],
          formLabels: 0,
          focusableElements: 0
        };

        // 检查图片alt属性
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.alt) {
            results.imagesWithoutAlt++;
          }
        });

        // 检查链接文本
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
            results.linksWithoutText++;
          }
        });

        // 检查标题结构
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          results.headingStructure.push({
            level: parseInt(heading.tagName.charAt(1)),
            text: heading.textContent.trim().substring(0, 50)
          });
        });

        // 检查表单标签
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
          const label = document.querySelector(`label[for="${input.id}"]`);
          if (label || input.getAttribute('aria-label')) {
            results.formLabels++;
          }
        });

        // 检查可聚焦元素
        const focusableElements = document.querySelectorAll(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        results.focusableElements = focusableElements.length;

        return results;
      });

      accessibilityResults.basicChecks = accessibilityCheck;

      // 键盘导航测试
      await this.page.keyboard.press('Tab');
      const focusedElement = await this.page.evaluate(() => {
        return document.activeElement ? {
          tagName: document.activeElement.tagName,
          className: document.activeElement.className,
          id: document.activeElement.id
        } : null;
      });

      accessibilityResults.keyboardNavigation = {
        canFocus: !!focusedElement,
        firstFocusableElement: focusedElement
      };

      testResults.accessibility = accessibilityResults;
      logger.success('可访问性测试完成');

    } catch (error) {
      logger.error(`可访问性测试失败: ${error.message}`);
      testResults.accessibility = { error: error.message };
    }
  }

  async testMultiLanguage() {
    logger.info('测试多语言功能...');
    
    const testResult = {
      name: '多语言功能测试',
      status: 'pending',
      duration: 0,
      details: {},
      errors: []
    };

    const startTime = Date.now();

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}/`, {
        waitUntil: 'networkidle2'
      });

      // 查找语言切换器
      const languageSwitcher = await this.page.$('[class*="language"], .language-switcher, [data-language]');
      
      if (languageSwitcher) {
        // 测试语言切换
        const initialContent = await this.page.evaluate(() => document.body.textContent);
        
        // 尝试切换到英文
        const englishOption = await this.page.$('[data-language="en"], [href*="en"], button:contains("EN")');
        if (englishOption) {
          await englishOption.click();
          await this.page.waitForTimeout(2000);
          
          const newContent = await this.page.evaluate(() => document.body.textContent);
          
          if (initialContent === newContent) {
            testResult.errors.push('语言切换后内容未发生变化');
          }
        }

        testResult.details.hasLanguageSwitcher = true;
      } else {
        testResult.details.hasLanguageSwitcher = false;
        testResult.errors.push('未找到语言切换器');
      }

      testResult.duration = Date.now() - startTime;
      testResult.status = testResult.errors.length === 0 ? 'passed' : 'warning';

      if (testResult.status === 'passed') {
        logger.success('多语言功能测试通过');
        testResults.summary.passed++;
      } else {
        logger.warning('多语言功能测试有问题');
        testResults.summary.warnings++;
      }

    } catch (error) {
      testResult.status = 'failed';
      testResult.errors.push(error.message);
      testResult.duration = Date.now() - startTime;
      logger.error(`多语言功能测试失败: ${error.message}`);
      testResults.summary.failed++;
    }

    testResults.tests.push(testResult);
    testResults.summary.total++;
  }

  async testSEO() {
    logger.info('测试SEO基础要素...');
    
    const seoResults = {};

    for (const testPage of TEST_PAGES.slice(0, 3)) {
      try {
        await this.page.goto(`${TEST_CONFIG.baseUrl}${testPage.path}`, {
          waitUntil: 'networkidle2'
        });

        const seoData = await this.page.evaluate(() => {
          return {
            title: document.title,
            metaDescription: document.querySelector('meta[name="description"]')?.content || '',
            metaKeywords: document.querySelector('meta[name="keywords"]')?.content || '',
            h1Count: document.querySelectorAll('h1').length,
            h1Text: document.querySelector('h1')?.textContent?.trim() || '',
            canonicalUrl: document.querySelector('link[rel="canonical"]')?.href || '',
            ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
            ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
            structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).length
          };
        });

        seoResults[testPage.path] = seoData;

      } catch (error) {
        seoResults[testPage.path] = { error: error.message };
      }
    }

    testResults.seo = seoResults;
    logger.success('SEO测试完成');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      logger.info('测试环境清理完成');
    }
  }

  async generateReport() {
    const reportPath = path.join(process.cwd(), 'reports', 'functionality-test-report.json');
    
    // 确保报告目录存在
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    
    // 生成详细报告
    const report = {
      ...testResults,
      config: TEST_CONFIG,
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        timestamp: new Date().toISOString()
      }
    };

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    // 生成简化的HTML报告
    const htmlReport = this.generateHTMLReport(report);
    const htmlReportPath = path.join(process.cwd(), 'reports', 'functionality-test-report.html');
    await fs.writeFile(htmlReportPath, htmlReport);

    logger.success(`测试报告已生成: ${reportPath}`);
    logger.success(`HTML报告已生成: ${htmlReportPath}`);
    
    return report;
  }

  generateHTMLReport(report) {
    const passRate = ((report.summary.passed / report.summary.total) * 100).toFixed(1);
    
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网站功能测试报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; }
        .summary { display: flex; gap: 20px; margin: 20px 0; }
        .metric { background: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .warning { color: #ffc107; }
        .test-item { margin: 10px 0; padding: 10px; border-left: 4px solid #ddd; }
        .test-item.passed { border-color: #28a745; }
        .test-item.failed { border-color: #dc3545; }
        .test-item.warning { border-color: #ffc107; }
        .details { margin-top: 10px; font-size: 0.9em; color: #666; }
        .errors { color: #dc3545; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>网站功能测试报告</h1>
        <p>测试时间: ${report.timestamp}</p>
        <p>测试URL: ${TEST_CONFIG.baseUrl}</p>
    </div>
    
    <div class="summary">
        <div class="metric">
            <h3>总测试数</h3>
            <div style="font-size: 2em; font-weight: bold;">${report.summary.total}</div>
        </div>
        <div class="metric">
            <h3>通过率</h3>
            <div style="font-size: 2em; font-weight: bold; color: #28a745;">${passRate}%</div>
        </div>
        <div class="metric">
            <h3 class="passed">通过</h3>
            <div style="font-size: 2em; font-weight: bold;">${report.summary.passed}</div>
        </div>
        <div class="metric">
            <h3 class="failed">失败</h3>
            <div style="font-size: 2em; font-weight: bold;">${report.summary.failed}</div>
        </div>
        <div class="metric">
            <h3 class="warning">警告</h3>
            <div style="font-size: 2em; font-weight: bold;">${report.summary.warnings}</div>
        </div>
    </div>
    
    <h2>测试详情</h2>
    ${report.tests.map(test => `
        <div class="test-item ${test.status}">
            <h4>${test.name} - <span class="${test.status}">${test.status.toUpperCase()}</span></h4>
            <div class="details">
                <p>耗时: ${test.duration}ms</p>
                ${test.path ? `<p>路径: ${test.path}</p>` : ''}
                ${test.errors.length > 0 ? `
                    <div class="errors">
                        <strong>错误:</strong>
                        <ul>${test.errors.map(error => `<li>${error}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('')}
    
    ${Object.keys(report.performance).length > 0 ? `
        <h2>性能数据</h2>
        <pre>${JSON.stringify(report.performance, null, 2)}</pre>
    ` : ''}
    
    ${report.accessibility ? `
        <h2>可访问性检查</h2>
        <pre>${JSON.stringify(report.accessibility, null, 2)}</pre>
    ` : ''}
    
    ${report.errors.length > 0 ? `
        <h2>系统错误</h2>
        <div class="errors">
            ${report.errors.map(error => `
                <div style="margin: 10px 0; padding: 10px; background: #f8d7da; border-radius: 5px;">
                    <strong>${error.type}:</strong> ${error.message}
                    <br><small>${error.timestamp}</small>
                </div>
            `).join('')}
        </div>
    ` : ''}
</body>
</html>`;
  }
}

// 主执行函数
async function main() {
  const testRunner = new WebsiteTestRunner();
  
  try {
    await testRunner.initialize();
    await testRunner.runAllTests();
    
    const report = await testRunner.generateReport();
    
    // 输出测试摘要
    logger.info('\n=== 测试摘要 ===');
    logger.info(`总测试数: ${report.summary.total}`);
    logger.success(`通过: ${report.summary.passed}`);
    logger.error(`失败: ${report.summary.failed}`);
    logger.warning(`警告: ${report.summary.warnings}`);
    
    const passRate = ((report.summary.passed / report.summary.total) * 100).toFixed(1);
    logger.info(`通过率: ${passRate}%`);
    
    // 根据测试结果设置退出码
    const exitCode = report.summary.failed > 0 ? 1 : 0;
    process.exit(exitCode);
    
  } catch (error) {
    logger.error(`测试执行失败: ${error.message}`);
    process.exit(1);
  } finally {
    await testRunner.cleanup();
  }
}

// 处理未捕获的异常
process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的Promise拒绝:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常:', error);
  process.exit(1);
});

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { WebsiteTestRunner, TEST_CONFIG, TEST_PAGES };