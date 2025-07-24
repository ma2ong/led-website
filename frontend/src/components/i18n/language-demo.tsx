'use client';

import { useState } from 'react';
import { useDictionary } from '@/hooks/use-dictionary';
import { Locale } from '@/lib/i18n-config';
import LanguageSwitcher from '@/components/layout/language-switcher';

interface LanguageDemoProps {
  locale: Locale;
}

export default function LanguageDemo({ locale }: LanguageDemoProps) {
  const { t, isLoading } = useDictionary(locale);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted with: ${JSON.stringify(formData)}`);
  };

  if (isLoading) {
    return <div className="p-8 text-center">{t('common.loading')}</div>;
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="mx-auto mt-8 max-w-xl">
          <div className="mb-6 flex justify-center">
            <LanguageSwitcher variant="buttons" showLabel={true} />
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                {t('contact.form.name')}
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {t('contact.form.email')}
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                {t('contact.form.message')}
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                {t('contact.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}