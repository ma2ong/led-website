import { Metadata } from 'next';
import { Locale, i18n } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import LanguageDemo from '@/components/i18n/language-demo';

interface I18nDemoPageProps {
  params: {
    locale: string;
  };
}

// 生成元数据
export async function generateMetadata({ 
  params 
}: I18nDemoPageProps): Promise<Metadata> {
  // 验证语言参数
  const locale = params.locale as Locale;
  
  // 获取字典数据用于元数据
  const dictionary = await getDictionary(locale);
  
  return {
    title: locale === 'zh-Hans' ? '多语言演示' : 'Multi-language Demo',
    description: locale === 'zh-Hans' 
      ? '这个页面展示了网站的多语言功能' 
      : 'This page demonstrates the multi-language functionality of the website',
    alternates: {
      canonical: `/${locale}/i18n-demo`,
      languages: {
        'zh-Hans': '/zh-Hans/i18n-demo',
        'en': '/en/i18n-demo',
      },
    },
  };
}

// 生成静态参数
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function I18nDemoPage({ params }: I18nDemoPageProps) {
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            {locale === 'zh-Hans' ? '多语言功能演示' : 'Multi-language Demo'}
          </h1>
          <p className="text-lg text-gray-600">
            {locale === 'zh-Hans' 
              ? '这个页面展示了网站的多语言支持功能' 
              : 'This page demonstrates the multi-language support of the website'}
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {locale === 'zh-Hans' ? '当前语言' : 'Current Language'}
            </h2>
            <div className="bg-gray-100 p-4 rounded mb-6">
              <p>
                <strong>{locale === 'zh-Hans' ? '语言代码' : 'Language Code'}:</strong> {locale}
              </p>
              <p>
                <strong>{locale === 'zh-Hans' ? '语言名称' : 'Language Name'}:</strong> {locale === 'zh-Hans' ? '简体中文' : 'English'}
              </p>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">
              {locale === 'zh-Hans' ? '语言切换演示' : 'Language Switching Demo'}
            </h2>
            
            <LanguageDemo locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}