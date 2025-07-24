/**
 * Form Validation Utilities
 * Comprehensive form validation functions for the LED website
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormData {
  [key: string]: any;
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex (supports international formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// URL validation regex
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return PHONE_REGEX.test(cleanPhone);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  return URL_REGEX.test(url.trim());
}

/**
 * Validate a single field based on rules
 */
export function validateField(
  fieldName: string,
  value: any,
  rules: ValidationRule,
  locale: 'zh' | 'en' = 'zh'
): ValidationError | null {
  const messages = {
    zh: {
      required: '此字段为必填项',
      minLength: `至少需要 {min} 个字符`,
      maxLength: `最多 {max} 个字符`,
      email: '请输入有效的邮箱地址',
      phone: '请输入有效的电话号码',
      url: '请输入有效的网址',
      pattern: '格式不正确',
      custom: '输入值不符合要求'
    },
    en: {
      required: 'This field is required',
      minLength: 'Minimum {min} characters required',
      maxLength: 'Maximum {max} characters allowed',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      url: 'Please enter a valid URL',
      pattern: 'Invalid format',
      custom: 'Invalid value'
    }
  };

  const msg = messages[locale];

  // Check required
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return {
      field: fieldName,
      message: msg.required,
      code: 'REQUIRED'
    };
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  const stringValue = String(value).trim();

  // Check minimum length
  if (rules.minLength && stringValue.length < rules.minLength) {
    return {
      field: fieldName,
      message: msg.minLength.replace('{min}', String(rules.minLength)),
      code: 'MIN_LENGTH'
    };
  }

  // Check maximum length
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return {
      field: fieldName,
      message: msg.maxLength.replace('{max}', String(rules.maxLength)),
      code: 'MAX_LENGTH'
    };
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    // Special handling for common patterns
    if (rules.pattern === EMAIL_REGEX) {
      return {
        field: fieldName,
        message: msg.email,
        code: 'INVALID_EMAIL'
      };
    }
    if (rules.pattern === PHONE_REGEX) {
      return {
        field: fieldName,
        message: msg.phone,
        code: 'INVALID_PHONE'
      };
    }
    if (rules.pattern === URL_REGEX) {
      return {
        field: fieldName,
        message: msg.url,
        code: 'INVALID_URL'
      };
    }
    
    return {
      field: fieldName,
      message: msg.pattern,
      code: 'INVALID_PATTERN'
    };
  }

  // Check custom validation
  if (rules.custom && !rules.custom(value)) {
    return {
      field: fieldName,
      message: msg.custom,
      code: 'CUSTOM_VALIDATION'
    };
  }

  return null;
}

/**
 * Validate entire form based on validation schema
 */
export function validateForm(
  formData: FormData,
  validationSchema: Record<string, ValidationRule>,
  locale: 'zh' | 'en' = 'zh'
): ValidationError[] {
  const errors: ValidationError[] = [];

  Object.entries(validationSchema).forEach(([fieldName, rules]) => {
    const error = validateField(fieldName, formData[fieldName], rules, locale);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
}

/**
 * Inquiry form validation schema
 */
export const inquiryFormSchema: Record<string, ValidationRule> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: EMAIL_REGEX
  },
  phone: {
    required: false,
    pattern: PHONE_REGEX
  },
  company: {
    required: false,
    maxLength: 100
  },
  country: {
    required: false,
    maxLength: 50
  },
  projectType: {
    required: false
  },
  industry: {
    required: false
  },
  budget: {
    required: false
  },
  timeline: {
    required: false
  },
  requirements: {
    required: true,
    minLength: 10,
    maxLength: 2000
  }
};

/**
 * Contact form validation schema
 */
export const contactFormSchema: Record<string, ValidationRule> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: EMAIL_REGEX
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};

/**
 * Newsletter subscription validation schema
 */
export const newsletterSchema: Record<string, ValidationRule> = {
  email: {
    required: true,
    pattern: EMAIL_REGEX
  }
};

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 10000); // Limit length
}

/**
 * Sanitize form data
 */
export function sanitizeFormData(formData: FormData): FormData {
  const sanitized: FormData = {};
  
  Object.entries(formData).forEach(([key, value]) => {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
}

/**
 * Check if form data is valid
 */
export function isFormValid(
  formData: FormData,
  validationSchema: Record<string, ValidationRule>,
  locale: 'zh' | 'en' = 'zh'
): { isValid: boolean; errors: ValidationError[] } {
  const errors = validateForm(formData, validationSchema, locale);
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(
  errors: ValidationError[],
  locale: 'zh' | 'en' = 'zh'
): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  errors.forEach(error => {
    formatted[error.field] = error.message;
  });
  
  return formatted;
}

/**
 * Validate file upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    maxFiles?: number;
  } = {}
): ValidationError | null {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxFiles = 5
  } = options;

  // Check file size
  if (file.size > maxSize) {
    return {
      field: 'file',
      message: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
      code: 'FILE_TOO_LARGE'
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      field: 'file',
      message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
      code: 'INVALID_FILE_TYPE'
    };
  }

  return null;
}

/**
 * Rate limiting check (client-side)
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  timeWindow: number = 60000 // 1 minute
): boolean {
  const now = Date.now();
  const storageKey = `rate_limit_${key}`;
  
  try {
    const stored = localStorage.getItem(storageKey);
    const requests = stored ? JSON.parse(stored) : [];
    
    // Filter out old requests
    const recentRequests = requests.filter((timestamp: number) => 
      now - timestamp < timeWindow
    );
    
    // Check if limit exceeded
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    localStorage.setItem(storageKey, JSON.stringify(recentRequests));
    
    return true;
  } catch (error) {
    // If localStorage is not available, allow the request
    return true;
  }
}

/**
 * Honeypot validation (anti-spam)
 */
export function validateHoneypot(honeypotValue: string): boolean {
  // Honeypot field should be empty
  return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * CAPTCHA validation placeholder
 */
export function validateCaptcha(captchaResponse: string): Promise<boolean> {
  // This would integrate with a CAPTCHA service like reCAPTCHA
  // For now, return true if response exists
  return Promise.resolve(!!captchaResponse);
}