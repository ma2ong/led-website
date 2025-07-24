/**
 * 页面构建器服务
 */

'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::page-builder.page-builder', ({ strapi }) => ({
  /**
   * 验证页面组件
   */
  async validateComponents(components) {
    if (!Array.isArray(components)) {
      throw new Error('Components must be an array');
    }

    const validComponentTypes = [
      'hero', 'textBlock', 'imageGallery', 'productGrid', 
      'contactForm', 'testimonials', 'stats', 'cta'
    ];

    for (const component of components) {
      if (!component.id || !component.type || !component.name) {
        throw new Error('Each component must have id, type, and name');
      }

      if (!validComponentTypes.includes(component.type)) {
        throw new Error(`Invalid component type: ${component.type}`);
      }

      if (!component.props || typeof component.props !== 'object') {
        throw new Error('Each component must have props object');
      }
    }

    return true;
  },

  /**
   * 渲染页面组件为HTML
   */
  async renderComponents(components, locale = 'zh') {
    let html = '';

    for (const component of components) {
      switch (component.type) {
        case 'hero':
          html += this.renderHeroComponent(component, locale);
          break;
        case 'textBlock':
          html += this.renderTextBlockComponent(component, locale);
          break;
        case 'imageGallery':
          html += this.renderImageGalleryComponent(component, locale);
          break;
        case 'productGrid':
          html += await this.renderProductGridComponent(component, locale);
          break;
        case 'contactForm':
          html += this.renderContactFormComponent(component, locale);
          break;
        case 'testimonials':
          html += this.renderTestimonialsComponent(component, locale);
          break;
        case 'stats':
          html += this.renderStatsComponent(component, locale);
          break;
        case 'cta':
          html += this.renderCtaComponent(component, locale);
          break;
        default:
          console.warn(`Unknown component type: ${component.type}`);
      }
    }

    return html;
  },

  /**
   * 渲染主视觉组件
   */
  renderHeroComponent(component, locale) {
    const { title, subtitle, backgroundImage, buttonText, buttonLink } = component.props;
    
    return `
      <section class="hero-section" style="background-image: url('${backgroundImage || ''}')">
        <div class="hero-content">
          <h1 class="hero-title">${title || ''}</h1>
          <p class="hero-subtitle">${subtitle || ''}</p>
          ${buttonText ? `<a href="${buttonLink || '#'}" class="hero-button">${buttonText}</a>` : ''}
        </div>
      </section>
    `;
  },

  /**
   * 渲染文本块组件
   */
  renderTextBlockComponent(component, locale) {
    const { title, content, alignment } = component.props;
    
    return `
      <section class="text-block" style="text-align: ${alignment || 'left'}">
        ${title ? `<h2 class="text-block-title">${title}</h2>` : ''}
        <div class="text-block-content">${content || ''}</div>
      </section>
    `;
  },

  /**
   * 渲染图片画廊组件
   */
  renderImageGalleryComponent(component, locale) {
    const { images, columns, showCaptions } = component.props;
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return '<section class="image-gallery"><p>No images to display</p></section>';
    }

    const imageHtml = images.map(image => `
      <div class="gallery-item">
        <img src="${image.url || ''}" alt="${image.alt || ''}" />
        ${showCaptions && image.caption ? `<p class="image-caption">${image.caption}</p>` : ''}
      </div>
    `).join('');

    return `
      <section class="image-gallery" style="grid-template-columns: repeat(${columns || 3}, 1fr)">
        ${imageHtml}
      </section>
    `;
  },

  /**
   * 渲染产品网格组件
   */
  async renderProductGridComponent(component, locale) {
    const { category, limit, showFilters } = component.props;
    
    try {
      // 获取产品数据
      const products = await strapi.entityService.findMany('api::product.product', {
        filters: category ? { category: { name: category } } : {},
        limit: limit || 6,
        locale,
        populate: {
          images: true,
          category: true
        }
      });

      if (!products || products.length === 0) {
        return '<section class="product-grid"><p>No products to display</p></section>';
      }

      const productHtml = products.map(product => `
        <div class="product-item">
          ${product.images && product.images.length > 0 ? 
            `<img src="${product.images[0].url}" alt="${product.name}" />` : 
            '<div class="product-placeholder">No Image</div>'
          }
          <h3 class="product-name">${product.name || ''}</h3>
          <p class="product-description">${product.description || ''}</p>
          <a href="/products/${product.slug}" class="product-link">View Details</a>
        </div>
      `).join('');

      return `
        <section class="product-grid">
          ${showFilters ? '<div class="product-filters"><!-- Filters will be added here --></div>' : ''}
          <div class="product-grid-items">
            ${productHtml}
          </div>
        </section>
      `;
    } catch (error) {
      console.error('Error rendering product grid:', error);
      return '<section class="product-grid"><p>Error loading products</p></section>';
    }
  },

  /**
   * 渲染联系表单组件
   */
  renderContactFormComponent(component, locale) {
    const { title, fields } = component.props;
    
    const fieldHtml = (fields || ['name', 'email', 'message']).map(field => {
      switch (field) {
        case 'name':
          return '<input type="text" name="name" placeholder="Name" required />';
        case 'email':
          return '<input type="email" name="email" placeholder="Email" required />';
        case 'phone':
          return '<input type="tel" name="phone" placeholder="Phone" />';
        case 'company':
          return '<input type="text" name="company" placeholder="Company" />';
        case 'message':
          return '<textarea name="message" placeholder="Message" rows="4" required></textarea>';
        default:
          return '';
      }
    }).join('');

    return `
      <section class="contact-form">
        ${title ? `<h2 class="form-title">${title}</h2>` : ''}
        <form class="contact-form-fields" action="/api/inquiries" method="POST">
          ${fieldHtml}
          <button type="submit" class="form-submit">Submit</button>
        </form>
      </section>
    `;
  },

  /**
   * 渲染客户评价组件
   */
  renderTestimonialsComponent(component, locale) {
    const { testimonials, layout } = component.props;
    
    if (!testimonials || !Array.isArray(testimonials) || testimonials.length === 0) {
      return '<section class="testimonials"><p>No testimonials to display</p></section>';
    }

    const testimonialHtml = testimonials.map(testimonial => `
      <div class="testimonial-item">
        <blockquote class="testimonial-quote">"${testimonial.quote || ''}"</blockquote>
        <div class="testimonial-author">
          <strong>${testimonial.author || ''}</strong>
          ${testimonial.position ? `<span class="author-position">${testimonial.position}</span>` : ''}
        </div>
      </div>
    `).join('');

    return `
      <section class="testimonials testimonials-${layout || 'grid'}">
        ${testimonialHtml}
      </section>
    `;
  },

  /**
   * 渲染数据统计组件
   */
  renderStatsComponent(component, locale) {
    const { stats } = component.props;
    
    if (!stats || !Array.isArray(stats) || stats.length === 0) {
      return '<section class="stats"><p>No stats to display</p></section>';
    }

    const statsHtml = stats.map(stat => `
      <div class="stat-item">
        <div class="stat-value">${stat.value || ''}</div>
        <div class="stat-label">${stat.label || ''}</div>
      </div>
    `).join('');

    return `
      <section class="stats">
        ${statsHtml}
      </section>
    `;
  },

  /**
   * 渲染行动号召组件
   */
  renderCtaComponent(component, locale) {
    const { title, description, buttonText, buttonLink } = component.props;
    
    return `
      <section class="cta">
        ${title ? `<h2 class="cta-title">${title}</h2>` : ''}
        ${description ? `<p class="cta-description">${description}</p>` : ''}
        ${buttonText ? `<a href="${buttonLink || '#'}" class="cta-button">${buttonText}</a>` : ''}
      </section>
    `;
  },

  /**
   * 获取页面SEO数据
   */
  async getPageSEO(pageId, locale = 'zh') {
    const page = await strapi.entityService.findOne('api::page-builder.page-builder', pageId, {
      locale,
      populate: {
        seo: true
      }
    });

    if (!page || !page.seo) {
      return null;
    }

    return {
      title: page.seo.metaTitle || page.title,
      description: page.seo.metaDescription,
      keywords: page.seo.keywords,
      canonical: page.seo.canonicalURL,
      ogTitle: page.seo.metaTitle || page.title,
      ogDescription: page.seo.metaDescription,
      ogImage: page.seo.metaImage?.url,
    };
  }
}));