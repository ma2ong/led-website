/**
 * 首页E2E测试
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh');
  });

  test('should load homepage successfully', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/LED显示解决方案/);
    
    // 检查主要元素是否存在
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    // 检查英雄区块
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();
    
    // 检查主标题
    const heroTitle = heroSection.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('LED显示');
    
    // 检查CTA按钮
    const ctaButton = heroSection.locator('a[href*="contact"]');
    await expect(ctaButton).toBeVisible();
  });

  test('should navigate through main menu', async ({ page }) => {
    // 测试产品页面导航
    await page.click('nav a[href="/zh/products"]');
    await expect(page).toHaveURL('/zh/products');
    await expect(page.locator('h1')).toContainText('产品');
    
    // 返回首页
    await page.click('nav a[href="/zh"]');
    await expect(page).toHaveURL('/zh');
    
    // 测试关于我们页面导航
    await page.click('nav a[href="/zh/about"]');
    await expect(page).toHaveURL('/zh/about');
    await expect(page.locator('h1')).toContainText('关于我们');
  });

  test('should display featured products section', async ({ page }) => {
    const featuredSection = page.locator('[data-testid="featured-products"]');
    await expect(featuredSection).toBeVisible();
    
    // 检查产品卡片
    const productCards = featuredSection.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount(3); // 假设显示3个推荐产品
    
    // 检查第一个产品卡片的内容
    const firstCard = productCards.first();
    await expect(firstCard.locator('img')).toBeVisible();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('p')).toBeVisible();
  });

  test('should display company stats section', async ({ page }) => {
    const statsSection = page.locator('[data-testid="company-stats"]');
    await expect(statsSection).toBeVisible();
    
    // 检查统计数据
    const statItems = statsSection.locator('[data-testid="stat-item"]');
    await expect(statItems).toHaveCount(4); // 假设有4个统计项
    
    // 检查每个统计项都有数值和标签
    for (let i = 0; i < 4; i++) {
      const statItem = statItems.nth(i);
      await expect(statItem.locator('.stat-value')).toBeVisible();
      await expect(statItem.locator('.stat-label')).toBeVisible();
    }
  });

  test('should have working language switcher', async ({ page }) => {
    // 点击语言切换器
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await expect(languageSwitcher).toBeVisible();
    
    // 切换到英文
    await languageSwitcher.click();
    await page.click('button[data-lang="en"]');
    
    // 检查URL变化
    await expect(page).toHaveURL('/en');
    
    // 检查内容变化
    await expect(page.locator('nav a[href="/en/products"]')).toContainText('Products');
    await expect(page.locator('nav a[href="/en/about"]')).toContainText('About');
  });

  test('should have responsive design', async ({ page }) => {
    // 测试桌面视图
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-menu-button"]')).not.toBeVisible();
    
    // 测试移动端视图
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // 测试移动端菜单
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });

  test('should load images properly', async ({ page }) => {
    // 等待图片加载
    await page.waitForLoadState('networkidle');
    
    // 检查所有图片都已加载
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // 检查图片是否有alt属性
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // 检查基本SEO标签
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    
    // 检查Open Graph标签
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    
    // 检查结构化数据
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toHaveCount(1);
  });

  test('should have accessible navigation', async ({ page }) => {
    // 检查导航的可访问性
    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();
    
    // 检查所有链接都有可访问的文本
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should handle contact form interaction', async ({ page }) => {
    // 滚动到联系表单
    const contactSection = page.locator('[data-testid="contact-section"]');
    await contactSection.scrollIntoViewIfNeeded();
    
    // 填写表单
    await page.fill('input[name="name"]', '测试用户');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '13800138000');
    await page.fill('textarea[name="message"]', '这是一条测试消息');
    
    // 提交表单
    await page.click('button[type="submit"]');
    
    // 检查成功消息或错误处理
    await expect(page.locator('[data-testid="form-message"]')).toBeVisible();
  });
});

test.describe('Homepage Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/zh');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // 5秒内加载完成
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/zh');
    
    // 测量LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    expect(lcp).toBeLessThan(2500); // LCP应该小于2.5秒
  });
});