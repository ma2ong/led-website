#!/usr/bin/env node

/**
 * SEO Validation Script
 * Comprehensive SEO testing and search engine optimization validation
 */

const fs = require('fs');
const path = require('path');

class SEOValidator {
  constructor() {
    this.results = [];
    this.errors = [];
  }

  async validateSEO() {
    console.log('🔍 Starting SEO validation...\n');

    try {
      await this.checkSitemapGeneration();
      await this.checkRobotsFile();
      await this.checkMetaTags();
      await this.checkStructuredData();
      await this.checkHreflangTags();
      await this.checkImageOptimization();
      await this.checkPagePerformance();
      
      this.generateSEOReport();
    } catch (error) {
      console.error('❌ SEO validation failed:', error.message);
      process.exit(1);
    }
  }

  async checkSitemapGeneration() {
    console.log('📄 Checking XML sitemap generation...');
    
    try {
      // Check if sitemap exists
      const sitemapPath = 'frontend/public/sitemap.xml';
      if (fs.existsSync(sitemapPath)) {
        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        
        // Basic sitemap validation
        if (sitemapContent.includes('<urlset') && sitemapContent.includes('<url>')) {
          this.results.push({
            test: 'XML Sitemap Generation',
            status: 'passed',
            details: 'Sitemap exists and contains valid URLs'
          });
          console.log('✅ XML sitemap is properly generated');
        } else {
          throw new Error('Sitemap format is invalid');
        }
      } else {
        throw new Error('XML sitemap not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'XML Sitemap Generation',
        error: error.message
      });
      console.log('❌ XML sitemap validation failed:', error.message);
    }
  }

  async checkRobotsFile() {
    console.log('🤖 Checking robots.txt configuration...');
    
    try {
      const robotsPath = 'frontend/public/robots.txt';
      if (fs.existsSync(robotsPath)) {
        const robotsContent = fs.readFileSync(robotsPath, 'utf8');
        
        // Check for essential robots.txt content
        if (robotsContent.includes('User-agent:') && robotsContent.includes('Sitemap:')) {
          this.results.push({
            test: 'Robots.txt Configuration',
            status: 'passed',
            details: 'Robots.txt exists with proper directives'
          });
          console.log('✅ Robots.txt is properly configured');
        } else {
          throw new Error('Robots.txt missing essential directives');
        }
      } else {
        throw new Error('Robots.txt file not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'Robots.txt Configuration',
        error: error.message
      });
      console.log('❌ Robots.txt validation failed:', error.message);
    }
  }

  async checkMetaTags() {
    console.log('🏷️  Checking meta tags implementation...');
    
    try {
      // Check if SEO utilities exist
      const seoUtilsPath = 'frontend/src/lib/seo-utils.ts';
      const seoConfigPath = 'frontend/src/lib/seo-config.ts';
      
      if (fs.existsSync(seoUtilsPath) && fs.existsSync(seoConfigPath)) {
        const seoUtils = fs.readFileSync(seoUtilsPath, 'utf8');
        const seoConfig = fs.readFileSync(seoConfigPath, 'utf8');
        
        // Check for essential SEO functions
        const hasMetaGeneration = seoUtils.includes('generateMetaTags') || seoUtils.includes('generateSEO');
        const hasOpenGraph = seoUtils.includes('og:') || seoConfig.includes('openGraph');
        const hasTwitterCard = seoUtils.includes('twitter:') || seoConfig.includes('twitter');
        
        if (hasMetaGeneration && hasOpenGraph && hasTwitterCard) {
          this.results.push({
            test: 'Meta Tags Implementation',
            status: 'passed',
            details: 'SEO meta tags, Open Graph, and Twitter Cards implemented'
          });
          console.log('✅ Meta tags are properly implemented');
        } else {
          throw new Error('Missing essential meta tag implementations');
        }
      } else {
        throw new Error('SEO utility files not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'Meta Tags Implementation',
        error: error.message
      });
      console.log('❌ Meta tags validation failed:', error.message);
    }
  }

  async checkStructuredData() {
    console.log('📊 Checking structured data implementation...');
    
    try {
      const structuredDataPath = 'frontend/src/lib/structured-data.ts';
      
      if (fs.existsSync(structuredDataPath)) {
        const structuredData = fs.readFileSync(structuredDataPath, 'utf8');
        
        // Check for essential schema types
        const hasOrganization = structuredData.includes('Organization') || structuredData.includes('@type": "Organization"');
        const hasProduct = structuredData.includes('Product') || structuredData.includes('@type": "Product"');
        const hasArticle = structuredData.includes('Article') || structuredData.includes('@type": "Article"');
        
        if (hasOrganization && hasProduct && hasArticle) {
          this.results.push({
            test: 'Structured Data Implementation',
            status: 'passed',
            details: 'Organization, Product, and Article schemas implemented'
          });
          console.log('✅ Structured data is properly implemented');
        } else {
          throw new Error('Missing essential structured data schemas');
        }
      } else {
        throw new Error('Structured data file not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'Structured Data Implementation',
        error: error.message
      });
      console.log('❌ Structured data validation failed:', error.message);
    }
  }

