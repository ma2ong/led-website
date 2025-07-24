/**
 * Product validation service
 * Handles product data validation and business rules
 */

export default {
  /**
   * Validate product data before creation/update
   * @param {Object} data - Product data to validate
   * @returns {Object} - Validation result
   */
  validateProductData(data: any) {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Product name is required');
    }

    if (!data.category) {
      errors.push('Product category is required');
    }

    // Business rules validation
    if (data.name && data.name.length > 200) {
      errors.push('Product name must be less than 200 characters');
    }

    if (data.shortDescription && data.shortDescription.length > 500) {
      errors.push('Short description must be less than 500 characters');
    }

    if (data.price && data.price < 0) {
      errors.push('Price cannot be negative');
    }

    if (data.sortOrder && data.sortOrder < 0) {
      errors.push('Sort order cannot be negative');
    }

    // Technical specifications validation
    if (data.technicalSpecs) {
      try {
        if (typeof data.technicalSpecs === 'string') {
          JSON.parse(data.technicalSpecs);
        }
      } catch (error) {
        errors.push('Technical specifications must be valid JSON');
      }
    }

    // Model number format validation
    if (data.modelNumber && !/^[A-Z0-9\-_]+$/i.test(data.modelNumber)) {
      warnings.push('Model number should only contain letters, numbers, hyphens, and underscores');
    }

    // Pixel pitch validation for LED products
    if (data.pixelPitch && !/^P\d+(\.\d+)?$/i.test(data.pixelPitch)) {
      warnings.push('Pixel pitch should be in format P2.5, P3, P4, etc.');
    }

    // IP rating validation
    if (data.ipRating && !/^IP\d{2}$/i.test(data.ipRating)) {
      warnings.push('IP rating should be in format IP65, IP54, etc.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  },

  /**
   * Validate product slug uniqueness
   * @param {string} slug - Product slug
   * @param {number} excludeId - Product ID to exclude from check
   * @returns {Promise<boolean>} - Whether slug is unique
   */
  async validateSlugUniqueness(slug: string, excludeId?: number): Promise<boolean> {
    try {
      const filters: any = { slug };
      if (excludeId) {
        filters.id = { $ne: excludeId };
      }

      const existingProducts = await strapi.entityService.findMany('api::product.product', {
        filters,
        fields: ['id']
      });

      return existingProducts.length === 0;
    } catch (error) {
      strapi.log.error('Error validating slug uniqueness:', error);
      return false;
    }
  },

  /**
   * Validate product category
   * @param {string} category - Product category
   * @returns {boolean} - Whether category is valid
   */
  validateCategory(category: string): boolean {
    const validCategories = [
      'outdoor',
      'indoor', 
      'rental',
      'creative',
      'transparent',
      'fine-pitch',
      'poster',
      'all-in-one'
    ];

    return validCategories.includes(category);
  },

  /**
   * Validate product specifications
   * @param {Array} specifications - Product specifications array
   * @returns {Object} - Validation result
   */
  validateSpecifications(specifications: any[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!Array.isArray(specifications)) {
      errors.push('Specifications must be an array');
      return { isValid: false, errors };
    }

    specifications.forEach((spec, index) => {
      if (!spec.name || spec.name.trim().length === 0) {
        errors.push(`Specification ${index + 1}: Name is required`);
      }

      if (!spec.value || spec.value.trim().length === 0) {
        errors.push(`Specification ${index + 1}: Value is required`);
      }

      if (spec.category && !['display', 'physical', 'electrical', 'environmental', 'control', 'other'].includes(spec.category)) {
        errors.push(`Specification ${index + 1}: Invalid category`);
      }

      if (spec.order && (typeof spec.order !== 'number' || spec.order < 0)) {
        errors.push(`Specification ${index + 1}: Order must be a non-negative number`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Generate SEO-friendly slug from product name
   * @param {string} name - Product name
   * @returns {string} - Generated slug
   */
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  },

  /**
   * Validate media files for product
   * @param {Array} mediaFiles - Array of media file IDs
   * @returns {Promise<Object>} - Validation result
   */
  async validateMediaFiles(mediaFiles: number[]): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!Array.isArray(mediaFiles)) {
      return { isValid: true, errors: [] }; // Optional field
    }

    try {
      for (const fileId of mediaFiles) {
        const file = await strapi.plugins.upload.services.upload.findOne(fileId);
        if (!file) {
          errors.push(`Media file with ID ${fileId} not found`);
        }
      }
    } catch (error) {
      errors.push('Error validating media files');
      strapi.log.error('Media validation error:', error);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};