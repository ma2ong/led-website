/**
 * 输入验证和清理中间件
 * 防止XSS攻击和SQL注入
 */

'use strict';

const validator = require('validator');
const DOMPurify = require('isomorphic-dompurify');

const inputValidation = (options = {}) => {
  const {
    sanitizeHtml = true,
    validateEmail = true,
    validateUrl = true,
    maxStringLength = 10000,
    allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  } = options;

  return async (ctx, next) => {
    if (ctx.request.body && typeof ctx.request.body === 'object') {
      ctx.request.body = sanitizeObject(ctx.request.body, {
        sanitizeHtml,
        validateEmail,
        validateUrl,
        maxStringLength,
        allowedTags,
      });
    }

    await next();
  };
};

/**
 * 递归清理对象
 */
function sanitizeObject(obj, options) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, options));
  }

  if (typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      const sanitizedKey = sanitizeString(key, options);
      sanitized[sanitizedKey] = sanitizeObject(value, options);
    }
    return sanitized;
  }

  if (typeof obj === 'string') {
    return sanitizeString(obj, options);
  }

  return obj;
}

/**
 * 清理字符串
 */
function sanitizeString(str, options) {
  if (typeof str !== 'string') {
    return str;
  }

  // 长度限制
  if (str.length > options.maxStringLength) {
    str = str.substring(0, options.maxStringLength);
  }

  // HTML清理
  if (options.sanitizeHtml) {
    str = DOMPurify.sanitize(str, {
      ALLOWED_TAGS: options.allowedTags,
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }

  // 移除潜在的脚本注入
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  str = str.replace(/javascript:/gi, '');
  str = str.replace(/on\w+\s*=/gi, '');

  // 转义特殊字符
  str = validator.escape(str);

  return str;
}

/**
 * 验证邮箱格式
 */
function validateEmailField(email) {
  if (typeof email !== 'string') {
    return false;
  }
  
  return validator.isEmail(email) && email.length <= 254;
}

/**
 * 验证URL格式
 */
function validateUrlField(url) {
  if (typeof url !== 'string') {
    return false;
  }
  
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    allow_underscores: false,
  });
}

/**
 * 验证电话号码
 */
function validatePhoneField(phone) {
  if (typeof phone !== 'string') {
    return false;
  }
  
  // 简单的电话号码验证
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * 验证特定字段
 */
const fieldValidators = {
  email: validateEmailField,
  url: validateUrlField,
  phone: validatePhoneField,
};

/**
 * 表单验证中间件
 */
const formValidation = (validationRules = {}) => {
  return async (ctx, next) => {
    if (ctx.request.body && typeof ctx.request.body === 'object') {
      const errors = [];
      
      for (const [field, rules] of Object.entries(validationRules)) {
        const value = ctx.request.body[field];
        
        // 必填字段验证
        if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
          errors.push(`${field} is required`);
          continue;
        }
        
        // 如果字段为空且不是必填，跳过其他验证
        if (!value) {
          continue;
        }
        
        // 类型验证
        if (rules.type && fieldValidators[rules.type]) {
          if (!fieldValidators[rules.type](value)) {
            errors.push(`${field} is not a valid ${rules.type}`);
          }
        }
        
        // 长度验证
        if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
          errors.push(`${field} must be at least ${rules.minLength} characters long`);
        }
        
        if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
          errors.push(`${field} must be no more than ${rules.maxLength} characters long`);
        }
        
        // 自定义验证函数
        if (rules.validator && typeof rules.validator === 'function') {
          const customResult = rules.validator(value);
          if (customResult !== true) {
            errors.push(customResult || `${field} is invalid`);
          }
        }
      }
      
      if (errors.length > 0) {
        ctx.status = 400;
        ctx.body = {
          error: 'Validation failed',
          details: errors,
        };
        return;
      }
    }
    
    await next();
  };
};

module.exports = inputValidation;
module.exports.formValidation = formValidation;
module.exports.sanitizeObject = sanitizeObject;
module.exports.fieldValidators = fieldValidators;