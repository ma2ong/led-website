#!/usr/bin/env node

/**
 * 内容迁移脚本
 * 用于将现有HTML网站内容迁移到Strapi CMS
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// 配置
const config = {
  strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
  strapiToken: process.env.STRAPI_TOKEN,
  oldSiteUrl: process.env.OLD_SITE_URL || 'https://old-website.com',
  contentDir: './migration-content',
  mediaDir: './migration-media'
};

// 创建目录
function ensureDirectories() {
  [config.contentDir, config.mediaDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Strapi API客户端
class StrapiClient {
  constructor(url, token) {
    this.baseURL = url;
    this.token = token;
    this.axios = axios.create({
      baseURL: `${url}/api`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createEntry(contentType, data) {
    try {
      const response = await this.axios.post(`/${contentType}`, { data });
      return response.data;
    } catch (error) {
      console.error(`创建${contentType}条目失败:`, error.response?.data || error.message);
      throw error;
    }
  }

  async uploadMedia(filePath, fileName) {
    try {
      const formData = new FormData();
      const fileStream = fs.createReadStream(filePath);
      formData.append('files', fileStream, fileName);

      const response = await this.axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data[0];
    } catch (error) {
      console.error(`上传媒体文件失败:`, error.response?.data || error.message);
      throw error;
    }
  }
}

// 内容提取器
class ContentExtractor {
  constructor(oldSiteUrl) {
    this.baseUrl = oldSiteUrl;
  }

  async extractPage(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      return {
        title: $('title').text().trim(),
        description: $('meta[name="description"]').attr('content') || '',
        content: this.extractMainContent($),
        images: this.extractImages($),
        links: this.extractLinks($)
      };
    } catch (error) {
      console.error(`提取页面内容失败 ${url}:`, error.message);
      return null;
    }
  }

  extractMainContent($) {
    // 移除不需要的元素
    $('script, style, nav, header, footer, .sidebar').remove();
    
    // 提取主要内容区域
    const mainContent = $('.main-content, .content, main, article').first();
    return mainContent.length ? mainContent.html() : $('body').html();
  }

  extractImages($) {
    const images = [];
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      const alt = $(elem).attr('alt') || '';
      if (src) {
        images.push({
          src: this.resolveUrl(src),
          alt,
          title: $(elem).attr('title') || ''
        });
      }
    });
    return images;
  }

  extractLinks($) {
    const links = [];
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().trim();
      if (href && text) {
        links.push({
          url: this.resolveUrl(href),
          text
        });
      }
    });
    return links;
  }

  resolveUrl(url) {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('/')) return `${this.baseUrl}${url}`;
    return `${this.baseUrl}/${url}`;
  }
}

// 产品数据迁移
async function migrateProducts(strapi, extractor) {
  console.log('开始迁移产品数据...');
  
  // 产品页面URL列表 (需要根据实际情况调整)
  const productUrls = [
    '/products/led-display-screen.html',
    '/products/outdoor-led-display.html',
    '/products/indoor-led-display.html',
    '/products/rental-led-display.html'
  ];

  for (const url of productUrls) {
    try {
      const fullUrl = `${config.oldSiteUrl}${url}`;
      const pageData = await extractor.extractPage(fullUrl);
      
      if (!pageData) continue;

      // 解析产品信息
      const productData = {
        title: {
          zh: pageData.title,
          en: pageData.title // 需要手动翻译
        },
        description: {
          zh: pageData.description,
          en: pageData.description // 需要手动翻译
        },
        content: {
          zh: pageData.content,
          en: pageData.content // 需要手动翻译
        },
        slug: url.split('/').pop().replace('.html', ''),
        category: 'LED显示屏', // 根据URL推断
        specifications: {}, // 需要手动提取
        features: [], // 需要手动提取
        applications: [], // 需要手动提取
        publishedAt: new Date().toISOString(),
        locale: 'zh'
      };

      // 创建产品条目
      const product = await strapi.createEntry('products', productData);
      console.log(`产品迁移成功: ${productData.title.zh}`);

      // 下载和上传产品图片
      for (const image of pageData.images) {
        try {
          await downloadAndUploadImage(strapi, image, product.id);
        } catch (error) {
          console.error(`图片处理失败: ${image.src}`, error.message);
        }
      }

    } catch (error) {
      console.error(`产品迁移失败 ${url}:`, error.message);
    }
  }
}

// 案例研究迁移
async function migrateCaseStudies(strapi, extractor) {
  console.log('开始迁移案例研究...');
  
  const caseUrls = [
    '/case-studies/shopping-mall-led-display.html',
    '/case-studies/stadium-led-screen.html',
    '/case-studies/corporate-building-display.html'
  ];

  for (const url of caseUrls) {
    try {
      const fullUrl = `${config.oldSiteUrl}${url}`;
      const pageData = await extractor.extractPage(fullUrl);
      
      if (!pageData) continue;

      const caseData = {
        title: {
          zh: pageData.title,
          en: pageData.title
        },
        description: {
          zh: pageData.description,
          en: pageData.description
        },
        content: {
          zh: pageData.content,
          en: pageData.content
        },
        slug: url.split('/').pop().replace('.html', ''),
        industry: '零售', // 需要根据内容推断
        location: '中国', // 需要根据内容推断
        challenge: {
          zh: '', // 需要手动提取
          en: ''
        },
        solution: {
          zh: '', // 需要手动提取
          en: ''
        },
        results: {
          zh: '', // 需要手动提取
          en: ''
        },
        publishedAt: new Date().toISOString(),
        locale: 'zh'
      };

      const caseStudy = await strapi.createEntry('case-studies', caseData);
      console.log(`案例迁移成功: ${caseData.title.zh}`);

    } catch (error) {
      console.error(`案例迁移失败 ${url}:`, error.message);
    }
  }
}

// 新闻文章迁移
async function migrateNews(strapi, extractor) {
  console.log('开始迁移新闻文章...');
  
  const newsUrls = [
    '/news/led-technology-trends-2024.html',
    '/news/company-expansion-announcement.html',
    '/news/new-product-launch.html'
  ];

  for (const url of newsUrls) {
    try {
      const fullUrl = `${config.oldSiteUrl}${url}`;
      const pageData = await extractor.extractPage(fullUrl);
      
      if (!pageData) continue;

      const newsData = {
        title: {
          zh: pageData.title,
          en: pageData.title
        },
        description: {
          zh: pageData.description,
          en: pageData.description
        },
        content: {
          zh: pageData.content,
          en: pageData.content
        },
        slug: url.split('/').pop().replace('.html', ''),
        category: '公司新闻', // 需要根据内容分类
        tags: [], // 需要手动添加
        publishedAt: new Date().toISOString(),
        locale: 'zh'
      };

      const news = await strapi.createEntry('news', newsData);
      console.log(`新闻迁移成功: ${newsData.title.zh}`);

    } catch (error) {
      console.error(`新闻迁移失败 ${url}:`, error.message);
    }
  }
}

// 下载并上传图片
async function downloadAndUploadImage(strapi, imageInfo, relatedId) {
  try {
    const response = await axios.get(imageInfo.src, { responseType: 'stream' });
    const fileName = path.basename(imageInfo.src) || 'image.jpg';
    const filePath = path.join(config.mediaDir, fileName);
    
    // 保存图片到本地
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // 上传到Strapi
    const uploadedFile = await strapi.uploadMedia(filePath, fileName);
    console.log(`图片上传成功: ${fileName}`);
    
    // 清理本地文件
    fs.unlinkSync(filePath);
    
    return uploadedFile;
  } catch (error) {
    console.error(`图片处理失败: ${imageInfo.src}`, error.message);
    throw error;
  }
}

// 生成URL重定向映射
function generateRedirectMap() {
  console.log('生成URL重定向映射...');
  
  const redirects = [
    { from: '/products.html', to: '/zh/products' },
    { from: '/about.html', to: '/zh/about' },
    { from: '/contact.html', to: '/zh/contact' },
    { from: '/news.html', to: '/zh/news' },
    { from: '/case-studies.html', to: '/zh/case-studies' }
  ];

  const redirectConfig = redirects.map(redirect => ({
    source: redirect.from,
    destination: redirect.to,
    permanent: true
  }));

  fs.writeFileSync(
    path.join(config.contentDir, 'redirects.json'),
    JSON.stringify(redirectConfig, null, 2)
  );

  console.log('重定向映射生成完成');
}

// 主函数
async function main() {
  console.log('开始内容迁移...');
  
  if (!config.strapiToken) {
    console.error('请设置STRAPI_TOKEN环境变量');
    process.exit(1);
  }

  ensureDirectories();
  
  const strapi = new StrapiClient(config.strapiUrl, config.strapiToken);
  const extractor = new ContentExtractor(config.oldSiteUrl);

  try {
    // 迁移各类内容
    await migrateProducts(strapi, extractor);
    await migrateCaseStudies(strapi, extractor);
    await migrateNews(strapi, extractor);
    
    // 生成重定向映射
    generateRedirectMap();
    
    console.log('内容迁移完成！');
    console.log('请手动检查和完善以下内容：');
    console.log('1. 英文翻译');
    console.log('2. 产品规格和特性');
    console.log('3. 案例研究的挑战-解决方案-结果');
    console.log('4. 新闻分类和标签');
    console.log('5. 图片alt文本和标题');
    
  } catch (error) {
    console.error('迁移过程中发生错误:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };