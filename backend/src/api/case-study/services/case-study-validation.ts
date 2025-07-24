/**
 * case-study validation service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::case-study.case-study', ({ strapi }) => ({
  // 验证案例数据
  async validateCaseStudyData(data: any) {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 必填字段验证
    if (!data.title || data.title.trim().length === 0) {
      errors.push('标题是必填项');
    }

    if (!data.challenge || data.challenge.trim().length === 0) {
      errors.push('挑战描述是必填项');
    }

    if (!data.solution || data.solution.trim().length === 0) {
      errors.push('解决方案描述是必填项');
    }

    if (!data.results || data.results.trim().length === 0) {
      errors.push('成果描述是必填项');
    }

    if (!data.industry) {
      errors.push('行业分类是必填项');
    }

    if (!data.region) {
      errors.push('地区是必填项');
    }

    // 长度验证
    if (data.title && data.title.length > 200) {
      errors.push('标题长度不能超过200个字符');
    }

    if (data.summary && data.summary.length > 500) {
      errors.push('摘要长度不能超过500个字符');
    }

    if (data.challenge && data.challenge.length > 5000) {
      errors.push('挑战描述长度不能超过5000个字符');
    }

    if (data.solution && data.solution.length > 5000) {
      errors.push('解决方案描述长度不能超过5000个字符');
    }

    if (data.results && data.results.length > 5000) {
      errors.push('成果描述长度不能超过5000个字符');
    }

    // 客户信息验证
    if (data.client) {
      if (!data.client.name || data.client.name.trim().length === 0) {
        errors.push('客户名称是必填项');
      }

      if (data.client.name && data.client.name.length > 100) {
        errors.push('客户名称长度不能超过100个字符');
      }

      if (data.client.website && !this.isValidUrl(data.client.website)) {
        errors.push('客户网站URL格式不正确');
      }
    }

    // 项目信息验证
    if (data.project) {
      if (!data.project.name || data.project.name.trim().length === 0) {
        errors.push('项目名称是必填项');
      }

      if (data.project.name && data.project.name.length > 150) {
        errors.push('项目名称长度不能超过150个字符');
      }

      if (data.project.teamSize && (data.project.teamSize < 1 || data.project.teamSize > 1000)) {
        errors.push('团队规模必须在1-1000之间');
      }

      if (data.project.completionDate) {
        const completionDate = new Date(data.project.completionDate);
        const now = new Date();
        if (completionDate > now) {
          warnings.push('项目完成日期设置为未来时间');
        }
      }
    }

    // 关键特性验证
    if (data.keyFeatures && Array.isArray(data.keyFeatures)) {
      data.keyFeatures.forEach((feature: any, index: number) => {
        if (!feature.title || feature.title.trim().length === 0) {
          errors.push(`第${index + 1}个关键特性的标题是必填项`);
        }

        if (!feature.description || feature.description.trim().length === 0) {
          errors.push(`第${index + 1}个关键特性的描述是必填项`);
        }

        if (feature.title && feature.title.length > 100) {
          errors.push(`第${index + 1}个关键特性的标题长度不能超过100个字符`);
        }

        if (feature.description && feature.description.length > 500) {
          errors.push(`第${index + 1}个关键特性的描述长度不能超过500个字符`);
        }
      });
    }

    // 技术规格验证
    if (data.technicalSpecs && Array.isArray(data.technicalSpecs)) {
      data.technicalSpecs.forEach((spec: any, index: number) => {
        if (!spec.key || spec.key.trim().length === 0) {
          errors.push(`第${index + 1}个技术规格的键名是必填项`);
        }

        if (!spec.value || spec.value.trim().length === 0) {
          errors.push(`第${index + 1}个技术规格的值是必填项`);
        }
      });
    }

    // 画廊项目验证
    if (data.gallery && Array.isArray(data.gallery)) {
      data.gallery.forEach((item: any, index: number) => {
        if (!item.type) {
          errors.push(`第${index + 1}个画廊项目的类型是必填项`);
        }

        if (!item.media) {
          errors.push(`第${index + 1}个画廊项目的媒体文件是必填项`);
        }

        if (item.order && (item.order < 0 || item.order > 999)) {
          errors.push(`第${index + 1}个画廊项目的排序值必须在0-999之间`);
        }
      });
    }

    // 证言验证
    if (data.testimonial) {
      if (!data.testimonial.content || data.testimonial.content.trim().length === 0) {
        errors.push('证言内容是必填项');
      }

      if (!data.testimonial.author || data.testimonial.author.trim().length === 0) {
        errors.push('证言作者是必填项');
      }

      if (data.testimonial.content && data.testimonial.content.length > 1000) {
        errors.push('证言内容长度不能超过1000个字符');
      }

      if (data.testimonial.rating && (data.testimonial.rating < 1 || data.testimonial.rating > 5)) {
        errors.push('证言评分必须在1-5之间');
      }
    }

    // 标签验证
    if (data.tags && Array.isArray(data.tags)) {
      if (data.tags.length > 10) {
        warnings.push('建议标签数量不超过10个');
      }

      data.tags.forEach((tag: string, index: number) => {
        if (typeof tag !== 'string' || tag.trim().length === 0) {
          errors.push(`第${index + 1}个标签格式不正确`);
        }

        if (tag && tag.length > 50) {
          errors.push(`第${index + 1}个标签长度不能超过50个字符`);
        }
      });
    }

    // 优先级验证
    if (data.priority !== undefined && (data.priority < 0 || data.priority > 100)) {
      errors.push('优先级必须在0-100之间');
    }

    // SEO验证
    if (data.seo) {
      if (data.seo.metaTitle && data.seo.metaTitle.length > 60) {
        warnings.push('SEO标题建议不超过60个字符');
      }

      if (data.seo.metaDescription && data.seo.metaDescription.length > 160) {
        warnings.push('SEO描述建议不超过160个字符');
      }

      if (data.seo.keywords && data.seo.keywords.length > 200) {
        warnings.push('SEO关键词建议不超过200个字符');
      }
    }

    // 业务逻辑验证
    if (!data.products || data.products.length === 0) {
      warnings.push('建议至少关联一个产品');
    }

    if (!data.coverImage) {
      warnings.push('建议上传封面图片');
    }

    if (!data.images || data.images.length === 0) {
      warnings.push('建议上传项目图片');
    }

    if (!data.summary || data.summary.trim().length === 0) {
      warnings.push('建议添加案例摘要');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  },

  // 验证URL格式
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // 验证日期格式
  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  },

  // 清理和标准化数据
  sanitizeData(data: any) {
    const sanitized = { ...data };

    // 清理字符串字段
    const stringFields = ['title', 'summary', 'projectDuration', 'projectValue'];
    stringFields.forEach(field => {
      if (sanitized[field] && typeof sanitized[field] === 'string') {
        sanitized[field] = sanitized[field].trim();
      }
    });

    // 清理富文本字段
    const richtextFields = ['challenge', 'solution', 'results'];
    richtextFields.forEach(field => {
      if (sanitized[field] && typeof sanitized[field] === 'string') {
        sanitized[field] = this.sanitizeRichText(sanitized[field]);
      }
    });

    // 清理客户信息
    if (sanitized.client) {
      if (sanitized.client.name) {
        sanitized.client.name = sanitized.client.name.trim();
      }
      if (sanitized.client.website) {
        sanitized.client.website = sanitized.client.website.trim().toLowerCase();
        if (!sanitized.client.website.startsWith('http')) {
          sanitized.client.website = 'https://' + sanitized.client.website;
        }
      }
    }

    // 清理项目信息
    if (sanitized.project) {
      if (sanitized.project.name) {
        sanitized.project.name = sanitized.project.name.trim();
      }
      if (sanitized.project.location) {
        sanitized.project.location = sanitized.project.location.trim();
      }
    }

    // 清理标签
    if (sanitized.tags && Array.isArray(sanitized.tags)) {
      sanitized.tags = sanitized.tags
        .map(tag => typeof tag === 'string' ? tag.trim().toLowerCase() : tag)
        .filter(tag => tag && tag.length > 0)
        .slice(0, 10); // 限制标签数量
    }

    // 清理关键特性
    if (sanitized.keyFeatures && Array.isArray(sanitized.keyFeatures)) {
      sanitized.keyFeatures = sanitized.keyFeatures.map(feature => ({
        ...feature,
        title: feature.title ? feature.title.trim() : '',
        description: feature.description ? feature.description.trim() : ''
      }));
    }

    // 清理技术规格
    if (sanitized.technicalSpecs && Array.isArray(sanitized.technicalSpecs)) {
      sanitized.technicalSpecs = sanitized.technicalSpecs.map(spec => ({
        ...spec,
        key: spec.key ? spec.key.trim() : '',
        value: spec.value ? spec.value.trim() : ''
      }));
    }

    // 清理证言
    if (sanitized.testimonial) {
      if (sanitized.testimonial.content) {
        sanitized.testimonial.content = sanitized.testimonial.content.trim();
      }
      if (sanitized.testimonial.author) {
        sanitized.testimonial.author = sanitized.testimonial.author.trim();
      }
      if (sanitized.testimonial.company) {
        sanitized.testimonial.company = sanitized.testimonial.company.trim();
      }
    }

    return sanitized;
  },

  // 清理富文本内容
  sanitizeRichText(content: string): string {
    // 移除危险的HTML标签和属性
    return content
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  },

  // 生成slug
  generateSlug(title: string, id?: number): string {
    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .replace(/-+/g, '-') // 多个连字符合并为一个
      .trim();

    // 如果有ID，添加到slug末尾确保唯一性
    if (id) {
      slug += `-${id}`;
    }

    return slug;
  },

  // 验证关联数据
  async validateRelations(data: any) {
    const errors: string[] = [];

    // 验证产品关联
    if (data.products && Array.isArray(data.products)) {
      for (const productId of data.products) {
        const product = await strapi.entityService.findOne('api::product.product', productId);
        if (!product) {
          errors.push(`产品ID ${productId} 不存在`);
        }
      }
    }

    // 验证相关案例关联
    if (data.relatedCases && Array.isArray(data.relatedCases)) {
      for (const caseId of data.relatedCases) {
        const caseStudy = await strapi.entityService.findOne('api::case-study.case-study', caseId);
        if (!caseStudy) {
          errors.push(`案例ID ${caseId} 不存在`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}));