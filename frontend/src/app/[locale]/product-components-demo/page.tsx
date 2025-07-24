import { Metadata } from 'next';
import { Locale, i18n } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import ProductComponentsDemo from '@/components/product/product-components-demo';

interface ProductComponentsDemoPageProps {
  params: {
    locale: string;
  };
}

// 生成元数据
export async function generateMetadata({ 
  params 
}: ProductComponentsDemoPageProps): Promise<Metadata> {
  // 验证语言参数
  const locale = params.locale as Locale;
  
  // 获取字典数据用于元数据
  const dictionary = await getDictionary(locale);
  
  return {
    title: locale === 'zh-Hans' ? '产品组件演示' : 'Product Components Demo',
    description: locale === 'zh-Hans' 
      ? '这个页面展示了产品相关的UI组件' 
      : 'This page demonstrates the product-related UI components',
    alternates: {
      canonical: `/${locale}/product-components-demo`,
      languages: {
        'zh-Hans': '/zh-Hans/product-components-demo',
        'en': '/en/product-components-demo',
      },
    },
  };
}

// 生成静态参数
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function ProductComponentsDemoPage({ params }: ProductComponentsDemoPageProps) {
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            {locale === 'zh-Hans' ? '产品组件演示' : 'Product Components Demo'}
          </h1>
          <p className="text-lg text-gray-600">
            {locale === 'zh-Hans' 
              ? '这个页面展示了产品相关的UI组件' 
              : 'This page demonstrates the product-related UI components'}
          </p>
        </div>
        
        <ProductComponentsDemo locale={locale} />
      </div>
    </div>
  );
}