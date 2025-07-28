#!/usr/bin/env node

/**
 * 部署验证和性能优化脚本
 * 验证生产环境部署的稳定性和性能指标
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

// 验证配置
const VALIDATION_CONFIG = {
  productionUrl: process.env.PRODUCTION_URL || 'https://your-domain.com',
  stagingUrl: process.env.STAGING_URL || 'https://staging.your-domain.com',
  timeout: 30000,
  retries: 3,
  viewport: { width: 1920, height: 1080 },
  mobileViewport: { width: 375, height: 667 },
  headless: true,
  concurrency: 3
};

// 验证测试套件
const VALIDATION_TESTS = [
  {
    name: 'SSL证书验证',
    type: 'ssl',
    critical: true,
    timeout: 10000
  },
  {
    name: 'DNS解析验证',
    type: 'dns',
    critical: true,
    timeout: 5000
  },
  {
    name: '页面可访问性验证',
    type: 'accessibility',
    critical: true,
    pages: ['/', '/about', '/products', '/contact']
  },
  {
    name: '性能基准测试',
    type: 'performance',
    critical: true,
    thresholds: {
      loadTime: 3000,
      firstContentfulPaint: 1500,
      largestContentfulPaint: 2500,
      cumulativeLayoutShift: 0.1
    }
  },
  {
    name: 'API端点验证',
    type: 'api',
    critical: true,
    endpoints: [
      '/api/health',
      '/api/products',
      '/api/news'
    ]
  },
  {
    name: '表单功能验证',
    type: 'forms',
    critical: false,
    forms: ['/contact']
  },
  {
    name: '多语言功能验证',
    type: 'i18n',
    critical: false,
    languages: ['zh', 'en']
  },
  {
    name: 'SEO元数据验证',
    type: 'seo',
    critical: false,
    pages: ['/', '/about', '/products']
  },
  {
    name: '安全头验证',
    type: 'security',
    critical: true,
    headers: [
      'X-Frame-Options',
      'X-Content-Type-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security'
    ]
  },
  {
    name: '缓存策略验证',
    type: 'caching',
    critical: false,
    resources: ['css', 'js', 'images']
  }
];

// 验证结果存储
const validationResults = {
  timestamp: new Date().toISOString(),
  environment: {
    productionUrl: VALIDATION_CONFIG.productionUrl,
    stagingUrl: VALIDATION_CONFIG.stagingUrl,
    nodeVersion: process.version,
    platform: process.platform
  },
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    critical_failures: 0
  },
  tests: [],
  performance: {},
  recommendations: [],
  errors: []
};

// 日志工具
const logger = {
  info: (message) => console.log(`[${new Date().toISOString()}] ℹ️  ${message}`),
  success: (message) => console.log(`[${new Date().toISOString()}] ✅ ${message}`),
  warning: (message) => console.log(`[${new Date().toISOString()}] ⚠️  ${message}`),
  error: (message) => console.log(`[${new Date().toISOString()}] ❌ ${message}`),
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`[${new Date().toISOString()}] 🐛 ${message}`);
    }
  }
};

// 部署验证器类
class DeploymentValidator {
  constructor() {
    this.browser = null;
  }

  async initialize() {
    logger.info('初始化部署验证器...');
    
    this.browser = await puppeteer.launch({
      headless: VALIDATION_CONFIG.headless,
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

    logger.success('部署验证器初始化完成');
  }

  async runAllValidations() {
    logger.info('开始部署验证...');
    
    for (const test of VALIDATION_TESTS) {
      const testResult = {
        name: test.name,
        type: test.type,
        critical: test.critical,
        status: 'pending',
        duration: 0,
        details: {},
        errors: [],
        recommendations: []
      };

      const startTime = Date.now();
      
      try {
        switch (test.type) {
          case 'ssl':
            await this.validateSSL(testResult);
            break;
          case 'dns':
            await this.validateDNS(testResult);
            break;
          case 'accessibility':
            await this.validateAccessibility(testResult, test.pages);
            break;
          case 'performance':
            await this.validatePerformance(testResult, test.thresholds);
            break;
          case 'api':
            await this.validateAPI(testResult, test.endpoints);
            break;
          case 'forms':
            await this.validateForms(testResult, test.forms);
            break;
          case 'i18n':
            await this.validateI18n(testResult, test.languages);
            break;
          case 'seo':
            await this.validateSEO(testResult, test.pages);
            break;
          case 'security':
            await this.validateSecurity(testResult, test.headers);
            break;
          case 'caching':
            await this.validateCaching(testResult, test.resources);
            break;
        }

        testResult.duration = Date.now() - startTime;
        
        if (testResult.status === 'passed') {
          logger.success(`${test.name} - 通过`);
          validationResults.summary.passed++;
        } else if (testResult.status === 'warning') {
          logger.warning(`${test.name} - 警告`);
          validationResults.summary.warnings++;
        } else {
          logger.error(`${test.name} - 失败`);
          validationResults.summary.failed++;
          
          if (test.critical) {
            validationResults.summary.critical_failures++;
          }
        }

      } catch (error) {
        testResult.status = 'failed';
        testResult.errors.push(error.message);
        testResult.duration = Date.now() - startTime;
        
        logger.error(`${test.name} - 执行失败: ${error.message}`);
        validationResults.summary.failed++;
        
        if (test.critical) {
          validationResults.summary.critical_failures++;
        }
      }

      validationResults.tests.push(testResult);
      validationResults.summary.total++;
    }

    // 生成优化建议
    this.generateRecommendations();
  }

  async validateSSL(testResult) {
    const url = new URL(VALIDATION_CONFIG.productionUrl);
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: url.hostname,
        port: 443,
        method: 'GET',
        timeout: VALIDATION_CONFIG.timeout
      };

      const req = https.request(options, (res) => {
        const cert = res.connection.getPeerCertificate();
        
        if (cert && cert.valid_from && cert.valid_to) {
          const validFrom = new Date(cert.valid_from);
          const validTo = new Date(cert.valid_to);
          const now = new Date();
          const daysUntilExpiry = Math.floor((validTo - now) / (1000 * 60 * 60 * 24));

          testResult.details = {
            issuer: cert.issuer.CN,
            subject: cert.subject.CN,
            validFrom: validFrom.toISOString(),
            validTo: validTo.toISOString(),
            daysUntilExpiry
          };

          if (daysUntilExpiry < 30) {
            testResult.status = 'warning';
            testResult.recommendations.push(`SSL证书将在${daysUntilExpiry}天后过期，建议及时续期`);
          } else {
            testResult.status = 'passed';
          }
        } else {
          testResult.status = 'failed';
          testResult.errors.push('无法获取SSL证书信息');
        }
        
        resolve();
      });

      req.on('error', (error) => {
        testResult.status = 'failed';
        testResult.errors.push(`SSL连接失败: ${error.message}`);
        resolve();
      });

      req.on('timeout', () => {
        testResult.status = 'failed';
        testResult.errors.push('SSL验证超时');
        req.destroy();
        resolve();
      });

      req.setTimeout(VALIDATION_CONFIG.timeout);
      req.end();
    });
  }

  async validateDNS(testResult) {
    const dns = require('dns').promises;
    const url = new URL(VALIDATION_CONFIG.productionUrl);

    try {
      const addresses = await dns.resolve4(url.hostname);
      
      testResult.details = {
        hostname: url.hostname,
        addresses,
        recordCount: addresses.length
      };

      if (addresses.length > 0) {
        testResult.status = 'passed';
      } else {
        testResult.status = 'failed';
        testResult.errors.push('DNS解析未返回任何地址');
      }

      // 检查DNS响应时间
      const startTime = Date.now();
      await dns.resolve4(url.hostname);
      const responseTime = Date.now() - startTime;
      
      testResult.details.responseTime = responseTime;
      
      if (responseTime > 1000) {
        testResult.recommendations.push(`DNS响应时间较慢 (${responseTime}ms)，建议优化DNS配置`);
      }

    } catch (error) {
      testResult.status = 'failed';
      testResult.errors.push(`DNS解析失败: ${error.message}`);
    }
  }

  async validateAccessibility(testResult, pages) {
    const results = {};
    let allPassed = true;

    for (const pagePath of pages) {
      try {
        const page = await this.browser.newPage();
        await page.setViewport(VALIDATION_CONFIG.viewport);
        
        const response = await page.goto(`${VALIDATION_CONFIG.productionUrl}${pagePath}`, {
          waitUntil: 'networkidle2',
          timeout: VALIDATION_CONFIG.timeout
        });

        if (!response.ok()) {
          results[pagePath] = {
            accessible: false,
            error: `HTTP ${response.status()}: ${response.statusText()}`
          };
          allPassed = false;
          continue;
        }

        // 基础可访问性检查
        const accessibilityCheck = await page.evaluate(() => {
          const issues = [];
          
          // 检查图片alt属性
          const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
          if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} 个图片缺少alt属性`);
          }

          // 检查表单标签
          const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([id])');
          if (inputsWithoutLabels.length > 0) {
            issues.push(`${inputsWithoutLabels.length} 个输入框缺少标签`);
          }

          // 检查标题结构
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
          
          for (let i = 1; i < headingLevels.length; i++) {
            if (headingLevels[i] - headingLevels[i-1] > 1) {
              issues.push('标题层级跳跃，影响屏幕阅读器导航');
              break;
            }
          }

          return {
            issues,
            totalImages: document.querySelectorAll('img').length,
            totalInputs: document.querySelectorAll('input').length,
            totalHeadings: headings.length
          };
        });

        results[pagePath] = {
          accessible: accessibilityCheck.issues.length === 0,
          issues: accessibilityCheck.issues,
          stats: {
            totalImages: accessibilityCheck.totalImages,
            totalInputs: accessibilityCheck.totalInputs,
            totalHeadings: accessibilityCheck.totalHeadings
          }
        };

        if (accessibilityCheck.issues.length > 0) {
          allPassed = false;
        }

        await page.close();

      } catch (error) {
        results[pagePath] = {
          accessible: false,
          error: error.message
        };
        allPassed = false;
      }
    }

    testResult.details = results;
    testResult.status = allPassed ? 'passed' : 'warning';

    // 生成可访问性建议
    Object.entries(results).forEach(([page, result]) => {
      if (result.issues && result.issues.length > 0) {
        testResult.recommendations.push(`${page}: ${result.issues.join(', ')}`);
      }
    });
  }

  async validatePerformance(testResult, thresholds) {
    const performanceResults = {};
    let allPassed = true;

    const testPages = ['/', '/products', '/about'];

    for (const pagePath of testPages) {
      try {
        const page = await this.browser.newPage();
        await page.setViewport(VALIDATION_CONFIG.viewport);

        // 启用性能监控
        await page.setCacheEnabled(false);

        const startTime = Date.now();
        const response = await page.goto(`${VALIDATION_CONFIG.productionUrl}${pagePath}`, {
          waitUntil: 'networkidle2',
          timeout: VALIDATION_CONFIG.timeout
        });

        const loadTime = Date.now() - startTime;

        if (!response.ok()) {
          performanceResults[pagePath] = {
            error: `HTTP ${response.status()}: ${response.statusText()}`
          };
          allPassed = false;
          continue;
        }

        // 获取性能指标
        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          const paintEntries = performance.getEntriesByType('paint');
          
          const result = {
            loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
            domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
            firstByte: navigation ? navigation.responseStart - navigation.requestStart : 0
          };

          paintEntries.forEach(entry => {
            if (entry.name === 'first-paint') {
              result.firstPaint = entry.startTime;
            } else if (entry.name === 'first-contentful-paint') {
              result.firstContentfulPaint = entry.startTime;
            }
          });

          return result;
        });

        metrics.totalLoadTime = loadTime;

        // 检查性能阈值
        const issues = [];
        if (metrics.totalLoadTime > thresholds.loadTime) {
          issues.push(`页面加载时间过长: ${metrics.totalLoadTime}ms (阈值: ${thresholds.loadTime}ms)`);
          allPassed = false;
        }

        if (metrics.firstContentfulPaint > thresholds.firstContentfulPaint) {
          issues.push(`首次内容绘制时间过长: ${Math.round(metrics.firstContentfulPaint)}ms`);
          allPassed = false;
        }

        performanceResults[pagePath] = {
          metrics,
          issues,
          passed: issues.length === 0
        };

        await page.close();

      } catch (error) {
        performanceResults[pagePath] = {
          error: error.message
        };
        allPassed = false;
      }
    }

    testResult.details = performanceResults;
    testResult.status = allPassed ? 'passed' : 'warning';

    // 存储性能数据用于报告
    validationResults.performance = performanceResults;

    // 生成性能优化建议
    Object.entries(performanceResults).forEach(([page, result]) => {
      if (result.issues && result.issues.length > 0) {
        result.issues.forEach(issue => {
          testResult.recommendations.push(`${page}: ${issue}`);
        });
      }
    });
  }

  async validateAPI(testResult, endpoints) {
    const results = {};
    let allPassed = true;

    for (const endpoint of endpoints) {
      try {
        const startTime = Date.now();
        const response = await fetch(`${VALIDATION_CONFIG.productionUrl}${endpoint}`, {
          timeout: VALIDATION_CONFIG.timeout
        });
        const responseTime = Date.now() - startTime;

        results[endpoint] = {
          status: response.status,
          statusText: response.statusText,
          responseTime,
          headers: Object.fromEntries(response.headers.entries())
        };

        if (!response.ok) {
          results[endpoint].error = `HTTP ${response.status}: ${response.statusText}`;
          allPassed = false;
        }

        // 检查响应时间
        if (responseTime > 2000) {
          results[endpoint].warning = `响应时间较慢: ${responseTime}ms`;
          testResult.recommendations.push(`${endpoint} 响应时间优化建议`);
        }

      } catch (error) {
        results[endpoint] = {
          error: error.message
        };
        allPassed = false;
      }
    }

    testResult.details = results;
    testResult.status = allPassed ? 'passed' : 'failed';
  }

  async validateForms(testResult, formPages) {
    const results = {};
    let allPassed = true;

    for (const pagePath of formPages) {
      try {
        const page = await this.browser.newPage();
        await page.setViewport(VALIDATION_CONFIG.viewport);
        
        await page.goto(`${VALIDATION_CONFIG.productionUrl}${pagePath}`, {
          waitUntil: 'networkidle2'
        });

        // 查找表单
        const formCheck = await page.evaluate(() => {
          const forms = document.querySelectorAll('form');
          const formData = [];

          forms.forEach((form, index) => {
            const inputs = form.querySelectorAll('input, textarea, select');
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            
            formData.push({
              index,
              inputCount: inputs.length,
              hasSubmitButton: !!submitButton,
              action: form.action,
              method: form.method
            });
          });

          return {
            formCount: forms.length,
            forms: formData
          };
        });

        results[pagePath] = formCheck;

        if (formCheck.formCount === 0) {
          results[pagePath].warning = '页面上未找到表单';
        }

        await page.close();

      } catch (error) {
        results[pagePath] = {
          error: error.message
        };
        allPassed = false;
      }
    }

    testResult.details = results;
    testResult.status = allPassed ? 'passed' : 'warning';
  }

  async validateI18n(testResult, languages) {
    const results = {};
    let allPassed = true;

    for (const lang of languages) {
      try {
        const page = await this.browser.newPage();
        await page.setViewport(VALIDATION_CONFIG.viewport);
        
        // 尝试访问不同语言版本
        const langUrl = lang === 'zh' ? 
          VALIDATION_CONFIG.productionUrl : 
          `${VALIDATION_CONFIG.productionUrl}/${lang}`;

        const response = await page.goto(langUrl, {
          waitUntil: 'networkidle2'
        });

        const langCheck = await page.evaluate((language) => {
          return {
            htmlLang: document.documentElement.lang,
            title: document.title,
            hasLanguageSwitcher: !!document.querySelector('[data-language], .language-switcher'),
            contentSample: document.body.textContent.substring(0, 100)
          };
        }, lang);

        results[lang] = {
          url: langUrl,
          status: response.status(),
          ...langCheck
        };

        if (!response.ok()) {
          results[lang].error = `HTTP ${response.status()}`;
          allPassed = false;
        }

        await page.close();

      } catch (error) {
        results[lang] = {
          error: error.message
        };
        allPassed = false;
      }
    }

    testResult.details = results;
    testResult.status = allPassed ? 'passed' : 'warning';
  }

  async validateSEO(testResult, pages) {
    const results = {};
    let allPassed = true;

    for (const pagePath of pages) {
      try {
        const page = await this.browser.newPage();
        await page.setViewport(VALIDATION_CONFIG.viewport);
        
        await page.goto(`${VALIDATION_CONFIG.productionUrl}${pagePath}`, {
          waitUntil: 'networkidle2'
        });

        const seoCheck = await page.evaluate(() => {
          const issues = [];
          
          const title = document.title;
          const metaDescription = document.querySelector('meta[name="description"]')?.content;
          const h1Elements = document.querySelectorAll('h1');
          const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href;
          
          if (!title || title.length < 10) {
            issues.push('页面标题过短或缺失');
          }
          
          if (!metaDescription || metaDescription.length < 50) {
            issues.push('Meta描述过短或缺失');
          }
          
          if (h1Elements.length !== 1) {
            issues.push(`H1标签数量异常: ${h1Elements.length} (应该为1)`);
          }
          
          if (!canonicalUrl) {
            issues.push('缺少canonical URL');
          }

          return {
            title,
            metaDescription,
            h1Count: h1Elements.length,
            h1Text: h1Elements[0]?.textContent?.trim(),
            canonicalUrl,
            issues
          };
        });

        results[pagePath] = seoCheck;

        if (seoCheck.issues.length > 0) {
          allPassed = false;
        }

        await page.close();

      } catch (error) {
        results[pagePath] = {
          error: error.message
        };
        allPassed = false;
      }
    }

    testResult.details = results;
    testResult.status = allPassed ? 'passed' : 'warning';

    // 生成SEO建议
    Object.entries(results).forEach(([page, result]) => {
      if (result.issues && result.issues.length > 0) {
        result.issues.forEach(issue => {
          testResult.recommendations.push(`${page}: ${issue}`);
        });
      }
    });
  }

  async validateSecurity(testResult, requiredHeaders) {
    try {
      const response = await fetch(VALIDATION_CONFIG.productionUrl, {
        method: 'HEAD'
      });

      const headers = Object.fromEntries(response.headers.entries());
      const missingHeaders = [];
      const presentHeaders = [];

      requiredHeaders.forEach(headerName => {
        const headerKey = headerName.toLowerCase();
        if (headers[headerKey]) {
          presentHeaders.push({
            name: headerName,
            value: headers[headerKey]
          });
        } else {
          missingHeaders.push(headerName);
        }
      });

      testResult.details = {
        presentHeaders,
        missingHeaders,
        allHeaders: headers
      };

      if (missingHeaders.length === 0) {
        testResult.status = 'passed';
      } else {
        testResult.status = 'warning';
        testResult.recommendations.push(`缺少安全头: ${missingHeaders.join(', ')}`);
      }

    } catch (error) {
      testResult.status = 'failed';
      testResult.errors.push(`安全头检查失败: ${error.message}`);
    }
  }

  async validateCaching(testResult, resourceTypes) {
    const results = {};
    let allPassed = true;

    try {
      const page = await this.browser.newPage();
      
      // 监听网络请求
      const requests = [];
      page.on('response', response => {
        requests.push({
          url: response.url(),
          status: response.status(),
          headers: Object.fromEntries(response.headers()),
          resourceType: response.request().resourceType()
        });
      });

      await page.goto(VALIDATION_CONFIG.productionUrl, {
        waitUntil: 'networkidle2'
      });

      // 分析缓存策略
      resourceTypes.forEach(type => {
        const typeRequests = requests.filter(req => req.resourceType === type);
        const cachingIssues = [];

        typeRequests.forEach(req => {
          const cacheControl = req.headers['cache-control'];
          const expires = req.headers['expires'];
          const etag = req.headers['etag'];

          if (!cacheControl && !expires && !etag) {
            cachingIssues.push(`${req.url} 缺少缓存头`);
          }
        });

        results[type] = {
          requestCount: typeRequests.length,
          cachingIssues,
          hasCachingIssues: cachingIssues.length > 0
        };

        if (cachingIssues.length > 0) {
          allPassed = false;
        }
      });

      testResult.details = results;
      testResult.status = allPassed ? 'passed' : 'warning';

      await page.close();

    } catch (error) {
      testResult.status = 'failed';
      testResult.errors.push(`缓存验证失败: ${error.message}`);
    }
  }

  generateRecommendations() {
    const recommendations = [];

    // 基于测试结果生成建议
    validationResults.tests.forEach(test => {
      if (test.recommendations && test.recommendations.length > 0) {
        recommendations.push({
          category: test.type,
          priority: test.critical ? 'high' : 'medium',
          items: test.recommendations
        });
      }
    });

    // 性能优化建议
    if (validationResults.performance) {
      const performanceIssues = [];
      Object.values(validationResults.performance).forEach(pageResult => {
        if (pageResult.issues) {
          performanceIssues.push(...pageResult.issues);
        }
      });

      if (performanceIssues.length > 0) {
        recommendations.push({
          category: 'performance_optimization',
          priority: 'high',
          items: [
            '考虑启用CDN加速静态资源',
            '优化图片格式和大小',
            '启用Gzip压缩',
            '实施代码分割和懒加载',
            '优化关键渲染路径'
          ]
        });
      }
    }

    // 安全性建议
    const securityTest = validationResults.tests.find(t => t.type === 'security');
    if (securityTest && securityTest.details.missingHeaders.length > 0) {
      recommendations.push({
        category: 'security',
        priority: 'high',
        items: [
          '添加缺失的安全响应头',
          '实施内容安全策略(CSP)',
          '启用HSTS',
          '定期更新SSL证书'
        ]
      });
    }

    validationResults.recommendations = recommendations;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      logger.info('验证器清理完成');
    }
  }

  async generateReport() {
    const reportDir = path.join(process.cwd(), 'reports');
    await fs.mkdir(reportDir, { recursive: true });

    // 生成JSON报告
    const jsonReportPath = path.join(reportDir, 'deployment-validation-report.json');
    await fs.writeFile(jsonReportPath, JSON.stringify(validationResults, null, 2));

    // 生成HTML报告
    const htmlReport = this.generateHTMLReport();
    const htmlReportPath = path.join(reportDir, 'deployment-validation-report.html');
    await fs.writeFile(htmlReportPath, htmlReport);

    logger.success(`验证报告已生成: ${jsonReportPath}`);
    logger.success(`HTML报告已生成: ${htmlReportPath}`);

    return validationResults;
  }

  generateHTMLReport() {
    const passRate = ((validationResults.summary.passed / validationResults.summary.total) * 100).toFixed(1);
    
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>部署验证报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .metric { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .metric-value { font-size: 2.5em; font-weight: bold; margin-bottom: 10px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .warning { color: #ffc107; }
        .test-results { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .test-item { margin: 15px 0; padding: 15px; border-radius: 5px; border-left: 4px solid #ddd; }
        .test-item.passed { border-color: #28a745; background: #f8fff9; }
        .test-item.failed { border-color: #dc3545; background: #fff8f8; }
        .test-item.warning { border-color: #ffc107; background: #fffdf5; }
        .test-item.critical { border-width: 6px; }
        .recommendations { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .recommendation-category { margin: 15px 0; }
        .priority-high { border-left: 4px solid #dc3545; padding-left: 15px; }
        .priority-medium { border-left: 4px solid #ffc107; padding-left: 15px; }
        .details { margin-top: 10px; font-size: 0.9em; color: #666; }
        .errors { color: #dc3545; margin-top: 10px; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold; }
        .badge.critical { background: #dc3545; color: white; }
        .badge.normal { background: #6c757d; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>部署验证报告</h1>
            <p><strong>验证时间:</strong> ${validationResults.timestamp}</p>
            <p><strong>生产环境:</strong> ${VALIDATION_CONFIG.productionUrl}</p>
            <p><strong>Node版本:</strong> ${validationResults.environment.nodeVersion}</p>
        </div>

        <div class="summary">
            <div class="metric">
                <div class="metric-value">${validationResults.summary.total}</div>
                <div>总测试数</div>
            </div>
            <div class="metric">
                <div class="metric-value passed">${passRate}%</div>
                <div>通过率</div>
            </div>
            <div class="metric">
                <div class="metric-value passed">${validationResults.summary.passed}</div>
                <div>通过</div>
            </div>
            <div class="metric">
                <div class="metric-value failed">${validationResults.summary.failed}</div>
                <div>失败</div>
            </div>
            <div class="metric">
                <div class="metric-value warning">${validationResults.summary.warnings}</div>
                <div>警告</div>
            </div>
            <div class="metric">
                <div class="metric-value failed">${validationResults.summary.critical_failures}</div>
                <div>关键失败</div>
            </div>
        </div>

        <div class="test-results">
            <h2>验证结果详情</h2>
            ${validationResults.tests.map(test => `
                <div class="test-item ${test.status} ${test.critical ? 'critical' : ''}">
                    <h3>
                        ${test.name} 
                        <span class="badge ${test.critical ? 'critical' : 'normal'}">${test.critical ? '关键' : '普通'}</span>
                        - <span class="${test.status}">${test.status.toUpperCase()}</span>
                    </h3>
                    <div class="details">
                        <p><strong>类型:</strong> ${test.type}</p>
                        <p><strong>耗时:</strong> ${test.duration}ms</p>
                        ${test.errors.length > 0 ? `
                            <div class="errors">
                                <strong>错误:</strong>
                                <ul>${test.errors.map(error => `<li>${error}</li>`).join('')}</ul>
                            </div>
                        ` : ''}
                        ${test.recommendations.length > 0 ? `
                            <div>
                                <strong>建议:</strong>
                                <ul>${test.recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>

        ${validationResults.recommendations.length > 0 ? `
        <div class="recommendations">
            <h2>优化建议</h2>
            ${validationResults.recommendations.map(category => `
                <div class="recommendation-category priority-${category.priority}">
                    <h3>${category.category.toUpperCase()} (${category.priority.toUpperCase()})</h3>
                    <ul>
                        ${category.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
        ` : ''}
    </div>
</body>
</html>`;
  }
}

// 主执行函数
async function main() {
  const validator = new DeploymentValidator();
  
  try {
    await validator.initialize();
    await validator.runAllValidations();
    
    const report = await validator.generateReport();
    
    // 输出验证摘要
    logger.info('\n=== 部署验证摘要 ===');
    logger.info(`总验证项: ${report.summary.total}`);
    logger.success(`通过: ${report.summary.passed}`);
    logger.error(`失败: ${report.summary.failed}`);
    logger.warning(`警告: ${report.summary.warnings}`);
    logger.error(`关键失败: ${report.summary.critical_failures}`);
    
    const passRate = ((report.summary.passed / report.summary.total) * 100).toFixed(1);
    logger.info(`通过率: ${passRate}%`);
    
    // 根据关键失败数量设置退出码
    const exitCode = report.summary.critical_failures > 0 ? 1 : 0;
    
    if (exitCode === 0) {
      logger.success('部署验证通过，网站可以正常运行');
    } else {
      logger.error('部署验证发现关键问题，需要立即修复');
    }
    
    process.exit(exitCode);
    
  } catch (error) {
    logger.error(`部署验证失败: ${error.message}`);
    process.exit(1);
  } finally {
    await validator.cleanup();
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

module.exports = { DeploymentValidator, VALIDATION_CONFIG, VALIDATION_TESTS };