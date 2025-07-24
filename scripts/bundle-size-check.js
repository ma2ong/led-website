#!/usr/bin/env node

/**
 * Bundle Size Check Script
 * Monitors and validates JavaScript bundle sizes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BundleSizeChecker {
  constructor() {
    this.buildDir = 'frontend/.next';
    this.thresholds = {
      // Size limits in KB
      firstLoadJS: 300,
      totalBundle: 1000,
      individualChunk: 250,
      cssFiles: 50
    };
    this.results = [];
    this.warnings = [];
    this.errors = [];
  }

  async checkBundleSize() {
    console.log('📦 Starting bundle size analysis...\n');

    try {
      await this.analyzeBuildOutput();
      await this.checkIndividualChunks();
      await this.checkCSSFiles();
      await this.generateSizeReport();
      
      this.displayResults();
    } catch (error) {
      console.error('❌ Bundle size check failed:', error.message);
      process.exit(1);
    }
  }

  async analyzeBuildOutput() {
    console.log('🔍 Analyzing Next.js build output...');

    try {
      // Check if build directory exists
      if (!fs.existsSync(this.buildDir)) {
        throw new Error('Build directory not found. Please run "npm run build" first.');
      }

      // Get build stats
      const buildStatsPath = path.join(this.buildDir, 'build-manifest.json');
      
      if (fs.existsSync(buildStatsPath)) {
        const buildStats = JSON.parse(fs.readFileSync(buildStatsPath, 'utf8'));
        
        // Analyze pages
        const pages = buildStats.pages || {};
        let totalFirstLoadJS = 0;
        
        Object.entries(pages).forEach(([pagePath, assets]) => {
          const jsAssets = assets.filter(asset => asset.endsWith('.js'));
          const pageSize = this.calculateAssetsSize(jsAssets);
          
          if (pagePath === '/') {
            totalFirstLoadJS = pageSize;
          }
          
          this.results.push({
            type: 'page',
            name: pagePath,
            size: pageSize,
            assets: jsAssets.length
          });
        });

        // Check first load JS threshold
        if (totalFirstLoadJS > this.thresholds.firstLoadJS * 1024) {
          this.errors.push({
            type: 'first-load-js',
            message: `First Load JS (${Math.round(totalFirstLoadJS / 1024)}KB) exceeds threshold (${this.thresholds.firstLoadJS}KB)`,
            actual: Math.round(totalFirstLoadJS / 1024),
            threshold: this.thresholds.firstLoadJS
          });
        } else {
          console.log(`✅ First Load JS: ${Math.round(totalFirstLoadJS / 1024)}KB (within ${this.thresholds.firstLoadJS}KB limit)`);
        }
      }

    } catch (error) {
      this.errors.push({
        type: 'build-analysis',
        message: `Failed to analyze build output: ${error.message}`
      });
    }
  }

  async checkIndividualChunks() {
    console.log('📊 Checking individual chunk sizes...');

    try {
      const staticDir = path.join(this.buildDir, 'static');
      
      if (!fs.existsSync(staticDir)) {
        throw new Error('Static directory not found');
      }

      // Check JavaScript chunks
      const jsDir = path.join(staticDir, 'chunks');
      if (fs.existsSync(jsDir)) {
        const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
        
        jsFiles.forEach(file => {
          const filePath = path.join(jsDir, file);
          const stats = fs.statSync(filePath);
          const sizeKB = Math.round(stats.size / 1024);
          
          this.results.push({
            type: 'js-chunk',
            name: file,
            size: stats.size,
            sizeKB
          });

          if (sizeKB > this.thresholds.individualChunk) {
            this.warnings.push({
              type: 'large-chunk',
              message: `Large chunk detected: ${file} (${sizeKB}KB)`,
              file,
              size: sizeKB,
              threshold: this.thresholds.individualChunk
            });
          }
        });

        console.log(`✅ Analyzed ${jsFiles.length} JavaScript chunks`);
      }

      // Check main bundles
      const mainDir = path.join(staticDir, 'js');
      if (fs.existsSync(mainDir)) {
        const mainFiles = fs.readdirSync(mainDir).filter(file => file.endsWith('.js'));
        
        mainFiles.forEach(file => {
          const filePath = path.join(mainDir, file);
          const stats = fs.statSync(filePath);
          const sizeKB = Math.round(stats.size / 1024);
          
          this.results.push({
            type: 'main-bundle',
            name: file,
            size: stats.size,
            sizeKB
          });
        });

        console.log(`✅ Analyzed ${mainFiles.length} main bundle files`);
      }

    } catch (error) {
      this.errors.push({
        type: 'chunk-analysis',
        message: `Failed to analyze chunks: ${error.message}`
      });
    }
  }

  async checkCSSFiles() {
    console.log('🎨 Checking CSS file sizes...');

    try {
      const cssDir = path.join(this.buildDir, 'static', 'css');
      
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
        
        let totalCSSSize = 0;
        
        cssFiles.forEach(file => {
          const filePath = path.join(cssDir, file);
          const stats = fs.statSync(filePath);
          const sizeKB = Math.round(stats.size / 1024);
          
          totalCSSSize += stats.size;
          
          this.results.push({
            type: 'css-file',
            name: file,
            size: stats.size,
            sizeKB
          });
        });

        const totalCSSKB = Math.round(totalCSSSize / 1024);
        
        if (totalCSSKB > this.thresholds.cssFiles) {
          this.warnings.push({
            type: 'large-css',
            message: `Total CSS size (${totalCSSKB}KB) exceeds recommended threshold (${this.thresholds.cssFiles}KB)`,
            actual: totalCSSKB,
            threshold: this.thresholds.cssFiles
          });
        } else {
          console.log(`✅ Total CSS size: ${totalCSSKB}KB (within ${this.thresholds.cssFiles}KB limit)`);
        }
      }

    } catch (error) {
      this.errors.push({
        type: 'css-analysis',
        message: `Failed to analyze CSS files: ${error.message}`
      });
    }
  }

  calculateAssetsSize(assets) {
    let totalSize = 0;
    
    assets.forEach(asset => {
      const assetPath = path.join(this.buildDir, 'static', asset);
      if (fs.existsSync(assetPath)) {
        const stats = fs.statSync(assetPath);
        totalSize += stats.size;
      }
    });
    
    return totalSize;
  }

  async generateSizeReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.length,
        errors: this.errors.length,
        warnings: this.warnings.length,
        thresholds: this.thresholds
      },
      results: this.results,
      errors: this.errors,
      warnings: this.warnings,
      recommendations: this.generateRecommendations()
    };

    // Save report
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }
    
    fs.writeFileSync('reports/bundle-size-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n📄 Bundle size report saved to: reports/bundle-size-report.json');
  }

  displayResults() {
    console.log('\n📊 BUNDLE SIZE ANALYSIS SUMMARY');
    console.log('='.repeat(50));

    // Group results by type
    const grouped = this.results.reduce((acc, result) => {
      if (!acc[result.type]) acc[result.type] = [];
      acc[result.type].push(result);
      return acc;
    }, {});

    // Display by category
    Object.entries(grouped).forEach(([type, items]) => {
      console.log(`\n${type.toUpperCase()}:`);
      items.forEach(item => {
        const sizeDisplay = item.sizeKB ? `${item.sizeKB}KB` : `${Math.round(item.size / 1024)}KB`;
        console.log(`  ${item.name}: ${sizeDisplay}`);
      });
    });

    // Display warnings
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        console.log(`  ${warning.message}`);
      });
    }

    // Display errors
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => {
        console.log(`  ${error.message}`);
      });
    }

    // Overall status
    console.log('\n' + '='.repeat(50));
    if (this.errors.length === 0) {
      if (this.warnings.length === 0) {
        console.log('🎯 Bundle size is optimal!');
      } else {
        console.log('⚠️  Bundle size is acceptable with minor optimizations recommended');
      }
    } else {
      console.log('🛑 Bundle size exceeds recommended limits');
    }
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('Address bundle size errors before deployment');
    }
    
    if (this.warnings.length > 0) {
      recommendations.push('Consider optimizing large chunks and CSS files');
    }
    
    recommendations.push('Use dynamic imports for code splitting');
    recommendations.push('Implement tree shaking for unused code elimination');
    recommendations.push('Consider using webpack-bundle-analyzer for detailed analysis');
    recommendations.push('Optimize images and use modern formats (WebP, AVIF)');
    recommendations.push('Enable gzip/brotli compression on the server');
    
    return recommendations;
  }
}

// Run bundle size check if called directly
if (require.main === module) {
  const checker = new BundleSizeChecker();
  checker.checkBundleSize().catch(console.error);
}

module.exports = BundleSizeChecker;