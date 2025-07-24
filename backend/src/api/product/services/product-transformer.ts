/**
 * Product transformer service
 * Handles product data transformation and formatting
 */

export default {
  /**
   * Transform product data for API response
   * @param {Object} product - Raw product data from database
   * @returns {Object} - Transformed product data
   */
  transformProductForAPI(product: any) {
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category,
      
      // Technical specifications
      technicalSpecs: this.parseTechnicalSpecs(product.technicalSpecs),
      specifications: product.specifications || [],
      features: this.parseJsonField(product.features),
      applications: this.parseJsonField(product.applications),
      advantages: this.parseJsonField(product.advantages),
      
      // LED specific fields
      modelNumber: product.modelNumber,
      pixelPitch: product.pixelPitch,
      resolution: product.resolution,
      brightness: product.brightness,
      refreshRate: product.refreshRate,
      viewingAngle: product.viewingAngle,
      powerConsumption: product.powerConsumption,
      operatingTemperature: product.operatingTemperature,
      ipRating: product.ipRating,
      lifespan: product.lifespan,
      warranty: product.warranty,
      certifications: this.parseJsonField(product.certifications),
      
      // Media
      mainImage: this.transformMediaFile(product.mainImage),
      images: this.transformMediaFiles(product.images),
      documents: this.transformMediaFiles(product.documents),
      
      // Business fields
      price: product.price,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      sortOrder: product.sortOrder,
      viewCount: product.viewCount || 0,
      
      // SEO
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      seoKeywords: product.seoKeywords,
      
      // Relations
      case_studies: this.transformCaseStudies(product.case_studies),
      
      // Timestamps
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      publishedAt: product.publishedAt,
      
      // Computed fields
      categoryInfo: this.getCategoryInfo(product.category),
      formattedPrice: this.formatPrice(product.price),
      specificationsByCategory: this.groupSpecificationsByCategory(product.specifications)
    };
  },

  /**
   * Parse technical specifications JSON field
   * @param {string|Object} technicalSpecs - Technical specs data
   * @returns {Object} - Parsed technical specs
   */
  parseTechnicalSpecs(technicalSpecs: any): Record<string, any> {
    if (!technicalSpecs) return {};
    
    if (typeof technicalSpecs === 'string') {
      try {
        return JSON.parse(technicalSpecs);
      } catch (error) {
        strapi.log.warn('Failed to parse technical specs JSON:', error);
        return {};
      }
    }
    
    return technicalSpecs;
  },

  /**
   * Parse JSON field safely
   * @param {string|Array|Object} field - JSON field data
   * @returns {Array|Object} - Parsed data
   */
  parseJsonField(field: any): any {
    if (!field) return null;
    
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (error) {
        strapi.log.warn('Failed to parse JSON field:', error);
        return null;
      }
    }
    
    return field;
  },

  /**
   * Transform media file for API response
   * @param {Object} mediaFile - Raw media file data
   * @returns {Object} - Transformed media file
   */
  transformMediaFile(mediaFile: any) {
    if (!mediaFile) return null;

    return {
      id: mediaFile.id,
      name: mediaFile.name,
      alternativeText: mediaFile.alternativeText,
      caption: mediaFile.caption,
      width: mediaFile.width,
      height: mediaFile.height,
      formats: mediaFile.formats,
      hash: mediaFile.hash,
      ext: mediaFile.ext,
      mime: mediaFile.mime,
      size: mediaFile.size,
      url: mediaFile.url,
      previewUrl: mediaFile.previewUrl,
      provider: mediaFile.provider,
      createdAt: mediaFile.createdAt,
      updatedAt: mediaFile.updatedAt
    };
  },

  /**
   * Transform array of media files
   * @param {Array} mediaFiles - Array of media files
   * @returns {Array} - Transformed media files
   */
  transformMediaFiles(mediaFiles: any[]): any[] {
    if (!Array.isArray(mediaFiles)) return [];
    
    return mediaFiles.map(file => this.transformMediaFile(file));
  },

  /**
   * Transform case studies for API response
   * @param {Array} caseStudies - Array of case studies
   * @returns {Array} - Transformed case studies
   */
  transformCaseStudies(caseStudies: any[]): any[] {
    if (!Array.isArray(caseStudies)) return [];
    
    return caseStudies.map(caseStudy => ({
      id: caseStudy.id,
      title: caseStudy.title,
      slug: caseStudy.slug,
      client: caseStudy.client,
      industry: caseStudy.industry,
      summary: caseStudy.summary,
      mainImage: this.transformMediaFile(caseStudy.mainImage),
      createdAt: caseStudy.createdAt,
      publishedAt: caseStudy.publishedAt
    }));
  },

  /**
   * Get category information
   * @param {string} categoryKey - Category key
   * @returns {Object} - Category information
   */
  getCategoryInfo(categoryKey: string) {
    const categories = {
      'outdoor': { name: '户外显示屏', icon: '🌞', description: '适用于户外环境的高亮度LED显示屏' },
      'indoor': { name: '室内显示屏', icon: '🏢', description: '适用于室内环境的高清LED显示屏' },
      'rental': { name: '租赁显示屏', icon: '🎪', description: '便于安装拆卸的租赁用LED显示屏' },
      'creative': { name: '创意显示屏', icon: '🎨', description: '异形创意LED显示屏解决方案' },
      'transparent': { name: '透明显示屏', icon: '💎', description: '高透明度LED显示屏' },
      'fine-pitch': { name: '小间距显示屏', icon: '🔍', description: '超高清小间距LED显示屏' },
      'poster': { name: '海报屏', icon: '📋', description: '轻薄便携的LED海报显示屏' },
      'all-in-one': { name: '一体机', icon: '📺', description: '集成化LED显示一体机' }
    };

    return categories[categoryKey] || { name: categoryKey, icon: '📱', description: '' };
  },

  /**
   * Format price for display
   * @param {number} price - Raw price
   * @returns {string} - Formatted price
   */
  formatPrice(price: number): string | null {
    if (!price || price <= 0) return null;
    
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  },

  /**
   * Group specifications by category
   * @param {Array} specifications - Array of specifications
   * @returns {Object} - Grouped specifications
   */
  groupSpecificationsByCategory(specifications: any[]): Record<string, any[]> {
    if (!Array.isArray(specifications)) return {};
    
    const grouped: Record<string, any[]> = {};
    
    specifications
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .forEach(spec => {
        const category = spec.category || 'other';
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push({
          ...spec,
          formattedValue: this.formatSpecificationValue(spec)
        });
      });
    
    return grouped;
  },

  /**
   * Format specification value with unit
   * @param {Object} specification - Specification object
   * @returns {string} - Formatted value
   */
  formatSpecificationValue(specification: any): string {
    if (!specification.value) return '';
    
    const value = specification.value.toString();
    const unit = specification.unit || '';
    
    return unit ? `${value} ${unit}` : value;
  },

  /**
   * Transform product list for API response
   * @param {Array} products - Array of products
   * @returns {Array} - Transformed products
   */
  transformProductList(products: any[]): any[] {
    if (!Array.isArray(products)) return [];
    
    return products.map(product => this.transformProductForAPI(product));
  },

  /**
   * Create product summary for list views
   * @param {Object} product - Product data
   * @returns {Object} - Product summary
   */
  createProductSummary(product: any) {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      category: product.category,
      categoryInfo: this.getCategoryInfo(product.category),
      modelNumber: product.modelNumber,
      pixelPitch: product.pixelPitch,
      mainImage: this.transformMediaFile(product.mainImage),
      price: product.price,
      formattedPrice: this.formatPrice(product.price),
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      viewCount: product.viewCount || 0,
      createdAt: product.createdAt,
      publishedAt: product.publishedAt
    };
  }
};