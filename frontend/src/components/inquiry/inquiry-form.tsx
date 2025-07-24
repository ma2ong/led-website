'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';
import { 
  validateForm, 
  inquiryFormSchema, 
  sanitizeFormData, 
  isValidEmail, 
  isValidPhone,
  ValidationError 
} from '@/lib/form-validation';

export interface InquiryFormProps {
  locale: Locale;
  className?: string;
  variant?: 'default' | 'compact' | 'product';
  productId?: string;
  productName?: string;
  preselectedProduct?: string;
  preselectedSolution?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function InquiryForm({
  locale,
  className,
  variant = 'default',
  productId,
  productName,
  preselectedProduct,
  preselectedSolution,
  onSuccess,
  onError,
}: InquiryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    subject: productName ? `询价: ${productName}` : preselectedProduct ? `产品询价: ${preselectedProduct}` : preselectedSolution ? `解决方案咨询: ${preselectedSolution}` : '',
    message: preselectedProduct ? `我对${preselectedProduct}产品感兴趣，请提供详细信息和报价。` : preselectedSolution ? `我对${preselectedSolution}解决方案感兴趣，请提供详细信息。` : '',
    productId: productId || '',
    projectBudget: '',
    projectTimeline: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setErrorMessage('');
      setValidationErrors({});
      
      // Validate form data
      const validationResult = validateForm(formData, inquiryFormSchema, locale === 'zh-Hans' ? 'zh' : 'en');
      
      if (validationResult.length > 0) {
        const errorMap: Record<string, string> = {};
        validationResult.forEach(error => {
          errorMap[error.field] = error.message;
        });
        setValidationErrors(errorMap);
        setSubmitStatus('error');
        setErrorMessage(locale === 'zh-Hans' ? '请检查表单中的错误' : 'Please check the errors in the form');
        return;
      }
      
      // Additional email validation
      if (!isValidEmail(formData.email)) {
        setValidationErrors({ email: locale === 'zh-Hans' ? '请输入有效的邮箱地址' : 'Please enter a valid email address' });
        setSubmitStatus('error');
        return;
      }
      
      // Additional phone validation (if provided)
      if (formData.phone && !isValidPhone(formData.phone)) {
        setValidationErrors({ phone: locale === 'zh-Hans' ? '请输入有效的电话号码' : 'Please enter a valid phone number' });
        setSubmitStatus('error');
        return;
      }
      
      // Sanitize form data
      const sanitizedData = sanitizeFormData(formData);
      
      // 发送询盘数据到API
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedData,
          locale,
          source: window.location.href,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '提交失败，请稍后再试');
      }
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        subject: productName ? `询价: ${productName}` : '',
        message: '',
        productId: productId || '',
        projectBudget: '',
        projectTimeline: '',
      });
      
      setSubmitStatus('success');
      
      // 调用成功回调
      if (onSuccess) {
        onSuccess();
      }
      
      // 如果是产品询盘，3秒后重定向到感谢页面
      if (variant === 'product') {
        setTimeout(() => {
          router.push(`/${locale}/thank-you?type=inquiry`);
        }, 3000);
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '提交失败，请稍后再试');
      
      // 调用错误回调
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 翻译函数
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'zh-Hans': {
        'title': '发送询盘',
        'productTitle': '产品询价',
        'name': '姓名',
        'email': '电子邮箱',
        'phone': '电话',
        'company': '公司',
        'country': '国家/地区',
        'subject': '主题',
        'message': '留言内容',
        'productInterest': '感兴趣的产品',
        'projectBudget': '项目预算',
        'projectTimeline': '项目时间',
        'submit': '提交询盘',
        'submitting': '提交中...',
        'success': '提交成功！我们会尽快与您联系。',
        'error': '提交失败，请稍后再试。',
        'required': '必填项',
        'invalidEmail': '请输入有效的电子邮箱',
        'selectCountry': '请选择国家/地区',
        'selectBudget': '请选择预算范围',
        'selectTimeline': '请选择项目时间',
        'budgetOptions': {
          'under10k': '1万元以下',
          '10k-50k': '1-5万元',
          '50k-100k': '5-10万元',
          '100k-500k': '10-50万元',
          'over500k': '50万元以上',
          'undecided': '待定',
        },
        'timelineOptions': {
          'immediate': '立即',
          '1-3months': '1-3个月内',
          '3-6months': '3-6个月内',
          '6-12months': '6-12个月内',
          'over12months': '12个月以上',
          'undecided': '待定',
        },
      },
      'en': {
        'title': 'Send Inquiry',
        'productTitle': 'Product Inquiry',
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'company': 'Company',
        'country': 'Country/Region',
        'subject': 'Subject',
        'message': 'Message',
        'productInterest': 'Product of Interest',
        'projectBudget': 'Project Budget',
        'projectTimeline': 'Project Timeline',
        'submit': 'Submit Inquiry',
        'submitting': 'Submitting...',
        'success': 'Submitted successfully! We will contact you soon.',
        'error': 'Submission failed, please try again later.',
        'required': 'Required',
        'invalidEmail': 'Please enter a valid email',
        'selectCountry': 'Please select a country/region',
        'selectBudget': 'Please select a budget range',
        'selectTimeline': 'Please select a timeline',
        'budgetOptions': {
          'under10k': 'Under ¥10,000',
          '10k-50k': '¥10,000 - ¥50,000',
          '50k-100k': '¥50,000 - ¥100,000',
          '100k-500k': '¥100,000 - ¥500,000',
          'over500k': 'Over ¥500,000',
          'undecided': 'Undecided',
        },
        'timelineOptions': {
          'immediate': 'Immediate',
          '1-3months': '1-3 months',
          '3-6months': '3-6 months',
          '6-12months': '6-12 months',
          'over12months': 'Over 12 months',
          'undecided': 'Undecided',
        },
      },
    };
    
    return translations[locale]?.[key] || key;
  };
  
  // Helper function to render field error
  const renderFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      return (
        <p className="mt-1 text-sm text-red-600">{validationErrors[fieldName]}</p>
      );
    }
    return null;
  };

  // Helper function to get field class names
  const getFieldClassName = (fieldName: string, baseClassName: string) => {
    return cn(
      baseClassName,
      validationErrors[fieldName] 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
        : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
    );
  };

  // 国家/地区列表
  const countries = [
    { code: 'CN', name: locale === 'zh-Hans' ? '中国' : 'China' },
    { code: 'US', name: locale === 'zh-Hans' ? '美国' : 'United States' },
    { code: 'JP', name: locale === 'zh-Hans' ? '日本' : 'Japan' },
    { code: 'KR', name: locale === 'zh-Hans' ? '韩国' : 'South Korea' },
    { code: 'SG', name: locale === 'zh-Hans' ? '新加坡' : 'Singapore' },
    { code: 'MY', name: locale === 'zh-Hans' ? '马来西亚' : 'Malaysia' },
    { code: 'TH', name: locale === 'zh-Hans' ? '泰国' : 'Thailand' },
    { code: 'VN', name: locale === 'zh-Hans' ? '越南' : 'Vietnam' },
    { code: 'ID', name: locale === 'zh-Hans' ? '印度尼西亚' : 'Indonesia' },
    { code: 'IN', name: locale === 'zh-Hans' ? '印度' : 'India' },
    { code: 'AU', name: locale === 'zh-Hans' ? '澳大利亚' : 'Australia' },
    { code: 'NZ', name: locale === 'zh-Hans' ? '新西兰' : 'New Zealand' },
    { code: 'GB', name: locale === 'zh-Hans' ? '英国' : 'United Kingdom' },
    { code: 'DE', name: locale === 'zh-Hans' ? '德国' : 'Germany' },
    { code: 'FR', name: locale === 'zh-Hans' ? '法国' : 'France' },
    { code: 'IT', name: locale === 'zh-Hans' ? '意大利' : 'Italy' },
    { code: 'ES', name: locale === 'zh-Hans' ? '西班牙' : 'Spain' },
    { code: 'RU', name: locale === 'zh-Hans' ? '俄罗斯' : 'Russia' },
    { code: 'CA', name: locale === 'zh-Hans' ? '加拿大' : 'Canada' },
    { code: 'BR', name: locale === 'zh-Hans' ? '巴西' : 'Brazil' },
    { code: 'AE', name: locale === 'zh-Hans' ? '阿联酋' : 'United Arab Emirates' },
    { code: 'SA', name: locale === 'zh-Hans' ? '沙特阿拉伯' : 'Saudi Arabia' },
    { code: 'ZA', name: locale === 'zh-Hans' ? '南非' : 'South Africa' },
    { code: 'OTHER', name: locale === 'zh-Hans' ? '其他' : 'Other' },
  ];
  
  // 紧凑型表单
  if (variant === 'compact') {
    return (
      <div className={cn("bg-white", className)}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('title')}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 姓名和邮箱 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* 电话和公司 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t('phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                {t('company')}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* 留言 */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              {t('message')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          {/* 提交按钮 */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                isSubmitting && "opacity-75 cursor-not-allowed"
              )}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>
          
          {/* 提交状态 */}
          {submitStatus === 'success' && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{t('success')}</p>
                </div>
              </div>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errorMessage || t('error')}</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
  
  // 产品询价表单
  if (variant === 'product') {
    return (
      <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('productTitle')}
        </h3>
        
        {productName && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{t('productInterest')}:</span> {productName}
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 姓名和邮箱 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* 电话和公司 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t('phone')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                {t('company')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* 国家和预算 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {t('country')} <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">{t('selectCountry')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="projectBudget" className="block text-sm font-medium text-gray-700">
                {t('projectBudget')}
              </label>
              <select
                id="projectBudget"
                name="projectBudget"
                value={formData.projectBudget}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">{t('selectBudget')}</option>
                <option value="under10k">{t('budgetOptions.under10k')}</option>
                <option value="10k-50k">{t('budgetOptions.10k-50k')}</option>
                <option value="50k-100k">{t('budgetOptions.50k-100k')}</option>
                <option value="100k-500k">{t('budgetOptions.100k-500k')}</option>
                <option value="over500k">{t('budgetOptions.over500k')}</option>
                <option value="undecided">{t('budgetOptions.undecided')}</option>
              </select>
            </div>
          </div>
          
          {/* 项目时间 */}
          <div>
            <label htmlFor="projectTimeline" className="block text-sm font-medium text-gray-700">
              {t('projectTimeline')}
            </label>
            <select
              id="projectTimeline"
              name="projectTimeline"
              value={formData.projectTimeline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">{t('selectTimeline')}</option>
              <option value="immediate">{t('timelineOptions.immediate')}</option>
              <option value="1-3months">{t('timelineOptions.1-3months')}</option>
              <option value="3-6months">{t('timelineOptions.3-6months')}</option>
              <option value="6-12months">{t('timelineOptions.6-12months')}</option>
              <option value="over12months">{t('timelineOptions.over12months')}</option>
              <option value="undecided">{t('timelineOptions.undecided')}</option>
            </select>
          </div>
          
          {/* 留言 */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              {t('message')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder={locale === 'zh-Hans' ? '请描述您的需求，如尺寸、数量、应用场景等' : 'Please describe your requirements, such as size, quantity, application scenario, etc.'}
            />
          </div>
          
          {/* 提交按钮 */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                isSubmitting && "opacity-75 cursor-not-allowed"
              )}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>
          
          {/* 提交状态 */}
          {submitStatus === 'success' && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{t('success')}</p>
                </div>
              </div>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errorMessage || t('error')}</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
  
  // 默认表单
  return (
    <div className={cn("bg-white", className)}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {t('title')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 姓名和邮箱 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
        
        {/* 电话和公司 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t('phone')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              {t('company')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
        
        {/* 国家和主题 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              {t('country')} <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">{t('selectCountry')}</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              {t('subject')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
        
        {/* 预算和时间 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="projectBudget" className="block text-sm font-medium text-gray-700">
              {t('projectBudget')}
            </label>
            <select
              id="projectBudget"
              name="projectBudget"
              value={formData.projectBudget}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">{t('selectBudget')}</option>
              <option value="under10k">{t('budgetOptions.under10k')}</option>
              <option value="10k-50k">{t('budgetOptions.10k-50k')}</option>
              <option value="50k-100k">{t('budgetOptions.50k-100k')}</option>
              <option value="100k-500k">{t('budgetOptions.100k-500k')}</option>
              <option value="over500k">{t('budgetOptions.over500k')}</option>
              <option value="undecided">{t('budgetOptions.undecided')}</option>
            </select>
          </div>
          <div>
            <label htmlFor="projectTimeline" className="block text-sm font-medium text-gray-700">
              {t('projectTimeline')}
            </label>
            <select
              id="projectTimeline"
              name="projectTimeline"
              value={formData.projectTimeline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">{t('selectTimeline')}</option>
              <option value="immediate">{t('timelineOptions.immediate')}</option>
              <option value="1-3months">{t('timelineOptions.1-3months')}</option>
              <option value="3-6months">{t('timelineOptions.3-6months')}</option>
              <option value="6-12months">{t('timelineOptions.6-12months')}</option>
              <option value="over12months">{t('timelineOptions.over12months')}</option>
              <option value="undecided">{t('timelineOptions.undecided')}</option>
            </select>
          </div>
        </div>
        
        {/* 留言 */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            {t('message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        
        {/* 提交按钮 */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
              isSubmitting && "opacity-75 cursor-not-allowed"
            )}
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </button>
        </div>
        
        {/* 提交状态 */}
        {submitStatus === 'success' && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{t('success')}</p>
              </div>
            </div>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{errorMessage || t('error')}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}