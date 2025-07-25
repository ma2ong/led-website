/**
 * Playwright E2E测试配置
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * 从环境变量读取配置
 */
const config = defineConfig({
  testDir: './e2e',
  
  /* 并行运行测试 */
  fullyParallel: true,
  
  /* 在CI中失败时不重试，本地开发时重试一次 */
  retries: process.env.CI ? 2 : 0,
  
  /* 在CI中选择退出并行执行 */
  workers: process.env.CI ? 1 : undefined,
  
  /* 报告器配置 */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  
  /* 全局设置 */
  use: {
    /* 基础URL */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    
    /* 在失败时收集跟踪信息 */
    trace: 'on-first-retry',
    
    /* 截图设置 */
    screenshot: 'only-on-failure',
    
    /* 视频录制 */
    video: 'retain-on-failure',
    
    /* 全局等待超时 */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* 配置不同的项目用于不同的浏览器 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 移动端测试 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* 品牌浏览器测试 */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* 在开发服务器启动前运行 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  /* 输出目录 */
  outputDir: 'test-results/',
  
  /* 全局设置和拆卸 */
  globalSetup: require.resolve('./e2e/global-setup.ts'),
  globalTeardown: require.resolve('./e2e/global-teardown.ts'),
  
  /* 测试超时 */
  timeout: 30000,
  
  /* 期望超时 */
  expect: {
    timeout: 5000,
  },
  
  /* 忽略HTTPS错误 */
  ignoreHTTPSErrors: true,
  
  /* 测试文件匹配模式 */
  testMatch: [
    '**/*.e2e.{js,ts}',
    '**/e2e/**/*.{test,spec}.{js,ts}',
  ],
  
  /* 忽略的文件 */
  testIgnore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
  ],
});

export default config;