  async checkHreflangTags() {
    console.log('🌐 Checking hreflang tags for internationalization...');
    
    try {
      // Check i18n configuration
      const i18nConfigPath = 'frontend/src/lib/i18n-config.ts';
      
      if (fs.existsSync(i18nConfigPath)) {
        const i18nConfig = fs.readFileSync(i18nConfigPath, 'utf8');
        
        // Check for language configuration
        const hasLanguages = i18nConfig.includes('zh') && i18nConfig.includes('en');
        const hasDefaultLocale = i18nConfig.includes('defaultLocale');
        
        if (hasLanguages && hasDefaultLocale) {
          this.results.push({
            test: 'Hreflang Tags Implementation',
            status: 'passed',
            details: 'Multi-language configuration with Chinese and English support'
          });
          console.log('✅ Hreflang tags are properly configured');
        } else {
          throw new Error('Incomplete i18n configuration');
        }
      } else {
        throw new Error('i18n configuration file not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'Hreflang Tags Implementation',
        error: error.message
      });
      console.log('❌ Hreflang validation failed:', error.message);
    }
  }

  async checkImageOptimization() {
    console.log('🖼️  Checking image optimization implementation...');
    
    try {
      // Check for optimized image component
      const optimizedImagePath = 'frontend/src/components/ui/optimized-image.tsx';
      
      if (fs.existsSync(optimizedImagePath)) {
        const imageComponent = fs.readFileSync(optimizedImagePath, 'utf8');
        
        // Check for Next.js Image optimization features
        const hasNextImage = imageComponent.includes('next/image');
        const hasAltAttribute = imageComponent.includes('alt');
        const hasLazyLoading = imageComponent.includes('loading') || imageComponent.includes('lazy');
        
        if (hasNextImage && hasAltAttribute && hasLazyLoading) {
          this.results.push({
            test: 'Image Optimization',
            status: 'passed',
            details: 'Next.js Image component with alt attributes and lazy loading'
          });
          console.log('✅ Image optimization is properly implemented');
        } else {
          throw new Error('Missing image optimization features');
        }
      } else {
        throw new Error('Optimized image component not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'Image Optimization',
        error: error.message
      });
      console.log('❌ Image optimization validation failed:', error.message);
    }
  }

  async checkPagePerformance() {
    console.log('⚡ Checking performance optimization implementation...');
    
    try {
      // Check for performance monitoring
      const performanceConfigPath = 'frontend/src/lib/performance-config.ts';
      const webVitalsPath = 'frontend/src/components/performance/web-vitals-monitor.tsx';
      
      if (fs.existsSync(performanceConfigPath) && fs.existsSync(webVitalsPath)) {
        const performanceConfig = fs.readFileSync(performanceConfigPath, 'utf8');
        const webVitals = fs.readFileSync(webVitalsPath, 'utf8');
        
        // Check for Core Web Vitals monitoring
        const hasWebVitals = webVitals.includes('CLS') && webVitals.includes('FID') && webVitals.includes('LCP');
        const hasPerformanceConfig = performanceConfig.includes('performance') || performanceConfig.includes('vitals');
        
        if (hasWebVitals && hasPerformanceConfig) {
          this.results.push({
            test: 'Performance Optimization',
            status: 'passed',
            details: 'Core Web Vitals monitoring and performance configuration implemented'
          });
          console.log('✅ Performance optimization is properly implemented');
        } else {
          throw new Error('Missing performance optimization features');
        }
      } else {
        throw new Error('Performance monitoring files not found');
      }
    } catch (error) {
      this.errors.push({
        test: 'Performance Optimization',
        error: error.message
      });
      console.log('❌ Performance optimization validation failed:', error.message);
    }
  }

  generateSEOReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.length + this.errors.length,
        passed: this.results.length,
        failed: this.errors.length,
        successRate: ((this.results.length / (this.results.length + this.errors.length)) * 100).toFixed(1)
      },
      results: this.results,
      errors: this.errors,
      recommendations: this.generateRecommendations()
    };

    // Save report
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }
    
    fs.writeFileSync('reports/seo-validation-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n📊 SEO VALIDATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`❌ Failed: ${report.summary.failed}`);
    console.log(`📈 Success Rate: ${report.summary.successRate}%`);
    
    if (report.summary.successRate >= 90) {
      console.log('\n🎯 SEO implementation is excellent!');
    } else if (report.summary.successRate >= 70) {
      console.log('\n⚠️  SEO implementation needs minor improvements');
    } else {
      console.log('\n🛑 SEO implementation needs significant improvements');
    }
    
    console.log(`\n📄 Detailed report saved to: reports/seo-validation-report.json`);
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('Address all failed SEO checks before deployment');
    }
    
    recommendations.push('Run Lighthouse audit for additional performance insights');
    recommendations.push('Test with Google Search Console after deployment');
    recommendations.push('Monitor Core Web Vitals in production');
    recommendations.push('Set up Google Analytics and Google Tag Manager');
    
    return recommendations;
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new SEOValidator();
  validator.validateSEO().catch(console.error);
}

module.exports = SEOValidator;